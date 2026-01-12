# 飞书卡片组件参考

> 组件概述：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/component-json-v2-overview

## 容器组件

### column_set - 多列布局

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/column-set

用于并排展示多列内容。

```json
{
  "tag": "column_set",
  "flex_mode": "none",
  "background_style": "default",
  "horizontal_spacing": "default",
  "horizontal_align": "left",
  "margin": "0px",
  "columns": [
    {
      "tag": "column",
      "width": "weighted",
      "weight": 1,
      "vertical_align": "top",
      "vertical_spacing": "default",
      "padding": "0px",
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

**column_set 属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| flex_mode | string | 自适应模式：none、stretch、flow、bisect、trisect |
| background_style | string | 背景样式：default、grey |
| horizontal_spacing | string | 列间距：default、small、large |
| horizontal_align | string | 水平对齐：left、center、right |
| margin | string | 外边距 |
| columns | array | 列数组 |
| action | object | 整体点击行为 |

**column 属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| width | string | 宽度类型：weighted（按权重）、auto（自适应）、具体像素 |
| weight | number | 权重值（width=weighted 时生效） |
| vertical_align | string | 垂直对齐：top、center、bottom |
| vertical_spacing | string | 元素间距：default、small、large |
| padding | string | 内边距 |
| elements | array | 组件数组 |

**flex_mode 说明：**
- `none` - 不自动分配，按 weight 计算
- `stretch` - 拉伸填充
- `flow` - 流式布局（移动端自动换行）
- `bisect` - 二等分
- `trisect` - 三等分

### form - 表单容器

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/form-container

包装表单元素，支持统一提交和重置。

```json
{
  "tag": "form",
  "name": "my_form",
  "elements": [
    {
      "tag": "input",
      "name": "username",
      "placeholder": {
        "tag": "plain_text",
        "content": "请输入用户名"
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
          "name": "submit_btn"
        },
        {
          "tag": "button",
          "text": {
            "tag": "plain_text",
            "content": "重置"
          },
          "type": "default",
          "action_type": "form_reset",
          "name": "reset_btn"
        }
      ]
    }
  ]
}
```

**属性：**

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 表单名称，用于回调识别 |
| elements | array | 是 | 表单元素数组 |

### interactive - 交互容器

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/interactive-container

整体可点击的容器。

```json
{
  "tag": "interactive",
  "width": "fill",
  "height": "auto",
  "background_style": "default",
  "has_border": false,
  "border_color": "grey",
  "corner_radius": "0px",
  "padding": "12px",
  "behaviors": [
    {
      "type": "open_url",
      "default_url": "https://example.com",
      "pc_url": "https://example.com/pc",
      "ios_url": "https://example.com/ios",
      "android_url": "https://example.com/android"
    }
  ],
  "elements": [
    {
      "tag": "markdown",
      "content": "点击此区域跳转"
    }
  ]
}
```

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| width | string | 宽度：fill、auto、具体值 |
| height | string | 高度：auto、具体值 |
| background_style | string | 背景：default、grey |
| has_border | boolean | 是否有边框 |
| border_color | string | 边框颜色 |
| corner_radius | string | 圆角大小 |
| padding | string | 内边距 |
| behaviors | array | 点击行为数组 |
| elements | array | 子组件 |
| disabled | boolean | 是否禁用交互 |
| hover | object | 悬停样式 |

**behaviors 类型：**

```json
// 打开链接
{
  "type": "open_url",
  "default_url": "https://example.com"
}

// 回调请求
{
  "type": "callback",
  "value": {
    "key": "value"
  }
}
```

### collapsible_panel - 折叠面板

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/containers/collapsible-panel

可展开/收起的内容区域。

```json
{
  "tag": "collapsible_panel",
  "expanded": false,
  "background_style": "default",
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "点击展开详情"
    },
    "icon": {
      "tag": "standard_icon",
      "token": "down-small-outlined"
    },
    "icon_position": "right",
    "icon_expanded_angle": 180
  },
  "vertical_spacing": "default",
  "padding": "12px",
  "elements": [
    {
      "tag": "markdown",
      "content": "这是折叠的内容，展开后可见。"
    }
  ]
}
```

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| expanded | boolean | 是否默认展开 |
| background_style | string | 背景样式 |
| header | object | 标题配置 |
| vertical_spacing | string | 元素间距 |
| padding | string | 内边距 |
| border | object | 边框配置 |
| elements | array | 子组件 |

---

## 内容组件

### div - 文本块

用于显示文本内容，支持 icon 和多段文本（fields）。

```json
{
  "tag": "div",
  "text": {
    "tag": "lark_md",
    "content": "这是一段 **Markdown** 文本"
  }
}
```

**带图标的文本：**

```json
{
  "tag": "div",
  "text": {
    "tag": "lark_md",
    "content": "带图标的文本"
  },
  "icon": {
    "tag": "standard_icon",
    "token": "info-circle-outlined",
    "color": "blue"
  }
}
```

**多段落文本（fields）：**

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

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| text | object | 文本内容 |
| icon | object | 图标配置 |
| extra | object | 右侧附加元素 |
| fields | array | 多字段布局 |

### markdown - Markdown 组件

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/rich-text

直接渲染 Markdown 内容。

```json
{
  "tag": "markdown",
  "content": "## 标题\n- 列表项1\n- 列表项2\n\n**粗体** 和 _斜体_",
  "text_align": "left",
  "text_size": "normal",
  "href": {
    "url_val": {
      "url": "https://example.com"
    }
  }
}
```

**支持的 Markdown 语法：**
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
- @所有人：`<at id=all></at>`

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| content | string | Markdown 内容 |
| text_align | string | 对齐：left、center、right |
| text_size | string | 字号：normal、heading、xxxx-large 等 |
| href | object | 链接变量映射 |
| icon | object | 左侧图标 |

### rich_text - 富文本

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/rich-text

结构化的富文本组件，支持更复杂的格式。

```json
{
  "tag": "rich_text",
  "content": [
    [
      {
        "tag": "text",
        "text": "这是普通文本，"
      },
      {
        "tag": "text",
        "text": "这是粗体文本",
        "style": ["bold"]
      },
      {
        "tag": "a",
        "text": "链接",
        "href": "https://example.com"
      }
    ],
    [
      {
        "tag": "text",
        "text": "第二行内容"
      }
    ]
  ]
}
```

**内容元素类型：**

| tag | 说明 | 属性 |
|-----|------|------|
| text | 文本 | text, style |
| a | 链接 | text, href |
| at | @用户 | user_id, user_name |
| img | 图片 | image_key, width, height |
| emotion | 表情 | emoji_type |

**style 可选值：**
- `bold` - 粗体
- `italic` - 斜体
- `underline` - 下划线
- `lineThrough` - 删除线

### img - 图片

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/image

```json
{
  "tag": "img",
  "img_key": "img_v2_xxx",
  "alt": {
    "tag": "plain_text",
    "content": "图片描述"
  },
  "mode": "fit_horizontal",
  "preview": true,
  "corner_radius": "0px",
  "scale_type": "crop_center",
  "size": "large",
  "transparent": false
}
```

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| img_key | string | 图片 key |
| alt | object | 替代文本 |
| mode | string | 显示模式（已废弃，使用 size） |
| size | string | 尺寸：large、medium、small、tiny、stretch_without_padding、stretch |
| preview | boolean | 是否可预览 |
| corner_radius | string | 圆角 |
| scale_type | string | 缩放：crop_center、crop_top、fit_horizontal |
| transparent | boolean | 是否透明背景 |

### multi_image_layout - 多图组合

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/multi-image-laylout

```json
{
  "tag": "multi_image_layout",
  "mode": "bisect",
  "img_list": [
    {
      "img_key": "img_v2_xxx1"
    },
    {
      "img_key": "img_v2_xxx2"
    }
  ],
  "corner_radius": "0px"
}
```

**mode 可选值：**
- `bisect` - 二等分
- `trisect` - 三等分
- `triple` - 三图布局
- `quadruple` - 四图布局

### hr - 分割线

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/divider

```json
{
  "tag": "hr"
}
```

### note - 备注

灰色小字备注。

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
      "tag": "standard_icon",
      "token": "info-circle-outlined"
    },
    {
      "tag": "plain_text",
      "content": "备注文字"
    }
  ]
}
```

### person - 人员头像

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/user-profile

```json
{
  "tag": "person",
  "user_id": "ou_xxx",
  "size": "medium",
  "show_avatar": true,
  "show_name": true
}
```

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| user_id | string | 用户 ID |
| size | string | 尺寸：extra_small、small、medium、large |
| show_avatar | boolean | 显示头像 |
| show_name | boolean | 显示姓名 |

### person_list - 人员列表

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/user-list

```json
{
  "tag": "person_list",
  "persons": [
    { "id": "ou_xxx1" },
    { "id": "ou_xxx2" }
  ],
  "size": "small",
  "lines": 1,
  "show_avatar": true,
  "show_name": true
}
```

### chart - 图表

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/chart

```json
{
  "tag": "chart",
  "chart_spec": {
    "type": "line",
    "title": {
      "text": "折线图标题"
    },
    "data": {
      "values": [
        { "x": "周一", "y": 100 },
        { "x": "周二", "y": 120 },
        { "x": "周三", "y": 90 }
      ]
    },
    "xField": "x",
    "yField": "y"
  },
  "aspect_ratio": "16:9",
  "height": "auto",
  "preview": true,
  "color_theme": "brand"
}
```

**chart_spec 使用 VChart 规范**，支持的图表类型：
- `line` - 折线图
- `bar` - 柱状图
- `pie` - 饼图
- `area` - 面积图
- `scatter` - 散点图
- `radar` - 雷达图
- `funnel` - 漏斗图

### table - 表格

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/content-components/table

```json
{
  "tag": "table",
  "page_size": 5,
  "row_height": "medium",
  "header_style": {
    "text_align": "center",
    "text_size": "normal",
    "background_style": "grey",
    "text_color": "default",
    "bold": true,
    "lines": 1
  },
  "columns": [
    {
      "name": "name",
      "display_name": "姓名",
      "width": "auto",
      "data_type": "text",
      "horizontal_align": "left"
    },
    {
      "name": "score",
      "display_name": "分数",
      "data_type": "number",
      "format": {
        "precision": 2
      }
    }
  ],
  "rows": [
    { "name": "张三", "score": 95.5 },
    { "name": "李四", "score": 88.0 }
  ]
}
```

**columns 属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| name | string | 字段名 |
| display_name | string | 显示名称 |
| width | string | 宽度：auto 或具体值 |
| data_type | string | 数据类型：text、number、date、options、people |
| horizontal_align | string | 对齐：left、center、right |
| format | object | 格式化配置 |

### audio - 音频

> 文档：https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/card-json-v2-components/content-components/audio

```json
{
  "tag": "audio",
  "file_key": "audio_v2_xxx",
  "name": "音频文件名",
  "duration": 120
}
```

---

## 交互组件

### button - 按钮

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/button

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "主按钮"
  },
  "type": "primary",
  "size": "medium",
  "width": "default",
  "icon": {
    "tag": "standard_icon",
    "token": "add-outlined"
  },
  "disabled": false,
  "disabled_tips": {
    "tag": "plain_text",
    "content": "按钮已禁用"
  },
  "confirm": {
    "title": {
      "tag": "plain_text",
      "content": "确认操作"
    },
    "text": {
      "tag": "plain_text",
      "content": "确定要执行此操作吗？"
    }
  },
  "behaviors": [
    {
      "type": "open_url",
      "default_url": "https://example.com"
    }
  ]
}
```

**type 可选值：**
- `primary` - 主要按钮（蓝色）
- `default` - 默认按钮
- `danger` - 危险按钮（红色）
- `text` - 文字按钮
- `primary_text` - 蓝色文字按钮
- `danger_text` - 红色文字按钮
- `primary_filled` - 蓝色填充按钮
- `danger_filled` - 红色填充按钮
- `laser` - 镭射按钮

**size 可选值：**
- `tiny` - 超小
- `small` - 小
- `medium` - 中（默认）
- `large` - 大

**behaviors 行为类型：**

```json
// 打开链接
{
  "type": "open_url",
  "default_url": "https://example.com",
  "pc_url": "",
  "ios_url": "",
  "android_url": ""
}

// 回调请求
{
  "type": "callback",
  "value": {
    "action": "approve",
    "task_id": "123"
  }
}

// 表单提交（在 form 容器内使用）
// 使用 action_type: "form_submit"

// 表单重置（在 form 容器内使用）
// 使用 action_type: "form_reset"
```

### action - 按钮组

```json
{
  "tag": "action",
  "layout": "bisect",
  "actions": [
    {
      "tag": "button",
      "text": { "tag": "plain_text", "content": "同意" },
      "type": "primary"
    },
    {
      "tag": "button",
      "text": { "tag": "plain_text", "content": "拒绝" },
      "type": "danger"
    }
  ]
}
```

**layout 可选值：**
- `bisect` - 二等分
- `trisect` - 三等分
- `flow` - 流式布局

### overflow - 折叠按钮组

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/overflow

```json
{
  "tag": "overflow",
  "width": "default",
  "options": [
    {
      "text": {
        "tag": "plain_text",
        "content": "选项1"
      },
      "value": "option1",
      "icon": {
        "tag": "standard_icon",
        "token": "edit-outlined"
      }
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
    "key": "overflow_key"
  }
}
```

### input - 输入框

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/input

```json
{
  "tag": "input",
  "name": "input_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "请输入"
  },
  "default_value": "",
  "max_length": 100,
  "rows": 1,
  "width": "default",
  "label": {
    "tag": "plain_text",
    "content": "输入框标签"
  },
  "label_position": "top",
  "required": false,
  "disabled": false,
  "behaviors": [
    {
      "type": "callback",
      "value": {}
    }
  ]
}
```

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| name | string | 字段名 |
| placeholder | object | 占位文本 |
| default_value | string | 默认值 |
| max_length | number | 最大长度 |
| rows | number | 行数（多行输入） |
| width | string | 宽度 |
| label | object | 标签文本 |
| label_position | string | 标签位置：top、left |
| required | boolean | 是否必填 |
| disabled | boolean | 是否禁用 |
| fallback | object | 回退配置 |

### select_static - 单选下拉菜单

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/single-select-dropdown-menu

```json
{
  "tag": "select_static",
  "name": "select_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "请选择"
  },
  "initial_option": "option1",
  "options": [
    {
      "text": { "tag": "plain_text", "content": "选项1" },
      "value": "option1"
    },
    {
      "text": { "tag": "plain_text", "content": "选项2" },
      "value": "option2"
    }
  ],
  "width": "default",
  "required": false,
  "disabled": false
}
```

### multi_select_static - 多选下拉菜单

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/multi-select-dropdown-menu

```json
{
  "tag": "multi_select_static",
  "name": "multi_select_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "请选择多个"
  },
  "selected_values": ["option1"],
  "options": [
    {
      "text": { "tag": "plain_text", "content": "选项1" },
      "value": "option1"
    },
    {
      "text": { "tag": "plain_text", "content": "选项2" },
      "value": "option2"
    }
  ],
  "width": "default",
  "required": false,
  "disabled": false
}
```

### select_person - 人员单选

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/single-select-user-picker

```json
{
  "tag": "select_person",
  "name": "person_select",
  "placeholder": {
    "tag": "plain_text",
    "content": "选择人员"
  },
  "width": "default",
  "required": false,
  "disabled": false
}
```

### multi_select_person - 人员多选

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/multi-select-user-picker

```json
{
  "tag": "multi_select_person",
  "name": "persons_select",
  "placeholder": {
    "tag": "plain_text",
    "content": "选择多个人员"
  },
  "selected_values": ["ou_xxx1"],
  "width": "default",
  "required": false,
  "disabled": false
}
```

### date_picker - 日期选择器

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/date-picker

```json
{
  "tag": "date_picker",
  "name": "date_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "选择日期"
  },
  "initial_date": "2024-01-01",
  "width": "default",
  "required": false,
  "disabled": false
}
```

### picker_time - 时间选择器

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/time-selector

```json
{
  "tag": "picker_time",
  "name": "time_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "选择时间"
  },
  "initial_time": "09:00",
  "width": "default",
  "required": false,
  "disabled": false
}
```

### picker_datetime - 日期时间选择器

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/date-time-picker

```json
{
  "tag": "picker_datetime",
  "name": "datetime_name",
  "placeholder": {
    "tag": "plain_text",
    "content": "选择日期和时间"
  },
  "initial_datetime": "2024-01-01 09:00",
  "width": "default",
  "required": false,
  "disabled": false
}
```

### image_picker - 图片上传

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/image-picker

```json
{
  "tag": "image_picker",
  "name": "image_upload",
  "layout": "bisect",
  "max_count": 9,
  "show_count": true,
  "required": false,
  "disabled": false,
  "label": {
    "tag": "plain_text",
    "content": "上传图片"
  }
}
```

**layout 可选值：**
- `bisect` - 二等分
- `trisect` - 三等分

### checker - 勾选器

> 文档：https://open.feishu.cn/document/feishu-cards/card-json-v2-components/interactive-components/checker

```json
{
  "tag": "checker",
  "name": "checker_name",
  "checked": false,
  "text": {
    "tag": "plain_text",
    "content": "我同意服务条款"
  },
  "overall_checkable": true,
  "disabled": false,
  "checked_style": {
    "show_strikethrough": true
  },
  "margin": "0px",
  "padding": "0px",
  "behaviors": [
    {
      "type": "callback",
      "value": {}
    }
  ]
}
```

**属性：**

| 属性 | 类型 | 说明 |
|------|------|------|
| name | string | 字段名 |
| checked | boolean | 是否选中 |
| text | object | 显示文本 |
| overall_checkable | boolean | 整行可点击 |
| disabled | boolean | 是否禁用 |
| checked_style | object | 选中后样式 |
| margin | string | 外边距 |
| padding | string | 内边距 |

---

## 通用属性

### 文本对象

```json
{
  "tag": "plain_text",  // 或 "lark_md"
  "content": "文本内容"
}
```

### 图标对象

```json
// 标准图标
{
  "tag": "standard_icon",
  "token": "chat-outlined",
  "color": "blue"  // 可选
}

// 自定义图标
{
  "tag": "custom_icon",
  "img_key": "img_v2_xxx"
}
```

### 常用标准图标 Token

| Token | 说明 |
|-------|------|
| add-outlined | 添加 |
| chat-outlined | 聊天 |
| calendar-outlined | 日历 |
| todo-outlined | 待办 |
| approve-outlined | 审批 |
| file-outlined | 文件 |
| folder-outlined | 文件夹 |
| image-outlined | 图片 |
| video-outlined | 视频 |
| link-outlined | 链接 |
| at-outlined | @ |
| star-outlined | 收藏 |
| search-outlined | 搜索 |
| setting-outlined | 设置 |
| edit-outlined | 编辑 |
| delete-outlined | 删除 |
| download-outlined | 下载 |
| upload-outlined | 上传 |
| share-outlined | 分享 |
| copy-outlined | 复制 |
| info-circle-outlined | 信息 |
| warning-outlined | 警告 |
| error-outlined | 错误 |
| success-outlined | 成功 |
| check-outlined | 勾选 |
| close-outlined | 关闭 |
| arrow-right-outlined | 右箭头 |
| arrow-left-outlined | 左箭头 |
| arrow-up-outlined | 上箭头 |
| arrow-down-outlined | 下箭头 |
