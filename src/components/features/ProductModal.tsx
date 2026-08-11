import { useEffect } from "react";
import { X, Star, ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { publishWorkflowEvent } from "@/lib/workflowosBridge";
import type { Product } from "@/types";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: Props) {
  useEffect(() => {
    if (!product) return;

    void publishWorkflowEvent("product.view", {
      product_id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
    });
  }, [product]);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[hsl(var(--color-bg-elevated))] border border-[hsl(var(--color-border))] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-[hsl(var(--color-surface))] hover:bg-[hsl(var(--color-border))] transition-colors text-[hsl(var(--color-text-subtle))] hover:text-white z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-72 flex-shrink-0 bg-[hsl(var(--color-bg))] rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 sm:h-full object-cover"
              />
              {discount && (
                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>

            <div className="flex-1 p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[hsl(var(--color-primary))] uppercase tracking-wider mb-1">
                  {product.brand}
                </p>
                <h2 className="text-xl font-bold text-white leading-snug">{product.name}</h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-[hsl(var(--color-border))]"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-[hsl(var(--color-text-subtle))]">
                  {product.rating} · {product.reviewCount.toLocaleString()} reviews
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[hsl(var(--color-text-subtle))] line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-sm text-[hsl(var(--color-text-subtle))] leading-relaxed">
                {product.description}
              </p>

              <div>
                <p className="text-xs font-semibold text-[hsl(var(--color-text-subtle))] uppercase tracking-wider mb-2">
                  Key Features
                </p>
                <ul className="space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white">
                      <Check className="w-4 h-4 text-[hsl(var(--color-primary))] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-[hsl(var(--color-text-subtle))] uppercase tracking-wider mb-2">
                  Compatible With
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.compatibility.map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] text-[hsl(var(--color-text-subtle))] px-2.5 py-1 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { onAddToCart(product); onClose(); }}
                className="w-full h-12 bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-hover))] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
