"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToElementCentered } from "@/components/blocks/smooth-scroll";
import { cn, focusRing } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

/**
 * Below the `sm` breakpoint the desktop nav's Why/Services/Process links
 * (`hidden ... sm:flex` in Navbar) disappear with no replacement — this is
 * that replacement. The "Contact" pill next to it stays visible on mobile
 * as-is, so it isn't duplicated inside this panel.
 */
export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToElementCentered(href.replace("#", ""));
    history.pushState(null, "", href);
  };

  return (
    <div className="relative">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 backdrop-blur-sm transition duration-200 hover:border-purple-400/60 hover:bg-white/10 hover:text-white",
          focusRing
        )}
      >
        {open ? (
          <X className="h-5 w-5" strokeWidth={1.75} />
        ) : (
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="absolute right-0 top-[calc(100%+0.75rem)] flex w-48 flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={cn(
                "rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 transition duration-200 hover:bg-white/5 hover:text-white",
                focusRing
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
