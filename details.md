# 内部细节

## 文档结构

### “Magisk tmpfs 目录”中的路径

Magisk 将安装一个 `tmpfs` 目录来存储一些临时数据。对于带有 `/sbin` 文件夹的设备，将选择该文件夹，因为它还将充当将二进制文件注入 `PATH` 的覆盖层。从 Android 11 开始，`/sbin` 文件夹可能不存在，因此 Magisk 将在 `/dev` 下随机创建一个文件夹，并将其用作基本文件夹。

``` shell
# 为了获得Magisk正在使用的当前基本文件夹，使用命令 `magisk--path`。
# 二进制文件，如 magisk、magiskinit 和所有小程序的符号链接直接存储
# 在此路径中。这意味着当这是/sbin，这些二进制文件将直接在 PATH 中。
MAGISKBASE=$(magisk --path)

# Magisk 内部材料
MAGISKTMP=$MAGISKBASE/.magisk

# Magisk 的 BusyBox 目录。在此文件夹中存储 busybox 二进制文件和指向
# 其所有小程序的符号链接。
# 不推荐使用此目录，请直接调用 /data/adb/magisk/busybox 并使用
# Busybox 的 ASH 独立模式。将来会删除此路径的创建。
$MAGISKTMP/busybox

# /data/adb/modules 将挂载到此处。
# 由于 nosuid 挂载标志，未使用原始文件夹。
$MAGISKTMP/modules

# 当前 Magisk 安装配置
$MAGISKTMP/config

# 分区映像
# 此路径中的每个目录都将装载其目录名的分区。
# 例如 system，system_ext，vendor，data ...
$MAGISKTMP/mirror

# Magisk 在内部创建用于挂载映像的 Block 设备。
$MAGISKTMP/block

# 根目录修补程序文件
# 在 system-as-root 的系统上，/不可写。
# 所有预初始化补丁文件都存储在这里绑定挂载。
$MAGISKTMP/rootdir
```

### `/data` 中的路径

一些二进制文件和文件应存储在 `/data` 中的非易失性存储中。为了防止检测，所有东西都必须存储在 `/data` 中安全且不可检测的地方。选 `/data/adb` 文件夹是因为其具有以下优点：

- 它是现代安卓系统上的一个现有文件夹，因此不能作为 Magisk 存在的标志。
- 文件夹的权限默认为 `700`，所有者为 `root`，因此非 root 进程无法以任何可能的方式进入、读取和写入文件夹。
- 文件夹 secontext 标记为  `u:object_r:adb_data_file:s0`，很少有进程有权与该 secontext 进行任何交互。
- 该文件夹位于*设备加密存储区*中，因此一旦数据正确装载到 FBE（File-Based Encryption，基于文件的加密）设备中，即可访问该文件夹。

``` shell
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

## Magisk引导过程

### 预初始化（Pre-Init）

`magiskinit` 将替换 `init` 作为第一个运行的程序。

- 挂载早期所需的分区。在已停产 system-as-root 设备上，我们将 root 切换到系统；在 2SI 设备上，我们修补原始的 `init` ，将第二阶段的 init 文件重定向到 magiskinit，并执行它为我们装载分区。
- 将 magisk 服务注入 `init.rc`
- 在使用 monolithic 策略的设备上，从 `/sepolicy` 加载 sepolicy ；否则我们使用 FIFO 劫持 selinuxfs 中的节点，将 `LD_PRELOAD` 设置为钩住 `security_load_policy`，并在 2SI 设备上协助劫持，然后启动守护程序，等待 init 尝试加载 sepolicy。
- 修补 sepolicy 规则。如果我们使用“劫持”方法，将修补的 sepolicy 加载到内核中，取消阻止 init 并退出守护进程
- 执行原始的 `init` 以继续启动过程

### 解密后（post-fs-data）

当 `/data` 被解密和装载时会在 `post-fs-data` 上触发。守护程序 `magiskd` 将被启动，执行 post-fs-data 脚本，并神奇地安装模块文件。

### 后期启动（late_start）

在稍后的引导过程中，将触发类 `late_start` ，并启动 Magisk “服务”模式。在此模式下，执行服务（service）脚本。

## 重置属性（Resetprop）

通常，系统属性（properties）被设计为仅由 `init` 更新，并且对非 root 进程是只读的。使用 root，您可以通过使用诸如 `setprop` 之类的命令向 `property_service`（由 `init` 托管）发送请求来更改属性，但仍然禁止更改只读属性（以`ro.`开头的属性，如`ro.build.product`）和删除属性。

`resetprop` 是通过从 AOSP 中提取出与系统属性相关的源代码来实现的，并进行了修补，以允许直接修改属性区域或 `prop_area`，而无需通过 `property_service` 。由于我们绕过了 `property_service` ，因此需要注意一些：

- 如果属性更改未通过 `property_service` ，则不会触发在 `*.rc` 脚本中注册的`on property:foo=bar` 操作。`resetprop` 的默认设置属性行为与 `setprop` 匹配，**这将触发事件**（通过首先删除属性，然后通过 `property_service` 设置它来实现）。如果您需要此特殊行为，则有一个标志 `-n` 可以禁用它。
- 持久属性（以 `persist.` 开头的属性，如 `persist.sys.usb.config` ）存储在 `prop_area` 和 `/data/property` 中。默认情况下，删除属性不会将其从持久存储中删除，这意味着该属性将在下次重新启动后恢复;读取属性不会从持久存储中读取，因为这是 `getprop` 的行为。使用标志 `-p` ，删除属性将同时删除 `prop_area` 和 `/data/property` 中的属性，读取属性将从 `prop_area` 和持久存储中读取。

## SELinux 政策

Magisk 将修补现成的 `sepolicy` ，以确保 Root 和 Magisk 操作能够以安全可靠的方式完成。新域 `magisk` 是有效的，这就是 `magiskd` 和所有 root shell 将在其中运行的内容。`magisk_file` 是一种新的文件类型，设置为允许每个域（不受限制的文件上下文）访问。

在 Android8.0 之前，所有允许的 su 客户端域都可以直接连接到 `magiskd` 并与守护进程建立连接，以获得远程 root shell。Magisk 还必须放宽一些 `ioctl` 操作，以便 root shell 能够正常运行。

在 Android 8.0 之后，为了减少 Android 沙盒中规则的放宽，部署了新的 SELinux 模型。 `magisk`  二进制文件标记为 `magisk_exec` 文件类型，并且执行 `magisk` 二进制文件（包括 `su` 命令）的 su 客户端域将通过使用 `type_transition` 规则传输到 `magisk_client` 。规则严格限制仅允许 `magisk` 域进程将文件归因于 `magisk_exec` 。不允许直接连接到 `magiskd` 的 sockets；访问守护进程的唯一方法是通过 `magisk_client` 进程。这些更改使我们能够保持沙盒完好无损，并将 Magisk 特定规则与其他策略分开。

完整的规则可以在 `magiskpolicy/rules.cpp` 中找到。

## 参考链接
* [Magisk Internal Details](https://topjohnwu.github.io/Magisk/details.html)
* [Magisk 内部细节](https://e7kmbb.github.io/Magisk/details.html)