'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// User-specified Lottie animation:
// URL: https://lottie.host/embed/20879135-67de-4b05-bb6c-334b61ed958d/fAbsrGW29T.json
// Raw: https://lottie.host/20879135-67de-4b05-bb6c-334b61ed958d/fAbsrGW29T.json
// Local asset (/lottie/page-transition.json) provides instant 0ms load without CDN latency
const TRANSITION_LOTTIE_URL = '/lottie/page-transition.json';

// In-memory cache for transition animation data (avoids fetch aborts and eliminates network delays)
let transitionJsonCache: string | null = null;

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Presentational Visual for Inter-Page Transition
 */
export function PageTransitionVisual() {
  const [data, setData] = useState<string | null>(transitionJsonCache);

  useEffect(() => {
    if (!transitionJsonCache) {
      fetch(TRANSITION_LOTTIE_URL)
        .then((res) => res.text())
        .then((text) => {
          transitionJsonCache = text;
          setData(text);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div className="w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center drop-shadow-md">
        {data ? (
          <DotLottieReact
            data={data}
            backgroundColor="transparent"
            loop
            autoplay
          />
        ) : (
          <DotLottieReact
            src={TRANSITION_LOTTIE_URL}
            backgroundColor="transparent"
            loop
            autoplay
          />
        )}
      </div>
      <p className="text-xs sm:text-sm font-semibold text-[#64748B] tracking-wide mt-1 animate-pulse font-[family-name:var(--font-fredoka)]">
        Memuat halaman...
      </p>
    </div>
  );
}

/**
 * Smooth Inter-Page Transition:
 * - Triggered strictly between pages (pathname changes)
 * - Uses the cute books & graduation cap Lottie animation
 * - Quick, smooth fade out to reveal the newly loaded page
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);

  // Pre-fetch and cache the transition Lottie file in memory on initial app load
  useEffect(() => {
    if (!transitionJsonCache && typeof window !== 'undefined') {
      fetch(TRANSITION_LOTTIE_URL)
        .then((res) => res.text())
        .then((text) => {
          transitionJsonCache = text;
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    // Initial mount: do not trigger inter-page transition (initial loader handles first load)
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }

    // When navigating to a different page
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setIsTransitioning(true);
      setIsFadingOut(false);

      // Smooth scroll to top on page change (unless anchor link)
      if (typeof window !== 'undefined' && !window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      // Transition timing: ~1.7s display (user requested slightly longer), 450ms fade out
      const fTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 1700);

      const dTimer = setTimeout(() => {
        setIsTransitioning(false);
        setIsFadingOut(false);
      }, 2150);

      return () => {
        clearTimeout(fTimer);
        clearTimeout(dTimer);
      };
    }
  }, [pathname]);

  return (
    <>
      {/* Inter-Page Lottie Transition Overlay (Solid opaque background, zero transparency) */}
      {isTransitioning && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-[99990] flex items-center justify-center bg-white transition-opacity duration-500 ease-out select-none ${
            isFadingOut
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 pointer-events-auto'
          }`}
        >
          <PageTransitionVisual />
        </div>
      )}

      {/* Page Content with smooth enter animation */}
      <div
        key={pathname}
        className="w-full flex-1 flex flex-col animate-page-enter"
      >
        {children}
      </div>
    </>
  );
}
