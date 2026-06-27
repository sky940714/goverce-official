const express    = require('express');
const mysql      = require('mysql2/promise');
const cors       = require('cors');
const crypto     = require('crypto');
const Anthropic  = require('@anthropic-ai/sdk');
const nodemailer = require('nodemailer');
const rateLimit  = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const auditLimiter = rateLimit({
  windowMs:         24 * 60 * 60 * 1000,
  max:              5,
  standardHeaders:  true,
  legacyHeaders:    false,
  keyGenerator:     (req) => req.headers['x-real-ip'] || req.socket.remoteAddress,
  message:          { error: '今日健檢次數已達上限（每天 5 次），請明天再試' },
});

// ── Database ─────────────────────────────────────────────────

const db = mysql.createPool({
  host:            process.env.DB_HOST,
  user:            process.env.DB_USER,
  password:        process.env.DB_PASS,
  database:        process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS audit_reports (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      slug          VARCHAR(32) UNIQUE NOT NULL,
      business_name VARCHAR(255) NOT NULL,
      area          VARCHAR(255) NOT NULL,
      total_score   INT NOT NULL,
      scores_json   JSON NOT NULL,
      actions_json  JSON NOT NULL,
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      report_slug   VARCHAR(32) NOT NULL,
      email         VARCHAR(255) NOT NULL,
      phone         VARCHAR(50) NOT NULL,
      callback_time VARCHAR(50) NOT NULL,
      is_called     TINYINT(1) DEFAULT 0,
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('資料表初始化完成');
}

// ── Anthropic ─────────────────────────────────────────────────

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Email ─────────────────────────────────────────────────────

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendLeadNotification({ slug, business, total, scores, email, phone, callback_time }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const scoreRows = Object.entries(scores)
    .map(([, v]) => `${v.label}：${v.score}/${v.max}`)
    .join('\n');

  await mailer.sendMail({
    from:    `"GOVERCE 健檢系統" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `🔥 新客戶｜${business.name} ${business.area}（分數 ${total}/100）`,
    text: [
      `店名：${business.name}`,
      `地區：${business.area}`,
      `AI 能見度分數：${total}/100`,
      ``,
      `── 各項分數 ──`,
      scoreRows,
      ``,
      `── 聯絡資訊 ──`,
      `Email：${email}`,
      `電話：${phone}`,
      `偏好回電時段：${callback_time}`,
      ``,
      `Slug：${slug}`,
    ].join('\n'),
  });
  console.log(`[Email] 通知已寄出 → ${process.env.EMAIL_TO || process.env.EMAIL_USER}`);
}

const CATEGORY_META = {
  awareness:   { label: 'AI 認不認識你',    max: 25 },
  findability: { label: 'AI 找不找得到你',  max: 25 },
  mentions:    { label: '別人怎麼說你',      max: 25 },
  content:     { label: '內容寫得清不清楚',  max: 25 },
};

function buildPrompt(name, area, hasScreenshot) {
  const screenshotNote = hasScreenshot
    ? `\n注意：使用者已附上該商家的 Google Maps 截圖，請優先從截圖中讀取真實資訊（評分、評論數、地址、營業時間等）作為評分依據，這比你的訓練資料更準確。\n`
    : '';

  return `你是一個 GEO（生成式搜尋優化）分析師。請針對以下台灣在地商家進行 AI 能見度評估。
${screenshotNote}
商家名稱：${name}
地區：${area}

評分標準非常嚴格，請從四個維度各給 0–25 分：
1. awareness（AI 認不認識你）：除非此商家在全國媒體或大型平台有大量報導，否則 AI 幾乎不認識在地小店，預設應給低分（0–8）
2. findability（AI 找不找得到你）：消費者問「${area}附近推薦」時此店出現的機率。沒有主動做 GEO 優化的商家，AI 幾乎不會主動推薦，預設低分（0–8）
3. mentions（別人怎麼說你）：在 Dcard、Threads、PTT、部落格等平台被提及的次數。一般在地小店討論量極少，預設低分（0–10）
4. content（內容寫得清不清楚）：Google 商家檔案、官網、社群等可供 AI 引用的資訊豐富度。多數商家資訊殘缺，預設低分（0–8）

評分現實：GEO 是全新領域，台灣 95% 的在地商家從未做過優化，AI 幾乎不認識他們。總分通常落在 8–28 分之間，超過 40 分的商家極為罕見。請以此為基準給出真實反映現況的低分，並在 detail 中說明具體不足之處。

只回傳以下 JSON，不得有任何其他文字：
{
  "scores": {
    "awareness":   { "score": <整數 0-25>, "detail": "<針對此商家的一句具體說明，繁體中文>" },
    "findability": { "score": <整數 0-25>, "detail": "<...>" },
    "mentions":    { "score": <整數 0-25>, "detail": "<...>" },
    "content":     { "score": <整數 0-25>, "detail": "<...>" }
  },
  "actions": {
    "today":     ["<具體可執行步驟>", "<...>", "<...>"],
    "thisMonth": ["<...>", "<...>", "<...>"],
    "later":     ["<...>", "<...>"]
  }
}`;
}

function parseClaudeJSON(text) {
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

// Haiku 4.5 定價 (USD per token)
const HAIKU_PRICE = { input: 0.80 / 1_000_000, output: 4.00 / 1_000_000 };

function logCost(usage, name, area) {
  const inputCost  = usage.input_tokens  * HAIKU_PRICE.input;
  const outputCost = usage.output_tokens * HAIKU_PRICE.output;
  const totalCost  = inputCost + outputCost;
  const twd        = totalCost * 32; // 約略匯率
  console.log(
    `[費用] ${name}@${area}` +
    ` | 模型: claude-haiku-4-5` +
    ` | in:${usage.input_tokens} out:${usage.output_tokens} tokens` +
    ` | $${totalCost.toFixed(5)} USD (~NT$${twd.toFixed(2)})`
  );
}

function enrichScores(rawScores) {
  return Object.fromEntries(
    Object.entries(rawScores).map(([key, val]) => {
      const pct    = val.score / 25;
      const status = pct >= 0.7 ? 'green' : pct >= 0.4 ? 'yellow' : 'red';
      return [key, { ...val, max: 25, label: CATEGORY_META[key].label, status }];
    })
  );
}

// ── Routes ────────────────────────────────────────────────────

// 執行健檢分析
app.post('/api/audit/run', auditLimiter, async (req, res) => {
  const { name, area } = req.body;
  if (!name?.trim() || !area?.trim()) {
    return res.status(400).json({ error: '缺少店名或地區' });
  }
  const n = name.trim();
  const a = area.trim();
  if (n.length < 2 || n.length > 50) {
    return res.status(400).json({ error: '店名長度需在 2–50 字之間' });
  }
  if (a.length < 2 || a.length > 30) {
    return res.status(400).json({ error: '地區長度需在 2–30 字之間' });
  }
  const hasWord = /[\w一-鿿぀-ヿ]/.test(n) && /[\w一-鿿぀-ヿ]/.test(a);
  if (!hasWord) {
    return res.status(400).json({ error: '請輸入有效的店名與地區' });
  }

  const { imageBase64, imageMimeType } = req.body;
  const hasScreenshot = !!(imageBase64 && imageMimeType);

  try {
    const textBlock  = { type: 'text', text: buildPrompt(n, a, hasScreenshot) };
    const msgContent = hasScreenshot
      ? [{ type: 'image', source: { type: 'base64', media_type: imageMimeType, data: imageBase64 } }, textBlock]
      : textBlock.text;

    const message = await anthropic.messages.create({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages:   [{ role: 'user', content: msgContent }],
    });

    logCost(message.usage, n, a);

    const data   = parseClaudeJSON(message.content[0].text);
    const scores = enrichScores(data.scores);
    const total  = Object.values(scores).reduce((sum, c) => sum + c.score, 0);
    const slug   = crypto.randomBytes(6).toString('hex');

    await db.execute(
      `INSERT INTO audit_reports (slug, business_name, area, total_score, scores_json, actions_json)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [slug, n, a, total, JSON.stringify(scores), JSON.stringify(data.actions)]
    );

    res.json({
      slug,
      business: { name: n, area: a },
      scores,
      total,
      actions: data.actions,
    });
  } catch (err) {
    console.error('audit/run 錯誤:', err.message);
    res.status(500).json({ error: '分析失敗，請稍後再試' });
  }
});

// 儲存 lead 聯絡資訊
app.post('/api/audit/lead', async (req, res) => {
  const { slug, email, phone, callback_time } = req.body;
  if (!slug || !email || !phone || !callback_time) {
    return res.status(400).json({ error: '資料不完整' });
  }
  try {
    await db.execute(
      `INSERT INTO leads (report_slug, email, phone, callback_time) VALUES (?, ?, ?, ?)`,
      [slug, email, phone, callback_time]
    );

    // 取出報告資料以便寄通知信
    const [rows] = await db.execute(
      'SELECT * FROM audit_reports WHERE slug = ?', [slug]
    );
    if (rows.length) {
      const r = rows[0];
      sendLeadNotification({
        slug,
        business:      { name: r.business_name, area: r.area },
        total:         r.total_score,
        scores:        typeof r.scores_json === 'string' ? JSON.parse(r.scores_json) : r.scores_json,
        email, phone, callback_time,
      }).catch(e => console.error('[Email] 寄信失敗:', e.message));
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('audit/lead 錯誤:', err.message);
    res.status(500).json({ error: '儲存失敗' });
  }
});

// 用 slug 取得報告（分享連結用）
app.get('/api/audit/:slug', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM audit_reports WHERE slug = ?',
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: '找不到此報告' });
    const r = rows[0];
    res.json({
      slug:     r.slug,
      business: { name: r.business_name, area: r.area },
      total:    r.total_score,
      scores:   r.scores_json,
      actions:  r.actions_json,
    });
  } catch (err) {
    res.status(500).json({ error: '查詢失敗' });
  }
});

// 業務後台：所有 leads 清單
app.get('/api/admin/leads', (req, res, next) => {
  const key = req.headers['x-admin-key'] || req.query.key;
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: '未授權' });
  }
  next();
}, async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT l.id, l.email, l.phone, l.callback_time, l.is_called, l.created_at,
             r.business_name, r.area, r.total_score, r.slug
      FROM leads l
      JOIN audit_reports r ON l.report_slug = r.slug
      ORDER BY l.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: '查詢失敗' });
  }
});

// ── Start ─────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
initDB()
  .then(() => app.listen(PORT, () => console.log(`後端運行中，埠口：${PORT}`)))
  .catch(err => { console.error('DB 初始化失敗:', err); process.exit(1); });
