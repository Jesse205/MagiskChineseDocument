# 内部细节

## 文档结构

### “Magisk tmpfs 目录”中的路径

Magisk 将安装一个 `tmpfs` 目录来存储一些临时数据。对于带有 `/sbin` 文件夹的设备，将选择该文件夹，因为它还将充当将二进制文件注入 `PATH` 的覆盖层。从Android 11 开始，`/sbin` 文件夹可能不存在，因此 Magisk 将在 `/dev` 下随机创建一个文件夹，并将其用作基本文件夹。

```
# 为了获得Magisk正在使用的当前基本文件夹，使用命令 `magisk--path`。
# 二进制文件，如 magisk、magiskinit 和所有小程序的符号链接直接存储
# 在此路径中。这意味着当这是/sbin，这些二进制文件将直接在 PATH 中。
MAGISKBASE=$(magisk --path)

# Magisk 内部材料
MAGISKTMP=$MAGISKBASE/.magisk

# Magisk 的 BusyBox 目录。在此文件夹中存储 busybox 二进制文件和指向
# 其所有小程序的符号链接。
# 不推荐使用此目录，请直接调用 /data/adb/magisk/busybox 并使用
# Busybox 的 ASH 独立模式。将来将删除此路径的创建。
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

# Magisk在内部创建用于挂载映像的 Block 设备。
$MAGISKTMP/block

# 根目录修补程序文件
# 在 system-as-root 的系统上，/不可写。
# 所有预初始化补丁文件都存储在这里绑定挂载。
$MAGISKTMP/rootdir
```

### `/data`中的路径

一些二进制文件和文件应存储在 `/data` 中的非易失性存储中。为了防止检测，所有东西都必须存储在“/data”中安全且不可检测的地方。选择文件夹 `/data/adb` 是因为具有以下优点：

- 它是现代安卓系统上的一个现有文件夹，因此不能作为Magisk存在的标志。
- 文件夹的权限默认为 `700`，所有者为 `root`，因此非root进程无法以任何可能的方式进入、读取和写入文件夹。
- 文件夹 secontext 标记为  `u:object_r:adb_data_file:s0`，很少有进程有权与该secontext进行任何交互。
- 该文件夹位于 _设备加密存储区_ 中，因此一旦数据正确装载到FBE（基于文件的加密）设备中，即可访问该文件夹。

```
SECURE_DIR=/data/adb

# 存储常规 post-fs-data 脚本的文件夹
$SECURE_DIR/post-fs-data.d

#存储常规 late_start 服务脚本的文件夹
$SECURE_DIR/service.d

# Magisk 模块
$SECURE_DIR/modules

# 等待升级的Magisk模块
# 模块文件在挂载时无法安全修改
# 通过 Magisk app 安装的模块将存储在此处并将在下次重新启动时
# 合并到 $SECURE_DIR/modules 中
$SECURE_DIR/modules_update

# 数据库存储设置和 Root 权限
MAGISKDB=$SECURE_DIR/magisk.db

# 所有与magisk相关的二进制文件，包括 busybox、脚本
# 和 magisk 二进制文件。用于支持模块安装、addon.d、 
# Magisk app 等。
DATABIN=$SECURE_DIR/magisk

```

## Magisk引导过程

### 预初始化

`magiskinit` will replace `init` as the first program to run.

- Early mount required partitions. On legacy system-as-root devices, we switch root to system; on 2SI devices, we patch the original `init` to redirect the 2nd stage init file to magiskinit and execute it to mount partitions for us.
- Inject magisk services into `init.rc`
- On devices using monolithic policy, load sepolicy from `/sepolicy`; otherwise we hijack nodes in selinuxfs with FIFO, set `LD_PRELOAD` to hook `security_load_policy` and assist hijacking on 2SI devices, and start a daemon to wait until init tries to load sepolicy.
- Patch sepolicy rules. If we are using "hijack" method, load patched sepolicy into kernel, unblock init and exit daemon
- Execute the original `init` to continue the boot process

### post-fs-data

This triggers on `post-fs-data` when `/data` is decrypted and mounted. The daemon `magiskd` will be launched, post-fs-data scripts are executed, and module files are magic mounted.

### late_start

Later in the booting process, the class `late_start` will be triggered, and Magisk "service" mode will be started. In this mode, service scripts are executed.

## Resetprop

Usually, system properties are designed to only be updated by `init` and read-only to non-root processes. With root you can change properties by sending requests to `property_service` (hosted by `init`) using commands such as `setprop`, but changing read-only props (props that start with `ro.` like `ro.build.product`) and deleting properties are still prohibited.

`resetprop` is implemented by distilling out the source code related to system properties from AOSP and patched to allow direct modification to property area, or `prop_area`, bypassing the need to go through `property_service`. Since we are bypassing `property_service`, there are a few caveats:

- `on property:foo=bar` actions registered in `*.rc` scripts will not be triggered if property changes does not go through `property_service`. The default set property behavior of `resetprop` matches `setprop`, which **WILL** trigger events (implemented by first deleting the property then set it via `property_service`). There is a flag `-n` to disable it if you need this special behavior.
- persist properties (props that starts with `persist.`, like `persist.sys.usb.config`) are stored in both `prop_area` and `/data/property`. By default, deleting props will **NOT** remove it from persistent storage, meaning the property will be restored after the next reboot; reading props will **NOT** read from persistent storage, as this is the behavior of `getprop`. With the flag `-p`, deleting props will remove the prop in **BOTH** `prop_area` and `/data/property`, and reading props will be read from **BOTH** `prop_area` and persistent storage.

## SELinux Policies

Magisk will patch the stock `sepolicy` to make sure root and Magisk operations can be done in a safe and secure way. The new domain `magisk` is effectively permissive, which is what `magiskd` and all root shell will run in. `magisk_file` is a new file type that is setup to be allowed to be accessed by every domain (unrestricted file context).

Before Android 8.0, all allowed su client domains are allowed to directly connect to `magiskd` and establish connection with the daemon to get a remote root shell. Magisk also have to relax some `ioctl` operations so root shells can function properly.

After Android 8.0, to reduce relaxation of rules in Android's sandbox, a new SELinux model is deployed. The `magisk` binary is labelled with `magisk_exec` file type, and processes running as allowed su client domains executing the `magisk` binary (this includes the `su` command) will transit to `magisk_client` by using a `type_transition` rule. Rules strictly restrict that only `magisk` domain processes are allowed to attribute files to `magisk_exec`. Direct connection to sockets of `magiskd` are not allowed; the only way to access the daemon is through a `magisk_client` process. These changes allow us to keep the sandbox intact, and keep Magisk specific rules separated from the rest of the policies.

The full set of rules can be found in `magiskpolicy/rules.cpp`.
