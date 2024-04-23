import{_ as e,c as a,o as t,a4 as o}from"./chunks/framework.CasJ7utE.js";const m=JSON.parse('{"title":"2020.3.23 Magisk v20.4","description":"","frontmatter":{},"headers":[],"relativePath":"releases/20400.md","filePath":"releases/20400.md","lastUpdated":1694958663000}'),s={name:"releases/20400.md"},i=o('<h1 id="_2020-3-23-magisk-v20-4" tabindex="-1">2020.3.23 Magisk v20.4 <a class="header-anchor" href="#_2020-3-23-magisk-v20-4" aria-label="Permalink to &quot;2020.3.23 Magisk v20.4&quot;">​</a></h1><h2 id="miscellaneous" tabindex="-1">Miscellaneous <a class="header-anchor" href="#miscellaneous" aria-label="Permalink to &quot;Miscellaneous&quot;">​</a></h2><p>This release is mainly focused on stability and bug squashing. Please be aware that MagiskHide is no longer enabled by default. Since Google has enabled <a href="https://twitter.com/topjohnwu/status/1237656703929180160?s=20" target="_blank" rel="noreferrer">hardware-based key attestation</a> in SafetyNet (<a href="https://twitter.com/topjohnwu/status/1237830555523149824?s=20" target="_blank" rel="noreferrer">FAQ</a>), there is no effective way to pass full CTS SafetyNet anymore (although Google seems to have temporarily <a href="https://twitter.com/topjohnwu/status/1238514375150850048?s=20" target="_blank" rel="noreferrer">reverted the change</a>).</p><p>I decided that the fully redesigned Magisk Manager isn&#39;t fully ready for prime time yet, so this time around no Magisk Manager update is released. The WIP manager will continue to be improved and is available for testing on the canary channel.</p><h2 id="busybox-standalone-mode" tabindex="-1">BusyBox Standalone Mode <a class="header-anchor" href="#busybox-standalone-mode" aria-label="Permalink to &quot;BusyBox Standalone Mode&quot;">​</a></h2><p>Starting with Magisk v20.4, all Magisk related scripts, including boot scripts and module installation scripts, will run on BusyBox&#39;s shell (ash) in <strong>standalone mode</strong>. In BusyBox ash standalone mode, <strong>every single command</strong> will be <strong>forced</strong> to use the one that is in Magisk&#39;s BusyBox (if available). For instance, no matter how you change the environment variable <code>PATH</code>, the <code>rm</code> command will always use the one in BusyBox, not the one in system, external BusyBox, vendor, or included in custom recovery.</p><p>The reason behind this change is that all scripts will be guaranteed to have 100% consistent results no matter how the environment is setup. The internal BusyBox is significantly beefed up with patches from @osm0sis, and also with SELinux features enabled. It shall offer a very complete, reliable, and consistent scripting environment. If in any case you <strong>require</strong> to use a command outside of BusyBox, please call it with the full path (e.g. <code>/system/bin/nslookup</code>)</p><h2 id="magisk-changelog" tabindex="-1">Magisk Changelog <a class="header-anchor" href="#magisk-changelog" aria-label="Permalink to &quot;Magisk Changelog&quot;">​</a></h2><ul><li>[MagiskInit] Fix potential bootloop in A-only 2SI devices</li><li>[MagiskInit] Properly support Tegra partition naming</li><li>[General] Load libsqlite.so dynamically, which removes the need to use wrapper scripts on Android 10+</li><li>[General] Detect API level with a fallback method on some devices</li><li>[General] Workaround possible bug in x86 kernel readlinkat system call</li><li>[BusyBox] Enable SELinux features. Add chcon/runcon etc., and &#39;-Z&#39; option to many applets</li><li>[BusyBox] Introduce standalone mode. More details in release notes</li><li>[MagiskHide] Disable MagiskHide by default</li><li>[MagiskHide] Add more potential detectable system properties</li><li>[MagiskHide] Add workaround for Xiaomi devices bootloop when MagiskHide is enabled on cross region ROMs</li><li>[MagiskBoot] Support patching special Motorolla DTB format</li><li>[MagiskPolicy] Support &#39;genfscon&#39; sepolicy rules</li><li>[Scripts] Support NAND based boot images (character nodes in /dev/block)</li><li>[Scripts] Better addon.d (both v1 and v2) support</li><li>[Scripts] Support Lineage Recovery for Android 10+</li></ul>',9),n=[i];function l(r,d,c,h,u,p){return t(),a("div",null,n)}const b=e(s,[["render",l]]);export{m as __pageData,b as default};
