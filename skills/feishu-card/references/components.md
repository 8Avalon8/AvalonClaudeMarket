# 飞书卡片组件参考

## 内容组件

### div - 文本块

用于显示文本内容，支持 icon 和多段文本。

```json
{
  "tag": "div",
  "text": {
    "tag": "lark_md",
    "content": "这是一段 **Markdown** 文本"
  }
}
```

带图标的文本：

```json
{
  "tag": "div",
  "text": {
    "tag": "lark_md",
    "content": "带图标的文本"
  },
  "icon": {
    "tag": "standard_icon",
    "token": "info-circle_outlined",
    "color": "blue"
  }
}
```

多段落文本（fields）：

```json
{
  "tag": "div",
  "fields": [
    {
      "is_short": true,
      "text": {
        "tag": "lark_md",
        "content": "**字段1**\n内容1"
      }
    },
    {
      "is_short": true,
      "text": {
        "tag": "lark_md",
        "content": "**字段2**\n内容2"
      }
    }
  ]
}
```

### markdown - Markdown 组件

直接渲染 Markdown 内容：

```json
{
  "tag": "markdown",
  "content": "## 标题\n- 列表项1\n- 列表项2\n\n**粗体** 和 _斜体_"
}
```

支持的 Markdown 语法：
- 标题：`# ## ###`
- 粗体：`**text**`
- 斜体：`_text_`
- 删除线：`~~text~~`
- 链接：`[text](url)`
- 图片：`![alt](img_key)`
- 列表：`- item` 或 `1. item`
- 引用：`> quote`
- 代码：`` `code` ``
- 分割线：`---`
- @用户：`<at id=xxx></at>`

### hr - 分割线

```json
{
  "tag": "hr"
}
```

### img - 图片

```json
{
  "tag": "img",
  "img_key": "img_v2_xxx",
  "alt": {
    "tag": "plain_text",
    "content": "图片描述"
  },
  "mode": "fit_horizontal",
  "preview": true
}
```

mode 可选值：
- `fit_horizontal` - 宽度撑满
- `crop_center` - 居中裁剪
- `large` - 大图
- `medium` - 中图
- `small` - 小图
- `tiny` - 超小图

### note - 备注

灰色小字备注：

```json
{
  "tag": "note",
  "elements": [
    {
      "tag": "plain_text",
      "content": "这是备注文字"
    }
  ]
}
```

带图标的备注：

```json
{
  "tag": "note",
  "elements": [
    {
      "tag": "img",
      "img_key": "img_v2_xxx",
      "alt": {
        "tag": "plain_text",
        "content": "icon"
      }
    },
    {
      "tag": "plain_text",
      "content": "备注文字"
    }
  ]
}
```

## 交互组件

### action - 按钮组

```json
{
  "tag": "action",
  "actions": [
    {
      "tag": "button",
      "text": {
        "tag": "plain_text",
        "content": "主按钮"
      },
      "type": "primary",
      "url": "https://example.com"
    },
    {
      "tag": "button",
      "text": {
        "tag": "plain_text",
        "content": "次按钮"
      },
      "type": "default"
    }
  ]
}
```

button type 可选值：
- `primary` - 主要按钮（蓝色）
- `default` - 默认按钮
- `danger` - 危险按钮（红色）

按钮行为：
- `url` - 跳转链接
- `multi_url` - 多端链接
- `value` - 回调值

带回调的按钮：

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "提交"
  },
  "type": "primary",
  "value": {
    "action": "submit",
    "data": "custom_data"
  }
}
```

多端跳转：

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "打开"
  },
  "multi_url": {
    "url": "https://example.com",
    "pc_url": "https://example.com/pc",
    "ios_url": "https://example.com/ios",
    "android_url": "https://example.com/android"
  }
}
```

### select_menu - 下拉菜单

静态选项：

```json
{
  "tag": "select_static",
  "placeholder": {
    "tag": "plain_text",
    "content": "请选择"
  },
  "options": [
    {
      "text": {
        "tag": "plain_text",
        "content": "选项1"
      },
      "value": "option1"
    },
    {
      "text": {
        "tag": "plain_text",
        "content": "选项2"
      },
      "value": "option2"
    }
  ],
  "value": {
    "key": "select_key"
  }
}
```

### date_picker - 日期选择器

```json
{
  "tag": "date_picker",
  "placeholder": {
    "tag": "plain_text",
    "content": "选择日期"
  },
  "initial_date": "2024-01-01",
  "value": {
    "key": "date_key"
  }
}
```

### input - 输入框（卡片 2.0）

```json
{
  "tag": "input",
  "name": "input_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "请输入"
  },
  "max_length": 100,
  "default_value": ""
}
```

多行输入：

```json
{
  "tag": "input",
  "name": "textarea_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "请输入详细描述"
  },
  "max_length": 500,
  "rows": 3
}
```

## 容器组件

### column_set - 多列布局

```json
{
  "tag": "column_set",
  "flex_mode": "bisect",
  "background_style": "default",
  "columns": [
    {
      "tag": "column",
      "width": "weighted",
      "weight": 1,
      "elements": [
        {
          "tag": "markdown",
          "content": "**左列内容**"
        }
      ]
    },
    {
      "tag": "column",
      "width": "weighted",
      "weight": 1,
      "elements": [
        {
          "tag": "markdown",
          "content": "**右列内容**"
        }
      ]
    }
  ]
}
```

flex_mode 可选值：
- `none` - 不平均分布
- `stretch` - 拉伸
- `flow` - 流式
- `bisect` - 二等分
- `trisect` - 三等分

### collapsible_panel - 折叠面板（卡片 2.0）

```json
{
  "tag": "collapsible_panel",
  "expanded": false,
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "点击展开"
    }
  },
  "elements": [
    {
      "tag": "markdown",
      "content": "折叠的内容"
    }
  ]
}
```

### form - 表单容器（卡片 2.0）

```json
{
  "tag": "form",
  "name": "form_name",
  "elements": [
    {
      "tag": "input",
      "name": "name",
      "placeholder": {
        "tag": "plain_text",
        "content": "请输入姓名"
      }
    },
    {
      "tag": "input",
      "name": "email",
      "placeholder": {
        "tag": "plain_text",
        "content": "请输入邮箱"
      }
    },
    {
      "tag": "action",
      "actions": [
        {
          "tag": "button",
          "text": {
            "tag": "plain_text",
            "content": "提交"
          },
          "type": "primary",
          "action_type": "form_submit",
          "name": "submit_button"
        }
      ]
    }
  ]
}
```

## 人员组件

### person - 人员标签

```json
{
  "tag": "person",
  "user_id": "ou_xxx",
  "style": "normal"
}
```

### person_list - 人员列表

```json
{
  "tag": "person_list",
  "persons": [
    {
      "id": "ou_xxx1"
    },
    {
      "id": "ou_xxx2"
    }
  ],
  "size": "small",
  "lines": 1
}
```
