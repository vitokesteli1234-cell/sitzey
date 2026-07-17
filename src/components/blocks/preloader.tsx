"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Full-screen intro loader: a progress bar/counter fills over a fixed
 * duration, then two panels split open (like doors) to reveal the page.
 * Mounted once in the root layout, so it only plays on the initial
 * document load, not on client-side route navigations.
 *
 * No "already started" guard: the effect must be safe to run twice back
 * to back (React Strict Mode mounts, cleans up, and mounts again in dev),
 * and canceling the in-flight interval in the cleanup makes that naturally
 * idempotent. A guard here would block the second mount from ever
 * re-scheduling the timer it just canceled, freezing the loader forever.
 */
export function Preloader({
  onDone,
  onProgressComplete,
}: {
  onDone?: () => void;
  onProgressComplete?: () => void;
} = {}) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      onProgressComplete?.();
      onDone?.();
      return;
    }

    document.body.style.overflow = "hidden";

    const duration = 1600;
    const start = performance.now();

    const tick = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(Math.floor(eased * 100));
      if (t >= 1) {
        clearInterval(intervalId);
        setProgress(100);
        onProgressComplete?.();
        window.setTimeout(() => setPhase("exiting"), 200);
      }
    };
    const intervalId = window.setInterval(tick, 16);

    return () => clearInterval(intervalId);
  }, [reducedMotion, onDone, onProgressComplete]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const timeout = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      onDone?.();
    }, 900);
    return () => clearTimeout(timeout);
  }, [phase, onDone]);

  if (reducedMotion || phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black" aria-hidden="true">
      <div
        className="absolute inset-y-0 left-0 w-1/2 border-r border-white/10 bg-[#0b0d12]"
        style={{
          transform: exiting ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.9s cubic-bezier(0.65,0,0.35,1)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/2 border-l border-white/10 bg-[#0b0d12]"
        style={{
          transform: exiting ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.9s cubic-bezier(0.65,0,0.35,1)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{ opacity: exiting ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <div className="font-mono text-lg tracking-[0.4em] text-white sm:text-xl">
          SITZEY
          <span
            className="text-purple-400"
            style={{ animation: "blink-cursor 1s steps(1) infinite" }}
          >
            _
          </span>
        </div>
        <div className="h-[2px] w-[min(50vw,320px)] overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-fuchsia-400"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 10px rgba(192,132,252,0.5)",
            }}
          />
        </div>
        <div className="font-mono text-xs tracking-[0.2em] text-gray-500">
          {String(progress).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
