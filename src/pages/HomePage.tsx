import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Truck, RotateCcw, Star } from "lucide-react";
import heroAccessories from "@/assets/hero-accessories.jpg";
import { PRODUCTS, CATEGORIES } from "@/types";
import ProductCard from "@/components/features/ProductCard";
import ProductModal from "@/components/features/ProductModal";
import { useCartContext } from "@/stores/CartContext";
import type { Product } from "@/types";

const TRUST_BADGES = [
{ icon: Zap, label: "Fast Shipping", sub: "Same-day dispatch" },
{ icon: Shield, label: "2-Year Warranty", sub: "On all products" },
{ icon: Truck, label: "Free Returns", sub: "30-day hassle-free" },
{ icon: RotateCcw, label: "Genuine Products", sub: "100% authentic" }];


export default function HomePage() {
  const { addItem } = useCartContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = PRODUCTS.filter((p) => p.isBestSeller || p.isNew).slice(0, 5);
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroAccessories}
            alt="Phone Accessories"
            className="w-full h-full object-cover opacity-35" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--color-bg))]/50 via-transparent to-[hsl(var(--color-bg))]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--color-bg))]/90 via-[hsl(var(--color-bg))]/40 to-transparent" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--color-primary))/15] border border-[hsl(var(--color-primary))/30] rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-bold text-[hsl(var(--color-primary))] uppercase tracking-wider">
                Smart Technology, Smarter You
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Level Up
              <br />
              <span className="bg-gradient-to-r from-[hsl(var(--color-primary))] to-cyan-400 bg-clip-text text-transparent">
                Your Phone
              </span>
            </h1>

            <p className="text-lg text-[hsl(var(--color-text-subtle))] max-w-xl mb-10 leading-relaxed">
              Premium phone accessories engineered for performance. Cases, chargers, audio, cables, and more — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-hover))] text-white text-base font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] hover:-translate-y-0.5 active:scale-[0.98]">
                
                Shop All Accessories
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-base font-semibold px-8 py-4 rounded-2xl transition-all duration-200">
                
                New Arrivals
              </Link>
            </div>

            {/* Stats */}
            










            
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 border-y border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map((b) =>
            <div key={b.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--color-primary))/15] flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-[hsl(var(--color-primary))]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{b.label}</p>
                  <p className="text-xs text-[hsl(var(--color-text-subtle))]">{b.sub}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Browse Categories</h2>
            <p className="text-[hsl(var(--color-text-subtle))] text-sm mt-1">Everything your phone needs</p>
          </div>
          <Link to="/products" className="text-sm text-[hsl(var(--color-primary))] hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {CATEGORIES.filter((c) => c.id !== "all").map((cat) =>
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 text-center hover:-translate-y-1 hover:border-[hsl(var(--color-primary))/40] transition-all duration-200 group">
            
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-white group-hover:text-[hsl(var(--color-primary))] transition-colors leading-tight">
                {cat.label}
              </span>
              <span className="text-[10px] text-[hsl(var(--color-text-subtle))]">{cat.count} items</span>
            </Link>
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-[hsl(var(--color-surface))]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Customer Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Best Sellers</h2>
            </div>
            <Link to="/products" className="text-sm text-[hsl(var(--color-primary))] hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured layout: 1 large + grid */}
          <div className="grid lg:grid-cols-[1fr,1fr,1fr] gap-5">
            {bestSellers.slice(0, 1).map((p) =>
            <ProductCard
              key={p.id}
              product={p}
              featured
              onAddToCart={addItem}
              onViewDetails={setSelectedProduct} />

            )}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              {bestSellers.slice(1, 5).map((p) =>
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addItem}
                onViewDetails={setSelectedProduct} />

              )}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Just Arrived</h2>
          </div>
          <Link to="/products?filter=new" className="text-sm text-[hsl(var(--color-primary))] hover:underline flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newArrivals.map((p) =>
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={addItem}
            onViewDetails={setSelectedProduct} />

          )}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-cyan-500/5 pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <img
              src="https://cdn-ai.onspace.ai/onspace/project/uploads/dsNRTrgARuubcGeQYHrug9/3fbcce59-fb93-4075-aa15-940b76386871.png"
              alt="GadgetPoint"
              className="h-10 mx-auto mb-6 opacity-90" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Ultimate Phone Setup Starts Here
            </h2>
            <p className="text-[hsl(var(--color-text-subtle))] mb-8 max-w-xl mx-auto">
              Browse our full catalog of 50+ premium accessories. Free shipping on orders over ₦50,000.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-hover))] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              
              Shop Now — Free Shipping Over ₦50,000
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addItem} />
      
    </div>);

}