"use client";

import React, { useEffect, useRef } from 'react';
import { Suspense, lazy } from 'react'
import { Space_Grotesk } from 'next/font/google'
import { StoryAndWorkSection } from '@/components/blocks/sitzey-story-and-work'
import { WhyWebsiteSection } from '@/components/blocks/why-website-section'
import { ServicesSection } from '@/components/blocks/services-section'
import { ProcessSection } from '@/components/blocks/process-section'
import { Magnetic } from '@/components/blocks/magnetic'
import { useIntroReady } from '@/components/blocks/intro-context'
import { scrollToElementCentered } from '@/components/blocks/smooth-scroll'
const Spline = lazy(() => import('@splinetool/react-spline'))

// Geometric, slightly technical sans for the hero's supporting copy —
// distinct from the SITZEY wordmark's own gradient treatment, and matches
// the display font used by the sitzey-website reference this hero mirrors.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_OUT_BACK = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

const NAV_LINKS = [
  { href: '#why', label: 'Why' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
]


function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      <Suspense fallback={null}>
        <Spline
          style={{
            width: '100%',
            height: '100vh',
            pointerEvents: 'auto',
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 42%, rgba(0, 0, 0, 0.55) 68%, rgba(0, 0, 0, 0.88) 85%, #000 100%)
          `,
          pointerEvents: 'none',
        }}
      />
      {/* Covers the Spline runtime's "Built with Spline" badge, which is
          baked into the canvas render itself and can't be hidden via CSS. */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '220px',
          height: '90px',
          background:
            'radial-gradient(circle at 100% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 40%, rgba(0,0,0,0.75) 70%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function HeroContent() {
  const ready = useIntroReady();
  const playState = ready ? "running" : "paused";

  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl">
      <div className="relative isolate mb-6 inline-block sm:mb-8">
        <div
          className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 70% at 32% 50%, rgba(232,121,249,0.55), transparent 70%)",
            animation: "glow-pulse 4s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 backdrop-blur-sm sm:px-8 sm:py-3.5 md:px-10 md:py-4"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            opacity: 0,
            animation: `pop-in 0.9s ${EASE_OUT_BACK} forwards`,
            animationPlayState: playState,
          }}
        >
          <p
            className="text-4xl font-black uppercase tracking-[0.35em] text-transparent sm:text-6xl md:text-7xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #f5d0fe, #e879f9, #c084fc, #a78bfa)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextStroke: "1px rgba(255,255,255,0.18)",
              filter:
                "drop-shadow(0 0 28px rgba(232,121,249,0.9)) drop-shadow(0 0 60px rgba(168,85,247,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))",
            }}
          >
            SITZEY
          </p>
        </div>
      </div>
      <p
        className={`${spaceGrotesk.className} mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-300 sm:text-sm`}
        style={{
          opacity: 0,
          animation: `fade-in-up 0.8s ${EASE_OUT} forwards 0.16s`,
          animationPlayState: playState,
        }}
      >
        Website design &amp; development studio for small businesses
      </p>
      <h1
        className={`${spaceGrotesk.className} text-3xl sm:text-5xl md:text-7xl font-semibold mb-4 leading-tight tracking-wide`}
        style={{
          opacity: 0,
          animation: `fade-in-up 0.9s ${EASE_OUT} forwards 0.3s`,
          animationPlayState: playState,
        }}
      >
        We build websites <br className="sm:hidden" />for businesses<br className="sm:hidden" /> that want to stand out.
      </h1>
    </div>
  );
}

function handleSectionNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace('#', '');
  scrollToElementCentered(id);
  history.pushState(null, '', href);
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20"
      style={{ backgroundColor: 'rgba(13, 13, 24, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: '0 0 15px 15px' }}
    >
      <div className="container mx-auto flex items-center justify-between gap-8 px-4 py-4 md:px-6 lg:px-8">
        <Magnetic className="inline-block">
          <a
            href="#top"
            className="text-sm font-bold uppercase tracking-[0.3em] text-purple-300 transition hover:text-white"
            style={{ filter: "drop-shadow(0 0 10px rgba(192,132,252,0.6))" }}
          >
            SITZEY
          </a>
        </Magnetic>

        <div className="flex items-center gap-8">
          <div className={`${spaceGrotesk.className} hidden items-center gap-7 sm:flex`}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionNavClick(e, link.href)}
                className="relative text-sm font-medium text-gray-300 transition duration-200 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Magnetic className="inline-block">
            <a
              href="/contact"
              className={`${spaceGrotesk.className} rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-base font-medium text-gray-200 backdrop-blur-sm transition duration-200 hover:border-purple-400/60 hover:bg-white/10 hover:text-white sm:text-lg`}
            >
              Contact
            </a>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
}

export const HeroSection = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="top" className="relative">
      <Navbar />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <div className="container mx-auto">
            <HeroContent />
          </div>
        </div>
      </div>

      <StoryAndWorkSection />
      <WhyWebsiteSection />
      <ServicesSection />
      <ProcessSection />
    </div>
  );
};
