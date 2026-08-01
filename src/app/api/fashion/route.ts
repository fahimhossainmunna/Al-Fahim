import { NextResponse } from "next/server";

const fashionItems = [
  { id: 1, image: "/fashion/shirtOne.jpg", gridClass: "md:col-span-1 h-[500px] md:h-[750px]" },
  { id: 2, image: "/fashion/shirtTwo.jpg", gridClass: "md:col-span-1 h-[280px] md:h-[320px] md:-mt-6" },
  { id: 3, image: "/fashion/shirtThree.jpg", gridClass: "md:col-span-1 h-[280px] md:h-[380px] md:mt-4" },
  { id: 4, image: "/fashion/tshirtOne.jpg", gridClass: "md:col-span-1 h-[280px] md:h-[360px] md:-mt-12" },
  { id: 5, image: "/fashion/tshirtTwo.jpg", gridClass: "md:col-span-1 h-[280px] md:h-[300px] md:mt-2" },
  { id: 6, image: "/fashion/tshirtThree.jpg", gridClass: "md:col-span-1 h-[500px] md:h-[750px]" },
];

export async function GET() {
  try {
    return NextResponse.json(fashionItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch fashion items", error }, { status: 500 });
  }
}