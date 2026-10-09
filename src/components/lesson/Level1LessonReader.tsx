'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionVisual from '@/components/lesson/SectionVisual';
import Level1Quiz from '@/components/quiz/Level1Quiz';
import { LEVEL_1_SECTIONS, LessonSectionData } from '@/content/level1Data';
import { saveTopicProgress } from '@/lib/storage';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Sparkles, HelpCircle, Lock } from 'lucide-react';

export default function Level1LessonReader() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [mode, setMode] = useState<'materials' | 'quiz'>('materials');
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const currentSection: LessonSectionData = LEVEL_1_SECTIONS[sectionIndex];
  const totalSections = LEVEL_1_SECTIONS.length;
  const isLastSection = sectionIndex === totalSections - 1;

  // Track scroll-to-bottom for reading materials
  useEffect(() => {
    setHasScrolledToBottom(false);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop + windowHeight >= documentHeight - 150) {
        setHasScrolledToBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const timer = setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [sectionIndex, mode]);

  // Track progress on section view
  useEffect(() => {
    saveTopicProgress('level-1', {
      status: isLastSection ? 'in_progress' : 'in_progress',
      currentSectionIndex: sectionIndex,
      quizCompleted: false,
      practiceCompleted: false,
    });
  }, [sectionIndex, isLastSection]);

  const canProceed = hasScrolledToBottom;

  const handleNextSection = () => {
    if (!canProceed) return;
    if (isLastSection) {
      setMode('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSectionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    if (sectionIndex > 0) {
      setSectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] pb-28 sm:pb-32">
      {/* Main Content Area - Clean & Direct View (No Top Nav) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Top Header Controls: Back to Hub & Level Label */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#4F7DF3] hover:text-[#3B68E0] transition-colors bg-white hover:bg-blue-50 px-4 py-2 rounded-full border border-slate-200/80 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Learning Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFD84D] text-[#17233C] text-xs font-black tracking-wider uppercase shadow-2xs border border-amber-300/60">
              LEVEL 01
            </span>
          </div>
        </div>

        {mode === 'materials' ? (
          <div className="py-2 space-y-6">
            {/* Special Custom Layout for Materi 1 (Apa Itu Coding?) */}
            {sectionIndex === 0 ? (
              <div className="space-y-8 py-2">
                {/* Section Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#718096] mb-2">
                    <span>Materi 1 dari {totalSections}</span>
                    <span className="text-[#4F7DF3]">{Math.round((1 / totalSections) * 100)}% Selesai</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4F7DF3] transition-all duration-300 rounded-full"
                      style={{ width: `${(1 / totalSections) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Top Grid: Left Column Text & Right Column img1.png */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        LEVEL 01
                      </span>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] mt-3 leading-tight tracking-tight">
                        Apa Itu <span className="text-[#4F7DF3]">Coding?</span>
                      </h1>
                    </div>

                    <p className="text-base sm:text-lg text-[#17233C] font-extrabold leading-relaxed">
                      Coding adalah cara kita memberikan instruksi kepada komputer agar komputer melakukan sesuatu.
                    </p>

                    <p className="text-sm sm:text-base text-[#718096] font-semibold leading-relaxed">
                      Saat kamu bermain game, membuka website, atau menggunakan aplikasi, ada coding yang membuat semuanya dapat bekerja.
                    </p>
                  </div>

                  {/* Right Column: Hero Graphic img1.png */}
                  <div className="lg:col-span-6 flex justify-center lg:justify-end">
                    <div className="relative w-full">
                      <Image
                        src="/level1/img1.png"
                        alt="Alur Konsep Coding"
                        width={2048}
                        height={768}
                        className="w-full h-auto object-contain rounded-2xl drop-shadow-xs"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Grid: Left Column img2.png & Right Column Ingat! Callout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-2">
                  {/* Left Column: img2.png */}
                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                      Apa yang bisa dibuat dengan coding?
                    </h3>
                    <div className="w-full rounded-2xl overflow-hidden">
                      <Image
                        src="/level1/img2.png"
                        alt="Game, Website, Aplikasi, Robot"
                        width={1983}
                        height={793}
                        className="w-full h-auto object-contain rounded-2xl drop-shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Right Column: Ingat! Callout Box (No Button inside) */}
                  <div className="lg:col-span-5 lg:pt-9">
                    <div className="bg-[#FFFBEB] border-2 border-[#FFD84D]/70 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl sm:text-3xl">💡</span>
                        <h4 className="text-lg sm:text-xl font-black text-[#17233C]">
                          Ingat!
                        </h4>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-[#17233C] leading-relaxed">
                        Coding adalah cara memberikan instruksi kepada komputer agar komputer melakukan sesuatu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : sectionIndex === 1 ? (
              /* Custom Vertical Stack Layout for Materi 2 (Komputer Membutuhkan Instruksi) - Large Images & Card-Free */
              <div className="space-y-10 py-2">
                {/* Section Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#718096] mb-2">
                    <span>Materi 2 dari {totalSections}</span>
                    <span className="text-[#4F7DF3]">{Math.round((2 / totalSections) * 100)}% Selesai</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4F7DF3] transition-all duration-300 rounded-full"
                      style={{ width: `${(2 / totalSections) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Header Title */}
                <div>
                  <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                    LEVEL 01 • MATERI 2
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] mt-3 leading-tight tracking-tight">
                    Komputer Membutuhkan <span className="text-[#4F7DF3]">Instruksi</span>
                  </h1>
                </div>

                {/* Seksi 1 — Komputer Tidak Bisa Menebak */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#FF5252] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      1
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17233C]">
                      Komputer Tidak Bisa Menebak
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                    Komputer tidak bisa mengetahui apa yang kita inginkan dengan sendirinya. Kita harus memberikan instruksi.
                  </p>

                  {/* Large Image 1 */}
                  <div className="w-full rounded-2xl overflow-hidden pt-1">
                    <Image
                      src="/level1/materi2img1.png"
                      alt="Instruksi tidak jelas vs Instruksi jelas"
                      width={1983}
                      height={793}
                      className="w-full h-auto object-contain rounded-2xl drop-shadow-xs"
                      priority
                    />
                  </div>
                </div>

                {/* Seksi 2 — Instruksi Harus Jelas */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#FFC107] text-[#17233C] font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      2
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17233C]">
                      Instruksi Harus Jelas
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                    Instruksi yang jelas memberi tahu komputer apa yang harus dilakukan.
                  </p>

                  {/* Large Image 2 */}
                  <div className="w-full rounded-2xl overflow-hidden pt-1">
                    <Image
                      src="/level1/materi2img2.png"
                      alt="Tidak jelas vs Lebih jelas"
                      width={2172}
                      height={724}
                      className="w-full h-auto object-contain rounded-2xl drop-shadow-xs"
                    />
                  </div>
                </div>

                {/* Seksi 3 — Komputer Mengikuti Instruksi */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#3B82F6] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      3
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17233C]">
                      Komputer Mengikuti Instruksi
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                    Ketika kita memberikan instruksi, komputer akan memprosesnya dan menghasilkan hasil sesuai dengan instruksi tersebut.
                  </p>

                  {/* Large Image 3 */}
                  <div className="w-full rounded-2xl overflow-hidden pt-1">
                    <Image
                      src="/level1/materi2img3.png"
                      alt="Alur Instruksi -> Komputer Memproses -> Hasil"
                      width={2170}
                      height={725}
                      className="w-full h-auto object-contain rounded-2xl drop-shadow-xs"
                    />
                  </div>
                </div>

                {/* Seksi 4 — Kalau Instruksinya Salah? */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      4
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#17233C]">
                      Kalau Instruksinya Salah?
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                    Jika instruksinya salah atau tidak lengkap, hasilnya bisa tidak sesuai dengan yang kita inginkan.
                  </p>

                  {/* Large Image 4 */}
                  <div className="w-full rounded-2xl overflow-hidden pt-1">
                    <Image
                      src="/level1/materi2img4.png"
                      alt="Contoh instruksi salah"
                      width={2171}
                      height={724}
                      className="w-full h-auto object-contain rounded-2xl drop-shadow-xs"
                    />
                  </div>
                </div>

                {/* Bagian 5 — Ingat! (Summary Card) */}
                <div className="bg-[#FFFDF0] border-2 border-[#FFD84D]/70 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">💡</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                      Ingat!
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-[#17233C] leading-relaxed">
                    Komputer membutuhkan instruksi yang jelas agar dapat melakukan apa yang kita inginkan.
                  </p>
                </div>
              </div>
            ) : (
              /* Custom Clean Text Layout for Materi 3 (Coding Harus Berurutan) */
              <div className="space-y-8 py-2">
                {/* Section Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#718096] mb-2">
                    <span>Materi 3 dari {totalSections}</span>
                    <span className="text-[#4F7DF3]">{Math.round((3 / totalSections) * 100)}% Selesai</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4F7DF3] transition-all duration-300 rounded-full"
                      style={{ width: `${(3 / totalSections) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Header Title */}
                <div>
                  <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                    LEVEL 01 • MATERI 3
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] mt-3 leading-tight tracking-tight">
                    Coding Harus <span className="text-[#4F7DF3]">Berurutan</span>
                  </h1>
                </div>

                {/* Pembuka */}
                <div className="bg-[#EEF2FF] border-2 border-[#4F7DF3]/30 rounded-3xl p-5 sm:p-6 shadow-2xs">
                  <p className="text-base sm:text-xl font-extrabold text-[#17233C] leading-relaxed">
                    Memberikan instruksi yang jelas saja belum cukup. Dalam coding, instruksi juga harus diberikan dalam urutan yang tepat.
                  </p>
                </div>

                {/* Paragraf 1 & Paragraf 2 */}
                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                    Bayangkan kamu ingin membuat jus. Kamu tidak bisa langsung menuangkan jus ke dalam gelas sebelum buahnya dibuat menjadi jus. Ada beberapa langkah yang harus dilakukan secara berurutan, mulai dari menyiapkan buah, memotong buah, memasukkan buah ke blender, memblendernya, lalu menuangkan jus ke dalam gelas.
                  </p>

                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                    Komputer juga bekerja dengan cara yang sama. Komputer menjalankan instruksi sesuai dengan urutan yang kita berikan. Jika urutannya salah, hasil yang didapat bisa berbeda dari yang kita inginkan.
                  </p>
                </div>

                {/* Paragraf 3 — Definisi Algoritma */}
                <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-[#4F7DF3] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-blue-200">
                      ALGORITMA
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed pt-1">
                    Urutan langkah yang digunakan untuk menyelesaikan suatu masalah disebut <span className="text-[#4F7DF3] font-black">algoritma</span>. Algoritma membantu kita menentukan apa yang harus dilakukan terlebih dahulu, apa yang dilakukan berikutnya, dan bagaimana proses tersebut sampai pada hasil yang diinginkan.
                  </p>
                </div>

                {/* Seksi Contoh Langkah-Langkah Jus */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                    Contoh: Misalnya, untuk membuat jus
                  </h3>

                  {/* Official 3D Graphic Asset materi3img1.png */}
                  <div className="w-full rounded-2xl overflow-hidden pt-1">
                    <Image
                      src="/level1/materi3img1.png"
                      alt="Contoh urutan langkah membuat jus"
                      width={2172}
                      height={724}
                      className="w-full h-auto object-contain rounded-2xl drop-shadow-xs"
                      priority
                    />
                  </div>

                  <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed pt-1">
                    Jika langkah-langkah tersebut dilakukan secara berurutan, prosesnya dapat berjalan dengan baik.
                  </p>
                </div>

                {/* Penutup (Summary Callout Box) */}
                <div className="bg-[#FFFDF0] border-2 border-[#FFD84D]/70 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">💡</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                      Kesimpulan
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-[#17233C] leading-relaxed">
                    Jadi, dalam coding kita perlu memberikan instruksi yang jelas dan menjalankannya dalam urutan yang tepat. Dengan memahami urutan langkah, kamu sudah mulai mengenal dasar dari algoritma.
                  </p>
                </div>

                {/* Clean End-of-Lesson CTA Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (canProceed) {
                        setMode('quiz');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={!canProceed}
                    className={`px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg transition-all shadow-md inline-flex items-center gap-2.5 border-2 ${
                      canProceed
                        ? 'bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] border-amber-300/60 cursor-pointer active:scale-95'
                        : 'bg-slate-200 text-slate-400 border-slate-300/40 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {!canProceed && <Lock className="w-5 h-5 text-slate-400 shrink-0" />}
                    <span>{!canProceed ? 'Scroll ke Bawah...' : 'Mulai Quiz'}</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Level1Quiz
            onReturnToLesson={() => {
              setMode('materials');
              setSectionIndex(0);
            }}
          />
        )}
      </div>

      {/* Bottom Sticky Navigation Bar */}
      {mode === 'materials' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-3 sm:py-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevSection}
              disabled={sectionIndex === 0}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                sectionIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100 border border-slate-200/40'
                  : 'bg-white hover:bg-slate-100 text-[#17233C] active:scale-95 border border-slate-200/80 shadow-2xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="hidden xs:flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#718096]">
              <span>Materi {sectionIndex + 1} dari {totalSections}</span>
            </div>

            <button
              type="button"
              onClick={handleNextSection}
              disabled={!canProceed}
              className={`px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-black text-xs sm:text-base transition-all flex items-center gap-2 ${
                canProceed
                  ? isLastSection
                    ? 'bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] border-2 border-amber-300/60 shadow-md hover:shadow-lg active:scale-95 cursor-pointer'
                    : 'bg-[#4F7DF3] hover:bg-[#3B68E0] text-white shadow-md hover:shadow-lg active:scale-95 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 border-2 border-slate-300/40 opacity-60 cursor-not-allowed pointer-events-none'
              }`}
            >
              {!canProceed && (
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>
                {!canProceed
                  ? 'Scroll ke Bawah...'
                  : isLastSection
                  ? 'Mulai Quiz'
                  : 'Lanjut'}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



