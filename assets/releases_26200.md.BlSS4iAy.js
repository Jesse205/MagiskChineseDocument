import{_ as i,c as e,o,a4 as t}from"./chunks/framework.CasJ7utE.js";const u=JSON.parse('{"title":"2023.8.27 Magisk v26.2","description":"","frontmatter":{},"headers":[],"relativePath":"releases/26200.md","filePath":"releases/26200.md","lastUpdated":1694958136000}'),l={name:"releases/26200.md"},a=t('<h1 id="_2023-8-27-magisk-v26-2" tabindex="-1">2023.8.27 Magisk v26.2 <a class="header-anchor" href="#_2023-8-27-magisk-v26-2" aria-label="Permalink to &quot;2023.8.27 Magisk v26.2&quot;">​</a></h1><ul><li>[MagiskBoot] 支持从<code>payload.bin</code>中提取启动映像</li><li>[MagiskBoot] 支持包含字符文件的 cpio 文件</li><li>[MagiskBoot] 支持列出 cpio 内容</li><li>[MagiskBoot] 直接处理 AVB 1.0 签名和验证，无需通过 Java 实现</li><li>[守护进程] 使守护程序套接字成为 MAGISKTMP 中的固定路径</li><li>[resetprop] 支持打印属性上下文</li><li>[resetprop] 仅支持从存储中打印持久属性</li><li>[resetprop] 正确支持设置持久属性绕过 property_service</li><li>[MagiskSU] 支持 <code>-g</code> 和 <code>-G</code> 选项</li><li>[MagiskSU] 支持使用 <code>-t</code> 将挂载命名空间切换到 PID</li><li>[MagiskPolicy] 修复修补扩展权限</li><li>[MagiskPolicy] 支持更多语法以获得扩展权限</li><li>[MagiskPolicy] 支持打印加载的 sepolicy 规则</li><li>[应用程序] 支持从 ROM 压缩包修补启动映像</li><li>[应用程序] 使用 <code>init_boot.img</code> 修补三星固件时正确保留 <code>boot.img</code></li></ul><details class="details custom-block"><summary>英文原版</summary><ul><li>[MagiskBoot] Support extracting boot image from <code>payload.bin</code></li><li>[MagiskBoot] Support cpio files containing character files</li><li>[MagiskBoot] Support listing cpio content</li><li>[MagiskBoot] Directly handle AVB 1.0 signing and verification without going through Java implementation</li><li>[Daemon] Make daemon socket a fixed path in MAGISKTMP</li><li>[resetprop] Support printing property context</li><li>[resetprop] Support only printing persistent properties from storage</li><li>[resetprop] Properly support setting persistent properties bypassing property_service</li><li>[MagiskSU] Support <code>-g</code> and <code>-G</code> options</li><li>[MagiskSU] Support switching mount namespace to PID with <code>-t</code></li><li>[MagiskPolicy] Fix patching extended permissions</li><li>[MagiskPolicy] Support more syntax for extended permissions</li><li>[MagiskPolicy] Support printing out the loaded sepolicy rules</li><li>[App] Support patching boot image from ROM zips</li><li>[App] Properly preserve <code>boot.img</code> when patching Samsung firmware with <code>init_boot.img</code></li></ul></details><p><strong>完整更新日志： <a href="/MagiskChineseDocument/changes.html">这里</a></strong></p>',4),s=[a];function r(p,c,n,d,g,m){return o(),e("div",null,s)}const k=i(l,[["render",r]]);export{u as __pageData,k as default};
