"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Preloader } from "@/components/blocks/preloader";
import { playIntroChime } from "@/components/blocks/intro-sound";

const IntroReadyContext = createContext(true);

/** Whether the preloader has finished — gates page-content entrance animations. */
export function useIntroReady() {
  return useContext(IntroReadyContext);
}

export function IntroGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  // Stable references: Preloader depends on both in useEffect arrays, and
  // ready flipping true is exactly what causes IntroGate to re-render — an
  // inline arrow here would change identity on that render, re-triggering
  // Preloader's effects (resurrecting the loading screen, or re-firing the
  // chime, after the page had already been revealed).
  const handleDone = useCallback(() => setReady(true), []);

  // Defensive guard against a double chime: Preloader's own progress timer
  // is naturally Strict-Mode-safe (its cleanup cancels the stray first
  // interval before it ever fires), but this makes double-firing
  // impossible even if that ever changes.
  const chimePlayedRef = useRef(false);
  const handleProgressComplete = useCallback(() => {
    if (chimePlayedRef.current) return;
    chimePlayedRef.current = true;
    playIntroChime();
  }, []);

  return (
    <IntroReadyContext.Provider value={ready}>
      <Preloader onDone={handleDone} onProgressComplete={handleProgressComplete} />
      {children}
    </IntroReadyContext.Provider>
  );
}
