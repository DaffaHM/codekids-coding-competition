export interface LessonSectionData {
  id: number;
  title: string;
  content: string;
  subtext?: string;
}

export const LEVEL_2_SECTIONS: LessonSectionData[] = [
  {
    id: 1,
    title: 'Buat Jus!',
    content: 'Bantu Robo menyusun langkah-langkah membuat jus dari awal sampai selesai dalam urutan yang benar.',
    subtext: 'Yuk, susun langkah-langkahnya!',
  },
  {
    id: 2,
    title: 'Pentingnya Urutan (Sequence)',
    content: 'Mengapa urutan langkah sangat penting dalam algoritma.',
    subtext: 'Materi selanjutnya.',
  },
  {
    id: 3,
    title: 'Menemukan Langkah yang Hilang',
    content: 'Melatih logika menemukan instruksi yang terlewat.',
    subtext: 'Materi selanjutnya.',
  },
];
