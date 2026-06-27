import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = req.headers.get('x-admin-key') || searchParams.get('key');
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  try {
    const db = await getDb();
    const [rows] = await db.execute(`
      SELECT l.id, l.email, l.phone, l.callback_time, l.is_called, l.created_at,
             r.business_name, r.area, r.total_score, r.slug
      FROM leads l
      JOIN audit_reports r ON l.report_slug = r.slug
      ORDER BY l.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: '查詢失敗' }, { status: 500 });
  }
}
