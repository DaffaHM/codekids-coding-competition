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

  // 1. Hook: Handle Scroll Position
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

  // 2. Hook: Trigger GSAP Entrance Animation when mobile menu mounts
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

  // GSAP Mobile Menu Toggle Handlers
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

  // Hide Navbar when entering lesson/materi pages AFTER all hooks have executed
  const isMateriPage = pathname ? pathname.startsWith('/learn/') : false;
  if (isMateriPage) {
    return null;
  }

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
      href: '/learn',
      icon: <RiAwardLine className="w-4.5 h-4.5 stroke-[0.3]" />,
    },
    {
      name: 'About',
      href: '/#why-codekids',
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
          : 'max-w-7xl bg-transparent rounded-none px-2 sm:px-4 py-1.5 border border-transparent shadow-none'
      }`}>
        <div className={`w-full mx-auto flex items-center justify-between transition-all duration-300 pointer-events-auto ${
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4F7DF3] text-white shadow-sm'
                      : 'text-[#17233C]/80 hover:text-[#17233C] hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Button (Mulai Belajar) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 bg-[#FFD84D] hover:bg-[#FFE169] active:scale-95 text-[#17233C] text-xs lg:text-sm font-extrabold px-5 lg:px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <span>Mulai Belajar</span>
              <RiArrowRightLine className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-2xl bg-white/90 border border-slate-200/80 text-[#17233C] hover:bg-slate-100 transition-colors shadow-xs"
          >
            {mobileMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Card */}
        {isMobileMounted && (
          <div
            ref={menuRef}
            className="md:hidden mt-2 px-3 pointer-events-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 border border-blue-100/90 shadow-2xl flex flex-col gap-2">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold transition-all ${
                      isActive
                        ? 'bg-[#4F7DF3] text-white shadow-xs'
                        : 'text-[#17233C] hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <RiArrowRightLine className="w-4 h-4 opacity-60" />
                  </Link>
                );
              })}

              <div className="pt-2 mt-1 border-t border-slate-100">
                <Link
                  href="/learn"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 bg-[#FFD84D] hover:bg-[#FFE169] text-[#17233C] text-sm font-black py-3 rounded-2xl shadow-md w-full"
                >
                  <span>Mulai Belajar Sekarang</span>
                  <RiArrowRightLine className="w-4.5 h-4.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
