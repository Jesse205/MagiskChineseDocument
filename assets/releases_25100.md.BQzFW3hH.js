import{_ as e,c as a,o as t,a4 as i}from"./chunks/framework.CasJ7utE.js";const g=JSON.parse('{"title":"2022.6.19 Magisk v25.1","description":"","frontmatter":{},"headers":[],"relativePath":"releases/25100.md","filePath":"releases/25100.md","lastUpdated":1694958663000}'),o={name:"releases/25100.md"},s=i('<h1 id="_2022-6-19-magisk-v25-1" tabindex="-1">2022.6.19 Magisk v25.1 <a class="header-anchor" href="#_2022-6-19-magisk-v25-1" aria-label="Permalink to &quot;2022.6.19 Magisk v25.1&quot;">​</a></h1><blockquote><p>v25.1 fixes some minor bugs over v25.0. The following are the same as v25.0 release notes.</p></blockquote><p>Another major release! A lot of the changes aren&#39;t visible at the surface, but v25 is actually a really substantial upgrade!</p><h2 id="magiskinit-rewrite" tabindex="-1">MagiskInit Rewrite <a class="header-anchor" href="#magiskinit-rewrite" aria-label="Permalink to &quot;MagiskInit Rewrite&quot;">​</a></h2><p>A significant portion of <code>magiskinit</code> (the critical software that runs before your device boots up) is completely rewritten from scratch. Ever since Android introduced <a href="https://android-developers.googleblog.com/2017/05/here-comes-treble-modular-base-for.html" target="_blank" rel="noreferrer">Project Treble</a> in Android 8.0, Magisk has been constantly fighting against the increasingly complex partitioning and early mount setups of all kinds of devices, sometimes with weird OEM specific implementations. It got to a point that <code>magiskinit</code> had become so complicated that few people (including myself!) were aware of every detail, and maintaining this piece of software like this was clearly not sustainable. After many months of planning (yes, this whole re-architecture has been in my head for a long time) and some help from external contributors, a whole new <code>sepolicy</code> injection mechanism is introduced into Magisk, solving the &quot;SELinux Problem&quot; once and for all.</p><p>Since this is a full paradigm shift on how Magisk hot-patch the device at boot, several behaviors that many developers implicitly relied on might not exist. For example, Magisk no longer patches fstabs in most scenarios, which means AVB will remain intact; some custom kernels rely on AVB being stripped out for them by Magisk.</p><h2 id="magisksu-security-enhancements" tabindex="-1">MagiskSU Security Enhancements <a class="header-anchor" href="#magisksu-security-enhancements" aria-label="Permalink to &quot;MagiskSU Security Enhancements&quot;">​</a></h2><p>The superuser functionality of Magisk has not seen much changes ever since its introduction. v25 focuses on making root permission management more accurate and secure:</p><ul><li>Add a whole new package tracking system to ensure malicious UID reuse attack cannot be performed</li><li>Properly support and implement the UX in the Magisk app for packages using <code>sharedUserId</code></li><li>Enforce root manager APK signature verification to combat the rampant unofficial Magisk app &quot;mods&quot;</li></ul><p>Many might not realize, but using a trusted, unmodified Magisk app is really important. Magisk&#39;s root daemon treats the Magisk app differently and gives it blanket root access without any restrictions. A modded Magisk app can potentially backdoor your device.</p><p>And in case some of you are about to put on your tin foil hats, this is not designed to &quot;vendor lock-in&quot;; the goal is to make sure your root management app comes from the same developer of the underlying root implementation. Magisk&#39;s build system allows custom distributors to use its own signing keys, and in addition, I am also providing official debug builds which skips any signature verification for development.</p><p><strong>完整更新日志： <a href="/MagiskChineseDocument/changes.html">这里</a></strong></p>',12),n=[s];function r(l,c,m,d,h,p){return t(),a("div",null,n)}const f=e(o,[["render",r]]);export{g as __pageData,f as default};