import { getDb } from '@/lib/db';
import { verifyNotify } from '@/lib/ecpay';
import { sendPdfEmail } from '@/lib/mailer';

function plainText(body) {
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}

export async function POST(req) {
  let fields;
  try {
    const formData = await req.formData();
    fields = Object.fromEntries(formData.entries());
  } catch {
    return plainText('0|Bad Request');
  }

  if (!verifyNotify(fields)) {
    console.error('checkout/notify 錯誤: CheckMacValue 不符', fields.MerchantTradeNo);
    return plainText('0|CheckMacValue Error');
  }

  const merchantTradeNo = fields.MerchantTradeNo;
  if (!merchantTradeNo) {
    return plainText('0|Missing MerchantTradeNo');
  }

  try {
    const db = await getDb();
    const [rows] = await db.execute(
      'SELECT * FROM uber_eats_orders WHERE merchant_trade_no = ?',
      [merchantTradeNo]
    );
    if (!rows.length) {
      console.error('checkout/notify 錯誤: 找不到訂單', merchantTradeNo);
      return plainText('0|Order Not Found');
    }

    const order = rows[0];

    if (order.status === 'paid') {
      // 綠界可能重送通知，已處理過的訂單直接視為成功，不重寄信
      return plainText('1|OK');
    }

    if (fields.RtnCode !== '1') {
      await db.execute(
        `UPDATE uber_eats_orders SET status = 'failed', raw_notify_json = ? WHERE merchant_trade_no = ?`,
        [JSON.stringify(fields), merchantTradeNo]
      );
      return plainText('1|OK');
    }

    await db.execute(
      `UPDATE uber_eats_orders
       SET status = 'paid', paid_at = NOW(), ecpay_trade_no = ?, raw_notify_json = ?
       WHERE merchant_trade_no = ?`,
      [fields.TradeNo || null, JSON.stringify(fields), merchantTradeNo]
    );

    try {
      await sendPdfEmail({ to: order.buyer_email, name: order.buyer_name });
      await db.execute(
        `UPDATE uber_eats_orders SET pdf_sent = 1 WHERE merchant_trade_no = ?`,
        [merchantTradeNo]
      );
    } catch (mailErr) {
      console.error('checkout/notify 寄送 PDF 失敗:', merchantTradeNo, mailErr.message);
    }

    return plainText('1|OK');
  } catch (err) {
    console.error('checkout/notify 錯誤:', err.message);
    return plainText('0|Server Error');
  }
}
