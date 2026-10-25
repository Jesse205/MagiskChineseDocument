# 安装（历史存档）

::: warning 存档说明
本页只收录已从 Magisk 官方 `install.md` 移除的章节。当前安装说明请见[安装](../install.md)。

华为章节最后一次出现在 [2021-04-21 的 install.md](https://github.com/topjohnwu/Magisk/blob/11c882380f321c9a83264d9b41b759306508b8a6/docs/install.md#huawei)，并在 [2021-05-12 的更新](https://github.com/topjohnwu/Magisk/commit/4f73534837bda59fd58ca010fe25d3d66556883e) 中被移除。以下为中文翻译，原文请以链接版本为准。
:::

## 华为

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

## 参考链接

- [Magisk 安装说明（2021-04-21 最后一版）](https://github.com/topjohnwu/Magisk/blob/11c882380f321c9a83264d9b41b759306508b8a6/docs/install.md)（官方历史版本）
- [移除华为章节的提交（2021-05-12）](https://github.com/topjohnwu/Magisk/commit/4f73534837bda59fd58ca010fe25d3d66556883e)（官方历史版本）
