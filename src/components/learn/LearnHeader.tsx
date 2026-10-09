'use client';

import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';

export default function LearnHeader() {
  return (
    <section className="relative w-full overflow-x-clip bg-[#F6F8FC] isolate pt-16 sm:pt-28 md:pt-32 lg:pt-20">

      {/* Full Width Edge-to-Edge Banner Container */}
      <div className="relative w-full h-[170px] xs:h-[190px] sm:h-[250px] md:h-[300px] lg:h-[340px] overflow-hidden mt-4 sm:mt-6">
        {/* Background Image (public/learn/bg-header.png) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/learn/bg-header.png"
            alt="Learn Page Header Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] sm:object-center w-full h-full"
          />
        </div>

        {/* Left Content Area (Text Graphic + Regular Description Text) */}
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex flex-col justify-center items-start text-left z-10">
          <div className="w-[58%] xs:w-[56%] sm:w-[50%] md:w-[44%] max-w-[520px]">
            {/* Title Graphic Image (public/learn/textheader.png) */}
            <div className="w-full max-w-[210px] xs:max-w-[240px] sm:max-w-[340px] md:max-w-[420px] -ml-0.5 sm:-ml-2">
              <Image
                src="/learn/textheader.png"
                alt="Yuk, Mulai Belajar Coding!"
                width={2170}
                height={725}
                priority
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* Description Regular Text - Indented right on mobile & desktop */}
            <p className="text-[#17233C] text-[10px] xs:text-xs sm:text-sm md:text-base font-bold mt-1 sm:mt-2.5 leading-tight sm:leading-snug drop-shadow-sm max-w-md ml-3.5 xs:ml-4 sm:ml-8 md:ml-10 lg:ml-11">
              Pilih Materi dan mulai petualangan coding-mu dari dasar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
