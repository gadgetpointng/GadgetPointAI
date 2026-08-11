import { supabase } from "@/lib/supabase";

type WorkflowEventType =
  | "storefront.search"
  | "product.view"
  | "cart.added"
  | "marketplace.demand"
  | "whatsapp.inquiry";

export async function publishWorkflowEvent(
  type: WorkflowEventType,
  data: Record<string, unknown>,
) {
  try {
    const { error } = await supabase.functions.invoke("workflowos-bridge", {
      body: {
        type,
        occurred_at: new Date().toISOString(),
        data,
      },
    });

    if (error) {
      console.warn("WorkflowOS event was not delivered", error.message);
    }
  } catch (error) {
    console.warn("WorkflowOS bridge unavailable", error);
  }
}
