---
name: feishu-card
description: 当用户需要构建飞书卡片、消息卡片 JSON 时使用 - 根据需求生成正确的飞书卡片 JSON 2.0 schema
---

# 飞书卡片构建助手

## 概述

这个 skill 帮助你根据需求正确构造飞书卡片（消息卡片）的 JSON 结构。**默认使用卡片 JSON 2.0 版本**，支持各种卡片组件、布局和交互功能。

## 使用场景

- 需要创建飞书机器人发送的消息卡片
- 需要构建包含按钮、表单等交互元素的卡片
- 需要设计复杂布局的飞书通知卡片
- 需要生成符合飞书规范的卡片 JSON schema

## 工作流程

### 1. 确认需求

首先询问用户以下信息：
- 卡片的用途是什么？（通知、审批、表单、数据展示等）
- 需要哪些内容元素？（标题、文本、图片、按钮、表格等）
- 是否需要交互功能？（按钮点击、表单输入、选择器等）
- 卡片的目标平台？（飞书/Lark）

### 2. 选择组件

根据需求选择合适的组件，参考 `references/components.md`：

**容器组件**：用于布局
- `column_set` - 多列布局
- `form` - 表单容器
- `interactive` - 交互容器
- `collapsible_panel` - 折叠面板

**内容组件**：用于展示
- `div` / `markdown` - 文本内容
- `img` / `multi_image_layout` - 图片展示
- `table` - 表格数据
- `chart` - 图表可视化
- `person` / `person_list` - 人员展示

**交互组件**：用于用户操作
- `button` - 按钮
- `input` - 输入框
- `select_static` / `multi_select_static` - 下拉选择
- `date_picker` / `picker_time` / `picker_datetime` - 日期时间选择
- `select_person` / `multi_select_person` - 人员选择
- `checker` - 勾选器
- `image_picker` - 图片上传

### 3. 构建卡片结构

使用卡片 JSON 2.0 结构（带 `"schema": "2.0"`），参考 `references/card-structure.md`。

### 4. 生成 JSON

根据用户需求生成完整的 JSON 文件，确保：
- 符合飞书卡片 schema 规范
- 包含所有必要字段
- JSON 格式正确可用

## 卡片 JSON 2.0 基础结构

```json
{
  "schema": "2.0",
  "config": {
    "wide_screen_mode": true,
    "enable_forward": true
  },
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "卡片标题"
    },
    "subtitle": {
      "tag": "plain_text",
      "content": "副标题"
    },
    "template": "blue",
    "ud_icon": {
      "token": "chat-outlined"
    }
  },
  "body": {
    "elements": [
      // 内容组件
    ]
  }
}
```

## 核心组件速查

### 容器组件

| 组件类型 | tag 值 | 用途 |
|---------|--------|------|
| 多列布局 | column_set | 并排展示多列内容 |
| 表单容器 | form | 包装表单元素，支持提交/重置 |
| 交互容器 | interactive | 可点击的容器，整体响应交互 |
| 折叠面板 | collapsible_panel | 可展开/收起的内容区域 |

### 内容组件

| 组件类型 | tag 值 | 用途 |
|---------|--------|------|
| 文本块 | div | 文本内容，支持 icon 和 fields |
| Markdown | markdown | 富文本渲染 |
| 富文本 | rich_text | 结构化富文本 |
| 普通文本 | plain_text | 纯文本展示 |
| 标题 | column_set + markdown | 带图标的标题样式 |
| 图片 | img | 单张图片展示 |
| 多图组合 | multi_image_layout | 多图组合布局 |
| 分割线 | hr | 分隔内容 |
| 备注 | note | 灰色小字备注 |
| 人员头像 | person | 单个人员展示 |
| 人员列表 | person_list | 多人员展示 |
| 图表 | chart | 数据可视化 |
| 表格 | table | 表格数据展示 |
| 音频 | audio | 音频播放器 |

### 交互组件

| 组件类型 | tag 值 | 用途 |
|---------|--------|------|
| 按钮 | button | 点击操作 |
| 按钮组 | action | 多按钮组合 |
| 折叠按钮 | overflow | 更多操作菜单 |
| 输入框 | input | 文本输入 |
| 单选下拉 | select_static | 单选下拉菜单 |
| 多选下拉 | multi_select_static | 多选下拉菜单 |
| 人员单选 | select_person | 选择单个人员 |
| 人员多选 | multi_select_person | 选择多个人员 |
| 日期选择 | date_picker | 选择日期 |
| 时间选择 | picker_time | 选择时间 |
| 日期时间 | picker_datetime | 选择日期和时间 |
| 图片上传 | image_picker | 上传图片 |
| 勾选器 | checker | 勾选确认 |

### Header 模板颜色

- `blue` - 蓝色（默认）
- `wathet` - 浅蓝色
- `turquoise` - 青绿色
- `green` - 绿色
- `yellow` - 黄色
- `orange` - 橙色
- `red` - 红色
- `carmine` - 深红色
- `violet` - 紫罗兰色
- `purple` - 紫色
- `indigo` - 靛蓝色
- `grey` - 灰色

## 输出要求

1. **JSON 格式**：输出完整可用的 JSON
2. **注释说明**：在代码外说明每个部分的作用
3. **验证提示**：提醒用户可以使用飞书卡片搭建工具验证
4. **API 调用示例**：如有需要，提供发送卡片的 API 调用示例

## 验证工具

- 飞书卡片搭建工具：https://open.feishu.cn/tool/cardbuilder
- 可以在线预览和调试卡片效果

## 参考文档

- `references/card-structure.md` - 完整卡片结构说明
- `references/components.md` - 所有组件详细说明
- `references/actions.md` - 交互行为配置
- `examples/` - 常用卡片模板示例

## 官方文档

### 卡片结构
- 卡片 JSON 2.0 结构：https://open.feishu.cn/document/feishu-cards/card-json-v2-structure
- 组件概述：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/component-json-v2-overview

### 容器组件
- 多列布局：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/column-set
- 表单容器：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/form-container
- 交互容器：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/interactive-container
- 折叠面板：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/collapsible-panel

### 内容组件
- 标题：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/title
- 普通文本：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/plain-text
- 富文本：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/rich-text
- 图片：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/image
- 多图组合：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/multi-image-laylout
- 人员头像：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/user-profile
- 人员列表：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/user-list
- 图表：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/chart
- 表格：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/table
- 音频：https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/card-json-v2-components/content-components/audio
- 分割线：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/divider

### 交互组件
- 输入框：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/input
- 按钮：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/button
- 折叠按钮组：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/overflow
- 单选下拉菜单：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/single-select-dropdown-menu
- 多选下拉菜单：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/multi-select-dropdown-menu
- 人员单选：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/single-select-user-picker
- 人员多选：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/multi-select-user-picker
- 日期选择器：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/date-picker
- 时间选择器：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/time-selector
- 日期时间选择器：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/date-time-picker
- 图片上传：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/image-picker
- 勾选器：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/checker

### 其他
- 版本更新说明：https://open.feishu.cn/document/feishu-cards/card-json-v2-breaking-changes-release-notes
- 配置卡片交互：https://open.feishu.cn/document/feishu-cards/configuring-card-interactions
