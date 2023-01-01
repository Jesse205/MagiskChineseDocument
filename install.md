# 安装

如果您已经安装了 Magisk ，**强烈建议**使用其“直接安装”方法通过 Magisk App 直接升级。以下教程仅适用于初始安装。

## 入门

开始之前：

- 本教程假设您了解如何使用 `adb` 和 `fastboot`
- 如果您还要安装自定义内核，请在安装 Magisk 之后安装
- 必须解锁设备的引导程序

---

下载并安装最新的 [Magisk app](https://github.com/topjohnwu/Magisk/releases/latest). 在主屏幕中，您应该看到：

<p align="center"><img src="/images/device_info.png" width="500"/></p>

**Ramdisk** 的结果确定您的设备在引导分区中是否有 Ramdisk。如果您的设备没有启动 ramdisk，请在继续之前阅读 [Recovery 中的 Magisk](#recovery-中的-magisk) 部分。

> （不幸的是，有些设备的引导加载程序接受ramdisk，即使它不应该接受。在这种情况下，您必须按照说明进行操作，就好像您的设备的引导分区**不**包含ramdisk一样。无法检测到这一点，因此唯一确定的方法是实际尝试。幸运的是，据我们所知，只有一些小米设备具有此属性，所以大多数人可以忽略这条信息。）

如果您使用的是Android 9.0或更高版本的三星设备，您现在可以跳转到[它自己的部分](#三星-system-as-root)。

如果您的设备有启动 ramdisk，请获取 `boot.img` 的副本。<br>
如果您的设备**没有**启动 ramdisk，请获取 `recovery.img` 的副本。<br>
您应该能够从官方固件包或自定义ROM刷机包中提取所需的文件。

接下来，我们需要知道您的设备是否有单独的 `vbmeta` 分区。

- 如果您的官方固件包包含 `vbmeta.img`，那么是的，您的设备**有**一个单独的 `vbmeta` 分区
- 您还可以通过将设备连接到PC并运行以下命令进行检查：<br>
 `adb shell ls -l /dev/block/by-name`
- 如果找到 `vbmeta`、`vbmeta_a` 或 `vbmeta_b` ，那么您的设备**有**一个单独的 `vbmeta` 分区
- 否则，您的设备**没有**单独的 `vbmeta` 分区。

快速回顾一下，此时，您应该已经知道并准备好了：

1. 您的设备的启动 ramdisk
2. 设备单独的 `vbmeta` 分区
3. 基于（1）的 `boot.img` 或 `recovery.img`

让我们继续[修补映像](#修补映像).

## 修补映像

- 将 boot/recovery 映像复制到设备
- 按下 Magisk 卡片中的**安装**按钮
- 如果要修补恢复映像，请选中**“恢复模式”**选项
- 如果您的设备**没有**单独的 `vbmeta` 分区，请选中 **“修补启动映像中的vbmeta”** 选项
- 在方式中选择 **“选择并修补一个文件”** ，然后选择 boot/recovery 映像
- 开始安装，并使用 ADB 将修补的映像复制到您的电脑：<br>
  `adb pull /sdcard/Download/magisk_patched_[随机字符串].img`
- 将修补好的 boot/recovery 映像刷入到您的设备。<br>
  对于大多数设备，重启到 fastboot 模式，并使用以下命令刷入：<br>
  `fastboot flash boot /path/to/magisk_patched.img` 或者 <br>
  `fastboot flash recovery /path/to/magisk_patched.img`
- （可选）如果您的设备有单独的 `vbmeta` 分区，则可以使用以下命令修补 `vbmeta` 分区 <br>
  `fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img`
- 重启，瞧！

## 卸载

卸载 Magisk 的最简单方法是直接通过 Magisk App。如果您坚持使用自定义 Recovery，请将 Magisk APK 重命名为 `uninstall.zip` ，并像其他普通的刷机包一样刷它。

## Recovery 中的 Magisk

如果您的设备在 boot 映像中没有 ramdisk ，则 Magisk 只能劫持 Recovery 分区。对于这些设备，每次启用 Magisk 时，您都必须**启动至Recovery**。

当 Magisk 劫持 recovery 时，有一个特殊的机制允许您实际引导到 Recovery 模式。每个设备型号都有自己的按键组合，以启动 Recovery，例如 Galaxy S10（电源、Bixby、音量+）。百度搜索（或者 Google 搜索）可以很容易地获得这些信息。一旦你按下组合键，设备就会显示启动屏幕并振动，释放所有按键即可启动 Magisk。如果您决定引导到实际 Recovery 模式，**长按音量+，直到看到 Recovery 屏幕**。

总之，在 recovery 中安装Magisk后 **（从关机开始）**：

- **(正常通电) → (无 Magisk 系统)**
- **(Recovery 组合键) → (启动屏幕) → (松开所有按钮) → (带 Magisk 的系统)**
- **(Recovery 组合键) → (启动屏幕) → (长按音量+) → (Recovery 模式)**

（注意：在这种情况下，您**不能**使用 自定义 Recovery 来安装或升级 Magisk！！）

## 三星 (System-as-root)

> 如果您的三星设备未安装Android 9.0或更高版本，则说明您正在阅读错误的部分。

### 安装Magisk之前

- 安装Magisk**将** trip KNOX
- 首次安装 Magisk **需要**完整的数据擦除（这**不是**在解锁引导加载程序时计算数据擦除）。在继续之前备份数据。
- 下载支持您设备的 Odin（仅在Windows上运行）。

### 解锁Bootloader

在现代三星设备上解锁 bootloader 有一些注意事项。新推出的 `VaultKeeper` 服务在某些情况下会使 bootloader 拒绝任何非官方分区。

- 允许在解锁bootloader，在 **开发人员选项 → OEM解锁**
- 重新启动至下载模式：关闭设备电源，然后按设备的下载模式键组合
- 长按音量上限可解锁引导加载程序**这将擦除数据并自动重新启动**
- 完成初始设置。跳过所有步骤，因为数据将在后面的步骤中再次擦除。**在安装期间将设备连接到网络**
- 启用开发人员选项，**确认 OEM解锁 选项存在且呈灰色。**这意味着 `VaultKeeper` 服务释放了引导加载程序。
- 您的 bootloader 现在以下载模式接受非官方映像

### 操作指南

- 使用 [samfirm.js](https://github.com/jesec/samfirm.js)，[Frija](https://forum.xda-developers.com/s10-plus/how-to/tool-frija-samsung-firmware-downloader-t3910594)，或 [Samloader](https://forum.xda-developers.com/s10-plus/how-to/tool-samloader-samfirm-frija-replacement-t4105929) 直接从三星服务器下载设备的最新固件 zip。
- 解压缩固件并将 `AP` tar 文件复制到设备。它通常命名为 `AP_[device_model_sw_ver].tar.md5`
- 按下Magisk卡片中的**安装**按钮
- 如果您的设备**没有**启动 ramdisk，请检查 **“Recovery模式”** 选项
- 在方式中选择 **“选择并修补一个文件”** ，然后选择 `AP` tar文件
- 开始安装，并使用ADB将修补的tar文件复制到您的电脑：<br>
  `adb pull /sdcard/Download/magisk_patched_[random_strings].tar`<br>
  **不要使用MTP**，因为它会损坏大型文件。
- 重新引导至下载模式。在PC上打开Odin，然后刷入 `magisk_patched.tar` 作为 `AP`，并伴随着 `BL`，`CP` 和 `CSC` （**不是** `HOME_CSC` ，因为我们想**擦除数据**） 从原始固件。
- Odin完成刷入后，设备将自动重新启动。如果询问，同意进行工厂重置。
- 如果您的设备**没有**启动 ramdisk，请立即重新启动恢复以启用 Magisk（原因在 [Recovery 中的 Magisk](#recovery-中的-magisk) 中说明）。
- 安装您已下载的 Magisk App 并启动该应用程序。它应该显示一个对话框，要求进行其他设置。
- 让 APP 完成其工作并自动重新启动设备。

### 升级操作系统

一旦你的三星设备被 root 了，你就不能再通过 OTA 升级你的 Android 操作系统了。要升级设备的操作系统，您必须手动下载新的固件 zip 文件，并执行上一节中所述的 `AP` 修补过程**这里唯一的区别在于Odin刷入步骤：不要使用 `CSC` tar，而是在执行升级时使用 `HOME_CSC` tar，不是初始安装**。

### 重要事项

- **永远不要**尝试将 `boot` 、`recovery` 或 `vbmeta` 分区恢复到官方！您可以通过这样做来损坏设备，而从中恢复的唯一方法是使用数据擦除进行完整的Odin恢复。
- 要使用新固件升级设备，**切勿**直接使用官方存 `AP` tar文件，原因如上所述。**始终**在Magisk应用程序中修补 `AP` 并使用它。
- 万不要只刷入 `AP` ，否则 Odin 可能会缩小` /data` 文件系统的大小。升级时请刷入`AP`+`BL`+`CP`+`HOME_CSC`。

## 自定义 Recovery

::: warning
此安装方法已被弃用，并且只需付出最少的努力即可维护。
:::
只有当您的设备具有 boot ramdisk 时，才能使用自定义 Recovery 进行安装。不再建议在现代设备上通过自定义 Recovery 安装 Magisk。如果您遇到任何问题，请使用正确的[修补映像](#修补映像)方法。

- 下载Magisk APK
- 重命名 `.apk` 文件扩展名为 `.zip` ，例如：`Magisk-v24.0.apk` → `Magisk-v24.0.zip` 。如果重命名文件扩展名时遇到问题（如 Windows），请使用 Android 上的文件管理器或 TWRP 中包含的文件管理程序重命名文件。
- 像其他普通的刷机包一样刷 zip。
- 重新启动并检查 Magisk App 是否已安装。如果未自动安装，请手动安装 APK。

> 警告：模块的 `sepolicy.rule` 文可能存储在 `cache` 分区中。不要擦除 `CACHE` 分区。
