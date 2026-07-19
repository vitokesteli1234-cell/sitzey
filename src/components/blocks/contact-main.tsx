"use client";

import { useState } from "react";
import { Mail, Phone, Clock, Send, ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/blocks/magnetic";
import { useIntroReady } from "@/components/blocks/intro-context";
import { Reveal } from "@/components/blocks/scroll-reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const PROJECT_TYPES = [
  "Starter Site",
  "Online Store",
  "Booking System",
  "Landing Page",
  "Business Site",
  "Redesign",
  "Not sure yet",
];

const BUDGET_RANGES = [
  "Under €300",
  "€300–600",
  "€600–1,200",
  "€1,200+",
  "Not sure yet",
];

// Answers reuse copy/figures already established elsewhere on the site
// (services-section.tsx prices, sitzey-story-and-work.tsx stats, and the
// process-section.tsx step descriptions) rather than inventing new ones.
const FAQS = [
  {
    q: "How much does a site cost?",
    a: "It depends on what you need: Starter Sites run €300–500, Landing Pages €250–400, Business Sites €500–900, Booking Systems €700–1,200, and Online Stores €900–1,800. Redesigns are quoted once I've seen what you're starting from.",
  },
  {
    q: "How long does it take?",
    a: "Most projects average a 72-hour turnaround from our first message to a live preview. Once you approve the final revision, I connect your domain and launch it the same day.",
  },
  {
    q: "Do I need to have my own content/copy ready?",
    a: "No — I write the copy for you too if you don't have it ready. If you already have your own text and images, I'll build around those instead.",
  },
  {
    q: "What happens after I reach out?",
    a: "We start with a free consult about your business, then I design & hand-code your site. You get a live preview to review and revise until it's right, then I connect your domain and launch it live.",
  },
];

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

function buildMailto(data: FormState) {
  const subject = `New project inquiry — ${data.projectType}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Project type: ${data.projectType}`,
    `Budget range: ${data.budget}`,
    "",
    data.message,
  ].join("\n");
  return `mailto:sitzeyco@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.7z" />
    </svg>
  );
}

const fieldLabel =
  "mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-gray-400";
const fieldControl =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-200 focus:border-purple-400/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-purple-400/30";

const CONTACT_CARDS = [
  {
    href: "mailto:sitzeyco@gmail.com",
    icon: Mail,
    label: "Email",
    value: "sitzeyco@gmail.com",
    delay: 0.4,
    glowDelay: "0s",
  },
  {
    href: "tel:+385924209234",
    icon: Phone,
    label: "Phone",
    value: "+385 92 420 9234",
    delay: 0.46,
    glowDelay: "0.4s",
  },
  {
    href: "https://wa.me/385924209234",
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+385 92 420 9234",
    delay: 0.52,
    glowDelay: "0.8s",
  },
];

export function ContactMain() {
  const ready = useIntroReady();
  const playState = ready ? "running" : "paused";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "Not sure yet",
    budget: "Not sure yet",
    message: "",
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = buildMailto(form);
  }

  return (
    <main className="relative z-10 flex flex-col items-center px-6 py-20 md:py-28">
      {/* HERO */}
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 opacity-0"
          style={{ animation: "fade-in-up 0.7s ease forwards", animationPlayState: playState }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-medium tracking-wide text-emerald-300">
            Available for new projects
          </span>
        </div>

        <p
          className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300 opacity-0"
          style={{ animation: "fade-in-up 0.7s ease forwards 0.08s", animationPlayState: playState }}
        >
          Let&apos;s talk
        </p>
        <h1
          className="mb-4 text-5xl font-bold leading-tight tracking-wide text-transparent opacity-0 sm:text-6xl md:text-7xl"
          style={{
            animation: "fade-in-up 0.8s ease forwards 0.16s",
            animationPlayState: playState,
            backgroundImage: "linear-gradient(90deg, #c084fc, #f0abfc, #a78bfa)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(192,132,252,0.45))",
          }}
        >
          Get in touch
        </h1>
        <p
          className="mb-4 max-w-xl text-base text-gray-300 opacity-80 opacity-0 sm:text-lg"
          style={{ animation: "fade-in-up 0.8s ease forwards 0.26s", animationPlayState: playState }}
        >
          Need a website for your business? Reach out directly and let&apos;s
          talk about what you&apos;re building — I read every message.
        </p>
        <p
          className="mb-14 flex items-center gap-2 text-sm text-gray-400 opacity-0 sm:text-base"
          style={{ animation: "fade-in-up 0.8s ease forwards 0.34s", animationPlayState: playState }}
        >
          <Clock className="h-4 w-4 flex-none text-purple-300" strokeWidth={1.75} />
          I read every message and typically reply within a few hours.
        </p>
      </div>

      {/* FORM */}
      <Reveal className="w-full max-w-2xl">
        <div className="relative rounded-2xl border border-white/10 p-1.5">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <form
            onSubmit={handleSubmit}
            className="relative rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={fieldLabel}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className={fieldControl}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className={fieldLabel}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={fieldControl}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="projectType" className={fieldLabel}>
                  Project type
                </label>
                <select
                  id="projectType"
                  required
                  className={`${fieldControl} appearance-none pr-10`}
                  value={form.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-neutral-900">
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 bottom-2.5 h-4 w-4 text-gray-500" />
              </div>
              <div className="relative">
                <label htmlFor="budget" className={fieldLabel}>
                  Budget range
                </label>
                <select
                  id="budget"
                  required
                  className={`${fieldControl} appearance-none pr-10`}
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b} className="bg-neutral-900">
                      {b}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 bottom-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className={fieldLabel}>
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className={`${fieldControl} resize-none`}
                placeholder="Tell me about your business and what you need."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              Your info is only used to get back to you about your project —
              nothing else.
            </p>

            <Magnetic strength={0.15} className="mt-6 inline-block">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.7)]"
              >
                Send message
                <Send className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
            </Magnetic>
          </form>
        </div>
      </Reveal>

      {/* SECONDARY CONTACT OPTIONS */}
      <div className="mt-16 w-full max-w-2xl text-center">
        <Reveal>
          <p className="mb-6 text-sm text-gray-400">
            Prefer to reach out directly?
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CONTACT_CARDS.map((card) => (
            <Magnetic
              key={card.label}
              strength={0.15}
              className="opacity-0"
              style={{
                animation: `fade-in-up 0.8s ease forwards ${card.delay}s`,
                animationPlayState: playState,
              }}
            >
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 px-4 py-8 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-purple-400/70 hover:bg-white/10 hover:shadow-[0_0_50px_-8px_rgba(168,85,247,0.7)]"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full bg-purple-500/20"
                    style={{ animation: `glow-pulse 3.5s ease-in-out infinite ${card.glowDelay}` }}
                  />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/15 text-purple-300 transition duration-300 group-hover:scale-110 group-hover:bg-purple-500/30 group-hover:text-white">
                    <card.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {card.label}
                </span>
                <span className="break-all text-sm font-medium text-white sm:text-base">
                  {card.value}
                </span>
              </a>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-24 w-full max-w-2xl">
        <Reveal>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
            {"// FAQ"}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mb-10 text-center text-2xl font-bold leading-tight tracking-wide sm:text-3xl">
            Quick answers
          </h2>
        </Reveal>
        <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={0.06 * i}>
              <div className="py-6">
                <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
