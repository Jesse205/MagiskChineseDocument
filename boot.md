# Android 引导诡计

## 术语

- **rootdir**：根目录 (`/`)。所有 文件、文件夹或文件系统 都存储在 rootdir 中或挂载在 rootdir 下。在 Android 上，文件系统可以是 `rootfs` 或 `system` 分区。
- **`initramfs`**：Android 启动映像中的一个部分，Linux 内核将使用它作为`rootfs`。人们也可以使用术语 **ramdisk**
- **`recovery` 和 `boot` 分区**：这两个实际上非常相似：都是包含 ramdisk 和 Linux 内核的 Android 启动映像（加上其他一些东西）。
唯一的区别是，启动 `boot` 分区将把我们带到 Android，而 `recovery` 有一个用于修复和升级设备的极简自带 Linux 环境。
- **SAR**：系统作为根（System-as-root）。也就是说，设备使用 `system` 作为rootdir，而不是 `rootfs`
- **A/B, A-only**：对于支持[无缝系统更新](https://source.android.google.cn/docs/core/ota/ab)的设备，它将具有所有只读分区的2个插槽（partition）；我们称这些为**A/B设备**。为了区分，非A/B设备将称为**A-only**
- **2SI**：两阶段初始化。Android 10+ 的启动方式。稍后提供更多信息。

以下是一些参数，可帮助您更精确地定义设备的 Android 版本：

- **LV**：推出版本。设备**推出**时使用的安卓版本。也就是说，设备首次上市时预装的 Android 版本。
- **RV**：运行版本。设备当前运行的 Android 版本。

我们将使用 **Android API 级别** 来表示 LV 和 RV 。API 级别和 Android 版本之间的映射可以在(https://source.android.com/setup/start/build-numbers#platform-code-names-versions-api-levels-and-ndk-releases)中看到。例如：Pixel XL 随 Android 7.1 发布，并运行 Android 10，这些参数将为 `(LV = 25, RV = 29)` 。

## 引导方法

Android 启动可以大致分为 3 种主要的不同方法。我们提供了一个一般的经验法则，以确定您的设备最有可能使用哪种方法，但例外情况单独列出。

方法 | 初始根目录 | 最终根目录
:---: | --- | ---
**A** | `rootfs` | `rootfs`
**B** | `system` | `system`
**C** | `rootfs` | `system`

- **Method A - Legacy ramdisk**: This is how *all* Android devices used to boot (good old days). The kernel uses `initramfs` as rootdir, and exec `/init` to boot.
	- Devices that does not fall in any of Method B and C's criteria
- **Method B - Legacy SAR**: This method was first seen on Pixel 1. The kernel directly mounts the `system` partition as rootdir and exec `/init` to boot.
	- Devices with `(LV = 28)`
	- Google: Pixel 1 and 2. Pixel 3 and 3a when `(RV = 28)`.
	- OnePlus: 6 - 7
	- Maybe some `(LV < 29)` Android Go devices?
- **Method C - 2SI ramdisk SAR**: This method was first seen on Pixel 3 Android 10 developer preview. The kernel uses `initramfs` as rootdir and exec `/init` in `rootfs`. This `init` is responsible to mount the `system` partition and use it as the new rootdir, then finally exec `/system/bin/init` to boot.
	- Devices with `(LV >= 29)`
	- Devices with `(LV < 28, RV >= 29)`, excluding those that were already using Method B
	- Google: Pixel 3 and 3a with `(RV >= 29)`

### 讨论

从文档来看，谷歌对 SAR 的定义只考虑了内核如何引导设备（上表中的**初始根目录**），这意味着从谷歌的角度来看，只有使用**方法B**的设备才被正式视为 SAR 设备。

然而，对于 Magisk 来说，真正的区别在于设备在完全启动时使用的是什么（上表中的**最终根目录**），这意味着**就Magisk而言，方法 B 和方法 C 都是 SAR 的一种形式**，但实施方式不同。除非另有特别说明，否则本文件后面提到的每一个 SAR 实例都将参考 **Magisk 的定义**。

通俗地说，方法 C 的标准有点复杂：您的设备足够现代，可以使用 Android 10+ 启动，或者您在使用方法 A 的设备上运行 Android 10+ 第三方 ROM。

- 任何运行 Android 10+ 的设备都将自动使用方法 C
- **方法 B 设备卡在方法 B 上**，唯一的例外是 Pixel 3 和 3a，Google 对设备进行了改造以适应新方法。

SAR 是 [Project Treble](https://source.android.google.cn/devices/architecture#hidl) 中非常重要的一部分，因为 rootdir 应该与平台绑定。这也是方法 B 和 C 带有 `(LV >= ver)` 标准的原因，因为 Google 每年都强制所有 OEM 遵守更新的要求。

## 一些历史

When Google released the first generation Pixel, it also introduced [A/B (Seamless) System Updates](https://source.android.com/devices/tech/ota/ab). Due to [storage size concerns](https://source.android.com/devices/tech/ota/ab/ab_faqs), there are several differences compared to A-only, the most relevant one being the removal of `recovery` partition and the recovery ramdisk being merged into `boot`.

Let's go back in time when Google is first designing A/B. If using SAR (only Boot Method B exists at that time), the kernel doesn't need `initramfs` to boot Android (because rootdir is in `system`). This mean we can be smart and just stuff the recovery ramdisk (containing the minimalist Linux environment) into `boot`, remove `recovery`, and let the kernel pick whichever rootdir to use (ramdisk or `system`) based on information from the bootloader.

As time passed from Android 7.1 to Android 10, Google introduced [Dynamic Partitions](https://source.android.com/devices/tech/ota/dynamic_partitions/implement). This is bad news for SAR, because the Linux kernel cannot directly understand this new partition format, thus unable to directly mount `system` as rootdir. This is when they came up with Boot Method C: always boot into `initramfs`, and let userspace handle the rest of booting. This includes deciding whether to boot into Android or recovery, or as they officially call: `USES_RECOVERY_AS_BOOT`.

Some modern devices using A/B with 2SI also comes with `recovery_a/_b` partitions. This is officially supported with Google's standard. These devices will then only use the boot ramdisk to boot into Android as recovery is stored on a separate partition.

## Piecing Things Together

With all the knowledge above, now we can categorize all Android devices into these different types:

Type | Boot Method | Partition | 2SI | Ramdisk in `boot`
:---: | :---: | :---: | :---: | :---:
**I** | A | A-only | No | `boot` ramdisk
**II** | B | A/B | Any | `recovery` ramdisk
**III** | B | A-only | Any | ***N/A***
**IV** | C | Any | Yes | Hybrid ramdisk

These types are ordered chronologically by the time they were first available.

- **Type I**: Good old legacy ramdisk boot
- **Type II**: Legacy A/B devices. Pixel 1 is the first device of this type, being both the first A/B and SAR device
- **Type III**: Late 2018 - 2019 devices that are A-only. **The worst type of device to ever exist as far as Magisk is concerned.**
- **Type IV**: All devices using Boot Method C are Type IV. A/B Type IV ramdisk can boot into either Android or recovery based on info from bootloader; A-only Type IV ramdisk can only boot into Android.

Further details on Type III devices: Magisk is always installed in the ramdisk of a boot image. For all other device types, because their `boot` partition have ramdisk included, Magisk can be easily installed by patching boot image through the Magisk app or flash zip in custom recovery. However for Type III devices, they are **limited to install Magisk into the `recovery` partition**. Magisk will not function when booted normally; instead Type III device owners have to always reboot to recovery to maintain Magisk access.

Some Type III devices' bootloader will still accept and provide `initramfs` that was manually added to the `boot` image to the kernel (e.g. some Xiaomi phones), but many device don't (e.g. Samsung S10, Note 10). It solely depends on how the OEM implements its bootloader.

## 参考链接
* [Magisk Android Booting Shenanigans](https://topjohnwu.github.io/Magisk/boot.html)