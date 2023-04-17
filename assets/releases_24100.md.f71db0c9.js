import{_ as e,o as a,c as o,V as t}from"./chunks/framework.a9120281.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"releases/24100.md","lastUpdated":1674222670000}'),i={name:"releases/24100.md"},n=t('<h2 id="_2022-1-28-magisk-v24-1" tabindex="-1">2022.1.28 Magisk v24.1 <a class="header-anchor" href="#_2022-1-28-magisk-v24-1" aria-label="Permalink to &quot;2022.1.28 Magisk v24.1&quot;">​</a></h2><blockquote><p>For those coming from v24.0, v24.1 only has some minor app improvements. The following are copied from v24.0 release notes.</p></blockquote><p>It has been a while since the last public release, long time no see! A personal update for those unaware: I am now working at Google on the Android Platform Security team. Without further ado, let&#39;s jump right into it!</p><h3 id="magiskhide-removal" tabindex="-1">MagiskHide Removal <a class="header-anchor" href="#magiskhide-removal" aria-label="Permalink to &quot;MagiskHide Removal&quot;">​</a></h3><p>I have lost interest in fighting this battle for quite a while; plus, the existing MagiskHide implementation is flawed in so many ways. Decoupling Magisk from root hiding is, in my opinion, beneficial to the community. Ever since my announcement on Twitter months ago, highly effective &quot;root hiding&quot; modules (much <strong>MUCH</strong> better than MagiskHide) has been flourishing, which again shows that people are way more capable than I am on this subject. So why not give those determined their time to shine, and let me focus on improving Magisk instead of drowning in the everlasting cat-and-mouse game 😉.</p><h3 id="sunsetting-magisk-modules-repo" tabindex="-1">Sunsetting Magisk-Modules-Repo <a class="header-anchor" href="#sunsetting-magisk-modules-repo" aria-label="Permalink to &quot;Sunsetting Magisk-Modules-Repo&quot;">​</a></h3><p>Due to lack of time and maintenance, the centralized Magisk-Modules-Repo was frozen, and the functionality to download modules from the repo is removed in v24.0. As a supplement, module developers can now specify an <code>updateJson</code> URL in their modules. The Magisk app will use that to check, download, and install module updates.</p><h3 id="introducing-zygisk" tabindex="-1">Introducing Zygisk <a class="header-anchor" href="#introducing-zygisk" aria-label="Permalink to &quot;Introducing Zygisk&quot;">​</a></h3><p>Zygisk is <strong>Magisk in Zygote</strong>, the next big thing for Magisk! When this feature is enabled, a part of Magisk will run in the <code>Zygote</code> daemon process, allowing module developers to run code directly in every Android apps&#39; processes. If you&#39;ve heard of <a href="https://github.com/RikkaApps/Riru" target="_blank" rel="noreferrer">Riru</a>, then Zygisk is inspired by that project and is functionally similar, though the implementation is quite different internally. I cannot wait to see what module developers can achieve using Zygisk!</p><h3 id="documentation" tabindex="-1">Documentation <a class="header-anchor" href="#documentation" aria-label="Permalink to &quot;Documentation&quot;">​</a></h3><p>For developers, details about <code>updateJson</code> and building Zygisk modules can all be found in the updated <a href="https://topjohnwu.github.io/Magisk/guides.html#magisk-modules" target="_blank" rel="noreferrer">documentation</a>.</p><h3 id="full-changelog-here" tabindex="-1">Full Changelog: <a href="/MagiskChineseDocument/changes.html">here</a> <a class="header-anchor" href="#full-changelog-here" aria-label="Permalink to &quot;Full Changelog: [here](/changes.md)&quot;">​</a></h3>',12),s=[n];function r(l,h,d,u,c,g){return a(),o("div",null,s)}const f=e(i,[["render",r]]);export{p as __pageData,f as default};
