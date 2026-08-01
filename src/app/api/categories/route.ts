import { NextResponse } from "next/server";

const categories = [
  {
    id: "women",
    title: "Women's Collection",
    subtitle: "Elegance Redefined",
    image: "/cetagory/womenFashion.jpg",
    link: "/category/women",
    position: "left", // পাশের ছোট কার্ড
  },
  {
    id: "men",
    title: "Men's Essentials",
    subtitle: "Bespoke Tailoring & Streetwear",
    image: "/cetagory/menFashion.jpg",
    link: "/category/men",
    position: "center", // মাঝের লম্বা কার্ড
  },
  {
    id: "kids",
    title: "Kids & Teens",
    subtitle: "Playful & Premium Style",
    image: "/cetagory/kidFashion.jpg",
    link: "/category/kids",
    position: "right", // পাশের ছোট কার্ড
  },
];

export async function GET() {
  try {
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories", error },
      { status: 500 }
    );
  }
}