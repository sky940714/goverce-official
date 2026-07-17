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
    const [rows] = await db.execute(
      'SELECT * FROM uber_eats_orders ORDER BY created_at DESC'
    );
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: '查詢失敗' }, { status: 500 });
  }
}
