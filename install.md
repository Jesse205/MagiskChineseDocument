# 安装

如果您已经安装了 Magisk ，**强烈建议**直接通过 Magisk 应用程序的「直接安装」方法进行升级。以下教程仅针对初始安装。

- 如果您在使用运行着 **EMUI 8** 或更高版本的华为设备，请查看[相应部分](#华为)。
- 如果您使用的是**搭载 Android 9.0** 或更高版本的三星设备（2019 年新设备），请查看[相应部分](#三星-system-as-root)。

## 入门

在你开始之前：

- 本教程假设您了解如何使用 `adb` 和 `fastboot`
- 如果您还计划安装第三方内核（kernels），请在安装 Magisk 之后安装它
- 必须解锁设备的引导加载程序（bootloader）

---

下载并安装最新的 [Magisk 应用程序](https://github.com/topjohnwu/Magisk/releases/latest) （只需下载「Magisk-版本.apk」即可） 在主屏幕中，您应该看到：

<p align="center"><img src="/images/device_info.png" width="500"/></p>

**Ramdisk** 的结果确定您的设备在 boot 分区中是否有 ramdisk。如果您的设备没有启动 ramdisk，请在继续之前阅读 [Recovery 中的 Magisk](#recovery-中的-magisk) 部分。

::: info 信息
不幸的是，有一些例外情况，因为某些设备的引导加载程序会接受 ramdisk，即使它不应该接受。 在这种情况下，您必须按照说明进行操作，就好像您的设备的 boot 分区**包含 ramdisk 一样**。 没有什么办法检测到这一点，因此唯一可以确定的方法就是实际尝试。 幸运的是，据我们所知，只有部分小米设备具有此属性，所以大多数人可以忽略这条信息。
:::

如果您的设备**有启动 ramdisk**，请获取 `boot.img` 或者 `init_boot.img`（如果存在。在出厂时搭载安卓13的设备通常是这样的，比如红米K60Pro）的副本。<br>

如果您的设备**没有启动 ramdisk**，请获取 `recovery.img` 的副本。<br>

您可以从官方固件包或第三方 ROM 刷机包中提取所需文件。

接下来，我们需要知道您的设备是否有单独的 `vbmeta` 分区。

- 如果您的官方固件包包含 `vbmeta.img` ，那么您的设备**有一个单独的 `vbmeta` 分区**
- 您还可以通过将设备连接到 PC 并运行以下命令进行检查：

  ```  shell
  adb shell ls -l /dev/block/by-name
  # 如果您遇到如 No such file or directory 的报错，那么请尝试把命令更换为
  adb shell ls -l /dev/block/bootdevice/by-name
  # 如果还是报错（比如华为设备），那么请联网搜索您的设备相对应的方法
  ```

- 如果找到 `vbmeta`、`vbmeta_a` 或 `vbmeta_b` ，那么您的设备**有一个单独的 `vbmeta` 分区**
- 否则，您的设备**没有单独的 `vbmeta` 分区**。

快速回顾一下，此时，您应该已经知道并准备好了：

1. 设备是否具有启动 ramdisk
2. 设备是否有单独的 `vbmeta` 分区
3. 基于 (1) 的 `boot.img` 、`init_boot.img` 或 `recovery.img`

让我们继续[修补映像](#修补映像).

## 修补映像

- 将 boot 、init_boot 或 recovery 映像（ `*.img` 文件）复制到设备
- 按下 Magisk 主屏幕中的 **「安装」** 按钮
- 如果要修补 recovery 映像，请选中 **「Recovery 模式」** 选项
- 如果您的设备**没有单独的 `vbmeta` 分区**，请选中 **「修补 boot 映像中的 vbmeta」** 选项
- 在方式中选择 **「选择并修补一个文件」** ，然后选择 boot 、init_boot 或 recovery 映像
- 开始安装，并使用 ADB 将修补的映像复制到您的电脑：

``` shell
adb pull /sdcard/Download/magisk_patched_[随机字符].img PC上magisk_patched.img的路径
```

> 提示，你可以将文件从资源管理器直接拖到终端中来获得文件绝对路径。

**不要使用 MTP**，因为它可能会损坏大文件。

- 将修补好的 boot 、init_boot 或 recovery 映像刷入到您的设备。<br>
  对于大多数设备，可以重启到 fastboot 模式，并使用以下命令刷入：

``` shell
fastboot flash boot[_x] PC上magisk_patched_[随机字符].img的路径 # 或
fastboot flash init_boot[_x] PC上magisk_patched_[随机字符].img的路径
# 如果刚刚修补的是 recovery 映像则改用：
fastboot flash recovery PC上magisk_patched_[随机字符].img的路径
```

`[_x]` 应该取决于您的设备，应为 `_a` 或 `_b` 或者不写

- <Badge type="tip" text="可选" /> 如果您的设备有单独的 `vbmeta` 分区，则可以使用以下命令修补 `vbmeta` 分区

``` shell
fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img
```

::: warning
此操作可能清除您的数据
:::

- 重启并启动 Magisk 应用程序（如果您清除数据，您将看到一个用于占位的 Magisk 应用程序），您将看到一个询问修复环境的对话框，点击它并等待重启
- 瞧！

## 卸载

卸载 Magisk 的最简单方法是直接通过 Magisk 应用程序。如果您坚持使用第三方 Recovery，请将 Magisk APK 文件 重命名为 `uninstall.zip` 后像其他普通的刷机包一样刷入。

## Recovery 中的 Magisk

如果您的设备在 boot 映像中没有 ramdisk ，Magisk 别无选择，只能劫持 Recovery 分区。对于这些设备，每次启用 Magisk 时都必须**重新启动至 Recovery**。

当 Magisk 劫持 recovery 时，有一个特殊的机制允许您实际进入到 Recovery 模式。每个设备都有自己的启动到 Recovery 模式的按键组合，（例如几乎所有的小米设备均为「电源」+「音量增大」以及 Galaxy S10 的「电源」+「Bixby」+「音量增大」）。百度搜索（或者 Bing 搜索、Google 搜索）可以很容易地获得这些信息。一旦你按下组合键，设备就会显示启动屏幕（可能还会振动），释放所有按键即可启动 Magisk。如果您决定引导到实际的 Recovery 模式，请**长按音量增大，直到看到 Recovery 屏幕**。

总之，在 recovery 中安装 Magisk 后 **（从关机开始）**：

- **(正常开机) → (无 Magisk 的系统)**
- **(按键组合) → (启动屏幕) → (释放所有按钮) → (带有 Magisk 的系统)**
- **(按键组合) → (启动屏幕) → (长按音量增大) → (Recovery 模式)**

（注意：在这种情况下，您**不能使用 第三方 Recovery 来安装或升级 Magisk**！！）

## 三星 (System-as-root)

::: warning 警告
如果您的三星设备未安装 Android 9.0 或更高版本，则说明以下内容不适用于您的设备。
:::

### 安装 Magisk 之前

- 安装 Magisk **将熔断 KNOX**
- 首次安装 Magisk **需要完整的数据擦除**（这**不包括在解锁 bootloader 时的数据擦除**）。请在继续之前备份您的数据。
- 下载支持您设备的 Odin (仅 Windows) 或者 [Heimdall](https://www.glassechidna.com.au/heimdall/) (仅 Linux)。

### 解锁 Bootloader

在较新三星设备上解锁 bootloader 有一些注意事项。新引入的 `VaultKeeper` 服务会使 bootloader 在某些情况下拒绝任何非官方分区。

- 允许在解锁 bootloader，在 **开发者选项 → OEM 解锁**
- 重启到下载模式：将设备关机，然后按下设备的下载模式键组合
- 长按音量上限可解锁引导加载程序**这将擦除数据并自动重新启动**
- 完成初始设置。跳过所有步骤，因为数据将在后面的步骤中再次擦除。**在设置过程中将设备连接到互联网**
- 启用开发者选项，**确认「OEM解锁」选项存在且呈灰色。**这意味着 `VaultKeeper` 服务释放了引导加载程序。
- 您的 bootloader 现在在下载模式允许非官方映像

### 操作指南

- 使用 [samfirm.js](https://github.com/jesec/samfirm.js)，[Frija](https://forum.xda-developers.com/s10-plus/how-to/tool-frija-samsung-firmware-downloader-t3910594)，或 [Samloader](https://forum.xda-developers.com/s10-plus/how-to/tool-samloader-samfirm-frija-replacement-t4105929) 直接从三星服务器下载设备的最新 zip 固件 。
- 解压缩固件并将 `AP` 归档文件复制到设备。它通常命名为 `AP_[device_model_sw_ver].tar.md5`
- 按下 Magisk 主屏幕中的 **「安装」** 按钮
- 如果您的设备**没有**启动 ramdisk，勾选 **「Recovery模式」** 选项
- 在方式中选择 **「选择并修补一个文件」** ，然后选择 `AP` 归档文件
- 开始安装，并使用 ADB 将修补的归档文件复制到您的电脑：

  ``` shell
  adb pull /sdcard/Download/magisk_patched_[random_strings].tar
  ```

  注意：**不要使用MTP**，因为它可能会损坏大型文件。
- 重新启动到下载模式。在您的 PC 上打开 Odin，将 `magisk_patched.tar` 作为 `AP`，连同原始固件中的 `BL`、`CP` 和 `CSC`（**不是** `HOME_CSC`，因为我们要**清除数据**）一起刷入。
- 一旦 Odin 完成刷机，您的设备应该会自动重启。 如果被要求恢复出厂设置，请同意。
- 如果您的设备**没有**启动 ramdisk，请立即重新启动到 recovery 以启用 Magisk（原因在 [Recovery 中的 Magisk](#recovery-中的-magisk) 中说明）。
- 安装您已经下载的 [Magisk 应用程序](https://github.com/topjohnwu/Magisk/releases/latest) 并启动该应用程序。 它应该显示一个对话框，要求进行额外的设置。
- 让应用程序完成它的工作并自动重启设备。

### 系统更新

一旦你的三星设备获得了 root 权限，你就不能再通过 OTA 进行 Android 系统更新了。要进行系统更新，您必须手动下载新的固件归档文件并完成上一节中编写的相同 `AP` 修补过程。这里唯一的区别在于Odin刷入步骤：**不要使用 `CSC` 归档文件，而是使用 `HOME_CSC` 归档文件，因为我们正在执行升级，而不是初始安装**。

### 注意事项

- **永远、永远不要**尝试将 `boot`、`recovery`或 `vbmeta` 分区恢复到原样！ 您这样做会破坏您的设备，并且从中恢复的唯一方法是**清除数据并进行完整的 Odin 恢复**。
- 要使用新的固件升级您的设备，**切勿**出于上述原因直接使用原厂 `AP` 归档文件。 **始终**在 Magisk 应用程序中修补 `AP` 并改用它。
- 永远不要只刷入 `AP` ，否则 Odin 可能会缩小 `/data` 文件系统的大小。升级时请刷入 `AP` + `BL` + `CP` + `HOME_CSC` 。

## 华为

::: danger
这部分现已从官方文档中移除。您正在浏览的是 [2021.03.22](https://github.com/topjohnwu/Magisk/blob/408399eae095b7cbd3e05278682c4bb4c7702ec0/docs/install.md) 并补充后的版本。
:::

Magisk 不再正式支持较新的华为设备，因为其设备上的 bootloader 不可通过官方途径解锁，更重要的是他们不遵循标准的 Android 分区方案。以下只是一些一般性指导。

使用了麒麟处理器的华为设备与大多数常见设备的分区方式不同。Magisk 通常安装在设备的 `boot` 分区，但是华为设备没有这个分区。根据您的设备运行的 EMUI 版本，说明会略有不同。

:::: danger
请勿使用最新版本的 Magisk 应用！我推荐使用 [Magisk v23.0](https://github.com/topjohnwu/Magisk/releases/tag/v23.0) 或使用 [Magisk v20.4](https://github.com/topjohnwu/Magisk/releases/tag/v20.4) （下载「Magisk-v20.4.zip」）搭配 [Magisk Manager v7.5.1](https://github.com/topjohnwu/Magisk/releases/tag/manager-v7.5.1) （下载「MagiskManager-v7.5.1.apk」）

::: details Magisk 兼容性列表

| 名称 | 型号 | EMUI 版本 | Android 版本 | 详情 |
| ---- | ---- | ---- | ---- | ---- |
| 华为畅享7 | SLA-AL00 | EMUI 5.1.2 | Android 7.0 | 使用 Magisk v25.2 时会触发引导循环并直接重启至 eRecovery |
| 荣耀畅玩4C | CHM-TL00H | EMUI 4.0 | Android 6.0 | 使用新版 Magisk 会导致无法授权 |
| 荣耀畅玩6X | BLN-AL10 | EMUI 8.0 | Android 8.0 | 没有这个问题 |

:::
::::

### 获得官方映像

华为不发布官方出厂映像以及 OTA 归档文件，但大多数固件压缩包可以从[华为固件下载站](https://professorjtj.github.io/)下载。 要从压缩包中的「UPDATE.APP」中提取映像，您必须使用 [Huawei Update Extractor](https://forum.xda-developers.com/showthread.php?t=2433454)（仅限 Windows！）

### EMUI 5 及以下

遵循[入门](#入门)的教程，唯一的不同在于**请勿使用最新版本的 Magisk 应用！**

> 提示：进入 fastboot 模式需要将手机**使用数据线连接电脑**，而进入 Recovery 模式则**不能**将手机使用连接到电脑！所以如果您在 fastboot 模式中刷入 Recovery 映像后请**将手机与电脑断开连接后**再按下「电源」+「音量增大」来进入 Recovery，否则您将进入的「eRecovery」。

### EMUI 8

对于运行 EMUI 8 的设备，您的设备有一个名为 `ramdisk` 的分区，这是将要安装 Magisk 的地方。

- 如果您打算使用第三方 Recovery，只需按照[第三方 Recovery](#第三方-recovery) 的说明进行操作即可。
- 如果您不打算使用第三方 Recovery，则必须从您的固件中提取 `RAMDISK.img` 。 按照上面的[修补映像](#修补映像)说明进行操作，但使用 `RAMDISK.img` 文件而不是 boot 映像！
- 要将修补后的映像刷入您的设备，请使用 fastboot 命令：

  ``` shell
  fastboot flash ramdisk /path/to/magisk_patched.img
  ```

请注意，您正在刷入 `ramdisk`，而不是 `boot`！

### EMUI 9 或更高版本

对于 EMUI 9+ 设备，`ramdisk` 分区不再存在。 作为解决方法，Magisk 将安装到 `recovery_ramdisk` 分区。 **在按照以下说明操作之前，请先阅读 [Recovery 中的 Magisk](#recovery-中的-magisk) ！**

*注意：正如在 荣耀 View 10 上测试的那样，华为的内核似乎无法在早期启动时捕获按键事件，因此长按音量增大不会在我的设备上**不**启动到 Recovery。 您的体验可能会有所不同。*

- 如果您打算使用第三方 Recovery，只需按照[第三方 Recovery](#第三方-recovery) 的说明进行操作即可。<br>
**警告：Magisk 将覆盖第三方 Recovery。**
- 如果您不打算使用第三方 Recovery，则必须从固件中提取 `RECOVERY_RAMDIS.img` （这不是拼写错误），而不是 `recovery.img`（部分设备依旧需要修补 `recovery.img` ）。 按照上面的引导映像修补说明进行操作，但使用 `RECOVERY_RAMDIS.img` 文件而不是 boot 映像！
- 要将修补后的映像刷入您的设备，请使用 fastboot 命令：

  ``` shell
  fastboot flash recovery_ramdisk /path/to/magisk_patched.img
  ```

请注意，您正在刷入 `recovery_ramdisk`，而不是 `boot`！

## 第三方 Recovery

::: warning 警告
这种安装方法已被弃用，并且可以用很小的工作量来维护。
:::

仅当您的设备启动 ramdisk 时，才能使用第三方 Recovery 进行安装。不建议在新的设备上通过第三方 Recovery 安装 Magisk。如果您遇到任何问题，请使用正确的[修补映像](#修补映像)方法。

- 下载 Magisk APK
- 将 `.apk` 文件扩展名重命名为 `.zip` ，例如：`Magisk-v26.1.apk` → `Magisk-v26.1.zip` 。如果重命名文件扩展名时遇到问题（如 Windows），请使用 Android 上的文件管理器或第三方 Recovery 中的文件管理功能重命名文件。
- 像其他普通的刷机包一样刷 zip。
- 重新启动并检查是否已安装 Magisk 应用程序。如果未自动安装，请手动安装 APK。
- 启动 Magisk 应用程序，它将显示一个让您重新安装的对话框。请**直接在 APP 内**重新安装并重新启动（MTK 设备将在重启后自动给 boot 分区上锁，请使用 fastboot 或者第三方 recovery [修补映像](#修补映像)）。

::: warning 警告
模块的 `sepolicy.rule` 文可能存储在 `cache` 分区中。请不要擦除 `CACHE` 分区。
:::

::: tip
您也可以提供 `adb sideload` 刷入 Magisk。这对于不能正常解密 data 分区且无外置存储设备（SD 卡，U 盘等）的设备特别友好。
:::

## 参考链接

- [Magisk Installation](https://topjohnwu.github.io/Magisk/install.html)（官方）
- [Magisk 安装指南](https://cnoim.coding.net/s/41961bff-16f8-4370-9e0c-af8390a6ec89)
