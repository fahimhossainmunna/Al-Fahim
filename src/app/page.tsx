import CategorySection from "@/components/sections/CategorySection";
import FashionGrid from "@/components/sections/FashionGrid";
import Hero from "@/components/sections/Hero";
import Image from "next/image";

export default function Home() {
  return (
  <>
  <Hero/>
  <FashionGrid/>
  <CategorySection/>
  </>
  );
}
