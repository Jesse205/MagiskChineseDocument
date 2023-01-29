# 常见问题

## Q: 我安装了一个模块，然后启动时卡在了开机动画。求助！

如果在开发人员选项中启用了USB调试，请将手机连接到 PC。如果检测到设备（通过 `adb devices` 检查），请进入 ADB shell 并运行命令 `magisk --remove-modules`。这将删除所有模块并自动重新启动设备。

如果您没有启用 USB 调试，请重新启动到安全模式。大多数现代 Android 设备都支持在启动时按特殊键组合键以进入安全模式作为紧急选项。Magisk 将检测到安全模式被激活，所有模块将被禁用。然后重启回到正常模式（模块禁用状态持续），并通过 Magisk App 管理模块。

::: tip 提示
如果您不知道什么是 ADB shell ，那么请在电脑上直接运行以下命令

``` shell
adb shell magisk --remove-modules
```

如果您还不知道什么是 ADB ，那么请查看[《Android 调试桥 (adb)》](https://developer.android.google.cn/studio/command-line/adb?hl=zh-cn)
:::

## Q: 为什么 XXX应用会检测到 Root？

Magisk 不再处理 Root 隐藏。有大量 Magisk/Zygisk 模块专门提供这些功能，请在网络上查找它们。😉（您可以在“酷安”或者“哔哩哔哩”中搜索）

比较流行的模块是 [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases/latest) 。

## Q: 在我隐藏 Magisk App 后，应用图标显示异常。

当隐藏 Magisk App 时，它将安装一个“存根”APK，其中没有任何内容。这个存根应用程序的唯一功能是将完整的 Magisk app APK 下载到其内部存储并动态加载。由于APK实际上是 _empty_，因此它不包含 APP 的图标资源。

当您打开隐藏的 Magisk App 时，它将为您提供在主屏幕中创建快捷方式的选项（其中包含正确的应用名称和图标），以方便您使用。您还可以手动要求应用在应用设置中创建图标。

## Q: 为什么这个文档很多错误或者不通顺的地方

这个文档本质上还是机器翻译的，然而机器翻译的正确率有待提高。如果您发现了这些错误或者不通顺的地方，希望您可以向我们[提交反馈](https://gitee.com/Jesse205/magisk-chinese-document/issues)。

## 参考链接

* [Magisk Frequently Asked Questions](https://topjohnwu.github.io/Magisk/faq.html)（官方）
