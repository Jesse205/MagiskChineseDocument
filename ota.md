# OTA升级指南
Magisk 不修改大多数只读分区，这意味着应用官方 OTA 要简单得多。以下是几种不同类型的设备的教程，以应用 OTA 并在安装后保留 Magisk（如果可能）。这只是一个通用指南，因为每个设备的程序可能有所不同。

**注意：为了应用 OTA，您必须确保自己没有以任何方式修改只读分区（如 `/system` 或`/vendor`）。即使将分区重新挂载到 rw 也会篡改块验证**

## 必要条件
- 请在开发人员选项中禁用*自动系统更新*，这样在未经您确认的情况下，它不会安装 OTA。

<p align="center"><img src="/images/disable_auto_ota.png" width="250"/></p>

- 当OTA可用时，首先转到（Magisk app → 卸载 → 恢复映像）**不要重新启动，否则将卸载 Magisk。**这将使 Magisk 修改的分区从安装时的生成备份恢复到官方，以便通过 OTA 前的块验证**在执行以下步骤之前，需要执行此步骤**

<p align="center"><img src="/images/restore_img.png" width="300"/></p>

## 带A/B分区的设备

可以将 OTA 安装到非活动插槽，并让 Magisk app 将 Magisk 安装到更新的分区上。开箱即用的 OTA 安装工作无缝，安装后可以保存 Magisk。

- 恢复官方映像后，按正常方式应用 OTA（设置 → 系统 → 系统更新）。
- 等待安装完成（OTA 的 步骤1 和 步骤2），**不要按“立即重新启动”或“重新启动”按钮！**相反，请转到（Magisk app → 安装 → 安装到非活动插槽）将 Magisk 安装到更新的插槽。

<p align="center"><img src="/images/ota_done.png" width="250"/> <img src="/images/install_inactive_slot.png" width="250"/></p>

- 安装完成后，按下 Magisk app 中的重新启动按钮。在 hood 下，Magisk app 强制您的设备切换到更新的插槽，绕过任何可能的 OTA 后验证。

<p align="center"><img src="/images/manager_reboot.png" width="250"/></p>

## “非 A/B” 设备
不幸的是，在这些设备上应用 OTA 并没有真正好的方法。以下教程不会保留 Magisk；升级后，您必须手动重新 root 设备，这将需要通过电脑。这些只是“最佳实践”。

- 如果您安装了自定义 recovery，则可以从以前的备份、在线转储或 OEM 提供的出厂映像中恢复。
如果您决定在不接触 recovery 分区的情况下开始安装 Magisk，您可以有几种选择，无论是哪种方式，您都可以最终使用 Magisk root 的设备，但 recovery 仍然保持不变：
    - 如果支持，请使用 `fastboot boot <recovery_img>` 启动自定义 Recovery 并安装Magisk。
    - 如果您有官方映像转储的副本，请使用 Magisk app 的“修补映像”功能安装 Magisk
- 恢复到官方映像和其他映像后，下载 OTA。可选地，一旦下载了 OTA 更新 zip，就可以找到提取 zip 的方法（因为它通常涉及 root 用户）
- 应用 OTA 并重启设备。这将使用您设备的官方映像 OTA 安装机制来升级您的系统。
- 一旦完成，您将得到一个升级的、100%官方的、未 root 的设备。你必须手动将 Magisk 刷回。如果您想经常接收官方 OTA，请考虑使用 步骤1 中所述的方法，在不接触恢复分区的情况下刷入 Magisk。
