import{_ as e,c as a,o as t,a as i}from"./app.2dc519f0.js";const k=JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[{"level":3,"title":"Q: 我安装了一个模块，然后启动时卡在了开机动画。求助！","slug":"q-我安装了一个模块-然后启动时卡在了开机动画。求助","link":"#q-我安装了一个模块-然后启动时卡在了开机动画。求助","children":[]},{"level":3,"title":"Q: 为什么 XXX应用会检测到 Root？","slug":"q-为什么-xxx应用会检测到-root","link":"#q-为什么-xxx应用会检测到-root","children":[]},{"level":3,"title":"Q: 在我隐藏 Magisk App 后，应用图标已损坏。","slug":"q-在我隐藏-magisk-app-后-应用图标已损坏。","link":"#q-在我隐藏-magisk-app-后-应用图标已损坏。","children":[]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"relativePath":"faq.md","lastUpdated":1673025205000}'),r={name:"faq.md"},s=i('<h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-hidden="true">#</a></h1><h3 id="q-我安装了一个模块-然后启动时卡在了开机动画。求助" tabindex="-1">Q: 我安装了一个模块，然后启动时卡在了开机动画。求助！ <a class="header-anchor" href="#q-我安装了一个模块-然后启动时卡在了开机动画。求助" aria-hidden="true">#</a></h3><p>如果在开发人员选项中启用了USB调试，请将手机连接到 PC。如果检测到设备（通过 <code>adb devices</code> 检查），请进入 ADB shell 并运行命令 <code>magisk --remove-modules</code>。这将删除所有模块并自动重新启动设备。</p><p>如果您没有启用 USB 调试，请重新启动到安全模式。大多数现代 Android 设备都支持在启动时按特殊键组合键以进入安全模式作为紧急选项。Magisk 将检测到安全模式被激活，所有模块将被禁用。然后重启回到正常模式（模块禁用状态持续），并通过 Magisk App 管理模块。</p><h3 id="q-为什么-xxx应用会检测到-root" tabindex="-1">Q: 为什么 XXX应用会检测到 Root？ <a class="header-anchor" href="#q-为什么-xxx应用会检测到-root" aria-hidden="true">#</a></h3><p>Magisk 不再处理 Root 隐藏。有大量 Magisk/Zygisk 模块专门提供这些功能，请在网络上查找它们。😉（您可以在酷安或者哔哩哔哩中搜索）</p><p>比较流行的模块是 <a href="https://github.com/LSPosed/LSPosed.github.io/releases/latest" target="_blank" rel="noreferrer">Shamiko</a> 。</p><h3 id="q-在我隐藏-magisk-app-后-应用图标已损坏。" tabindex="-1">Q: 在我隐藏 Magisk App 后，应用图标已损坏。 <a class="header-anchor" href="#q-在我隐藏-magisk-app-后-应用图标已损坏。" aria-hidden="true">#</a></h3><p>当隐藏 Magisk App 时，它将安装一个“存根”APK，其中没有任何内容。这个存根应用程序的唯一功能是将完整的 Magisk app APK 下载到其内部存储并动态加载。由于APK实际上是 <em>empty</em>，因此它不包含 APP 图标的图像资源。</p><p>当您打开隐藏的 Magisk App 时，它将为您提供在主屏幕中创建快捷方式的选项（其中包含正确的应用名称和图标），以方便您使用。您还可以手动要求应用在应用设置中创建图标。</p><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-hidden="true">#</a></h2><p><a href="https://topjohnwu.github.io/Magisk/faq.html" target="_blank" rel="noreferrer">Magisk Frequently Asked Questions</a></p>',12),o=[s];function d(h,p,l,n,c,_){return t(),a("div",null,o)}const m=e(r,[["render",d]]);export{k as __pageData,m as default};
