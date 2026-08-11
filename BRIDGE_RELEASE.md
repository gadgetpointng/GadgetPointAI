# WorkflowOS bridge release

GadgetPoint storefront events are forwarded to the live WorkflowOS Supabase relay. The storefront uses only a publishable Supabase key; the private GadgetPoint bridge credential remains server-side in the WorkflowOS project.

Validated events:
- product.view
- cart.added
- storefront.search

The storefront production build passed on branch `workflowos-bridge-secure` before release.
