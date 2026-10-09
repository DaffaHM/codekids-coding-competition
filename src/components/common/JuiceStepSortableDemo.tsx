'use client';

import { useState } from 'react';
import SortableList, { SortableStepItem } from './SortableList';

const ORIGINAL_JUICE_STEPS: SortableStepItem[] = [
  { id: 'step-1', label: 'Siapkan buah', imageSrc: '/level2/siapkanbuah.png' },
  { id: 'step-2', label: 'Potong buah', imageSrc: '/level2/potongbuah.png' },
  { id: 'step-3', label: 'Masukkan buah ke blender', imageSrc: '/level2/masukanbuahkeblender.png' },
  { id: 'step-4', label: 'Blender buah', imageSrc: '/level2/blenderbuah.png' },
  { id: 'step-5', label: 'Tuangkan jus ke gelas', imageSrc: '/level2/tuangkanbuahkegelas.png' },
];

// Helper to reliably shuffle steps for initial random state
function getShuffledSteps(): SortableStepItem[] {
  const steps = [...ORIGINAL_JUICE_STEPS];
  // Pre-determined shuffled order so initial render is guaranteed to be non-sorted
  return [
    steps[3], // Blender buah
    steps[0], // Siapkan buah
    steps[4], // Tuangkan jus ke gelas
    steps[1], // Potong buah
    steps[2], // Masukkan buah ke blender
  ];
}

export default function JuiceStepSortableDemo() {
  const [steps, setSteps] = useState<SortableStepItem[]>(getShuffledSteps);

  return (
    <div className="w-full bg-[#F6F8FC] p-4 sm:p-8 rounded-3xl border border-slate-200/80 my-4">
      <SortableList
        items={steps}
        onItemsChange={setSteps}
        title="Susun langkahnya"
        subtitle="Tarik dan lepas item untuk menyusun urutan yang benar"
      />
    </div>
  );
}
