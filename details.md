# 内部细节

## 文档结构

### “Magisk tmpfs 目录”中的路径

Magisk 将安装一个 `tmpfs` 目录来存储一些临时数据。对于带有 `/sbin` 文件夹的设备，将选择该文件夹，因为它还将充当将二进制文件注入 `PATH` 的覆盖层。从 Android 11 开始，`/sbin` 文件夹可能不存在，因此 Magisk 将 `/debug_ramdisk` 其用作基本文件夹。

``` bash
# 为了获得Magisk正在使用的当前基本文件夹，使用命令 `magisk--path`。
# 二进制文件，如 magisk、magiskinit 和所有小程序的符号链接直接存储
# 在此路径中。这意味着当这是/sbin，这些二进制文件将直接在 PATH 中。
MAGISKTMP=$(magisk --path)

# Magisk 内部材料
INTERNALDIR=$MAGISKTMP/.magisk

# /data/adb/modules 将以只读方式挂载到此处。
# 由于 /data 上的 nosuid 挂载标志，未直接使用原始文件夹。
$INTERNALDIR/modules

# 当前 Magisk 安装配置
$INTERNALDIR/config

# 指向预初始化存储目录的符号链接/挂载点
# 用于在重新启动后保留自定义 sepolicy.rule，以便在预初始化期间读取
$INTERNALDIR/preinit

# 用于构建 magic mount 树的内部 tmpfs 工作区
$INTERNALDIR/worker

# 内部 BusyBox 目录，包含 busybox 及其 applet 符号链接
$INTERNALDIR/busybox

# 内部设备节点、管道和套接字（magiskd socket、preinit 块设备、日志管道）
$INTERNALDIR/device

# 根目录修补/覆盖文件
# 在 system-as-root 的系统上，/ 不可写。
# 所有预初始化补丁文件都存储在这里并绑定挂载。
$INTERNALDIR/rootdir

# 用于 root shell 的隔离 devpts 挂载（如果内核支持）
$INTERNALDIR/pts
```

### `/data` 中的路径

一些二进制文件和文件应存储在 `/data` 中的非易失性存储中。为了防止检测，所有东西都必须存储在 `/data` 中安全且不可检测的地方。选 `/data/adb` 文件夹是因为其具有以下优点：

- 它是现代安卓系统上的一个现有文件夹，因此不能作为 Magisk 存在的标志。
- 文件夹的权限默认为 `700`，所有者为 `root`，因此非 root 进程无法以任何可能的方式进入、读取和写入文件夹。
- 文件夹 secontext 标记为  `u:object_r:adb_data_file:s0`，很少有进程有权与该 secontext 进行任何交互。
- 该文件夹位于*设备加密存储区*中，因此一旦数据正确装载到 FBE（File-Based Encryption，基于文件的加密）设备中，即可访问该文件夹。

``` bash
SECURE_DIR=/data/adb

# 存储常规 post-fs-data 脚本的文件夹
$SECURE_DIR/post-fs-data.d

#存储常规 late_start 服务脚本的文件夹
$SECURE_DIR/service.d

# Magisk 模块
$SECURE_DIR/modules

# 等待升级的 Magisk 模块
# 模块文件在挂载时无法安全修改
# 通过 Magisk app 安装的模块将存储在此处并将在下次重新启动时
# 合并到 $SECURE_DIR/modules 中
$SECURE_DIR/modules_update

# 数据库存储设置和 Root 权限
MAGISKDB=$SECURE_DIR/magisk.db

# 所有与 magisk 相关的二进制文件，包括 busybox、脚本
# 和 magisk 二进制文件。用于支持模块安装、addon.d、 
# Magisk app 等。
DATABIN=$SECURE_DIR/magisk

```

## Magisk 启动过程

### 预初始化（Pre-Init）

`magiskinit` 替换 `init` 作为第一个运行的程序。

- 挂载早期所需的分区（`sysfs`、`procfs`、`devtmpfs`，以及可用的预初始化分区）。
- 在传统 system-as-root 设备上，`magiskinit` 将 root 切换到 `/system`。在两阶段初始化（2SI）设备上，`magiskinit` 通过将 `magiskinit` 绑定挂载到 `/system/bin/init` 上来拦截第一阶段 `init` 的根切换（`SwitchRoot`）到 `/system`（使用 ramfs 中的 `/sdcard` -> `/storage/self/primary` -> `/system/system/bin/init` 符号链接技巧，或退回到对 `/init` 进行十六进制修补，将 `/system/bin/init` 重定向到 `/data/magiskinit`），从而允许原始第一阶段 `init` 先为我们挂载动态分区，然后将控制权交还给作为第二阶段 `init` 的 `magiskinit`。
- 将 Magisk 服务注入 `init.rc`，并应用任何 `overlay.d` 根目录替换/挂载。
- 使用三种策略之一拦截并修补 SELinux 策略（合并内置 Magisk 规则和预初始化分区中的自定义 `sepolicy.rule` 文件），具体取决于设备架构：
  - **2SI（Android 10+）**：在 `init` 上设置 `LD_PRELOAD`（`init-ld`）以钩住 `security_load_policy`，并在策略写入内核之前直接在内存中拦截策略加载。
  - **Treble / 拆分策略（Android 8.0–9.0）**：提前挂载 `selinuxfs`，并用自定义节点替换 `/sys/fs/selinux/load` 和 `/sys/fs/selinux/enforce`（使用 FIFO 暂停 `init`，直到 `magiskinit` 完成修补并将策略加载到内核）。
  - **传统（Android 7.0–7.1）**：用 FIFO 替换 `/selinux_version`（或 `/sepolicy_version`），在 `init` 挂载 `selinuxfs` 后立即暂停它，然后像 Treble 策略一样用自定义节点替换 `/sys/fs/selinux/load` 和 `/sys/fs/selinux/enforce`。
- 恢复原始 `init` 并执行它以继续启动过程。

### 解密后（post-fs-data）

当 `/data` 被解密和挂载时会在 `post-fs-data` 上触发。守护程序 `magiskd` 被启动，评估安全模式（如果设备连续两次未能到达 `boot-complete`，或者通过按键组合或 Magisk app 触发了安全模式，则禁用所有模块和 Zygisk），处理 `post-fs-data` 脚本和模块 `system.prop` 文件，并魔法挂载已启用的模块文件。

### 后期启动（late_start）

在稍后的引导过程中，将触发类 `late_start` ，并启动 Magisk “服务”模式。在此模式下，执行通用脚本和模块的 `service.sh` 脚本。

### 启动完成（boot-complete）

当触发 `sys.boot_completed=1` 时，Magisk 会重置启动循环计数器，为将来的模块安装挂载/符号链接可写的 `preinit` 存储目录，并最终确定 Zygisk 状态。

## 重置属性（Resetprop）

通常，系统属性（properties）被设计为仅由 `init` 更新，并且对非 root 进程是只读的。使用 root，您可以通过使用诸如 `setprop` 之类的命令向 `property_service`（由 `init` 托管）发送请求来更改属性，但仍然禁止更改只读属性（以`ro.`开头的属性，如`ro.build.product`）和删除属性。

`resetprop` 是通过从 AOSP 中提取出与系统属性相关的源代码来实现的，并进行了修补，以允许直接修改属性区域或 `prop_area`，而无需通过 `property_service` 。由于我们绕过了 `property_service` ，因此需要注意一些：

- 如果属性更改未通过 `property_service` ，则不会触发在 `*.rc` 脚本中注册的 `on property:foo=bar` 操作。对于非只读属性，`resetprop` 的默认设置属性行为会通过 `property_service` （与 `setprop` 一致），**将触发事件**。修改只读（`ro.*`）属性或传入 `-n` 标志会绕过 `property_service` 并直接修改 `prop_area` ，**不会**触发属性事件。
- 持久属性（以 `persist.` 开头的属性，如 `persist.sys.usb.config` ）存储在 `prop_area` 和 `/data/property` 中。默认情况下，删除属性不会将它们从持久存储中删除，这意味着该属性将在下次重新启动后恢复;读取属性不会从持久存储中读取，因为这是 `getprop` 的行为。使用标志 `-p` ，删除属性将同时删除 `prop_area` 和 `/data/property` 中的属性，读取属性将从 `prop_area` 和持久存储中读取。

## SELinux 政策

Magisk 会修补原厂 `sepolicy` ，以确保 root 和 Magisk 操作能够安全可靠地执行：

- `magisk`（`u:r:magisk:s0`）：一个不受约束的宽容域，`magiskd` 和所有 root shell 都在其中运行。
- `magisk_file`（`u:object_r:magisk_file:s0`）：一种不受限制的文件类型，所有域均可访问，用于标记 Magisk sockets、二进制文件和内部节点。
- `magisk_log_file`（`u:object_r:magisk_log_file:s0`）：一种专用的 FIFO 文件类型，用于 Magisk 日志管道，所有域都可以写入，但只有 `zygote` （以及 `magisk`）可以打开并读取。
- 选定的客户端域（`zygote`、`shell`、`platform_app`、`system_app`、`priv_app`、`untrusted_app`、`untrusted_app_all`）被允许连接到 `magisk` Unix 流套接字（用于 `su`、`magisk` 和 Zygisk IPC），并共享 root shell 伪终端（`devpts`）的文件描述符。

完整的内置策略规则集可在 `native/src/sepolicy/rules.rs` 中找到。

## 参考链接

- [Magisk Internal Details](https://topjohnwu.github.io/Magisk/details.html)（官方）
- [Magisk 内部细节](https://e7kmbb.github.io/Magisk/details.html)
