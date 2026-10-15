# CodeKids — Technical Architecture Specification

## 1. Stack Teknologi Aktual

- **Framework**: [Next.js](https://nextjs.org/) 16.3.8 (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x (Strict Mode)
- **Core UI Runtime**: [React](https://react.dev/) 19.2.8 & React DOM 19.2.8
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/postcss: ^4`, `tailwindcss: ^4`, `tw-animate-css`)
- **Drag & Drop Engine**: `@dnd-kit/core` (v6.3.1), `@dnd-kit/sortable` (v10.0.0), `@dnd-kit/utilities` (v3.2.2)
- **Pembuatan Sertifikat Resmi**: `@react-pdf/renderer` (v4.9.0) & `html-to-image` (v1.11.13)
- **Kecerdasan Buatan (AI Tutor)**: `@google/generative-ai` (v0.24.1) terhubung ke Google Gemini Flash API
- **Animasi & Transisi**: `gsap` (v3.15.0) & `@lottiefiles/dotlottie-react` (v0.20.0)
- **Tipografi & LaTeX Math**: `katex` (v0.19.0), `@types/katex`, `next/font/google`
- **Iconography**: `lucide-react` (v1.52.0) & `react-icons` (v5.7.0)
- **Penyimpanan Sisi Klien**: Browser `localStorage` dengan *hydration safety layer*

---

## 2. Arsitektur Struktur Direktori Proyek

```
codekids/
├── docs/                      # Dokumentasi master spesifikasi & arsitektur
│   ├── PRD.md                 # Product Requirement Document aktual
│   ├── DESIGN_SYSTEM.md       # Spesifikasi desain, warna, & responsivitas
│   ├── CURRICULUM.md          # Silabus materi, kuis, & latihan per level
│   ├── TECHNICAL_SPEC.md      # Spesifikasi arsitektur teknis & keamanan
│   └── AI_AGENT_RULES.md      # 15 Aturan wajib pengembangan AI agent
├── prompts/                   # Catatan rekaman prompt pengembangan
│   └── RAW_PROMPT_LOG.md      # Jurnal prompt kompetisi
├── public/                    # Aset publik statis (gambar kartu, ikon, ilustrasi 3D)
│   ├── level1/                # Aset gambar Level 1 (img1, img2, materi2img1-4, materi3img1)
│   ├── level2/                # Aset gambar langkah jus Level 2 (siapkan, potong, blender, dll.)
│   ├── learn/                 # Banner kartu kursus (card1.png s.d. card6.png)
│   ├── codekidslogo.png       # Logo resmi CodeKids
│   ├── resultquiz.png         # Gambar selebrasi kuis Robo
│   └── icon.svg               # Favicon vektor modern CodeKids
├── src/
│   ├── app/                   # Rute halaman Next.js App Router
│   │   ├── layout.tsx         # Root layout (Navbar, Footer, PageLoader, AIChatWidget)
│   │   ├── page.tsx           # Halaman Beranda (Hero, Why, How It Works)
│   │   ├── certificate/
│   │   │   └── page.tsx       # Halaman Galeri Sertifikatku (/certificate)
│   │   ├── learn/
│   │   │   ├── page.tsx       # Halaman Learning Hub (/learn)
│   │   │   └── [topicId]/
│   │   │       ├── page.tsx   # Reader Materi Terpadu (/learn/level-1, level-2, dll.)
│   │   │       └── quiz/
│   │   │           └── page.tsx # Rute kuis langsung
│   │   ├── globals.css        # Konfigurasi Tailwind CSS v4 & custom keyframes
│   │   ├── loading.tsx        # UI loading global
│   │   └── icon.svg           # Dynamic App Icon route
│   ├── components/            # Komponen React terisolasi
│   │   ├── AIChatWidget.tsx   # Floating widget AI Tutor CodeKids
│   │   ├── certificate/       # CertificateGallery, CertificatePDF, CourseCertificateClaim
│   │   ├── common/            # SortableList (@dnd-kit), PageLoader, PageTransition, LaTeXRenderer
│   │   ├── editor/            # CodeEditor, LivePreview, CodePlayground, CssCodePlayground
│   │   ├── home/              # HeroSection, WhyCodeKidsSection, HowItWorksSection
│   │   ├── layout/            # Navbar, Footer
│   │   ├── learn/             # CourseGrid, LearnHeader
│   │   ├── lesson/            # Level1LessonReader s.d. Level4LessonReader
│   │   └── quiz/              # Level1Quiz
│   ├── content/               # Data materi terstruktur
│   │   ├── level1Data.ts      # Konten materi & kuis Level 1
│   │   ├── level2Data.ts      # Konten materi Level 2
│   │   ├── level3Data.ts      # Konten materi & latihan Level 3
│   │   ├── level4Data.ts      # Konten materi & latihan Level 4
│   │   └── topics.ts          # Metadata kurikulum umum
│   ├── lib/                   # Utilitas inti
│   │   ├── storage.ts         # Lapisan persistensi data localStorage
│   │   ├── sandbox.ts         # Utilitas kompilasi HTML/CSS/JS sandbox
│   │   ├── certificateLayout.ts # Skala koordinat vektor sertifikat PDF
│   │   └── utils.ts           # Class merging (cn) helper
│   ├── services/
│   │   └── aiChatService.ts   # Integrasi Google Gemini API & multi-model fallback
│   └── types/                 # Definisi tipe data TypeScript
│       ├── curriculum.ts      # Tipe data materi, bagian, kuis, latihan
│       └── progress.ts        # Tipe data progres belajar & sertifikat
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Arsitektur Sandbox & Evaluasi Kode Aman

Mengevaluasi kode HTML, CSS, dan JavaScript yang ditulis anak secara langsung di jendela browser utama memiliki risiko konflik DOM dan kebocoran skrip. CodeKids menerapkan arsitektur **Isolated Client-Side Iframe Sandbox**:

### 1. Lapisan Isolasi (`sandbox="allow-scripts"`)
Kompilasi kode dirender di dalam elemen `<iframe>` dengan atribut sandbox terbatas:
```html
<iframe
  sandbox="allow-scripts"
  srcdoc="<compiled_document>"
  title="CodeKids Live Preview"
  className="w-full h-full border-0 rounded-2xl bg-white"
/>
```
Atribut `allow-same-origin` secara sengaja **tidak** diberikan agar skrip pengguna tidak dapat membaca cookie, storage, atau memanipulasi dokumen induk.

### 2. Pipa Kompilasi & Pencegahan Kebocoran (`src/lib/sandbox.ts`)
- Fungsi `generateSandboxDoc({ html, css, js })` menggabungkan kode pengguna ke dalam dokumen HTML standar dengan sanitasi dasar.
- Elemen `<script>` internal diletakkan di dalam `<head>` hanya jika terdapat kode JavaScript, mencegah teks skrip bocor dan muncul sebagai karakter aneh di layar pratinjau anak ketika tag HTML belum ditutup.
- Menghindari render instan saat sintaksis belum dieksekusi melalui kontrol `hasRun` pada editor.

---

## 4. Arsitektur Persistensi Sisi Klien (`localStorage`)

### Skema Data Progres (`src/types/progress.ts`):
```typescript
export interface CertificateData {
  certificateClaimed: boolean;
  studentName: string;
  courseId: string;
  courseName: string;
  completionDate: string;
  certificateVersion?: number;
}

export interface TopicProgress {
  topicId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  currentSectionIndex: number;
  quizScore?: number;
  quizCompleted: boolean;
  practiceCompleted: boolean;
  certificate?: CertificateData;
  updatedAt: string;
}

export interface FinalProjectProgress {
  completed: boolean;
  studentName?: string;
  codeHtml?: string;
  codeCss?: string;
  codeJs?: string;
  completedAt?: string;
}

export interface UserProgressData {
  topics: Record<string, TopicProgress>;
  finalProject: FinalProjectProgress;
}
```

### Ketahanan Penyimpanan (`src/lib/storage.ts`):
- Kunci penyimpanan: `codekids_user_progress_v1`.
- Seluruh pembacaan dan penulisan dibungkus dalam blok `try-catch` untuk mengantisipasi mode *Incognito/Private Browsing* atau kuota storage penuh.
- Mendukung pemetaan alias ID kursus (`level-1`, `what-is-coding`, `01`, dll.) untuk memastikan konsistensi pencatatan progres dari berbagai rute URL.
- Membaca data hanya setelah komponen terpasang di sisi klien (`isMounted`) guna mengeliminasi *React SSR Hydration Mismatch*.

---

## 5. Arsitektur Generator Sertifikat PDF

Pembuatan sertifikat resmi tidak menggunakan tangkapan layar beresolusi rendah, melainkan menggunakan mesin render vektor murni `@react-pdf/renderer` (`src/components/certificate/CertificatePDF.tsx`):
- Template sertifikat resmi berukuran A4 Landscape (`841.89 x 595.28` pt).
- Perhitungan ukuran font adaptif (`calculateAdaptiveFontSize` di `src/lib/certificateLayout.ts`) agar nama siswa yang panjang tidak terpotong atau keluar dari batas garis piagam.
- Menyediakan tombol unduh langsung dokumen PDF asli serta alternatif pratinjau instan via `html-to-image`.

---

## 6. Arsitektur AI Chatbot Tutor (Google Gemini API)

- Diimplementasikan di [`src/services/aiChatService.ts`](file:///d:/Coding/codekids/src/services/aiChatService.ts) dan [`src/components/AIChatWidget.tsx`](file:///d:/Coding/codekids/src/components/AIChatWidget.tsx).
- **Mekanisme Fallback Cascade**: Secara otomatis mencoba model dari yang tercepat:
  `gemini-3.5-flash-lite` $\longrightarrow$ `gemini-3.5-flash` $\longrightarrow$ `gemini-3.1-flash-lite` $\longrightarrow$ `gemini-3.7-flash` $\longrightarrow$ `gemini-3.8-flash`.
- **Cooldown Tracker**: Jika sebuah model mengalami rate-limit (429) atau server overload (503), sistem mencatat jeda cooldown sementara dan secara mulus beralih ke model cadangan tanpa memutus percakapan anak.
- **Strict Guardrail Prompt**: AI secara tegas hanya bersedia melayani pertanyaan seputar materi pemrograman, HTML, CSS, JavaScript, logika komputer, dan algoritma. Pertanyaan di luar topik ditolak dengan ramah dan santun.
- **Rendering Rumus**: Formula matematika dan logika dirender indah menggunakan `katex` via `LaTeXRenderer.tsx`.

---

## 7. Prosedur Pengujian & Build

Perintah verifikasi standar yang digunakan dalam siklus pengembangan:
```bash
# Menjalankan server pengembangan lokal (Turbopack)
npm run dev

# Pemeriksaan kepatuhan tipe data TypeScript murni
npx tsc --noEmit

# Pemeriksaan linter kode
npm run lint

# Kompilasi build produksi Next.js
npm run build
```
Semua perintah di atas harus menghasilkan status sukses 0 error sebelum kode dirilis.
ightweight textarea/code input container with line numbering and syntax highlighting hints. (Avoid heavy web editors like Monaco unless proved strictly necessary).
- **Icons**: Clean inline SVGs or lightweight SVG icon helper components.
- **Animations**: CSS transitions and Tailwind utility keyframes (`transition-all duration-300`).
- **Certificate Printing/Download**: Clean CSS `@media print` rules and HTML5 Canvas / SVG rendering.
