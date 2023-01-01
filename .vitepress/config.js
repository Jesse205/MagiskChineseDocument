export default {
    lang: 'zh-CN',
    title: 'Magisk 中文文档',
    description: 'Magisk 中文文档，由 Jesse205 手动机翻。',
    base: '/MagiskChineseDocument/',
    ignoreDeadLinks: true,
    lastUpdated: true,
    themeConfig: {
        logo: '/logo.svg',
        outlineTitle: '本页内容',
        lastUpdatedText: '更新时间',
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        socialLinks: [
            {
                icon: {
                    svg: '<svg role="img" t="1672577881896" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1932" width="128" height="128"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" p-id="1933"></path></svg>'
                },
                link: 'https://gitee.com/Jesse205/magisk-chinese-document'
            },
            {
                icon: 'github',
                link: 'https://github.com/Jesse205/MagiskChineseDocument'
            },
        ],
        nav: [
            { text: '官方仓库', link: 'https://github.com/topjohnwu/Magisk' },
            { text: '官方文档', link: 'https://topjohnwu.github.io/Magisk/' },
        ],
        sidebar: [
            {
                text: '面向普通用户',
                items: [
                    { text: '安装说明', link: '/install.md' },
                    { text: '常见问题', link: '/faq.md' },
                    { text: '发布日志', link: '/releases/index.md' },
                    { text: 'Magisk  更新日志', link: '/changes.md' },
                ]
            },
            {
                text: '面向开发人员',
                items: [
                    { text: '开发人员指南', link: '/guides.md' },
                    { text: 'Magisk 工具', link: '/tools.md' },
                    { text: '内部细节', link: '/details.md' },
                    { text: 'Android 引导神器', link: '/boot.md' },
                ]
            }
        ],
        footer: {
            message: '原始文档版本：2022年11月16日',
        },
        editLink: {
            pattern: 'https://gitee.com/Jesse205/magisk-chinese-document/edit/master/:path',
            text: '在 Gitee 上编辑此页面',
        }
    }
}