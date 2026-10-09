import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Level1LessonReader from '@/components/lesson/Level1LessonReader';

interface QuizPageProps {
  params: Promise<{
    topicId: string;
  }>;
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { topicId } = await params;
  if (topicId === 'level-1' || topicId === 'what-is-coding' || topicId === '01') {
    return {
      title: 'Quiz Level 01: Apa Itu Coding? | CodeKids',
      description: 'Uji pemahamanmu tentang dasar-dasar coding.',
    };
  }
  return {
    title: 'Quiz | CodeKids',
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { topicId } = await params;

  if (topicId === 'level-1' || topicId === 'what-is-coding' || topicId === '01') {
    return <Level1LessonReader />;
  }

  notFound();
}
