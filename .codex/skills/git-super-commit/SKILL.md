---

name: git-super-commit
description: 自动检测所有 git worktree，并可分发 subagent，在各分支中按功能逻辑拆分并执行 smart commit
---------------------------------------------------------------------------

# Git Multi-Worktree Smart Commit（多工作树智能提交）

该技能用于：

> 🔥 在主仓库（通常为 main 分支）中，一键检测所有 worktree，并可选择对多个 worktree 分发 subagent，分别执行“智能拆分 commit”。

---

# 🧠 核心能力

* 自动检测所有 git worktree
* 询问用户是否对多个 worktree 执行 commit
* 为每个 worktree 分发独立 subagent
* 在各自 worktree 内执行“智能拆分提交（Smart Commit）”
* 每个 worktree 完全隔离执行（独立 cwd）

---

# 🚀 主流程（调度层）

## 1️⃣ 检测所有 worktree

执行：

```bash
git worktree list
```

解析输出，得到：

* 路径
* 对应分支
* 是否为当前主 worktree

展示给用户：

```
📦 当前 worktree 列表：

1. /repo                     (main)
2. /repo-theme               (feature/theme)
3. /repo-qa                  (feature/qa)
4. /repo-cookie              (feature/cookie)
```

---

## 2️⃣ 询问用户执行策略

提示用户：

```
是否对所有 worktree 执行智能提交？

选项：
1. 全部执行
2. 选择部分 worktree
3. 仅当前 worktree
4. 取消
```

---

## 3️⃣ 分发 subagent（关键）

对于每一个需要处理的 worktree：

👉 创建 subagent，并指定：

* `cwd` = 对应 worktree 路径
* `isolation` = worktree
* 独立执行环境

---

# 🧩 SubAgent 执行逻辑（每个 worktree 内）

以下逻辑完全在 **该 worktree 内独立执行**：

---

## 1️⃣ 检查变更状态

```bash
git status --short
```

如果没有变更：

```
当前 worktree 无需提交
```

直接结束该 subagent。

---

## 2️⃣ 获取 diff

```bash
git diff
git diff --cached
```

用于分析变更内容。

---

## 3️⃣ 智能分组（核心逻辑）

按以下优先级进行分组：

| 优先级 | 类型       | 示例                          |
| --- | -------- | --------------------------- |
| 1   | 项目配置     | package.json, tsconfig.json |
| 2   | 数据层      | src/data/*                  |
| 3   | 组件（按组件名） | src/components/Button.jsx   |
| 4   | 页面       | src/pages/*                 |
| 5   | 全局样式     | src/styles/*                |
| 6   | 工具/hooks | src/utils/*                 |
| 7   | 测试       | *.test.js                   |
| 8   | 文档       | docs/*                      |

---

### 分组规则：

* 同一组件：JSX + CSS + test → 同一组
* 小改动（<5行）→ 合并到最近组
* 新文件 → feat
* 修改 → fix / refactor / style
* 删除 → chore

---

## 4️⃣ 生成 Commit 计划（必须先确认）

输出：

```
📋 Commit 计划（feature/theme）

1. feat(navbar): 新增导航栏组件
   → src/components/Navbar.jsx

2. style(hero): 调整首页样式
   → src/styles/hero.css
```

等待用户确认（每个 worktree 单独确认或统一确认）。

---

## 5️⃣ 执行 commit

逐组执行：

```bash
git add <files>
git commit -m "<type>(<scope>): <简体中文描述>"
```

---

### Commit 规范

```
<type>(<scope>): <描述>
```

#### type：

* feat / fix / refactor / style / chore / docs / test

#### scope：

* 组件名：navbar / hero
* data / style / project

#### 描述：

* 简体中文
* 动词开头：新增 / 修复 / 调整 / 重构
* ≤50字

---

## 6️⃣ 输出结果

```bash
git log --oneline -20
```

---

# ⚠️ 边界处理

## ❗ merge / 冲突状态

检测：

```bash
git status
```

若存在冲突：

👉 停止执行
👉 提示用户先解决冲突

---

## ❗ 敏感文件

检测：

* `.env`
* `.key`
* `.pem`

👉 提醒用户确认
👉 默认不自动提交

---

## ❗ 大规模变更（>50文件）

👉 仅生成计划
👉 不自动 commit
👉 等待用户确认

---

# 🧠 设计原则（非常关键）

## 1️⃣ 主 agent 只做调度

* 不直接修改代码
* 不直接 commit

---

## 2️⃣ subagent 才执行 commit

* 每个 worktree 独立执行
* 互不影响

---

## 3️⃣ 严禁跨 worktree 操作

* 不允许在 A worktree commit B 分支

---

## 4️⃣ 不自动 merge

* 所有 commit 仅在 feature 分支
* main 只用于最终 merge

---

# ✅ 最终效果

你可以在 main 分支执行：

👉 一次指令
👉 自动分发多个 subagent
👉 每个分支自动拆 commit

---

# 🚀 示例

```
主 agent：

检测到 3 个 worktree
→ 分发 3 个 subagent

subagent A → feature/theme
subagent B → feature/qa
subagent C → feature/cookie

每个独立执行 smart commit
```

---

# 📌 一句话总结

👉 **这是一个“多 worktree + 多 agent + 自动拆 commit”的调度型 skill**
