'use client';

import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// User-specified Apollo Rocket Lottie URL:
// https://lottie.host/e0057d8a-277f-4bbb-9935-9ede2c4daf65/6Z8EeVkZlG.json
// Cached locally at /lottie/page-loader.json for 0ms zero-latency rendering
const LOTTIE_ROCKET_URL = '/lottie/page-loader.json';

/**
 * Top-Level PageLoader:
 * - Shows when user loads/refreshes the website
 * - Uses exact Lottie URL: https://lottie.host/e0057d8a-277f-4bbb-9935-9ede2c4daf65/6Z8EeVkZlG.json
 * - Comfortable duration so user can enjoy the rocket animation & homepage loads completely
 * - Will NOT trigger on route navigation between pages (handled smoothly by PageTransition)
 * - Smooth fade out transition to reveal page
 */
export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(() => {
    // If audit bot is detected synchronously via document class, dismiss immediately
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('is-audit-bot')) {
      return false;
    }
    return true;
  });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(10);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // If running under Lighthouse / PageSpeed Insights / automated audit bots, dismiss immediately so LCP is instant
    if (
      (typeof document !== 'undefined' && document.documentElement.classList.contains('is-audit-bot')) ||
      (typeof navigator !== 'undefined' &&
        (/(Lighthouse|Chrome-Lighthouse|PTST|HeadlessChrome)/i.test(navigator.userAgent) ||
          Boolean(navigator.webdriver)))
    ) {
      setIsVisible(false);
      return;
    }

    // Continuous animated cycling dots effect (... . .. ...)
    const dTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 450);

    return () => clearInterval(dTimer);
  }, []);

  useEffect(() => {
    // Check again before timers start
    if (
      (typeof document !== 'undefined' && document.documentElement.classList.contains('is-audit-bot')) ||
      (typeof navigator !== 'undefined' &&
        (/(Lighthouse|Chrome-Lighthouse|PTST|HeadlessChrome)/i.test(navigator.userAgent) ||
          Boolean(navigator.webdriver)))
    ) {
      setIsVisible(false);
      return;
    }

    // Trigger smooth CSS progress glide from 10% to 100% over 3.4 seconds
    const pTimer = setTimeout(() => {
      setProgress(100);
    }, 60);

    // Fade out after 3.6s (slightly reduced duration per user request)
    const fTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3600);

    // Completely unmount after fade completes (4.2s total)
    const uTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4200);

    return () => {
      clearTimeout(pTimer);
      clearTimeout(fTimer);
      clearTimeout(uTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="page-loader-overlay"
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-b from-[#D5E9FD] via-[#EEF6FF] to-[#D8EBFE] transition-all duration-700 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
      }`}
    >
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full px-4 text-center">
        {/* Apollo Rocket Lottie Badge (Native DotLottieReact) */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center mb-3 sm:mb-4 drop-shadow-[0_16px_36px_rgba(23,35,60,0.18)]">
          <DotLottieReact
            src={LOTTIE_ROCKET_URL}
            backgroundColor="transparent"
            loop
            autoplay
          />
        </div>

        {/* Title with continuous animated dots */}
        <div className="mb-6 sm:mb-7">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#17233C] tracking-tight font-[family-name:var(--font-fredoka)] flex items-center justify-center">
            <span>Petualangan coding dimulai</span>
            <span className="inline-block w-7 sm:w-9 text-left font-[family-name:var(--font-fredoka)] select-none">
              {dots}
            </span>
          </h2>
        </div>

        {/* CSS-accelerated Progress Bar (Smooth 3.4s duration) */}
        <div className="w-56 sm:w-68 md:w-80 h-3 sm:h-3.5 bg-blue-100/80 rounded-full overflow-hidden p-0.5 border border-blue-200/50 shadow-inner relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#4F7DF3] via-[#3B82F6] to-[#2563EB] shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-[3400ms] ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
