import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { sendLeadNotification } from '@/lib/mailer';

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: '無效的請求格式' }, { status: 400 });
  }

  const { slug, email, phone, callback_time } = body;
  if (!slug || !email || !phone || !callback_time) {
    return NextResponse.json({ error: '資料不完整' }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db.execute(
      `INSERT INTO leads (report_slug, email, phone, callback_time) VALUES (?, ?, ?, ?)`,
      [slug, email, phone, callback_time]
    );

    const [rows] = await db.execute('SELECT * FROM audit_reports WHERE slug = ?', [slug]);
    if (rows.length) {
      const r = rows[0];
      sendLeadNotification({
        slug,
        business: { name: r.business_name, area: r.area },
        total:    r.total_score,
        scores:   typeof r.scores_json === 'string' ? JSON.parse(r.scores_json) : r.scores_json,
        email, phone, callback_time,
      }).catch(e => console.error('[Email] 寄信失敗:', e.message));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('audit/lead 錯誤:', err.message);
    return NextResponse.json({ error: '儲存失敗' }, { status: 500 });
  }
}
