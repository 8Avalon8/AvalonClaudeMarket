/**
 * 飞书卡片发送测试脚本
 *
 * 使用方法：
 *   node send.js <卡片JSON路径>
 *
 * 示例：
 *   node send.js ../examples/project-report-card.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 配置文件路径
const CONFIG_PATH = path.join(__dirname, 'config.json');
const CONFIG_EXAMPLE_PATH = path.join(__dirname, 'config.example.json');

// 颜色输出
const colors = {
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
};

// 读取配置
function loadConfig() {
    if (!fs.existsSync(CONFIG_PATH)) {
        console.error(colors.red('错误: 未找到配置文件 config.json'));
        console.log(colors.yellow('\n请按以下步骤配置：'));
        console.log('1. 复制 config.example.json 为 config.json');
        console.log('2. 填入你的飞书凭证\n');
        console.log(colors.cyan('cp config.example.json config.json'));
        process.exit(1);
    }

    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

    if (config.mode === 'app') {
        if (!config.app_id || !config.app_secret || !config.chat_id) {
            console.error(colors.red('错误: app 模式需要配置 app_id, app_secret, chat_id'));
            process.exit(1);
        }
    } else if (config.mode === 'webhook') {
        if (!config.webhook_url) {
            console.error(colors.red('错误: webhook 模式需要配置 webhook_url'));
            process.exit(1);
        }
    } else {
        console.error(colors.red('错误: mode 必须是 app 或 webhook'));
        process.exit(1);
    }

    return config;
}

// 读取卡片 JSON
function loadCard(cardPath) {
    const absolutePath = path.isAbsolute(cardPath)
        ? cardPath
        : path.resolve(process.cwd(), cardPath);

    if (!fs.existsSync(absolutePath)) {
        console.error(colors.red(`错误: 未找到卡片文件 ${absolutePath}`));
        process.exit(1);
    }

    try {
        return JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
    } catch (e) {
        console.error(colors.red(`错误: 卡片 JSON 解析失败 - ${e.message}`));
        process.exit(1);
    }
}

// HTTPS 请求封装
function httpRequest(url, options, data) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const req = https.request({
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'POST',
            headers: options.headers || {},
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch {
                    resolve(body);
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

// 获取 access_token
async function getAccessToken(appId, appSecret) {
    const response = await httpRequest(
        'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        },
        { app_id: appId, app_secret: appSecret }
    );

    if (response.code !== 0) {
        throw new Error(`获取 access_token 失败: ${response.msg}`);
    }
    return response.tenant_access_token;
}

// 通过应用凭证发送
async function sendViaApp(config, card) {
    console.log(colors.cyan('模式: 应用凭证'));
    console.log(`目标群组: ${config.chat_id}`);

    const token = await getAccessToken(config.app_id, config.app_secret);

    const response = await httpRequest(
        `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        },
        {
            receive_id: config.chat_id,
            msg_type: 'interactive',
            content: JSON.stringify(card),
        }
    );

    return response;
}

// 通过 Webhook 发送
async function sendViaWebhook(config, card) {
    console.log(colors.cyan('模式: Webhook'));

    const response = await httpRequest(
        config.webhook_url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        },
        {
            msg_type: 'interactive',
            card: card,
        }
    );

    return response;
}

// 主函数
async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(colors.yellow('飞书卡片发送测试工具\n'));
        console.log('使用方法:');
        console.log('  node send.js <卡片JSON路径>\n');
        console.log('示例:');
        console.log('  node send.js ../examples/project-report-card.json');
        console.log('  node send.js ./my-card.json');
        process.exit(0);
    }

    const cardPath = args[0];
    const config = loadConfig();
    const card = loadCard(cardPath);

    console.log(colors.cyan('\n正在发送飞书卡片...'));
    console.log(`卡片文件: ${cardPath}`);

    try {
        let response;
        if (config.mode === 'app') {
            response = await sendViaApp(config, card);
        } else {
            response = await sendViaWebhook(config, card);
        }

        // 判断结果
        const success = response.code === 0 || response.StatusCode === 0;

        if (success) {
            console.log(colors.green('\n发送成功!'));
            if (response.data?.message_id) {
                console.log(`消息 ID: ${response.data.message_id}`);
            }
        } else {
            console.log(colors.red('\n发送失败!'));
            console.log('错误码:', response.code || response.StatusCode);
            console.log('错误信息:', response.msg || response.StatusMessage);

            // 解析详细错误
            if (response.msg && response.msg.includes('ErrPath')) {
                const pathMatch = response.msg.match(/ErrPath: ([^;]+)/);
                if (pathMatch) {
                    console.log(colors.yellow(`\n错误位置: ${pathMatch[1]}`));
                }
            }
        }
    } catch (error) {
        console.error(colors.red(`\n请求异常: ${error.message}`));
        process.exit(1);
    }
}

main();
