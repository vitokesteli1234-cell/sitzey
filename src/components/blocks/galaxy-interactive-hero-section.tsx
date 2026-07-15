"use client";

import React, { useEffect, useRef } from 'react';
import { Suspense, lazy } from 'react'
import { StoryAndWorkSection } from '@/components/blocks/sitzey-story-and-work'
const Spline = lazy(() => import('@splinetool/react-spline'))


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
  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl">
      <p
        className="mb-4 text-4xl font-black uppercase tracking-[0.35em] text-transparent sm:mb-6 sm:text-6xl md:text-7xl"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #6b21a8, #86198f, #4c1d95)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextStroke: "1.5px rgba(0,0,0,0.6)",
          filter:
            "drop-shadow(0 0 22px rgba(88,28,135,0.9)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))",
        }}
      >
        SITZEY
      </p>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300 sm:text-sm">
        Website design &amp; development studio for small businesses
      </p>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-wide">
        We build websites <br className="sm:hidden" />for businesses<br className="sm:hidden" /> that want to stand out.
      </h1>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20"
      style={{ backgroundColor: 'rgba(13, 13, 24, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: '0 0 15px 15px' }}
    >
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-end">
        <a
          href="/contact"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-base font-medium text-gray-200 backdrop-blur-sm transition duration-200 hover:border-purple-400/60 hover:bg-white/10 hover:text-white sm:text-lg"
        >
          Contact
        </a>
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
    <div className="relative">
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
    </div>
  );
};
