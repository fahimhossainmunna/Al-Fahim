export interface LeatherItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  size: "large" | "small";
}

export const leatherItems: LeatherItem[] = [
  {
    id: "1",
    title: "Executive Leather Backpack",
    category: "Full-Grain Leather",
    imageSrc: "/leather/Backpack.jpg",
    size: "large", // বড় বক্স (বামপাশে)
  },
  {
    id: "2",
    title: "Artisanal Leather Shoes",
    category: "Footwear Collection",
    imageSrc: "/leather/leatherShoes.jpg",
    size: "small", // ছোট বক্স ১ (ডানপাশে উপরে)
  },
  {
    id: "3",
    title: "Minimalist Slim Wallet",
    category: "Luxury Accessories",
    imageSrc: "/leather/wallet.png",
    size: "small", // ছোট বক্স ২ (ডানপাশে নিচে)
  },
];