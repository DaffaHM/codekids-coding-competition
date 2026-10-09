'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CodePlayground from '@/components/editor/CodePlayground';
import CourseCertificateClaim from '@/components/certificate/CourseCertificateClaim';
import { LEVEL_3_SECTIONS } from '@/content/level3Data';
import { saveTopicProgress, getCertificateProgress } from '@/lib/storage';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Code2,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function Level3LessonReader() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);

  const totalSections = LEVEL_3_SECTIONS.length;

  // Check if practice or cert was already claimed on mount
  useEffect(() => {
    const existing = getCertificateProgress('level-3');
    if (existing) {
      setIsPracticeCompleted(true);
    }
  }, []);

  // Sync sectionIndex from URL query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('materi') || params.get('section');
      if (m) {
        if (m === 'cert' || m === 'certificate' || m === 'sertifikat') {
          setSectionIndex(4);
        } else {
          const idx = parseInt(m, 10) - 1;
          if (idx >= 0 && idx <= 4) {
            setSectionIndex(idx);
          }
        }
      }
    }
  }, [totalSections]);

  // Track scroll completion for reading materials (Materi 1, 2, 3)
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIndex]);

  // Track progress on section switch
  useEffect(() => {
    saveTopicProgress('level-3', {
      status: sectionIndex === 4 || (sectionIndex === 3 && isPracticeCompleted) ? 'completed' : 'in_progress',
      currentSectionIndex: sectionIndex,
      quizCompleted: false,
      practiceCompleted: isPracticeCompleted,
    });
  }, [sectionIndex, isPracticeCompleted]);

  const canProceed =
    sectionIndex === 3
      ? isPracticeCompleted
      : hasScrolledToBottom;

  const handleNextSection = () => {
    if (!canProceed) return;
    if (sectionIndex < 4) {
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
              LEVEL 03
            </span>
          </div>
        </div>

        {/* Section Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#718096] mb-2">
            <span>
              {sectionIndex === 4
                ? 'Klaim Sertifikat'
                : sectionIndex === 3
                ? 'Coding Practice'
                : `Materi ${sectionIndex + 1} dari 3`}
            </span>
            <span className="text-[#4F7DF3]">
              {sectionIndex === 4
                ? '100% Selesai'
                : `${Math.round(((sectionIndex + 1) / 4) * 100)}% Selesai`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F7DF3] transition-all duration-300 rounded-full"
              style={{
                width: `${sectionIndex === 4 ? 100 : Math.round(((sectionIndex + 1) / 4) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* MATERI 1: Apa Itu HTML? */}
        {sectionIndex === 0 && (
          <div className="space-y-10 py-2">
            <div className="space-y-3">
              <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
                LEVEL 03 • MATERI 1 DARI 4
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
                Apa Itu <span className="text-[#4F7DF3]">HTML?</span>
              </h1>
            </div>

            <section className="space-y-6">
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-base sm:text-lg text-[#17233C] font-extrabold leading-relaxed">
                  <span className="text-[#4F7DF3]">HTML</span> adalah singkatan dari <span className="underline decoration-[#FFD84D] decoration-4">HyperText Markup Language</span>. HTML adalah bahasa yang digunakan untuk membuat struktur dan kerangka dari setiap halaman website di internet.
                </p>

                <p className="text-base sm:text-lg text-[#718096] font-semibold leading-relaxed">
                  Jika kamu mengibaratkan website sebagai sebuah rumah, maka **HTML adalah pondasi dan tiang-tiang kerangkanya**. Tanpa HTML, tidak ada tempat untuk menaruh dinding, pintu, atau jendela.
                </p>
              </div>

              <div className="bg-[#EEF2FF] border-2 border-[#4F7DF3]/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                  Apa Fungsi Utama HTML?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-blue-100 space-y-1">
                    <span className="text-2xl">📝</span>
                    <h4 className="font-black text-[#17233C]">Menampilkan Teks</h4>
                    <p className="text-xs text-[#718096] font-semibold">Judul, paragraf, daftar, dan artikel.</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-blue-100 space-y-1">
                    <span className="text-2xl">🖼️</span>
                    <h4 className="font-black text-[#17233C]">Menampilkan Media</h4>
                    <p className="text-xs text-[#718096] font-semibold">Gambar, foto, video, dan tombol.</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-blue-100 space-y-1">
                    <span className="text-2xl">🔗</span>
                    <h4 className="font-black text-[#17233C]">Menghubungkan Halaman</h4>
                    <p className="text-xs text-[#718096] font-semibold">Link antar halaman website.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MATERI 2: Mengenal Tag HTML */}
        {sectionIndex === 1 && (
          <div className="space-y-10 py-2">
            <div className="space-y-3">
              <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
                LEVEL 03 • MATERI 2 DARI 4
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
                Mengenal <span className="text-[#4F7DF3]">Tag HTML</span>
              </h1>
            </div>

            <section className="space-y-6">
              <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                Dalam HTML, kita memberi tahu komputer jenis elemen apa yang ingin kita buat dengan menggunakan <span className="text-[#4F7DF3] font-black">Tag HTML</span>.
              </p>

              {/* Anatomy of HTML Tag */}
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                  Anatomi Tag HTML
                </h3>
                <p className="text-base text-[#718096] font-semibold">
                  Tag HTML biasanya ditulis berpasangan, ada tag pembuka dan tag penutup dengan garis miring <code className="bg-slate-100 px-2 py-0.5 rounded text-red-500 font-mono">/</code>:
                </p>

                <div className="bg-[#17233C] text-white p-5 rounded-2xl font-mono text-base sm:text-lg flex flex-wrap items-center justify-center gap-2 shadow-inner">
                  <span className="text-blue-400 font-bold">&lt;p&gt;</span>
                  <span className="text-emerald-400 font-bold">Ini adalah paragraf</span>
                  <span className="text-blue-400 font-bold">&lt;/p&gt;</span>
                </div>
              </div>

              {/* Tag Examples Grid */}
              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#17233C]">
                  3 Tag Dasar yang Sering Digunakan:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Tag h1 */}
                  <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                    <code className="text-xs font-mono font-black text-[#4F7DF3] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 inline-block">
                      &lt;h1&gt;
                    </code>
                    <h4 className="font-black text-[#17233C]">Heading (Judul Utama)</h4>
                    <p className="text-xs text-[#718096] font-semibold">Digunakan untuk membuat judul paling besar pada halaman.</p>
                  </div>

                  {/* Tag p */}
                  <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                    <code className="text-xs font-mono font-black text-[#4F7DF3] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 inline-block">
                      &lt;p&gt;
                    </code>
                    <h4 className="font-black text-[#17233C]">Paragraph (Teks Tulis)</h4>
                    <p className="text-xs text-[#718096] font-semibold">Digunakan untuk menuliskan kalimat atau paragraf bacaan.</p>
                  </div>

                  {/* Tag button */}
                  <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                    <code className="text-xs font-mono font-black text-[#4F7DF3] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 inline-block">
                      &lt;button&gt;
                    </code>
                    <h4 className="font-black text-[#17233C]">Button (Tombol)</h4>
                    <p className="text-xs text-[#718096] font-semibold">Digunakan untuk membuat tombol yang bisa diklik oleh pengguna.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MATERI 3: HTML Membentuk Struktur */}
        {sectionIndex === 2 && (
          <div className="space-y-10 py-2">
            <div className="space-y-3">
              <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
                LEVEL 03 • MATERI 3 DARI 4
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
                HTML Membentuk <span className="text-[#4F7DF3]">Struktur</span>
              </h1>
            </div>

            <section className="space-y-6">
              <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                Seperti menyusun balok-balok mainan, elemen-elemen HTML disusun berurutan dari atas ke bawah untuk membentuk struktur website yang utuh.
              </p>

              {/* Code Structure Example */}
              <div className="bg-[#17233C] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg border-2 border-slate-700">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-3 py-1 rounded-full border border-slate-700 inline-block">
                  Struktur Sederhana HTML
                </span>

                <pre className="font-mono text-sm sm:text-base text-emerald-400 leading-relaxed overflow-x-auto p-2">
{`<h1>Judul Halaman Saya</h1>
<p>Ini adalah paragraf penjelasan pertama saya.</p>
<button>Klik Tombol Ini</button>`}
                </pre>
              </div>

              <div className="bg-[#FFFDF0] border-2 border-[#FFD84D] rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">💡</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                    Siap Mencoba Coding Sendiri?
                  </h3>
                </div>
                <p className="text-base sm:text-lg font-bold text-[#17233C] leading-relaxed">
                  Pada materi berikutnya, kamu akan mencoba mengetikkan kode HTML sendiri dari awal di dalam Code Editor!
                </p>
              </div>
            </section>
          </div>
        )}

        {/* SECTION 4: Coding Practice */}
        {sectionIndex === 3 && (
          <CodePlayground
            onComplete={() => {
              setIsPracticeCompleted(true);
              setSectionIndex(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* SECTION 5: Certificate Claim Page */}
        {sectionIndex === 4 && (
          <div className="py-2 animate-in fade-in">
            <CourseCertificateClaim courseId="level-3" courseName="HTML" />
          </div>
        )}
      </div>

      {/* Bottom Sticky Navigation Bar */}
      {sectionIndex < 4 && (
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
              <span>
                {sectionIndex === 3 ? 'Coding Practice' : `Materi ${sectionIndex + 1} dari 3`}
              </span>
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
                {!canProceed
                  ? 'Scroll ke Bawah...'
                  : sectionIndex === 2
                  ? 'Lanjut ke Coding Practice'
                  : sectionIndex === 3
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
