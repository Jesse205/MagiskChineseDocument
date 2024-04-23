import{_ as e,c as o,o as a,a4 as t}from"./chunks/framework.CasJ7utE.js";const u=JSON.parse('{"title":"2018.12.7 Magisk v18.0","description":"","frontmatter":{},"headers":[],"relativePath":"releases/18000.md","filePath":"releases/18000.md","lastUpdated":1694958663000}'),s={name:"releases/18000.md"},i=t('<h1 id="_2018-12-7-magisk-v18-0" tabindex="-1">2018.12.7 Magisk v18.0 <a class="header-anchor" href="#_2018-12-7-magisk-v18-0" aria-label="Permalink to &quot;2018.12.7 Magisk v18.0&quot;">​</a></h1><p>Here comes a stable release, this time with quite a few major updates!</p><h2 id="magiskhide-improvements" tabindex="-1">MagiskHide Improvements <a class="header-anchor" href="#magiskhide-improvements" aria-label="Permalink to &quot;MagiskHide Improvements&quot;">​</a></h2><p>Starting from v18, the process monitor matches component names instead of process names. Android allow app services to name their process arbitrarily, and many apps starting to use dedicated services to detect root; it used to require adding all of these service process names to the list to hide Magisk effectively. Component names have the format: <code>&lt;package name&gt;/&lt;java class name&gt;</code>, which means we can always know which application spawned a given process.</p><p><strong>TL;DR, ALL processes spawned from the applications on the hide list will be targeted.</strong></p><p>Recently I discovered a <em>very widespread Linux kernel bug</em> affecting tons of Android devices (full write-up: <a href="https://medium.com/@topjohnwu/from-anime-game-to-android-system-security-vulnerability-9b955a182f20" target="_blank" rel="noreferrer">Medium Article</a>). This bug exposes the supposedly protected <code>procfs</code>, which is abused in some apps to detect Magisk with information leaked from other processes. Magisk will patch this bug on all Android 7.0+ devices. Yes, a fully effective MagiskHide requires the enhanced Android Sandbox in modern Android versions.</p><h2 id="path-changes" tabindex="-1">Path Changes <a class="header-anchor" href="#path-changes" aria-label="Permalink to &quot;Path Changes&quot;">​</a></h2><p>The name of the folder <code>/sbin/.core</code> is confusing and will no longer be used; it is replaced with <code>/sbin/.magisk</code>. Another major change is the location to store general boot scripts. As these boot scripts should still run even if <code>magisk.img</code> is not mounted, they are moved out of <code>magisk.img</code>, from <code>&lt;img&gt;/.core/&lt;stage&gt;.d</code> to <code>/data/adb/&lt;stage&gt;.d</code> (stage is either <code>post-fs-data</code> or <code>service</code>). Say goodbye to stupid paths like <code>/sbin/.core/img/.core/post-fs-data.d</code>!</p><p>Quick recap:</p><ul><li>New <code>magisk.img</code> mountpoint: <code>/sbin/.magisk/img</code></li><li>New internal busybox PATH: <code>/sbin/.magisk/busybox</code></li><li>The folder <code>&lt;img&gt;/.core</code> is no longer used in any places. <code>magisk.img</code> is solely used for storing modules, no other functionality depends on it.</li><li><strong>Symlinks are created so all old paths will still work. None of the existing apps/scripts depending on these internal paths should break, but please migrate to the new paths ASAP.</strong></li></ul><h2 id="dropping-legacy-support" tabindex="-1">Dropping Legacy Support <a class="header-anchor" href="#dropping-legacy-support" aria-label="Permalink to &quot;Dropping Legacy Support&quot;">​</a></h2><p><strong>The NEXT Magisk Manager upgrade (not this one) will only support v18+, please upgrade ASAP.</strong> Magisk Manager is always designed to be fully functional across a wide range of Magisk versions. However, to enforce full obfuscation, I will have to drop legacy support eventually.</p><p>This is also a good opportunity to push the whole community forward, all module developers should forget about backward compatibility (e.g. stop supporting the old Magisk paths, please don&#39;t torture yourself...). I expect very few structural changes in the near future, so again, please upgrade ASAP 😃</p><h2 id="modern-c-code-base" tabindex="-1">Modern C++ Code Base <a class="header-anchor" href="#modern-c-code-base" aria-label="Permalink to &quot;Modern C++ Code Base&quot;">​</a></h2><p>Although this has nothing to do with the end user, tons of effort was done to migrate Magisk to a more modern C++ code base instead of the previous good plain old C. This makes the code easier to maintain and allows me to utilized many C++ language features.</p><p><strong>完整更新日志： <a href="/MagiskChineseDocument/changes.html">这里</a></strong></p>',16),r=[i];function n(d,l,c,p,h,g){return a(),o("div",null,r)}const f=e(s,[["render",n]]);export{u as __pageData,f as default};
