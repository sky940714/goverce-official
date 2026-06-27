import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req, { params }) {
  try {
    const db = await getDb();
    const [rows] = await db.execute('SELECT * FROM audit_reports WHERE slug = ?', [params.slug]);
    if (!rows.length) return NextResponse.json({ error: '找不到此報告' }, { status: 404 });
    const r = rows[0];
    return NextResponse.json({
      slug:     r.slug,
      business: { name: r.business_name, area: r.area },
      total:    r.total_score,
      scores:   r.scores_json,
      actions:  r.actions_json,
    });
  } catch {
    return NextResponse.json({ error: '查詢失敗' }, { status: 500 });
  }
}
