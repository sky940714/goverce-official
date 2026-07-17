import crypto from 'crypto';

const ECPAY_ENDPOINTS = {
  test: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
  production: 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5',
};

export function getCheckoutEndpoint() {
  return ECPAY_ENDPOINTS[process.env.ECPAY_ENV] || ECPAY_ENDPOINTS.test;
}

function ecpayUrlEncode(str) {
  return encodeURIComponent(str)
    .replace(/%20/g, '+')
    .replace(/%2d/gi, '-')
    .replace(/%5f/gi, '_')
    .replace(/%2e/gi, '.')
    .replace(/%21/gi, '!')
    .replace(/%2a/gi, '*')
    .replace(/%28/gi, '(')
    .replace(/%29/gi, ')');
}

export function buildCheckMacValue(params) {
  const hashKey = process.env.ECPAY_HASH_KEY;
  const hashIV = process.env.ECPAY_HASH_IV;

  const sortedKeys = Object.keys(params)
    .filter((k) => k !== 'CheckMacValue')
    .sort();

  const joined = sortedKeys.map((k) => `${k}=${params[k]}`).join('&');
  const wrapped = `HashKey=${hashKey}&${joined}&HashIV=${hashIV}`;
  const encoded = ecpayUrlEncode(wrapped).toLowerCase();

  return crypto.createHash('sha256').update(encoded).digest('hex').toUpperCase();
}

function formatTaipeiDate(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type).value;
  return `${get('year')}/${get('month')}/${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
}

export function buildAioCheckoutPayload({
  merchantTradeNo,
  totalAmount,
  itemName,
  tradeDesc,
  returnURL,
  clientBackURL,
}) {
  const params = {
    MerchantID: process.env.ECPAY_MERCHANT_ID,
    MerchantTradeNo: merchantTradeNo,
    MerchantTradeDate: formatTaipeiDate(new Date()),
    PaymentType: 'aio',
    TotalAmount: String(totalAmount),
    TradeDesc: tradeDesc,
    ItemName: itemName,
    ReturnURL: returnURL,
    ChoosePayment: 'Credit',
    ClientBackURL: clientBackURL,
    EncryptType: '1',
  };

  params.CheckMacValue = buildCheckMacValue(params);
  return params;
}

export function verifyNotify(fields) {
  const received = fields.CheckMacValue;
  if (!received) return false;
  const expected = buildCheckMacValue(fields);
  return expected === String(received).toUpperCase();
}
