import { Heart, Package, LogIn, UserPlus } from "lucide-react";

export const dropdownItems = {
  "New Arrivals": ["Latest Collection", "Trending Now", "Just Dropped", "Coming Soon"],
  "Collections": ["Summer 2026", "Winter 2025", "Essentials", "Limited Edition","Men","Women","Kid"],
};

export const accountItems = [
  { label: "Sign In", icon: LogIn, href: "/login" },
  { label: "Create Account", icon: UserPlus, href: "/register" },
  { label: "Order History", icon: Package, href: "/orders" },
  { label: "Wishlist", icon: Heart, href: "/wishlist" },
];

export const marqueeText = "FREE SHIPPING ON ORDERS OVER $150 • NEW SUMMER COLLECTION IS LIVE • USE CODE: ALFAHIM20 FOR 20% OFF • ";