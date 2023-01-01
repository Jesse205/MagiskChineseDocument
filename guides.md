# 开发人员指南

## BusyBox

Magisk 附带了一个完整的 BusyBox 二进制（包括完整的 SELinux 支持）。可执行文件位于 `/data/adb/magisk/busybox` 。Magisk 的 BusyBox 支持运行时可切换的“ASH独立外壳模式”。这种独立模式的意思是，当在 BusyBox 的 `ash` shell 中运行时，无论设置为 `PATH` ，每个命令都将直接使用 BusyBox 中的 applet。例如，像 `ls`、`rm`、`chmod` 这样的命令将**不使用** `PATH` 中的内容（在 Android 的情况下，默认情况下将分别为 `/system/bin/ls` 、`/system/bin/rm` 和 `/system/bin/chmod` ），而是直接调用内部 BusyBox 小程序。这确保脚本始终在可预测的环境中运行，并且无论在哪个 Android 版本上运行，都始终具有完整的命令集。要强制命令*不使用*BusyBox，必须使用完整路径调用可执行文件。

在 Magisk 上下文中运行的每个 shell 脚本都将在启用独立模式（Standalone Mode）的 BusyBox 的 `ash` shell中执行。对于与第三方开发人员相关的内容，这包括所有启动脚本和模块安装脚本。

对于那些想在 Magisk 之外使用“独立模式”功能的人，有两种方法可以启用它：

1. 将环境变量 `ASH_STANDALONE` 设置为 `1`<br>示例：`ASH_STANDALONE=1 /data/adb/magisk/busybox sh <script>`
2. 使用命令行选项切换：<br>`/data/adb/magisk/busybox sh -o standalone <script>`

为了确保所有后续执行的 `sh` shell 也以独立模式运行，选项1是首选方法（这是 Magisk 和 Magisk app 内部使用的方法），因为环境变量向下继承到子进程。

## Magisk 模块

Magisk 模块是放置在 `/data/adb/modules` 中的文件夹，结构如下：

```
/data/adb/modules
├── .
├── .
|
├── $MODID                  <--- 文件夹以模块的ID命名
│   │
│   │      *** 模块标识 ***
│   │
│   ├── module.prop         <--- 此文件存储模块的元数据（metadata）
│   │
│   │      *** 主要内容 ***
│   │
│   ├── system              <--- 如果skip_mount不存在，将装入此文件夹
│   │   ├── ...
│   │   ├── ...
│   │   └── ...
│   │
│   ├── zygisk              <--- 此文件夹包含模块的 Zygisk native 库
│   │   ├── arm64-v8a.so
│   │   ├── armeabi-v7a.so
│   │   ├── x86.so
│   │   ├── x86_64.so
│   │   └── unloaded        <--- 如果存在，则 native 库不兼容
│   │
│   │      *** 状态标志 ***
│   │
│   ├── skip_mount          <--- 如果存在，Magisk将不会装载您的系统文件夹
│   ├── disable             <--- 如果存在，模块将被禁用
│   ├── remove              <--- 如果存在，模块将在下次重新启动时删除
│   │
│   │      *** 可选文件 ***
│   │
│   ├── post-fs-data.sh     <--- 此脚本将在 post-fs-data 中执行
│   ├── service.sh          <--- 此脚本将在 late_start 服务中执行
|   ├── uninstall.sh        <--- 当Magisk删除您的模块时，将执行此脚本
│   ├── system.prop         <--- resetprop 将此文件中的属性作为系统属性加载
│   ├── sepolicy.rule       <--- 其他自定义 sepolicy 规则
│   │
│   │      *** 自动生成，请勿手动创建或修改 ***
│   │
│   ├── vendor              <--- $MODID/system/vendor 的符号链接
│   ├── product             <--- $MODID/system/product 的符号链接
│   ├── system_ext          <--- $MODID/system/system_ext 的符号链接
│   │
│   │      *** 允许任何其他文件/文件夹 ***
│   │
│   ├── ...
│   └── ...
|
├── 其他模块
│   ├── .
│   └── .
├── .
├── .
```

#### module.prop

这是 `module.prop` **必须遵守的**格式`

（以下代码块虽然标注为 js，但实际上是 prop，此操作仅为提供代码高亮）
``` js
id=<字符串> <string>
name=<字符串> <string>
version=<字符串> <string>
versionCode=<整数> <int>
author=<字符串> <string>
description=<字符串> <string>
updateJson=<链接> <url> (可选)
```

- `id` 必须匹配此正则表达式：`^[a-zA-Z][a-zA-Z0-9._-]+$`（也就是开头必须为字母，后面的为字母、数字、点 `.` 、下划线 `_` 和减号 `-`）<br>
  示例: `a_module` <Badge type="tip" text="✓" />、`a.module` <Badge type="tip" text="✓" />、`module-101` <Badge type="tip" text="✓" />、`a module` <Badge type="danger" text="✗" />、`1_module` <Badge type="danger" text="✗" />、`-a-module` <Badge type="danger" text="✗" /><br>
  这是模块的**唯一标识符**。模块发布后，您不应更改它。
- `versionCode `必须是**整数**。这用于对比版本
- `updateJson` 应该指向一个 URL，该 URL 下载JSON 以提供信息，以便 Magisk app 可以更新模块。
- 上面没有提到的其他字符串可以是任何**单行**字符串。
- 确保使用 `UNIX (LF)` 换行类型，而不是 `Windows (CR+LF)` 或 `Macintosh (CR)`。

更新的JSON的格式：

``` json
{
    "version": string,
    "versionCode": int,
    "zipUrl": url,
    "changelog": url
}
```

#### Shell 脚本 (`*.sh`)

请阅读[Boot Scripts](#boot-scripts) 部分，了解 `post-fs-data.sh` 和 `service.sh` 之间的区别。对于大多数模块开发人员来说，如果您只需要运行引导脚本，`service.sh` 应该足够好了。

在模块的所有脚本中，请使用 `MODDIR=${0%/*}` 获取模块的基本目录路径；**不要**在脚本中硬编码模块路径。<br>
如果启用了Zygisk，则环境变量 `ZYGISK_ENABLED` 将设置为 `1` 。

#### `system` 文件夹

All files you want to replace/inject should be placed in this folder. This folder will be recursively merged into the real `/system`; that is: existing files in the real `/system` will be replaced by the one in the module's `system`, and new files in the module's `system` will be added to the real `/system`.

要替换/注入的所有文件都应放在此文件夹中。此文件夹将以递归方式合并到真正的 `/system` 中;也就是说：真实 `/system` 中的现有文件将被模块 `system` 中的文件替换，模块 `system` 中的新文件将被添加到真实 `/system` 中。

如果您将名为 `.replace` 的文件放在任何文件夹中，而不是合并其内容，则该文件夹将直接替换实际系统中的文件夹。这对于交换整个文件夹非常方便。

如果要替换 `/vendor` 、`/product` 或 `/system_ext` 中的文件，请分别将它们放在 `system/vendor` 、`system/product` 和 `system/system_ext` 下。Magisk 将透明地处理这些分区是否位于单独的分区中。

#### Zygisk

Zygisk 是 Magisk 的一项功能，它允许高级模块开发人员在每个 Android 应用程序的进程中直接运行代码，然后再进行专业化和运行。有关 Zygisk API 和构建 Zygisk 模块的更多详细信息，请查看 [Zygisk 模块示例](https://github.com/topjohnwu/zygisk-module-sample)项目。

#### system.prop

此文件遵循与 `build.prop` 相同的格式。每行由 `[键 key]=[值 value]`组成。

#### sepolicy.rule

如果您的模块需要一些额外的 sepolicy 补丁，请将这些规则添加到此文件中。此文件中的每一行都将被视为策略语句。有关如何格式化策略语句的更多详细信息，请查看[magiskpolicy](tools.md#magiskpolicy)的文档。

## Magisk 模块安装程序

Magisk 模块安装程序是打包在 zip 文件中的 Magisk 模块，可以在 Magisk 应用程序或自定义recovery（如 TWRP）中刷入。最简单的 Magisk 模块安装程序只是一个打包为 zip 文件的 Magisk 模块，此外还有以下文件：

- `update-binary`：下载最新的 [module_installer.sh](https://github.com/topjohnwu/Magisk/blob/master/scripts/module_installer.sh) 并将该脚本重命名/复制为 `update-binary`
- `updater-script`：这个文件应该只包含字符串`#MAGISK`

模块安装程序脚本将设置环境，将模块文件从 zip 文件提取到正确的位置，然后完成安装过程，这对于大多数简单的 Magisk 模块来说应该足够好了。

```
模块module.zip
│
├── META-INF
│   └── com
│       └── google
│           └── android
│               ├── update-binary      <--- 您下载 module_installer.sh
│               └── updater-script     <--- 应仅包含字符串“#MAGISK”
│
├── customize.sh                       <--- （可选，稍后将详细介绍）
│                                           此脚本将来源于 update-binary
├── ...
├── ...  /* 模块的其余文件 */
│
```

#### 定制

If you need to customize the module installation process, optionally you can create a script in the installer named `customize.sh`. This script will be _sourced_ (not executed!) by the module installer script after all files are extracted and default permissions and secontext are applied. This is very useful if your module require additional setup based on the device ABI, or you need to set special permissions/secontext for some of your module files.

If you would like to fully control and customize the installation process, declare `SKIPUNZIP=1` in `customize.sh` to skip all default installation steps. By doing so, your `customize.sh` will be responsible to install everything by itself.

The `customize.sh` script runs in Magisk's BusyBox `ash` shell with "Standalone Mode" enabled. The following variables and functions are available:

##### Variables

- `MAGISK_VER` (string): the version string of current installed Magisk (e.g. `v20.0`)
- `MAGISK_VER_CODE` (int): the version code of current installed Magisk (e.g. `20000`)
- `BOOTMODE` (bool): `true` if the module is being installed in the Magisk app
- `MODPATH` (path): the path where your module files should be installed
- `TMPDIR` (path): a place where you can temporarily store files
- `ZIPFILE` (path): your module's installation zip
- `ARCH` (string): the CPU architecture of the device. Value is either `arm`, `arm64`, `x86`, or `x64`
- `IS64BIT` (bool): `true` if `$ARCH` is either `arm64` or `x64`
- `API` (int): the API level (Android version) of the device (e.g. `21` for Android 5.0)

##### Functions

```
ui_print <msg>
    print <msg> to console
    Avoid using 'echo' as it will not display in custom recovery's console

abort <msg>
    print error message <msg> to console and terminate the installation
    Avoid using 'exit' as it will skip the termination cleanup steps

set_perm <target> <owner> <group> <permission> [context]
    if [context] is not set, the default is "u:object_r:system_file:s0"
    this function is a shorthand for the following commands:
       chown owner.group target
       chmod permission target
       chcon context target

set_perm_recursive <directory> <owner> <group> <dirpermission> <filepermission> [context]
    if [context] is not set, the default is "u:object_r:system_file:s0"
    for all files in <directory>, it will call:
       set_perm file owner group filepermission context
    for all directories in <directory> (including itself), it will call:
       set_perm dir owner group dirpermission context
```

For convenience, you can also declare a list of folders you want to replace in the variable name `REPLACE`. The module installer script will create the `.replace` file into the folders listed in `REPLACE`. For example:

```
REPLACE="
/system/app/YouTube
/system/app/Bloatware
"
```

The list above will result in the following files being created: `$MODPATH/system/app/YouTube/.replace` and `$MODPATH/system/app/Bloatware/.replace`.

#### Notes

- When your module is downloaded with the Magisk app, `update-binary` will be **forcefully** replaced with the latest [`module_installer.sh`](https://github.com/topjohnwu/Magisk/blob/master/scripts/module_installer.sh). **DO NOT** try to add any custom logic in `update-binary`.
- Due to historical reasons, **DO NOT** add a file named `install.sh` in your module installer zip.
- **DO NOT** call `exit` at the end of `customize.sh`. The module installer script has to perform some cleanups before exiting.

## Boot Scripts

In Magisk, you can run boot scripts in 2 different modes: **post-fs-data** and **late_start service** mode.

- post-fs-data mode
  - This stage is BLOCKING. The boot process is paused before execution is done, or 10 seconds have passed.
  - Scripts run before any modules are mounted. This allows a module developer to dynamically adjust their modules before it gets mounted.
  - This stage happens before Zygote is started, which pretty much means everything in Android
  - **WARNING:** using `setprop` will deadlock the boot process! Please use `resetprop -n <prop_name> <prop_value>` instead.
  - **Only run scripts in this mode if necessary.**
- late_start service mode
  - This stage is NON-BLOCKING. Your script runs in parallel with the rest of the booting process.
  - **This is the recommended stage to run most scripts.**

In Magisk, there are also 2 kinds of scripts: **general scripts** and **module scripts**.

- General Scripts
  - Placed in `/data/adb/post-fs-data.d` or `/data/adb/service.d`
  - Only executed if the script is set as executable (`chmod +x script.sh`)
  - Scripts in `post-fs-data.d` runs in post-fs-data mode, and scripts in `service.d` runs in late_start service mode.
  - Modules should **NOT** add general scripts during installation
- Module Scripts
  - Placed in the module's own folder
  - Only executed if the module is enabled
  - `post-fs-data.sh` runs in post-fs-data mode, and `service.sh` runs in late_start service mode.

All boot scripts will run in Magisk's BusyBox `ash` shell with "Standalone Mode" enabled.

## Root Directory Overlay System

Since `/` is read-only on system-as-root devices, Magisk provides an overlay system to enable developers to replace files in rootdir or add new `*.rc` scripts. This feature is designed mostly for custom kernel developers.

Overlay files shall be placed in the `overlay.d` folder in boot image ramdisk, and they follow these rules:

1. All `*.rc` files in `overlay.d` will be read and concatenated **AFTER** `init.rc`
2. Existing files can be replaced by files located at the same relative path
3. Files that correspond to a non-existing file will be ignored

To add additional files which you can refer to in your custom `*.rc` scripts, add them into `overlay.d/sbin`. The 3 rules above do not apply to anything in this folder; instead, they will be directly copied to Magisk's internal `tmpfs` directory (which used to always be `/sbin`).

Starting from Android 11, the `/sbin` folder may no longer exists, and in that scenario, Magisk randomly generates a different `tmpfs` folder each boot. Every occurrence of the pattern `${MAGISKTMP}` in your `*.rc` scripts will be replaced with the Magisk `tmpfs` folder when `magiskinit` injects it into `init.rc`. On pre Android 11 devices, `${MAGISKTMP}` will simply be replaced with `/sbin`, so **NEVER** hardcode `/sbin` in the `*.rc` scripts when referencing these additional files.

Here is an example of how to setup `overlay.d` with a custom `*.rc` script:

```
ramdisk
│
├── overlay.d
│   ├── sbin
│   │   ├── libfoo.ko      <--- These 2 files will be copied
│   │   └── myscript.sh    <--- into Magisk's tmpfs directory
│   ├── custom.rc          <--- This file will be injected into init.rc
│   ├── res
│   │   └── random.png     <--- This file will replace /res/random.png
│   └── new_file           <--- This file will be ignored because
│                               /new_file does not exist
├── res
│   └── random.png         <--- This file will be replaced by
│                               /overlay.d/res/random.png
├── ...
├── ...  /* The rest of initramfs files */
│
```

Here is an example of the `custom.rc`:

```
# Use ${MAGISKTMP} to refer to Magisk's tmpfs directory

on early-init
    setprop sys.example.foo bar
    insmod ${MAGISKTMP}/libfoo.ko
    start myservice

service myservice ${MAGISKTMP}/myscript.sh
    oneshot
```
