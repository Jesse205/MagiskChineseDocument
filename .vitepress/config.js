export default {
    lang: 'zh-CN',
    title: 'Magisk 中文文档',
    description: 'Magisk 中文文档，由 Jesse205 手动机翻。',
    base: '/MagiskChineseDocument/',
    themeConfig: {
        logo: '/logo.svg',
        outlineTitle: '本页内容',
        lastUpdatedText: '更新日期',
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Jesse205/MagiskChineseDocument' },
            { icon: 'gitee', link: 'https://gitee.com/Jesse205/magisk-chinese-document' },
        ],
        nav: [
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
        }
    }
}