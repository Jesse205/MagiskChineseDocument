import { DefaultTheme, defineConfig } from 'vitepress'
import fs from 'fs'

interface ThemeConfig extends DefaultTheme.Config {
  [key: string]: any
}

// 原始文档日期
const originDocumentDate = {
  magisk: '2023-12-22',
  delta: '2023-08-15'
}

const MATCH_RELEASE_REG = /- \[(v[\d.]*)\]\((\d*).md\)/g

const base = '/MagiskChineseDocument/'

const releaseItems: (DefaultTheme.NavItemChildren | DefaultTheme.NavItemWithLink)[] = []

const NORMAL_LINKS: DefaultTheme.NavItem[] | DefaultTheme.SidebarItem[] = [
  {
    text: '面向普通用户',
    // collapsed: false,
    items: [
      { text: '安装说明', link: '/install.html' },
      { text: '常见问题', link: '/faq.html' },
      {
        text: '发布日志',
        link: '/releases/',
        items: releaseItems,
        collapsed: true
      },
      { text: 'Magisk 更新日志', link: '/changes.html' }
    ]
  }
]
const DEVELOPER_LINKS: DefaultTheme.NavItem[] | DefaultTheme.SidebarItem[] = [
  {
    text: '面向开发人员',
    // collapsed: false,
    items: [
      { text: '构建和开发 Magisk', link: '/build.html' },
      { text: '开发者指南', link: '/guides.html' },
      { text: 'Magisk 工具', link: '/tools.html' },
      { text: '内部细节', link: '/details.html' },
      { text: 'Android 引导诡计', link: '/boot.html' }
    ]
  }
]

const DELTA_LINKS: DefaultTheme.NavItem[] | DefaultTheme.SidebarItem[] = [
  {
    text: 'Magisk Delta',
    // collapsed: false,
    activeMatch: '/delta/',
    items: [
      { text: '常见问题', link: '/delta/faq.html' },
      { text: '内部文档', link: '/delta/internal-guide.html' }
    ]
  }
]

const sidebar: DefaultTheme.Sidebar = {
  '/delta/': DELTA_LINKS
}

let allItems: DefaultTheme.NavItem[] | DefaultTheme.SidebarItem[] = [...NORMAL_LINKS, ...DEVELOPER_LINKS]
// 生成侧边栏
for (let group of allItems) {
  if (group.items) {
    for (let item of group.items) {
      if (item.link) {
        sidebar[item.link.replace('.html', '')] = [group]
      }
    }
  }
}

// 匹配版本号
const releaseFileContent = fs.readFileSync('./releases/index.md', 'utf8')
for (const iterator of releaseFileContent.matchAll(MATCH_RELEASE_REG)) {
  const verName = iterator[1]
  const verCode = iterator[2]
  releaseItems.push({
    text: verName,
    link: `/releases/${verCode}.html`
  })
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Magisk 中文文档',
  description: 'Magisk 中文文档，由 Jesse205 手动机翻。',
  base,
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: 'any' }],
    ['link', { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` }]
  ],
  themeConfig: {
    originDocumentDate: originDocumentDate,
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
    outline: [2, 3],
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
      }
    ],
    nav: [
      ...NORMAL_LINKS,
      ...DEVELOPER_LINKS,
      ...DELTA_LINKS,
      { text: '官方文档', link: 'https://topjohnwu.github.io/Magisk/' }
    ] as DefaultTheme.NavItem[],
    sidebar,
    footer: {
      message: `原始 Magisk 文档版本: ${originDocumentDate.magisk}<br/>
            原始 Magisk Delta 文档版本: ${originDocumentDate.delta}<br/>
            在 GPL-3.0 许可下发布`
    },
    editLink: {
      pattern: 'https://gitee.com/Jesse205/magisk-chinese-document/edit/master/:path',
      text: '在 Gitee 上编辑此页面'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索'
          },
          modal: {
            displayDetails: '显示详情信息',
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
    },
    externalLinkIcon: true
  } as ThemeConfig
})
