import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "@/stores/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/CartDrawer";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import { publishWorkflowEvent } from "@/lib/workflowosBridge";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-[hsl(var(--color-text-subtle))] mb-6">Page not found</p>
        <a href="/" className="text-[hsl(var(--color-primary))] hover:underline">
          Go home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const heartbeatKey = "workflowos:gadgetpoint-site-heartbeat:v1";

    try {
      if (window.sessionStorage.getItem(heartbeatKey)) return;
      window.sessionStorage.setItem(heartbeatKey, new Date().toISOString());
    } catch {
      // Session storage can be unavailable in restrictive browser modes.
    }

    void publishWorkflowEvent("site.heartbeat", {
      name: "GadgetPoint Storefront",
      slug: "gadgetpoint-storefront",
      site_type: "commerce",
      domain: window.location.hostname,
      capabilities: ["events"],
    });
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(215 40% 10%)",
              border: "1px solid hsl(215 30% 18%)",
              color: "white",
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  );
}
