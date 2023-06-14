// 原始文档日期
const ORIGIN_DOCUMENT_DATE = "2023年05月13日"

const NORMAL_LINKS = [
    {
        text: '面向普通用户',
        // collapsed: false,
        items: [
            { text: '安装说明', link: '/install.md' },
            { text: '常见问题', link: '/faq.md' },
            { text: '发布日志', link: '/releases/' },
            { text: 'Magisk  更新日志', link: '/changes.md' },
        ]
    }
]
const DEVELOPER_LINKS = [
    {
        text: '面向开发人员',
        // collapsed: false,
        items: [
            { text: '构建和开发 Magisk', link: '/build.md' },
            { text: '开发者指南', link: '/guides.md' },
            { text: 'Magisk 工具', link: '/tools.md' },
            { text: '内部细节', link: '/details.md' },
            { text: 'Android 引导诡计', link: '/boot.md' },
        ]
    }
]

const SIDE_BAR = {}
let allItems = [...NORMAL_LINKS, ...DEVELOPER_LINKS]
for (let group of allItems) {
    let activeMatch = ''
    for (let item of group.items) {
        SIDE_BAR[item.link] = [group]
        if (activeMatch !== '')
            activeMatch += '|'
        activeMatch += item.link.replace('\.md', '')
    }
    group.activeMatch = activeMatch
    console.log(activeMatch);
}
allItems = null

export default {
    lang: 'zh-CN',
    title: 'Magisk 中文文档',
    description: 'Magisk 中文文档，由 Jesse205 手动机翻。',
    base: '/MagiskChineseDocument/',
    ignoreDeadLinks: true,
    lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/MagiskChineseDocument/favicon.ico', sizes: 'any' }],
        ['link', { rel: 'apple-touch-icon', href: '/MagiskChineseDocument/apple-touch-icon.png' }],
    ],
    themeConfig: {
        originDocumentDate: ORIGIN_DOCUMENT_DATE,
        logo: '/favicon.ico',
        outlineTitle: '本页内容',
        lastUpdatedText: '更新时间',
        darkModeSwitchLabel: '深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
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
            ...NORMAL_LINKS,
            ...DEVELOPER_LINKS,
            { text: '官方文档', link: 'https://topjohnwu.github.io/Magisk/' },

        ],
        sidebar: SIDE_BAR,
        footer: {
            message: `原始文档版本: ${ORIGIN_DOCUMENT_DATE}<br/>在 GPL-3.0 许可下发布`,
        },
        editLink: {
            pattern: 'https://gitee.com/Jesse205/magisk-chinese-document/edit/master/:path',
            text: '在 Gitee 上编辑此页面',
        },
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: "搜索"
                    },
                    modal: {
                        displayDetails: '显示具详情信息',
                        resetButtonTitle: '清空内容',
                        backButtonTitle: '关闭搜索',
                        noResultsText: '未找到',
                        footer: {
                            selectText: '选择',
                            selectKeyAriaLabel: '进入',
                            navigateText: '导航',
                            navigateUpKeyAriaLabel: '向上',
                            navigateDownKeyAriaLabel: '向下',
                            closeText: '关闭',
                            closeKeyAriaLabel: '退出'
                        }
                    }
                }
            }
        }
    }
}