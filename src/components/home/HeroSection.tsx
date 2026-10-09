'use client';

import Image from 'next/image';
import Link from 'next/link';
import ImageTrail from '@/components/ImageTrail';

const STICKER_IMAGES = [
  '/sticker/stiker1.png',
  '/sticker/stiker2.png',
  '/sticker/stiker3.png',
  '/sticker/stiker4.png',
  '/sticker/stiker5.png',
  '/sticker/stiker6.png',
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-x-clip bg-[#F6F8FC] isolate">
      {/* Interactive Sticker Trail Overlay (Desktop Only) */}
      <div className="hidden md:block">
        <ImageTrail items={STICKER_IMAGES} variant={1} />
      </div>

      {/* ================================================== */}
      {/* DESKTOP HERO VIEW (md:block)                      */}
      {/* ================================================== */}
      <div className="hidden md:block relative w-full aspect-[1672/941] min-h-[500px]">
        {/* Desktop Background Image (bg-hero-deks.png) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/home/bg-hero-deks.png"
            alt="CodeKids Hero Background Desktop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right-top w-full h-full"
          />
        </div>

        {/* Desktop Content Area - Locked to 1672/941 aspect ratio */}
        <div className="absolute left-[5.5%] top-[20%] sm:top-[21%] lg:top-[22%] w-[52%] sm:w-[46%] md:w-[42%] lg:w-[39%] max-w-[680px] z-10 flex flex-col items-start text-left">
          {/* Main Hero Text Graphic */}
          <div className="w-full -ml-1 sm:-ml-2 md:-ml-2.5">
            <Image
              src="/home/herotext.png"
              alt="LEARN TO CODE. BUILD SOMETHING COOL."
              width={2066}
              height={761}
              priority
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Supporting Copy */}
          <p className="text-[#17233C] text-sm sm:text-base md:text-lg lg:text-xl font-bold mt-2 sm:mt-3 md:mt-4 lg:mt-5 mb-3 sm:mb-5 md:mb-6 leading-relaxed drop-shadow-sm max-w-md">
            Belajar coding dengan cara yang menyenangkan dan mudah dipahami
          </p>

          {/* Main CTA Button */}
          <Link
            href="/learn"
            className="bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] font-extrabold text-xs sm:text-sm md:text-base lg:text-lg px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center border-2 border-amber-300/40"
          >
            Mulai Belajar Sekarang
          </Link>
        </div>
      </div>

      {/* ================================================== */}
      {/* MOBILE HERO VIEW (< md)                            */}
      {/* ================================================== */}
      <div className="block md:hidden relative w-full aspect-[941/1672] min-h-[620px]">
        {/* Mobile Background Image (bg-hero-mobile.png) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/home/bg-hero-mobile.png"
            alt="CodeKids Hero Background Mobile"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top w-full h-full"
          />
        </div>

        {/* Mobile Content Area - Left-aligned text & title with centered button */}
        <div className="relative z-10 px-6 sm:px-8 pt-20 sm:pt-24 flex flex-col items-start text-left max-w-[360px]">
          {/* Hero Text Graphic (Mobile) - Left aligned & shifted left to match description */}
          <div className="w-full max-w-[320px] sm:max-w-[340px] mt-2 sm:mt-3 mb-1 -ml-3 sm:-ml-4">
            <Image
              src="/home/herotext-mobile.png"
              alt="LEARN TO CODE. BUILD SOMETHING COOL."
              width={2048}
              height={768}
              priority
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Mobile Supporting Copy - Left aligned & enlarged */}
          <p className="text-[#17233C] text-sm sm:text-base font-bold text-left mt-2.5 mb-4 leading-snug drop-shadow-sm max-w-[300px]">
            Belajar coding dengan cara yang menyenangkan dan mudah dipahami
          </p>

          {/* Mobile Main CTA Button - Centered, wider, no arrow */}
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto mt-1 flex justify-center">
            <Link
              href="/learn"
              className="w-full bg-[#FFD84D] hover:bg-[#FFE375] active:bg-[#FACC15] text-[#17233C] font-extrabold text-sm sm:text-base py-3 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95 inline-flex items-center justify-center border-2 border-amber-300/60"
            >
              Mulai Belajar
            </Link>

            {/* Radiant Yellow Sparkle Accent Lines on Top-Right of Button */}
            <div className="absolute -right-2 -top-1.5 pointer-events-none">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="3" strokeLinecap="round">
                <line x1="4" y1="20" x2="1" y2="23" />
                <line x1="11" y1="18" x2="11" y2="23" />
                <line x1="18" y1="13" x2="23" y2="15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
