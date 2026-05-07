import { Product } from "../types";

export const products: Product[] = [
  {
    id: "lumina-pro-max",
    name: "Lumina Pro Max",
    price: 549,
    description: "Industry-leading noise cancellation and spatial audio engineered for the perfect acoustic seal.",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Headphones",
    features: ["Active Noise Cancellation", "40-hour battery life", "Spatial Audio", "Titanium build"]
  },
  {
    id: "lumina-buds",
    name: "Lumina Buds",
    price: 249,
    description: "Compact wireless earbuds that deliver massive sound with a custom acoustic architecture.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Earbuds",
    features: ["Sweat resistant", "24-hour battery with case", "Touch controls", "Transparency mode"]
  },
  {
    id: "lumina-soundbar",
    name: "Lumina Soundbar",
    price: 899,
    description: "Cinematic 3D audio for your living room with built-in voice control and seamless connectivity.",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Speakers",
    features: ["Dolby Atmos", "Wireless Subwoofer", "HDMI eARC", "Room calibration"]
  },
  {
    id: "lumina-watch",
    name: "Lumina Timepiece",
    price: 399,
    description: "Precision crafted titanium smartwatch tracking your health, audio, and life.",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Wearables",
    features: ["Sapphire crystal", "ECG monitor", "Always-on display", "LTE connectivity"]
  }
];
