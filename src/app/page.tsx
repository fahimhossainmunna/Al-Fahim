import BannerSlider from "@/components/sections/BannerSlider";
import CategorySection from "@/components/sections/CategorySection";
import FashionGrid from "@/components/sections/FashionGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Hero from "@/components/sections/Hero";
import Image from "next/image";

export default function Home() {
  return (
  <>
  <Hero/>
  <FashionGrid/>
  <CategorySection/>
  <BannerSlider/>
  <FeaturedProducts/>
  </>
  );
}
