# CodeKids — Product Requirement Document (PRD)

## 1. Ringkasan Eksekutif & Identitas Produk

- **Nama Produk**: CodeKids
- **Target Pengguna**: Siswa Sekolah Dasar (SD), terutama Kelas 4–6 (usia 9–12 tahun).
- **Tema Kompetisi**: *Innovating Education Through Technology*
- **Subtema**: *Web Education for Kids*
- **Filosofi Produk**: **LEARN → UNDERSTAND → PRACTICE → CREATE**
- **Tujuan Utama**: Menghadirkan platform web edukasi interaktif di mana anak-anak dapat mempelajari logika pemrograman dan web dasar (HTML & CSS), menguji pemahaman dengan kuis ramah anak, berlatih menulis kode sendiri di browser secara aman, berkonsultasi dengan AI Tutor pendamping, serta meraih dan mengunduh sertifikat resmi kelulusan.

CodeKids dirancang sebagai **produk edukasi asli** yang bersih, terstruktur, intuitif, dan secara visual memikat tanpa bergantung pada gamifikasi berlebihan (*no distracting game UI*, tanpa sistem koin/poin yang mengaburkan esensi belajar).

---

## 2. Status Implementasi Fitur (Feature Status Matrix)

Berikut adalah status aktual dari seluruh modul dan fitur CodeKids saat ini:

### A. Fitur yang Sudah Terimplementasi Penuh (*Implemented*) ✅
1. **Beranda Interaktif (`/`)**:
   - Hero Section dengan visual maskot, CTA *"Mulai Belajar Sekarang"*, dan pratinjau interaktif.
   - Seksi Keunggulan (*Why CodeKids Section*): Bahasa mudah, visual interaktif, latihan langsung, sertifikat resmi.
   - Seksi Alur Belajar (*How It Works Section*): Alur 4 langkah dari materi hingga sertifikat.
   - Navbar responsif dengan *glassmorphism backdrop blur*, animasi GSAP mobile menu, dan Footer lengkap dengan tautan kurikulum.
2. **Learning Hub (`/learn`)**:
   - Banner header edukatif: *"Yuk, Mulai Belajar Coding!"* dan *"Pilih Materi dan mulai petualangan coding-mu dari dasar"*.
   - Grid 6 Kartu Kursus (*CourseGrid*): Menampilkan badge level, status sertifikat, jumlah materi aktual (Level 1–5: 3 Materi, Level 6: 1 Proyek), serta tombol aksi dinamis / *Coming Soon* terkunci.
3. **Level 01: "Apa Itu Coding?" (`/learn/level-1`)**:
   - 3 Materi Pembelajaran visual terstruktur:
     - Materi 1: Konsep coding & kegunaannya (grafik alur `img1.png`, kartu 3D `img2.png`, callout *Ingat!*).
     - Materi 2: Komputer membutuhkan instruksi (4 diagram visual instruksi jelas vs tidak jelas).
     - Materi 3: Coding harus berurutan (analogi membuat jus buah berurutan `materi3img1.png`).
   - Mesin Kuis Interaktif (`Level1Quiz`): 5 soal pilihan ganda, umpan balik langsung dengan penjelasan ramah anak, layar skor akhir, retry loop, dan klaim sertifikat.
4. **Level 02: "Algorithm" (`/learn/level-2`)**:
   - 3 Materi Pembelajaran logika & algoritma:
     - Materi 1: Aktivitas interaktif susun langkah membuat jus (*Sortable drag-and-drop* bertenaga `@dnd-kit` dengan sensor sentuh terkalibrasi untuk mobile, tombol panah cepat ▲/▼, dan isolasi React Portal).
     - Materi 2: Memahami dampak urutan yang salah dalam algoritma (`Level2Materi2`).
     - Materi 3: Menemukan langkah yang hilang dan dasar-dasar *debugging* (`Level2Materi3`).
   - Alur penyelesaian course & klaim sertifikat resmi Level 02.
5. **Level 03: "HTML Basics" (`/learn/level-3`)**:
   - 3 Materi Bacaan:
     - Materi 1: Pengenalan HTML sebagai kerangka website.
     - Materi 2: Mengenal tag dasar HTML (`<h1>`, `<p>`, `<button>`).
     - Materi 3: Struktur penyusunan tag HTML menjadi halaman utuh.
   - Coding Practice Interaktif (`CodePlayground`):
     - Editor kode berbasis browser dengan line-numbering dan penanganan indentasi.
     - 3 tantangan bertahap (Membuat Judul, Menambahkan Paragraf, Membuat Tombol).
     - Live Preview dalam sandbox aman `<iframe>`.
     - Validasi regex cerdas dengan diagnosa error spesifik ramah anak.
     - Modal selebrasi sukses antar-tantangan (`ChallengeSuccessModal`).
   - Alur penyelesaian course & klaim sertifikat resmi Level 03.
6. **Level 04: "CSS Basics" (`/learn/level-4`)**:
   - 3 Materi Bacaan:
     - Materi 1: Pengenalan CSS (HTML membuat struktur, CSS mengatur tampilan).
     - Materi 2: Mengenal Property dan Value (`color`, `font-size`, `background-color`, `border-radius`).
     - Materi 3: Menghubungkan HTML dan CSS agar halaman lebih menarik.
   - Coding Practice Interaktif (`CssCodePlayground`):
     - Latihan menulis CSS langsung terhadap struktur HTML konteks.
     - 3 tantangan bertahap (Memberi Warna Teks, Mengatur Ukuran & Warna Latar, Mempercantik Tombol).
     - Live Preview real-time setelah klik *Jalankan Kode*.
     - Modal selebrasi sukses dan klaim sertifikat resmi Level 04.
7. **Sistem Sertifikat Resmi & Galeri (`/certificate`)**:
   - Halaman khusus **Sertifikatku** menampilkan seluruh galeri sertifikat yang telah diraih maupun yang siap diklaim.
   - Modal klaim sertifikat interaktif dengan input nama siswa.
   - Generator PDF beresolusi tinggi berbasis vektor menggunakan `@react-pdf/renderer` (`CertificatePDF.tsx`).
   - Unduh langsung dokumen PDF sertifikat resmi atau simpan gambar sertifikat.
8. **AI Tutor CodeKids (OmniBot AI)**:
   - Widget chat mengambang (*floating widget*) terintegrasi di seluruh halaman (`AIChatWidget.tsx`).
   - Ditenagai Google Gemini Generative AI (`@google/generative-ai`) dengan mekanisme *model fallback cascade* (`gemini-3.5-flash-lite`, `gemini-3.5-flash`, dll.).
   - *Strict Guardrails*: Khusus menjawab pertanyaan coding, algoritma, dan teknologi perangkat lunak ramah anak.
   - Mendukung format Markdown dan rumus logika KaTeX (`LaTeXRenderer.tsx`).
9. **Infrastruktur & Penyimpanan Klien**:
   - Seluruh progres belajar dan sertifikat tersimpan aman di browser melalui `localStorage` (`codekids_user_progress_v1`).
   - Aman dari SSR Hydration Mismatch dengan inisialisasi state pasca-*mount*.
   - Transisi halaman mulus menggunakan GSAP dan indikator loading Lottie (`@lottiefiles/dotlottie-react`).

### B. Fitur yang Terimplementasi Sebagian (*Partially Implemented*) ⚠️
1. **Rute Kuis Mandiri (`/learn/[topicId]/quiz`)**:
   - Berfungsi untuk Level 01 (`what-is-coding`). Untuk Level 02 s.d. Level 04, evaluasi kuis dan latihan coding diintegrasikan langsung (*inline*) di dalam halaman membaca materi (`/learn/[topicId]`) untuk memberikan pengalaman yang lebih fokus dan terpadu bagi anak-anak.

### C. Fitur yang Direncanakan (*Planned / Coming Soon*) ⏳
1. **Level 05: "JavaScript Basics" (`/learn/level-5`)**:
   - Konsep variabel dasar, logika kondisi sederhana (`if/else`), dan *event click* tombol interaktif.
   - Status saat ini: Ditampilkan dengan label *Coming Soon* di Learning Hub dan Galeri Sertifikat.
2. **Level 06: "Final Project" (`/learn/level-6`)**:
   - Proyek terpadu membuat website mini pribadi menggabungkan HTML, CSS, dan JavaScript.
   - Status saat ini: Ditampilkan dengan label *Coming Soon* di Learning Hub dan Galeri Sertifikat.

### D. Fitur yang Memerlukan Verifikasi Manual (*Needs Verification*) ❓
- Tidak ada fitur yang berada dalam status *Needs Verification*. Seluruh fungsionalitas di atas telah diverifikasi langsung terhadap kode sumber yang aktif.

---

## 3. Batasan Produk & Prinsip Non-Goals (Out-of-Scope)

Untuk menjaga fokus pada efektivitas edukasi, CodeKids secara tegas **tidak** menerapkan hal-hal berikut:
- **Tanpa Akun Pengguna / Password**: Menghilangkan hambatan pendaftaran; anak-anak dapat langsung belajar tanpa perlu login atau mengingat password.
- **Tanpa Gamifikasi Berlebihan**: Tidak ada sistem koin virtual, ranking agresif (*competitive leaderboard*), avatar toko, atau mekanik adiktif yang mengalihkan perhatian dari esensi pemahaman kode.
- **Tanpa Penguncian Kaku (*No Hard Paywall / Gating*)**: Pengguna bebas menjelajahi topik mana pun secara mandiri tanpa harus menyelesaikan level sebelumnya secara paksa.
- **Tanpa Server Backend Terpusat**: Seluruh kompilasi sandbox dan penyimpanan progres berjalan murni di sisi klien (*client-side execution*).

---

## 4. Arsitektur Halaman & Pengalaman Pengguna Aktual

### 4.1 Learning Hub (`/learn`)
- Menampilkan grid 6 kartu kursus dengan kartu visual yang responsif.
- Setiap kartu menampilkan 3 indikator utama: Level (Tingkat Pemula), Sertifikat (Tersedia), dan Materi (3 Materi untuk Level 1–5, 1 Proyek untuk Level 6).
- Tombol aksi berwarna tematik mengarahkan siswa langsung ke halaman materi masing-masing.

### 4.2 Halaman Pembelajaran Terpadu (`/learn/[topicId]`)
- Menyajikan antarmuka fokus bebas distraksi (Navbar dan Footer utama disembunyikan otomatis untuk memaksimalkan area baca).
- Tombol kembali ke Learning Hub dan badge Level di bagian atas.
- *Progress bar* indikator materi (misal: "Materi 1 dari 3").
- Pembaca materi hanya dapat beralih ke materi berikutnya setelah melakukan *scroll* hingga ke bagian bawah (*reading completion detection*).
- *Sticky Bottom Bar* memudahkan navigasi antar-materi tanpa harus kembali ke atas.

### 4.3 Coding Playground Terintegrasi (Level 3 & 4)
- Menghilangkan pemisahan URL rumit: editor coding disematkan langsung sebagai bagian akhir materi.
- Editor teks bersih dengan pewarnaan sintaksis dan nomor baris.
- Validasi instan dengan pesan bantuan spesifik saat kode belum sesuai instruksi.
- Live Preview interaktif yang menampilkan hasil render sebenarnya dalam iframe yang aman.

### 4.4 Galeri Sertifikat (`/certificate`)
- Menjadi etalase pencapaian siswa untuk seluruh course yang telah diselesaikan.
- Siswa dapat mengklaim sertifikat yang telah dibuka kuncinya dengan memasukkan nama lengkap.
- Mengunduh sertifikat resmi dalam format PDF berstandar cetak atau menyimpan gambar sertifikat.

---

## 5. Standar Non-Fungsional

- **Responsivitas**: Tampilan 100% responsif dari layar smartphone mobile (< 640px), tablet (640px–1024px), hingga desktop layar lebar (> 1024px).
- **Aksesibilitas (a11y)**: Rasio kontras teks tinggi di atas latar belakang lembut, dukungan navigasi keyboard, serta tombol interaktif yang ramah sentuhan (touch target ≥ 44px).
- **Keamanan Sandbox**: Seluruh kode HTML/CSS/JS yang ditulis anak-anak dijalankan dalam iframe terisolasi dengan atribut sandbox yang ketat, mencegah injeksi skrip berbahaya ke DOM aplikasi utama.
- **Performa Tinggi**: Menggunakan Next.js Turbopack, pemisahan kode dinamis (*dynamic imports*), dan pengoptimalan font lokal via `next/font`.
