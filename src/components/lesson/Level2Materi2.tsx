'use client';

import React from 'react';
import { Sparkles, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export default function Level2Materi2() {
  return (
    <div className="space-y-10 py-2">
      {/* Header Section */}
      <div className="space-y-3">
        <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
          LEVEL 02 • MATERI 2 DARI 3
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] leading-tight tracking-tight">
          Ketika Urutan <span className="text-[#FF6B6B]">Langkah Salah</span>
        </h1>
      </div>

      {/* SECTION 1 — Pembuka & Contoh Algoritma Salah */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-[#17233C] tracking-tight">
          Ketika Urutan Langkah Salah
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          <p>
            Dalam membuat algoritma, kita tidak hanya perlu menuliskan langkah-langkah yang jelas. Kita juga harus memastikan setiap langkah berada pada urutan yang tepat.
          </p>

          <p>
            Bayangkan kamu ingin membuat jus. Kamu tentu perlu menyiapkan buah terlebih dahulu, kemudian memotongnya, memasukkannya ke dalam blender, dan menyalakan blender. Setelah jus selesai dibuat, barulah kamu menuangkannya ke dalam gelas.
          </p>

          <p className="font-extrabold text-[#4F7DF3]">
            Namun, bagaimana jika urutannya berubah?
          </p>
        </div>

        {/* Visual Contoh Algoritma Salah */}
        <div className="bg-[#FFF5F5] border-2 border-[#FF6B6B]/40 rounded-3xl p-5 sm:p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-[#FF6B6B] font-black text-xs sm:text-sm uppercase tracking-wider">
            <XCircle className="w-5 h-5 stroke-[2.5]" />
            <span>Contoh Algoritma Yang Salah</span>
          </div>

          {/* Flow Diagram (Vertical on Mobile, Horizontal on Desktop) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Step 1: Siapkan buah */}
            <div className="w-full sm:w-auto flex-1 bg-white border-2 border-slate-200 rounded-2xl p-3.5 flex sm:flex-col items-center justify-start sm:justify-center gap-3 text-center shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-[#17233C] text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
              <span className="text-sm font-extrabold text-[#17233C]">Siapkan buah</span>
            </div>

            <span className="text-[#FF6B6B] font-black sm:rotate-0 rotate-90 text-lg">↓</span>

            {/* Step 2: Blender buah (Error!) */}
            <div className="w-full sm:w-auto flex-1 bg-[#FFF5F5] border-2 border-[#FF6B6B] rounded-2xl p-3.5 flex sm:flex-col items-center justify-start sm:justify-center gap-3 text-center shadow-xs ring-4 ring-[#FF6B6B]/15">
              <span className="w-7 h-7 rounded-full bg-[#FF6B6B] text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-[#FF6B6B]">Blender buah</span>
                <XCircle className="w-4 h-4 text-[#FF6B6B] shrink-0" />
              </div>
            </div>

            <span className="text-[#FF6B6B] font-black sm:rotate-0 rotate-90 text-lg">↓</span>

            {/* Step 3: Potong buah (Error!) */}
            <div className="w-full sm:w-auto flex-1 bg-[#FFF5F5] border-2 border-[#FF6B6B] rounded-2xl p-3.5 flex sm:flex-col items-center justify-start sm:justify-center gap-3 text-center shadow-xs ring-4 ring-[#FF6B6B]/15">
              <span className="w-7 h-7 rounded-full bg-[#FF6B6B] text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-[#FF6B6B]">Potong buah</span>
                <XCircle className="w-4 h-4 text-[#FF6B6B] shrink-0" />
              </div>
            </div>

            <span className="text-[#FF6B6B] font-black sm:rotate-0 rotate-90 text-lg">↓</span>

            {/* Step 4: Tuangkan jus */}
            <div className="w-full sm:w-auto flex-1 bg-white border-2 border-slate-200 rounded-2xl p-3.5 flex sm:flex-col items-center justify-start sm:justify-center gap-3 text-center shadow-2xs">
              <span className="w-7 h-7 rounded-full bg-[#17233C] text-white font-black text-xs flex items-center justify-center shrink-0">4</span>
              <span className="text-sm font-extrabold text-[#17233C]">Tuangkan jus</span>
            </div>
          </div>
        </div>

        {/* Teks Penjelasan Error */}
        <div className="space-y-3 text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          <p>
            Urutan tersebut tidak akan menghasilkan proses yang benar. Blender tidak bisa digunakan sebelum buah dipotong dan dimasukkan ke dalam blender.
          </p>
          <p className="bg-slate-100 p-4 sm:p-5 rounded-2xl border-l-4 border-[#FF6B6B] font-bold text-[#17233C]">
            Artinya, meskipun semua langkah yang kita tuliskan benar, hasilnya tetap bisa salah jika urutannya tidak tepat.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Kesalahan dalam Algoritma */}
      <section className="space-y-5 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#17233C] tracking-tight">
          Kesalahan dalam Algoritma
        </h2>

        <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          Kesalahan seperti ini juga bisa terjadi ketika kita membuat program komputer. Komputer akan menjalankan instruksi sesuai dengan urutan yang diberikan. Komputer tidak akan mengetahui bahwa kita sebenarnya bermaksud melakukan langkah yang berbeda.
        </p>

        <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          Karena itu, ketika membuat algoritma, kita perlu memeriksa kembali setiap langkah. Kita perlu bertanya:
        </p>

        {/* Highlighted Question Box */}
        <div className="bg-[#EEF2FF] border-2 border-[#4F7DF3] rounded-3xl p-6 text-center shadow-xs my-4">
          <div className="flex items-center justify-center gap-2 text-[#4F7DF3] mb-1">
            <HelpCircle className="w-6 h-6 stroke-[2.5]" />
            <span className="text-xs font-black uppercase tracking-wider">Pertanyaan Penting</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#17233C] leading-snug">
            "Apakah langkah ini sudah berada di tempat yang tepat?"
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          Jika menemukan langkah yang salah, kita perlu mencari penyebabnya dan memperbaikinya.
        </p>
      </section>

      {/* SECTION 3 — Apa Itu Debugging? */}
      <section className="space-y-6 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#17233C] tracking-tight">
          Apa Itu Debugging?
        </h2>

        <div className="space-y-3 text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
          <p className="text-lg sm:text-xl font-extrabold text-[#4F7DF3] bg-blue-50/80 p-4 rounded-2xl border border-blue-100">
            Proses mencari dan memperbaiki kesalahan dalam program disebut <span className="underline decoration-[#FFD84D] decoration-4">debugging</span>.
          </p>

          <p>
            Debugging tidak selalu berarti mencari kesalahan pada kode yang panjang. Saat kamu memeriksa urutan langkah dalam sebuah algoritma dan memperbaiki langkah yang salah, kamu sebenarnya sudah mulai melakukan debugging.
          </p>
        </div>

        {/* Visual Konsep Debugging Sederhana */}
        <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="text-center text-xs sm:text-sm font-black text-[#718096] uppercase tracking-wider">
            Alur Konsep Debugging
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            {/* 1. MENEMUKAN KESALAHAN */}
            <div className="bg-[#FFF5F5] border-2 border-[#FF6B6B]/40 rounded-2xl p-4 flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <span className="text-2xl">🔍</span>
              <span className="text-xs font-black text-[#FF6B6B] uppercase tracking-wider">Langkah 1</span>
              <span className="text-sm font-black text-[#17233C]">MENEMUKAN KESALAHAN</span>
            </div>

            {/* 2. MEMERIKSA LANGKAH */}
            <div className="bg-[#FFFBEB] border-2 border-[#FFC107]/50 rounded-2xl p-4 flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <span className="text-2xl">👀</span>
              <span className="text-xs font-black text-[#D97706] uppercase tracking-wider">Langkah 2</span>
              <span className="text-sm font-black text-[#17233C]">MEMERIKSA LANGKAH</span>
            </div>

            {/* 3. MEMPERBAIKI */}
            <div className="bg-[#EEF2FF] border-2 border-[#4F7DF3]/40 rounded-2xl p-4 flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <span className="text-2xl">🛠️</span>
              <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider">Langkah 3</span>
              <span className="text-sm font-black text-[#17233C]">MEMPERBAIKI</span>
            </div>

            {/* 4. MENCOBA KEMBALI */}
            <div className="bg-[#F0FDF4] border-2 border-[#42C88A]/50 rounded-2xl p-4 flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <span className="text-2xl">🚀</span>
              <span className="text-xs font-black text-[#16A34A] uppercase tracking-wider">Langkah 4</span>
              <span className="text-sm font-black text-[#17233C]">MENCOBA KEMBALI</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Contoh Debugging */}
      <section className="space-y-6 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#17233C] tracking-tight">
          Contoh Debugging
        </h2>

        {/* Comparison Box: Algoritma Awal vs Algoritma Setelah Diperbaiki */}
        <div className="space-y-4">
          {/* 1. Algoritma Awal (Salah) */}
          <div className="bg-[#FFF5F5] border-2 border-[#FF6B6B]/40 rounded-3xl p-5 sm:p-6 space-y-3 shadow-xs">
            <span className="bg-[#FF6B6B] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              Algoritma awal
            </span>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold text-[#17233C] pt-1">
              <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200">Siapkan buah</span>
              <span className="text-[#FF6B6B]">→</span>
              <span className="bg-red-100 text-[#FF6B6B] px-3 py-1.5 rounded-xl border border-red-200 flex items-center gap-1">
                Blender buah <XCircle className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-[#FF6B6B]">→</span>
              <span className="bg-red-100 text-[#FF6B6B] px-3 py-1.5 rounded-xl border border-red-200 flex items-center gap-1">
                Potong buah <XCircle className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-[#FF6B6B]">→</span>
              <span className="bg-red-100 text-[#FF6B6B] px-3 py-1.5 rounded-xl border border-red-200 flex items-center gap-1">
                Masukkan buah ke blender <XCircle className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-[#FF6B6B]">→</span>
              <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200">Tuangkan jus</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed italic px-1">
            Setelah diperiksa, kita menemukan bahwa ada langkah yang tidak tepat.
          </p>

          {/* 2. Algoritma Setelah Diperbaiki (Benar) */}
          <div className="bg-[#F0FDF4] border-2 border-[#42C88A]/50 rounded-3xl p-5 sm:p-6 space-y-3 shadow-xs">
            <span className="bg-[#42C88A] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              Algoritma setelah diperbaiki
            </span>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold text-[#17233C] pt-1">
              <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200">Siapkan buah</span>
              <span className="text-[#42C88A]">→</span>
              <span className="bg-emerald-100 text-[#16A34A] px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                Potong buah <CheckCircle2 className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-[#42C88A]">→</span>
              <span className="bg-emerald-100 text-[#16A34A] px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                Masukkan buah ke blender <CheckCircle2 className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-[#42C88A]">→</span>
              <span className="bg-emerald-100 text-[#16A34A] px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                Blender buah <CheckCircle2 className="w-3.5 h-3.5 inline" />
              </span>
              <span className="text-[#42C88A]">→</span>
              <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200">Tuangkan jus</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Ingat! */}
      <section className="space-y-4 pt-2">
        <div className="bg-[#FFFBEB] border-2 border-[#FFD84D] rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">💡</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
              Ingat!
            </h3>
          </div>

          <p className="text-lg sm:text-xl font-black text-[#17233C] leading-relaxed">
            Algoritma yang baik tidak hanya memiliki langkah-langkah yang jelas, tetapi juga memiliki urutan yang tepat.
          </p>

          <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed pt-1">
            Jika hasilnya tidak sesuai, jangan langsung menyerah. Periksa kembali langkah-langkahnya, temukan bagian yang salah, lalu perbaiki. Itulah dasar dari debugging.
          </p>
        </div>
      </section>

      {/* SECTION 6 — Ringkasan */}
      <section className="space-y-4 pt-2">
        <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
            Ringkasan
          </h3>

          <p className="text-base sm:text-lg text-[#17233C] font-semibold leading-relaxed">
            Dalam materi ini, kamu sudah belajar bahwa kesalahan dalam algoritma dapat terjadi ketika sebuah langkah berada di posisi yang tidak tepat. Untuk mengatasinya, kita perlu memeriksa setiap langkah, menemukan kesalahan, dan memperbaikinya. Proses mencari dan memperbaiki kesalahan tersebut disebut debugging.
          </p>

          <div className="bg-[#F6F8FC] rounded-2xl p-5 border border-slate-200 space-y-2.5">
            <div className="flex items-start gap-2.5 text-base sm:text-lg font-extrabold text-[#17233C]">
              <span className="text-[#4F7DF3]">•</span>
              <span>Algoritma harus memiliki urutan yang tepat.</span>
            </div>
            <div className="flex items-start gap-2.5 text-base sm:text-lg font-extrabold text-[#17233C]">
              <span className="text-[#FF6B6B]">•</span>
              <span>Urutan yang salah dapat membuat hasil menjadi salah.</span>
            </div>
            <div className="flex items-start gap-2.5 text-base sm:text-lg font-extrabold text-[#17233C]">
              <span className="text-[#42C88A]">•</span>
              <span>Debugging adalah proses mencari dan memperbaiki kesalahan.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
