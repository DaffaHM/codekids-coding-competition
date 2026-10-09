import type { Metadata } from 'next';
import LearnHeader from '@/components/learn/LearnHeader';
import CourseGrid from '@/components/learn/CourseGrid';

export const metadata: Metadata = {
  title: 'Mulai Belajar Coding | CodeKids',
  description: 'Pilih materi dan mulai petualangan coding-mu dari dasar bersama CodeKids.',
};

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#F6F8FC] pb-16">
      {/* Learn Header Banner Section */}
      <LearnHeader />

      {/* Course Cards Section */}
      <CourseGrid />
    </main>
  );
}
