"use client";

import { MessageCircle, PenTool, Eye, Rocket } from "lucide-react";
import { Reveal } from "@/components/blocks/scroll-reveal";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Free Consult",
    body: "Message us and tell us about your business — what you do, who your customers are, and what the site needs to achieve.",
  },
  {
    icon: PenTool,
    title: "Design & Build",
    body: "We design and hand-code your site around your brand, writing the copy for you too if you don't have it ready.",
  },
  {
    icon: Eye,
    title: "Review & Revise",
    body: "You get a live preview link. Tell us what to change — we keep refining until it's actually right, not just done.",
  },
  {
    icon: Rocket,
    title: "Launch",
    body: "We connect your domain, lock in SSL, and take it live. Your site starts working for you the same day.",
  },
];

export function ProcessSection() {
  return (
    <div className="relative overflow-hidden py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-[-4%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-fuchsia-500/12 blur-[130px]"
          style={{ animation: "glow-pulse 11s ease-in-out infinite" }}
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

      <section className="relative z-10 container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <div id="process">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              {"// How it works"}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mb-4 max-w-2xl text-3xl font-bold leading-tight tracking-wide sm:text-4xl md:text-5xl">
              From idea to live, in four steps.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mb-16 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
              No jargon, no ten-step onboarding funnel — just a straight line
              from a message to a working site.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <div
            className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-400/50 via-fuchsia-400/30 to-transparent sm:left-[27px]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={0.1 * i}>
                <div className="relative flex gap-5 sm:gap-6">
                  <div className="relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-purple-400/40 bg-black text-purple-300 sm:h-14 sm:w-14">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <div className="mb-1 flex items-baseline gap-3">
                      <span className="font-mono text-xs text-gray-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold sm:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-gray-300 sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
