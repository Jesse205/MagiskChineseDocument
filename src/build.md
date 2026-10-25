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
  - 在 Windows 上，在[官方网站](https://www.python.org/downloads/windows/)上下载并安装 Python 最新的版本。\
    请在安装过程中选择 **“Add Python to PATH（将 Python 添加到 PATH）”**。
  - 在 Windows 上 <Badge type="tip" text="可选" /> ：运行 `pip install colorama` 以安装 `colorama` python 包
- 安装 Git：
  - 在 Unix 上，使用您喜欢的软件包管理器安装 git
  - 在 Windows 上，在[官方网站](https://git-scm.com/download/win)上下载并安装最新的 Git 版本。\
    请确保在安装过程前 **“启用符号链接”**。
- 安装 Android Studio 并按照说明进行初始设置。
- 将环境变量 `ANDROID_HOME` 设置为 Android SDK 文件夹。此路径可以在 Android Studio 设置中找到。
- 设置 JDK：
  - 建议的选项是将环境变量 `ANDROID_STUDIO` 设置为 Android Studio 的安装路径。构建脚本将自动查找并使用捆绑的 JDK。
  - 您也可以自己设置 JDK 25，但本指南不再赘述。
- 克隆源代码：

``` bash
git clone --recurse-submodules https://github.com/topjohnwu/Magisk.git
```

- 运行 `./build.py ndk` 使用脚本下载并安装 NDK

## 构建

- 要构建所有内容并创建最终的 Magisk APK，请运行 `./build.py all` 。
- 您还可以构建特定的子组件。运行 `./build.py -h` 查看所有可用的操作。\
  对于每个操作，使用 `-h` 访问帮助（例如 `./build.py native -h` ）。
- 使用 `config.prop` 配置构建。提供了示例 `config.prop.sample` 。
- 如果已安装 `sccache` 或 `ccache` 且可在 `PATH` 中使用，`build.py` 将自动使用它们来加速 C++ 和 Rust 构建。
- 若要使用 `build.py` 配置的相同环境变量运行独立工具（例如 `./gradlew`、`cargo` 或 `ndk-build`），请在命令前加上 `scripts/env.py`（例如 `scripts/env.py ./gradlew :apk:assembleDebug`）。您也可以运行 `./build.py clippy` 来检查 Rust 代码，或运行 `./build.py cargo ...` 直接对原生工作区调用 Cargo。

## IDE 支持

- 项目中的 Kotlin、Java、C++ 和 C 代码应该在 Android Studio 中得到适当的开箱即用的支持。此仓库可以作为一个项目直接使用 Android Studio 打开。
- 有关 Rust 开发，请参阅下一节。
- 在处理任何原生（native）代码之前，请运行 `./build.py gen`（或使用 `./build.py native` 构建全部原生代码），它会生成构建标志、C++/Rust FFI 绑定、protobuf 源文件以及供 C/C++ 语言服务器使用的 `native/compile_commands.json`。

### 开发 Rust

首先安装官方 Rust 工具链管理器 [rustup](https://www.rust-lang.org/tools/install)。Magisk NDK 软件包 [ONDK](https://github.com/topjohnwu/ondk)（与 `./build.py ndk` 一起安装的软件包）捆绑了完整的 Rust 工具链，因此**构建** Magisk 项目本身不需要任何进一步配置。

但是，如果您想开发 Rust 代码库，将 ONDK 的 Rust 工具链链接到 `rustup` 并将其设置为默认值会更容易，这样许多开发工具和 IDE 就能正常工作：

```bash
# 将 ONDK 工具链与名称“magisk”链接起来
rustup toolchain link magisk "$ANDROID_HOME/ndk/magisk/toolchains/rust"
# 将 magisk 设置为默认
rustup default magisk
```

如果您打算使用 VSCode，可以安装 [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) 插件，一切就绪。如果您打算使用 JetBrains IDE（例如 [RustRover](https://www.jetbrains.com/rust/)，或其 Rust 插件），则需要一些额外设置：

- 安装官方 nightly 工具链并添加一些组件。我们实际上不会用 nightly 工具链做任何事情，只是为了“骗过”IDE；真正的魔法发生在下一步设置的包装器中。

```bash
rustup toolchain install nightly
# 添加一些 ONDK 中也包含的组件
rustup +nightly component add rust-src clippy
```

- 创建一个包装用的 cargo bin 目录，以绕过 `rustup` 的限制

```bash
# 这里以 ~/.cargo/wrapper 为例（也是一个不错的推荐）
# 您可以选择任何路径，只需在下一步中使用该路径即可
./build.py rustup ~/.cargo/wrapper
```

- 在“设置（Settings） > Rust > 工具链位置（Toolchain location）”中，将其设置为我们刚刚创建的包装器目录的路径。
- 现在 IDE 应该可以完全正常工作了，您可以启用 `rustfmt` 并将 `Clippy` 用作外部 linter。

## 签名和分发

- 在发布版本中，Magisk 的 root 守护程序将使用对 Magisk APK 进行密钥签名的证书作为参考，拒绝并强制卸载任何不匹配的 Magisk 应用，保护用户免受恶意和未经验证的 Magisk APK 的侵害。
- 要在 Magisk 本身上进行任何开发，请切换到 **官方调试版本并重新安装 Magisk** 以关闭签名检查。
- 要分发使用您自己的密钥签名的自己的 Magisk 构建，请在 `config.prop` 中设置您的签名配置。
- 查看 [Google 的文档](https://developer.android.google.cn/studio/publish/app-signing.html#generate-key)，了解有关生成自己的密钥的更多详细信息。
