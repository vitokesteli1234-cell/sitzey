"use client";

import { Reveal } from "@/components/blocks/scroll-reveal";

export function StoryAndWorkSection() {
  return (
    <div className="relative overflow-hidden bg-black py-24 text-white sm:py-32">
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

      {/* STORY */}
      <section className="relative z-10 container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
            {"// The Story"}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mb-8 text-3xl font-bold leading-tight tracking-wide sm:text-4xl md:text-5xl">
            Built out of spite for boring websites.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="space-y-5 text-base leading-relaxed text-gray-300 sm:text-lg">
            <p>
              Sitzey started in a cramped apartment with one laptop, too much
              coffee, and a deep, personal hatred for template-looking
              websites that all felt the same.
            </p>
            <p>
              What began as freelance favors for friends turned into a
              one-person studio obsessed with a simple idea: a website should
              feel like the brand it represents, not like it was assembled
              from the same twelve blocks as everyone else&apos;s.
            </p>
            <p>
              Every project since has followed the same rule — design it like
              it matters, build it like it has to last, and never ship
              something boring.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 border-t border-white/10 pt-10 text-center sm:text-left">
            <div
              className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl md:text-8xl"
              style={{ filter: "drop-shadow(0 0 28px rgba(192,132,252,0.35))" }}
            >
              100%
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500 sm:text-base">
              Hand-coded
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
