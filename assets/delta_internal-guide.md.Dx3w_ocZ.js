import{_ as a,c as s,o as i,a4 as e}from"./chunks/framework.CasJ7utE.js";const u=JSON.parse('{"title":"Magisk Delta 内部文档","description":"","frontmatter":{},"headers":[],"relativePath":"delta/internal-guide.md","filePath":"delta/internal-guide.md","lastUpdated":1694898637000}'),t={name:"delta/internal-guide.md"},l=e(`<h1 id="magisk-delta-内部文档" tabindex="-1">Magisk Delta 内部文档 <a class="header-anchor" href="#magisk-delta-内部文档" aria-label="Permalink to &quot;Magisk Delta 内部文档&quot;">​</a></h1><p>本文档介绍了适用于安卓设备的无系统 root 解决方案 Magisk Delta 的部分高级功能。Magisk Delta 允许你在不改变原始启动映像的情况下修改设备，并提供一个统一的界面来管理模块、root 访问权限等。</p><h2 id="早期挂载" tabindex="-1">早期挂载 <a class="header-anchor" href="#早期挂载" aria-label="Permalink to &quot;早期挂载&quot;">​</a></h2><p>有些文件需要在启动过程中尽早挂载，即在执行“启动”进程之前。Magisk Delta 提供了一种在“预启动”阶段使用 <code>early-mount.d</code> 目录挂载文件的方法。</p><ul><li>要检查 Magisk Delta 是否支持 <code>early-mount.d/v2</code>，请使用此代码：</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">EARLYMOUNTV2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">magisk</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --path</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)/.magisk/early-mount.d&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /proc/mounts</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -q</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;^early-mount.d/v2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    EARLYMOUNTV2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fi</span></span></code></pre></div><ul><li>要查找 <code>early-mount.d</code> 目录（Magisk v26+），请使用此代码：</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">magisk</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --path</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/.magisk/early-mount.d</span></span></code></pre></div><h3 id="常规挂载" tabindex="-1">常规挂载 <a class="header-anchor" href="#常规挂载" aria-label="Permalink to &quot;常规挂载&quot;">​</a></h3><ul><li>由于在 Magisk Delta v26.0+ 中使用了新的 sepolicy 规则实施 <code>early-mount.d/v2</code>，一般的早期挂载分区将挂载到 <code>$MAGISKTMP/.magisk/early-mount.d</code>。早期挂载分区与预启动分区相同，可以是其中之一： <code>data</code> 、<code>cache</code> 、<code>metadata</code> 、<code>cust</code> 、<code>persist</code>等。Magisk 在修补引导映像时会对预启动分区进行硬编码。</li></ul><blockquote><p>(*) 使用 <code>persist</code> 或 <code>metadata</code> 进行早期挂载时要小心，因为这些分区的大小非常有限。填满它们可能会导致设备无法启动。</p></blockquote><ul><li>您可以将文件放到 <code>early-mount.d</code> 目录下的相应位置。例如，如果您想替换 <code>/vendor/etc/vintf/manifest.xml</code>，请将您的 <code>manifest.xml</code> 复制到 <code>$MAGISKTMP/.magisk/early-mount.d/system/vendor/etc/vintf/manifest.xml</code>。Magisk Delta 将在下次重启时挂载您的文件。其他不在 <code>early-mount.d/system</code> 中的文件将被忽略。</li></ul><h3 id="模块挂载" tabindex="-1">模块挂载 <a class="header-anchor" href="#模块挂载" aria-label="Permalink to &quot;模块挂载&quot;">​</a></h3><ul><li>自 Magisk Delta v26.0+ 使用 <code>early-mount.d/v2</code> 以来，您也可以将早期挂载文件放在 <code>/data/adb/modules/&lt;module_id&gt;/early-mount</code> 中。</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>早期启动挂载只支持简单挂载，即可以替换文件，但不能添加新文件、文件夹或替换文件夹。</p></div><h2 id="init-rc-注入" tabindex="-1">init.rc 注入 <a class="header-anchor" href="#init-rc-注入" aria-label="Permalink to &quot;init.rc 注入&quot;">​</a></h2><h3 id="常规注入" tabindex="-1">常规注入 <a class="header-anchor" href="#常规注入" aria-label="Permalink to &quot;常规注入&quot;">​</a></h3><p>如果您想在不重新打包启动映像的情况下将自定义 <code>*.rc</code> 脚本注入设备，Magisk Delta 提供了一种无系统地实现这一目标的方法。您可以使用 <code>initrc.d</code> 目录来存储自定义脚本，Magisk Delta 会在每次启动时将它们注入到 <code>init.rc</code> 中。</p><ul><li>自定义 <code>*.rc</code> 脚本的位置是 <code>$PRENITDIR/early-mount.d/initrc.d</code>。Magisk Delta 会在每次启动时将此文件夹中的所有脚本注入到 <code>init.rc</code> 中。</li><li>您可以使用 <code>\${MAGISKTMP}</code> 来引用 Magisk 的 tmpfs 目录。当 magiskinit 将 <code>\${MAGISKTMP}</code> 注入到 <code>init.rc</code> 时，您的 <code>*.rc</code> 脚本中出现的 <code>\${MAGISKTMP}</code> 模式将被替换为 Magisk 的 tmpfs 目录。</li><li>启动时，Magisk 的镜像不可用，因此需要使用 <code>\${MAGISKTMP}/.magisk/early-mount.d</code> 模式来访问 <code>early-mount.d</code> 目录的副本。</li></ul><p>下面是一个自定义脚本的示例，名为 <code>custom.rc</code>，可以与 <code>initrc.d</code> 一起使用：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用 \${MAGISKTMP} 引用 Magisk 的 tmpfs 目录</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> early-init</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    setprop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sys.example.foo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bar</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    insmod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${MAGISKTMP}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/.magisk/early-mount.d/libfoo.ko</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myservice</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myservice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${MAGISKTMP}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/.magisk/early-mount.d/myscript.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    oneshot</span></span></code></pre></div><h3 id="模块注入" tabindex="-1">模块注入 <a class="header-anchor" href="#模块注入" aria-label="Permalink to &quot;模块注入&quot;">​</a></h3><p>自 Magisk Delta v26.0+ 使用 <code>early-mount.d/v2</code> 后，您也可以将 initrc.d 文件放到 <code>/data/adb/modules/&lt;module_id&gt;/early-mount/initrc.d</code> 中。</p><h2 id="删除文件和文件夹" tabindex="-1">删除文件和文件夹 <a class="header-anchor" href="#删除文件和文件夹" aria-label="Permalink to &quot;删除文件和文件夹&quot;">​</a></h2><p>使用 Magisk 模块是修改系统分区的简便方法，无需对系统分区进行实际修改，而且修改非常容易。Magisk 模块可以替换或添加任何文件或文件夹到系统中。但仍不允许使用 Magisk 模块删除文件。</p><p>在 Magisk 文档中：</p><blockquote><p>实际删除文件很复杂（有可能，但不值得这么做）。用一个假文件替换它就足够了</p><p>要真正删除文件夹非常复杂（有可能，但不值得费力）。用一个空文件夹替换就足够了。将文件夹添加到模块模板中 &quot;config.sh&quot; 的替换列表中，它将用一个空文件夹替换该文件夹</p></blockquote><p>在某些情况下，仅将文件或文件夹替换为空文件或文件夹是不够的，还可能导致问题，因为某些修改需要文件消失才能生效。因此，Magisk Delta 为模块添加了删除支持：在模块目录的相应位置创建指向 <code>/xxxxx</code> 的损坏的符号链接</p><p>以创建符号链接 <code>/data/adb/modules/mymodule_id/system/vendor/etc/thermal-engine-normal.conf</code> 为例，目标 <code>/vendor/etc/thermal-engine-normal.conf</code> 将被忽略并消失。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/xxxxx&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /data/adb/modules/mymodule_id/system/vendor/etc/thermal-engine-normal.conf</span></span></code></pre></div><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h2><ul><li><a href="https://huskydg.github.io/magisk-files/docs/internal-guide.html" target="_blank" rel="noreferrer">Magisk Delta Internal Documentation</a>（官方）</li></ul>`,32),n=[l];function d(o,h,p,c,k,r){return i(),s("div",null,n)}const m=a(t,[["render",d]]);export{u as __pageData,m as default};
