'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CssCodePlayground from '@/components/editor/CssCodePlayground';
import CourseCertificateClaim from '@/components/certificate/CourseCertificateClaim';
import { LEVEL_4_SECTIONS } from '@/content/level4Data';
import { saveTopicProgress, getCertificateProgress } from '@/lib/storage';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lock,
} from 'lucide-react';

export default function Level4LessonReader() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);

  const totalSections = LEVEL_4_SECTIONS.length;

  // Check if practice or cert was already claimed on mount
  useEffect(() => {
    const existing = getCertificateProgress('level-4');
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
    saveTopicProgress('level-4', {
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
            <span>Kembali ke Belajar</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFD84D] text-[#17233C] text-xs font-black tracking-wider uppercase shadow-2xs border border-amber-300/60">
              LEVEL 04
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

        {/* MATERI 1: Apa Itu CSS? */}
        {sectionIndex === 0 && (
          <div className="space-y-10 py-2">
            <div className="space-y-3">
              <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
                LEVEL 04 • MATERI 1 DARI 3
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
                Apa Itu <span className="text-[#4F7DF3]">CSS?</span>
              </h1>
              <p className="text-base sm:text-lg text-[#718096] font-semibold">
                HTML membuat struktur. CSS mengatur tampilannya.
              </p>
            </div>

            <section className="space-y-6">
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-base sm:text-lg text-[#17233C] font-extrabold leading-relaxed">
                  Setelah belajar HTML, sekarang kamu sudah bisa membuat struktur sebuah halaman website. Kamu bisa membuat judul, paragraf, dan tombol.
                </p>
                <p className="text-base sm:text-lg text-[#718096] font-semibold leading-relaxed">
                  Tapi bagaimana kalau kita ingin mengubah warna, ukuran tulisan, atau tampilan tombol tersebut? Di sinilah <span className="text-[#4F7DF3] font-black">CSS</span> digunakan.
                </p>
                <p className="text-base sm:text-lg text-[#718096] font-semibold leading-relaxed">
                  <span className="text-[#4F7DF3] font-black">CSS</span> (Cascading Style Sheets) adalah bahasa yang digunakan untuk mengatur tampilan sebuah halaman website. Dengan CSS, kita bisa mengubah warna, ukuran tulisan, jarak, dan berbagai tampilan lainnya.
                </p>
                <p className="text-base sm:text-lg text-[#718096] font-semibold leading-relaxed">
                  Bayangkan HTML sebagai kerangka sebuah rumah. HTML menentukan bagian-bagian rumah seperti dinding, pintu, dan jendela. CSS digunakan untuk memberikan warna dan mengatur tampilannya.
                </p>
                <p className="text-base sm:text-lg text-[#17233C] font-black leading-relaxed">
                  Jadi, HTML dan CSS memiliki tugas yang berbeda.
                </p>
              </div>

              {/* Concept Highlight */}
              <div className="bg-[#EEF2FF] border-2 border-[#4F7DF3]/40 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs text-center">
                <div className="w-12 h-12 bg-[#4F7DF3] text-white rounded-2xl flex items-center justify-center mx-auto text-xl shadow-md">
                  ✨
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
                  Kunci Memahami HTML & CSS
                </h3>
                <div className="inline-block bg-white px-6 py-4 rounded-2xl border border-blue-200 text-[#4F7DF3] font-black text-base sm:text-xl space-y-1 shadow-2xs">
                  <p>HTML membuat struktur.</p>
                  <p>CSS mengatur tampilan.</p>
                </div>
              </div>

              {/* Simple CSS Code Example & Visual Result Pair */}
              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#17233C]">
                  Contoh Penulisan Kode & Hasil Tampilannya:
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                  {/* Left: Code Box */}
                  <div className="bg-[#17233C] text-white rounded-3xl p-6 space-y-3 border-2 border-slate-700 shadow-md flex flex-col justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-3 py-1 rounded-full border border-slate-700 inline-block self-start">
                      KODE CSS
                    </span>

                    <pre className="font-mono text-base sm:text-lg text-emerald-400 leading-relaxed overflow-x-auto p-2">
{`h1 {
  color: blue;
}`}
                    </pre>

                    <p className="text-xs text-slate-300 font-semibold border-t border-slate-700 pt-3">
                      Memberi tahu browser untuk mengubah warna tulisan <code className="text-amber-300 font-mono">h1</code> menjadi biru.
                    </p>
                  </div>

                  {/* Right: Visual Result Box */}
                  <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 space-y-3 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        HASIL TAMPILAN WEBSITE
                      </span>
                      <span className="text-xs text-slate-400 font-bold">Preview</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center min-h-[100px]">
                      <h1 style={{ color: 'blue' }} className="text-2xl sm:text-3xl font-black tracking-tight text-center">
                        Judul Halaman Saya
                      </h1>
                    </div>

                    <p className="text-xs text-slate-500 font-bold text-center">
                      ✨ Teks judul berubah menjadi warna biru!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MATERI 2: Mengenal Property dan Value */}
        {sectionIndex === 1 && (
          <div className="space-y-10 py-2">
            <div className="space-y-3">
              <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
                LEVEL 04 • MATERI 2 DARI 3
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
                Mengenal <span className="text-[#4F7DF3]">Property</span> dan <span className="text-[#4F7DF3]">Value</span>
              </h1>
              <p className="text-base sm:text-lg text-[#718096] font-semibold">
                Bagaimana CSS mengatur tampilan?
              </p>
            </div>

            <section className="space-y-6">
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                  Dalam CSS, kita memberi tahu browser tampilan seperti apa yang kita inginkan. Untuk melakukannya, CSS menggunakan sesuatu yang disebut <span className="text-[#4F7DF3] font-black">property</span> dan <span className="text-[#4F7DF3] font-black">value</span>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 space-y-1">
                    <span className="text-xs font-black uppercase text-[#4F7DF3] tracking-wider">Apa itu Property?</span>
                    <h4 className="font-black text-[#17233C] text-base">Property</h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold">Bagian tampilan yang ingin kita ubah (seperti warna atau ukuran).</p>
                  </div>

                  <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 space-y-1">
                    <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Apa itu Value?</span>
                    <h4 className="font-black text-[#17233C] text-base">Value</h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold">Nilai atau pengaturan yang kita berikan (seperti biru atau 30px).</p>
                  </div>
                </div>
              </div>

              {/* Anatomy Diagram */}
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
                <h3 className="text-xl font-black text-[#17233C]">
                  Visualisasi Property & Value
                </h3>

                <div className="bg-[#17233C] text-white p-5 rounded-2xl font-mono text-base sm:text-lg text-center shadow-inner">
                  <span className="text-amber-300 font-bold">h1</span> {'{'} <span className="text-blue-400 font-bold">color</span>: <span className="text-emerald-400 font-bold">blue</span>; {'}'}
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 space-y-1">
                    <p className="font-mono text-blue-600 font-black text-lg">color</p>
                    <p className="text-xs text-slate-500 font-bold">↓</p>
                    <p className="text-xs font-black text-[#17233C] uppercase tracking-wider">Property</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-1">
                    <p className="font-mono text-emerald-600 font-black text-lg">blue</p>
                    <p className="text-xs text-slate-500 font-bold">↓</p>
                    <p className="text-xs font-black text-[#17233C] uppercase tracking-wider">Value</p>
                  </div>
                </div>
              </div>

              {/* Code Example 2 with Multiple Properties and Live Result */}
              <div className="space-y-3">
                <h3 className="text-xl font-black text-[#17233C]">
                  Contoh Menggunakan Beberapa Property:
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                  {/* Left: Code Box */}
                  <div className="bg-[#17233C] text-white rounded-3xl p-6 space-y-3 border-2 border-slate-700 shadow-md flex flex-col justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-3 py-1 rounded-full border border-slate-700 inline-block self-start">
                      KODE CSS (DUA PROPERTY)
                    </span>

                    <pre className="font-mono text-base sm:text-lg text-emerald-400 leading-relaxed overflow-x-auto p-2">
{`h1 {
  color: red;
  font-size: 30px;
}`}
                    </pre>

                    <div className="text-xs text-slate-300 font-semibold border-t border-slate-700 pt-3 space-y-1">
                      <p>• <code className="text-blue-300 font-mono">color: red;</code> → Mengubah warna menjadi merah</p>
                      <p>• <code className="text-blue-300 font-mono">font-size: 30px;</code> → Mengubah ukuran teks menjadi 30px</p>
                    </div>
                  </div>

                  {/* Right: Visual Result Box */}
                  <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 space-y-3 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        HASIL TAMPILAN WEBSITE
                      </span>
                      <span className="text-xs text-slate-400 font-bold">Preview</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center min-h-[100px]">
                      <h1 style={{ color: 'red', fontSize: '30px' }} className="font-black tracking-tight text-center">
                        Judul Halaman Saya
                      </h1>
                    </div>

                    <p className="text-xs text-slate-500 font-bold text-center">
                      ✨ Teks judul sekarang berwarna merah DAN ukurannya menjadi lebih besar (30px)!
                    </p>
                  </div>
                </div>
              </div>

              {/* Focus Property Grid */}
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-xl font-black text-[#17233C]">
                  3 Property Utama yang Akan Kita Gunakan:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <code className="text-xs font-mono font-black text-[#4F7DF3] bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      color
                    </code>
                    <h4 className="font-black text-[#17233C] text-sm">Warna Tulisan</h4>
                    <p className="text-xs text-[#718096] font-semibold">Mengatur warna teks (contoh: red, blue, green).</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <code className="text-xs font-mono font-black text-[#4F7DF3] bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      font-size
                    </code>
                    <h4 className="font-black text-[#17233C] text-sm">Ukuran Tulisan</h4>
                    <p className="text-xs text-[#718096] font-semibold">Mengatur besar kecilnya teks (contoh: 20px, 40px).</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <code className="text-xs font-mono font-black text-[#4F7DF3] bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      background-color
                    </code>
                    <h4 className="font-black text-[#17233C] text-sm">Warna Latar</h4>
                    <p className="text-xs text-[#718096] font-semibold">Mengatur warna latar belakang tombol atau kotak.</p>
                  </div>
                </div>

                <div className="bg-[#EEF2FF] border-2 border-[#4F7DF3]/40 rounded-2xl p-4 text-center">
                  <p className="text-sm sm:text-base font-black text-[#17233C]">
                    💡 Ringkasan: <span className="text-[#4F7DF3]">Property</span> = apa yang ingin diubah. <span className="text-[#4F7DF3]">Value</span> = bagaimana mengaturnya.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MATERI 3: Membuat Halaman Lebih Menarik */}
        {sectionIndex === 2 && (
          <div className="space-y-10 py-2">
            <div className="space-y-3">
              <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
                LEVEL 04 • MATERI 3 DARI 3
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
                Membuat Halaman <span className="text-[#4F7DF3]">Lebih Menarik</span>
              </h1>
            </div>

            <section className="space-y-6">
              <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
                  Sekarang kamu sudah tahu bahwa HTML digunakan untuk membuat struktur dan CSS digunakan untuk mengatur tampilan.
                </p>
                <p className="text-base sm:text-lg text-[#718096] font-semibold leading-relaxed">
                  Dengan CSS, kita bisa membuat halaman yang sebelumnya terlihat sederhana menjadi jauh lebih menarik! Misalnya, sebuah tombol HTML sederhana dapat kita beri warna latar dan warna tulisan menggunakan CSS.
                </p>
              </div>

              {/* Code Pair & Before/After Comparison */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#17233C]">
                  Perbandingan Tombol Sebelum & Sesudah CSS:
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Column: HTML & CSS Code */}
                  <div className="space-y-3">
                    <div className="bg-[#17233C] text-white rounded-2xl p-4 space-y-1.5 border border-slate-700">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        HTML (Struktur)
                      </span>
                      <pre className="font-mono text-sm text-emerald-400">
{`<button>Klik Aku</button>`}
                      </pre>
                    </div>

                    <div className="bg-[#17233C] text-white rounded-2xl p-4 space-y-1.5 border border-slate-700">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        CSS (Tampilan)
                      </span>
                      <pre className="font-mono text-sm text-blue-300">
{`button {
  background-color: blue;
  color: white;
}`}
                      </pre>
                    </div>
                  </div>

                  {/* Right Column: Visual Result Comparison */}
                  <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
                    <span className="text-xs font-mono font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start">
                      HASIL TAMPILAN
                    </span>

                    <div className="grid grid-cols-2 gap-3 items-center text-center">
                      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 space-y-2">
                        <span className="text-xs font-black text-slate-500 uppercase">Tanpa CSS</span>
                        <div>
                          <button className="bg-slate-200 border border-slate-400 px-3 py-1 text-xs text-black cursor-default">
                            Klik Aku
                          </button>
                        </div>
                      </div>

                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200 space-y-2">
                        <span className="text-xs font-black text-[#4F7DF3] uppercase">Dengan CSS</span>
                        <div>
                          <button style={{ backgroundColor: 'blue', color: 'white' }} className="px-4 py-2 rounded-lg font-bold text-xs shadow-md cursor-default">
                            Klik Aku
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 font-bold text-center">
                      ✨ Tombol dengan CSS jauh lebih menarik dan berwarna!
                    </p>
                  </div>
                </div>
              </div>

              {/* Relationship Diagram */}
              <div className="bg-[#FFFDF0] border-2 border-[#FFD84D] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs text-center">
                <h3 className="text-xl font-black text-[#17233C]">
                  Hubungan HTML dan CSS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-lg font-black text-[#4F7DF3]">HTML</span>
                    <p className="text-xs font-bold text-[#17233C]">↓</p>
                    <p className="text-xs sm:text-sm font-black text-slate-700">APA YANG ADA DI HALAMAN</p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-lg font-black text-[#4F7DF3]">CSS</span>
                    <p className="text-xs font-bold text-[#17233C]">↓</p>
                    <p className="text-xs sm:text-sm font-black text-slate-700">BAGAIMANA TAMPILANNYA</p>
                  </div>
                </div>

                <p className="text-sm font-bold text-slate-600 pt-2">
                  HTML tetap digunakan untuk membuat tombol. CSS hanya mengatur bagaimana tombol tersebut terlihat!
                </p>
              </div>
            </section>
          </div>
        )}

        {/* SECTION 4: Coding Practice */}
        {sectionIndex === 3 && (
          <CssCodePlayground
            onComplete={() => {
              setIsPracticeCompleted(true);
              setSectionIndex(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReset={() => {
              setSectionIndex(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* SECTION 5: Certificate Claim Page */}
        {sectionIndex === 4 && (
          <div className="py-2 animate-in fade-in">
            <CourseCertificateClaim courseId="level-4" courseName="CSS" />
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
                  ? 'Mulai Coding Practice'
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
