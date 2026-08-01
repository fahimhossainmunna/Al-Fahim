import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category.toLowerCase();

  // Dynamic Category Database with BDT Price
  const categoriesData: Record<string, any> = {
    men: {
      title: "Men's Collection",
      subtitle: "Autumn / Winter 2026",
      cover: "/cetagory/men/menShop.jpg",
      products: [
        {
          id: 1,
          name: "Formal Executive Wear",
          category: "Formal",
          price: 3450,
          image: "/cetagory/men/formal.jpg",
          isNew: false,
        },
        {
          id: 2,
          name: "Casual Premium Shirt",
          category: "Casual",
          price: 2250,
          image: "/cetagory/men/CasualShirt.jpg",
          isNew: true,
        },
        {
          id: 3,
          name: "Minimalist Essential T-Shirt",
          category: "T-Shirt",
          price: 1150,
          image: "/cetagory/men/tshirt.jpg",
          isNew: true,
        },
        {
          id: 4,
          name: "Slim Fit Denim Jeans",
          category: "Denim",
          price: 2850,
          image: "/cetagory/men/jeans.jpg",
          isNew: true,
        },
        {
          id: 5,
          name: "Luxury Panjabi",
          category: "Panjabi",
          price: 4200,
          image: "/cetagory/men/panjabi.jpg",
          isNew: false,
        },
        {
          id: 6,
          name: "Premium Cotton Polo",
          category: "Polo",
          price: 1650,
          image: "/cetagory/men/polo.jpg",
          isNew: false,
        },
      ],
    },

    // 👕 Casual Shirts Data
    casual: {
      title: "Casual Shirts Collection",
      subtitle: "Premium Cotton Casuals 2026",
      cover: "/cetagory/men/CasualShirt.jpg",
      products: [
        {
          id: 101,
          name: "Casual Full Sleeve Shirt - Blue",
          category: "Casual Shirt",
          price: 2450,
          image: "/cetagory/men/cShirt/cShirtFullOne.jpg",
          isNew: true,
        },
        {
          id: 102,
          name: "Classic Casual Cotton Shirt",
          category: "Casual Shirt",
          price: 2250,
          image: "/cetagory/men/cShirt/cShirtOne.jpg",
          isNew: true,
        },
        {
          id: 103,
          name: "Casual Full Sleeve Shirt - Olive",
          category: "Casual Shirt",
          price: 2500,
          image: "/cetagory/men/cShirt/cShirtFullTwo.jpg",
          isNew: false,
        },
        {
          id: 104,
          name: "Slim Fit Casual Shirt",
          category: "Casual Shirt",
          price: 2150,
          image: "/cetagory/men/cShirt/cShirtTwo.jpg",
          isNew: false,
        },
        {
          id: 105,
          name: "Casual Full Sleeve Shirt - Charcoal",
          category: "Casual Shirt",
          price: 2600,
          image: "/cetagory/men/cShirt/cShirtFullThree.jpg",
          isNew: true,
        },
        {
          id: 106,
          name: "Modern Casual Printed Shirt",
          category: "Casual Shirt",
          price: 2300,
          image: "/cetagory/men/cShirt/cShirtThree.jpg",
          isNew: false,
        },
        {
          id: 107,
          name: "Premium Oxford Casual Shirt",
          category: "Casual Shirt",
          price: 2750,
          image: "/cetagory/men/cShirt/cShirtFour.jpg",
          isNew: true,
        },
      ],
    },

    // 👔 1. Formal Collection
    formal: {
      title: "Formal Wear Collection",
      subtitle: "Executive & Corporate 2026",
      cover: "/cetagory/men/formal/formalShirtOne.jpg",
      products: [
        { id: 201, name: "Executive Olive Chino Pant", category: "Formal", price: 3200, image: "/cetagory/men/formal/formalPantFour.jpg", isNew: true },
        { id: 202, name: "Classic Beige Slim Pant", category: "Formal", price: 2950, image: "/cetagory/men/formal/formalPantOne.jpg", isNew: false },
        { id: 203, name: "Formal Deep Black Trousers", category: "Formal", price: 3400, image: "/cetagory/men/formal/formalPantThree.jpg", isNew: true },
        { id: 204, name: "Corporate Grey Tailored Pant", category: "Formal", price: 3100, image: "/cetagory/men/formal/formalPantTwo.jpg", isNew: false },
        { id: 205, name: "Premium Off-White Printed Shirt", category: "Formal", price: 2850, image: "/cetagory/men/formal/formalShirtFour.jpg", isNew: true },
        { id: 206, name: "Formal Chocolate Slim Shirt", category: "Formal", price: 2750, image: "/cetagory/men/formal/formalShirtOne.jpg", isNew: false },
        { id: 207, name: "Luxury Cream Executive Shirt", category: "Formal", price: 2900, image: "/cetagory/men/formal/formalShirtThree.jpg", isNew: true },
        { id: 208, name: "Formal Mint Green Cotton Shirt", category: "Formal", price: 2650, image: "/cetagory/men/formal/formalShirtTwo.jpg", isNew: false },
      ],
    },

    // 👖 2. Jeans / Denim Collection
    jeans: {
      title: "Denim & Jeans Collection",
      subtitle: "Rugged & Stylish 2026",
      cover: "/cetagory/men/jeans/jeansOne.jpg",
      products: [
        { id: 301, name: "Ripped Light Wash Denim", category: "Jeans", price: 3450, image: "/cetagory/men/jeans/jeansFive.jpg", isNew: true },
        { id: 302, name: "Slim Fit Indigo Blue Jeans", category: "Jeans", price: 3100, image: "/cetagory/men/jeans/jeansFour.jpg", isNew: false },
        { id: 303, name: "Classic Straight Navy Denim", category: "Jeans", price: 2950, image: "/cetagory/men/jeans/jeansOne.jpg", isNew: false },
        { id: 304, name: "Faded Vintage Blue Denim", category: "Jeans", price: 3300, image: "/cetagory/men/jeans/jeansSix.jpg", isNew: true },
        { id: 305, name: "Modern Dark Wash Blue Jeans", category: "Jeans", price: 3250, image: "/cetagory/men/jeans/jeansThree.jpg", isNew: false },
        { id: 306, name: "Charcoal Black Slim Jeans", category: "Jeans", price: 3500, image: "/cetagory/men/jeans/jeansTwo.jpg", isNew: true },
      ],
    },

    // 🕌 3. Panjabi Collection
    panjabi: {
      title: "Panjabi Collection",
      subtitle: "Traditional & Festive 2026",
      cover: "/cetagory/men/panjabi/panjabiOne.jpg",
      products: [
        { id: 401, name: "Embroidered Slate Grey Panjabi", category: "Panjabi", price: 3850, image: "/cetagory/men/panjabi/panjabiFive.jpg", isNew: true },
        { id: 402, name: "Classic Light Blue Solid Panjabi", category: "Panjabi", price: 3200, image: "/cetagory/men/panjabi/panjabiFour.jpg", isNew: false },
        { id: 403, name: "Designer Pastel Green Panjabi", category: "Panjabi", price: 4200, image: "/cetagory/men/panjabi/panjabiOne.jpg", isNew: true },
        { id: 404, name: "Mint Green Silk Panjabi", category: "Panjabi", price: 3950, image: "/cetagory/men/panjabi/panjabiSix.jpg", isNew: false },
        { id: 405, name: "Textured Brown Traditional Panjabi", category: "Panjabi", price: 3600, image: "/cetagory/men/panjabi/panjabiThree.jpg", isNew: false },
        { id: 406, name: "Royal Sage Green Cotton Panjabi", category: "Panjabi", price: 3450, image: "/cetagory/men/panjabi/panjabiTwo.jpg", isNew: true },
      ],
    },

    // 👕 4. Polo Collection
    polo: {
      title: "Polo Shirts Collection",
      subtitle: "Smart Casual & Sporty 2026",
      cover: "/cetagory/men/polo/poloOne.jpg",
      products: [
        { id: 501, name: "Beige Knit Cotton Polo", category: "Polo", price: 1950, image: "/cetagory/men/polo/poloFive.jpg", isNew: false },
        { id: 502, name: "Luxury Black Gold Trim Polo", category: "Polo", price: 2200, image: "/cetagory/men/polo/poloFour.jpg", isNew: true },
        { id: 503, name: "Forest Green Classic Polo", category: "Polo", price: 1850, image: "/cetagory/men/polo/poloOne.jpg", isNew: false },
        { id: 504, name: "Olive Green Collar Polo", category: "Polo", price: 1900, image: "/cetagory/men/polo/poloSix.jpg", isNew: true },
        { id: 505, name: "Navy Blue Minimalist Polo", category: "Polo", price: 1750, image: "/cetagory/men/polo/poloThree.jpg", isNew: false },
        { id: 506, name: "Mustard Tan Casual Polo", category: "Polo", price: 1800, image: "/cetagory/men/polo/poloTwo.jpg", isNew: false },
      ],
    },

    // 👕 5. T-Shirt Collection
    "t-shirt": {
      title: "T-Shirts Collection",
      subtitle: "Casual & Streetwear 2026",
      cover: "/cetagory/men/t-shirt/tshirtOne.jpg",
      products: [
        { id: 601, name: "Oversized Vintage Black Graphic Tee", category: "T-Shirt", price: 1450, image: "/cetagory/men/t-shirt/tshirtFive.jpg", isNew: true },
        { id: 602, name: "Sage Green Streetwear Tee", category: "T-Shirt", price: 1350, image: "/cetagory/men/t-shirt/tshirtfour.jpg", isNew: false },
        { id: 603, name: "Red Crest Typography Black Tee", category: "T-Shirt", price: 1550, image: "/cetagory/men/t-shirt/tshirtOne.jpg", isNew: true },
        { id: 604, name: "Gothic Rose Graphic Heavyweight Tee", category: "T-Shirt", price: 1600, image: "/cetagory/men/t-shirt/tshirtThree.jpg", isNew: false },
        { id: 605, name: "Yellow Studio Aesthetic Printed Tee", category: "T-Shirt", price: 1400, image: "/cetagory/men/t-shirt/tshirtTwo.jpg", isNew: true },
      ],
    },

    women: {
      title: "Women's Collection",
      subtitle: "Elegance & Ethnic 2026",
      cover: "/cetagory/women/womenCover.jpg",
      products: [
        {
          id: 1,
          name: "Pakistani Designer Dress",
          category: "Ethnic Wear",
          price: 5800,
          image: "/cetagory/women/pakistaniDress.jpg",
          isNew: true,
        },
        {
          id: 2,
          name: "Premium Three Piece Suit",
          category: "Traditional",
          price: 4500,
          image: "/cetagory/women/threePis.jpg",
          isNew: true,
        },
        {
          id: 3,
          name: "Exclusive Two Piece Set",
          category: "Casual Ethnic",
          price: 3200,
          image: "/cetagory/women/twoPis.jpg",
          isNew: false,
        },
      ],
    },
  };

  // 'casual-shirt' এবং '2' যাতে 'casual' ডেটা রিটার্ন করে
  categoriesData["casual-shirt"] = categoriesData["casual"];
  categoriesData["cshirt"] = categoriesData["casual"];
  categoriesData["2"] = categoriesData["casual"];

  // ইউআরএল ম্যাপিং অ্যালিয়াস
  categoriesData["tshirt"] = categoriesData["t-shirt"];
  categoriesData["denim"] = categoriesData["jeans"];

  const selectedCategory = categoriesData[categoryName];

  if (!selectedCategory) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(selectedCategory);
}