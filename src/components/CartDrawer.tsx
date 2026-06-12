import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCartContext } from "@/stores/CartContext";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } =
    useCartContext();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 flex flex-col transition-transform duration-300 ease-out",
          "bg-[hsl(var(--color-bg-elevated))] border-l border-[hsl(var(--color-border))]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--color-border))]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[hsl(var(--color-primary))]" />
            <h2 className="text-lg font-bold text-white">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-[hsl(var(--color-primary))] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[hsl(var(--color-surface))] transition-colors text-[hsl(var(--color-text-subtle))] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--color-surface))] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[hsl(var(--color-text-subtle))]" />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Your cart is empty</p>
                <p className="text-sm text-[hsl(var(--color-text-subtle))]">
                  Add some accessories to get started
                </p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                  <p className="text-xs text-[hsl(var(--color-text-subtle))] mb-2">{item.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[hsl(var(--color-primary))]">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-[hsl(var(--color-bg))] hover:bg-[hsl(var(--color-primary))/20] transition-colors"
                      >
                        <Minus className="w-3 h-3 text-white" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center bg-[hsl(var(--color-bg))] hover:bg-[hsl(var(--color-primary))/20] transition-colors"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 rounded flex items-center justify-center ml-1 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[hsl(var(--color-border))] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[hsl(var(--color-text-subtle))]">Subtotal</span>
              <span className="text-lg font-bold text-white">₦{totalPrice.toLocaleString()}</span>
            </div>
            <button
              className="w-full h-12 bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-hover))] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              onClick={() => {
                clearCart();
                setIsOpen(false);
              }}
            >
              Checkout — ₦{totalPrice.toLocaleString()}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-sm text-[hsl(var(--color-text-subtle))] hover:text-white transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
