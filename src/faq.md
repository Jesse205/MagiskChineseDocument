# 常见问题

## Q: 我安装了一个模块，然后启动时卡在了开机动画。求助

Magisk 内置了启动循环保护：如果您的设备连续**两次**未能完成启动（`boot_completed`），Magisk 将在下次启动时自动进入**安全模式**，禁用所有模块（在每个模块文件夹中创建 `disable` 文件）并禁用 Zygisk，以便您的设备能够正常启动。

如果您的设备在自动启动循环检测来得及恢复之前就卡住了，或者您想手动恢复：

- 如果在开发人员选项中启用了USB调试，请将手机连接到 PC。如果检测到了设备（通过 `adb devices` 检查），请进入 ADB shell 并运行命令 `magisk --remove-modules`。这将删除所有模块并自动重新启动设备。
- 如果您的设备仍能启动到 Android，您也可以直接在 Magisk app 主屏幕顶部的重新启动菜单（电源图标）中切换**安全模式**，然后重新启动。

::: tip 译者提示
如果您不知道什么是 ADB shell ，那么请在电脑上直接运行以下命令

``` shell
adb shell magisk --remove-modules
```

如果您还不知道什么是 ADB ，那么请查看[《Android 调试桥 (adb)》](https://developer.android.google.cn/studio/command-line/adb?hl=zh-cn)
:::

如果您没有启用 USB 调试功能且设备无法启动，那么您可以使用安全模式组合键来启动设备，这将使 Magisk 在模块目录中创建一个名为 `disable` 的空文件，以便在下次使用 Magisk 启动时禁用模块。大多数现代 Android 设备都支持在启动时通过特殊的组合键进入系统的安全模式作为紧急选项，但**请注意**，Magisk 的组合键检测发生在系统检测**之前**，因此许多在线指南中指示的组合键的时间可能需要调整，以激活 Magisk 的安全模式。（可能激活了系统的安全模式而没有激活 Magisk 的安全模式，反之亦然。）

以下细节应确保模块被正确禁用：

1. 许多在线指南中提到，进入安全模式时要“当动画标志出现时，按住音量减小键直到系统启动”或类似的说法。然而，这对于 Magisk 检测来说可能**已经太晚**，导致系统安全模式被激活，但模块没有被禁用。
2. 在动画开始前几秒钟按下音量减小键，并在动画出现后立即释放，这样可以激活 Magisk 的安全模式而不激活系统的安全模式（从而避免禁用其他设备和应用程序设置），然后设备将正常启动，但模块被禁用。
3. 在动画开始前几秒钟按下音量减小键，并一直按住直到系统启动，这样既可以激活 Magisk 的安全模式，也可以激活系统的安全模式。接下来，在重新启动到正常系统后，模块将被禁用。

## Q: 为什么 XXX应用会检测到 Root？

Magisk 不再处理 Root 隐藏。有大量 Magisk/Zygisk 模块专门提供这些功能，请在网络上查找它们。😉

::: tip 译者提示
您可以在“酷安”或“哔哩哔哩”中搜索相关模块。
:::

比较流行的模块是 [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases/latest) 。

::: warning 警告
如果你使用的是「[Magisk Delta](./archive/delta/index.md)」，则[无法使用](./archive/delta/faq.md)此模块！
:::

## Q: 如何在模拟器中使用 Magisk？

在模拟器运行并可通过 ADB 访问时，运行 `./build.py emulator [Magisk APK 的路径]`（或 `./build.py emulator -b` 从源代码构建并安装）即可在正在运行的模拟器上临时启动 Magisk。此运行时设置不会在冷重启后保留，因此如果需要模拟重启，请重新执行该命令。

要在 Android 虚拟设备（AVD）上持久安装，您可以使用 `./build.py patch --avd <path/to/ramdisk.img> [output]` 直接在主机上修补其 `ramdisk.img`。

这些命令已在 Android Studio 附带的官方 Android 虚拟设备（AVD）上测试；其他模拟器可能也可以使用，但模拟器必须启用 SELinux。

## Q: 为什么这个文档很多错误或者不通顺的地方

这个文档本质上还是机器翻译的，然而机器翻译的正确率有待提高。如果您发现了这些错误或者不通顺的地方，希望您可以向我们[提交反馈](https://gitee.com/Jesse205/magisk-chinese-document/issues)。

## 参考链接

- [Magisk Frequently Asked Questions](https://topjohnwu.github.io/Magisk/faq.html)（官方）
