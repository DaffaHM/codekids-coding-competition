import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Level1LessonReader from '@/components/lesson/Level1LessonReader';
import Level2LessonReader from '@/components/lesson/Level2LessonReader';
import Level3LessonReader from '@/components/lesson/Level3LessonReader';
import Level4LessonReader from '@/components/lesson/Level4LessonReader';

interface TopicPageProps {
  params: Promise<{
    topicId: string;
  }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topicId } = await params;
  if (topicId === 'level-1' || topicId === 'what-is-coding' || topicId === '01') {
    return {
      title: 'Level 01: Apa Itu Coding? | CodeKids',
      description: 'Kenali coding dan bagaimana komputer mengikuti instruksi bersama CodeKids.',
    };
  }
  if (topicId === 'level-2' || topicId === 'algorithm' || topicId === '02') {
    return {
      title: 'Level 02: Algorithm (Buat Jus!) | CodeKids',
      description: 'Pelajari konsep algoritma dan pentingnya urutan langkah bersama CodeKids.',
    };
  }
  if (topicId === 'level-3' || topicId === 'html' || topicId === '03') {
    return {
      title: 'Level 03: Dasar HTML | CodeKids',
      description: 'Pelajari dasar HTML dan buat halaman web pertamamu bersama CodeKids.',
    };
  }
  if (topicId === 'level-4' || topicId === 'css' || topicId === '04') {
    return {
      title: 'Level 04: Dasar CSS | CodeKids',
      description: 'Ubah warna, ukuran teks, dan gaya halaman web pertamamu dengan CSS bersama CodeKids.',
    };
  }
  return {
    title: 'Materi Pembelajaran | CodeKids',
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topicId } = await params;

  // Level 1 topic routing
  if (topicId === 'level-1' || topicId === 'what-is-coding' || topicId === '01') {
    return <Level1LessonReader />;
  }

  // Level 2 topic routing
  if (topicId === 'level-2' || topicId === 'algorithm' || topicId === '02') {
    return <Level2LessonReader />;
  }

  // Level 3 topic routing
  if (topicId === 'level-3' || topicId === 'html' || topicId === '03') {
    return <Level3LessonReader />;
  }

  // Level 4 topic routing
  if (topicId === 'level-4' || topicId === 'css' || topicId === '04') {
    return <Level4LessonReader />;
  }

  // Fallback for level-5, level-6, or other topics
  return <Level4LessonReader />;
}
