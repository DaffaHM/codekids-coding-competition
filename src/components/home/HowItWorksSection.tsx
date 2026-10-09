import React from 'react';
import Image from 'next/image';

export default function HowItWorksSection() {
  return (
    <section className="relative w-full pt-10 pb-16 sm:py-20 lg:py-24 overflow-x-clip isolate">
      {/* Background Graphic Image (public/home/bg-howitswork.png) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/home/bg-howitswork.png"
          alt="Cara Belajar Background"
          fill
          sizes="100vw"
          className="object-cover object-center w-full h-full"
          priority={false}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#17233C] tracking-tight leading-tight">
            Cara Belajar di{' '}
            <span className="inline-block text-[#3B82F6]">
              Code<span className="text-[#FFD84D] relative">Kids<span className="absolute -top-1 -right-3.5 text-amber-400 text-sm sm:text-lg">✦</span></span>
            </span>
          </h2>
          <p className="text-xs sm:text-lg lg:text-xl font-bold text-[#17233C]/80 max-w-2xl mx-auto leading-snug sm:leading-relaxed px-2 sm:px-0">
            Mulai dari belajar konsep, mencoba langsung, hingga membuat project nyata. Ikuti perjalananmu menjadi seorang CodeKid!
          </p>
        </div>

        {/* Desktop Journey Illustration (public/home/howitswork.png) */}
        <div className="hidden sm:flex relative w-full max-w-6xl mx-auto justify-center items-center">
          <Image
            src="/home/howitswork.png"
            alt="Cara Belajar di CodeKids Journey Desktop"
            width={2048}
            height={1024}
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority={false}
            className="w-full h-auto object-contain drop-shadow-sm transition-transform hover:scale-[1.005] duration-300"
          />
        </div>

        {/* Mobile Journey Illustration (public/home/howitswork-mobile.png) */}
        <div className="flex sm:hidden relative w-full max-w-md mx-auto justify-center items-center px-1 my-2 pb-4">
          <Image
            src="/home/howitswork-mobile.png"
            alt="Cara Belajar di CodeKids Journey Mobile"
            width={1080}
            height={1920}
            sizes="100vw"
            priority={false}
            className="w-full h-auto object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
