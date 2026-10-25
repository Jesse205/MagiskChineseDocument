# 华为设备安装（历史存档）

::: warning 存档说明
华为设备的安装说明已于 2021 年从 Magisk 官方文档中移除。本页内容还原自 [2021-03-22 的上游文档](https://github.com/topjohnwu/Magisk/blob/408399eae095b7cbd3e05278682c4bb4c7702ec0/docs/install.md)，仅供历史参考。当前版本的 Magisk 已不再正式支持这些设备，请以官方最新文档为准。
:::

Magisk 不再正式支持现代华为设备，因为其设备上的 bootloader 无法通过官方途径解锁，更重要的是它们不遵循标准的 Android 分区方案。以下只是一些一般性指导。

使用麒麟（Kirin）处理器的华为设备与大多数常见设备的分区方式不同。Magisk 通常安装在设备的 `boot` 分区中，但华为设备没有该分区。

通常请按照[修补映像](../install.md#修补映像)的步骤操作，但与原说明有以下区别：

- 下载固件 zip 后（可以在 [Huawei Firmware Database](http://pro-teammt.ru/firmware-database/) 中找到许多固件），您需要使用 [Huawei Update Extractor](https://forum.xda-developers.com/showthread.php?t=2433454)（仅限 Windows！）从 zip 中的 `UPDATE.APP` 提取映像。
- 关于修补映像：
  - 如果您的设备有启动 ramdisk，请修补 `RAMDISK.img`，而不是 `boot.img`
  - 如果您的设备**没有**启动 ramdisk，请修补 `RECOVERY_RAMDIS.img`（这不是拼写错误），而不是 `recovery.img`
- 使用 `fastboot` 刷回映像时：
  - 如果修补的是 `RAMDISK.img`，请使用命令 `fastboot flash ramdisk magisk_patched.img` 刷入
  - 如果修补的是 `RECOVERY_RAMDIS.img`，请使用命令 `fastboot flash recovery_ramdisk magisk_patched.img` 刷入

::: details 英文原版

## Huawei

Magisk no longer officially support modern Huawei devices as the bootloader on their devices are not unlockable, and more importantly they do not follow standard Android partitioning schemes. The following are just some general guidance.

Huawei devices using Kirin processors have a different partitioning method from most common devices. Magisk is usually installed to the `boot` partition of the device, however Huawei devices do not have this partition.

Generally, follow [Patching Images](https://github.com/topjohnwu/Magisk/blob/408399eae095b7cbd3e05278682c4bb4c7702ec0/docs/install.md#patching-images) with some differences from the original instructions:

- After downloading your firmware zip (you may find a lot in [Huawei Firmware Database](http://pro-teammt.ru/firmware-database/)), you have to extract images from `UPDATE.APP` in the zip with [Huawei Update Extractor](https://forum.xda-developers.com/showthread.php?t=2433454) (Windows only!)
- Regarding patching images:
  - If your device has boot ramdisk, patch `RAMDISK.img` instead of `boot.img`
  - If your device does **NOT** have boot ramdisk, patch `RECOVERY_RAMDIS.img` (this is not a typo) instead of `recovery.img`
- When flashing the image back with `fastboot`
  - If you patched `RAMDISK.img`, flash with command `fastboot flash ramdisk magisk_patched.img`
  - If you patched `RECOVERY_RAMDIS.img`, flash with command `fastboot flash recovery_ramdisk magisk_patched.img`

:::

## 参考链接

- [Magisk 安装说明（2021-03-22 存档）](https://github.com/topjohnwu/Magisk/blob/408399eae095b7cbd3e05278682c4bb4c7702ec0/docs/install.md)（官方历史版本）
