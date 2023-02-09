import{_ as e,c as o,o as a,a as s}from"./app.3dfd33b5.js";const l="/MagiskChineseDocument/assets/device_info.234952cd.png",b=JSON.parse('{"title":"安装","description":"","frontmatter":{},"headers":[{"level":2,"title":"入门","slug":"入门","link":"#入门","children":[]},{"level":2,"title":"修补映像","slug":"修补映像","link":"#修补映像","children":[]},{"level":2,"title":"卸载","slug":"卸载","link":"#卸载","children":[]},{"level":2,"title":"Recovery 中的 Magisk","slug":"recovery-中的-magisk","link":"#recovery-中的-magisk","children":[]},{"level":2,"title":"三星 (System-as-root)","slug":"三星-system-as-root","link":"#三星-system-as-root","children":[{"level":3,"title":"安装 Magisk 之前","slug":"安装-magisk-之前","link":"#安装-magisk-之前","children":[]},{"level":3,"title":"解锁 Bootloader","slug":"解锁-bootloader","link":"#解锁-bootloader","children":[]},{"level":3,"title":"操作指南","slug":"操作指南","link":"#操作指南","children":[]},{"level":3,"title":"系统更新","slug":"系统更新","link":"#系统更新","children":[]},{"level":3,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[]}]},{"level":2,"title":"华为","slug":"华为","link":"#华为","children":[{"level":3,"title":"获得官方映像","slug":"获得官方映像","link":"#获得官方映像","children":[]},{"level":3,"title":"EMUI 5 及以下","slug":"emui-5-及以下","link":"#emui-5-及以下","children":[]},{"level":3,"title":"EMUI 8","slug":"emui-8","link":"#emui-8","children":[]},{"level":3,"title":"EMUI 9 或更高版本","slug":"emui-9-或更高版本","link":"#emui-9-或更高版本","children":[]}]},{"level":2,"title":"第三方 Recovery","slug":"第三方-recovery","link":"#第三方-recovery","children":[]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"relativePath":"install.md","lastUpdated":1675935021000}'),r={name:"install.md"},t=s('<h1 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h1><p>如果您已经安装了 Magisk ，<strong>强烈建议</strong>直接通过 Magisk 应用程序的「直接安装」方法进行升级。以下教程仅针对初始安装。</p><ul><li>如果您在使用运行着 <strong>EMUI 8</strong> 或更高版本的华为设备，请查看<a href="#%E5%8D%8E%E4%B8%BA">相应部分</a>。</li><li>如果您使用的是<strong>搭载 Android 9.0</strong> 或更高版本的三星设备（2019 年新设备），请查看<a href="#%E4%B8%89%E6%98%9F-system-as-root">相应部分</a>。</li></ul><h2 id="入门" tabindex="-1">入门 <a class="header-anchor" href="#入门" aria-hidden="true">#</a></h2><p>在你开始之前：</p><ul><li>本教程假设您了解如何使用 <code>adb</code> 和 <code>fastboot</code></li><li>如果您还计划安装第三方内核（kernels），请在安装 Magisk 之后安装它</li><li>必须解锁设备的引导加载程序（bootloader）</li></ul><hr><p>下载并安装最新的 <a href="https://github.com/topjohnwu/Magisk/releases/latest" target="_blank" rel="noreferrer">Magisk 应用程序</a> （只需下载「Magisk-版本.apk」即可） 在主屏幕中，您应该看到：</p><p align="center"><img src="'+l+`" width="500"></p><p><strong>Ramdisk</strong> 的结果确定您的设备在 boot 分区中是否有 ramdisk。如果您的设备没有启动 ramdisk，请在继续之前阅读 <a href="#recovery-%E4%B8%AD%E7%9A%84-magisk">Recovery 中的 Magisk</a> 部分。</p><div class="info custom-block"><p class="custom-block-title">信息</p><p>不幸的是，有一些例外情况，因为某些设备的引导加载程序会接受 ramdisk，即使它不应该接受。 在这种情况下，您必须按照说明进行操作，就好像您的设备的 boot 分区<strong>包含 ramdisk 一样</strong>。 没有什么办法检测到这一点，因此唯一可以确定的方法就是实际尝试。 幸运的是，据我们所知，只有部分小米设备具有此属性，所以大多数人可以忽略这条信息。</p></div><p>如果您的设备<strong>有启动 ramdisk</strong>，请获取 <code>boot.img</code> 或者 <code>init_boot.img</code>（如果存在。在出厂时搭载安卓13的设备通常是这样的，比如红米K60Pro）的副本。<br></p><p>如果您的设备<strong>没有启动 ramdisk</strong>，请获取 <code>recovery.img</code> 的副本。<br></p><p>您可以从官方固件包或第三方 ROM 刷机包中提取所需文件。</p><p>接下来，我们需要知道您的设备是否有单独的 <code>vbmeta</code> 分区。</p><ul><li><p>如果您的官方固件包包含 <code>vbmeta.img</code> ，那么您的设备<strong>有一个单独的 <code>vbmeta</code> 分区</strong></p></li><li><p>您还可以通过将设备连接到 PC 并运行以下命令进行检查：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">adb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ls</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-l</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/dev/block/by-name</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 如果您遇到如 No such file or directory 的报错，那么请尝试把命令更换为</span></span>
<span class="line"><span style="color:#FFCB6B;">adb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ls</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-l</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/dev/block/bootdevice/by-name</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 如果还是报错（比如华为设备），那么请联网搜索您的设备相对应的方法</span></span>
<span class="line"></span></code></pre></div></li><li><p>如果找到 <code>vbmeta</code>、<code>vbmeta_a</code> 或 <code>vbmeta_b</code> ，那么您的设备<strong>有一个单独的 <code>vbmeta</code> 分区</strong></p></li><li><p>否则，您的设备<strong>没有单独的 <code>vbmeta</code> 分区</strong>。</p></li></ul><p>快速回顾一下，此时，您应该已经知道并准备好了：</p><ol><li>设备是否具有启动 ramdisk</li><li>设备是否有单独的 <code>vbmeta</code> 分区</li><li>基于 (1) 的 <code>boot.img</code> 、<code>init_boot.img</code> 或 <code>recovery.img</code></li></ol><p>让我们继续<a href="#%E4%BF%AE%E8%A1%A5%E6%98%A0%E5%83%8F">修补映像</a>.</p><h2 id="修补映像" tabindex="-1">修补映像 <a class="header-anchor" href="#修补映像" aria-hidden="true">#</a></h2><ul><li><p>将 boot 或 recovery 映像（ <code>*.img</code> 文件）复制到设备</p></li><li><p>按下 Magisk 主屏幕中的 <strong>「安装」</strong> 按钮</p></li><li><p>如果要修补 recovery 映像，请选中 <strong>「Recovery 模式」</strong> 选项</p></li><li><p>如果您的设备<strong>没有单独的 <code>vbmeta</code> 分区</strong>，请选中 <strong>「修补 boot 映像中的 vbmeta」</strong> 选项</p></li><li><p>在方式中选择 <strong>「选择并修补一个文件」</strong> ，然后选择 boot 或 recovery 映像</p></li><li><p>开始安装，并使用 ADB 将修补的映像复制到您的电脑：<br></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">adb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/sdcard/Download/magisk_patched_[随机字符].img</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PC上magisk_patched.img的路径</span></span>
<span class="line"></span></code></pre></div></li></ul><blockquote><p>提示，你可以将文件从资源管理器直接拖到终端中来获得文件绝对路径。</p></blockquote><p><strong>不要使用 MTP</strong>，因为它可能会损坏大文件。</p><ul><li><p>将修补好的 boot 或 recovery 映像刷入到您的设备。<br> 对于大多数设备，重启到 fastboot 模式，并使用以下命令刷入：<br></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">fastboot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">flash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">boot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PC上magisk_patched.img的路径</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 如果刚刚修补的是 recovery 映像则改用：</span></span>
<span class="line"><span style="color:#FFCB6B;">fastboot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">flash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">recovery</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PC上magisk_patched.img的路径</span></span>
<span class="line"></span></code></pre></div></li><li><p>(可选) 如果您的设备有单独的 <code>vbmeta</code> 分区，则可以使用以下命令修补 <code>vbmeta</code> 分区 <br></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">fastboot</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">flash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vbmeta</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--disable-verity</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--disable-verification</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vbmeta.img</span></span>
<span class="line"></span></code></pre></div></li><li><p>重启，瞧！</p></li></ul><h2 id="卸载" tabindex="-1">卸载 <a class="header-anchor" href="#卸载" aria-hidden="true">#</a></h2><p>卸载 Magisk 的最简单方法是直接通过 Magisk 应用程序。如果您坚持使用第三方 Recovery，请将 Magisk APK 文件 重命名为 <code>uninstall.zip</code> 后像其他普通的刷机包一样刷入。</p><h2 id="recovery-中的-magisk" tabindex="-1">Recovery 中的 Magisk <a class="header-anchor" href="#recovery-中的-magisk" aria-hidden="true">#</a></h2><p>如果您的设备在 boot 映像中没有 ramdisk ，Magisk 别无选择，只能劫持 Recovery 分区。对于这些设备，每次启用 Magisk 时都必须<strong>重新启动至 Recovery</strong>。</p><p>当 Magisk 劫持 recovery 时，有一个特殊的机制允许您实际进入到 Recovery 模式。每个设备都有自己的启动到 Recovery 模式的按键组合，（例如几乎所有的小米设备均为「电源」+「音量增大」以及 Galaxy S10 的「电源」+「Bixby」+「音量增大」）。百度搜索（或者 Bing 搜索、Google 搜索）可以很容易地获得这些信息。一旦你按下组合键，设备就会显示启动屏幕（可能还会振动），释放所有按键即可启动 Magisk。如果您决定引导到实际的 Recovery 模式，请<strong>长按音量增大，直到看到 Recovery 屏幕</strong>。</p><p>总之，在 recovery 中安装 Magisk 后 <strong>（从关机开始）</strong>：</p><ul><li><strong>(正常开机) → (无 Magisk 的系统)</strong></li><li><strong>(按键组合) → (启动屏幕) → (释放所有按钮) → (带有 Magisk 的系统)</strong></li><li><strong>(按键组合) → (启动屏幕) → (长按音量增大) → (Recovery 模式)</strong></li></ul><p>（注意：在这种情况下，您<strong>不能使用 第三方 Recovery 来安装或升级 Magisk</strong>！！）</p><h2 id="三星-system-as-root" tabindex="-1">三星 (System-as-root) <a class="header-anchor" href="#三星-system-as-root" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">警告</p><p>如果您的三星设备未安装 Android 9.0 或更高版本，则说明以下内容不适用于该设备。</p></div><h3 id="安装-magisk-之前" tabindex="-1">安装 Magisk 之前 <a class="header-anchor" href="#安装-magisk-之前" aria-hidden="true">#</a></h3><ul><li>安装 Magisk <strong>将熔断 KNOX</strong></li><li>首次安装 Magisk <strong>需要完整的数据擦除</strong>（这<strong>不包括在解锁 bootloader 时的数据擦除</strong>）。请在继续之前备份您的数据。</li><li>下载支持您设备的 Odin（仅在 Windows 上运行）。</li></ul><h3 id="解锁-bootloader" tabindex="-1">解锁 Bootloader <a class="header-anchor" href="#解锁-bootloader" aria-hidden="true">#</a></h3><p>在较新三星设备上解锁 bootloader 有一些注意事项。新引入的 <code>VaultKeeper</code> 服务会使 bootloader 在某些情况下拒绝任何非官方分区。</p><ul><li>允许在解锁 bootloader，在 <strong>开发者选项 → OEM 解锁</strong></li><li>重启到下载模式：将设备关机，然后按下设备的下载模式键组合</li><li>长按音量上限可解锁引导加载程序<strong>这将擦除数据并自动重新启动</strong></li><li>完成初始设置。跳过所有步骤，因为数据将在后面的步骤中再次擦除。<strong>在设置过程中将设备连接到互联网</strong></li><li>启用开发者选项，**确认「OEM解锁」选项存在且呈灰色。**这意味着 <code>VaultKeeper</code> 服务释放了引导加载程序。</li><li>您的 bootloader 现在在下载模式允许非官方映像</li></ul><h3 id="操作指南" tabindex="-1">操作指南 <a class="header-anchor" href="#操作指南" aria-hidden="true">#</a></h3><ul><li><p>使用 <a href="https://github.com/jesec/samfirm.js" target="_blank" rel="noreferrer">samfirm.js</a>，<a href="https://forum.xda-developers.com/s10-plus/how-to/tool-frija-samsung-firmware-downloader-t3910594" target="_blank" rel="noreferrer">Frija</a>，或 <a href="https://forum.xda-developers.com/s10-plus/how-to/tool-samloader-samfirm-frija-replacement-t4105929" target="_blank" rel="noreferrer">Samloader</a> 直接从三星服务器下载设备的最新 zip 固件 。</p></li><li><p>解压缩固件并将 <code>AP</code> 归档文件复制到设备。它通常命名为 <code>AP_[device_model_sw_ver].tar.md5</code></p></li><li><p>按下 Magisk 主屏幕中的 <strong>「安装」</strong> 按钮</p></li><li><p>如果您的设备<strong>没有</strong>启动 ramdisk，勾选 <strong>「Recovery模式」</strong> 选项</p></li><li><p>在方式中选择 <strong>「选择并修补一个文件」</strong> ，然后选择 <code>AP</code> 归档文件</p></li><li><p>开始安装，并使用 ADB 将修补的归档文件复制到您的电脑：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">adb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/sdcard/Download/magisk_patched_[random_strings].tar</span></span>
<span class="line"></span></code></pre></div><p>注意：<strong>不要使用MTP</strong>，因为它可能会损坏大型文件。</p></li><li><p>重新启动到下载模式。在您的 PC 上打开 Odin，将 <code>magisk_patched.tar</code> 作为 <code>AP</code>，连同原始固件中的 <code>BL</code>、<code>CP</code> 和 <code>CSC</code>（<strong>不是</strong> <code>HOME_CSC</code>，因为我们要<strong>清除数据</strong>）一起刷入。</p></li><li><p>一旦 Odin 完成刷机，您的设备应该会自动重启。 如果被要求恢复出厂设置，请同意。</p></li><li><p>如果您的设备<strong>没有</strong>启动 ramdisk，请立即重新启动到 recovery 以启用 Magisk（原因在 <a href="#recovery-%E4%B8%AD%E7%9A%84-magisk">Recovery 中的 Magisk</a> 中说明）。</p></li><li><p>安装您已经下载的 <a href="https://github.com/topjohnwu/Magisk/releases/latest" target="_blank" rel="noreferrer">Magisk 应用程序</a> 并启动该应用程序。 它应该显示一个对话框，要求进行额外的设置。</p></li><li><p>让应用程序完成它的工作并自动重启设备。</p></li></ul><h3 id="系统更新" tabindex="-1">系统更新 <a class="header-anchor" href="#系统更新" aria-hidden="true">#</a></h3><p>一旦你的三星设备获得了 root 权限，你就不能再通过 OTA 进行 Android 系统更新了。要进行系统更新，您必须手动下载新的固件归档文件并完成上一节中编写的相同 <code>AP</code> 修补过程。这里唯一的区别在于Odin刷入步骤：<strong>不要使用 <code>CSC</code> 归档文件，而是使用 <code>HOME_CSC</code> 归档文件，因为我们正在执行升级，而不是初始安装</strong>。</p><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-hidden="true">#</a></h3><ul><li><strong>永远、永远不要</strong>尝试将 <code>boot</code>、<code>recovery</code>或 <code>vbmeta</code> 分区恢复到原样！ 您这样做会破坏您的设备，并且从中恢复的唯一方法是<strong>清除数据并进行完整的 Odin 恢复</strong>。</li><li>要使用新的固件升级您的设备，<strong>切勿</strong>出于上述原因直接使用原厂 <code>AP</code> 归档文件。 <strong>始终</strong>在 Magisk 应用程序中修补 <code>AP</code> 并改用它。</li><li>永远不要只刷入 <code>AP</code> ，否则 Odin 可能会缩小 <code>/data</code> 文件系统的大小。升级时请刷入 <code>AP</code> + <code>BL</code> + <code>CP</code> + <code>HOME_CSC</code> 。</li></ul><h2 id="华为" tabindex="-1">华为 <a class="header-anchor" href="#华为" aria-hidden="true">#</a></h2><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>这部分已从官方文档中移除。您正在浏览的是 <a href="https://github.com/topjohnwu/Magisk/blob/408399eae095b7cbd3e05278682c4bb4c7702ec0/docs/install.md" target="_blank" rel="noreferrer">2021.03.22</a> 的版本。</p></div><p>Magisk 不再正式支持较新的华为设备，因为其设备上的 bootloader 不可通过官方途径解锁，更重要的是他们不遵循标准的 Android 分区方案。以下只是一些一般性指导。</p><p>使用了麒麟处理器的华为设备与大多数常见设备的分区方式不同。Magisk 通常安装在设备的 <code>boot</code> 分区，但是华为设备没有这个分区。根据您的设备运行的 EMUI 版本，说明会略有不同。</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>请勿使用最新版本的 Magisk 应用（在我的华为畅享7，SLA-AL00，EMUI 5.1.2，Android 7.0上使用最新的 Magisk v25.2 时会触发引导循环并直接重启至 eRecovery）！我推荐使用 <a href="https://github.com/topjohnwu/Magisk/releases/tag/v23.0" target="_blank" rel="noreferrer">Magisk v23.0</a> 或使用 <a href="https://github.com/topjohnwu/Magisk/releases/tag/v20.4" target="_blank" rel="noreferrer">Magisk v20.4</a> （下载「Magisk-v20.4.zip」）搭配 <a href="https://github.com/topjohnwu/Magisk/releases/tag/manager-v7.5.1" target="_blank" rel="noreferrer">Magisk Manager v7.5.1</a> （下载「MagiskManager-v7.5.1.apk」）</p></div><h3 id="获得官方映像" tabindex="-1">获得官方映像 <a class="header-anchor" href="#获得官方映像" aria-hidden="true">#</a></h3><p>华为不发布官方出厂映像以及 OTA 归档文件，但大多数固件压缩包可以从<a href="https://professorjtj.github.io/" target="_blank" rel="noreferrer">华为固件下载站</a> （仅限 Windows！）下载。 要从压缩包中的「UPDATE.APP」中提取映像，您必须使用 <a href="https://forum.xda-developers.com/showthread.php?t=2433454" target="_blank" rel="noreferrer">Huawei Update Extractor</a>（仅限 Windows！）</p><h3 id="emui-5-及以下" tabindex="-1">EMUI 5 及以下 <a class="header-anchor" href="#emui-5-及以下" aria-hidden="true">#</a></h3><p>遵循<a href="#%E5%85%A5%E9%97%A8">入门</a>的教程，唯一的不同在于<strong>请勿使用最新版本的 Magisk 应用！</strong></p><blockquote><p>提示：进入 fastboot 模式需要将手机<strong>使用数据线连接电脑</strong>，而进入 Recovery 模式则<strong>不能</strong>将手机使用连接到电脑！所以如果您在 fastboot 模式中刷入 Recovery 映像后务必<strong>将手机与电脑断开连接后</strong>再按下「电源」+「音量增大」来进入 Recovery，否则您将进入没用的「eRecovery」。</p></blockquote><h3 id="emui-8" tabindex="-1">EMUI 8 <a class="header-anchor" href="#emui-8" aria-hidden="true">#</a></h3><p>对于运行 EMUI 8 的设备，您的设备有一个名为 <code>ramdisk</code> 的分区，这是将要安装 Magisk 的地方。</p><ul><li>如果您打算使用第三方 Recovery，只需按照<a href="#%E7%AC%AC%E4%B8%89%E6%96%B9-Recovery">第三方 Recovery</a> 的说明进行操作即可。</li><li>如果您不打算使用第三方 Recovery，则必须从您的固件中提取 <code>RAMDISK.img</code>。 按照上面的<a href="#%E4%BF%AE%E8%A1%A5%E6%98%A0%E5%83%8F">修补映像</a>说明进行操作，但使用 <code>RAMDISK.img</code> 文件而不是 boot 映像！</li><li>要将修补后的映像刷入您的设备，请使用 fastboot 命令：<br><code>fastboot flash ramdisk /path/to/magisk_patched.img</code> <br> 请注意，您正在刷入 <code>ramdisk</code>，而不是 <code>boot</code>！</li></ul><h3 id="emui-9-或更高版本" tabindex="-1">EMUI 9 或更高版本 <a class="header-anchor" href="#emui-9-或更高版本" aria-hidden="true">#</a></h3><p>对于 EMUI 9+ 设备，<code>ramdisk</code> 分区不再存在。 作为解决方法，Magisk 将安装到 <code>recovery_ramdisk</code> 分区。 <strong>在按照以下说明操作之前，请先阅读 <a href="#recovery-%E4%B8%AD%E7%9A%84-magisk">Recovery 中的 Magisk</a> ！</strong></p><p><em>注意：正如在 荣耀 View 10 上测试的那样，华为的内核似乎无法在早期启动时捕获按键事件，因此长按音量增大不会在我的设备上<strong>不</strong>启动到 Recovery。 您的体验可能会有所不同。</em></p><ul><li>如果您打算使用第三方 Recovery，只需按照<a href="#%E7%AC%AC%E4%B8%89%E6%96%B9-Recovery">第三方 Recovery</a> 的说明进行操作即可。 <br><strong>警告：Magisk 将覆盖第三方 Recovery。</strong></li><li>如果您不打算使用第三方 Recovery，则必须从固件中提取 <code>RECOVERY_RAMDIS.img</code> （这不是拼写错误），而不是 <code>recovery.img</code>（部分设备依旧需要修补 <code>recovery.img</code> ）。 按照上面的引导映像修补说明进行操作，但使用 <code>RECOVERY_RAMDIS.img</code> 文件而不是 boot 映像！</li><li>要将修补后的映像刷入您的设备，请使用 fastboot 命令：<br><code>fastboot flash recovery_ramdisk /path/to/magisk_patched.img</code> <br> 请注意，您正在刷入 <code>recovery_ramdisk</code>，而不是 <code>boot</code>！</li></ul><h2 id="第三方-recovery" tabindex="-1">第三方 Recovery <a class="header-anchor" href="#第三方-recovery" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">警告</p><p>这种安装方法已被弃用，维护工作量很小。</p></div><p>仅当您的设备启动 ramdisk 时，才能使用第三方 Recovery 进行安装。不建议在新的设备上通过第三方 Recovery 安装 Magisk。如果您遇到任何问题，请使用正确的<a href="#%E4%BF%AE%E8%A1%A5%E6%98%A0%E5%83%8F">修补映像</a>方法。</p><ul><li>下载 Magisk APK</li><li>将 <code>.apk</code> 文件扩展名重命名为 <code>.zip</code> ，例如：<code>Magisk-v25.2.apk</code> → <code>Magisk-v25.2.zip</code> 。如果重命名文件扩展名时遇到问题（如 Windows），请使用 Android 上的文件管理器或 TWRP 中的文件管理功能重命名文件。</li><li>像其他普通的刷机包一样刷 zip。</li><li>重新启动并检查是否已安装 Magisk 应用程序。如果未自动安装，请手动安装 APK。</li></ul><div class="warning custom-block"><p class="custom-block-title">警告</p><p>模块的 <code>sepolicy.rule</code> 文可能存储在 <code>cache</code> 分区中。请不要擦除 <code>CACHE</code> 分区。</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>您也可以提供 <code>adb sideload</code> 刷入 Magisk。这对于不能正常解密 data 分区且无外置存储设备（SD 卡，U 盘等）的设备特别友好。</p></div><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-hidden="true">#</a></h2><ul><li><a href="https://topjohnwu.github.io/Magisk/install.html" target="_blank" rel="noreferrer">Magisk Installation</a>（官方）</li><li><a href="https://cnoim.coding.net/s/41961bff-16f8-4370-9e0c-af8390a6ec89" target="_blank" rel="noreferrer">Magisk 安装指南</a></li></ul>`,70),i=[t];function n(c,d,p,g,h,m){return a(),o("div",null,i)}const y=e(r,[["render",n]]);export{b as __pageData,y as default};
