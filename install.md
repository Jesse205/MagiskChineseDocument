# 安装

如果您已经安装了 Magisk ，**强烈建议**直接通过Magisk应用程序的“直接安装”方法进行升级。以下教程仅针对初始安装。

## 入门

在你开始之前：

- 本教程假设您了解如何使用 `adb` 和 `fastboot`
- 如果您还计划安装第三方内核（kernels），请在安装 Magisk 之后安装它
- 必须解锁设备的引导加载程序（bootloader）

---

下载并安装最新的 [Magisk 应用程序](https://github.com/topjohnwu/Magisk/releases/latest). 在主屏幕中，您应该看到：

<p align="center"><img src="/images/device_info.png" width="500"/></p>

**Ramdisk** 的结果确定您的设备在 boot 分区中是否有 ramdisk。如果您的设备没有启动 ramdisk，请在继续之前阅读 [Recovery 中的 Magisk](#recovery-中的-magisk) 部分。

::: info 信息
不幸的是，有一些例外情况，因为某些设备的引导加载程序会接受 ramdisk，即使它不应该接受。 在这种情况下，您必须按照说明进行操作，就好像您的设备的 boot 分区**包含 ramdisk 一样**。 没有什么办法检测到这一点，因此唯一可以确定的方法就是实际尝试。 幸运的是，据我们所知，只有部分小米设备具有此属性，所以大多数人可以忽略这条信息。
:::

如果您使用的是搭载 Android 9.0 或更高版本的三星设备，您可以跳转到[属于它的部分](#三星-system-as-root)。

如果您的设备**有启动 ramdisk**，请获取 `boot.img`（ 或者 `init_boot.img`（如果存在，在出厂时搭载安卓13的设备通常时这样的，比如红米K60Pro）的副本。<br>
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

- 将 boot 或 recovery 映像（ `*.img` 文件）复制到设备
- 按下 Magisk 主屏幕中的 **“安装”** 按钮
- 如果要修补 recovery 映像，请选中 **“Recovery 模式”** 选项
- 如果您的设备**没有单独的 `vbmeta` 分区**，请选中 **“修补 boot 映像中的 vbmeta”** 选项
- 在方式中选择 **“选择并修补一个文件”** ，然后选择 boot 或 recovery 映像
- 开始安装，并使用 ADB 将修补的映像复制到您的电脑：<br>

  ``` shell
  adb pull /sdcard/Download/magisk_patched_[随机字符].img PC上magisk_patched.img的路径
  ```

  **不要使用 MTP**，因为它可能会损坏大文件。
- 将修补好的 boot 或 recovery 映像刷入到您的设备。<br>
  对于大多数设备，重启到 fastboot 模式，并使用以下命令刷入：<br>

  ``` shell
  fastboot flash boot PC上magisk_patched.img的路径
  # 或者
  fastboot flash recovery PC上magisk_patched.img的路径
  ```

- (可选) 如果您的设备有单独的 `vbmeta` 分区，则可以使用以下命令修补 `vbmeta` 分区 <br>

  ``` shell
  fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img
  ```

- 重启，瞧！

## 卸载

卸载 Magisk 的最简单方法是直接通过 Magisk 应用程序。如果您坚持使用第三方 Recovery，请将 Magisk APK 文件 重命名为 `uninstall.zip` 后像其他普通的刷机包一样刷入。

## Recovery 中的 Magisk

如果您的设备在 boot 映像中没有 ramdisk ，则 Magisk 只能劫持 Recovery 分区。对于这些设备，每次启用 Magisk 时都必须**启动至 Recovery**。

当 Magisk 劫持 recovery 时，有一个特殊的机制允许您实际进入到 Recovery 模式。每个设备都有自己的启动到 Recovery 的按键组合，（例如几乎所有的小米设备均为「电源」+「音量增大」以及 Galaxy S10 的「电源」+「Bixby」+「音量+」）。百度搜索（或者 Bing 搜索、Google 搜索）可以很容易地获得这些信息。一旦你按下组合键，设备就会显示启动屏幕并振动，释放所有按键即可启动 Magisk。如果您决定引导到实际的 Recovery 模式，请**长按音量+，直到看到 Recovery 屏幕**。

总之，在 recovery 中安装 Magisk 后 **（从关机开始）**：

- **(正常开机) → (无 Magisk 的系统)**
- **(按键组合) → (启动屏幕) → (释放所有按钮) → (带有 Magisk 的系统)**
- **(按键组合) → (启动屏幕) → (长按音量+) → (Recovery 模式)**

（注意：在这种情况下，您**不能使用 第三方 Recovery 来安装或升级 Magisk**！！）

## 三星 (System-as-root)

::: warning 警告
如果您的三星设备未安装 Android 9.0 或更高版本，则说明以下内容不适用于该设备。
:::

### 安装 Magisk 之前

- 安装 Magisk **将熔断 KNOX**
- 首次安装 Magisk **需要完整的数据擦除**（这**不包括在解锁 bootloader 时的数据擦除**）。请在继续之前备份您的数据。
- 下载支持您设备的 Odin（仅在 Windows 上运行）。

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
- 解压缩固件并将 `AP` tar 文件复制到设备。它通常命名为 `AP_[device_model_sw_ver].tar.md5`
- 按下 Magisk 主屏幕中的**安装**按钮
- 如果您的设备**没有**启动 ramdisk，勾选 **“Recovery模式”** 选项
- 在方式中选择 **“选择并修补一个文件”** ，然后选择 `AP` tar文件
- 开始安装，并使用ADB将修补的tar文件复制到您的电脑：

  ``` shell
  adb pull /sdcard/Download/magisk_patched_[random_strings].tar
  ```

  注意：**不要使用MTP**，因为它可能会损坏大型文件。
- 重新引导至下载模式。在 PC 上打开 Odin，然后刷入 `magisk_patched.tar` 作为 `AP`，并伴随着 `BL`，`CP` 和 `CSC` （**不是** `HOME_CSC` ，因为我们想**擦除数据**） 从原始固件。
- Odin完成刷入后，设备将自动重新启动。如果询问，同意进行工厂重置。
- 如果您的设备**没有**启动 ramdisk，请立即重新启动恢复以启用 Magisk（原因在 [Recovery 中的 Magisk](#recovery-中的-magisk) 中说明）。
- 安装您已下载的 Magisk 应用程序并启动它。它将显示一个对话框，要求进行其他设置。
- 让 APP 完成其工作并自动重新启动设备。

### 系统升级

一旦你的三星设备获得了 root 权限，你就不能再通过 OTA 升级你的 Android 操作系统了。要升级设备的操作系统，您必须手动下载新的固件 zip 文件，成上一节中编写的相同 `AP` 修补过程。**这里唯一的区别在于Odin刷入步骤：不要使用 `CSC` tar，而是在执行升级时使用 `HOME_CSC` tar，不是初始安装**。

### 注意事项

- **永远不要**尝试将 `boot` 、`recovery` 或 `vbmeta` 分区恢复到官方！这样做会破坏您的设备。从中恢复的唯一方法是清除数据进行完整的 Odin 恢复。
- 要使升级设备的固件，**切勿**直接使用官方存 `AP` tar 文件，原因如上所述。**始终在 Magisk 应用程序中修补 `AP` 并使用它**。
- 永远不要只刷入 `AP` ，否则 Odin 可能会缩小 `/data` 文件系统的大小。升级时请刷入 `AP` + `BL` + `CP` + `HOME_CSC` 。

## 第三方 Recovery

::: warning 警告
此安装方法已被弃用，并且只需付出最少的努力即可维护。
:::

仅当您的设备启动 ramdisk 时，才能使用第三方 Recovery 进行安装。不建议在新的设备上通过第三方 Recovery 安装 Magisk。如果您遇到任何问题，请使用正确的[修补映像](#修补映像)方法。

- 下载 Magisk APK
- 将 `.apk` 文件扩展名重命名为 `.zip` ，例如：`Magisk-v25.2.apk` → `Magisk-v25.2.zip` 。如果重命名文件扩展名时遇到问题（如 Windows），请使用 Android 上的文件管理器或 TWRP 中的文件管理功能重命名文件。
- 像其他普通的刷机包一样刷 zip。
- 重新启动并检查是否已安装 Magisk 应用程序。如果未自动安装，请手动安装 APK。

::: warning 注意
模块的 `sepolicy.rule` 文可能存储在 `cache` 分区中。请不要擦除 `CACHE` 分区。
:::

::: tip
您也可以提供 `adb sideload` 刷入 Magisk。这对于不能正常解密 data 分区且无外置存储设备（SD 卡，U 盘等）的设备特别友好。
:::

## 参考链接

- [Magisk Installation](https://topjohnwu.github.io/Magisk/install.html)（官方）
- [Magisk 安装指南](https://cnoim.coding.net/s/41961bff-16f8-4370-9e0c-af8390a6ec89)
