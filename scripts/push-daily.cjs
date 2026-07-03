const fs = require("fs");
const path = require("path");
const https = require("https");

// === Read cards ===
const ts = fs.readFileSync(path.join(__dirname, "..", "src", "data", "cards.ts"), "utf8").replace(/\r/g, "");
const startIdx = ts.indexOf("export const cards: Card[] = [");
const endIdx = ts.indexOf("export function", startIdx);
if (startIdx === -1 || endIdx === -1) { console.error("Could not find cards"); process.exit(1); }

let arrStr = ts.substring(startIdx, endIdx).replace("export const cards: Card[] = ", "").trim();
arrStr = arrStr.replace(/:\s*(string|CategoryId|AgeGroupId|boolean)\b/g, "").replace(/\?\s*:\s*string\b/g, "");
let cards;
try { cards = eval(arrStr); } catch (e) { console.error("Parse error:", e.message); process.exit(1); }
if (!cards || cards.length === 0) { console.error("No cards"); process.exit(1); }

function getDaySeed() {
  const d = new Date();
  const s = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - s.getTime()) / 86400000);
}
function pickCards(list, n) {
  const seed = getDaySeed();
  return [...list].sort((a, b) => {
    const ha = (seed * 31 + a.id.charCodeAt(0) * 7 + a.id.charCodeAt(a.id.length - 1) * 13) % 1000;
    const hb = (seed * 31 + b.id.charCodeAt(0) * 7 + b.id.charCodeAt(b.id.length - 1) * 13) % 1000;
    return ha - hb;
  }).slice(0, n);
}

const weekDays = ["日","一","二","三","四","五","六"];
const now = new Date();
const dateStr = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 星期${weekDays[now.getDay()]}`;

// Format card content for push (extract bullet points for richer content)
function formatContent(content) {
  const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
  // 保留原文结构：段落文字和要点按原顺序排列
  return lines.map(line => {
    if (line.startsWith("•") || line.startsWith("-")) {
      return "▸ " + line.replace(/^[•\-]\s*/, "");
    }
    return line;
  }).join("\n");
}

// === Age groups ===
const groups = [
  { id: "0-6",   label: "0-6个月",   feishu: "FEISHU_WEBHOOK_0_6",   wechat: "WECHAT_WEBHOOK_0_6" },
  { id: "6-12",  label: "6-12个月",  feishu: "FEISHU_WEBHOOK_6_12",  wechat: "WECHAT_WEBHOOK_6_12" },
  { id: "12-18", label: "1-1.5岁", feishu: "FEISHU_WEBHOOK_1_1_5", wechat: "WECHAT_WEBHOOK_1_1_5" },
  { id: "1.5-2", label: "1.5-2岁",  feishu: "FEISHU_WEBHOOK_1_5_2", wechat: "WECHAT_WEBHOOK_1_5_2" },
  { id: "2-3",   label: "2-3岁",    feishu: "FEISHU_WEBHOOK_2_3",   wechat: "WECHAT_WEBHOOK_2_3" },
];

function send(url, payload, label) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = https.request(url, { method: "POST", headers: { "Content-Type": "application/json" } }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        console.log(`[${label}] ${res.statusCode}`);
        if (res.statusCode >= 400) console.error("  Response:", data);
        resolve();
      });
    });
    req.on("error", e => { console.error(`[${label}] Error:`, e.message); resolve(); });
    req.write(body);
    req.end();
  });
}

// Send 1 card per group (with richer content)
async function main() {
  let anySent = false;
  for (const g of groups) {
    const groupCards = cards.filter(c => c.ageGroup === g.id);
    if (groupCards.length === 0) continue;
    const picked = pickCards(groupCards, 1);
    const c = picked[0];
    const body = formatContent(c.content);

    // === Feishu format ===
    const feishuUrl = process.env[g.feishu];
    if (feishuUrl) {
      anySent = true;
      const feishuMsg = {
        msg_type: "interactive",
        card: {
          header: { title: { tag: "plain_text", content: `👶 ${g.label} · 今日育儿知识` } },
          elements: [
            { tag: "markdown", content: `**${dateStr}**\n\n**${c.title}**\n${c.summary}` },
            { tag: "hr" },
            { tag: "markdown", content: `**📖 知识卡片**\n${body}${c.quote ? `\n\n**📝 书中原文**\n${c.quote}` : ""}\n\n**📚 参考来源**\n${c.source || ""}${c.tip ? `\n\n💡 **温馨提示**\n${c.tip}` : ""}` },
            { tag: "hr" },
            
            { tag: "note", elements: [{ tag: "plain_text", content: "爱的养育 · 每天陪你学一点育儿知识" }] }
          ]
        }
      };
      await send(feishuUrl, feishuMsg, g.label + "(飞书)");
    }

    // === WeChat Work format ===
    const wechatUrl = process.env[g.wechat];
    if (wechatUrl) {
      anySent = true;
      const wechatMsg = {
        msgtype: "markdown",
        markdown: {
          content: `**👶 ${g.label} · 今日育儿知识**\n${dateStr}\n---\n## ${c.title}\n${c.summary}\n\n**📖 知识卡片**\n> ${body.replace(/\n/g, "\n> ")}${c.quote ? `\n\n> **📝 书中原文**\n> ${c.quote.replace(/\n/g, "\n> ")}` : ""}\n---\n> 📚 ${c.source || ""}${c.tip ? `\n> 💡 ${c.tip}` : ""}\n\n💡 爱的养育 · 每天陪你学一点育儿知识`
        }
      };
      await send(wechatUrl, wechatMsg, g.label + "(微信)");
    }
  }

  if (!anySent) {
    console.log("No webhooks configured. Set env vars like:");
    console.log("  FEISHU_WEBHOOK_0_6 or WECHAT_WEBHOOK_0_6");
    console.log("\nSample push content:");
    const sample = pickCards(cards.filter(c => c.ageGroup === "0-6"), 1)[0];
    console.log(JSON.stringify({ title: sample.title, summary: sample.summary, content_sample: formatContent(sample.content).substring(0, 200), source: sample.source }, null, 2));
  }
}

main().catch(e => { console.error(e); process.exit(1); });
