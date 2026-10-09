export interface LessonSectionData {
  id: number;
  title: string;
  content: string;
  subtext?: string;
  type: 'concept_flow' | 'instruction_comparison' | 'real_world_grid' | 'sequence_recipe' | 'web_trio';
}

export interface QuizQuestionData {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  correctIndex: number;
  explanation: {
    correct: string;
    incorrect: string;
  };
}

export const LEVEL_1_SECTIONS: LessonSectionData[] = [
  {
    id: 1,
    title: 'Apa Itu Coding?',
    content: 'Coding adalah cara kita memberikan instruksi kepada komputer agar komputer melakukan sesuatu.',
    subtext: 'Saat kamu bermain game, membuka website, atau menggunakan aplikasi, ada coding yang membuat semuanya dapat bekerja.',
    type: 'concept_flow',
  },
  {
    id: 2,
    title: 'Komputer Membutuhkan Instruksi',
    content: 'Komputer tidak dapat mengetahui keinginan kita dengan sendirinya.',
    subtext: 'Komputer membutuhkan instruksi yang jelas agar dapat melakukan apa yang kita inginkan.',
    type: 'instruction_comparison',
  },
  {
    id: 3,
    title: 'Coding Harus Berurutan',
    content: 'Dalam coding, instruksi harus dilakukan dalam urutan yang tepat.',
    subtext: 'Susun langkah-langkah membuat jus di bawah ini dengan urutan yang benar!',
    type: 'sequence_recipe',
  },
];

export const LEVEL_1_QUIZ: QuizQuestionData[] = [
  {
    id: 1,
    question: 'Apa yang dimaksud dengan coding?',
    options: [
      { key: 'A', text: 'Cara menggambar di komputer' },
      { key: 'B', text: 'Cara memberikan instruksi kepada komputer' },
      { key: 'C', text: 'Cara bermain game' },
      { key: 'D', text: 'Cara menggunakan internet' },
    ],
    correctKey: 'B',
    correctIndex: 1,
    explanation: {
      correct: 'Benar! Coding digunakan untuk memberikan instruksi kepada komputer.',
      incorrect: 'Belum tepat. Ingat, coding digunakan untuk memberikan instruksi kepada komputer.',
    },
  },
  {
    id: 2,
    question: 'Mengapa komputer membutuhkan instruksi?',
    options: [
      { key: 'A', text: 'Karena komputer tidak bisa mengetahui keinginan kita dengan sendirinya' },
      { key: 'B', text: 'Karena komputer hanya digunakan untuk bermain game' },
      { key: 'C', text: 'Karena komputer tidak memiliki layar' },
      { key: 'D', text: 'Karena komputer harus selalu terhubung ke internet' },
    ],
    correctKey: 'A',
    correctIndex: 0,
    explanation: {
      correct: 'Benar! Komputer tidak bisa menebak pikiran kita tanpa instruksi yang jelas.',
      incorrect: 'Belum tepat. Komputer butuh instruksi karena tidak tahu keinginan kita dengan sendirinya.',
    },
  },
  {
    id: 3,
    question: 'Manakah yang dapat dibuat menggunakan coding?',
    options: [
      { key: 'A', text: 'Game' },
      { key: 'B', text: 'Website' },
      { key: 'C', text: 'Aplikasi' },
      { key: 'D', text: 'Semua benar' },
    ],
    correctKey: 'D',
    correctIndex: 3,
    explanation: {
      correct: 'Benar! Game, website, dan aplikasi semuanya dibuat menggunakan kode program.',
      incorrect: 'Belum tepat. Semua jawaban (Game, Website, dan Aplikasi) dibuat menggunakan coding.',
    },
  },
  {
    id: 4,
    question: 'Misalnya kamu ingin membuat jus. Langkah pertama yang paling tepat adalah...',
    options: [
      { key: 'A', text: 'Menuangkan jus ke gelas' },
      { key: 'B', text: 'Meminum jus' },
      { key: 'C', text: 'Menyiapkan buah' },
      { key: 'D', text: 'Membersihkan gelas' },
    ],
    correctKey: 'C',
    correctIndex: 2,
    explanation: {
      correct: 'Benar! Langkah pertama yang logis dan urut adalah menyiapkan buahnya terlebih dahulu.',
      incorrect: 'Belum tepat. Sebelum mengolah atau meminumnya, kita harus menyiapkan buah terlebih dahulu.',
    },
  },
  {
    id: 5,
    question: 'Bahasa yang digunakan untuk mengatur tampilan sebuah website adalah...',
    options: [
      { key: 'A', text: 'CSS' },
      { key: 'B', text: 'HTML' },
      { key: 'C', text: 'JavaScript' },
      { key: 'D', text: 'Python' },
    ],
    correctKey: 'A',
    correctIndex: 0,
    explanation: {
      correct: 'Benar! CSS bertugas mengatur tampilan, warna, dan gaya visual website.',
      incorrect: 'Belum tepat. Bahasa yang bertugas mengatur warna & tampilan website adalah CSS.',
    },
  },
];
