# 开发者指南

## BusyBox

Magisk 附带了一个完整的 BusyBox 二进制（包括完整的 SELinux 支持）。可执行文件位于 `/data/adb/magisk/busybox` 。Magisk 的 BusyBox 支持运行时可切换的“ASH独立外壳模式”。这种独立模式的意思是，当在 BusyBox 的 `ash` shell 中运行时，无论 `PATH` 设置为什么，每个命令都将直接使用 BusyBox 中的 applet。例如，像 `ls`、`rm`、`chmod` 这样的命令将**不使用** `PATH` 中的内容（在 Android 上，这些命令默认情况下分别为 `/system/bin/ls` 、`/system/bin/rm` 和 `/system/bin/chmod` ），而是直接调用内部 BusyBox 小程序。这确保脚本始终在可预测的环境中运行，并且无论在哪个 Android 版本上运行，都始终具有完整的命令集。要*强制命令不使用BusyBox*，必须使用完整路径调用可执行文件。

在 Magisk 环境下运行的每一个 shell 脚本都将在启用独立模式（Standalone Mode）的 BusyBox 的 `ash` shell 中执行。对于与第三方开发人员相关的内容，这包括所有启动脚本和模块安装脚本。

对于想在 Magisk 之外使用“独立模式”功能的开发者，有两种方法可以启用它：

1. 将环境变量 `ASH_STANDALONE` 设置为 `1`\
   示例：`ASH_STANDALONE=1 /data/adb/magisk/busybox sh <script>`
2. 使用命令行选项切换：\
   `/data/adb/magisk/busybox sh -o standalone <script>`

为了确保所有后续执行的 `sh` shell 也以独立模式运行，选项1是首选方法（这是 Magisk 和 Magisk app 内部使用的方法），因为环境变量继承到子进程。

## Magisk 模块

Magisk 模块是放置在 `/data/adb/modules` 中的文件夹，结构如下：

``` txt
/data/adb/modules
├── .
├── .
|
├── $MODID                  <-- 文件夹以模块的 ID 命名
│   │
│   │      *** 模块 ID ***
│   │
│   ├── module.prop         <-- 此文件存储模块的元数据（metadata）
│   │
│   │      *** 主要内容 ***
│   │
│   ├── system              <-- 如果 skip_mount 不存在，将挂载此文件夹
│   │   ├── ...
│   │   ├── ...
│   │   └── ...
│   │
│   ├── zygisk              <-- 此文件夹包含模块的 Zygisk native 库
│   │   ├── arm64-v8a.so
│   │   ├── armeabi-v7a.so
│   │   ├── x86.so
│   │   ├── x86_64.so
│   │   └── unloaded        <-- 如果存在，则 native 库不兼容
│   │
│   │      *** 状态标志 ***
│   │
│   ├── skip_mount          <-- 如果存在，Magisk 将不会挂载您的 system 文件夹
│   ├── disable             <-- 如果存在，模块将被禁用
│   ├── remove              <-- 如果存在，模块将在下次重新启动时删除
│   │
│   │      *** 可选文件 ***
│   │
│   ├── post-fs-data.sh     <-- 此脚本将在 post-fs-data 中执行
│   ├── service.sh          <-- 此脚本将在 late_start 服务中执行
|   ├── uninstall.sh        <-- 当 Magisk 删除您的模块时，将执行此脚本
│   ├── system.prop         <-- resetprop 将此文件中的属性作为系统属性加载
│   ├── sepolicy.rule       <-- 其他自定义 sepolicy 规则
│   │
│   │      *** 自动生成，请勿手动创建或修改 ***
│   │
│   ├── vendor              <-- $MODID/system/vendor 的符号链接
│   ├── product             <-- $MODID/system/product 的符号链接
│   ├── system_ext          <-- $MODID/system/system_ext 的符号链接
│   │
│   │      *** 允许任何其他的文件/文件夹 ***
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

### module.prop

这是 `module.prop` **必须遵守的**格式

``` properties:line-numbers
id=<字符串> <string>
name=<字符串> <string>
version=<字符串> <string>
versionCode=<整数> <int>
author=<字符串> <string>
description=<字符串> <string>
updateJson=<链接> <url> (可选)
```

- `id` 必须匹配此正则表达式：`^[a-zA-Z][a-zA-Z0-9._-]+$`（译者注：也就是由字母、数字、点 `.` 、下划线 `_` 和减号 `-` 组成，且开头必须为字母）\
  示例: `a_module` <Badge text="✓" /> ，`a.module` <Badge text="✓" /> ，`module-101` <Badge text="✓" /> ，`a module` <Badge type="danger" text="✗" /> ，`1_module` <Badge type="danger" text="✗" /> ，`-a-module` <Badge type="danger" text="✗" />\
  这是模块的**唯一标识符**。模块发布后，您不应更改它。
- `versionCode` 必须是**整数**。这用于对比版本，以便检查更新。
- `updateJson` 应该指向一个 URL，该 URL 下载提供信息的 JSON，以便 Magisk app 可以更新模块。
- 上面没有提到的其他字符串可以是任何**单行**字符串。
- 确保使用 `UNIX (LF)` 换行类型，而不是 `Windows (CR+LF)` 或 `Macintosh (CR)`。

更新的 JSON 的格式：

``` json:line-numbers
{
    "version": string,
    "versionCode": int,
    "zipUrl": url,
    "changelog": url
}
```

### Shell 脚本 (`*.sh`)

请阅读 [启动脚本](#启动脚本) 部分，了解 `post-fs-data.sh` 和 `service.sh` 之间的区别。对于大多数模块开发人员来说，如果您只需要运行引导脚本，`service.sh` 应该足够好了。

在模块的所有脚本中，请使用 `MODDIR=${0%/*}` 获取模块的基本目录路径；**不要**在脚本中硬编码模块路径。\
如果启用了Zygisk，则环境变量 `ZYGISK_ENABLED` 将设置为 `1` 。

### `system` 文件夹

要替换/注入的所有文件都应放在此文件夹中。此文件夹将以递归方式合并到真正的 `/system` 中，也就是说：真实 `/system` 中的现有文件将被模块 `system` 中的文件替换，模块 `system` 中的新文件将被添加到真实 `/system` 中。

如果您将名为 `.replace` 的文件放在任何文件夹中，而不是合并其内容，则该文件夹将直接替换实际系统中的文件夹。这对于交换整个文件夹非常方便。

如果要替换 `/vendor` 、 `/product` 或 `/system_ext` 中的文件，请分别将它们放在 `system/vendor` 、`system/product` 和 `system/system_ext` 下。Magisk 将透明地处理这些分区是否位于单独的分区中。

### zygisk

Zygisk 是 Magisk 的一项功能，它允许高级模块开发人员在每个 Android 应用程序的进程中直接运行代码，然后再进行专业化和运行。有关 Zygisk API 和构建 Zygisk 模块的更多详细信息，请查看 [Zygisk 模块示例](https://github.com/topjohnwu/zygisk-module-sample) 项目。

### system.prop

此文件遵循与 `build.prop` 相同的格式。每行由 `[key]=[value]`组成。

### sepolicy.rule

如果您的模块需要一些额外的 sepolicy 补丁，请将这些规则添加到此文件中。此文件中的每一行都将被视为策略语句。有关如何格式化策略语句的更多详细信息，请查看 [magiskpolicy](tools.md#magiskpolicy) 的文档。

## Magisk 模块安装程序

Magisk 模块安装程序是打包在 zip 文件中的 Magisk 模块，可以在 Magisk 应用程序或第三方recovery（如 TWRP）中刷入。最简单的 Magisk 模块安装程序只是一个打包为 zip 文件的 Magisk 模块，此外还有以下文件：

- `update-binary`：下载最新的 [module_installer.sh](https://github.com/topjohnwu/Magisk/blob/master/scripts/module_installer.sh) 并将该脚本重命名或复制为 `update-binary`
- `updater-script`：这个文件应该只包含字符串 “`#MAGISK`”

模块安装程序脚本将会设置环境，将模块文件从 zip 文件提取到正确的位置，然后完成安装过程，这对于大多数简单的 Magisk 模块来说应该足够好了。

``` txt
模块module.zip
│
├── META-INF
│   └── com
│       └── google
│           └── android
│               ├── update-binary      <-- 您下载 module_installer.sh
│               └── updater-script     <-- 应只包含字符串“#MAGISK”
│
├── customize.sh                       <-- （可选，稍后将详细介绍）
│                                           此脚本将来源于 update-binary
├── ...
├── ...  /* 模块的其余文件 */
│
```

### 自定义

如果需要自定义模块安装过程，可以选择在安装程序中创建名为 `customize.sh` 的脚本。在提取所有文件并设置默认权限和 secontext 后，该脚本将由 update-binary 脚本*提供*（未执行！）。如果您的模块需要基于设备 ABI 进行其他设置，或者您需要为某些模块文件设置特殊权限/secontext，这将非常有用。

如果要完全控制和自定义安装过程，请在 `customize.sh` 中声明 `SKIPUNZIP=1` 以跳过所有默认安装步骤。这样，您的 `customize.sh` 将负责自行安装所有内容。

`customize.sh` 脚本在 Magisk 的 BusyBox `ash` shell 中运行，并启用了“独立模式”。以下变量和函数可用：

#### 变量

- `MAGISK_VER` (string): 当前安装的 Magisk 的版本字符串（例如 `v20.0` ）
- `MAGISK_VER_CODE` (int): 当前安装的Magisk的版本代码（例如 `20000` ）
- `BOOTMODE` (bool): 如果模块在 Magisk app 中安装，则为 `true`
- `MODPATH` (path): 模块文件应安装的路径
- `TMPDIR` (path): 可以临时存储文件的地方
- `ZIPFILE` (path): your module's installation zip 模块的压缩文件
- `ARCH` (string): 设备的 CPU 架构。值为 `arm` 、`arm64` 、`x86` 或 `x64`
- `IS64BIT` (bool): 如果 `$ARCH` 是 `arm64` 或 `x64` ，则为 `true`
- `API` (int): 设备的 API 级别（安卓版本）（例如，Android 6.0 的 `23` ）

::: tip 提示
您可以在 [这里](https://source.android.google.cn/docs/setup/about/build-numbers#platform-code-names-versions-api-levels-and-ndk-releases) 找到所有 Android 版本对应的 API 级别
:::

#### 函数

``` bash
ui_print <msg>
    打印 <msg> 到控制台
    请避免使用“echo”，因为它不会显示在第三方 recovery 的控制台中

abort <msg>
    打印错误消息 <msg> 到控制台并终止安装
    请避免使用“exit”，因为它会跳过终止清理步骤

set_perm <target> <owner> <group> <permission> [context]
    如果未指定 [context]，则默认值为“u:object_r:system_file:s0”
    此函数是以下命令的简写：
       chown owner.group target
       chmod permission target
       chcon context target

set_perm_recursive <directory> <owner> <group> <dirpermission> <filepermission> [context]
    如果未指定 [context]，则默认值为“u:object_r:system_file:s0”
    此函数是以下psuedo代码的简写：
      set_perm <directory> owner group dirpermission context
      对于 <directory> 内的文件：
        set_perm file owner group filepermission context
      对于 <directory> 内的文件夹：
        set_perm_recursive dir owner group dirpermission context
```

为方便起见，您还可以在变量名称 `REPLACE` 中声明要替换的文件夹列表。模块安装程序脚本会将 `.replace` 文件创建到 `REPLACE` 中列出的文件夹中。例如：

``` sh
REPLACE="
/system/app/YouTube
/system/app/Bloatware
"
```

上面的列表将对应创建以下文件：`$MODPATH/system/app/YouTube/.replace` 和 `$MODPATH/system/app/Bloatware/.replace` 。

### 注意

- 使用 Magisk 应用程序下载模块时，`update-binary` 将**强制替换为最新的 [`module_installer.sh`](https://github.com/topjohnwu/Magisk/blob/master/scripts/module_installer.sh)** 。 **不要尝试在 `update-binary` 中添加任何自定义逻辑**。
- 由于历史原因，**请勿在模块 zip 中添加名为 `install.sh` 的文件**。
- **不要在 `customize.sh` 末尾调用 `exit`** 。模块安装程序脚本必须在退出之前执行一些清理。

## 启动脚本

在 Magisk 中，您可以以两种不同的模式运行启动脚本：**post-fs-data** 和 **late_start service** 模式。

- post-fs-data 模式
  - 此阶段会阻塞。启动过程在执行完成，或过 10 秒前暂停。
  - 脚本在装入任何模块之前运行。这允许模块开发人员在安装模块之前动态调整其模块。
  - 这个阶段发生在 Zygote 启动之前，这几乎意味着是 Android 的一切
  - **警告**：使用 `setprop` 将导致启动过程死锁！请改用 `resetprop -n <prop_name> <prop_value>` 。
  - **仅在必要时在此模式下运行脚本**。
- late_start service 模式
  - 此阶段为非阻塞。脚本与引导过程的其余部分并行运行。
  - **建议大多数脚本在此阶段运行**

在 Magisk 中，还有 2 种脚本：**通用脚本**和**模块脚本**。

- 通用脚本
  - 放置在 `/data/adb/post-fs-data.d` 或 `/data/adb/service.d` 中
  - 仅当脚本设置为可执行文件时才执行（`chmod +x script.sh`）
  - `post-fs-data.d` 中的脚本以 post-fs-data 模式运行，`service.d` 的脚本以 late_start service 模式运行。
  - 模块**不应在安装过程中添加常规脚本**
- 模块脚本
  - 放置在模块自己的文件夹中
  - 仅在启用模块时执行
  - `post-fs-data.sh` 以 post-fs-data 模式运行，而 `service.sh` 以 late_start service 模式运行。

所有启动脚本都将在 Magisk 的 BusyBox `ash` shell 中运行，并启用“独立模式”。

## 根目录覆盖系统

由于 `/` 在 system-as-root 设备上是只读的，因此 Magisk 提供了一个覆盖系统，使开发者能够替换根目录中的文件或添加新的 `*.rc` 脚本。此功能主要为第三方内核开发者设计。

覆盖文件应放在 boot 映像 ramdisk 的 `overlay.d` 文件夹中，并遵循以下规则：

1. 对于 `overlay.d` 中的每个 `*.rc` 文件（ `init.rc` 除外），**在 `init.rc` 之后**，如果在根目录中不存在，将读取并连接，否则将**替换现有文件**。
2. 现有文件可以替换为位于相同相对路径的文件
3. 与不存在的文件对应的文件将被忽略

要添加您在自定义 `*.rc` 脚本中引用的其他文件，请将它们添加到 `overlay.d/sbin` 中。上面的 3 条规则不适用于此文件夹中的任何内容；相反，它们将直接复制到Magisk 的内部 `tmpfs` 目录（以前是 `/sbin` ）。

从 Android 11 开始，`/sbin` 文件夹可能不再存在，在这种情况下，Magisk 会使用 `/debug_ramdisk` 来代替。当 `magiskinit` 将其注入 `init.rc` 时，`*.rc` 脚本中的 `${MAGISKTMP}` 都将替换为 Magisk  `tmpfs` 文件夹。在 Android 11 之前的设备上，`${MAGISKTMP}` 将简单地替换为 `/sbin` 。因此在引用这些附加文件时，`*.rc` 脚本中**永远不要硬编码 “`/sbin`”**。

下面是如何使用自定义 `*.rc` 脚本设置 `overlay.d` 的示例：

``` txt
ramdisk
│
├── overlay.d
│   ├── sbin
│   │   ├── libfoo.ko      <-- 这两个文件将被复制到 Magisk 的
│   │   └── myscript.sh    <-- 的 tmpfs 目录中
│   ├── custom.rc          <-- 此文件将被注入到 init.rc 中
│   ├── res
│   │   └── random.png     <-- 此文件将替换 /res/random.png
│   └── new_file           <-- 此文件将被忽略，因为 /new_file 不存在
├── res
│   └── random.png         <-- 此文件将被 /overlay.d/res/random.png
|                               替换
├── ...
├── ...  /* 其余的 initramfs 文件 */
│
```

这是 `custom.rc` 的示例：

::: code-group

``` sh:line-numbers [中文汉化]
# 使用 ${MAGISKTMP} 引用 Magisk 的 tmpfs 目录

on early-init
    setprop sys.example.foo bar
    insmod ${MAGISKTMP}/libfoo.ko
    start myservice

service myservice ${MAGISKTMP}/myscript.sh
    oneshot
```

``` sh:line-numbers [英文原版]
# Use ${MAGISKTMP} to refer to Magisk's tmpfs directory

on early-init
    setprop sys.example.foo bar
    insmod ${MAGISKTMP}/libfoo.ko
    start myservice

service myservice ${MAGISKTMP}/myscript.sh
    oneshot
```

:::

## 参考链接

- [Magisk Developer Guides](https://topjohnwu.github.io/Magisk/guides.html)（官方）
- [Magisk 开发者指南](https://e7kmbb.github.io/Magisk/guides.html)
