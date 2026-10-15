# CodeKids — Design System Specification

## 1. Filosofi Desain & Identitas Visual

CodeKids memadukan **teknologi modern (70%)** dengan **nuansa ceria & bersahabat bagi anak (30%)**. Target audiens adalah siswa Sekolah Dasar (SD) kelas 4–6 (usia 9–12 tahun). Desain mengedepankan keterbacaan tinggi (*high legibility*), tata letak bersih, transisi mulus, dan aksen warna harmonis.

### Prinsip Utama Desain:
1. **Visual Bertujuan (*Purposeful Visuals*)**: Diagram dan ilustrasi 3D dihadirkan untuk memperjelas konsep abstrak (seperti cara kerja instruksi komputer atau analogi langkah membuat jus), bukan sekadar hiasan berlebihan.
2. **Maskot "Robo" yang Hangat**: Maskot Robo hadir sebagai rekan belajar di logo, halaman sambutan, kuis selesai, dan sertifikat, menciptakan rasa bangga dan pencapaian bagi anak.
3. **Bebas Kontainer Berlebih (*Direct Clean Reading Layout*)**: Halaman materi menggunakan tata letak langsung (*card-free direct layout*) di atas latar belakang `#F6F8FC` dengan tipografi besar dan gambar proporsional, menghindari bingkai kartu bertumpuk-tumpuk yang membatasi ruang baca.
4. **Bebas Gamifikasi Semu (*Anti-Pattern Guard*)**: Tidak menggunakan palet warna neon berlebihan, efek suara bising, koin/diamond, atau animasi melayang yang mengalihkan fokus belajar.

---

## 2. Palet Warna & Token Visual

Sistem warna diimplementasikan menggunakan Tailwind CSS v4 dan variabel kustom CSS:

### Palet Warna Utama (Core Palette):

| Nama Warna | Kode Hex | Peruntukan / Penggunaan |
| :--- | :--- | :--- |
| **Primary Blue** | `#4F7DF3` | Warna brand utama, tombol primer, link aktif, border fokus, aksen teks |
| **Dark Navy** | `#17233C` | Teks judul utama, teks heading tebal, kontras tinggi yang ramah mata |
| **Accent Yellow** | `#FFD84D` | Tombol CTA aksi utama (*Mulai Belajar*, *Mulai Kuis*), badge Level, bintang selebrasi |
| **App Background** | `#F6F8FC` | Latar belakang halaman utama yang lembut dan sejuk |
| **Pure White** | `#FFFFFF` | Latar belakang kartu, bar navigasi melayang (*sticky header/footer*), editor input |
| **Success Green** | `#42C88A` / `#16A34A` | Jawaban kuis benar, status tantangan coding selesai, badge kelulusan |
| **Error Red** | `#FF6B6B` / `#FF5252` | Umpan balik kuis salah, kotak pesan error sintaksis / petunjuk perbaikan |

### Palet Warna Tematik per Level (Course Theme Palette):

Setiap level memiliki identitas warna pastel lembut yang khas pada tombol dan badge di Learning Hub:

- **Level 01 (Coding Basics)**: Biru Royal — Background `#EBF3FF`, Border `#BFDBFE`, Teks `#2563EB`.
- **Level 02 (Algorithm)**: Kuning Emas/Amber — Background `#FFFBEB`, Border `#FDE68A`, Teks `#D97706`.
- **Level 03 (HTML)**: Mawar Merah/Rose — Background `#FFF1F2`, Border `#FECDD3`, Teks `#E11D48`.
- **Level 04 (CSS)**: Hijau Zamrud/Emerald — Background `#F0FDF4`, Border `#BBF7D0`, Teks `#16A34A`.
- **Level 05 (JavaScript)**: Ungu / Slate *(Coming Soon)* — Background `#FAF5FF`, Border `#E9D5FF`, Teks `#9333EA` (atau `#F1F5F9` saat locked).
- **Level 06 (Final Project)**: Biru Langit / Slate *(Coming Soon)* — Background `#F0F9FF`, Border `#BAE6FD`, Teks `#0284C7`.

---

## 3. Sistem Tipografi

Dikelola melalui `next/font/google` pada [`src/app/layout.tsx`](file:///d:/Coding/codekids/src/app/layout.tsx):

- **Font Judul & Display (`--font-fredoka`)**: `Fredoka` (Weights: 400, 600, 700). Memberikan karakter bersahabat, tegas, dan modern pada judul materi dan badge.
- **Font Konten & Antarmuka (`--font-nunito`, `--font-sans`)**: `Nunito` & `Geist`. Keterbacaan optimal untuk anak-anak dengan x-height proporsional.
- **Font Kode & Editor (`--font-jetbrains`)**: `JetBrains Mono` (Weights: 400, 600). Pemisahan karakter jelas antara angka nol `0` dan huruf `O`, serta `1` dan `l`.

### Skala Tipografi:
- **Hero Display**: `2.5rem` – `3.5rem` (40px – 56px) / Weight 900 / Line Height 1.15
- **Page Title (H1)**: `2rem` – `2.75rem` (32px – 44px) / Weight 900 / Line Height 1.2
- **Section Heading (H2)**: `1.5rem` – `1.875rem` (24px – 30px) / Weight 800
- **Card Subtitle (H3)**: `1.125rem` – `1.25rem` (18px – 20px) / Weight 700
- **Body Regular**: `1rem` (16px) / Weight 600 / Line Height 1.6
- **Code Editor / Console**: `0.875rem` – `0.95rem` (14px – 15px) / Monospace / Line Height 1.5

---

## 4. Komponen UI & Pola Interaksi

### Tombol (Buttons):
- **CTA Utama (*Pill Button*)**: `rounded-full`, padding `px-6 py-3`, teks `font-extrabold`. Warna kuning `#FFD84D` dengan efek `active:scale-95` dan bayangan lembut.
- **Tombol Navigasi Bawah (*Sticky Bottom Navigation*)**: Bar mengambang dengan latar belakang `bg-white/95 backdrop-blur-md` di bagian bawah layar materi, menjamin navigasi maju/mundur selalu dalam jangkauan jari tanpa menutupi konten (dilindungi oleh `pb-28 sm:pb-32` pada kontainer halaman).
- **Tombol Sortable Panah Cepat (▲/▼)**: Tombol pembantu di setiap kartu drag-and-drop mobile untuk memudahkan anak mengatur urutan langkah tanpa harus menahan geseran panjang.

### Kartu & Kontainer:
- **Course Card (Learning Hub)**: Sudut melengkung `rounded-3xl`, bayangan halus `shadow-sm hover:shadow-xl hover:-translate-y-1`, gambar kartu rasio tajam, dan pemisah kolom vertikal tipis (`border-r border-blue-100/80`).
- **Callout Kotak Pintar (*Ingat! / Tips*)**: Latar belakang kuning terang `#FFFBEB` dengan border tebal `#FFD84D/70`, sudut melengkung `rounded-3xl`, dan ikon lampu 💡.

---

## 5. Responsivitas & Pola Khusus Mobile

1. **Optimasi Drag & Drop Mobile (`@dnd-kit`)**:
   - `TouchSensor` terkalibrasi khusus: `delay: 150ms` dan `tolerance: 8px` agar pengguna dapat melakukan *scroll* halaman dengan normal tanpa memicu geseran kartu secara tidak sengaja.
   - Pemanfaatan `createPortal(..., document.body)` untuk `<DragOverlay>`, membebaskan elemen kartu yang diangkat dari batasan CSS `transform` kontainer induk sehingga posisi kartu selalu presisi 1:1 di bawah jari pengguna.
2. **Navigasi Mobile Navbar**:
   - Menu dropdown mobile dengan animasi *spring entrance* GSAP (`back.out(1.4)`) dan backdrop blur semi-transparan `bg-slate-900/40`.
3. **Editor Coding di Mobile**:
   - Editor kode (`CodeEditor.tsx`) dan Live Preview (`LivePreview.tsx`) disusun bertumpuk secara vertikal yang rapi di layar smartphone dengan tombol aksi *Jalankan Kode* yang jelas.

---

## 6. Standar Aksesibilitas (a11y)

- **Touch Targets**: Seluruh tombol interaktif, link navigasi, dan kartu opsi memiliki area sentuh minimal `44px x 44px`.
- **Indikator Status Ganda**: Seluruh umpan balik (kuis atau validasi coding) memadukan teks pesan, warna, dan ikon (misal: ✓ / ✕ / ⚠️), sehingga tidak hanya bergantung pada persepsi warna.
- **Fokus Keyboard**: Mendukung navigasi tombol Tab dengan *ring focus* yang jelas.
