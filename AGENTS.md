# 智能体指引

## 概览

本仓库是 Magisk 官方文档的中文翻译站，基于 VitePress 构建，并补充了 Magisk Delta、历史存档、发布日志等内容。

维护工作的核心是：**跟随上游文档变更、只翻译变更部分、保持非本次上游范围的内容不被覆盖。**

## 技术栈

- 站点：VitePress 2（当前为 `2.0.0-alpha.21`）、Vue 3、Vite 8
- 包管理：pnpm 12（Node.js 20.19+）
- 类型检查：TypeScript 7，通过 `typescript-native-bridge` 桥接 `vue-tsc`
- 代码检查与格式化：oxlint、oxfmt
- Markdown 检查与格式化：rumdl
- CI：GitHub Actions（lint、typecheck、format check、build、部署）

## 常用命令

- 安装依赖：`pnpm install`
- 本地开发：`pnpm dev`
- 生产构建：`pnpm build`
- 预览构建：`pnpm preview`
- 类型检查：`pnpm typecheck`
- 检查代码与 Markdown：`pnpm lint`
- 修复可自动修复的检查问题：`pnpm lint:fix`
- 格式化代码与 Markdown：`pnpm format`
- 只读校验格式：`pnpm format:check`

## 目录结构

- `src/`：站点内容根目录（`srcDir`）
  - `*.md`：上游文档的中文翻译
  - `archive/`：已从上游移除、仅供历史参考的页面
  - `delta/`：Magisk Delta 文档的中文翻译与归档（独立上游，来源见 `originDocument.delta`）
  - `releases/`：Magisk 各版本发布日志
  - `public/`：静态资源，`/images/...` 等站内绝对路径指向这里
- `.vitepress/`：站点配置、主题、侧边栏与页脚
- `.agents/skills/`：本项目可复用的智能体流程
- `.github/workflows/`：CI 与 GitHub Pages 部署

## 工作规则

### 上游同步

- 当前同步基准写在 `.vitepress/config.ts` 的 `originDocument.magisk`（日期 + commit）。
- 上游来源是 `topjohnwu/Magisk` 仓库的 `docs/` 目录。只同步该目录下的文件，不引入上游代码；按 diff 更新，不整篇覆盖。
- 同步前用 `git diff <记录commit> <最新稳定commit> -- docs/` 生成变更清单（临时仓库放在 `.temp/`），再逐项翻译；不要逐文件猜差异。
- 上游删除或本站决定不再保留的章节，先归档到 `src/archive/`，再从正文移除；不要在无记录的情况下直接删除。
- 不要覆盖本站自己的内容或独立上游的译稿：`src/index.md`、`src/delta/`（Magisk Delta 文档翻译）、`src/archive/`、`src/public/` 中的自定义资源。
- 同步完成后必须更新页脚的上游日期与 commit，并补齐期间所有稳定版本的发布日志。
- 详细流程见 `.agents/skills/sync-upstream/SKILL.md`。

### 翻译

- 只翻译本次上游发生变更的片段，不要整篇重译。
- 保留代码块、行内代码、命令、参数、路径、文件名、URL、HTML 与 VitePress 容器语法。
- 保留发布日志中的 `::: details 英文原版`，同时更新中英文两侧。
- 标题翻译后可能改变锚点，必须同步更新站内链接并用 rumdl 校验。
- 术语与文风约定见 `.agents/skills/translate-docs/SKILL.md`。

### 验证契约

任何改动完成后，至少运行：

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

四项全部通过才算完成。CI 会重复执行 lint、format check、typecheck 与 build。

### 版本与发布日志

- 发布日志文件名使用版本代码：`v31.1` → `src/releases/31100.md`，`v30.7` → `src/releases/30700.md`。
- 新版本需要同时更新：`src/releases/<版本代码>.md`、`src/changes.md`、`src/releases/index.md`。
- 发布日志保留中文条目、英文原版 details 与“完整更新日志”链接。

### 提交

- **未经用户明确要求，禁止**创建 commit、push 或修改远端配置。
- 未经用户明确同意，禁止执行修改系统全局环境的操作。
