# 日志

## R6583F3E5-kitsune (26403)

- 修复先前版本的错误 (R6583240E)

如果您想阅读以前版本的更新日志，请访问[发行页面](https://github.com/HuskyDG/magisk-files/releases)

### 与官方 Magisk 的差异

- [应用] 添加了一项新功能，可为没有引导映像的模拟器将 Magisk 安装到 `/system` 分区。
- [Zygisk] 将 Zygisk 的加载方法改为 ptrace init 实现（要求 Android 8 以上）。该实现来自 [ZygiskNext](https://github.com/Dr-TSNG/ZygiskNext)。该方法无需更改任何属性，而且与某些忽略 `ro.dalvik.vm.native.bridge` 属性的模拟器更为兼容。
- [常规] 增强了对模块预启动挂载的支持。这使得模块可以在启动过程开始前修改系统，这对一些高级用例非常有用。
- [常规] 实施了一项新功能，以支持通过使用类似于 `overlayfs` 的指示留白字符设备来删除文件。这允许模块从原始系统中删除文件，而无需实际修改。
- [Zygisk] 新增对 GrepheneOS Android 14 的支持，这是一款注重隐私和安全的移动操作系统，与 Android 应用程序兼容。这是因为官方 Magisk 不支持它。
- [常规] 恢复官方 Magisk 已移除的对不支持 selinux 的设备的支持。这样，用户就能在内核未启用 selinux 的设备上使用 Magisk。

### Magisk 上游等级

- HEAD 提交: 6cda6c2

## Magisk (d7750b72) (26403)

- [Zygisk] 引入新的代码注入机制
- [Zygisk] 支持 U QPR2 中引入的新签名

## 与 v26.4 的差异

- [Zygisk] 引入新的代码注入机制
- [Zygisk] 支持 U QPR2 中引入的新签名

## 参考链接

- [Note](https://huskydg.github.io/magisk-files/note.html)（官方）
