export interface LessonSectionData {
  id: number;
  title: string;
  content: string;
  subtext?: string;
}

export const LEVEL_3_SECTIONS: LessonSectionData[] = [
  {
    id: 1,
    title: 'Apa Itu HTML?',
    content: 'Mengenal HTML sebagai bahasa dasar pembuat struktur dan kerangka website.',
    subtext: 'Materi 1 dari 4',
  },
  {
    id: 2,
    title: 'Mengenal Tag HTML',
    content: 'Belajar elemen dasar HTML seperti tag judul <h1>, paragraf <p>, dan tombol <button>.',
    subtext: 'Materi 2 dari 4',
  },
  {
    id: 3,
    title: 'HTML Membentuk Struktur',
    content: 'Memahami bagaimana tag HTML disusun bersama untuk membentuk halaman web.',
    subtext: 'Materi 3 dari 4',
  },
  {
    id: 4,
    title: 'Yuk, Buat Halaman Pertamamu!',
    content: 'Praktik menulis kode HTML sendiri dari awal dan melihat hasilnya secara langsung.',
    subtext: 'Coding Practice',
  },
];
