# SalesPilot CRM Landing Page

## 项目简介

SalesPilot CRM 产品落地页，纯前端静态站点，React + Vite 构建，config-driven 架构。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 18（JSX，无 TypeScript） |
| 构建 | Vite 6 + @vitejs/plugin-react |
| 样式 | Vanilla CSS（CSS Custom Properties 设计系统） |
| 包管理 | pnpm |
| 语言 | 简体中文 UI（`zh-Hant`） |

## 常用命令

```bash
pnpm dev          # 开发服务器（port 3000，自动打开浏览器）
pnpm build        # 生产构建 → dist/
pnpm preview      # 预览构建结果
```

## 项目结构

```
src/
  main.jsx            # 入口
  App.jsx             # 根组件，组装所有 section
  index.css           # 全局样式 & CSS Custom Properties 设计系统
  components/         # 各区块组件
    Navbar.jsx        #   导航栏（glassmorphism）
    Hero.jsx          #   首屏
    SocialProof.jsx   #   社会认同
    Features.jsx      #   功能展示
    UseCases.jsx      #   使用场景
    Pricing.jsx       #   定价方案
    CallToAction.jsx  #   行动号召
    Footer.jsx        #   页脚
  data/               # 内容配置（config-driven）
    navigation.js, hero.js, socialProof.js,
    features.js, useCases.js, pricing.js, footer.js
```

## 开发规范

### 内容管理

所有文案定义在 `src/data/*.js`，组件只负责渲染。修改文案改 data 文件，不改组件。

### CSS 设计系统

使用 `src/index.css` 中的 CSS Custom Properties，不引入 CSS 框架：

- 颜色：`--color-*`（深色主题，底色 `#0a0e1a`，主色 Indigo `#6366f1`，强调色 Cyan `#06b6d4`）
- 字体：`--text-xs` ~ `--text-6xl`（Inter + Noto Sans TC）
- 间距：`--space-1` ~ `--space-24`
- 圆角：`--radius-sm` ~ `--radius-full`
- 阴影：`--shadow-sm/md/lg/glow`
- 过渡：`--transition-fast/base/slow`

### 视觉风格

- 深色主题，Indigo / Cyan 渐变主视觉
- Glassmorphism 导航栏
- 微动画过渡效果
- 响应式设计（mobile first）

### 组件约定

- 每个 section 一个独立组件 → `src/components/`
- 组件数据从 `src/data/` 引入
- 样式写在 `index.css` 中，不用 CSS Modules 或 CSS-in-JS

### Commit 规范

使用 Conventional Commits，scope 用组件/功能名：

```
<type>(<scope>): <简体中文描述>

type: feat | fix | refactor | style | chore | docs | test
scope: 组件名 | data | project | skill | agent
```

## Agent 配置

本项目的 agent 配置采用**单源多链接**架构：

```
.codex/skills/        ← 真实文件（唯一来源）
.claude/skills/       → 软链接到 ../.codex/skills

.codex/commands/      ← 真实命令（唯一来源）
.claude/commands/     → 软链接到 ../.codex/commands

AGENTS.md             ← 真实文件（唯一来源）
CLAUDE.md             → 软链接到 AGENTS.md
```

修改 skill 时只改 `.codex/skills/` 下的文件，不要改 `.claude/skills/`。
修改 slash command 时只改 `.codex/commands/` 下的文件，不要改 `.claude/commands/`。
不再维护 `.codex/workflows/` 或 `.claude/workflows`，工作流入口统一迁移为 command。

### 目前可用 Skills

| Skill | 用途 | 触发时机 |
|-------|------|----------|
| git-pr-description | 自动生成 PR 标题与描述 | 提到 PR、Pull Request |
| git-smart-commit | 按功能逻辑拆分多个 commit | 需要整理变更并提交 |
| git-worktree-design | 设计 worktree 拆分方案并执行 | 并行开发、多分支 |
| skill-development | Skill 开发规范指南 | 创建或改进 skill |
| ui-ux-pro-max | UI/UX 设计系统（含搜索脚本） | UI 设计、前端实现 |

### Skill 匹配方式

- 按用户意图（intent）匹配
- 按任务类型（task type）匹配
- 关键词仅作辅助

### 可用 Commands

| Command | 用途 | 调用方式 |
|---------|------|----------|
| exec-worktree-spec | 读取当前 worktree 的 `git-worktree-spec.md` 并按 spec 执行开发任务 | `/exec-worktree-spec` |

## 并行开发约定

- 创建或切换 worktree 前先确认工作区已 commit 或 stash
- 拆分多分支并行开发时，参考 `git-worktree-design/SKILL.md`
- 整理当前变更并提交时，参考 `git-smart-commit/SKILL.md`
- 新建 PR 时，参考 `git-pr-description/SKILL.md`
- 执行当前 worktree 的 feature spec 时，使用 `/exec-worktree-spec`
