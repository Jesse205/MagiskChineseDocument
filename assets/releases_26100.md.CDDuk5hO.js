import{_ as e,c as a,o as i,a4 as o}from"./chunks/framework.CasJ7utE.js";const m=JSON.parse('{"title":"2023.4.11 Magisk v26.1","description":"","frontmatter":{},"headers":[],"relativePath":"releases/26100.md","filePath":"releases/26100.md","lastUpdated":1694964698000}'),r={name:"releases/26100.md"},s=o('<h1 id="_2023-4-11-magisk-v26-1" tabindex="-1">2023.4.11 Magisk v26.1 <a class="header-anchor" href="#_2023-4-11-magisk-v26-1" aria-label="Permalink to &quot;2023.4.11 Magisk v26.1&quot;">​</a></h1><h2 id="与-v26-0-相比的更改" tabindex="-1">与 v26.0 相比的更改 <a class="header-anchor" href="#与-v26-0-相比的更改" aria-label="Permalink to &quot;与 v26.0 相比的更改&quot;">​</a></h2><ul><li>[应用程序] 修复了撤销根权限时崩溃的问题</li><li>[MagiskInit] 在选择预初始化分区时，始终更喜欢 <code>ext4</code> 分区而不是 <code>f2fs</code></li><li>[常规] 从镜像恢复模块文件的上下文/所有者/组。这是 v26.0 中引入的回归</li></ul><details class="details custom-block"><summary>英文原版</summary><ul><li>[App] Fix crashing when revoking root permissions</li><li>[MagiskInit] Always prefer <code>ext4</code> partitions over <code>f2fs</code> when selecting the pre-init partition</li><li>[General] Restore module files&#39; context/owner/group from mirror. This is a regression introduced in v26.0</li></ul></details><p>（以下内容与 v26.0 发布说明相同）</p><h2 id="将最低-android-版本提升到6-0" tabindex="-1">将最低 Android 版本提升到6.0 <a class="header-anchor" href="#将最低-android-版本提升到6-0" aria-label="Permalink to &quot;将最低 Android 版本提升到6.0&quot;">​</a></h2><p>Magisk 对 Android Lollipop 的支持在不知不觉中已经中断了一段时间。此外，Magisk 的活跃开发者都没有运行 Android Lollipop 的实际硬件。我们依赖使用官方安卓模拟器对旧平台进行回归测试，但谷歌从未提供过支持 SELinux 的棒棒糖模拟器镜像，这让我们别无选择，只能放弃对棒棒糖的支持，因为在没有充分测试的情况下，我们不放心支持安卓棒棒糖。</p><h2 id="新的-magic-mount-实现" tabindex="-1">新的 Magic Mount 实现 <a class="header-anchor" href="#新的-magic-mount-实现" aria-label="Permalink to &quot;新的 Magic Mount 实现&quot;">​</a></h2><p>魔力挂载（Magic Mount）是一项能让模块修改分区的功能，现已进行了重大改写。现有实现无法很好地与使用 <code>overlayfs</code> 向系统注入覆盖层的 OEM 配合使用。新的实现方式从根本上改变了文件系统镜像的创建方式，为我们提供了未修改文件系统的更精确克隆。</p><h2 id="新的-sepolicy-rule-实现" tabindex="-1">新的 <code>sepolicy.rule</code> 实现 <a class="header-anchor" href="#新的-sepolicy-rule-实现" aria-label="Permalink to &quot;新的 `sepolicy.rule` 实现&quot;">​</a></h2><p>Magisk 允许模块通过包含 <code>sepolicy.rule</code> 文件来提供自定义 SELinux 补丁。由于 SELinux 补丁的复杂性，该功能的兼容性一直很不稳定；许多设备都不支持。在此版本中，我们设计了全新的启动前分区检测机制，以支持更多设备。由于复杂的原因，该检测机制无法在第三方 Recovery 环境中执行。</p><p><strong>这意味着使用第三方 Recovery 功能安装 Magisk v26+ 将是不完整的；需要在启动后通过 Magisk 应用程序重新安装。</strong></p><h2 id="zygisk-更新" tabindex="-1">Zygisk 更新 <a class="header-anchor" href="#zygisk-更新" aria-label="Permalink to &quot;Zygisk 更新&quot;">​</a></h2><p>**新版 Zygisk API v4 现已上线！**它具有新功能和完善的 PLT 函数钩子 API。Zygisk 的实现也经历了一些重大的重构，包括新的代码加载/卸载机制和新的 PLT 函数钩子实现。</p><p>前往 <a href="https://github.com/topjohnwu/zygisk-module-sample" target="_blank" rel="noreferrer">Zygisk 模块示例</a> 仓库查看新的 API 和文档！</p><p><strong>完整更新日志： <a href="/MagiskChineseDocument/changes.html">这里</a></strong></p>',16),t=[s];function l(n,c,d,h,p,u){return i(),a("div",null,t)}const k=e(r,[["render",l]]);export{m as __pageData,k as default};