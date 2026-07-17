"use client";

import { useRef, type ReactNode } from "react";

const PULL_TRANSITION = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
const RETURN_TRANSITION = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)";

/**
 * Wraps a button/link so it pulls toward the cursor on hover and springs
 * back with an overshoot on mouseleave. Wraps the element in an extra box
 * rather than styling it directly, so it composes with any transform the
 * child already applies on its own hover state.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef<boolean | null>(null);

  const isEnabled = () => {
    if (enabledRef.current === null) {
      enabledRef.current =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return enabledRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !isEnabled()) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transition = PULL_TRANSITION;
    el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = RETURN_TRANSITION;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
