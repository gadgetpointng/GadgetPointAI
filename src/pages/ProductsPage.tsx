import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/types";
import ProductCard from "@/components/features/ProductCard";
import ProductModal from "@/components/features/ProductModal";
import { useCartContext } from "@/stores/CartContext";
import { publishWorkflowEvent } from "@/lib/workflowosBridge";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCartContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const lastPublishedSearch = useRef("");
  const activeCategory = searchParams.get("category") || "all";

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [activeCategory, search, sort]);

  useEffect(() => {
    const query = search.trim().replace(/\s+/g, " ");
    if (query.length < 2) {
      if (!query) lastPublishedSearch.current = "";
      return;
    }

    const signalKey = `${activeCategory}:${query.toLowerCase()}`;
    const timer = window.setTimeout(() => {
      if (lastPublishedSearch.current === signalKey) return;
      lastPublishedSearch.current = signalKey;

      void publishWorkflowEvent("storefront.search", {
        query,
        category: activeCategory === "all" ? null : activeCategory,
        result_count: filtered.length,
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [activeCategory, filtered.length, search]);

  const setCategory = (id: string) => {
    if (id === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", id);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Phone Accessories</h1>
          <p className="text-[hsl(var(--color-text-subtle))] text-sm mt-1">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--color-text-subtle))]" />
            <input
              type="text"
              placeholder="Search accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-9 bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-xl text-sm text-white placeholder-[hsl(var(--color-text-subtle))] focus:outline-none focus:border-[hsl(var(--color-primary))] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--color-text-subtle))] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--color-text-subtle))] pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 pl-9 pr-4 bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-xl text-sm text-white focus:outline-none focus:border-[hsl(var(--color-primary))] transition-colors appearance-none cursor-pointer min-w-[180px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[hsl(var(--color-bg))]">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                activeCategory === cat.id
                  ? "bg-[hsl(var(--color-primary))] border-[hsl(var(--color-primary))] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "bg-[hsl(var(--color-surface))] border-[hsl(var(--color-border))] text-[hsl(var(--color-text-subtle))] hover:text-white hover:border-[hsl(var(--color-primary))/40]"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--color-surface))] flex items-center justify-center text-3xl">
              🔍
            </div>
            <div>
              <p className="text-white font-semibold mb-1">No products found</p>
              <p className="text-sm text-[hsl(var(--color-text-subtle))]">
                Try a different search or category
              </p>
            </div>
            <button
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="text-sm text-[hsl(var(--color-primary))] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addItem}
      />
    </div>
  );
}
