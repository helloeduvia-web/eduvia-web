import crypto from 'node:crypto';

const json = (res, status, body) => {
  res.status(status).setHeader('Content-Type','application/json');
  res.end(JSON.stringify(body));
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { message: 'Method not allowed.' });
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return json(res, 500, { message: 'Razorpay is not configured on the server yet.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const receipt = `eduvia_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 10000,
        currency: 'INR',
        receipt,
        notes: { product: 'Eduvia Full Report', source: 'student-assessment' }
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.id) {
      return json(res, response.status || 502, { message: data?.error?.description || 'Razorpay order creation failed.' });
    }
    return json(res, 200, { keyId, orderId: data.id, amount: data.amount, currency: data.currency });
  } catch (error) {
    return json(res, 500, { message: error?.message || 'Unable to create Razorpay order.' });
  }
}
