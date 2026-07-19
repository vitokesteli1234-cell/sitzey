"use client";

import { Reveal } from "@/components/blocks/scroll-reveal";

const STATS = [
  { value: "100%", label: "Hand-coded" },
  { value: "72HR", label: "Avg. Turnaround" },
  { value: "98", label: "Lighthouse Score" },
];

export function StoryAndWorkSection() {
  return (
    <div className="relative overflow-hidden py-24 text-white sm:py-32">
      {/* Ambient glow, matching hero/contact palette. The seam glow is
          anchored right at the top edge (not offset/clipped) so the hero's
          fading nebula color continues straight into this section instead
          of cutting to flat black. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-x-0 top-0 h-[26rem]"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 0%, transparent 0%, rgba(147,51,234,0.32) 22%, rgba(147,51,234,0.12) 45%, transparent 75%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute left-[10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-[120px]"
          style={{ animation: "glow-pulse 8s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[5%] top-[55%] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/15 blur-[110px]"
          style={{ animation: "float-slow 12s ease-in-out infinite" }}
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

      {/* STATS */}
      <section className="relative z-10 container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:gap-6 sm:text-left">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={0.1 * i}>
              <div>
                <div
                  className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl"
                  style={{ filter: "drop-shadow(0 0 28px rgba(192,132,252,0.35))" }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500 sm:text-base">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
