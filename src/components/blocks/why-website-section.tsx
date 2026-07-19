"use client";

import { Search, TrendingUp, Clock, ShieldCheck, Globe, Rocket } from "lucide-react";
import { Reveal } from "@/components/blocks/scroll-reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const REASONS = [
  {
    icon: Search,
    title: "People search before they show up",
    body: "Most customers look a business up online before they ever call or walk in. If you're not there, you're invisible to them.",
  },
  {
    icon: TrendingUp,
    title: "Your competitors aren't waiting",
    body: "Somewhere nearby, someone doing exactly what you do already has a site — and it's quietly taking the customers you're losing.",
  },
  {
    icon: Clock,
    title: "It works while you don't",
    body: "A website takes inquiries at midnight, on Sundays, on holidays — every hour you're not the one answering the phone.",
  },
  {
    icon: ShieldCheck,
    title: "Trust starts before the first hello",
    body: "People size up a business by its site before they ever meet you. No site, no first impression to work with.",
  },
  {
    icon: Globe,
    title: "A profile page isn't a website",
    body: "Social media can get you likes, but it won't get you found on Google the way a real site with your own domain will.",
  },
  {
    icon: Rocket,
    title: "It's growth, not overhead",
    body: "A good site keeps paying for itself in the customers it brings in — it's one of the few costs that turns into income.",
  },
];

export function WhyWebsiteSection() {
  return (
    <div className="relative overflow-hidden py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-[65%] top-[-6%] h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/15 blur-[120px]"
          style={{ animation: "glow-pulse 9s ease-in-out infinite" }}
        />
        <div
          className="absolute left-[-8%] bottom-[5%] h-[22rem] w-[22rem] rounded-full bg-purple-600/15 blur-[110px]"
          style={{ animation: "float-slow 13s ease-in-out infinite" }}
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
        <div id="why">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              {"// Why it matters"}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mb-4 max-w-2xl text-3xl font-bold leading-tight tracking-wide sm:text-4xl md:text-5xl">
              If you&apos;re not online, you don&apos;t exist.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mb-14 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
              A website isn&apos;t a nice-to-have anymore — it&apos;s the
              first place people decide whether your business is worth their
              time.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={0.06 * i}>
              <div className="relative h-full rounded-2xl border border-white/10 p-1.5">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <div className="group relative h-full rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/[0.07]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300 transition duration-300 group-hover:bg-purple-500/25 group-hover:text-white">
                    <reason.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {reason.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
