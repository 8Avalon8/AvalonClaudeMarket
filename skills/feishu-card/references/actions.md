# 飞书卡片交互行为参考

## 按钮行为类型

### 1. 链接跳转

最简单的按钮行为，点击跳转到指定 URL：

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "访问网站"
  },
  "url": "https://example.com"
}
```

### 2. 多端链接

为不同平台指定不同的跳转链接：

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "打开应用"
  },
  "multi_url": {
    "url": "https://example.com",
    "pc_url": "https://example.com/pc",
    "ios_url": "lark://example/path",
    "android_url": "lark://example/path"
  }
}
```

### 3. 回调请求

点击按钮后向服务器发送回调请求：

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "确认"
  },
  "type": "primary",
  "value": {
    "action": "confirm",
    "task_id": "12345"
  }
}
```

服务器会收到包含 `value` 数据的回调请求。

### 4. 表单提交（卡片 2.0）

在表单中使用提交按钮：

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

### 5. 表单重置（卡片 2.0）

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

## 确认弹窗

给按钮添加二次确认：

```json
{
  "tag": "button",
  "text": {
    "tag": "plain_text",
    "content": "删除"
  },
  "type": "danger",
  "value": {
    "action": "delete"
  },
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

## 回调数据结构

当用户点击带 `value` 的按钮时，服务器会收到如下回调：

```json
{
  "schema": "2.0",
  "header": {
    "event_id": "xxx",
    "event_type": "card.action.trigger",
    "create_time": "1234567890",
    "token": "xxx",
    "app_id": "cli_xxx"
  },
  "event": {
    "operator": {
      "tenant_key": "xxx",
      "user_id": "ou_xxx",
      "open_id": "ou_xxx"
    },
    "token": "xxx",
    "action": {
      "value": {
        "action": "confirm",
        "task_id": "12345"
      },
      "tag": "button"
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

## 表单回调数据

表单提交时的回调数据：

```json
{
  "event": {
    "action": {
      "form_value": {
        "name": "用户输入的姓名",
        "email": "user@example.com"
      },
      "name": "submit_btn",
      "tag": "button"
    }
  }
}
```

## 下拉菜单回调

```json
{
  "event": {
    "action": {
      "option": "option1",
      "tag": "select_static"
    }
  }
}
```

## 日期选择器回调

```json
{
  "event": {
    "action": {
      "value": "2024-01-15",
      "tag": "date_picker"
    }
  }
}
```

## 配置回调 URL

需要在飞书开放平台配置消息卡片请求网址：

1. 进入应用管理后台
2. 选择「事件订阅」
3. 配置「消息卡片请求网址」
4. 或使用「机器人」功能中的卡片回调设置

## 返回响应

回调请求需要返回 HTTP 200，可选择性更新卡片：

### 不更新卡片

```json
{}
```

### 更新卡片

```json
{
  "card": {
    // 新的卡片 JSON
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

type 可选值：`success`、`error`、`warning`、`info`
