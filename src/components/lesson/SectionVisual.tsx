'use client';

import { LessonSectionData } from '@/content/level1Data';
import { ArrowDown, Check, X, Gamepad2, Globe, Smartphone, Bot } from 'lucide-react';

interface SectionVisualProps {
  section: LessonSectionData;
}

export default function SectionVisual({ section }: SectionVisualProps) {
  switch (section.type) {
    case 'concept_flow':
      return (
        <div className="w-full my-6 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#718096] mb-4 text-center">
            Alur Konsep Coding
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            {/* Step 1 */}
            <div className="flex-1 w-full bg-[#EEF2FF] border-2 border-[#4F7DF3]/30 rounded-xl p-3.5 text-center">
              <div className="text-2xl mb-1">👦</div>
              <div className="font-extrabold text-[#17233C] text-sm">Kamu</div>
            </div>

            <ArrowDown className="w-5 h-5 text-[#4F7DF3] shrink-0 sm:-rotate-90" />

            {/* Step 2 */}
            <div className="flex-1 w-full bg-[#FFFBEB] border-2 border-[#FFD84D]/60 rounded-xl p-3.5 text-center">
              <div className="text-2xl mb-1">📝</div>
              <div className="font-extrabold text-[#17233C] text-sm">Memberikan Instruksi</div>
            </div>

            <ArrowDown className="w-5 h-5 text-[#4F7DF3] shrink-0 sm:-rotate-90" />

            {/* Step 3 */}
            <div className="flex-1 w-full bg-[#E8F8F0] border-2 border-[#42C88A]/40 rounded-xl p-3.5 text-center">
              <div className="text-2xl mb-1">💻</div>
              <div className="font-extrabold text-[#17233C] text-sm">Komputer</div>
            </div>

            <ArrowDown className="w-5 h-5 text-[#4F7DF3] shrink-0 sm:-rotate-90" />

            {/* Step 4 */}
            <div className="flex-1 w-full bg-[#F3E8FF] border-2 border-[#9333EA]/30 rounded-xl p-3.5 text-center">
              <div className="text-2xl mb-1">✨</div>
              <div className="font-extrabold text-[#17233C] text-sm">Melakukan Sesuatu</div>
            </div>
          </div>
        </div>
      );

    case 'instruction_comparison':
      return (
        <div className="w-full my-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Incorrect / Unclear Instruction */}
            <div className="bg-[#FEEFEF] border-2 border-[#FF6B6B]/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#FF6B6B]">
                  <X className="w-5 h-5 stroke-[3]" />
                  <span className="font-extrabold text-sm sm:text-base">Instruksi Tidak Jelas</span>
                </div>
                <div className="bg-white/80 rounded-xl p-3 text-[#17233C] font-semibold text-sm sm:text-base mb-3 border border-red-100">
                  &quot;Buat sesuatu yang bagus.&quot;
                </div>
              </div>
              <div className="text-xs font-bold text-[#FF6B6B] flex items-center gap-1.5">
                <span>🤔 Komputer Bingung (Tidak Tahu Harus Buat Apa)</span>
              </div>
            </div>

            {/* Correct / Clear Instruction */}
            <div className="bg-[#E8F8F0] border-2 border-[#42C88A]/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#2E7D32]">
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span className="font-extrabold text-sm sm:text-base">Instruksi Jelas</span>
                </div>
                <div className="bg-white/80 rounded-xl p-3 text-[#17233C] font-semibold text-sm sm:text-base mb-3 border border-green-100">
                  &quot;Tampilkan tulisan Halo!&quot;
                </div>
              </div>
              <div className="text-xs font-bold text-[#2E7D32] flex items-center gap-1.5">
                <span>👍 Komputer Mengerti & Langsung Menjalankannya</span>
              </div>
            </div>
          </div>

          {/* Conclusion Callout Card */}
          <div className="bg-[#EEF2FF] border border-[#4F7DF3]/30 rounded-2xl p-4 text-center">
            <p className="text-[#17233C] text-sm sm:text-base font-extrabold">
              💡 Kesimpulan: Komputer membutuhkan instruksi yang jelas agar dapat melakukan apa yang kita inginkan.
            </p>
          </div>
        </div>
      );

    case 'real_world_grid':
      return (
        <div className="w-full my-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Item 1: Game */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#4F7DF3] flex items-center justify-center shrink-0">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm sm:text-base text-[#17233C]">1. Game</h5>
                <p className="text-xs sm:text-sm text-[#718096] font-medium leading-snug mt-0.5">
                  Coding membuat karakter dan aturan game dapat berjalan.
                </p>
              </div>
            </div>

            {/* Item 2: Website */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm sm:text-base text-[#17233C]">2. Website</h5>
                <p className="text-xs sm:text-sm text-[#718096] font-medium leading-snug mt-0.5">
                  Coding membuat halaman website dapat ditampilkan dan digunakan.
                </p>
              </div>
            </div>

            {/* Item 3: Aplikasi */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#9333EA] flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm sm:text-base text-[#17233C]">3. Aplikasi</h5>
                <p className="text-xs sm:text-sm text-[#718096] font-medium leading-snug mt-0.5">
                  Coding membuat aplikasi dapat melakukan berbagai fungsi.
                </p>
              </div>
            </div>

            {/* Item 4: Robot */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm sm:text-base text-[#17233C]">4. Robot</h5>
                <p className="text-xs sm:text-sm text-[#718096] font-medium leading-snug mt-0.5">
                  Coding dapat memberikan instruksi kepada robot.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'sequence_recipe':
      return (
        <div className="w-full my-6 space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#718096] mb-3 flex items-center gap-2">
              <span>🍹</span> Contoh Urutan: Membuat Jus
            </h4>

            {/* 5 Ordered Steps */}
            <div className="space-y-2">
              {[
                'Siapkan buah',
                'Potong buah',
                'Masukkan buah ke blender',
                'Blender buah',
                'Tuangkan ke gelas',
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F6F8FC] border border-slate-200/60"
                >
                  <span className="w-6 h-6 rounded-full bg-[#4F7DF3] text-white text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#17233C]">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wrong Order Comparison Callout */}
          <div className="bg-[#FFF1F2] border border-red-200 rounded-2xl p-3.5 text-xs sm:text-sm font-semibold text-[#E11D48] flex items-center gap-2">
            <span>❌ Jika kamu meminum jus sebelum buah dimasukkan ke blender, urutannya salah dan tidak logis!</span>
          </div>

          {/* Conclusion Callout */}
          <div className="bg-[#EEF2FF] border border-[#4F7DF3]/30 rounded-2xl p-4 text-center">
            <p className="text-[#17233C] text-sm sm:text-base font-extrabold">
              💡 Kesimpulan: Dalam coding, instruksi perlu dibuat dengan jelas dan berurutan.
            </p>
          </div>
        </div>
      );

    case 'web_trio':
      return (
        <div className="w-full my-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* HTML */}
            <div className="bg-white p-4.5 rounded-2xl border-2 border-blue-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-[#4F7DF3] text-xs font-black uppercase tracking-wider inline-block mb-2">
                  HTML
                </span>
                <h5 className="font-extrabold text-sm sm:text-base text-[#17233C] mb-1">
                  Struktur Website
                </h5>
                <p className="text-xs text-[#718096] font-medium mb-3 leading-relaxed">
                  Mengatur isi dan struktur website.
                </p>
              </div>
              <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-2.5 rounded-xl border border-slate-800">
                &lt;h1&gt;Halo!&lt;/h1&gt;
              </div>
            </div>

            {/* CSS */}
            <div className="bg-white p-4.5 rounded-2xl border-2 border-green-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-green-100 text-[#16A34A] text-xs font-black uppercase tracking-wider inline-block mb-2">
                  CSS
                </span>
                <h5 className="font-extrabold text-sm sm:text-base text-[#17233C] mb-1">
                  Tampilan Website
                </h5>
                <p className="text-xs text-[#718096] font-medium mb-3 leading-relaxed">
                  Mengatur tampilan website.
                </p>
              </div>
              <div className="bg-slate-900 text-amber-300 font-mono text-xs p-2.5 rounded-xl border border-slate-800">
                color: blue;
              </div>
            </div>

            {/* JavaScript */}
            <div className="bg-white p-4.5 rounded-2xl border-2 border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#D97706] text-xs font-black uppercase tracking-wider inline-block mb-2">
                  JavaScript
                </span>
                <h5 className="font-extrabold text-sm sm:text-base text-[#17233C] mb-1">
                  Interaksi Website
                </h5>
                <p className="text-xs text-[#718096] font-medium mb-3 leading-relaxed">
                  Membuat website menjadi interaktif.
                </p>
              </div>
              <div className="bg-slate-900 text-sky-300 font-mono text-xs p-2.5 rounded-xl border border-slate-800">
                alert(&quot;Halo!&quot;);
              </div>
            </div>
          </div>

          <div className="bg-[#FFFBEB] border border-amber-200 rounded-2xl p-3.5 text-center">
            <p className="text-[#17233C] text-xs sm:text-sm font-bold">
              🚀 Nanti kamu akan belajar ketiganya di CodeKids!
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
