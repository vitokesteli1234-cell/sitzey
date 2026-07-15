import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { CursorGlitch } from "@/components/blocks/cursor-glitch";

export const metadata: Metadata = {
  title: "Contact — SITZEY",
  description: "Get in touch with Sitzey.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <CursorGlitch />

      {/* Animated background glow, matching the hero's palette */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/40 blur-[130px]"
          style={{ animation: "glow-pulse 6s ease-in-out infinite" }}
        />
        <div
          className="absolute right-1/4 top-2/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/25 blur-[110px]"
          style={{ animation: "glow-pulse 7s ease-in-out infinite 1.2s" }}
        />
        <div
          className="absolute left-1/4 bottom-0 h-[24rem] w-[24rem] rounded-full bg-indigo-500/25 blur-[110px]"
          style={{ animation: "float-slow 10s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Minimal header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.3em] text-purple-300 uppercase transition hover:text-white"
          style={{ filter: "drop-shadow(0 0 10px rgba(192,132,252,0.6))" }}
        >
          SITZEY
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-300 transition hover:text-white"
        >
          ← Back home
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center md:py-28">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 opacity-0"
          style={{ animation: "fade-in-up 0.7s ease forwards" }}
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
          style={{ animation: "fade-in-up 0.7s ease forwards 0.08s" }}
        >
          Let&apos;s talk
        </p>
        <h1
          className="mb-4 text-5xl font-bold leading-tight tracking-wide text-transparent opacity-0 sm:text-6xl md:text-7xl"
          style={{
            animation: "fade-in-up 0.8s ease forwards 0.16s",
            backgroundImage: "linear-gradient(90deg, #c084fc, #f0abfc, #a78bfa)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(192,132,252,0.45))",
          }}
        >
          Get in touch
        </h1>
        <p
          className="mb-14 max-w-xl text-base text-gray-300 opacity-80 opacity-0 sm:text-lg"
          style={{ animation: "fade-in-up 0.8s ease forwards 0.26s" }}
        >
          Need a website for your business? Reach out directly and let&apos;s
          talk about what you&apos;re building — I read every message.
        </p>

        <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
          <a
            href="mailto:sitzeyco@gmail.com"
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 px-6 py-10 opacity-0 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-purple-400/70 hover:bg-white/10 hover:shadow-[0_0_50px_-8px_rgba(168,85,247,0.7)]"
            style={{ animation: "fade-in-up 0.8s ease forwards 0.4s" }}
          >
            <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span
                className="absolute inset-0 rounded-full bg-purple-500/20"
                style={{ animation: "glow-pulse 3.5s ease-in-out infinite" }}
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/15 text-purple-300 transition duration-300 group-hover:scale-110 group-hover:bg-purple-500/30 group-hover:text-white">
                <Mail className="h-6 w-6" />
              </span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Email
            </span>
            <span className="break-all text-base font-medium text-white sm:text-lg">
              sitzeyco@gmail.com
            </span>
          </a>

          <a
            href="tel:+385924209234"
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 px-6 py-10 opacity-0 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-purple-400/70 hover:bg-white/10 hover:shadow-[0_0_50px_-8px_rgba(168,85,247,0.7)]"
            style={{ animation: "fade-in-up 0.8s ease forwards 0.5s" }}
          >
            <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span
                className="absolute inset-0 rounded-full bg-purple-500/20"
                style={{ animation: "glow-pulse 3.5s ease-in-out infinite 0.4s" }}
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/15 text-purple-300 transition duration-300 group-hover:scale-110 group-hover:bg-purple-500/30 group-hover:text-white">
                <Phone className="h-6 w-6" />
              </span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Phone
            </span>
            <span className="text-base font-medium text-white sm:text-lg">
              +385 92 420 9234
            </span>
          </a>
        </div>
      </main>
    </div>
  );
}
