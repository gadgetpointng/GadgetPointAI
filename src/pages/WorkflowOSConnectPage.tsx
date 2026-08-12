import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const WORKFLOWOS_HANDOFF_URL =
  "https://workflow.gadgetpoint.ng/auth/gadgetpoint/browser-handoff";

export default function WorkflowOSConnectPage() {
  const [status, setStatus] = useState("Checking your GadgetPoint session…");
  const [canRetry, setCanRetry] = useState(false);

  const continueToWorkflowOS = async () => {
    setCanRetry(false);
    setStatus("Checking your GadgetPoint session…");

    const { data, error } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (error || !token) {
      setStatus(
        "No active GadgetPoint session was found. Sign in to GadgetPoint Admin first, then return to this page."
      );
      setCanRetry(true);
      return;
    }

    setStatus("Secure session found. Opening WorkflowOS…");

    const form = document.createElement("form");
    form.method = "POST";
    form.action = WORKFLOWOS_HANDOFF_URL;
    form.style.display = "none";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token";
    input.value = token;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    void continueToWorkflowOS();
  }, []);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white">
          W
        </div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
          Secure GadgetPoint handoff
        </div>
        <h1 className="mt-3 text-3xl font-black text-white">Opening WorkflowOS</h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">{status}</p>

        {canRetry && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href="/admin"
              className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white hover:bg-white/5"
            >
              Open GadgetPoint Admin
            </a>
            <button
              type="button"
              onClick={() => void continueToWorkflowOS()}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500"
            >
              Try again
            </button>
          </div>
        )}

        <p className="mt-6 text-xs leading-5 text-slate-500">
          Your GadgetPoint password stays with GadgetPoint. Only the current signed session is verified, and WorkflowOS creates its own separate session.
        </p>
      </section>
    </main>
  );
}
