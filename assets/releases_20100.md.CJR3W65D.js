import{_ as e,c as a,o as t,a4 as i}from"./chunks/framework.CasJ7utE.js";const m=JSON.parse('{"title":"2019.11.2 Magisk v20.1","description":"","frontmatter":{},"headers":[],"relativePath":"releases/20100.md","filePath":"releases/20100.md","lastUpdated":1694958663000}'),n={name:"releases/20100.md"},s=i('<h1 id="_2019-11-2-magisk-v20-1" tabindex="-1">2019.11.2 Magisk v20.1 <a class="header-anchor" href="#_2019-11-2-magisk-v20-1" aria-label="Permalink to &quot;2019.11.2 Magisk v20.1&quot;">​</a></h1><p>Lots of bug fixes from v20.0, and some cool new features!</p><h2 id="updated-magisk-manager-hiding" tabindex="-1">Updated Magisk Manager Hiding <a class="header-anchor" href="#updated-magisk-manager-hiding" aria-label="Permalink to &quot;Updated Magisk Manager Hiding&quot;">​</a></h2><p>Starting with Magisk v20.1 paired with Magisk Manager v7.4.0, a new hiding mode is introduced for Android 9.0+. On supported devices, Magisk Manager will download and customize a heavily obfuscated stub APK and use it as a replacement. The stub app will then download the full app into its private internal data, then dynamically load and run the actual full Magisk Manager.</p><p>Note, not all Android 9.0+ devices will be able to use this feature. To use an obfuscated stub as Magisk Manager, the Magisk daemon will have to rely on a special way to communicate with the app, and some OEMs (most likely Chinese manufacturers) block certain broadcasts, breaking the communication channel.</p><p>Magisk Manager will verify compatibility before it uses stubs to hide itself on Android 9.0+. <strong>The verification relies on Magisk v20.1+, which means you have to fully upgrade and reboot in order to opt in this feature.</strong> If you are already running a hidden Magisk Manager, <strong>restore and upgrade Magisk Manager, upgrade Magisk and reboot, then re-hide the app</strong>.</p><p>For those incompatible with the hiding-with-stub feature, there are also a few updates that everyone, regardless whether using stubs or not, can enjoy:</p><ul><li>You can now customize the app name of the repackaged Magisk Manager</li><li>Magisk Manager will generate new keys to sign the repackaged APK to prevent signature detection</li></ul><p><strong>完整更新日志： <a href="/MagiskChineseDocument/changes.html">这里</a></strong></p>',9),o=[s];function r(d,l,g,h,c,p){return t(),a("div",null,o)}const k=e(n,[["render",r]]);export{m as __pageData,k as default};
