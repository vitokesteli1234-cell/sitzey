"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/blocks/scroll-reveal";
import { Magnetic } from "@/components/blocks/magnetic";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export interface PricingPlan {
  name: string;
  icon: ReactNode;
  price: string;
  description: string;
  buttonText: string;
  href: string;
}

interface PricingProps {
  plans: PricingPlan[];
  title: string;
  description: string;
  eyebrow?: string;
  id?: string;
}

/**
 * Flat, one-time-project pricing cards — no monthly/yearly toggle, since
 * this studio doesn't sell subscriptions. Each plan is exactly what's
 * already written elsewhere on the site; this only changes how it's
 * presented (bigger price treatment, per-card CTA, glow-border accent).
 */
export function Pricing({ plans, title, description, eyebrow, id }: PricingProps) {
  return (
    <>
      <div id={id}>
        {eyebrow && (
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h2 className="mb-4 max-w-2xl text-3xl font-bold leading-tight tracking-wide sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mb-14 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
            {description}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={0.06 * i}>
            <div className="relative h-full rounded-2xl border border-white/10 p-1.5">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="group relative flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/[0.07]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300 transition duration-300 group-hover:bg-purple-500/25 group-hover:text-white">
                  {plan.icon}
                </div>
                <h3 className="mb-1 text-lg font-semibold">{plan.name}</h3>
                <p className="mb-3 bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text font-mono text-xl font-bold uppercase tracking-[0.05em] text-transparent">
                  {plan.price}
                </p>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">
                  {plan.description}
                </p>
                <Magnetic className="inline-block">
                  <a
                    href={plan.href}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-200 backdrop-blur-sm transition duration-200 hover:border-purple-400/60 hover:bg-white/10 hover:text-white"
                  >
                    {plan.buttonText}
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
