# 狐妖面具（Kitsune Mask）

![Delta](https://user-images.githubusercontent.com/84650617/222942594-63336f63-6a26-492e-a1d1-a356b5f777b3.png)

## 介绍

**这不是官方支持的 [topjohnwu](https://github.com/topjohnwu) 项目。**

::: tip
这不是官方 Magisk，请[转到此页面下载官方 Magisk](https://github.com/topjohnwu/Magisk)
:::

## 下载

### 稳定版 / Beta

- [26.4 Stable](https://github.com/HuskyDG/download/raw/main/magisk/26.4-kitsune.apk)

### Canary / Debug

> 如有任何问题，请联系 <deadboltsx303@gmail.com>。只接受来自**最新 DEBUG** 版本的错误报告

- [Canary (app-release.apk)](https://huskydg.github.io/magisk-files/app-release.apk)
- [Debug (app-debug.apk)](https://huskydg.github.io/magisk-files/app-debug.apk)
- [源代码](https://github.com/HuskyDG/magisk)
- [更新日志](./note.md)

### 其他版本

- [发行页面](https://github.com/HuskyDG/magisk-files/releases)

## 如何安装

### 如何从头开始安装 Kitsune Mask？

与安装 Magisk 的过程相似：<https://topjohnwu.github.io/Magisk/install.html>

### 如何从当前的 Magisk 切换到 Kitsune Mask，反之亦然？

很简单，就像更新 Magisk 时一样！

#### 直接安装（推荐）

1. 安装、打开并授予 Kitsune Mask root 权限。
2. 在 **Magisk** 中，点击“安装”，然后点击“直接安装”。如果看不到，请尝试重启应用程序。

#### 或从当前的 Magisk 应用程序中刷入 Kitsune Mask

1. 将扩展名 `magisk.apk` 重命名为 `magisk.zip`
2. 打开 Magisk 应用程序，点击“模块”选项 -> “从存储安装”，然后选择 `magisk.zip`

#### 直接将 Magisk 安装到 `/system`，而不是修补启动映像（不推荐）

此方法仅适用于具有宽松的 SELinux 模式或强制 SELinux 的 ROM，其中在 sepolicy 规则中有允许的“u:r:su:s0”上下文，例如 LineageOS 等 user-debug 的 ROM。请确保您有 ROM 的备份和可用的自定义Recovery。您的 ROM 和内核必须支持读写挂载和动态 SELinux 规则修补。此方法可能会导致启动失败，因此请自行承担风险！

1. 如果已安装 Magisk，请还原启动镜像。
2. 重启到 recovery，将 `magisk.apk` 重命名为 `systemmagisk.zip`，然后刷入。
3. 要更新 Magisk，请使用**直接安装到系统分区**而不是**直接安装**。

### 如何将 Magisk 安装到安卓模拟器中

由于 ramdisk 分区没有足够空间容纳 Magisk 二进制文件，因此模拟器无法为 ramdisk 添加补丁。已对以下模拟器和 Android-x86 项目进行了测试：NoxPlayer、LDPlayer、MEmu、BlissOS 和 PrimeOS。

#### 将 Magisk 安装到 NoxPlayer、LDPlayer、MemuPlayer 等模拟器的步骤

1. 在模拟器设置中启用 Root 访问。
2. 安装并打开 Kitsune Mask。
3. 授予 Kitsune Mask root 权限，在 Magisk 区域点击“安装”，使用“直接安装到系统分区”选项，而不是“直接安装”选项。（如果没有看到该选项，请关闭并重新打开 Kitsune Mask。）现在不要重启！
4. 备份内置 `su`（`/system/bin/su` 和 `/system/xbin/su`）并删除它们（以防你想卸载 Magisk 并恢复内置 `su`），然后重启。由于 LDPlayer 等模拟器会在设置中禁用 ROOT 后删除所有 `su`，**请勿**在模拟器设置中禁用 Root 访问。
5. 享受 Magisk！

#### 在 Bluestacks 上安装 Magisk 的步骤

1. 从[此处](https://bstweaker.ru)下载 Bluestacks Tweaker。
2. 使用 Bluestacks Tweaker 并点击“Unlock”解锁 Bluestacks 实例，然后启动它。否则无法安装 Magisk。
3. 实例成功启动后，点击“Patch”打开 root 访问，安装 Kitsune Mask，并执行“直接安装到系统分区”操作。
4. 完成后，点击“UnPatch”，然后重新启动实例。
5. 享受 Magisk！

## 捐赠

- Paypal: [paypal.me/huskydg](http://paypal.me/huskydg)
- 感谢您的支持，祝您有美好的一天！👍

## 致谢

- Magisk 作者：[topjohnwu](https://github.com/topjohnwu/magisk)
- Magisk 贡献者：[vvb2060](https://github.com/vvb2060), [yujincheng08](https://github.com/yujincheng08), [RikkaW](https://github.com/RikkaW), [canyie](https://github.com/canyie)
- ptrace 实现的 Zygisk：[ZygiskNext](https://github.com/Dr-TSNG/ZygiskNext),  [Dr-TSNG](https://github.com/Dr-TSNG/ZygiskNext) and [5ec1cff](https://github.com/5ec1cff)

## 许可

我们的许可证与 [Magisk 的许可证](https://github.com/topjohnwu/Magisk#License) 相同

::: warning
中文汉化版许可仅供参考，**请以英文原版为准!**
:::

::: code-group

``` txt [中文汉化 <Badge text="百度翻译" />]
Magisk，包括所有 git 子模块都是自由软件：
您可以根据自由软件基金会发布的 GNU 通用公共许可证的条款（许可证的第3版，
或（根据您的选择）任何更高版本重新分发和/或修改它。

分发此程序是希望它有用，但没有任何保证；甚至没有适销性或特定用途适用性
的隐含保证。有关详细信息，请参阅 GNU 通用公共许可证。

你应该已经收到了GNU通用公共许可证的副本以及这个程序。如果没有，请参见
<http://www.gnu.org/licenses/>。
```

``` txt [英文原版]
Magisk, including all git submodules are free software:
you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

:::

## 参考链接

- [Kitsune Mask](https://huskydg.github.io/magisk-files/main.html)（官方）
