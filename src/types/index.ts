export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  features: string[];
  compatibility: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = {
  id: string;
  label: string;
  icon: string;
  count: number;
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "All Products", icon: "🛍️", count: 24 },
  { id: "cases", label: "Cases & Covers", icon: "📱", count: 7 },
  { id: "chargers", label: "Chargers", icon: "⚡", count: 5 },
  { id: "audio", label: "Audio", icon: "🎧", count: 4 },
  { id: "cables", label: "Cables", icon: "🔌", count: 4 },
  { id: "stands", label: "Stands & Mounts", icon: "🔧", count: 4 },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "MagShield Pro Case",
    brand: "GadgetPoint",
    category: "cases",
    price: 52500,
    originalPrice: 75000,
    rating: 4.8,
    reviewCount: 1284,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop&auto=format",
    badge: "Best Seller",
    badgeColor: "blue",
    description: "Military-grade MagSafe compatible case with 12ft drop protection.",
    features: ["12ft drop protection", "MagSafe compatible", "Anti-fingerprint coating", "Raised camera bezel"],
    compatibility: ["iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 14 Pro"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "p2",
    name: "HyperCharge 65W GaN",
    brand: "GadgetPoint",
    category: "chargers",
    price: 67500,
    rating: 4.9,
    reviewCount: 863,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format",
    badge: "New",
    badgeColor: "cyan",
    description: "Ultra-compact 65W GaN charger. Power your laptop, tablet, and phone simultaneously.",
    features: ["65W total output", "3 ports (2× USB-C, 1× USB-A)", "GaN III technology", "Foldable plug"],
    compatibility: ["Universal USB-C devices"],
    inStock: true,
    isNew: true,
  },
  {
    id: "p3",
    name: "AirPods Armor Case",
    brand: "GadgetPoint",
    category: "cases",
    price: 30000,
    originalPrice: 37500,
    rating: 4.7,
    reviewCount: 542,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop&auto=format",
    description: "Shockproof silicone case with carabiner for AirPods Pro 2.",
    features: ["Shockproof silicone", "Carabiner included", "Wireless charging through case", "Dust-proof"],
    compatibility: ["AirPods Pro 2", "AirPods Pro"],
    inStock: true,
  },
  {
    id: "p4",
    name: "UltraSync Wireless Earbuds",
    brand: "GadgetPoint",
    category: "audio",
    price: 135000,
    originalPrice: 180000,
    rating: 4.6,
    reviewCount: 2105,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&auto=format",
    badge: "Top Rated",
    badgeColor: "purple",
    description: "ANC wireless earbuds with 36-hour battery life and premium sound.",
    features: ["Active Noise Cancellation", "36hr total battery", "IPX5 water resistant", "Bluetooth 5.3"],
    compatibility: ["Universal Bluetooth"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "p5",
    name: "MagPad 15W Wireless Charger",
    brand: "GadgetPoint",
    category: "chargers",
    price: 45000,
    rating: 4.7,
    reviewCount: 731,
    image: "https://images.unsplash.com/photo-1616532942807-2baff7e6e0cb?w=600&h=600&fit=crop&auto=format",
    description: "Qi2 certified 15W wireless charging pad with LED indicator.",
    features: ["Qi2 certified 15W", "Works with MagSafe", "Slim 5mm design", "Overcharge protection"],
    compatibility: ["iPhone 12+", "Samsung Galaxy S21+", "All Qi devices"],
    inStock: true,
  },
  {
    id: "p6",
    name: "BraideX USB-C Cable 2m",
    brand: "GadgetPoint",
    category: "cables",
    price: 22500,
    originalPrice: 30000,
    rating: 4.8,
    reviewCount: 1893,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop&auto=format",
    badge: "Sale",
    badgeColor: "green",
    description: "100W braided USB-C to USB-C cable with 20Gbps data transfer.",
    features: ["100W fast charging", "20Gbps data transfer", "Nylon braided", "USB 3.2 Gen 2"],
    compatibility: ["All USB-C devices"],
    inStock: true,
  },
  {
    id: "p7",
    name: "DeskFlex Pro Stand",
    brand: "GadgetPoint",
    category: "stands",
    price: 60000,
    rating: 4.9,
    reviewCount: 447,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop&auto=format",
    badge: "New",
    badgeColor: "cyan",
    description: "360° adjustable aluminum phone and tablet stand for desk or bedside.",
    features: ["360° rotation", "Adjustable height & angle", "Aluminum construction", "Anti-slip base"],
    compatibility: ["Phones 4-13 inches", "Tablets up to 13 inches"],
    inStock: true,
    isNew: true,
  },
  {
    id: "p8",
    name: "ShieldGlass Screen Protector",
    brand: "GadgetPoint",
    category: "cases",
    price: 19500,
    originalPrice: 27000,
    rating: 4.5,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop&auto=format",
    badge: "Sale",
    badgeColor: "green",
    description: "9H tempered glass with auto-alignment tray for bubble-free application.",
    features: ["9H hardness", "Anti-fingerprint", "Auto-alignment tray", "2-pack included"],
    compatibility: ["iPhone 15", "iPhone 15 Pro", "iPhone 14"],
    inStock: true,
  },
  {
    id: "p9",
    name: "PowerBank Ultra 20000",
    brand: "GadgetPoint",
    category: "chargers",
    price: 82500,
    originalPrice: 105000,
    rating: 4.8,
    reviewCount: 1124,
    image: "https://images.unsplash.com/photo-1615869442320-fd02a129c77c?w=600&h=600&fit=crop&auto=format",
    badge: "Best Seller",
    badgeColor: "blue",
    description: "20000mAh slim power bank with 22.5W fast charge and LED display.",
    features: ["20000mAh capacity", "22.5W fast charge", "LED battery display", "3 output ports"],
    compatibility: ["Universal USB-C/USB-A"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "p10",
    name: "NeckBand Pro Headphones",
    brand: "GadgetPoint",
    category: "audio",
    price: 90000,
    rating: 4.4,
    reviewCount: 876,
    image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?w=600&h=600&fit=crop&auto=format",
    description: "Magnetic neckband headphones with 20hr battery and Hi-Fi sound.",
    features: ["20hr battery", "Magnetic earbuds", "Hi-Fi audio", "IPX6 waterproof"],
    compatibility: ["Universal Bluetooth 5.0"],
    inStock: true,
  },
  {
    id: "p11",
    name: "Lightning to USB-C 1m",
    brand: "GadgetPoint",
    category: "cables",
    price: 18000,
    rating: 4.6,
    reviewCount: 2254,
    image: "https://images.unsplash.com/photo-1600003263720-95b45a9d6f64?w=600&h=600&fit=crop&auto=format",
    description: "MFi certified Lightning to USB-C fast charging cable.",
    features: ["MFi certified", "27W fast charging", "Braided nylon", "Strain relief"],
    compatibility: ["iPhone (Lightning port)", "iPad"],
    inStock: true,
  },
  {
    id: "p12",
    name: "MagMount Car Holder",
    brand: "GadgetPoint",
    category: "stands",
    price: 37500,
    originalPrice: 49500,
    rating: 4.7,
    reviewCount: 689,
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&h=600&fit=crop&auto=format",
    badge: "Sale",
    badgeColor: "green",
    description: "Magnetic car vent mount with 15W wireless charging support.",
    features: ["15W wireless charging", "360° rotation", "MagSafe compatible", "Easy vent clip"],
    compatibility: ["MagSafe iPhones", "All phones with case"],
    inStock: true,
  },
];
