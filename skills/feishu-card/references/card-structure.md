# 飞书卡片 JSON 2.0 结构参考

> 官方文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-structure

## 完整卡片 JSON 结构

```json
{
  "schema": "2.0",
  "config": {
    "wide_screen_mode": true,
    "enable_forward": true,
    "update_multi": false,
    "streaming_mode": false,
    "summary": {
      "content": "卡片摘要内容"
    },
    "style": {
      "text_size": "normal",
      "text_color": "default"
    }
  },
  "i18n_header": {
    "zh_cn": {
      "title": {
        "tag": "plain_text",
        "content": "中文标题"
      },
      "subtitle": {
        "tag": "plain_text",
        "content": "中文副标题"
      },
      "template": "blue",
      "ud_icon": {
        "token": "chat-outlined",
        "style": {
          "color": "blue"
        }
      }
    },
    "en_us": {
      "title": {
        "tag": "plain_text",
        "content": "English Title"
      }
    }
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
      "token": "chat-outlined",
      "style": {
        "color": "blue"
      }
    },
    "text_tag_list": [
      {
        "tag": "text_tag",
        "text": {
          "tag": "plain_text",
          "content": "标签1"
        },
        "color": "blue"
      }
    ]
  },
  "body": {
    "elements": [
      // 内容组件数组
    ],
    "direction": "vertical",
    "vertical_align": "top",
    "padding": "12px 12px 12px 12px"
  },
  "i18n_body": {
    "zh_cn": {
      "elements": []
    },
    "en_us": {
      "elements": []
    }
  }
}
```

## Config 配置项

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| wide_screen_mode | boolean | 否 | 是否使用宽屏模式，建议设为 true |
| enable_forward | boolean | 否 | 是否允许转发卡片，默认 true |
| update_multi | boolean | 否 | 是否为共享卡片（更新时所有人同步），默认 false |
| streaming_mode | boolean | 否 | 是否开启流式更新模式 |
| summary | object | 否 | 卡片摘要，用于消息列表预览 |
| style | object | 否 | 全局样式配置 |

### summary 摘要配置

```json
{
  "summary": {
    "content": "这是卡片摘要，显示在消息列表",
    "i18n_content": {
      "zh_cn": "中文摘要",
      "en_us": "English summary"
    }
  }
}
```

### style 全局样式

```json
{
  "style": {
    "text_size": "normal",
    "text_color": "default"
  }
}
```

text_size 可选值：
- `heading` - 标题字号
- `normal` - 正常字号（默认）

## Header 配置

### 基础配置

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | object | 是 | 标题内容 |
| subtitle | object | 否 | 副标题内容 |
| template | string | 否 | 颜色主题，默认 blue |
| ud_icon | object | 否 | 图标配置（卡片 2.0） |
| icon | object | 否 | 图片图标（卡片 1.0，已废弃） |
| text_tag_list | array | 否 | 标签列表 |

### title / subtitle 文本

```json
{
  "title": {
    "tag": "plain_text",
    "content": "标题文本"
  }
}
```

tag 可选值：
- `plain_text` - 纯文本
- `lark_md` - 飞书 Markdown（仅 title 支持）

### template 颜色主题

| 值 | 颜色 |
|----|------|
| blue | 蓝色（默认） |
| wathet | 浅蓝色 |
| turquoise | 青绿色 |
| green | 绿色 |
| yellow | 黄色 |
| orange | 橙色 |
| red | 红色 |
| carmine | 深红色 |
| violet | 紫罗兰色 |
| purple | 紫色 |
| indigo | 靛蓝色 |
| grey | 灰色 |

### ud_icon 图标（卡片 2.0）

使用飞书图标库：

```json
{
  "ud_icon": {
    "token": "chat-outlined",
    "style": {
      "color": "blue"
    }
  }
}
```

常用图标 token：
- `chat-outlined` - 聊天
- `calendar-outlined` - 日历
- `todo-outlined` - 待办
- `approve-outlined` - 审批
- `file-outlined` - 文件
- `folder-outlined` - 文件夹
- `image-outlined` - 图片
- `video-outlined` - 视频
- `link-outlined` - 链接
- `at-outlined` - @
- `star-outlined` - 收藏
- `search-outlined` - 搜索
- `setting-outlined` - 设置
- `info-circle-outlined` - 信息
- `warning-outlined` - 警告
- `error-outlined` - 错误
- `success-outlined` - 成功

### text_tag_list 标签列表

```json
{
  "text_tag_list": [
    {
      "tag": "text_tag",
      "text": {
        "tag": "plain_text",
        "content": "紧急"
      },
      "color": "red"
    },
    {
      "tag": "text_tag",
      "text": {
        "tag": "plain_text",
        "content": "待处理"
      },
      "color": "orange"
    }
  ]
}
```

标签颜色可选：blue, wathet, turquoise, green, yellow, orange, red, carmine, violet, purple, indigo, grey, neutral

## Body 内容区域

### 基础配置

```json
{
  "body": {
    "elements": [],
    "direction": "vertical",
    "vertical_align": "top",
    "padding": "12px 12px 12px 12px"
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| elements | array | 组件数组 |
| direction | string | 排列方向：vertical（默认）或 horizontal |
| vertical_align | string | 垂直对齐：top（默认）、center、bottom |
| padding | string | 内边距，格式：上 右 下 左 |

### 多语言支持 i18n_body

```json
{
  "i18n_body": {
    "zh_cn": {
      "elements": [
        {
          "tag": "markdown",
          "content": "中文内容"
        }
      ]
    },
    "en_us": {
      "elements": [
        {
          "tag": "markdown",
          "content": "English content"
        }
      ]
    },
    "ja_jp": {
      "elements": [
        {
          "tag": "markdown",
          "content": "日本語コンテンツ"
        }
      ]
    }
  }
}
```

支持的语言代码：
- `zh_cn` - 简体中文
- `zh_hk` - 繁体中文（香港）
- `zh_tw` - 繁体中文（台湾）
- `en_us` - 英语
- `ja_jp` - 日语
- `ko_kr` - 韩语

## 组件类型概览

### 容器组件

| tag 值 | 组件名称 | 说明 |
|--------|---------|------|
| column_set | 多列布局 | 并排展示多列内容 |
| form | 表单容器 | 包装表单元素 |
| **interactive_container** | 交互容器 | 整体可点击的容器（**注意不是 interactive**） |
| collapsible_panel | 折叠面板 | 可展开/收起 |

### 内容组件

| tag 值 | 组件名称 | 说明 |
|--------|---------|------|
| div | 文本块 | 支持 icon、text、fields |
| markdown | Markdown | 富文本渲染 |
| rich_text | 富文本 | 结构化富文本 |
| img | 图片 | 单张图片 |
| multi_image_layout | 多图组合 | 多图并排 |
| hr | 分割线 | 横线分隔 |
| note | 备注 | 灰色小字 |
| person | 人员头像 | 单人展示 |
| person_list | 人员列表 | 多人展示 |
| chart | 图表 | 数据可视化 |
| table | 表格 | 表格数据 |
| audio | 音频 | 音频播放器 |

### 交互组件

| tag 值 | 组件名称 | 说明 |
|--------|---------|------|
| button | 按钮 | 点击操作 |
| action | 按钮组 | 多按钮 |
| overflow | 折叠按钮 | 更多操作 |
| input | 输入框 | 文本输入 |
| select_static | 单选下拉 | 静态选项 |
| multi_select_static | 多选下拉 | 静态多选 |
| select_person | 人员单选 | 选人 |
| multi_select_person | 人员多选 | 选多人 |
| date_picker | 日期选择 | 日期 |
| picker_time | 时间选择 | 时间 |
| picker_datetime | 日期时间 | 日期+时间 |
| image_picker | 图片上传 | 上传图片 |
| checker | 勾选器 | 勾选确认 |

## 消息发送格式

### 发送卡片消息

```json
{
  "msg_type": "interactive",
  "card": {
    "schema": "2.0",
    "config": { ... },
    "header": { ... },
    "body": { ... }
  }
}
```

### 使用 card_link 分享卡片

```json
{
  "msg_type": "interactive",
  "card": {
    "schema": "2.0",
    "card_link": {
      "url": "https://example.com",
      "pc_url": "https://example.com/pc",
      "ios_url": "https://example.com/ios",
      "android_url": "https://example.com/android"
    },
    "header": { ... },
    "body": { ... }
  }
}
```

## 流式更新模式

开启流式更新后，可以逐步更新卡片内容：

```json
{
  "schema": "2.0",
  "config": {
    "streaming_mode": true
  },
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "正在生成..."
    },
    "template": "blue"
  },
  "body": {
    "elements": [
      {
        "tag": "markdown",
        "content": "内容将逐步显示..."
      }
    ]
  }
}
```

适用于 AI 对话、实时数据等场景。
