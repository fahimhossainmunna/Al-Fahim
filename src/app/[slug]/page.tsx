import { notFound } from "next/navigation";
import Link from "next/link";
import {
  RiArrowLeftLine,
  RiArrowRightUpLine,
  RiArrowRightLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiAddLine,
} from "react-icons/ri";

// ১. পেজের টাইপ ডিফাইন করা
type PageData = {
  subtitle: string;
  title: string;
  description?: string;
  contentType: "craftsmanship" | "sustainability" | "journal" | "contact" | "shipping" | "care-guide" | "faqs";
};

// ২. অবজেক্টে JSX না রেখে ক্লিন ডেটা রাখা
const pagesData: Record<string, PageData> = {
  craftsmanship: {
    subtitle: "Heritage & Process",
    title: "Master Craftsmanship",
    description:
      "At AL-FAHIM, every product is an expression of traditional leather artistry merged with modern luxury design. Our artisans hand-select full-grain hides, ensuring each piece develops a unique character over time.",
    contentType: "craftsmanship",
  },
  sustainability: {
    subtitle: "Conscious Luxury",
    title: "Sustainability",
    description:
      "Our commitment is to create heirloom-quality fashion that minimizes environmental footprint through ethical sourcing and zero-waste production principles.",
    contentType: "sustainability",
  },
  journal: {
    subtitle: "Editorial Stories",
    title: "The Journal",
    contentType: "journal",
  },
  contact: {
    subtitle: "Client Support",
    title: "Contact Us",
    description:
      "Whether you have a question about an order or wish to arrange a private consultation, our team is at your service.",
    contentType: "contact",
  },
  shipping: {
    subtitle: "Delivery Policy",
    title: "Shipping & Returns",
    contentType: "shipping",
  },
  "care-guide": {
    subtitle: "Maintenance Instructions",
    title: "Leather Care Guide",
    contentType: "care-guide",
  },
  faqs: {
    subtitle: "Common Questions",
    title: "Frequently Asked Questions",
    contentType: "faqs",
  },
};

export function generateStaticParams() {
  return Object.keys(pagesData).map((slug) => ({ slug }));
}

// Reusable thin editorial numeral, used to index list items instead of bullets
function Numeral({ n }: { n: number }) {
  return (
    <span className="font-serif font-light text-4xl sm:text-5xl text-neutral-200 dark:text-neutral-800 leading-none select-none tabular-nums">
      {String(n).padStart(2, "0")}
    </span>
  );
}

// Floating-label input, CSS-only (no client state needed)
function FloatingField({
  as = "input",
  id,
  label,
  type = "text",
  rows,
}: {
  as?: "input" | "textarea";
  id: string;
  label: string;
  type?: string;
  rows?: number;
}) {
  const shared =
    "peer w-full bg-transparent border-b border-black/20 dark:border-white/20 pt-6 pb-2.5 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none";
  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea id={id} name={id} placeholder=" " rows={rows ?? 3} className={shared} />
      ) : (
        <input id={id} name={id} type={type} placeholder=" " className={shared} />
      )}
      <label
        htmlFor={id}
        className="absolute left-0 top-6 text-sm font-serif italic text-neutral-400 transition-all duration-300 pointer-events-none
          peer-focus:top-0 peer-focus:text-[10px] peer-focus:not-italic peer-focus:uppercase peer-focus:tracking-[0.25em] peer-focus:text-black dark:peer-focus:text-white
          peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:not-italic peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.25em]"
      >
        {label}
      </label>
    </div>
  );
}

// ৩. Dynamic Content Render Component
function PageContent({ type }: { type: PageData["contentType"] }) {
  switch (type) {
    case "craftsmanship":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-black/10 dark:divide-white/10">
          {[
            {
              title: "100% Full-Grain Hides",
              body: "We source top-tier natural hides that preserve the organic texture, strength, and durability of genuine leather.",
            },
            {
              title: "Hand-Stitching & Finishing",
              body: "Every seam is reinforced by master leathercrafters for unmatched resilience and refined aesthetics.",
            },
          ].map((item, i) => (
            <div key={item.title} className="py-9 sm:py-0 sm:px-12 first:pl-0 first:pt-0">
              <div className="flex items-start gap-6">
                <Numeral n={i + 1} />
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-xs font-semibold text-black dark:text-white uppercase tracking-[0.22em]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "sustainability":
      return (
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {[
            {
              label: "Vegetable Tanning",
              body: "We prioritize eco-friendly vegetable-tanned leathers free from harmful chromium chemicals.",
            },
            {
              label: "Ethical Supply Chain",
              body: "All raw materials are responsibly harvested from certified tanneries adhering to strict fair-labor standards.",
            },
            {
              label: "Longevity Over Trend",
              body: "Designed to last for decades, reducing fashion waste and fast consumption.",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-2 sm:gap-10 py-7 first:pt-0"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 pt-0.5">
                {String(i + 1).padStart(2, "0")} — {item.label}
              </span>
              <p className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      );

    case "journal":
      return (
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {[
            {
              date: "August 2026",
              title: "The Art of Leather Patina",
              body: "How full-grain leather ages gracefully and transforms through years of personal wear.",
            },
            {
              date: "July 2026",
              title: "Minimalist Essentials for Travel",
              body: "A curated guide on weekender bags and durable accessories engineered for modern journeys.",
            },
          ].map((post) => (
            <Link
              href="#"
              key={post.title}
              className="group flex items-center justify-between gap-8 py-9 first:pt-0"
            >
              <div className="space-y-2.5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 block">
                  {post.date}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif group-hover:opacity-50 transition-opacity duration-300">
                  {post.title}
                </h2>
                <p className="text-xs font-serif italic text-neutral-500 dark:text-neutral-400 max-w-md">
                  {post.body}
                </p>
              </div>
              <span className="w-11 h-11 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-colors duration-300">
                <RiArrowRightUpLine className="w-4 h-4 text-black dark:text-white group-hover:text-white dark:group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </span>
            </Link>
          ))}
        </div>
      );

    case "contact":
      return (
        <div className="space-y-16">
          {/* Info strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
            {[
              {
                icon: RiMailLine,
                label: "Email",
                lines: ["support@al-fahim.com", "press@al-fahim.com"],
              },
              {
                icon: RiPhoneLine,
                label: "Telephone",
                lines: ["+880 1700-000000", "Mon – Fri, 10:00 – 18:00"],
              },
              {
                icon: RiMapPin2Line,
                label: "Atelier",
                lines: ["Gulshan Avenue", "Dhaka 1212, Bangladesh"],
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="py-8 sm:py-9 sm:px-9 first:pl-0 space-y-3">
                  <Icon className="w-4 h-4 text-neutral-400" />
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    {item.label}
                  </p>
                  <div className="text-sm space-y-0.5">
                    {item.lines.map((l) => (
                      <p key={l} className="text-neutral-700 dark:text-neutral-300">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            {/* Left: hours + appointment note */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-4">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-semibold">
                  Boutique Hours
                </h3>
                <dl className="text-sm divide-y divide-black/10 dark:divide-white/10">
                  {[
                    ["Monday – Friday", "10:00 – 18:00"],
                    ["Saturday", "11:00 – 17:00"],
                    ["Sunday", "Closed"],
                  ].map(([day, time]) => (
                    <div key={day} className="flex items-center justify-between py-2.5">
                      <dt className="text-neutral-500 dark:text-neutral-400">{day}</dt>
                      <dd className="font-medium">{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="space-y-3 border-l border-black/10 dark:border-white/10 pl-5">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-semibold">
                  Private Appointments
                </h3>
                <p className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Prefer to be seen in person? Request a one-on-one styling
                  session at our Gulshan atelier.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-60 transition-opacity"
                >
                  Book a session
                  <RiArrowRightLine className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-8">
              <form className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  <FloatingField id="name" label="Your Name" />
                  <FloatingField id="email" label="Your Email" type="email" />
                </div>
                <FloatingField id="subject" label="Subject" />
                <FloatingField as="textarea" id="message" label="Your Message" rows={4} />

                <div className="flex items-center justify-between gap-6 pt-2">
                  <p className="text-xs font-serif italic text-neutral-400 max-w-[14rem]">
                    We typically respond within one business day.
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 border border-black dark:border-white px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 shrink-0"
                  >
                    Send Message
                    <RiArrowRightLine className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );

    case "shipping":
      return (
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {[
            {
              title: "Domestic Delivery",
              body: "We offer complimentary express shipping across Bangladesh. Orders are processed within 1-2 business days.",
            },
            {
              title: "International Shipping",
              body: "Worldwide shipping is handled via DHL Express. Delivery timelines vary from 3 to 7 business days depending on destination.",
            },
            {
              title: "Return Policy",
              body: "Unused products in original condition with intact packaging can be returned within 14 days of delivery.",
            },
          ].map((item, i) => (
            <div key={item.title} className="flex items-start gap-6 py-8 first:pt-0">
              <Numeral n={i + 1} />
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-semibold text-black dark:text-white uppercase tracking-[0.22em]">
                  {item.title}
                </h3>
                <p className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case "care-guide":
      return (
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {[
            {
              title: "Keep Away From Extreme Water",
              body: "If your leather item gets wet, wipe it gently with a dry microfiber cloth and allow it to dry naturally at room temperature.",
            },
            {
              title: "Condition Regularly",
              body: "Apply a high-quality leather balm or conditioner every 3 to 6 months to preserve moisture and prevent cracking.",
            },
            {
              title: "Proper Storage",
              body: "Store leather goods in dust bags away from direct sunlight when not in use.",
            },
          ].map((item, i) => (
            <div key={item.title} className="flex items-start gap-6 py-8 first:pt-0">
              <Numeral n={i + 1} />
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-semibold text-black dark:text-white uppercase tracking-[0.22em]">
                  {item.title}
                </h3>
                <p className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case "faqs":
      return (
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {[
            {
              q: "Are all products made of genuine leather?",
              a: "Yes, AL-FAHIM exclusively uses 100% full-grain genuine leather.",
            },
            {
              q: "Do you offer custom tailoring or bespoke sizing?",
              a: "We accept bespoke requests for selected leather jackets and bags upon direct consultation.",
            },
            {
              q: "How do I track my order?",
              a: "Once your order is dispatched, a tracking ID and courier link will be emailed to you.",
            },
          ].map((item, i) => (
            <details key={i} className="group py-6 first:pt-0">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <h3 className="text-sm font-medium uppercase tracking-wide text-black dark:text-white">
                  {item.q}
                </h3>
                <span className="w-8 h-8 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center shrink-0 group-open:bg-black group-open:border-black dark:group-open:bg-white dark:group-open:border-white transition-colors duration-300">
                  <RiAddLine className="w-4 h-4 text-black dark:text-white group-open:text-white dark:group-open:text-black transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400 leading-relaxed pt-4 max-w-lg">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      );

    default:
      return null;
  }
}

// ৪. Default Export Component
export default async function DynamicFooterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pagesData[slug];

  if (!page) {
    notFound();
  }

  const keys = Object.keys(pagesData);
  const index = keys.indexOf(slug) + 1;

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-24 sm:py-28">

        {/* Top bar: back link + page index */}
        <div className="flex items-center justify-between mb-20">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <RiArrowLeftLine className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 dark:text-neutral-700 font-serif tabular-nums">
            {String(index).padStart(2, "0")} / {String(keys.length).padStart(2, "0")}
          </span>
        </div>

        {/* Header */}
        <div className="space-y-6 pb-16 border-b border-black/10 dark:border-white/10 mb-16">
          <span className="text-[11px] uppercase tracking-[0.45em] text-neutral-500 block">
            {page.subtitle}
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif uppercase tracking-tight leading-[0.92]">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-base font-serif italic text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg pt-2">
              {page.description}
            </p>
          )}
        </div>

        {/* Content */}
        <PageContent type={page.contentType} />
      </div>
    </div>
  );
}