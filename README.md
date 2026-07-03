# 爱的养育 - 育儿知识学习APP

## 功能
- 每日推送0-3岁育儿知识卡片到飞书群
- 按年龄段分群推送（0-6月、6-12月、1-1.5岁、1.5-2岁、2-3岁）
- 网页版知识卡片浏览（React + TypeScript + Vite）
- AI 育儿顾问（可选，需配置 LLM_API_KEY）

## 快速开始

### 本地运行网页版
```bash
npm install
npm run dev
```

### 每日推送
每天早上8:00自动推送知识卡片到飞书群。

需要配置环境变量：
- `FEISHU_WEBHOOK_0_6` - 0-6月龄群机器人地址
- `FEISHU_WEBHOOK_6_12` - 6-12月龄群机器人地址
- `FEISHU_WEBHOOK_1_1_5` - 1-1.5岁群机器人地址
- `FEISHU_WEBHOOK_1_5_2` - 1.5-2岁群机器人地址
- `FEISHU_WEBHOOK_2_3` - 2-3岁群机器人地址

### AI 育儿顾问
```bash
# 设置 API Key（支持 OpenAI 或 DeepSeek）
export LLM_API_KEY=sk-xxx
export LLM_MODEL=deepseek-chat  # 或 gpt-4o-mini
export LLM_BASE_URL=https://api.deepseek.com  # 或 https://api.openai.com

# 启动机器人服务
node scripts/bot.cjs
```

## 技术栈
- 前端：React 19 + TypeScript + Vite
- 图标：Lucide React
- 动画：Framer Motion
- Markdown：React Markdown + remark-gfm
- 推送：飞书群机器人 Webhook
---
首次自动推送测试

自动推送测试 2026-07-03

