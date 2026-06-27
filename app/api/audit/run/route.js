import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb } from '@/lib/db';
import { anthropic } from '@/lib/anthropic';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { buildPrompt, parseClaudeJSON, enrichScores, logCost } from '@/lib/audit';

export async function POST(req) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: '今日健檢次數已達上限（每天 5 次），請明天再試' },
      { status: 429 }
    );
  }

  let body;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: '無效的請求格式' }, { status: 400 });
  }

  const { name, area, imageBase64, imageMimeType } = body;
  if (!name?.trim() || !area?.trim()) {
    return NextResponse.json({ error: '缺少店名或地區' }, { status: 400 });
  }
  const n = name.trim();
  const a = area.trim();
  if (n.length < 2 || n.length > 50) return NextResponse.json({ error: '店名長度需在 2–50 字之間' }, { status: 400 });
  if (a.length < 2 || a.length > 30) return NextResponse.json({ error: '地區長度需在 2–30 字之間' }, { status: 400 });
  if (!/[\w一-鿿぀-ヿ]/.test(n) || !/[\w一-鿿぀-ヿ]/.test(a)) {
    return NextResponse.json({ error: '請輸入有效的店名與地區' }, { status: 400 });
  }

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

    const db = await getDb();
    await db.execute(
      `INSERT INTO audit_reports (slug, business_name, area, total_score, scores_json, actions_json) VALUES (?, ?, ?, ?, ?, ?)`,
      [slug, n, a, total, JSON.stringify(scores), JSON.stringify(data.actions)]
    );

    return NextResponse.json({ slug, business: { name: n, area: a }, scores, total, actions: data.actions });
  } catch (err) {
    console.error('audit/run 錯誤:', err.message);
    return NextResponse.json({ error: '分析失敗，請稍後再試' }, { status: 500 });
  }
}
