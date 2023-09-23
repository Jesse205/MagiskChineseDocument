# Android 引导诡计

## 术语

- **rootdir**：根目录 (`/`)。所有 文件、文件夹或文件系统 都存储在 rootdir 中或挂载在 rootdir 下。在 Android 上，文件系统可以是 `rootfs` 或 `system` 分区。
- **`initramfs`**：Android 启动映像中的一个部分，Linux 内核将使用它作为`rootfs`。人们也可以使用术语 **ramdisk**
- **`recovery` 和 `boot` 分区**：这两个实际上非常相似：都是包含 ramdisk 和 Linux 内核的 Android 启动映像（加上其他一些东西）。
唯一的区别是，启动 `boot` 分区将把我们带到 Android，而 `recovery` 有一个用于修复和升级设备的极简自带 Linux 环境。
- **SAR**：系统作为根（System-as-root）。也就是说，设备使用 `system` 作为 rootdir，而不是 `rootfs`
- **A/B, A-only**：对于支持[无缝系统更新](https://source.android.google.cn/docs/core/ota/ab)的设备，它将具有所有只读分区的2个插槽（partition）；我们称这些为**A/B设备**。为了区分，非A/B设备将称为**A-only**
- **2SI**：两阶段初始化。Android 10+ 的启动方式。稍后提供更多信息。

以下是一些参数，可帮助您更精确地定义设备的 Android 版本：

- **LV**：推出版本。设备**推出时**使用的安卓版本。也就是说，设备首次上市时预装的 Android 版本。
- **RV**：运行版本。设备当前运行的 Android 版本。

我们将使用 **Android API 级别** 来表示 LV 和 RV 。API 级别和 Android 版本之间的映射可以在[这张表格](https://source.android.google.cn/setup/start/build-numbers#platform-code-names-versions-api-levels-and-ndk-releases)中看到。例如：Pixel XL 随 Android 7.1 发布，并运行 Android 10，这些参数将为 `(LV = 25, RV = 29)` 。

## 引导方法

Android 启动可以大致分为 3 种主要的不同方法。我们提供了一个一般的经验法则，以确定您的设备最有可能使用哪种方法，但例外情况单独列出。

| 方法  | 初始根目录 | 最终根目录 |
| :---: | ---------- | ---------- |
| **A** | `rootfs`   | `rootfs`   |
| **B** | `system`   | `system`   |
| **C** | `rootfs`   | `system`   |

- **方法 A - 传统 ramdisk**：这是*所有* Android 设备过去启动的方式（过去的美好时光）。内核使用 `initramfs` 作为 rootdir，exec `/init` 来引导。
  - 不属于方法 B 和 C 标准中的设备
- **方法 B - 传统 SAR**：此方法首次出现在 Pixel 1 上。内核直接挂载 `system` 分区作为 rootdir 并且 exec `/init` 来引导。
  - 具有 `(LV = 28)` 的设备
  - 谷歌：Pixel 1 和 2。Pixel3 和 3a 为 `(RV = 28)` 时
  - 一加：6 - 7
  - 也许一些 `(LV < 29)` Android Go 设备？
- **方法 C - 2SI ramdisk SAR**：此方法首次出现在 Pixel 3 Android 10 开发者预览版中。内核使用 `initramfs` 作为 rootdir，在 `rootfs` 中使用 exec `/init`。这个 `init` 负责挂载 `system` 分区并将其用作新的 rootdir，最后执行 `/system/bin/init` 来引导。
  - 具有 `(LV >= 29)` 的设备
  - 具有 `(LV < 28, RV >= 29)` 的设备，不包括已在使用方法 B 的设备
  - 谷歌：Pixel 3 和 3a 为 `(RV >= 29)` 时

### 讨论

从文档来看，谷歌对 SAR 的定义只考虑了内核如何引导设备（上表中的**初始根目录**），这意味着从谷歌的角度来看，只有使用**方法B**的设备才被正式视为 SAR 设备。

然而，对于 Magisk 来说，真正的区别在于设备在完全启动时使用的是什么（上表中的**最终根目录**），这意味着**就 Magisk 而言，方法 B 和方法 C 都是 SAR 的一种形式**，但实施方式不同。除非另有特别说明，否则本文件后面提到的每一个 SAR 实例都将参考 **Magisk 的定义**。

通俗地说，方法 C 的标准有点复杂：您的设备足够现代，可以使用 Android 10+ 启动，或者您在使用方法 A 的设备上运行 Android 10+ 第三方 ROM。

- 任何运行 Android 10+ 的设备都将自动使用方法 C
- **方法 B 设备卡在方法 B 上**，唯一的例外是 Pixel 3 和 3a，Google 对设备进行了改造以适应新方法。

SAR 是 [Project Treble](https://source.android.google.cn/devices/architecture#hidl) 中非常重要的一部分，因为 rootdir 应该与平台绑定。这也是方法 B 和 C 带有 `(LV >= ver)` 标准的原因，因为谷歌每年都强制所有 OEM 遵守更新的要求。

## 一些历史

当谷歌发布第一代 Pixel 时，它还推出了 [A/B（无缝）系统更新](https://source.android.google.cn/devices/tech/ota/ab)。由于[存储大小问题](https://source.android.google.cn/devices/tech/ota/ab/ab_faqs)，与仅 A 相比有几个区别，最相关的是删除 `recovery` 分区和 recovery ramdisk ，合并到`boot`中。

让我们回到 Google 第一次设计 A/B 的时候。如果使用 SAR（当时只有引导方法 B 存在），内核不需要 `initramfs` 来引导 Android（因为 rootdir 在 `system` 中）。这意味着我们可以很聪明，只需将 recovery ramdisk（包含极简的 Linux 环境）塞入 `boot` ，删除 `recovery` ，然后让内核根据引导加载程序的信息选择要使用的任何根目录（ramdisk 或 `system`）。

随着时间从 Android 7.1 到 Android 10 的流逝，谷歌推出了[动态分区](https://source.android.google.cn/devices/tech/ota/dynamic_partitions/implement)。这对 SAR 来说是个坏消息，因为 Linux 内核无法直接理解这种新的分区格式，因此无法直接将 `system` 挂载为 rootdir。这是他们想出引导方法 C 的时候：总是引导到 `initramfs` ，并让 userspace 处理其余的引导。这包括决定启动到 Android 或 recovery，或者他们正式称之为 `USES_RECOVERY_AS_BOOT` 。

一些使用带有 2SI 的 A/B 的现代设备还带有 `recovery_a/_b` 分区。谷歌的标准正式支持这一点。当 recovery 存储在单独的分区中时，这些设备将只使用 boot ramdisk 引导到 Android。

## 将这些拼凑在一起

有了上面的所有知识，现在我们可以将所有 Android 设备分类为以下不同类型：

|  类型   | 引导方式 |  分区  |  2SI  | 在 `boot` 里的 ramdisk |
| :-----: | :------: | :----: | :---: | :--------------------: |
|  **I**  |    A     | A-only |  No   |     `boot` ramdisk     |
| **II**  |    B     |  A/B   |  Any  |   `recovery` ramdisk   |
| **III** |    B     | A-only |  Any  |       ***N/A***        |
| **IV**  |    C     |  Any   |  Yes  |      混合 ramdisk      |

这些类型按首次可用时的时间顺序排序。

- **I 类**：好的旧传统 ramdisk 引导
- **II 类**：旧版 A/B 设备。Pixel 1 是这种类型的第一个设备，同时也是第一个 A/B 和 SAR 设备。
- **III 类**：2018 年末 - 2019 年 A-only 的设备。**就 Magisk 而言，这是迄今为止最糟糕的一种设备类型**
- **IV 类**：所有使用引导方法 C 的设备都是 IV 型设备。A/B IV 类 ramdisk 可以根据引导加载程序的信息启动到 Android 或 recovery；A-only IV 类 ramdisk 只能引导到 Android。

关于 III 类设备的更多详细信息：Magisk 始终安装在引导映像的 ramdisk 中。对于所有其他类型的设备，由于其 `boot` 分区包含 ramdisk，因此可以通过 Magisk app 或第三方 recovery 中的刷入 ZIP 修补引导映像来轻松安装 Magisk。然而，对于 III 型设备，它们**仅限于将 Magisk 安装到 `recovery` 分区**中。Magisk 在正常启动时无法运行；相反，III 类设备用户必须始终重新启动到 recovery，以保持 Magisk 访问。

一些 III 类设备的引导加载程序仍然会接受并提供手动添加到内核 `boot` 映像中的 `initramfs`（例如一些小米手机），但许多设备不接受（例如三星 S10，Note 10）。这完全取决于 OEM 如何实现其引导加载程序。

## 参考链接

- [Magisk Android Booting Shenanigans](https://topjohnwu.github.io/Magisk/boot.html)（官方）
