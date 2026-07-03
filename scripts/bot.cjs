// 🌟 爱的养育 - AI育儿顾问机器人
// 使用：node scripts/bot.cjs （需要设置 API Key）
// 环境变量：
//   LLM_API_KEY    - OpenAI / DeepSeek API Key
//   LLM_MODEL      - 模型名 (默认 deepseek-chat)
//   LLM_BASE_URL   - API 地址 (默认 https://api.deepseek.com)
//   PORT           - Railway 端口（自动注入）

// ===== 知识库：权威育儿书籍 =====
const KNOWLEDGE_BOOKS = [
  "《美国儿科学会育儿百科》- 斯蒂芬·P·赫尔维茨 等",
  "《从出生到3岁》- 伯顿·L·怀特",
  "《西尔斯亲密育儿百科》- 威廉·西尔斯",
  "《育儿百科》- 松田道雄",
  "《父母的语言》- 达娜·萨斯金德",
  "《游戏力》- 劳伦斯·科恩",
  "《正面管教》- 简·尼尔森",
  "《可怕的两岁》- 约翰·罗斯蒙德",
  "《婴幼儿及其照料者》- 珍妮特·冈萨雷斯-米纳",
  "《真希望我父母读过这本书》- 菲利帕·佩里",
  "《如何说孩子才会听》- 阿黛尔·法伯 & 伊莱恩·马兹丽施",
  "《捕捉儿童敏感期》- 孙瑞雪",
  "《好妈妈胜过好老师》- 尹建莉",
  "《全脑教养法》- 丹尼尔·西格尔 & 蒂娜·佩恩·布赖森",
  "《孩子：挑战》- 鲁道夫·德雷克斯 & 薇姬·索尔兹",
  "《魔法岁月：0-6岁孩子的精神世界》- 塞尔玛·弗雷伯格",
  "《你的1岁孩子》、《你的2岁孩子》- 路易斯·埃姆斯",
  "《简单父母经》- 金·约翰·培恩",
  "《倾听孩子》- 帕蒂·惠芙乐",
  "《伯克毕生发展心理学》- 劳拉·伯克",
  "《养育的选择》- 陈忻",
  "《与打骂和溺爱说拜拜》- 伊丽莎白·克拉里"
];

// ===== 系统提示词（AI 的角色设定）=====
const SYSTEM_PROMPT = `你是一位专业、温暖、有经验的育儿顾问。

## 你的知识来源
你的回答基于以下权威育儿书籍：
${KNOWLEDGE_BOOKS.map(b => `- ${b}`).join("\n")}

同时你也参考了当下育儿领域专业博主（如抖音、小红书上的权威创作者）分享的实用经验。

## 回答原则
1. **科学准确** — 基于循证医学和育儿科学，不要编造信息
2. **温暖鼓励** — 语气像一位有经验的育儿顾问，不要冷冰冰
3. **具体可操作** — 给出明确的步骤和方法，不要说空话
4. **诚实透明** — 不确定时明确说"这个我不太确定，建议咨询儿科医生"
5. **简洁实用** — 宝妈时间宝贵，回答要直接有用
6. **分龄指导** — 注意宝宝的年龄阶段（0-3岁），给出适合该阶段的建议

## 回答格式
- 先用一句话直接回答问题
- 然后给出具体建议（2-3点）
- 最后标注参考来源（书籍名称）
- 总长度控制在 300 字以内，适合手机阅读

## 年龄阶段参考
- 0-6个月：新生儿护理、母乳喂养、睡眠安全
- 6-12个月：辅食添加、爬行、出牙
- 12-18个月：学步、自主进食、语言发展
- 1.5-2岁：语言爆发期、如厕训练、情绪管理
- 2-3岁：社交、入园准备、规矩建立

现在，请回答宝妈的问题：`;

// ===== AI 问答函数 =====
async function askBot(question, ageGroup) {
  const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "⚠️ 机器人还没配置好，请先设置 LLM_API_KEY 环境变量。";
    }

  const baseURL = process.env.LLM_BASE_URL || "https://api.deepseek.com";
  const model = process.env.LLM_MODEL || "deepseek-chat";

  const prompt = ageGroup
    ? `${SYSTEM_PROMPT}\n（宝宝当前处于 ${ageGroup} 阶段）\n\n问题：${question}`
    : `${SYSTEM_PROMPT}\n\n问题：${question}`;

  try {
    const resp = await fetch(`${baseURL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: question }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      return `🤖 机器人暂时不在线（${resp.status}），请稍后再试。`;
    }

    const data = await resp.json();
    return data.choices?.[0]?.message?.content || "抱歉，我没有理解这个问题，能换个方式问问吗？";
  } catch (e) {
    return "🤖 机器人暂时联系不上，请稍后再试。";
    }
}

// ===== Webhook 服务器 =====
if (require.main === module) {
  const http = require("http");
  const fs = require("fs");
  const path = require("path");
  const url = require("url");
  const port = process.env.PORT || process.env.BOT_PORT || 3000;
  const distDir = path.join(__dirname, "..", "dist");

  // ===== 静态文件 MIME 类型 =====
  const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
  };

  // ===== 伺服前端静态文件 =====
  function serveStatic(res, filePath) {
    const ext = path.extname(filePath);
    const contentType = MIME[ext] || "application/octet-stream";
    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
      return true;
    } catch {
      return false;
    }
  }

  const server = http.createServer(async (req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204); res.end();
      return;
    }

    const parsedUrl = url.parse(req.url, true);
    const requestPath = parsedUrl.pathname;

    // SPA fallback: 如果请求的是根路径或前端路由，返回 index.html
    const isApiRoute = requestPath === "/health" || requestPath === "/ask" || requestPath === "/webhook";
    if (!isApiRoute) {
      // 尝试按请求路径伺服文件
      const localPath = requestPath === "/" ? "/index.html" : requestPath;
      const filePath = path.join(distDir, localPath);
      if (serveStatic(res, filePath)) return;
      // 如果文件不存在（前端路由如 /favorites），回退到 index.html
      if (serveStatic(res, path.join(distDir, "index.html"))) return;
    }

    // ===== 健康检查 =====
    if (req.method === "GET" && requestPath === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", books: KNOWLEDGE_BOOKS.length }));
      return;
    }

    // ===== 问答接口 =====
    if (req.method === "POST" && requestPath === "/ask") {
      let body = "";
      req.on("data", chunk => body += chunk);
      req.on("end", async () => {
        try {
          const { question, ageGroup } = JSON.parse(body);
          if (!question) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "请提供问题" }));
            return;
          }
          const answer = await askBot(question, ageGroup);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ question, answer, ageGroup }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "请求格式错误" }));
        }
      });
      return;
    }

        // ===== 飞书/企微 Webhook =====
    if (req.method === "POST" && requestPath === "/webhook") {
      let rawBody = "";
      req.on("data", chunk => rawBody += chunk);
      req.on("end", async () => {
        try {
          const data = JSON.parse(rawBody);

          // 1. 飞书 URL 验证（配置回调地址时必须处理）
          if (data.type === "url_verification") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ challenge: data.challenge }));
            return;
          }

          // 2. 飞书事件回调格式
          let question = "";
          if (data.type === "event_callback" && data.event) {
            // 从 event.message.content 提取（格式：{"text":"@机器人 问题"}）
            try {
              const msgContent = JSON.parse(data.event.message?.content || "{}");
              question = msgContent.text || "";
            } catch {}
            // 或者直接从 event.text_without_at_bot 取
            if (!question) question = data.event.text_without_at_bot || data.event.text || "";
          }

          // 3. 兼容简单格式
          if (!question) {
            if (typeof data.text === "string") question = data.text;
            else if (data.text?.content) question = data.text.content;
            else if (typeof data.content === "string") question = data.content;
          }

          // 清理 @ 机器人的标记
          question = question.replace(/@[^\s]+\s*/g, "").trim();

          if (!question) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({}));
            return;
          }

          const answer = await askBot(question);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            msg_type: "text",
            content: JSON.stringify({ text: answer })
          }));
        } catch (e) {
          res.writeHead(200);
          res.end(JSON.stringify({}));
        }
      });
      return;
    }
          const answer = await askBot(question);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            msg_type: "text",
            content: JSON.stringify({ text: answer })
          }));
        } catch (e) {
          res.writeHead(200);
          res.end(JSON.stringify({}));
        }
      });
      return;
    }

    // ===== 404 =====
    res.writeHead(404);
    res.end("Not Found");
  });

  server.listen(port, () => {
    console.log("==============================================");
    console.log("  🌟 爱的养育 - AI育儿顾问");
    console.log("==============================================");
    console.log("  问答接口:   http://localhost:" + port + "/ask");
    console.log("  健康检查:   http://localhost:" + port + "/health");
    console.log("  Webhook:    http://localhost:" + port + "/webhook");
    console.log("  知识库:     " + KNOWLEDGE_BOOKS.length + " 本权威育儿书籍");
    console.log("  API:        " + (process.env.LLM_BASE_URL || "https://api.deepseek.com"));
    console.log("  模型:       " + (process.env.LLM_MODEL || "deepseek-chat"));
    console.log("==============================================");
    console.log("  提示：设置 LLM_API_KEY 环境变量来启用 AI");
    console.log("  或者用 OPENAI_API_KEY（兼容 OpenAI 格式）");
    console.log("==============================================");
  });
}

module.exports = { askBot, KNOWLEDGE_BOOKS, SYSTEM_PROMPT };