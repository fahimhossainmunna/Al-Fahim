import { NextResponse } from "next/server";

export interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  link: string;
  buttonText: string;
  number: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "NEW FASHION SALE",
    subtitle: "Redefining modern elegance with bold streetwear and timeless silhouettes.",
    tagline: "Autumn / Winter '26 Collection",
    image: "/banner/clothBannerOne.png",
    link: "/category/men",
    buttonText: "Shop Collection",
    number: "01",
  },
  {
    id: 2,
    title: "URBAN BEAST APPAREL",
    subtitle: "Premium athletic craftsmanship meets contemporary urban luxury outerwear.",
    tagline: "Exclusive Varsity Series",
    image: "/banner/hoodieBanner.png",
    link: "/category/hoodies",
    buttonText: "Explore Outerwear",
    number: "02",
  },
  {
    id: 3,
    title: "SPRINT & GROUND GAME",
    subtitle: "Unmatched performance footwear built with precision cable weaves and style.",
    tagline: "Sneaker Hub Drops",
    image: "/banner/shoesBanner.png",
    link: "/category/shoes",
    buttonText: "Discover Sneakers",
    number: "03",
  },
];

export async function GET() {
  return NextResponse.json(bannerSlides);
}