import Link from "next/link";
import { Magnetic } from "@/components/blocks/magnetic";
import { cn, focusRing } from "@/lib/utils";

export default function NotFound() {
  return (
    <main id="main-content" className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center text-white">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
        404
      </p>
      <h1
        className="mb-4 text-4xl font-bold leading-tight tracking-wide text-transparent sm:text-5xl md:text-6xl"
        style={{
          backgroundImage: "linear-gradient(90deg, #c084fc, #f0abfc, #a78bfa)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 30px rgba(192,132,252,0.45))",
        }}
      >
        Page not found
      </h1>
      <p className="mb-10 max-w-md text-base text-gray-300 sm:text-lg">
        That page doesn&apos;t exist — but the rest of the site does.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Magnetic strength={0.15} className="inline-block">
          <Link
            href="/"
            className={cn(
              "rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.7)]",
              focusRing
            )}
          >
            Back home
          </Link>
        </Magnetic>
        <Magnetic strength={0.15} className="inline-block">
          <Link
            href="/contact"
            className={cn(
              "rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-gray-200 backdrop-blur-sm transition duration-200 hover:border-purple-400/60 hover:bg-white/10 hover:text-white",
              focusRing
            )}
          >
            Contact us
          </Link>
        </Magnetic>
      </div>
    </main>
  );
}
