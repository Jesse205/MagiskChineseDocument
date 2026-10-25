---
name: translate-docs
description: 将 Magisk 上游英文文档片段翻译为中文，保持 VitePress 结构、代码、链接与既有术语一致。翻译正文、发布日志或修订上游变更时使用。
---

# 翻译文档

把上游英文文档的**变更片段**翻译为中文，保持页面结构、链接和术语稳定。

## 前置要求

1. 阅读 `AGENTS.md`。
2. 阅读待修改的中文页面，了解既有称谓、术语和排版习惯。
3. 阅读上游对应文件与 diff，只处理发生变化的片段。
4. 如果涉及发布日志，同时阅读 `src/releases/` 中最近几个版本，保持格式一致。

## 基本原则

- 只翻译变更内容，不整篇重译，不顺手改写未变更段落。
- 不增删原文信息。原文没有的警告、建议、步骤不要自行补充。
- 保持章节层级、列表、表格、引用块、图片与代码块的原有结构。
- 中文正文使用全角标点；代码、命令、路径、变量、URL 内保持原样。
- 中英文混排时，保持页面既有空格习惯；新内容默认在中文与英文/数字之间留一个空格。
- 新内容默认使用「您」称呼读者；同一页面已有统一称谓时跟随该页面。

## 必须保持原样的内容

- 行内代码与围栏代码块
- 命令、参数、环境变量、属性名、文件路径、分区名
- 产品名、项目名、协议名、SELinux 类型、Android API 名称
- URL、锚点、图片路径
- HTML 标签与属性
- VitePress 容器：`::: tip`、`::: warning`、`::: details`、`::: code-group`、`::::` 嵌套
- frontmatter、链接定义、参考链接标识

## 术语约定

| 英文 | 约定 |
| --- | --- |
| Magisk / Magisk app | 保留 Magisk；应用本身可写「Magisk app」，首次出现可用「Magisk 应用程序」 |
| MagiskSU | 保留 |
| Zygisk / DenyList / MagiskBoot / MagiskInit / MagiskPolicy / Resetprop | 保留；作为工具名时不翻译 |
| module | 模块 |
| magic mount | magic mount（可加「魔法挂载」解释，但不要替换原词） |
| ramdisk | ramdisk |
| bootloader | bootloader（首次可写「引导加载程序（bootloader）」） |
| boot image | 启动映像 |
| system-as-root / SAR | 保留 system-as-root；SAR 保留缩写 |
| 2SI | 保留；可写「两阶段初始化（2SI）」 |
| GKI | 保留；首次可写「通用内核映像（GKI）」 |
| `init_boot` / `vendor_boot` / `recovery` | 保留代码格式 |
| sepolicy | sepolicy（不要写成「安全策略文件」作为唯一译名） |
| superuser | 超级用户；`su` 保持代码格式 |
| OTA / A/B / A-only | 保留 |
| Samsung / Odin / samloader / Googlebook | 保留专名 |
| fastboot / adb / TWRP | 保留 |

遇到表中没有的术语，优先沿用同页面或相邻文档的既有译法；不要为同一概念引入新译名。

## 标题与链接

- 翻译标题会改变锚点。修改标题后，必须搜索站内对旧锚点的引用并同步更新。
- 站内链接保持相对路径规则；跨页面引用使用对应 `.md` 路径。
- 外部链接不要改写 URL，除非上游明确更换了地址。
- 图片使用既有路径形式，例如 `/images/device_info.png`。

## 发布日志翻译

- 保留条目前缀，例如 `[General]`、`[MagiskSU]`、`[MagiskBoot]`，不翻译成中文标签。
- 条目内容翻译为中文；技术名词按术语表处理。
- 同时更新 `::: details 英文原版` 内的英文条目，确保中英文条目数量和顺序一致。
- 不合并、不删减上游条目；如果上游 release notes 有介绍性段落，可为大版本保留简短中文说明。

## 自检

翻译完成后：

1. 用 diff 检查是否遗漏变更片段，或误改了未变更内容。
2. 检查代码块、容器、HTML、链接是否闭合且结构未变。
3. 搜索旧标题锚点，确认站内链接没有失效。
4. 运行：

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm lint` 已包含 oxlint 与 rumdl；rumdl 会检查 Markdown 结构与站内链接。

**未经用户明确要求，不要 commit 或 push。**
