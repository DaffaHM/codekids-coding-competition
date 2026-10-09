'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CourseCardData {
  id: number;
  title: string;
  image: string;
  level: string;
  subLevel: string;
  certificate: string;
  materials: string;
  buttonText: string;
  href: string;
  buttonStyles: {
    bg: string;
    hoverBg: string;
    text: string;
    border: string;
  };
}

const courseCards: CourseCardData[] = [
  {
    id: 1,
    title: 'Apa itu Coding?',
    image: '/learn/card1.png',
    level: 'Level Dasar',
    subLevel: 'Pemula',
    certificate: 'Sertifikat',
    materials: '5 Materi',
    buttonText: 'Mulai Belajar',
    href: '/learn/level-1',
    buttonStyles: {
      bg: 'bg-[#EBF3FF]',
      hoverBg: 'hover:bg-[#DBEAFE]',
      text: 'text-[#2563EB]',
      border: 'border-[#BFDBFE]',
    },
  },
  {
    id: 2,
    title: 'Algorithm',
    image: '/learn/card2.png',
    level: 'Level Dasar',
    subLevel: 'Pemula',
    certificate: 'Sertifikat',
    materials: '5 Materi',
    buttonText: 'Mulai Belajar',
    href: '/learn/level-2',
    buttonStyles: {
      bg: 'bg-[#FFFBEB]',
      hoverBg: 'hover:bg-[#FEF3C7]',
      text: 'text-[#D97706]',
      border: 'border-[#FDE68A]',
    },
  },
  {
    id: 3,
    title: 'HTML',
    image: '/learn/card3.png',
    level: 'Level Dasar',
    subLevel: 'Pemula',
    certificate: 'Sertifikat',
    materials: '5 Materi',
    buttonText: 'Mulai Belajar',
    href: '/learn/level-3',
    buttonStyles: {
      bg: 'bg-[#FFF1F2]',
      hoverBg: 'hover:bg-[#FFE4E6]',
      text: 'text-[#E11D48]',
      border: 'border-[#FECDD3]',
    },
  },
  {
    id: 4,
    title: 'CSS',
    image: '/learn/card4.png',
    level: 'Level Dasar',
    subLevel: 'Pemula',
    certificate: 'Sertifikat',
    materials: '5 Materi',
    buttonText: 'Mulai Belajar',
    href: '/learn/level-4',
    buttonStyles: {
      bg: 'bg-[#F0FDF4]',
      hoverBg: 'hover:bg-[#DCFCE7]',
      text: 'text-[#16A34A]',
      border: 'border-[#BBF7D0]',
    },
  },
  {
    id: 5,
    title: 'JavaScript',
    image: '/learn/card5.png',
    level: 'Level Dasar',
    subLevel: 'Pemula',
    certificate: 'Sertifikat',
    materials: '5 Materi',
    buttonText: 'Mulai Belajar',
    href: '/learn/level-5',
    buttonStyles: {
      bg: 'bg-[#FAF5FF]',
      hoverBg: 'hover:bg-[#F3E8FF]',
      text: 'text-[#9333EA]',
      border: 'border-[#E9D5FF]',
    },
  },
  {
    id: 6,
    title: 'Final Project',
    image: '/learn/card6.png',
    level: 'Level Dasar',
    subLevel: 'Pemula',
    certificate: 'Sertifikat',
    materials: '5 Materi',
    buttonText: 'Mulai Belajar',
    href: '/learn/level-6',
    buttonStyles: {
      bg: 'bg-[#F0F9FF]',
      hoverBg: 'hover:bg-[#E0F2FE]',
      text: 'text-[#0284C7]',
      border: 'border-[#BAE6FD]',
    },
  },
];

export default function CourseGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 3-Column Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {courseCards.map((card) => (
          <div
            key={card.id}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
          >
            {/* Top Banner Image (card1.png - card6.png) - 100% Flush to top/left/right edges */}
            <div className="w-full relative overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                width={1832}
                height={858}
                priority={card.id <= 3}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            {/* Middle 3-Feature Icons Section with Vertical Divider Lines */}
            <div className="px-3 sm:px-4 pt-3 pb-1">
              <div className="grid grid-cols-3 my-2.5">
                {/* Feature 1: Level */}
                <div className="flex flex-col items-center text-center border-r border-blue-100/80 pr-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 relative mb-1 flex items-center justify-center">
                    <Image
                      src="/levelicon.png"
                      alt="Level Dasar"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#17233C] leading-tight">
                    {card.level}
                  </span>
                  <span className="text-[11px] font-medium text-[#718096] leading-tight mt-0.5">
                    {card.subLevel}
                  </span>
                </div>

                {/* Feature 2: Certificate */}
                <div className="flex flex-col items-center text-center border-r border-blue-100/80 px-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 relative mb-1 flex items-center justify-center">
                    <Image
                      src="/sertificon.png"
                      alt="Sertifikat"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#17233C] leading-tight">
                    {card.certificate}
                  </span>
                  <span className="text-[11px] font-medium text-[#718096] leading-tight mt-0.5">
                    Tersedia
                  </span>
                </div>

                {/* Feature 3: Materials */}
                <div className="flex flex-col items-center text-center pl-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 relative mb-1 flex items-center justify-center">
                    <Image
                      src="/booksicon.png"
                      alt="5 Materi"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#17233C] leading-tight">
                    {card.materials}
                  </span>
                  <span className="text-[11px] font-semibold text-[#718096] leading-tight mt-0.5">
                    Pembelajaran
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Color-Themed Action Button */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0.5">
              <Link
                href={card.href}
                className={`w-full py-2.5 sm:py-3 px-5 rounded-full font-extrabold text-sm sm:text-base transition-all duration-200 shadow-xs hover:shadow-md active:scale-98 inline-flex items-center justify-center gap-1.5 border-2 ${card.buttonStyles.bg} ${card.buttonStyles.hoverBg} ${card.buttonStyles.text} ${card.buttonStyles.border}`}
              >
                <span>{card.buttonText}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
