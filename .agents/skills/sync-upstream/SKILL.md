---
name: sync-upstream
description: 将本站中文文档同步到 topjohnwu/Magisk 的最新稳定版本，包括正文、图片、发布日志与页脚版本信息。当用户要求同步上游、更新 Magisk 文档或补齐版本日志时使用。
---

# 同步上游文档

把 `topjohnwu/Magisk` 的 `docs/` 同步到本仓库，只翻译变更部分，并保留非本次上游范围的内容。

## 前置要求

开始前必须：

1. 阅读根目录 `AGENTS.md`，确认目录结构与工作规则。
2. 阅读 `.vitepress/config.ts` 中的 `originDocument.magisk`，记录当前基准日期与 commit。
3. 确认目标是**稳定版**。默认取 GitHub 最新稳定 release；`canary-*`、预发布版本不作为同步目标，除非用户明确指定。

## 输入

- 目标版本或 commit（可选）。
- 未指定时，使用 `https://api.github.com/repos/topjohnwu/Magisk/releases/latest` 的最新稳定版本。

## 工作流程

### 1. 确定目标版本

记录：

- release tag，例如 `v31.1`
- release commit（页脚使用的 7 位 SHA）
- 发布日期（`YYYY-MM-DD`）
- 该版本到上一基准之间所有稳定版本及其 release notes

如果目标 commit 与 `originDocument.magisk.commit` 相同，直接结束并说明已是最新。

### 2. 用 git diff 对比 docs/

用 `git diff` 对比记录 commit 与目标 commit 的 `docs/`，不要逐文件手工猜差异。

`.vitepress/config.ts` 里记录的是 7 位短 SHA，`git fetch` 需要完整 SHA；先通过 GitHub API 把短 SHA 和目标 tag 解析成完整 SHA：

```bash
# 记录 commit
curl -sL https://api.github.com/repos/topjohnwu/Magisk/commits/<短SHA>
# 目标稳定版 tag
curl -sL https://api.github.com/repos/topjohnwu/Magisk/commits/<tag>
```

首次同步时，在 `.temp/` 建立一个只取 `docs/` 的轻量仓库：

```bash
git init .temp/upstream
git -C .temp/upstream remote add origin https://github.com/topjohnwu/Magisk.git
git -C .temp/upstream config core.sparseCheckout true
printf 'docs/\n' > .temp/upstream/.git/info/sparse-checkout
```

之后每次同步只需拉取两个完整 SHA 并 diff：

```bash
git -C .temp/upstream fetch --filter=blob:none --depth 1 origin <旧完整SHA> <新完整SHA>
git -C .temp/upstream diff --stat <旧完整SHA> <新完整SHA> -- docs/
git -C .temp/upstream diff <旧完整SHA> <新完整SHA> -- docs/
```

- `git diff` 使用提交树，不需要 checkout；读取目标文件用 `git show <新SHA>:docs/install.md`。
- 图片用 `git show <新SHA>:docs/images/<name> > src/public/images/<name>`。
- 如果网络或服务器不支持按 SHA fetch，再退回 raw.githubusercontent.com，但仍以 `git diff` 的变更清单为准。
- 上游删除文件或目录时（例如 `docs/releases/` 历史页），先判断本站是否有独立维护的对应内容，不要直接跟随删除。
- 临时仓库统一放在 `.temp/`，不要写进 `src/`。

需要比对的文档：

- `app_changes.md`
- `boot.md`
- `build.md`
- `changes.md`
- `details.md`
- `faq.md`
- `guides.md`
- `install.md`
- `ota.md`
- `tools.md`

注意：

- 上游 `README.md` 与本站根目录 `README.md` 用途不同，不要同步。
- `src/delta/` 是 Magisk Delta 文档的中文翻译（独立上游），不属于 `topjohnwu/Magisk` 的同步范围；`src/index.md`、`src/archive/`、`src/public/` 中的自定义资源也不参与本次同步。

### 3. 逐文件比对与翻译

对每个文档执行：

1. 从上面的 `git diff` 输出读取变更片段。
2. 只把新增、修改、删除的片段应用到对应的 `src/*.md`。
3. 翻译规则见 `.agents/skills/translate-docs/SKILL.md`。
4. 如果本地文件结构与上游不同（例如标题级别），保留本地格式，只同步内容变更。
5. 保留本站已有的译者提示、自定义章节与补充说明。
6. 上游删除的章节如果仍有历史价值，先归档到 `src/archive/`，再从正文移除；如果无价值，删除并在汇报中说明。

不要整篇重译，也不要为了让译文“更顺”而改动未发生变化的段落。

### 4. 同步图片

- 只更新被本次变更文档引用的图片。
- 下载到 `src/public/images/<name>`，保持文件名不变。
- 不要删除本站自定义或未引用的图片资源。
- 构建后确认 `/images/...` 路径仍可访问。

### 5. 补齐发布日志

对基准版本与目标版本之间的**每个稳定版本**：

1. 计算版本代码：`major * 1000 + minor * 100`。
   - `v31.1` → `31100`
   - `v30.7` → `30700`
2. 读取该版本 GitHub release notes。
3. 创建 `src/releases/<版本代码>.md`，格式与既有页面一致：
   - 一级标题：`# YYYY.M.D Magisk vX.Y`
   - 中文条目列表
   - `::: details 英文原版` 包裹英文条目
   - 末尾 `**完整更新日志： [这里](/changes.html)**`
4. 将对应中文与英文条目插入 `src/changes.md` 顶部，保持版本倒序。
5. 更新 `src/releases/index.md`，按版本倒序加入 `- [vX.Y](版本代码.md)`，不要重复。
6. 如果 release notes 包含重要行为变更（例如移除功能、最低 Android 版本变化），在发布日志页面保留简短的中文说明。
7. 不重写已有历史条目；需要修正旧内容时单独说明。

### 6. 更新页脚版本

修改 `.vitepress/config.ts` 中的：

```ts
magisk: {
  date: 'YYYY-MM-DD',
  commit: '7位SHA',
  url: 'https://github.com/topjohnwu/Magisk',
}
```

日期与 commit 应指向目标稳定版本，而不是中间文档提交。

### 7. 验证

依次运行：

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

补充检查：

- `src/releases/index.md` 是否能被 `.vitepress/config.ts` 正确解析出侧边栏。
- 构建产物中的图片、锚点、页脚版本是否正确。
- `pnpm lint` 中的 rumdl 是否报告失效的站内链接。

### 8. 汇报

结束时说明：

- 旧基准 → 新基准的 commit 与日期
- 修改了哪些文档
- 新增了哪些发布日志
- 有哪些上游内容被跳过或归档，以及原因
- 验证命令的结果

**未经用户明确要求，不要 commit 或 push。**
