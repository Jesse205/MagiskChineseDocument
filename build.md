# 构建和开发 Magisk

## 设置环境

- 支持的平台：
  - Linux x64
  - macOS x64 (Intel)
  - macOS arm64 (Apple Silicon)
  - Windows x64
- 仅 Windows： 启用[开发者模式](https://learn.microsoft.com/zh-cn/windows/apps/get-started/enable-your-device-for-development)。因为需要支持符号链接。
- 安装 Python 3.8+：
  - 在 Unix 上，使用您喜欢的软件包管理器安装 python3
  - 在 Windows 上，在[官方网站](https://www.python.org/downloads/windows/)上下载并安装 Python 最新的版本.<br>
    请在安装过程中选择 **“Add Python to PATH（将 Python 添加到 PATH）”**。
  - (在 Windows 上，可选)：运行 `pip install colorama` 以安装 `colorama` python 包
- 安装 Git：
  - 在 Unix 上，使用您喜欢的软件包管理器安装 git
  - 在 Windows 上，在[官方网站](https://git-scm.com/download/win)上下载并安装最新的 Git 版本.<br>
    请确保在安装过程前 **“启用符号链接”**。
- 安装 Android Studio 并按照说明进行初始设置。
- 将环境变量 `ANDROID_SDK_ROOT` 设置为 Android SDK 文件夹。此路径可以在 Android Studio 设置中找到。
- 设置 JDK：
  - 建议的选项是将环境变量 `ANDROID_STUDIO` 设置为 Android Studio 的安装路径。构建脚本将自动查找并使用捆绑的 JDK。
  - 您也可以自己设置 JDK 17，但本指南不包含说明。
- 克隆源代码：

``` bash
git clone --recurse-submodules https://github.com/topjohnwu/Magisk.git
```

- 运行 `./build.py ndk` 让脚本下载并安装 NDK

## 构建

- 要构建所有内容并创建最终的 Magisk APK，请运行 `./build.py all` 。
- 您还可以构建特定的子组件。调用 `build.py` 查看您的选项\
  对于每个操作，使用 `-h` 访问帮助（例如 `./build.py binary -h` ）
- 使用 `config.prop` 配置构建。提供了示例 `config.prop.sample` 。

## IDE 支持

- [Magisk 的存储库](https://github.com/topjohnwu/Magisk/)可以作为一个项目直接使用 Android Studio 打开。
- 项目中的 Kotlin、Java、C++ 和 C 代码应该在 Android Studio 中得到开箱即用的适当支持。
- 在处理原生（native）代码之前运行 `./build.py binary` ，因为某些生成的代码仅在构建过程中创建。

### 在 Android Studio 中开发 Rust

由于 Magisk NDK 软件包 [ONDK](https://github.com/topjohnwu/ondk)（与 `./build.py ndk` 一起安装的软件包）包含一个完全独立的 Clang + Rust 工具链，因此单独构建 Magisk 项目不需要配置工具链。但是，由于 Intellij Rust 插件的工作方式，您必须进行一些额外的设置才能使 Android Studio 与 Magisk 的 Rust 代码库一起使用：

- 安装官方 Rust 工具链管理器 [rustup](https://rustup.rs/)
- 链接 ONDK Rust 工具链并将其设置为默认值：

```bash
# 将 ONDK 工具链与名称“magisk”链接起来
rustup toolchain link magisk "$ANDROID_SDK_ROOT/ndk/magisk/toolchains/rust"
# 设置为默认
rustup default magisk
```

- 在 Android Studio 中安装 [Intellij Rust 插件](https://www.jetbrains.com/rust/)
- 在 首选项（Preferences） > 语言和框架（Languages & Frameworks） > Rust 中，将 `$ANDROID_SDK_ROOT/ndk/magisk/toolchains/rust/bin` 设置为工具链位置
- 打开 `native/src/Cargo.toml` ，然后在“未找到 Cargo 项目（No Cargo projects found）”横幅中选择“附加（Attach）”

## 签名和分发

- 在发布版本中，Magisk 的 root 守护程序将使用对 Magisk APK 进行密钥签名的证书作为参考，拒绝并强制卸载任何不匹配的 Magisk 应用，保护用户免受恶意和未经验证的 Magisk APK 的侵害。
- 要在 Magisk 本身上进行任何开发，请切换到 **官方调试版本并重新安装 Magisk** 以关闭签名检查。
- 要分发使用您自己的密钥签名的自己的 Magisk 构建，请在 `config.prop` 中设置您的签名配置。
- 查看 [Google 的文档](https://developer.android.google.cn/studio/publish/app-signing.html#generate-key)，了解有关生成自己的密钥的更多详细信息。
