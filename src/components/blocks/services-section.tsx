"use client";

import {
  LayoutTemplate,
  ShoppingCart,
  CalendarClock,
  Target,
  Briefcase,
  RefreshCw,
} from "lucide-react";
import { Pricing, type PricingPlan } from "@/components/blocks/pricing";

const SERVICE_PLANS: PricingPlan[] = [
  {
    name: "Starter Site",
    icon: <LayoutTemplate className="h-5 w-5" strokeWidth={1.75} />,
    price: "from €100",
    description:
      "A clean, fast site with everything a small business actually needs — who you are, what you do, and how to reach you.",
    buttonText: "Ask about your project",
    href: "/contact",
  },
  {
    name: "Online Store",
    icon: <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />,
    price: "from €400",
    description:
      "A full storefront: product listings, a cart, and card payments wired in from day one.",
    buttonText: "Ask about your project",
    href: "/contact",
  },
  {
    name: "Booking System",
    icon: <CalendarClock className="h-5 w-5" strokeWidth={1.75} />,
    price: "from €300",
    description:
      "For salons, rentals, and restaurants — a live calendar so people book themselves, no phone tag required.",
    buttonText: "Ask about your project",
    href: "/contact",
  },
  {
    name: "Landing Page",
    icon: <Target className="h-5 w-5" strokeWidth={1.75} />,
    price: "from €150",
    description:
      "One page, one goal — built to turn traffic from ads into customers, not just visitors.",
    buttonText: "Ask about your project",
    href: "/contact",
  },
  {
    name: "Business Site",
    icon: <Briefcase className="h-5 w-5" strokeWidth={1.75} />,
    price: "from €250",
    description:
      "Multi-page sites with a blog, galleries, and real SEO for operations that have outgrown a single page.",
    buttonText: "Ask about your project",
    href: "/contact",
  },
  {
    name: "Redesign",
    icon: <RefreshCw className="h-5 w-5" strokeWidth={1.75} />,
    price: "quote on request",
    description:
      "Running something from a decade ago? We'll rebuild it modern, mobile-first, and fast — same brand, new site.",
    buttonText: "Ask about your project",
    href: "/contact",
  },
];

export function ServicesSection() {
  return (
    <div className="relative overflow-hidden bg-black py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-[8%] top-[0%] h-[24rem] w-[24rem] rounded-full bg-purple-600/15 blur-[120px]"
          style={{ animation: "glow-pulse 10s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[-6%] bottom-[10%] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/15 blur-[110px]"
          style={{ animation: "float-slow 14s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <section className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <Pricing
          id="services"
          eyebrow="// What we build"
          title="Whatever your business needs, we build it."
          description="No packages bolted together from templates — every project is scoped and hand-built for what your business actually does."
          plans={SERVICE_PLANS}
        />
      </section>
    </div>
  );
}
