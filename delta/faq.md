# 常见问题

## 如何安装 Magisk Delta？

- 过程类似安装 Magisk：<https://topjohnwu.github.io/Magisk/install.html>

## 如何从当前的 Magisk 切换到 Magisk Delta，反之亦然？

就像更新 Magisk 时一样！

### 直接安装（推荐）

1. 安装并打开 Magisk Delta，然后授予 root 访问权限。
2. 在**Magisk**部分，点击“安装”，然后点击“直接安装”。如果看不到，请尝试关闭并打开应用程序。

### 只需从当前的 Magisk 应用程序刷入 Magisk Delta

1. 将扩展名 `magisk.apk` 重命名为 `magisk.zip`
2. 打开 Magisk 应用程序，点击“模块”选项卡 -> “从存储安装”，然后选择 `magisk.zip`

### 将 Magisk 直接安装到 `/system`（不推荐）

> 请仅在具有 SELinux 宽容模式的 ROM 上使用此方法，或在 sepolicy 规则中使用许可 "u:r:su:s0 "上下文执行 SELinux，如 LineageOS 等用户调试 ROM。你应该备份你的 ROM，以防系统无法启动，也不要使用已损坏的第三方 Recovery。你的 ROM 必须能够挂载为读写，内核必须支持动态 SeLinux 规则补丁。使用此方法风险自负！

由于某些原因，你不想用常规方法安装 Magisk（补丁启动映像），可以直接将 Magisk 安装到 `/system`。

1. 如果已安装 Magisk，则还原为默认启动映像
2. 启动到 recovery，将 `magisk.apk` 重命名为 `systemmagisk.zip` 并刷入。
3. 如果要更新 Magisk，请使用**直接安装到系统分区**，而不是**直接安装**。

## 如何将 Magisk 安装到 Android-x86 项目或 Android 模拟器中

### 开始之前

1. 只有 Magisk Delta 支持将 Magisk 安装到系统分区。
2. 虽然模拟器有 ramdisk 映像，但不使用修补 ramdisk，因为 ramdisk 存储在单独的分区中，磁盘空间非常小，不足以存储 Magisk 二进制文件。
3. 已采用最新的 Magisk Delta Canary 来支持 Bluestacks，~~但需要 [app_process wrapper](https://github.com/HuskyDG/app_process_wrapper/releases) 来运行 Zygisk.~~
4. 已测试的模拟器列表： NoxPlayer、LDPlayer、MEmu。
5. 已测试的 Android x86 项目列表： BlissOS, PrimeOS
6. Waydroid 支持 Canary 版本。

### 将 Magisk 安装到 NoxPlayer、LDPlayer、MemuPlayer 等模拟器的步骤

1. 在模拟器设置中启用 Root 访问
2. 安装并打开 Magisk Delta
3. 授予 Magisk Delta root 访问权限，点击 Magisk 卡片下的 "安装"，使用“直接安装到系统分区”选项，而不是“直接安装”选项（如果没有看到此选项，请关闭并重新打开 Magisk Delta 应用程序），现在不要重启！
4. ~~ 在模拟器设置中禁用 Root 访问。 ~~ 备份内置 `su` （`/system/bin/su` 和 `/system/xbin/su`）并删除它们（以防卸载 Magisk 后恢复内置 `su`），然后重启。由于 LDPlayer 等模拟器会在设置中禁用 ROOT 后删除所有`su`，因此**切勿**在模拟器设置中禁用 Root 访问。
5. 享受 Magisk！

### 将 Magisk 安装到 Bluestacks 的步骤

1. 从 [此处](https://bstweaker.tk/) 下载 Bluestacks Tweaker
2. 并单击“解锁”解锁 Bluestacks 实例，然后启动它，否则无法安装 Magisk。
3. 实例成功启动后，点击“补丁”打开 root 访问，安装 Magisk Delta 并执行“直接安装到系统分区”操作
4. 完成后，单击“UnPatch”，然后重新注册实例。
5. 享受 Magisk！

### 将 Magisk 安装到 Android-x86 项目的步骤

- 你可以使用 [initrd-magisk](https://github.com/HuskyDG/initrd-magisk) 或按照上述指南直接将 Magisk 安装到系统分区中。

### 在 Waydroid 上安装 Magisk 的步骤

- 详情请查阅 <https://github.com/nitanmarcel/waydroid-magisk> 或 <https://github.com/casualsnek/waydroid_script> 了解更多信息。

## 启用 MagiskHide 后，为什么我的应用程序/游戏仍能检测到模拟器？

MagiskHide 不是模拟器检测绕过程序

## 如何在 Recovery 手动触发核心模式？

在以下位置创建名为 `.disable_magisk` 的空文件：`/cache`、`/persist` 或 `/metadata`。

## 为什么不恢复 Magisk 模块的在线 repo？

Magisk 的官方模块库已经死亡，不再维护。因此，将它们添加回去毫无意义。不过，[Fox2Code](https://github.com/Fox2Code) 开发了 [Magisk 模块管理器](https://github.com/Fox2Code/FoxMagiskModuleManager) 应用程序，允许您在线下载 Magisk 模块。

## 我应该安装 Shxxxxo 模块来隐藏 root 吗？

- 不建议使用，你应该卸载它。如果不这样做，就不要向我抱怨死机了。MagiskHide 就足够了。
- 如果你真的想使用 Shxxxxo，那就卸载 Magisk Delta，使用官方 Magisk ¯\_(ツ)_/¯

## 为什么启用 SuList 后某些模块会损坏？

SuList 意味着 MagiskSU 和模块默认未加载，只有列表中的应用程序才会加载 Magisk，因此无法完全支持模块的功能，因为大多数模块必须在所有应用程序中加载，这相当于被检测到。有关 SuList 的更多信息，请[阅读](./internal-guide.html#magiskhide-sulist)
