export interface LessonSectionData {
  id: number;
  title: string;
  content: string;
  subtext?: string;
}

export const LEVEL_4_SECTIONS: LessonSectionData[] = [
  {
    id: 1,
    title: 'Apa Itu CSS?',
    content: 'HTML membuat struktur. CSS mengatur tampilannya.',
    subtext: 'Materi 1 dari 3',
  },
  {
    id: 2,
    title: 'Mengenal Property dan Value',
    content: 'Bagaimana CSS mengatur tampilan menggunakan property dan value.',
    subtext: 'Materi 2 dari 3',
  },
  {
    id: 3,
    title: 'Membuat Halaman Lebih Menarik',
    content: 'Menghubungkan HTML sebagai struktur dan CSS sebagai tampilan.',
    subtext: 'Materi 3 dari 3',
  },
  {
    id: 4,
    title: 'Yuk, Percantik Halamanmu!',
    content: 'Praktik menulis CSS sendiri untuk mengubah warna, ukuran, dan gaya halaman.',
    subtext: 'Coding Practice',
  },
];
