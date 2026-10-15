# CodeKids — Curriculum Architecture & Content Specification

## 1. Ikhtisar & Jalur Pembelajaran

Kurikulum CodeKids dirancang dengan filosofi berjenjang yang ramah anak:
$$\text{LEARN} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{PRACTICE} \longrightarrow \text{CREATE}$$

Rekomendasi Alur Pembelajaran (*Recommended Path*):
`01. Apa Itu Coding?` $\longrightarrow$ `02. Algorithm` $\longrightarrow$ `03. HTML` $\longrightarrow$ `04. CSS` $\longrightarrow$ `05. JavaScript (Coming Soon)` $\longrightarrow$ `06. Final Project (Coming Soon)`

---

## 2. Rincian Silabus & Konten per Level

### Level 01: Apa Itu Coding? (What is Coding?)
- **Status**: ✅ *Implemented*
- **Format**: **3 Materi Pembelajaran** + Kuis Pilihan Ganda (5 Soal) + Klaim Sertifikat Resmi.
- **Tujuan Pembelajaran**:
  - Memahami apa itu coding dalam bahasa yang sangat sederhana.
  - Memahami bahwa komputer membutuhkan instruksi yang spesifik dan jelas.
  - Mengenal penerapan coding dalam kehidupan sehari-hari (game, website, aplikasi, robot).
  - Menyadari bahwa instruksi harus diberikan dalam urutan yang tepat.
- **Rincian Materi**:
  1. *Apa itu Coding?*: Definisi dasar coding sebagai instruksi kepada komputer, pengenalan produk digital (`img1.png`, `img2.png`), dan callout *Ingat!*.
  2. *Komputer Membutuhkan Instruksi*: 4 seksi visual komparasi (komputer tidak bisa menebak, instruksi harus jelas, komputer memproses instruksi, dan akibat jika instruksi salah).
  3. *Coding Harus Berurutan*: Analogi runut langkah membuat jus buah (`materi3img1.png`), pentingnya urutan langkah, dan pengenalan konsep dasar algoritma.
- **Kuis Level 01**:
  - 5 pertanyaan pilihan ganda (definisi coding, kebutuhan instruksi, produk hasil coding, langkah awal membuat jus, bahasa pengatur tampilan).
  - Umpan balik langsung dengan visual checklist Robo, penjelasan logis, skor akhir, dan tombol coba lagi.

---

### Level 02: Algorithm (Algoritma)
- **Status**: ✅ *Implemented*
- **Format**: **3 Materi Pembelajaran** (termasuk Aktivitas Drag & Drop Interaktif) + Klaim Sertifikat Resmi.
- **Tujuan Pembelajaran**:
  - Memahami algoritma sebagai urutan langkah terencana untuk menyelesaikan masalah.
  - Melatih pemikiran komputasional (*computational thinking*) dalam menyusun instruksi (*sequence*).
  - Mengenal konsep kesalahan urutan (*logical bug*) dan dasar-dasar perbaikan (*debugging*).
- **Rincian Materi**:
  1. *Buat Jus!*: Aktivitas interaktif menyusun 5 kartu langkah membuat jus buah (Siapkan buah, Potong buah, Masukkan ke blender, Blender buah, Tuangkan ke gelas) menggunakan `@dnd-kit` dengan tombol panah cepat mobile dan umpan balik *live run*.
  2. *Ketika Urutan Langkah Salah*: Bacaan terstruktur mengenai dampak langkah yang tertukar atau tidak logis dalam algoritma.
  3. *Menemukan Langkah yang Hilang*: Melatih logika anak menemukan instruksi yang terlewat serta pemahaman proses *debugging*.
- **Klaim Sertifikat**: Terbuka otomatis setelah menyelesaikan seluruh materi Level 02.

---

### Level 03: HTML Basics (Dasar HTML)
- **Status**: ✅ *Implemented*
- **Format**: **3 Materi Bacaan** + **1 Coding Practice Interaktif** (3 Tantangan) + Klaim Sertifikat Resmi.
- **Tujuan Pembelajaran**:
  - Memahami bahwa HTML adalah bahasa pembuat struktur dan kerangka dasar halaman website.
  - Mengenal tag dasar berpasangan: `<h1>`, `<p>`, dan `<button>`.
  - Belajar menyusun elemen HTML bersama-sama hingga membentuk halaman web utuh.
- **Rincian Materi**:
  1. *Apa Itu HTML?*: Konsep analogi kerangka rumah dan 3 fungsi utama HTML (teks, media, tautan).
  2. *Mengenal Tag HTML*: Anatomi tag pembuka dan penutup, serta 3 tag dasar yang paling sering digunakan (`<h1>`, `<p>`, `<button>`).
  3. *HTML Membentuk Struktur*: Contoh penyusunan blok kode dari atas ke bawah.
- **Coding Practice (`CodePlayground`)**:
  - **Tantangan 1**: Menulis tag heading `<h1>Halo, Aku CodeKids!</h1>`.
  - **Tantangan 2**: Menambahkan paragraf `<p>Aku sedang belajar HTML.</p>`.
  - **Tantangan 3**: Menambahkan tombol interaktif `<button>Klik Aku</button>`.
  - Dilengkapi Live Preview instan, diagnosa kesalahan spesifik (misal: tag belum ditutup), dan modal selebrasi sukses antar-tantangan.

---

### Level 04: CSS Basics (Dasar CSS)
- **Status**: ✅ *Implemented*
- **Format**: **3 Materi Bacaan** + **1 Coding Practice Interaktif** (3 Tantangan) + Klaim Sertifikat Resmi.
- **Tujuan Pembelajaran**:
  - Memahami bahwa CSS bertugas mengatur gaya, warna, ukuran, dan tampilan halaman web.
  - Mengenal sintaksis CSS: Selector, Property, dan Value.
  - Mempelajari properti dasar: `color`, `font-size`, `background-color`, dan `border-radius`.
- **Rincian Materi**:
  1. *Apa Itu CSS?*: Prinsip pemisahan tugas (HTML membuat struktur, CSS mengatur tampilan).
  2. *Mengenal Property dan Value*: Cara kerja aturan CSS mengubah properti elemen.
  3. *Membuat Halaman Lebih Menarik*: Menghubungkan CSS langsung terhadap objek HTML.
- **Coding Practice (`CssCodePlayground`)**:
  - Menampilkan struktur HTML awal sebagai konteks yang akan dihias.
  - **Tantangan 1**: Mengubah warna judul dengan properti `color: #4F7DF3;`.
  - **Tantangan 2**: Mengubah ukuran teks paragraf dengan `font-size: 18px;`.
  - **Tantangan 3**: Menghias tombol dengan `background-color` dan `border-radius`.
  - Live Preview interaktif memperlihatkan perubahan gaya visual seketika.

---

### Level 05: JavaScript Basics (Dasar JavaScript)
- **Status**: ⏳ *Planned (Coming Soon)*
- **Rencana Format**: 3 Materi Pembelajaran + Coding Practice Interaktif + Klaim Sertifikat.
- **Tujuan Pembelajaran yang Direncanakan**:
  - Mengenal JavaScript sebagai bahasa pemberi aksi dan interaktivitas website.
  - Konsep variabel sederhana (`let`, `const`), nilai teks/angka, dan fungsi dasar.
  - Menghubungkan aksi klik tombol (`onclick`) dengan perubahan teks atau pesan dialog ramah anak.

---

### Level 06: Final Project (Proyek Akhir)
- **Status**: ⏳ *Planned (Coming Soon)*
- **Rencana Format**: 1 Proyek Mandiri Terpadu + Klaim Sertifikat Kelulusan Utama.
- **Rencana Proyek**: *"Buat Website Pertamamu!"*
  - Menggabungkan elemen struktur HTML, keindahan gaya CSS, dan interaktivitas tombol JavaScript dalam satu workspace utuh.
  - Menghasilkan website portofolio mini karya siswa sendiri.

---

## 3. Kontrak Tipe Data Kurikulum (TypeScript)

Mengacu langsung pada implementasi di [`src/types/curriculum.ts`](file:///d:/Coding/codekids/src/types/curriculum.ts):

```typescript
export type TopicType = 'quiz_topic' | 'coding_topic' | 'project_topic';

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Teks deskripsi atau bacaan terstruktur
  illustrationType?: 'diagram' | 'comparison' | 'code-preview' | 'none';
  illustrationData?: Record<string, unknown>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CodePracticeValidationRule {
  ruleId: string;
  description: string;
  checker: 'tag_exists' | 'style_contains' | 'js_eval';
  targetSymbol?: string;
}

export interface CodePractice {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  instructions: string[];
  solutionHints: string[];
  validationRules: CodePracticeValidationRule[];
}

export interface Topic {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  type: TopicType;
  sections: LessonSection[];
  quizQuestions?: QuizQuestion[];
  codePractice?: CodePractice;
}
```

