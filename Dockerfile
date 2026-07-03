# ============================================
# 爱的养育 - AI育儿顾问 | Railway 部署用 Dockerfile
# ============================================
# 多阶段构建：先编译前端，再用最小镜像运行

# ---- 第一阶段：构建 ----
FROM node:20-alpine AS builder

WORKDIR /app

# 1. 安装依赖（缓存友好）
COPY package*.json ./
RUN npm install

# 2. 复制源码并构建前端
COPY . .
RUN npm run build

# ---- 第二阶段：运行 ----
FROM node:20-alpine

WORKDIR /app

# 复制构建产物：前端静态文件 + 后端脚本
COPY --from=builder /app/dist     ./dist
COPY --from=builder /app/scripts  ./scripts

# Railway 会自动注入 PORT 环境变量
EXPOSE 3000

# 启动 AI 顾问服务器（同时伺服前端页面和 API）
CMD ["node", "scripts/bot.cjs"]
