"use client";

import { useEffect, useRef } from "react";

/**
 * A purple glow that trails the cursor. Red/cyan "ghost" layers split off
 * in the direction of motion, scaled by cursor speed — so the RGB-split
 * glitch look is a direct function of how fast you're moving, not an
 * independent timer. Idle cursor = clean glow, fast flicks = glitch burst.
 * Desktop-only: disabled on touch devices and prefers-reduced-motion.
 */
export function CursorGlitch() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const redRef = useRef<HTMLDivElement>(null);
  const cyanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canAnimate =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrapper = wrapperRef.current;
    const core = coreRef.current;
    const red = redRef.current;
    const cyan = cyanRef.current;
    if (!canAnimate || !wrapper || !core || !red || !cyan) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let x = mouseX;
    let y = mouseY;
    let vx = 0;
    let vy = 0;
    let rafId = 0;
    let visible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        wrapper.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      visible = false;
      wrapper.style.opacity = "0";
    };

    const handleMouseDown = () => {
      core.style.transform = "translate(-50%, -50%) scale(1.6)";
      core.style.transition = "transform 0.15s ease-out";
      window.setTimeout(() => {
        core.style.transition = "";
      }, 160);
    };

    const tick = () => {
      // Snappy follow — closes ~30% of the gap to the cursor each frame.
      x += (mouseX - x) * 0.3;
      y += (mouseY - y) * 0.3;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      vx += (dx - vx) * 0.3;
      vy += (dy - vy) * 0.3;

      const speed = Math.min(Math.hypot(vx, vy), 45);
      const offset = speed * 0.85;
      const angle = Math.atan2(vy, vx);
      const offsetX = Math.cos(angle) * offset;
      const offsetY = Math.sin(angle) * offset;
      const ghostOpacity = Math.min(speed / 14, 0.85);
      const coreScale = 1 + Math.min(speed / 90, 0.18);

      wrapper.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!core.style.transition) {
        core.style.transform = `translate(-50%, -50%) scale(${coreScale})`;
      }
      red.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
      red.style.opacity = String(ghostOpacity);
      cyan.style.transform = `translate(calc(-50% - ${offsetX}px), calc(-50% - ${offsetY}px))`;
      cyan.style.opacity = String(ghostOpacity);

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    >
      <div ref={redRef} className="glitch-ghost glitch-ghost-red" />
      <div ref={cyanRef} className="glitch-ghost glitch-ghost-cyan" />
      <div ref={coreRef} className="glitch-core" />
    </div>
  );
}
