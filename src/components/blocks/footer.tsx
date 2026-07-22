"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Magnetic } from "@/components/blocks/magnetic";
import { CONTACT_CARDS, WhatsAppIcon } from "@/components/blocks/contact-main";
import { focusRing, cn } from "@/lib/utils";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/#why", label: "Why" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const FOOTER_ICONS = { Email: Mail, Phone: Phone, WhatsApp: WhatsAppIcon };

// Renders on every route via layout.tsx — reuses the same section-shell
// pattern (glow blobs + dot-grid + container) as the homepage sections, and
// the same real contact data already established in contact-main.tsx's
// CONTACT_CARDS, so there's nothing new to fabricate here.
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-[10%] bottom-[-10%] h-[22rem] w-[22rem] rounded-full bg-purple-600/15 blur-[120px]"
          style={{ animation: "glow-pulse 10s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[5%] top-[10%] h-[20rem] w-[20rem] rounded-full bg-fuchsia-500/10 blur-[110px]"
          style={{ animation: "float-slow 13s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <Magnetic className="inline-block">
              <Link
                href="/"
                className={cn(
                  "text-sm font-bold uppercase tracking-[0.3em] text-purple-300 transition hover:text-white",
                  focusRing
                )}
                style={{ filter: "drop-shadow(0 0 10px rgba(192,132,252,0.6))" }}
              >
                SITZEY
              </Link>
            </Magnetic>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Website design &amp; development studio for small businesses.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Site
            </p>
            <ul className="flex flex-col gap-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm text-gray-300 transition hover:text-white",
                      focusRing
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              {CONTACT_CARDS.map((card) => {
                const Icon = FOOTER_ICONS[card.label as keyof typeof FOOTER_ICONS];
                return (
                  <li key={card.label}>
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group flex items-center gap-2 text-sm text-gray-300 transition hover:text-white",
                        focusRing
                      )}
                    >
                      <Icon className="h-4 w-4 flex-none text-purple-300" strokeWidth={1.75} />
                      {card.value}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Sitzey. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
