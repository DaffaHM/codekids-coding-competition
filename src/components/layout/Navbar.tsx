'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { 
  RiHome5Line, 
  RiBookOpenLine, 
  RiAwardLine, 
  RiLightbulbLine, 
  RiArrowRightLine,
  RiMenu3Line,
  RiCloseLine
} from 'react-icons/ri';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileMounted, setIsMobileMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Hide Navbar when entering lesson/materi pages (e.g. /learn/[topicId])
  const isMateriPage = pathname ? pathname.startsWith('/learn/') : false;
  if (isMateriPage) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // GSAP Mobile Menu Toggle Handler
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
      setIsMobileMounted(true);
    } else {
      closeMobileMenu();
    }
  };

  const closeMobileMenu = () => {
    if (!isMobileMounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setMobileMenuOpen(false);
          setIsMobileMounted(false);
        },
      });

      if (menuRef.current) {
        tl.to(menuRef.current, {
          opacity: 0,
          y: -16,
          scale: 0.95,
          duration: 0.22,
          ease: 'power2.in',
        }, 0);
      }

      if (backdropRef.current) {
        tl.to(backdropRef.current, {
          opacity: 0,
          duration: 0.22,
          ease: 'power2.in',
        }, 0);
      }
    });

    return () => ctx.revert();
  };

  // Trigger GSAP Entrance Animation when mobile menu mounts
  useEffect(() => {
    if (mobileMenuOpen && isMobileMounted) {
      const ctx = gsap.context(() => {
        // Backdrop animation
        if (backdropRef.current) {
          gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
        }

        // Menu card spring entrance
        if (menuRef.current) {
          gsap.fromTo(
            menuRef.current,
            { opacity: 0, y: -24, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'back.out(1.4)' }
          );
        }

        // Staggered items entrance
        const validItems = itemRefs.current.filter(Boolean);
        if (validItems.length > 0) {
          gsap.fromTo(
            validItems,
            { opacity: 0, x: -12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.25,
              stagger: 0.04,
              ease: 'power2.out',
              delay: 0.08,
            }
          );
        }
      });

      return () => ctx.revert();
    }
  }, [mobileMenuOpen, isMobileMounted]);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: <RiHome5Line className="w-4.5 h-4.5 stroke-[0.3]" />,
    },
    {
      name: 'Learn',
      href: '/learn',
      icon: <RiBookOpenLine className="w-4.5 h-4.5 stroke-[0.3]" />,
    },
    {
      name: 'Certificate',
      href: '/certificate',
      icon: <RiAwardLine className="w-4.5 h-4.5 stroke-[0.3]" />,
    },
    {
      name: 'About',
      href: '#about',
      icon: <RiLightbulbLine className="w-4.5 h-4.5 stroke-[0.3]" />,
    },
  ];

  return (
    <>
      {/* Fullscreen Backdrop Blur Overlay when Mobile Menu is Open */}
      {isMobileMounted && (
        <div
          ref={backdropRef}
          onClick={closeMobileMenu}
          aria-hidden="true"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 md:hidden pointer-events-auto transition-opacity"
        />
      )}

      <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 pointer-events-none ${
        isScrolled 
          ? 'pt-2.5 sm:pt-3.5 pb-2 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto' 
          : 'pt-3 sm:pt-4 pb-2 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto'
      }`}>
        {/* Navbar Container: Full-width at top, Floating Pill on scroll */}
        <div className={`w-full mx-auto flex items-center justify-between transition-all duration-300 ease-in-out pointer-events-auto ${
          isScrolled 
            ? 'max-w-6xl bg-white/95 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-2.5 border border-blue-100/80 shadow-md' 
            : 'max-w-7xl bg-transparent rounded-none px-2 sm:px-4 py-1.5 border border-transparent shadow-none'
        }`}>
          
          {/* CodeKids Logo (Left) */}
          <Link href="/" className="inline-flex items-center transition-transform hover:scale-105 shrink-0">
            <Image
              src="/codekidslogo.png"
              alt="CodeKids Logo"
              width={2172}
              height={724}
              priority
              className="w-32 sm:w-40 md:w-44 lg:w-48 h-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Menu Links (Home, Learn, Certificate, About) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm lg:text-base font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#EBF3FF] text-[#2563EB]'
                      : 'text-[#17233C]/80 hover:text-[#2563EB] hover:bg-slate-100/60'
                  }`}
                >
                  <span className={isActive ? 'text-[#2563EB]' : 'text-[#17233C]/80'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>

                  {/* Active Indicator Underline Line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#2563EB] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Button ("Mulai Belajar ->") */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/learn"
              className="bg-[#FFD84D] hover:bg-[#FFC926] text-[#17233C] font-extrabold text-sm lg:text-base px-5 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-md transform active:scale-95 border border-amber-300/60 flex items-center gap-2"
            >
              <span>Mulai Belajar</span>
              <RiArrowRightLine className="w-4 h-4 sm:w-5 sm:h-5 stroke-[0.5]" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Navigation Menu"
              className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-blue-50 active:bg-blue-100 text-[#17233C] hover:text-[#2563EB] focus:outline-none transition-all flex items-center justify-center shrink-0 border border-slate-200/60"
            >
              {mobileMenuOpen ? (
                <RiCloseLine className="w-5.5 h-5.5" />
              ) : (
                <RiMenu3Line className="w-5.5 h-5.5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card animated with GSAP */}
        {isMobileMounted && (
          <div
            ref={menuRef}
            className="absolute top-full left-3 right-3 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100/90 p-4 md:hidden z-50 flex flex-col gap-1.5 mt-2.5 pointer-events-auto"
          >
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-base transition-all ${
                    isActive
                      ? 'bg-[#EBF3FF] text-[#2563EB] border border-blue-100/80 shadow-2xs'
                      : 'text-[#17233C]/80 hover:bg-slate-100/70 hover:text-[#2563EB]'
                  }`}
                >
                  <span className={isActive ? 'text-[#2563EB]' : 'text-[#17233C]/70'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="my-1 border-t border-slate-100" />

            <Link
              ref={(el) => { itemRefs.current[navItems.length] = el; }}
              href="/learn"
              onClick={closeMobileMenu}
              className="w-full text-center bg-[#FFD84D] active:bg-[#FFC926] text-[#17233C] font-extrabold text-base py-3.5 rounded-2xl shadow-md border border-amber-300/60 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>Mulai Belajar</span>
              <RiArrowRightLine className="w-5 h-5" />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
