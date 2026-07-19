import type { Metadata } from "next";
import Link from "next/link";
import { CursorGlitch } from "@/components/blocks/cursor-glitch";
import { Magnetic } from "@/components/blocks/magnetic";
import { ContactMain } from "@/components/blocks/contact-main";

export const metadata: Metadata = {
  title: "Contact — SITZEY",
  description: "Get in touch with Sitzey.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
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
        <Magnetic className="inline-block">
          <Link
            href="/"
            className="text-sm font-bold tracking-[0.3em] text-purple-300 uppercase transition hover:text-white"
            style={{ filter: "drop-shadow(0 0 10px rgba(192,132,252,0.6))" }}
          >
            SITZEY
          </Link>
        </Magnetic>
        <Magnetic className="inline-block">
          <Link
            href="/"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            ← Back home
          </Link>
        </Magnetic>
      </header>

      <ContactMain />
    </div>
  );
}
