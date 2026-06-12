import { Star, ShoppingCart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  featured?: boolean;
}

const BADGE_COLORS: Record<string, string> = {
  blue: "bg-[hsl(var(--color-primary))] text-white",
  cyan: "bg-cyan-500 text-white",
  green: "bg-emerald-500 text-white",
  purple: "bg-purple-500 text-white",
};

export default function ProductCard({ product, onAddToCart, onViewDetails, featured }: Props) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      className={cn(
        "group relative glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)]",
        featured && "lg:flex-row"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-[hsl(var(--color-bg-elevated))]",
          featured ? "lg:w-56 lg:flex-shrink-0 aspect-square lg:aspect-auto" : "aspect-square"
        )}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full",
              BADGE_COLORS[product.badgeColor || "blue"]
            )}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div>
          <p className="text-[10px] font-semibold text-[hsl(var(--color-primary))] uppercase tracking-wider mb-0.5">
            {product.brand}
          </p>
          <h3
            className="font-semibold text-white text-sm leading-snug cursor-pointer hover:text-[hsl(var(--color-primary))] transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-[hsl(var(--color-border))]"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-[hsl(var(--color-text-subtle))]">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {featured && (
          <p className="text-xs text-[hsl(var(--color-text-subtle))] leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-white">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-[hsl(var(--color-text-subtle))] line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-hover))] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 active:scale-95 min-h-[36px]"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
