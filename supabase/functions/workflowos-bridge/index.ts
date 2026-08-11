import { corsHeaders } from "../_shared/cors.ts";

const ALLOWED_EVENT_TYPES = new Set([
  "storefront.search",
  "product.view",
  "cart.added",
  "marketplace.demand",
  "whatsapp.inquiry",
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const bridgeId = Deno.env.get("WORKFLOWOS_GADGETPOINT_BRIDGE_ID");
  const bridgeSecret = Deno.env.get("WORKFLOWOS_GADGETPOINT_BRIDGE_SECRET");
  const workflowosUrl = (Deno.env.get("WORKFLOWOS_BASE_URL") || "https://workflowos-nine.vercel.app").replace(/\/$/, "");

  if (!bridgeId || !bridgeSecret) {
    return new Response(JSON.stringify({ error: "WorkflowOS bridge is not configured" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const type = String(body.type || "").trim();
  if (!ALLOWED_EVENT_TYPES.has(type)) {
    return new Response(JSON.stringify({ error: "Unsupported storefront bridge event" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const event = {
    id: typeof body.id === "string" && body.id ? body.id : crypto.randomUUID(),
    type,
    occurred_at: typeof body.occurred_at === "string" && body.occurred_at
      ? body.occurred_at
      : new Date().toISOString(),
    data: body.data && typeof body.data === "object" ? body.data : {},
  };

  try {
    const upstream = await fetch(`${workflowosUrl}/api/bridge/gadgetpoint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-gadgetpoint-bridge-id": bridgeId,
        Authorization: `Bearer ${bridgeSecret}`,
      },
      body: JSON.stringify(event),
    });

    const text = await upstream.text();
    return new Response(text || JSON.stringify({ ok: upstream.ok }), {
      status: upstream.status,
      headers: { ...corsHeaders, "Content-Type": upstream.headers.get("content-type") || "application/json" },
    });
  } catch (error) {
    console.error("WorkflowOS bridge relay failed", error);
    return new Response(JSON.stringify({ error: "WorkflowOS bridge unavailable" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
