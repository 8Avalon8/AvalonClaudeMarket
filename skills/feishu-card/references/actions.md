# 飞书卡片交互行为参考

> 官方文档：https://open.feishu.cn/document/feishu-cards/configuring-card-interactions

## 交互行为类型

飞书卡片支持多种交互行为，通过 `behaviors` 数组或特定属性配置。

### 1. 打开链接 (open_url)

点击后跳转到指定 URL。

```json
{
  "behaviors": [
    {
      "type": "open_url",
      "default_url": "https://example.com",
      "pc_url": "https://example.com/pc",
      "ios_url": "https://example.com/ios",
      "android_url": "https://example.com/android"
    }
  ]
}
```

| 属性 | 类型 | 说明 |
|------|------|------|
| default_url | string | 默认跳转地址 |
| pc_url | string | PC 端跳转地址 |
| ios_url | string | iOS 端跳转地址 |
| android_url | string | Android 端跳转地址 |

**使用场景：**
- 按钮跳转外部链接
- 交互容器整体跳转
- 多端差异化跳转

### 2. 回调请求 (callback)

点击后向服务器发送回调请求。

```json
{
  "behaviors": [
    {
      "type": "callback",
      "value": {
        "action": "approve",
        "task_id": "12345",
        "extra_data": "any_value"
      }
    }
  ]
}
```

| 属性 | 类型 | 说明 |
|------|------|------|
| value | object | 回调时携带的自定义数据 |

**使用场景：**
- 审批操作（同意/拒绝）
- 表单提交
- 任何需要服务端处理的操作

---

## 按钮行为配置

### 基础按钮

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "访问网站"
  },
  "behaviors": [
    {
      "type": "open_url",
      "default_url": "https://example.com"
    }
  ]
}
```

### 回调按钮

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "确认"
  },
  "type": "primary",
  "behaviors": [
    {
      "type": "callback",
      "value": {
        "action": "confirm",
        "task_id": "12345"
      }
    }
  ]
}
```

### 多端跳转按钮

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "打开应用"
  },
  "behaviors": [
    {
      "type": "open_url",
      "default_url": "https://example.com",
      "pc_url": "https://example.com/pc",
      "ios_url": "lark://example/path",
      "android_url": "lark://example/path"
    }
  ]
}
```

### 表单提交按钮

在 `form` 容器内使用 `action_type`：

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "提交表单"
  },
  "type": "primary",
  "action_type": "form_submit",
  "name": "submit_btn"
}
```

### 表单重置按钮

```json
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
```

---

## 确认弹窗

给按钮添加二次确认。

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "删除"
  },
  "type": "danger",
  "behaviors": [
    {
      "type": "callback",
      "value": {
        "action": "delete"
      }
    }
  ],
  "confirm": {
    "title": {
      "tag": "plain_text",
      "content": "确认删除"
    },
    "text": {
      "tag": "plain_text",
      "content": "删除后无法恢复，确定要删除吗？"
    }
  }
}
```

---

## 交互容器行为

`interactive` 容器整体可点击：

```json
{
  "tag": "interactive",
  "behaviors": [
    {
      "type": "open_url",
      "default_url": "https://example.com"
    }
  ],
  "hover": {
    "background_style": "grey"
  },
  "elements": [
    {
      "tag": "markdown",
      "content": "点击此区域跳转"
    }
  ]
}
```

---

## 回调数据结构

### 按钮回调

当用户点击带回调的按钮时，服务器收到：

```json
{
  "schema": "2.0",
  "header": {
    "event_id": "evt_xxx",
    "event_type": "card.action.trigger",
    "create_time": "1704067200000",
    "token": "verification_token",
    "app_id": "cli_xxx"
  },
  "event": {
    "operator": {
      "tenant_key": "tenant_xxx",
      "user_id": "ou_xxx",
      "open_id": "ou_xxx",
      "union_id": "on_xxx"
    },
    "token": "action_token",
    "action": {
      "tag": "button",
      "value": {
        "action": "confirm",
        "task_id": "12345"
      }
    },
    "host": "im_message",
    "context": {
      "url": "https://open.feishu.cn/xxx",
      "preview_token": "xxx",
      "open_message_id": "om_xxx",
      "open_chat_id": "oc_xxx"
    }
  }
}
```

### 表单提交回调

```json
{
  "event": {
    "operator": { ... },
    "action": {
      "tag": "button",
      "name": "submit_btn",
      "form_value": {
        "username": "用户输入的用户名",
        "email": "user@example.com",
        "feedback_type": "suggestion",
        "description": "用户输入的详细描述"
      }
    }
  }
}
```

### 下拉菜单回调

```json
{
  "event": {
    "action": {
      "tag": "select_static",
      "name": "select_name",
      "option": "option1"
    }
  }
}
```

### 多选下拉回调

```json
{
  "event": {
    "action": {
      "tag": "multi_select_static",
      "name": "multi_select_name",
      "options": ["option1", "option2"]
    }
  }
}
```

### 日期选择器回调

```json
{
  "event": {
    "action": {
      "tag": "date_picker",
      "name": "date_name",
      "value": "2024-01-15"
    }
  }
}
```

### 时间选择器回调

```json
{
  "event": {
    "action": {
      "tag": "picker_time",
      "name": "time_name",
      "value": "14:30"
    }
  }
}
```

### 日期时间选择器回调

```json
{
  "event": {
    "action": {
      "tag": "picker_datetime",
      "name": "datetime_name",
      "value": "2024-01-15 14:30"
    }
  }
}
```

### 人员选择器回调

```json
{
  "event": {
    "action": {
      "tag": "select_person",
      "name": "person_name",
      "value": "ou_xxx"
    }
  }
}
```

### 勾选器回调

```json
{
  "event": {
    "action": {
      "tag": "checker",
      "name": "checker_name",
      "checked": true
    }
  }
}
```

### 输入框回调

```json
{
  "event": {
    "action": {
      "tag": "input",
      "name": "input_name",
      "value": "用户输入的内容"
    }
  }
}
```

---

## 配置回调 URL

需要在飞书开放平台配置卡片回调地址：

### 配置步骤

1. 进入 [飞书开放平台](https://open.feishu.cn/app) 应用管理后台
2. 选择目标应用
3. 进入「事件与回调」>「回调配置」
4. 配置「消息卡片请求网址」
5. 或在「机器人」功能中配置卡片回调

### 回调验证

首次配置时，飞书会发送验证请求：

```json
{
  "challenge": "xxx",
  "token": "xxx",
  "type": "url_verification"
}
```

需要返回：

```json
{
  "challenge": "xxx"
}
```

---

## 返回响应

回调请求需要返回 HTTP 200，可选择性更新卡片。

### 不更新卡片

返回空对象：

```json
{}
```

### 更新卡片

返回新的卡片 JSON：

```json
{
  "card": {
    "schema": "2.0",
    "config": {
      "wide_screen_mode": true
    },
    "header": {
      "title": {
        "tag": "plain_text",
        "content": "操作已完成"
      },
      "template": "green"
    },
    "body": {
      "elements": [
        {
          "tag": "markdown",
          "content": "任务已审批通过"
        }
      ]
    }
  }
}
```

### 显示 Toast 提示

```json
{
  "toast": {
    "type": "success",
    "content": "操作成功"
  }
}
```

**toast type 可选值：**
- `success` - 成功（绿色）
- `error` - 错误（红色）
- `warning` - 警告（黄色）
- `info` - 信息（蓝色）

### 更新卡片并显示 Toast

```json
{
  "card": {
    "schema": "2.0",
    "header": {
      "title": {
        "tag": "plain_text",
        "content": "审批已完成"
      },
      "template": "green"
    },
    "body": {
      "elements": [
        {
          "tag": "markdown",
          "content": "您已同意该申请"
        }
      ]
    }
  },
  "toast": {
    "type": "success",
    "content": "审批成功"
  }
}
```

### 打开链接

```json
{
  "open_url": {
    "url": "https://example.com",
    "pc_url": "https://example.com/pc",
    "ios_url": "https://example.com/ios",
    "android_url": "https://example.com/android"
  }
}
```

### 打开小组件

```json
{
  "open_gadget": {
    "app_id": "cli_xxx",
    "path": "/pages/index"
  }
}
```

---

## 交互组件事件触发时机

| 组件 | 触发时机 |
|------|---------|
| button | 点击按钮 |
| select_static | 选择选项后 |
| multi_select_static | 选择选项后 |
| select_person | 选择人员后 |
| multi_select_person | 选择人员后 |
| date_picker | 选择日期后 |
| picker_time | 选择时间后 |
| picker_datetime | 选择日期时间后 |
| input | 输入后失去焦点或按回车 |
| checker | 勾选状态变化后 |
| overflow | 选择选项后 |
| interactive | 点击容器 |
| form (submit) | 点击提交按钮后 |

---

## 常见场景示例

### 审批卡片

```json
{
  "schema": "2.0",
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "请假审批"
    },
    "template": "blue"
  },
  "body": {
    "elements": [
      {
        "tag": "div",
        "fields": [
          {
            "is_short": true,
            "text": {
              "tag": "lark_md",
              "content": "**申请人**\n张三"
            }
          },
          {
            "is_short": true,
            "text": {
              "tag": "lark_md",
              "content": "**请假类型**\n年假"
            }
          },
          {
            "is_short": true,
            "text": {
              "tag": "lark_md",
              "content": "**开始时间**\n2024-01-15"
            }
          },
          {
            "is_short": true,
            "text": {
              "tag": "lark_md",
              "content": "**结束时间**\n2024-01-17"
            }
          }
        ]
      },
      {
        "tag": "hr"
      },
      {
        "tag": "action",
        "layout": "bisect",
        "actions": [
          {
            "tag": "button",
            "text": {
              "tag": "plain_text",
              "content": "同意"
            },
            "type": "primary",
            "behaviors": [
              {
                "type": "callback",
                "value": {
                  "action": "approve",
                  "request_id": "req_001"
                }
              }
            ]
          },
          {
            "tag": "button",
            "text": {
              "tag": "plain_text",
              "content": "拒绝"
            },
            "type": "danger",
            "behaviors": [
              {
                "type": "callback",
                "value": {
                  "action": "reject",
                  "request_id": "req_001"
                }
              }
            ],
            "confirm": {
              "title": {
                "tag": "plain_text",
                "content": "确认拒绝"
              },
              "text": {
                "tag": "plain_text",
                "content": "确定要拒绝该申请吗？"
              }
            }
          }
        ]
      }
    ]
  }
}
```

### 反馈表单

```json
{
  "schema": "2.0",
  "header": {
    "title": {
      "tag": "plain_text",
      "content": "用户反馈"
    },
    "template": "turquoise"
  },
  "body": {
    "elements": [
      {
        "tag": "form",
        "name": "feedback_form",
        "elements": [
          {
            "tag": "select_static",
            "name": "type",
            "placeholder": {
              "tag": "plain_text",
              "content": "选择反馈类型"
            },
            "options": [
              {
                "text": { "tag": "plain_text", "content": "功能建议" },
                "value": "suggestion"
              },
              {
                "text": { "tag": "plain_text", "content": "问题反馈" },
                "value": "bug"
              }
            ],
            "required": true
          },
          {
            "tag": "input",
            "name": "content",
            "placeholder": {
              "tag": "plain_text",
              "content": "请详细描述"
            },
            "rows": 4,
            "required": true
          },
          {
            "tag": "action",
            "actions": [
              {
                "tag": "button",
                "text": { "tag": "plain_text", "content": "提交" },
                "type": "primary",
                "action_type": "form_submit",
                "name": "submit"
              }
            ]
          }
        ]
      }
    ]
  }
}
```
