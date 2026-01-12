# 飞书卡片结构参考

## 完整卡片 JSON 结构

### 卡片 1.0

```json
{
  "config": {
    "wide_screen_mode": true,
    "enable_forward": true,
    "update_multi": false
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
    "icon": {
      "img_key": "img_v2_xxx"
    }
  },
  "elements": [
    // 组件数组
  ]
}
```

### 卡片 2.0

```json
{
  "schema": "2.0",
  "config": {
    "wide_screen_mode": true,
    "enable_forward": true,
    "update_multi": false,
    "style": {
      "text_size": "normal"
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
      "token": "chat-outlined"
    }
  },
  "body": {
    "elements": [
      // 组件数组
    ]
  }
}
```

## Config 配置项

| 字段 | 类型 | 说明 |
|------|------|------|
| wide_screen_mode | boolean | 是否使用宽屏模式，建议设为 true |
| enable_forward | boolean | 是否允许转发卡片 |
| update_multi | boolean | 是否为共享卡片（更新时所有人同步） |

## Header 配置

### title 标题

```json
{
  "title": {
    "tag": "plain_text",  // 或 "lark_md"
    "content": "标题文本"
  }
}
```

### template 颜色主题

可选值：
- `blue` - 蓝色
- `wathet` - 浅蓝
- `turquoise` - 青绿
- `green` - 绿色
- `yellow` - 黄色
- `orange` - 橙色
- `red` - 红色
- `carmine` - 深红
- `violet` - 紫罗兰
- `purple` - 紫色
- `indigo` - 靛蓝
- `grey` - 灰色

### icon 图标（卡片 1.0）

```json
{
  "icon": {
    "img_key": "img_v2_xxx"  // 图片 key
  }
}
```

### ud_icon 图标（卡片 2.0）

```json
{
  "ud_icon": {
    "token": "chat-outlined",  // 图标 token
    "style": {
      "color": "blue"
    }
  }
}
```

## Elements/Body 内容区域

内容区域是一个组件数组，可以包含多种类型的组件。

### 组件类型概览

1. **内容组件**
   - `div` - 文本块
   - `markdown` - Markdown 文本
   - `hr` - 分割线
   - `img` - 图片
   - `note` - 备注

2. **交互组件**
   - `action` - 按钮组
   - `overflow` - 折叠按钮组
   - `select_menu` - 下拉菜单
   - `date_picker` - 日期选择器
   - `picker_time` - 时间选择器
   - `picker_datetime` - 日期时间选择器
   - `input` - 输入框（卡片 2.0）
   - `form` - 表单容器（卡片 2.0）

3. **容器组件**
   - `column_set` - 多列布局
   - `collapsible_panel` - 折叠面板（卡片 2.0）

## 文本标签类型

### plain_text

纯文本，不支持格式：

```json
{
  "tag": "plain_text",
  "content": "这是纯文本"
}
```

### lark_md

飞书 Markdown，支持格式：

```json
{
  "tag": "lark_md",
  "content": "**粗体** _斜体_ ~~删除线~~\n[链接](https://example.com)\n<at id=all></at>"
}
```

支持的语法：
- `**text**` - 粗体
- `_text_` - 斜体
- `~~text~~` - 删除线
- `[text](url)` - 链接
- `<at id=xxx></at>` - @用户
- `<at id=all></at>` - @所有人
- 换行使用 `\n`

## 消息发送格式

通过 API 发送卡片消息时的完整格式：

```json
{
  "msg_type": "interactive",
  "card": {
    // 卡片 JSON 结构
  }
}
```
