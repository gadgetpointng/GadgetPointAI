type WorkflowEventType =
  | "storefront.search"
  | "product.view"
  | "cart.added";

const WORKFLOWOS_SUPABASE_URL = "https://hasnhivdrpeqytgdnkzo.supabase.co";
const WORKFLOWOS_PUBLISHABLE_KEY = "sb_publishable_WKi2bBi_tIIYDFia3R-kLQ_81Fo2FDk";
const WORKFLOWOS_BRIDGE_URL = `${WORKFLOWOS_SUPABASE_URL}/functions/v1/gadgetpoint-workflowos-bridge`;

export async function publishWorkflowEvent(
  type: WorkflowEventType,
  data: Record<string, unknown>,
) {
  try {
    const response = await fetch(WORKFLOWOS_BRIDGE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: WORKFLOWOS_PUBLISHABLE_KEY,
        authorization: `Bearer ${WORKFLOWOS_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        type,
        occurred_at: new Date().toISOString(),
        data,
      }),
    });

    if (!response.ok) {
      console.warn("WorkflowOS event was not delivered", response.status);
    }
  } catch (error) {
    console.warn("WorkflowOS bridge unavailable", error);
  }
}
