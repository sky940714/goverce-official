import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export async function sendLeadNotification({ slug, business, total, scores, email, phone, callback_time }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const scoreRows = Object.entries(scores)
    .map(([, v]) => `${v.label}：${v.score}/${v.max}`)
    .join('\n');

  await mailer.sendMail({
    from:    `"GOVERCE 健檢系統" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `🔥 新客戶｜${business.name} ${business.area}（分數 ${total}/100）`,
    text: [
      `店名：${business.name}`, `地區：${business.area}`,
      `AI 能見度分數：${total}/100`, ``,
      `── 各項分數 ──`, scoreRows, ``,
      `── 聯絡資訊 ──`, `Email：${email}`, `電話：${phone}`,
      `偏好回電時段：${callback_time}`, ``, `Slug：${slug}`,
    ].join('\n'),
  });
}

export async function sendPdfEmail({ to, name }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER/EMAIL_PASS not configured');
  }
  if (!process.env.UBER_EATS_PDF_PATH) {
    throw new Error('UBER_EATS_PDF_PATH not configured');
  }

  await mailer.sendMail({
    from:    `"GOVERCE" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Uber Eats 商家行銷下廣告指南 — 感謝購買',
    text: [
      `${name} 您好，`, ``,
      `感謝購買「Uber Eats 商家行銷下廣告指南」，完整內容已作為附件夾帶於本信件中，請直接下載閱讀。`, ``,
      `如有任何問題，歡迎直接回覆這封信與我們聯繫。`, ``,
      `GOVERCE 敬上`,
    ].join('\n'),
    attachments: [
      {
        filename: 'Uber-Eats-商家行銷下廣告指南.pdf',
        path: process.env.UBER_EATS_PDF_PATH,
      },
    ],
  });
}
