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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return json(res, 400, { message: 'Incomplete Razorpay payment response.' });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const orderResponse = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`, {
      headers: { Authorization: `Basic ${auth}` }
    });
    const order = await orderResponse.json().catch(() => ({}));
    if (!orderResponse.ok || !order?.id) return json(res, 400, { message: 'Unable to verify the Razorpay order.' });
    if (order.amount !== 10000 || order.currency !== 'INR') return json(res, 400, { message: 'Payment order amount or currency is invalid.' });

    const expected = crypto.createHmac('sha256', keySecret)
      .update(`${order.id}|${razorpay_payment_id}`)
      .digest('hex');
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(String(razorpay_signature), 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return json(res, 400, { message: 'Payment signature verification failed.' });
    }

    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpay_payment_id)}`, {
      headers: { Authorization: `Basic ${auth}` }
    });
    const payment = await paymentResponse.json().catch(() => ({}));
    if (!paymentResponse.ok || payment.order_id !== order.id || payment.amount !== 10000 || payment.currency !== 'INR') {
      return json(res, 400, { message: 'Payment details could not be confirmed.' });
    }
    if (!['captured','authorized'].includes(payment.status)) {
      return json(res, 400, { message: `Payment is not confirmed yet (status: ${payment.status || 'unknown'}).` });
    }

    return json(res, 200, { verified: true, paymentId: payment.id, orderId: order.id, status: payment.status });
  } catch (error) {
    return json(res, 500, { message: error?.message || 'Unable to verify Razorpay payment.' });
  }
}
