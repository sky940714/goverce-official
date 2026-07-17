import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { getCheckoutEndpoint, buildAioCheckoutPayload } from '@/lib/ecpay';

export async function POST(req) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip, 'checkout', { max: 10 });
  if (!rl.allowed) {
    return NextResponse.json({ error: '請求過於頻繁，請稍後再試' }, { status: 429 });
  }

  let body;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: '無效的請求格式' }, { status: 400 });
  }

  const { name, email, phone } = body;
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: '缺少姓名或 Email' }, { status: 400 });
  }
  const n = name.trim();
  const e = email.trim();
  const p = phone?.trim() || null;

  if (n.length < 2 || n.length > 100) {
    return NextResponse.json({ error: '姓名長度需在 2–100 字之間' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return NextResponse.json({ error: '請輸入有效的 Email' }, { status: 400 });
  }

  const amount = parseInt(process.env.UBER_EATS_PRICE, 10);
  if (!amount || amount <= 0) {
    console.error('checkout/create 錯誤: UBER_EATS_PRICE 未設定');
    return NextResponse.json({ error: '目前無法建立訂單，請稍後再試' }, { status: 500 });
  }

  const merchantTradeNo = ('UE' + Date.now().toString(36) + crypto.randomBytes(2).toString('hex'))
    .toUpperCase()
    .slice(0, 20);

  try {
    const db = await getDb();
    await db.execute(
      `INSERT INTO uber_eats_orders (merchant_trade_no, buyer_name, buyer_email, buyer_phone, amount) VALUES (?, ?, ?, ?, ?)`,
      [merchantTradeNo, n, e, p, amount]
    );

    const siteUrl = process.env.SITE_URL;
    const params = buildAioCheckoutPayload({
      merchantTradeNo,
      totalAmount: amount,
      itemName: 'Uber Eats 商家行銷下廣告 PDF 指南',
      tradeDesc: 'Uber Eats 商家行銷下廣告 PDF 指南',
      returnURL: `${siteUrl}/api/checkout/notify`,
      clientBackURL: `${siteUrl}/uber-eats-ads/success?trade_no=${merchantTradeNo}`,
    });

    return NextResponse.json({ action: getCheckoutEndpoint(), params });
  } catch (err) {
    console.error('checkout/create 錯誤:', err.message);
    return NextResponse.json({ error: '建立訂單失敗，請稍後再試' }, { status: 500 });
  }
}
