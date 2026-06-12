import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartContext } from "@/stores/CartContext";

export default function Header() {
  const location = useLocation();
  const { totalItems, setIsOpen } = useCartContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-bg))]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="https://cdn-ai.onspace.ai/onspace/project/uploads/dsNRTrgARuubcGeQYHrug9/3fbcce59-fb93-4075-aa15-940b76386871.png"
            alt="GadgetPoint"
            className="h-8 w-auto"
          />
          <div className="hidden sm:block">
            <p className="text-[10px] font-medium text-[hsl(var(--color-text-subtle))] uppercase tracking-widest">
              Phone Accessories
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`text-sm px-3 py-2 rounded-lg transition-colors ${
              location.pathname === "/"
                ? "text-white font-semibold"
                : "text-[hsl(var(--color-text-subtle))] hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`text-sm px-3 py-2 rounded-lg transition-colors ${
              location.pathname === "/products"
                ? "text-white font-semibold"
                : "text-[hsl(var(--color-text-subtle))] hover:text-white"
            }`}
          >
            Shop
          </Link>

          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative ml-2 flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] hover:border-[hsl(var(--color-primary))/50] transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[hsl(var(--color-primary))] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
