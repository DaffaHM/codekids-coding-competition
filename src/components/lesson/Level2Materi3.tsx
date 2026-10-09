'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function Level2Materi3() {
  return (
    <div className="space-y-10 py-2">
      {/* Header Section */}
      <div className="space-y-3">
        <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
          LEVEL 02 • MATERI 3 DARI 3
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
          Menemukan Langkah yang <span className="text-[#4F7DF3]">Hilang</span>
        </h1>
      </div>

      {/* SECTION 1 — Pembuka */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-[#17233C] tracking-tight">
          Langkah yang Terlewat
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          <p>
            Selain urutan yang tertukar, kesalahan lain dalam algoritma adalah adanya <span className="text-[#4F7DF3] font-black">langkah yang terlewat atau hilang</span>.
          </p>

          <p>
            Komputer tidak bisa melompat sendiri untuk melengkapi instruksi yang tidak kita berikan. Jika ada satu langkah penting yang terlupa, komputer tidak akan dapat menyelesaikan tugasnya dengan benar.
          </p>
        </div>

        {/* Callout Box: Contoh Langkah Hilang */}
        <div className="bg-[#FFFDF0] border-2 border-[#FFD84D] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#17233C]">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-black">Contoh dalam Kehidupan Sehari-hari</h3>
          </div>
          <p className="text-base sm:text-lg font-bold text-[#17233C] leading-relaxed">
            Bayangkan instruksi membuat teh manis: <br />
            <span className="text-[#4F7DF3]">"Seduh teh dengan air panas → Tambahkan gula."</span>
          </p>
          <p className="text-sm sm:text-base text-[#718096] font-semibold">
            Apa langkah yang terlewat? Ya! Kita belum **mengaduk gula** tersebut agar manisnya merata. Tanpa diaduk, tehnya tetap terasa tawar di bagian atas!
          </p>
        </div>
      </section>

      {/* SECTION 2 — Melatih Logika Menemukan Instruksi */}
      <section className="space-y-5 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#17233C] tracking-tight">
          Melatih Logika Pemikiran Algoritma
        </h2>

        <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          Kemampuan menemukan langkah yang terlewat adalah bagian penting dari berpikir komputasional (*computational thinking*).
        </p>

        <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="text-xl font-black text-[#17233C]">
            Langkah-Langkah Memeriksa Algoritma:
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="w-7 h-7 rounded-full bg-[#4F7DF3] text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
              <p className="text-sm sm:text-base font-bold text-[#17233C]">Baca setiap instruksi secara perlahan dari awal sampai akhir.</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="w-7 h-7 rounded-full bg-[#4F7DF3] text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
              <p className="text-sm sm:text-base font-bold text-[#17233C]">Bayangkan kamu adalah komputer yang menjalankan setiap langkah persis sesuai tulisan.</p>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="w-7 h-7 rounded-full bg-[#4F7DF3] text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
              <p className="text-sm sm:text-base font-bold text-[#17233C]">Jika ada bagian yang menggantung atau tidak sesuai, selipkan langkah yang hilang tersebut.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Ringkasan Level 02 */}
      <section className="space-y-4 pt-2">
        <div className="bg-white border-2 border-[#42C88A]/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-[#42C88A]">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
              Ringkasan Level 02: Algorithm
            </h3>
          </div>

          <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
            Selamat! Kamu sudah menyelesaikan seluruh materi pada Level 02: Algorithm. Kamu sudah belajar mengenai urutan langkah (*sequence*), dampak urutan yang salah, dan dasar-dasar *debugging*.
          </p>

          <div className="bg-[#F0FDF4] rounded-2xl p-5 border border-emerald-200 space-y-2.5">
            <div className="flex items-start gap-2.5 text-base sm:text-lg font-extrabold text-[#17233C]">
              <span className="text-[#16A34A]">•</span>
              <span>Algoritma adalah urutan langkah berurutan untuk menyelesaikan masalah.</span>
            </div>
            <div className="flex items-start gap-2.5 text-base sm:text-lg font-extrabold text-[#17233C]">
              <span className="text-[#16A34A]">•</span>
              <span>Debugging dilakukan untuk mencari dan memperbaiki kesalahan.</span>
            </div>
            <div className="flex items-start gap-2.5 text-base sm:text-lg font-extrabold text-[#17233C]">
              <span className="text-[#16A34A]">•</span>
              <span>Pastikan tidak ada langkah penting yang terlewat dalam algoritma.</span>
            </div>
          </div>

          <div className="pt-3 flex justify-center">
            <Link
              href="/learn"
              className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] font-black text-base sm:text-lg transition-all shadow-md hover:shadow-lg transform active:scale-95 inline-flex items-center gap-2.5 border-2 border-amber-300/60"
            >
              <span>Kembali ke Learning Hub</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
