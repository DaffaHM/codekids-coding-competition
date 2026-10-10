'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  RiHome5Line, 
  RiBookOpenLine, 
  RiAwardLine, 
  RiLightbulbLine,
  RiYoutubeFill,
  RiInstagramLine,
  RiLinkedinFill
} from 'react-icons/ri';

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer when entering lesson/materi pages (e.g. /learn/[topicId])
  const isMateriPage = pathname ? pathname.startsWith('/learn/') : false;
  if (isMateriPage) {
    return null;
  }

  const navigationLinks = [
    { name: 'Beranda', href: '/', icon: <RiHome5Line className="w-5 h-5" /> },
    { name: 'Materi', href: '/learn', icon: <RiBookOpenLine className="w-5 h-5" /> },
    { name: 'Sertifikatku', href: '/certificate', icon: <RiAwardLine className="w-5 h-5" /> },
  ];

  const materiLinks = [
    { name: 'Apa Itu Coding', href: '/learn/level-1' },
    { name: 'Algorithm', href: '/learn/level-2' },
    { name: 'HTML', href: '/learn/level-3' },
    { name: 'CSS', href: '/learn/level-4' },
    { name: 'JavaScript', href: '/learn/level-5' },
    { name: 'Final Project', href: '/learn/level-6' },
  ];

  const bantuanLinks = [
    { name: 'FAQ', href: '#' },
    { name: 'Kontak Kami', href: '#' },
    { name: 'Saran & Masukan', href: '#' },
  ];

  return (
    <footer className="relative w-full overflow-hidden isolate pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-6 mt-auto bg-gradient-to-b from-[#F6F8FC] via-[#E8F2FE] to-[#D5E8FD] border-t border-blue-100/70">
      {/* Soft Ambient Cloud Glows */}
      <div className="absolute -top-12 left-1/4 w-96 h-48 bg-white/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-8 right-12 w-80 h-40 bg-blue-100/60 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 left-12 w-72 h-36 bg-white/70 rounded-full blur-2xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 sm:pb-12 items-start">
          
          {/* Column 1: Logo, Subtitle, & Social Icons */}
          <div className="md:col-span-5 lg:col-span-4 space-y-3.5 sm:space-y-4">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/codekidslogo.png"
                alt="CodeKids Logo"
                width={2172}
                height={724}
                className="w-36 sm:w-44 md:w-48 h-auto object-contain"
              />
            </Link>

            <p className="text-[#17233C]/80 font-bold text-xs sm:text-sm lg:text-base leading-relaxed max-w-sm">
              Belajar coding dengan cara yang menyenangkan, sederhana, dan cocok untuk anak-anak.
            </p>

            {/* Social Media Round Buttons */}
            <div className="flex items-center gap-3 pt-1 sm:pt-2">
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-100 flex items-center justify-center text-red-500 hover:scale-110 transition-all duration-200"
              >
                <RiYoutubeFill className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-100 flex items-center justify-center text-pink-600 hover:scale-110 transition-all duration-200"
              >
                <RiInstagramLine className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-100 flex items-center justify-center text-[#0A66C2] hover:scale-110 transition-all duration-200"
              >
                <RiLinkedinFill className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 sm:gap-8">
            
            {/* Column 2: Navigasi */}
            <div className="space-y-2.5 sm:space-y-3">
              <h3 className="text-sm sm:text-base lg:text-lg font-black text-[#17233C] tracking-tight">
                Navigasi
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {navigationLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base font-bold transition-colors ${
                          isActive
                            ? 'text-[#2563EB]'
                            : 'text-[#17233C]/80 hover:text-[#2563EB]'
                        }`}
                      >
                        <span className={isActive ? 'text-[#2563EB]' : 'text-[#17233C]/70'}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Materi */}
            <div className="space-y-2.5 sm:space-y-3">
              <h3 className="text-sm sm:text-base lg:text-lg font-black text-[#17233C] tracking-tight">
                Materi
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {materiLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm lg:text-base font-bold text-[#17233C]/80 hover:text-[#2563EB] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Bantuan */}
            <div className="space-y-2.5 sm:space-y-3 col-span-2 sm:col-span-1">
              <h3 className="text-sm sm:text-base lg:text-lg font-black text-[#17233C] tracking-tight">
                Bantuan
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {bantuanLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm lg:text-base font-bold text-[#17233C]/80 hover:text-[#2563EB] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Border Divider */}
        <div className="w-full border-t border-[#17233C]/10 pt-5 pb-4 sm:pb-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
          {/* Copyright */}
          <p className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#17233C]/70">
            © 2026 CodeKids. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs lg:text-sm font-bold text-[#17233C]/70">
            <Link href="#" className="hover:text-[#2563EB] transition-colors">
              Kebijakan Privasi
            </Link>
            <span className="text-[#17233C]/30 font-normal">|</span>
            <Link href="#" className="hover:text-[#2563EB] transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
