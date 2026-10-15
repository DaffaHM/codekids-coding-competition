# CodeKids — AI Agent Working Rules

Aturan ini mengikat seluruh pengembangan otomatis dan berbantuan AI (*AI-assisted development*) pada repositori CodeKids. Setiap asisten AI, agent, atau pengembang yang berkolaborasi dalam proyek ini **WAJIB** mematuhi panduan ini secara mutlak tanpa pengecualian.

---

## 16 Aturan Wajib Pengembangan (*The 16 Mandatory Rules*)

1. **Baca Dokumentasi Proyek Terlebih Dahulu (*Read Docs First*)**: Selalu periksa [`docs/PRD.md`](file:///d:/Coding/codekids/docs/PRD.md), [`docs/DESIGN_SYSTEM.md`](file:///d:/Coding/codekids/docs/DESIGN_SYSTEM.md), [`docs/CURRICULUM.md`](file:///d:/Coding/codekids/docs/CURRICULUM.md), dan [`docs/TECHNICAL_SPEC.md`](file:///d:/Coding/codekids/docs/TECHNICAL_SPEC.md) sebelum melakukan perubahan arsitektur atau visual.
2. **Pertahankan Keputusan Desain yang Ada (*Preserve Design Decisions*)**: Jangan mengubah palet warna resmi (`#4F7DF3`, `#17233C`, `#FFD84D`, `#42C88A`, `#FF6B6B`), font, radius tombol (*pill shape*), atau pola layout tanpa persetujuan eksplisit.
3. **Kebijakan Dependensi Ketat (*No Unnecessary Libraries*)**: Andalkan Web API native, React 19, dan Tailwind CSS v4. Dilarang menginstal editor berat (Monaco, CodeMirror, Ace) atau library animasi berlebih.
4. **Ruang Lingkup Terbatas (*Strictly Bounded Scope*)**: Saat memperbaiki bug atau menambahkan fitur pada komponen/halaman tertentu, batasi perubahan hanya pada file target. Jangan menyentuh halaman atau komponen yang tidak terkait.
5. **Gunakan Kembali Komponen yang Ada (*Reuse Existing Components*)**: Periksa direktori `src/components/` sebelum membuat elemen baru.
6. **Jaga Responsivitas & Kalibrasi Mobile (*Maintain Mobile UX*)**: Antarmuka harus beroperasi sempurna di Mobile, Tablet, dan Desktop. Pada interaksi drag-and-drop (`@dnd-kit`), wajib mempertahankan sensor sentuh terkalibrasi (`delay: 150ms`, `tolerance: 8px`), tombol panah cepat mobile (▲/▼), dan isolasi React Portal (`document.body`) agar tidak terjadi offset bug pada layar ponsel.
7. **Patuhi Standar Aksesibilitas (*Maintain a11y*)**: Pastikan rasio kontras tinggi, cincin fokus keyboard jelas, indikator status ganda (warna + ikon), dan ukuran area sentuh minimal `44px x 44px`.
8. **Hindari Abstraksi Berlebihan (*Avoid Over-Engineering*)**: Tulis kode yang ringkas, mudah dibaca, dan bertipe kuat. Hindari *factory pattern* atau *state manager* rumit jika `useState` dan utilitas penyimpanan sederhana sudah memadai.
9. **Pencatatan Log Prompt Wajib (*Maintain RAW_PROMPT_LOG.md*)**: Setiap prompt development asli dari pengguna wajib dicatat nomor urut, tanggal, teks prompt asli, dan ringkasan hasilnya ke dalam [`prompts/RAW_PROMPT_LOG.md`](file:///d:/Coding/codekids/prompts/RAW_PROMPT_LOG.md). Jangan pernah menghapus, meringkas, atau mengubah entri log historis yang sudah ada.
10. **Uji Fungsionalitas Terdampak (*Test Affected Behaviors*)**: Selalu verifikasi alur interaktif (penilaian kuis, drag-and-drop sortable, eksekusi live sandbox editor, dan alur klaim sertifikat) setelah melakukan modifikasi.
11. **Pemeriksaan Wajib Tipe & Build (*Zero Error Policy*)**: Selalu jalankan `npx tsc --noEmit` untuk memastikan 0 error tipe TypeScript sebelum menandai tugas selesai.
12. **Jangan Hapus Fungsionalitas yang Sudah Berjalan (*Never Break Working Code*)**: Dilarang menghapus atau merusak fitur, kuis, atau halaman yang sudah bekerja tanpa justifikasi dan izin tertulis.
13. **Jaga Keselarasan Konten Ramah Anak (*Age-Appropriate Content*)**: Gunakan bahasa Indonesia yang ramah, santun, jelas, dan mudah dipahami oleh siswa usia 9–12 tahun (Kelas 4–6 SD).
14. **Utamakan Nilai Edukasi daripada Gimik (*Prioritize Learning Value*)**: Fokus pada pemahaman konsep dan umpan balik langsung, bukan animasi berlebihan atau mekanik gamifikasi yang mengaburkan esensi materi.
15. **Perlindungan Data Klien (*Client-Side Privacy & Persistence*)**: Seluruh data progres disimpan secara lokal di browser pengguna (`localStorage`). Pastikan selalu aman dari SSR hydration mismatch dengan pembacaan pasca-*mount*.
16. **Tugas Dokumentasi Hanya untuk Dokumentasi (*Documentation-Only Safeguard*)**: Ketika menerima instruksi audit, rekonsiliasi, atau penulisan dokumentasi, dilarang keras mengubah source code (`.tsx`, `.ts`, `.css`), komponen, atau konfigurasi. **Perbarui dokumentasi agar sesuai dengan implementasi, bukan mengubah implementasi agar sesuai dengan dokumentasi.**

