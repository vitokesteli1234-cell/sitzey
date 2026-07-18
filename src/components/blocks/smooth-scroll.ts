function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Scrolls so the target element's vertical midpoint lands centered within
 * the area actually visible below the fixed nav bar (not the raw viewport
 * height, which would sit the target slightly too high since the nav
 * covers the top slice of the screen), with a quick, flowing ease rather
 * than an instant jump — the "waterfall" cascade down the page instead of
 * a snap-cut.
 *
 * Uses setInterval rather than requestAnimationFrame: rAF is throttled or
 * fully paused on backgrounded/inactive tabs in some environments, which
 * would silently freeze the animation, whereas setInterval keeps firing.
 */
export function scrollToElementCentered(id: string, duration = 650) {
  const el = document.getElementById(id);
  if (!el) return;

  const nav = document.querySelector("nav");
  const navHeight = nav ? nav.getBoundingClientRect().height : 0;
  const visibleHeight = window.innerHeight - navHeight;

  const rect = el.getBoundingClientRect();
  const elementMiddle = rect.top + window.scrollY + rect.height / 2;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const targetY = Math.max(
    0,
    Math.min(elementMiddle - navHeight - visibleHeight / 2, maxScroll)
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const start = performance.now();

  const intervalId = window.setInterval(() => {
    const t = Math.min((performance.now() - start) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t >= 1) clearInterval(intervalId);
  }, 16);
}
