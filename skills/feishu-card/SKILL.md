---
name: feishu-card
description: 当用户需要构建飞书卡片、消息卡片 JSON 时使用 - 根据需求生成正确的飞书卡片 schema 和 JSON
---

# 飞书卡片构建助手

## 概述

这个 skill 帮助你根据需求正确构造飞书卡片（消息卡片）的 JSON 结构。支持各种卡片组件、布局和交互功能。

## 使用场景

- 需要创建飞书机器人发送的消息卡片
- 需要构建包含按钮、表单等交互元素的卡片
- 需要设计复杂布局的飞书通知卡片
- 需要生成符合飞书规范的卡片 JSON schema

## 工作流程

### 1. 确认需求

首先询问用户以下信息：
- 卡片的用途是什么？（通知、审批、表单、展示等）
- 需要哪些内容元素？（标题、文本、图片、按钮等）
- 是否需要交互功能？（按钮点击、表单输入等）
- 卡片的目标平台？（飞书/Lark）

### 2. 选择卡片版本

飞书卡片有两个版本：
- **卡片 1.0**：基础版本，兼容性好
- **卡片 2.0**：新版本，支持更多组件和布局

根据需求推荐合适的版本。

### 3. 构建卡片结构

参考 `references/card-structure.md` 了解完整的卡片结构。

### 4. 生成 JSON

根据用户需求生成完整的 JSON 文件，确保：
- 符合飞书卡片 schema 规范
- 包含所有必要字段
- JSON 格式正确可用

## 卡片基础结构

### 卡片 1.0 结构

```json
{
  "config": {
    "wide_screen_mode": true,
    "enable_forward": true
  },
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "卡片标题"
    },
    "template": "blue"
  },
  "elements": [
    // 内容组件
  ]
}
```

### 卡片 2.0 结构

```json
{
  "schema": "2.0",
  "config": {
    "wide_screen_mode": true
  },
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "卡片标题"
    },
    "template": "blue"
  },
  "body": {
    "elements": [
      // 内容组件
    ]
  }
}
```

## 核心组件参考

详细组件说明请参考 `references/components.md`。

### 常用组件速查

| 组件类型 | tag 值 | 用途 |
|---------|--------|------|
| 普通文本 | div | 文本块 |
| Markdown | markdown | 富文本 |
| 图片 | img | 图片展示 |
| 分割线 | hr | 分隔内容 |
| 按钮组 | action | 交互按钮 |
| 备注 | note | 灰色小字 |
| 多列布局 | column_set | 多栏布局 |

### Header 模板颜色

- `blue` - 蓝色（默认）
- `wathet` - 浅蓝色
- `turquoise` - 青绿色
- `green` - 绿色
- `yellow` - 黄色
- `orange` - 橙色
- `red` - 红色
- `carmine` - 深红色
- `violet` - 紫色
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

- 卡片概述：https://open.feishu.cn/document/feishu-cards/feishu-card-overview
- 卡片结构：https://open.feishu.cn/document/common-capabilities/message-card/getting-started/card-structure/card-structure
- 组件概述：https://open.feishu.cn/document/feishu-cards/component-overview
