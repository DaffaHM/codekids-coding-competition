# CodeKids 🚀

**CodeKids** adalah platform web edukasi coding interaktif yang dirancang khusus untuk siswa sekolah dasar (terutama kelas 4–6 SD, usia 9–12 tahun). Platform ini memadukan materi terstruktur, aktivitas drag-and-drop interaktif, editor kode berbasis browser dengan live preview, kuis dengan umpan balik instan, klaim sertifikat resmi, serta asisten AI Tutor cerdas.

---

## 🌟 Konsep & Filosofi Produk

CodeKids menghadirkan pengalaman belajar pemrograman yang ramah anak, terstruktur, dan menyenangkan tanpa terjebak pada mekanik gamifikasi berlebihan atau sistem kunci materi yang membatasi rasa ingin tahu.

### Filosofi Inti Pembelajaran:
$$\text{LEARN} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{PRACTICE} \longrightarrow \text{CREATE}$$

- **Alur Fleksibel & Terbimbing**: Siswa pemula dapat mengikuti *Recommended Learning Path* (Level 01 s.d. 06), sedangkan siswa yang sudah memiliki dasar dapat langsung memilih topik yang diminati.
- **Umpan Balik Langsung (*Immediate Feedback*)**: Pembahasan instan pada kuis, diagnosa kesalahan spesifik pada latihan kode, dan pratinjau langsung (*Live Preview*).
- **Latihan Coding Aman**: Editor kode in-browser yang ringan dan aman dengan eksekusi sandboxed `<iframe>` tanpa perlu instalasi aplikasi lokal.
- **Bebas Hambatan Akun**: Tidak memerlukan pendaftaran akun atau kata sandi; seluruh progres pembelajaran dan sertifikat tersimpan aman di browser melalui `localStorage`.

---

## 📚 Kurikulum & Status Implementasi

Kurikulum CodeKids terdiri dari 6 level utama:

| Level | Topik | Status | Format Pembelajaran | Fitur Khusus |
| :--- | :--- | :---: | :--- | :--- |
| **01** | **Apa Itu Coding?** | ✅ *Implemented* | 3 Materi Pembelajaran + Kuis 5 Soal | Alur konsep visual, perbandingan instruksi, resep jus, kuis interaktif & klaim sertifikat |
| **02** | **Algorithm** | ✅ *Implemented* | 3 Materi Pembelajaran + Sertifikat | Aktivitas drag-and-drop susun langkah jus (@dnd-kit), analisis urutan salah, debugging & sertifikat |
| **03** | **HTML** | ✅ *Implemented* | 3 Materi + 1 Coding Practice + Sertifikat | Pengenalan tag `<h1>`, `<p>`, `<button>`, live editor, 3 level tantangan & sertifikat |
| **04** | **CSS** | ✅ *Implemented* | 3 Materi + 1 Coding Practice + Sertifikat | Styling tampilan, property & value (`color`, `font-size`, `background`), live preview, 3 tantangan & sertifikat |
| **05** | **JavaScript** | ⏳ *Planned* | 3 Materi Pembelajaran *(Coming Soon)* | Variabel dasar, fungsi sederhana, interaksi tombol & event onclick |
| **06** | **Final Project** | ⏳ *Planned* | 1 Proyek Akhir *(Coming Soon)* | Mini website pribadi menggabungkan HTML, CSS, dan JS |

---

## 🤖 Fitur Tambahan Unggulan

- **CodeKids AI Tutor (OmniBot)**: Asisten AI interaktif bertenaga Google Gemini API (`@google/generative-ai`) dengan *guardrail* ketat khusus materi coding ramah anak, mendukung penjelasan Markdown dan rumus logika KaTeX.
- **Sertifikatku (Certificate Gallery)**: Halaman khusus di `/certificate` untuk melihat dan mengunduh kembali sertifikat resmi berformat vektor tajam via `@react-pdf/renderer` dan pratinjau gambar.
- **Sortable Drag & Drop Mobile-Optimized**: Menggunakan `@dnd-kit` dengan kalibrasi touch sensor (150ms delay, 8px tolerance, tombol panah cepat ▲/▼, serta React Portal) yang bebas dari bug layout di layar smartphone.
- **Page Transitions & Lottie Loader**: Transisi halaman mulus berbasis GSAP dan animasi loading ramah anak via `@lottiefiles/dotlottie-react`.

---

## 🛠️ Arsitektur & Teknologi

- **Framework**: [Next.js](https://nextjs.org/) 16.3.8 (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x (Strict mode)
- **Library UI & Core**: [React](https://react.dev/) 19.2.8 & React DOM 19.2.8
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/postcss: ^4`), `tw-animate-css`
- **Drag & Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **Sertifikat PDF**: `@react-pdf/renderer` v4.9.0 & `html-to-image`
- **AI Integration**: `@google/generative-ai` (Gemini Flash family)
- **Icons**: `lucide-react`, `react-icons` (Remix Icons)
- **Animasi & Math**: `gsap`, `@lottiefiles/dotlottie-react`, `katex`
- **Penyimpanan Data**: Browser `localStorage` dengan penanganan SSR/Hydration-safe

---

## 📂 Struktur Direktori Proyek

```
codekids/
├── docs/                      # Dokumentasi teknis, produk, & aturan kompetisi
│   ├── PRD.md                 # Product Requirement Document (Status aktual produk)
│   ├── DESIGN_SYSTEM.md       # Spesifikasi warna, tipografi, & komponen UI
│   ├── CURRICULUM.md          # Spesifikasi silabus & konten tiap level
│   ├── TECHNICAL_SPEC.md      # Arsitektur teknis, sandbox, storage & library
│   └── AI_AGENT_RULES.md      # 15 Aturan wajib pengembangan AI agent
├── prompts/                   # Catatan prompt log historis
│   └── RAW_PROMPT_LOG.md      # Log prompt pengembangan kompetisi
├── public/                    # Aset grafis statis (kartu level, logo, ikon, gambar 3D)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── certificate/       # Halaman galeri sertifikat kelulusan (/certificate)
│   │   ├── learn/             # Halaman Learning Hub (/learn)
│   │   │   └── [topicId]/     # Halaman baca materi & practice (/learn/[topicId])
│   │   ├── globals.css        # Konfigurasi Tailwind v4 & utilitas custom
│   │   ├── layout.tsx         # Root layout (Navbar, Footer, AI Chatbot, Loader)
│   │   └── page.tsx           # Beranda utama (Hero, Why, How It Works)
│   ├── components/            # Komponen React modular
│   │   ├── certificate/       # CertificateGallery, CertificatePDF, CourseCertificateClaim
│   │   ├── common/            # SortableList, PageLoader, PageTransition, LaTeXRenderer
│   │   ├── editor/            # CodeEditor, LivePreview, CodePlayground, CssCodePlayground
│   │   ├── home/              # HeroSection, WhyCodeKidsSection, HowItWorksSection
│   │   ├── layout/            # Navbar, Footer
│   │   ├── learn/             # CourseGrid, LearnHeader
│   │   ├── lesson/            # Level1 s.d. Level4 Lesson Readers & materi
│   │   └── quiz/              # Level1Quiz
│   ├── content/               # Data materi terstruktur (level1Data s.d. level4Data, topics)
│   ├── lib/                   # Utilitas (storage.ts, sandbox.ts, certificateLayout.ts)
│   ├── services/              # Integrasi API (aiChatService.ts untuk Gemini AI)
│   └── types/                 # Definisi tipe TypeScript (curriculum.ts, progress.ts)
├── package.json               # Konfigurasi dependencies & script
├── tsconfig.json              # Konfigurasi TypeScript
└── README.md                  # Dokumentasi pengantar proyek
```

---

## 🚀 Menjalankan Proyek Secara Lokal

### 1. Prasyarat
- [Node.js](https://nodejs.org/) v18.18 atau lebih baru
- [npm](https://www.npmjs.com/) v9 atau lebih baru

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment (Opsional untuk AI Chatbot)
Buat berkas `.env.local` di root proyek jika ingin mengaktifkan fitur AI Tutor:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada tautan [http://localhost:3000](http://localhost:3000).

### 5. Memeriksa Tipe & Build Produksi
```bash
npx tsc --noEmit
npm run build
```

---

## 🎨 Ringkasan Desain & Identitas Visual

- **Primary Blue**: `#4F7DF3` (Aksen utama, tombol aktif, identitas brand)
- **Dark Navy**: `#17233C` (Teks judul, kontras gelap)
- **Accent Yellow**: `#FFD84D` (Sorotan, badge level, tombol aksi sekunder)
- **Success Green**: `#42C88A` (Indikator keberhasilan, jawaban benar)
- **Error Red**: `#FF6B6B` (Indikator kesalahan, umpan balik kuis)
- **Background**: `#F6F8FC` (Latar belakang lembut ramah mata)
- **Tipografi**: `Fredoka`, `Nunito`, `JetBrains Mono`, `Geist` via Google Fonts.
