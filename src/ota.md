# OTA 升级指南

Magisk 默认不会修改只读分区，这使得应用官方 OTA 要简单得多。**仅支持在具有 A/B 分区（无缝系统更新）的设备上使用 OTA 更新。** 在 A/B 设备上，系统运行期间 OTA 会被安装到非活动插槽，从而允许 Magisk app 将 Magisk 安装到更新后的分区，并在更新后保留 root。本文档中的具体流程仅在 Pixel 设备上测试过，因为其他设备的步骤可能有所不同。

**注意：为了应用 OTA，您必须确保自己没有以任何方式修改只读分区（如 `/system` 或 `/vendor` ）。即使将分区重新挂载到 rw 也会篡改块验证**

## 必要条件

- 请在开发人员选项中禁用*自动系统更新*，这样在未经您确认的情况下，它不会安装 OTA。

<p align="center"><img src="/images/disable_auto_ota.png" width="250"/></p>

- 当 OTA 可用时，首先转到（Magisk app → 卸载 → 恢复映像），**不要重新启动，否则将卸载 Magisk。** 这将使 Magisk 修改的分区从安装时的生成备份恢复到官方，以便通过 OTA 前的块验证。**注意：** 对于 Pixel 设备和 Googlebook，不需要恢复启动映像，因为只要有任何分区被修改，Google 的服务器就会自动提供完整 OTA。

<p align="center"><img src="/images/restore_img.png" width="300"/></p>

## 安装 OTA

1. 按正常方式安装 OTA（设置 → 系统 → 系统更新），并等待安装完全完成（包括“正在安装系统更新”和“正在优化您的设备”）。**暂时不要按“立即重新启动”或“重新启动”按钮！**
2. 转到 Magisk app，选择（**安装 → 安装到非活动插槽（OTA 后）**）将 Magisk 安装到更新后的插槽。

<p align="center"><img src="/images/ota_done.png" width="250"/> <img src="/images/install_inactive_slot.png" width="250"/></p>

3. Magisk 安装完成后，回到系统的 OTA 更新界面，按**立即重新启动**，从那里重新启动进入更新后的插槽。

<p align="center"><img src="/images/install_done.png" width="250"/> <img src="/images/ota_reboot.png" width="250"/></p>

## 参考链接

- [Magisk OTA Upgrade Guides](https://topjohnwu.github.io/Magisk/ota.html)（官方）
