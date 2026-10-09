import React from 'react';
import Image from 'next/image';
import { RiLightbulbLine, RiTerminalBoxLine, RiEyeLine } from 'react-icons/ri';

interface CardItem {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgStyle: string;
}

const CARDS: CardItem[] = [
  {
    id: 1,
    imageSrc: '/home/card1.png',
    title: 'Mudah Dipahami',
    description: 'Materi dibuat sederhana dan menggunakan bahasa yang mudah dimengerti',
    icon: <RiLightbulbLine className="w-5.5 h-5.5 text-[#3B82F6]" />,
    iconBgStyle: 'bg-[#EFF6FF] border-[#BFDBFE]',
  },
  {
    id: 2,
    imageSrc: '/home/card2.png',
    title: 'Langsung Praktik',
    description: 'Tulis dan jalankan kode langsung di dalam website gak perlu instal apapun',
    icon: <RiTerminalBoxLine className="w-5.5 h-5.5 text-[#CA8A04]" />,
    iconBgStyle: 'bg-[#FEF9C3] border-[#FDE047]',
  },
  {
    id: 3,
    imageSrc: '/home/card3.png',
    title: 'Lihat Hasilnya',
    description: 'Setiap kode yang kamu buat bisa dilihat langsung hasilnya, kamu bisa coba',
    icon: <RiEyeLine className="w-5.5 h-5.5 text-[#16A34A]" />,
    iconBgStyle: 'bg-[#DCFCE7] border-[#86EFAC]',
  },
];

export default function WhyCodeKidsSection() {
  return (
    <section className="relative w-full py-10 sm:py-16 lg:py-20 overflow-x-clip isolate">
      {/* Background Graphic Image (bg-section2.png) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/home/bg-section2.png"
          alt="CodeKids Section Background"
          fill
          sizes="100vw"
          className="object-cover object-center w-full h-full"
          priority={false}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#17233C] tracking-tight">
            Kenapa Belajar di{' '}
            <span className="inline-block text-[#4F7DF3]">
              Code<span className="text-[#FFD84D] relative">Kids<span className="absolute -top-1 -right-3 text-amber-400 text-xs sm:text-base">✦</span></span>
            </span>
          </h2>
          <p className="text-xs sm:text-lg lg:text-xl font-bold text-[#17233C]/80 max-w-2xl mx-auto px-2 sm:px-0">
            Belajar coding jadi lebih mudah, seru, dan bisa langsung kamu praktikkan.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border-2 border-slate-100 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between space-y-3.5 sm:space-y-4"
            >
              {/* Card Illustration Image - Reduced gap, closer to card outer border */}
              <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  width={1241}
                  height={931}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-auto object-contain rounded-lg sm:rounded-xl"
                />
              </div>

              {/* Title & Description with Soft Pastel Colored Icon Badge */}
              <div className="flex items-start gap-3 pt-0.5 pb-1">
                {/* Soft Pastel Icon Circle Badge (Unique color per card) */}
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border ${card.iconBgStyle} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}>
                  {card.icon}
                </div>

                {/* Text Group */}
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="text-base sm:text-xl font-black text-[#17233C] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#718096] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
