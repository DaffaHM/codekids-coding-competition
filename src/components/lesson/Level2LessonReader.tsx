'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SortableList, { SortableStepItem } from '@/components/common/SortableList';
import Level2Materi2 from '@/components/lesson/Level2Materi2';
import Level2Materi3 from '@/components/lesson/Level2Materi3';
import CourseCertificateClaim from '@/components/certificate/CourseCertificateClaim';
import { LEVEL_2_SECTIONS } from '@/content/level2Data';
import { saveTopicProgress } from '@/lib/storage';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  Lock,
} from 'lucide-react';

const CORRECT_ORDER_IDS = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'];

const ALL_JUICE_STEPS: SortableStepItem[] = [
  { id: 'step-1', label: 'Siapkan buah', imageSrc: '/level2/siapkanbuah.png', icon: '🍎' },
  { id: 'step-2', label: 'Potong buah', imageSrc: '/level2/potongbuah.png', icon: '🔪' },
  { id: 'step-3', label: 'Masukkan buah ke blender', imageSrc: '/level2/masukanbuahkeblender.png', icon: '📥' },
  { id: 'step-4', label: 'Blender buah', imageSrc: '/level2/blenderbuah.png', icon: '⚙️' },
  { id: 'step-5', label: 'Tuangkan jus ke gelas', imageSrc: '/level2/tuangkanbuahkegelas.png', icon: '🥤' },
];

function getShuffledJuiceSteps(): SortableStepItem[] {
  return [
    ALL_JUICE_STEPS[3], // Blender buah
    ALL_JUICE_STEPS[0], // Siapkan buah
    ALL_JUICE_STEPS[4], // Tuangkan jus ke gelas
    ALL_JUICE_STEPS[1], // Potong buah
    ALL_JUICE_STEPS[2], // Masukkan buah ke blender
  ];
}

type ActivityState = 'arranging' | 'incorrect' | 'completed';

export default function Level2LessonReader() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [items, setItems] = useState<SortableStepItem[]>(getShuffledJuiceSteps);
  const [activityState, setActivityState] = useState<ActivityState>('arranging');
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const totalSections = LEVEL_2_SECTIONS.length;

  // Sync sectionIndex from URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('materi') || params.get('section');
      if (m) {
        const idx = parseInt(m, 10) - 1;
        if (idx >= 0 && idx < totalSections) {
          setSectionIndex(idx);
        }
      }
    }
  }, [totalSections]);

  // Track scroll-to-bottom for reading materials (Materi 2 & Materi 3)
  useEffect(() => {
    setHasScrolledToBottom(false);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Unlock if scrolled within 150px of bottom, or if entire page fits on screen
      if (scrollTop + windowHeight >= documentHeight - 150) {
        setHasScrolledToBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Immediate check on section change
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIndex]);

  // Track progress on mount & section switch
  useEffect(() => {
    saveTopicProgress('level-2', {
      status: sectionIndex === 3 ? 'completed' : 'in_progress',
      currentSectionIndex: sectionIndex,
      quizCompleted: sectionIndex === 3,
      practiceCompleted: sectionIndex === 3,
    });
  }, [sectionIndex]);

  const handleItemsChange = (newItems: SortableStepItem[]) => {
    setItems(newItems);
    if (activityState === 'incorrect') {
      setActivityState('arranging');
    }
  };

  const handleRunSequence = () => {
    const isCorrect = items.every(
      (item, idx) => item.id === CORRECT_ORDER_IDS[idx]
    );

    if (!isCorrect) {
      setActivityState('incorrect');
    } else {
      setActivityState('completed');
      saveTopicProgress('level-2', {
        status: 'in_progress',
        currentSectionIndex: 0,
        quizCompleted: false,
      });
    }
  };

  const canProceed =
    sectionIndex === 0
      ? activityState === 'completed'
      : hasScrolledToBottom;

  const handleNextSection = () => {
    if (!canProceed) return;
    if (sectionIndex < 3) {
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
      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Top Navigation Controls */}
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
              LEVEL 02
            </span>
          </div>
        </div>

        {/* Section Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#718096] mb-2">
            <span>
              {sectionIndex === 3 ? 'Klaim Sertifikat' : `Materi ${sectionIndex + 1} dari ${totalSections}`}
            </span>
            <span className="text-[#4F7DF3]">
              {sectionIndex === 3 ? '100% Selesai' : `${Math.round(((sectionIndex + 1) / totalSections) * 100)}% Selesai`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F7DF3] transition-all duration-300 rounded-full"
              style={{
                width: `${sectionIndex === 3 ? 100 : Math.round(((sectionIndex + 1) / totalSections) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* MATERI 1: Buat Jus! (Interactive Sortable Activity) */}
        {sectionIndex === 0 && (
          <div className="py-2 space-y-8">
            {/* Header & Direct Instruction Hero Card */}
            <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
                  LEVEL 02 • MATERI 1 DARI 3
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17233C] tracking-tight">
                  Susun Langkah Membuat Jus!
                </h1>
              </div>

              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm font-semibold text-[#17233C] space-y-2">
                <div className="flex items-center gap-2 font-black text-[#4F7DF3] text-sm sm:text-base">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span>Instruksi:</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-700 font-bold leading-relaxed">
                  <li><span className="text-[#17233C]">Geser / tarik kartu</span> di bawah ini ke kiri atau kanan untuk menyusun urutan langkah dari awal hingga selesai.</li>
                  <li><span className="text-[#17233C]">Tekan tombol</span> <span className="text-[#4F7DF3] font-black">"Jalankan"</span> untuk memeriksa urutan yang kamu susun.</li>
                </ul>
              </div>
            </div>

            {/* Sortable Activity Area */}
            <div className="space-y-6 pt-2">
              <SortableList
                items={items}
                onItemsChange={handleItemsChange}
                title=""
              />

              <div className="pt-2 flex flex-col items-center justify-center space-y-4">
                {activityState !== 'completed' && (
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleRunSequence}
                      className="px-8 sm:px-10 py-3.5 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-base sm:text-lg transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>Jalankan</span>
                    </button>
                  </div>
                )}

                {activityState === 'incorrect' && (
                  <div className="w-full max-w-xl mx-auto bg-[#FFF5F5] border-2 border-[#FF6B6B] rounded-2xl p-4 text-center animate-in fade-in space-y-1">
                    <div className="flex items-center justify-center gap-2 text-[#FF6B6B]">
                      <XCircle className="w-6 h-6 stroke-[3]" />
                      <span className="text-lg font-black">Belum tepat!</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-[#17233C]">
                      Periksa kembali urutannya dan coba lagi.
                    </p>
                  </div>
                )}

                {activityState === 'completed' && (
                  <div className="w-full max-w-xl mx-auto bg-[#F0FDF4] border-2 border-[#42C88A] rounded-2xl p-4 text-center animate-in fade-in space-y-1">
                    <div className="flex items-center justify-center gap-2 text-[#42C88A]">
                      <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                      <span className="text-lg sm:text-xl font-black">
                        Hebat! Urutannya benar.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Summary & Concept Box */}
            {activityState === 'completed' && (
              <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-3">
                <div className="bg-[#EEF2FF] border-2 border-[#4F7DF3]/40 rounded-3xl p-6 sm:p-8 space-y-3">
                  <span className="bg-blue-100 text-[#4F7DF3] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-blue-200 inline-block">
                    KONSEP ALGORITMA
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#17233C]">
                    Kamu baru saja membuat algoritma! 🎉
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-[#17233C] leading-relaxed">
                    <span className="text-[#4F7DF3]">Algoritma</span> adalah urutan langkah yang digunakan untuk menyelesaikan suatu masalah.
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] font-black text-base sm:text-lg transition-all shadow-md hover:shadow-lg transform active:scale-95 inline-flex items-center gap-2.5 border-2 border-amber-300/60"
                  >
                    <span>Lanjut ke Materi 2</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MATERI 2: Ketika Urutan Langkah Salah (Full Text Reading Page) */}
        {sectionIndex === 1 && (
          <Level2Materi2 />
        )}

        {/* MATERI 3: Menemukan Langkah yang Hilang */}
        {sectionIndex === 2 && (
          <div className="space-y-6">
            <Level2Materi3 />
            {canProceed && (
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xs animate-in fade-in slide-in-from-bottom-3 mt-8">
                <div className="w-14 h-14 rounded-full bg-[#42C88A] text-white flex items-center justify-center mx-auto text-2xl shadow-sm">
                  🎉
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                    Semua Materi Level 02 Selesai!
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-[#4F7DF3]">
                    Klik tombol di bawah ini untuk mengisi namamu dan mengklaim sertifikat.
                  </p>
                </div>
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSectionIndex(3);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 rounded-full bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] font-black text-base transition-all shadow-md hover:shadow-lg transform active:scale-95 inline-flex items-center gap-2.5 border-2 border-amber-300/60 cursor-pointer"
                  >
                    <span>Lanjut ke Pengisian Sertifikat</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: Certificate Claim Page */}
        {sectionIndex === 3 && (
          <div className="py-2 animate-in fade-in">
            <CourseCertificateClaim courseId="level-2" courseName="Algorithm" />
          </div>
        )}
      </div>

      {/* Bottom Sticky Navigation Bar */}
      {sectionIndex < 3 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] py-3 sm:py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
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
              <span>{sectionIndex === 0 ? 'Sebelumnya' : `Materi ${sectionIndex}`}</span>
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
                  ? 'bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] border-2 border-amber-300/60 shadow-md hover:shadow-lg active:scale-95 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 border-2 border-slate-300/40 opacity-60 cursor-not-allowed pointer-events-none'
              }`}
            >
              {!canProceed && (
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span>
                {!canProceed && sectionIndex !== 0
                  ? 'Scroll ke Bawah...'
                  : sectionIndex === 2
                  ? 'Lanjut ke Sertifikat'
                  : `Lanjut ke Materi ${sectionIndex + 2}`}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
