import{_ as e,c as i,o as s,a4 as a}from"./chunks/framework.CasJ7utE.js";const m=JSON.parse('{"title":"2021.4.9 Magisk v22.1","description":"","frontmatter":{},"headers":[],"relativePath":"releases/22100.md","filePath":"releases/22100.md","lastUpdated":1694958663000}'),r={name:"releases/22100.md"},t=a('<h1 id="_2021-4-9-magisk-v22-1" tabindex="-1">2021.4.9 Magisk v22.1 <a class="header-anchor" href="#_2021-4-9-magisk-v22-1" aria-label="Permalink to &quot;2021.4.9 Magisk v22.1&quot;">​</a></h1><p>This release is focused on fixing regressions and bugs. Check the <a href="https://topjohnwu.github.io/Magisk/releases/22000.html" target="_blank" rel="noreferrer">v22.0 release notes</a> if coming from older releases.</p><p>Note: Magisk v22 is the last major version to support Jellybean and Kitkat. Magisk v23 will only support Android 5.0 and higher.</p><h2 id="bug-fixes" tabindex="-1">Bug Fixes <a class="header-anchor" href="#bug-fixes" aria-label="Permalink to &quot;Bug Fixes&quot;">​</a></h2><ul><li>[App] Prevent multiple installation sessions running in parallel</li><li>[App] Prevent OutOfMemory crashes when checking boot signature on PXA boot images</li><li>[General] Proper cgroup migration implementation</li><li>[General] Rewrite log writer from scratch, should resolve any crashes and deadlocks</li><li>[General] Many scripts updates fixing regressions</li><li>[MagiskHide] Prevent possible deadlock when signal arrives</li><li>[MagiskHide] Partial match process names if necessary</li><li>[MagiskBoot] Preserve and patch AVB 2.0 structures/headers in boot images</li><li>[MagiskBoot] Properly strip out data encryption flags</li><li>[MagiskBoot] Prevent possible integer overflow</li><li>[MagiskInit] Fix <code>sepolicy.rule</code> mounting strategy</li><li>[resetprop] Always delete existing <code>ro.</code> props before updating. This will fix bootloops that could be caused by modifying device fingerprint properties.</li></ul><p><strong>完整更新日志： <a href="/MagiskChineseDocument/changes.html">这里</a></strong></p>',6),o=[t];function l(n,c,p,d,g,h){return s(),i("div",null,o)}const _=e(r,[["render",l]]);export{m as __pageData,_ as default};
