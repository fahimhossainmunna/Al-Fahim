export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop/new" },
      { label: "Leather Bags", href: "/shop/bags" },
      { label: "Footwear", href: "/shop/shoes" },
      { label: "Accessories", href: "/shop/accessories" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Care Guide", href: "/care-guide" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
];