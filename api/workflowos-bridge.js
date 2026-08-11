const ALLOWED_EVENT_TYPES = new Set([
  'storefront.search',
  'product.view',
  'cart.added',
  'marketplace.demand',
  'whatsapp.inquiry',
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bridgeId = process.env.WORKFLOWOS_GADGETPOINT_BRIDGE_ID;
  const bridgeSecret = process.env.WORKFLOWOS_GADGETPOINT_BRIDGE_SECRET;
  const workflowosUrl = (process.env.WORKFLOWOS_BASE_URL || 'https://workflowos-nine.vercel.app').replace(/\/$/, '');

  if (!bridgeId || !bridgeSecret) {
    return res.status(503).json({ error: 'WorkflowOS bridge is not configured' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const type = String(body.type || '').trim();

  if (!ALLOWED_EVENT_TYPES.has(type)) {
    return res.status(400).json({ error: 'Unsupported storefront bridge event' });
  }

  const event = {
    id: body.id || globalThis.crypto?.randomUUID?.() || `gp_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    type,
    occurred_at: body.occurred_at || new Date().toISOString(),
    data: body.data && typeof body.data === 'object' ? body.data : {},
  };

  try {
    const upstream = await fetch(`${workflowosUrl}/api/bridge/gadgetpoint`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-gadgetpoint-bridge-id': bridgeId,
        authorization: `Bearer ${bridgeSecret}`,
      },
      body: JSON.stringify(event),
    });

    const text = await upstream.text();
    let payload;
    try { payload = JSON.parse(text); } catch { payload = { message: text }; }

    return res.status(upstream.status).json(payload);
  } catch (error) {
    console.error('WorkflowOS bridge relay failed', error);
    return res.status(502).json({ error: 'WorkflowOS bridge unavailable' });
  }
}
