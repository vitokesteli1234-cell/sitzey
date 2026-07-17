"use client";

import { Mail, Phone } from "lucide-react";
import { Magnetic } from "@/components/blocks/magnetic";
import { useIntroReady } from "@/components/blocks/intro-context";

export function ContactMain() {
  const ready = useIntroReady();
  const playState = ready ? "running" : "paused";

  return (
    <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center md:py-28">
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
        className="mb-14 max-w-xl text-base text-gray-300 opacity-80 opacity-0 sm:text-lg"
        style={{ animation: "fade-in-up 0.8s ease forwards 0.26s", animationPlayState: playState }}
      >
        Need a website for your business? Reach out directly and let&apos;s
        talk about what you&apos;re building — I read every message.
      </p>

      <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
        <Magnetic
          strength={0.15}
          className="opacity-0"
          style={{ animation: "fade-in-up 0.8s ease forwards 0.4s", animationPlayState: playState }}
        >
          <a
            href="mailto:sitzeyco@gmail.com"
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 px-6 py-10 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-purple-400/70 hover:bg-white/10 hover:shadow-[0_0_50px_-8px_rgba(168,85,247,0.7)]"
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
        </Magnetic>

        <Magnetic
          strength={0.15}
          className="opacity-0"
          style={{ animation: "fade-in-up 0.8s ease forwards 0.5s", animationPlayState: playState }}
        >
          <a
            href="tel:+385924209234"
            className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 px-6 py-10 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-purple-400/70 hover:bg-white/10 hover:shadow-[0_0_50px_-8px_rgba(168,85,247,0.7)]"
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
        </Magnetic>
      </div>
    </main>
  );
}
