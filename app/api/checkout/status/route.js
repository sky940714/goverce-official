import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function GET(req) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip, 'checkout-status', { max: 60, windowMs: 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: '請求過於頻繁' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const tradeNo = searchParams.get('trade_no');
  if (!tradeNo) {
    return NextResponse.json({ error: '缺少 trade_no' }, { status: 400 });
  }

  try {
    const db = await getDb();
    const [rows] = await db.execute(
      'SELECT status, pdf_sent FROM uber_eats_orders WHERE merchant_trade_no = ?',
      [tradeNo]
    );
    if (!rows.length) {
      return NextResponse.json({ error: '找不到訂單' }, { status: 404 });
    }

    return NextResponse.json({ status: rows[0].status, pdf_sent: !!rows[0].pdf_sent });
  } catch (err) {
    console.error('checkout/status 錯誤:', err.message);
    return NextResponse.json({ error: '查詢失敗' }, { status: 500 });
  }
}
