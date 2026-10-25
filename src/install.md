# 安装

如果您已经安装了 Magisk ，**强烈建议**直接通过 Magisk 应用程序的「直接安装」方法进行升级。以下教程仅针对初始安装。

## 入门

在你开始之前：

- 本教程假设您了解如何使用 `adb` 和 `fastboot`
- 如果您还计划安装第三方内核（kernel），请在安装 Magisk 之后安装它
- 必须解锁设备的引导加载程序（bootloader）

---

下载并安装最新的 [Magisk 应用程序](https://github.com/topjohnwu/Magisk/releases/latest) （只需下载「Magisk-版本.apk」即可） 在主屏幕中，您应该看到：

<p align="center"><img src="/images/device_info.png" width="500"/></p>

**Ramdisk** 的结果确定您的设备在 boot 分区中是否有 ramdisk。如果您的设备没有启动 ramdisk，请在继续之前阅读 [Recovery 中的 Magisk](#recovery-中的-magisk) 部分。

::: info 信息
不幸的是，有一些例外情况，因为某些设备的引导加载程序会接受 ramdisk，即使它不应该接受。 在这种情况下，您必须按照说明进行操作，就好像您的设备的 boot 分区**包含 ramdisk 一样**。 没有什么办法检测到这一点，因此唯一可以确定的方法就是实际尝试。 幸运的是，据我们所知，只有部分小米设备具有此属性，所以大多数人可以忽略这条信息。
:::

如果您使用的是 Googlebook 或三星设备，请查看 [Googlebooks](#googlebooks) 或[三星设备](#三星设备)部分。

如果您的设备**有启动 ramdisk**，您需要修补包含 ramdisk 的分区映像（`boot.img`、`init_boot.img` 或 `vendor_boot.img`）。\
如果您的设备**没有启动 ramdisk**，您需要修补 `recovery.img`。\
您可以自行提取原始 `.img` 文件，也可以提供完整的官方固件包（OTA `.zip`、`payload.bin` 或出厂映像 `.zip`），甚至直接提供指向它的 HTTPS 链接，让 Magisk app 自动提取目标映像。

接下来，我们需要知道您的设备是否有单独的 `vbmeta` 分区。

<!-- - 如果您的官方固件包包含 `vbmeta.img` ，那么您的设备**有一个单独的 `vbmeta` 分区**
- 您还可以通过将设备连接到 PC 并运行以下命令进行检查：

```  shell
adb shell ls -l /dev/block/by-name
# 如果您遇到如 No such file or directory 的报错，那么请尝试把命令更换为
adb shell ls -l /dev/block/bootdevice/by-name
# 如果还是报错（比如华为设备），那么请联网搜索您的设备相对应的方法
```

- 如果找到 `vbmeta`、`vbmeta_a` 或 `vbmeta_b` ，那么您的设备**有一个单独的 `vbmeta` 分区**
- 否则，您的设备**没有单独的 `vbmeta` 分区**。 -->

快速回顾一下，此时，您应该已经知道并准备好了：

1. 设备是否有启动 ramdisk
2. 基于 (1) 的固件包（或已提取的 `boot.img`、`init_boot.img`、`vendor_boot.img` 或 `recovery.img`）

让我们继续[修补映像](#修补映像).

## 修补映像

1. 按下 Magisk 主屏幕中的 **「安装」** 按钮
2. 如果要修补 recovery 映像，请选中 **「Recovery 模式」** 选项
3. 在方式中选择 **「修补固件 / 映像」** ，然后选择提供源映像的方式：
   - **从存储中选择**：选择原始 `.img` （`boot.img`、`init_boot.img`、`vendor_boot.img`、`recovery.img`）、OTA `.zip` / `payload.bin` 或出厂映像 `.zip`
   - **输入映像 URL**：粘贴远程 OTA `.zip`、出厂映像 `.zip` 或 `.img` 文件的直接 HTTPS URL，以流式方式提取目标映像，无需先下载完整归档
   - **下载最新的 Pixel 出厂映像**（仅限 Pixel 设备）：自动从 Google 服务器获取并提取与您当前 Pixel 构建匹配的映像
4. 开始安装，并使用 ADB 将修补的映像复制到您的电脑：

   ``` shell
   adb pull /sdcard/Download/magisk_patched-[版本]_[随机字符].img PC上magisk_patched.img的路径
   ```

   > 提示，你可以将文件从资源管理器直接拖到终端中来获得文件绝对路径。
   **不要使用 MTP**，因为它可能会损坏大文件。
5. 将修补好的 boot 、init_boot 、vendor_boot 或 recovery 映像刷入到您的设备。\
   对于大多数设备，可以重启到 fastboot 模式，并使用以下命令刷入：
   ::: code-group

   ``` shell [boot]
   fastboot flash boot PC上magisk_patched-[版本]_[随机字符].img的路径
   ```

   ``` shell [init_boot]
   fastboot flash init_boot PC上magisk_patched-[版本]_[随机字符].img的路径
   ```

   ``` shell [vendor_boot]
   fastboot flash vendor_boot PC上magisk_patched-[版本]_[随机字符].img的路径
   ```

   ``` shell [recovery]
   fastboot flash recovery PC上magisk_patched-[版本]_[随机字符].img的路径
   ```

   :::
6. <Badge text="可选" /> 如果您的设备有单独的 `vbmeta` 分区，则可以使用以下命令修补 `vbmeta` 分区

   ``` shell
   fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img
   ```

   ::: warning
   此操作可能清除您的数据。
   :::
7. 重启并启动 Magisk 应用程序（如果您清除数据，请先重新安装 Magisk APK），您将看到一个询问修复环境的对话框，点击它并等待重启。
8. 瞧！

::: warning
**千万不要**刷写其他人共享的已修补的镜像，也不要在其他设备上修补镜像，即使它们具有相同的设备型号！您可能需要执行完整的数据擦除操作以恢复您的设备。**始终**在您要安装 Magisk 的同一设备上修补引导镜像。
:::

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

## Googlebooks

1. 按照官方的[引导加载程序解锁说明](https://support.google.com/googlebook/answer/17389679)解锁您的 Googlebook 的引导加载程序。
2. 下载并安装最新的 [Magisk 应用程序](https://github.com/topjohnwu/Magisk/releases/latest)，按下 Magisk 卡片中的 **「安装」** 按钮，然后选择 **「修补固件 / 映像」**。
3. 选择 recovery 映像来源：选择自动建议的 **「下载最新的 Googlebook recovery 映像」** 选项，或者通过 **「从存储中选择」** / **「输入映像 URL」** 手动选择 recovery 映像文件。
4. 在 **输出目标** 下，您可以将 USB 闪存盘插入 Googlebook 并选择它，直接创建已修补的 recovery 介质（注意，所选 USB 驱动器上的所有数据都将被擦除），或者选择 **「保存到文件」** ，然后使用 [Device Recovery Utility](https://chromewebstore.google.com/detail/chromebook-recovery-utili/pocpnlppkickgojjlmhdmidojbmbodfm) 扩展稍后将 recovery 映像写入 USB 驱动器。
5. 按照官方说明[启动到 recovery 模式](https://support.google.com/googlebook/answer/17452429#enter_recovery)，并选择外部 / USB 驱动器启动。
   - **注意：** 您的数据**不会**被擦除，因为 Magisk 在修补过程中会自动从 recovery 映像中移除恢复出厂设置步骤。
6. USB 驱动器将重新刷写设备，完成后，Magisk 即已安装。

### 系统更新

Googlebook 支持无缝 A/B 系统更新，允许您应用官方 OTA 更新并保留 Magisk，而无需从 USB 驱动器重新刷写。请按照 [OTA 升级指南](ota.md) 安装系统更新并保留 root 访问权限。

## 三星设备

在继续之前，请确认：

- 安装 Magisk **将熔断您的 Knox 保修位**，此操作无论如何都是不可逆的。
- 首次安装 Magisk **需要完整的数据擦除**(这**不包括在解锁 bootloader 时的数据擦除**）。请备份您的数据。

### 要求

要验证三星设备是否可以安装 Magisk，首先必须检查 OEM 锁和 KnoxGuard (RMM) 状态。为此，请转到 `设置` -> `设备维护` -> `维护模式` 并将其启用，然后使用组合键在下载模式下启动设备。

OEM 锁的值可能如下：

- **ON (L)**：完全锁定。
- **ON (U)**：启动加载程序已锁定，OEM 解锁已启用。
- **OFF (U)**：完全解锁。

要解锁引导加载器，请按照以下说明操作。如果下载模式下未显示 OEM 锁的值，则可能由于市场限制（美国/加拿大设备），您的设备无法解锁。

KnoxGuard 的值可能如下：

- `Active` 、`Locked`：您的设备已被电信运营商或保险公司远程锁定。
- `Prenormal`：您的设备被暂时锁定，达到 168 小时正常运行时间后会触发解锁。
- `Checking` 、`Completed` 、`Broken`：您的设备已解锁。

启用 KnoxGuard 后，无论您的启动加载器处于何种锁定状态，都将无法安装/运行 Magisk。

### 解锁 Bootloader

1. 允许解锁 bootloader，在 **开发者选项 → OEM 解锁**。
2. 重启至下载模式：关闭设备电源并按下设备的下载模式组合键。
3. 长按音量上键解锁 bootloader。**这将清除你的数据并自动重启**。
4. 完成初始设置。跳过所有步骤，因为数据将在后面的步骤中再次清除。**请在设置过程中将设备连接到互联网。**
5. 启用开发者选项，**确认 OEM 解锁选项是否存在，并显示为灰色。**这意味着 KnoxGuard 没有锁定您的设备。
6. 您的 bootloader 现在在下载模式下可接受的非官方映像。

### 操作指南

1. 使用 [samloader-rs](https://github.com/topjohnwu/samloader-rs) 直接从三星服务器下载适用于您设备的最新固件包。
2. 解压缩固件并将 `AP` 归档文件复制到设备。它通常命名为 `AP_[device_model_sw_ver].tar.md5` 。
3. 按下 Magisk 主屏幕中的 **「安装」** 按钮。
4. 如果您的设备**没有**启动 ramdisk，勾选 **「Recovery模式」** 选项。
5. 在方式中选择 **「修补固件 / 映像」** ，选择 **「从存储中选择」** ，然后选择 `AP` 归档文件。
6. 开始安装，并使用 ADB 将修补的归档文件复制到您的电脑：

   ``` shell
   adb pull /sdcard/Download/magisk_patched-[版本]_[随机字符].tar
   ```

   ::: warning
   **不要使用 MTP**，因为它可能会损坏大型文件。
   :::
   > 译者注：如果有条件，可以验证一下哈希值。
7. 重新启动到下载模式。在您的 PC 上使用 `samloader` 将 `magisk_patched-[版本]_[随机字符].tar` 作为 `AP`，连同原始固件中的 `BL` 、`CP` 和 `CSC`（**不是** `HOME_CSC`，因为我们要**清除数据**）一起刷入。
8. 一旦 `samloader` 完成刷机，您的设备应该会自动重启。**如果被要求恢复出厂设置，请同意。**
9. 如果您的设备**没有**启动 ramdisk，请立即重新启动到 recovery 以启用 Magisk（原因在 [Recovery 中的 Magisk](#recovery-中的-magisk) 中说明）。
10. 安装您已经下载的 [Magisk 应用程序](https://github.com/topjohnwu/Magisk/releases/latest) 并启动该应用程序。 它应该显示一个对话框，要求进行额外的设置。
11. 让应用程序完成它的工作并自动重启设备。瞧！

### 系统更新

一旦你的三星设备获得了 root 权限，你就不能再通过 OTA 进行 Android 系统更新了。要进行系统更新，您必须手动下载新的固件归档文件并完成上一节中编写的相同 `AP` 修补过程。这里唯一的区别在于刷入步骤：**不要使用 `CSC` 归档文件，而是使用 `HOME_CSC` 归档文件，因为我们正在执行升级，而不是初始安装**。

### 注意事项

- **永远、永远不要**尝试将 `boot`、`init_boot`、`recovery` 或 `vbmeta` 分区恢复到原样！您这样做会破坏您的设备，并且从中恢复的唯一方法是**清除数据并进行完整的固件恢复**。
- 要使用新的固件升级您的设备，**切勿**出于上述原因直接使用原厂 `AP` 归档文件。**始终**在 Magisk 应用程序中修补 `AP` 并改用它。

## 第三方 Recovery

::: warning
这种安装方法已被弃用，并且可以用很小的工作量来维护。
:::

仅当您的设备启动 ramdisk 时，才能使用第三方 Recovery 进行安装。不建议在新的设备上通过第三方 Recovery 安装 Magisk。如果您遇到任何问题，请使用正确的[修补映像](#修补映像)方法。

1. 下载 [Magisk 安装包](https://github.com/topjohnwu/Magisk/releases)
2. 将 `.apk` 文件扩展名重命名为 `.zip` ，例如：`Magisk-v31.0.apk` → `Magisk-v31.0.zip` 。如果重命名文件扩展名时遇到问题（比如在 Windows 文件资源管理器中默认不显示文件扩展名），请使用 Android 上的文件管理器或第三方 Recovery 中的文件管理功能重命名文件。
3. 像其他普通的刷机包一样刷 zip。
4. 重新启动；如果 Magisk 应用程序尚未安装，请像安装普通应用一样安装 Magisk APK。
5. 启动 Magisk 应用程序，它将显示一个让您重新安装的对话框。请**直接在 APP 内**重新安装并重新启动（MTK 设备将在重启后自动给 boot 分区上锁，请使用 fastboot 或者第三方 recovery [修补映像](#修补映像)）。

::: warning
模块的 `sepolicy.rule` 文件可能存储在 `cache` 或 `metadata`（预初始化分区）分区中。请**不要**擦除 `CACHE` 或 `METADATA` 分区，否则活动模块的 `sepolicy.rule` 文件将丢失，直到重新安装这些模块。
:::

::: tip
您也可以提供 `adb sideload` 刷入 Magisk，这对于不能正常解密 data 分区且无外置存储设备（SD 卡，U 盘等）的设备特别友好，并且在这种情况下无需将 `.apk` 文件扩展名重命名为 `.zip`。
:::

## 参考链接

- [Magisk Installation](https://topjohnwu.github.io/Magisk/install.html)（官方）
- [Magisk 安装指南](https://cnoim.coding.net/s/41961bff-16f8-4370-9e0c-af8390a6ec89)
