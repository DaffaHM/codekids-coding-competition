'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RefreshCw, Sparkles, MoveLeft, MoveRight } from 'lucide-react';

export interface JuiceStep {
  id: number; // 1 to 5 correct position
  label: string;
  shortName: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const ALL_STEPS: JuiceStep[] = [
  {
    id: 1,
    label: 'Siapkan buah',
    shortName: 'BUAH',
    color: '#FF5252',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  {
    id: 2,
    label: 'Potong buah',
    shortName: 'POTONG',
    color: '#FFC107',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    id: 3,
    label: 'Masukkan ke blender',
    shortName: 'MASUKKAN',
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 4,
    label: 'Blender buah',
    shortName: 'BLENDER',
    color: '#8B5CF6',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    id: 5,
    label: 'Tuangkan ke gelas',
    shortName: 'JUS',
    color: '#10B981',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
];

interface JuiceSequenceActivityProps {
  onStartQuiz: () => void;
}

export default function JuiceSequenceActivity({ onStartQuiz }: JuiceSequenceActivityProps) {
  // Preset a clean initial shuffled state: [3, 1, 5, 2, 4]
  const [items, setItems] = useState<JuiceStep[]>(() => [
    ALL_STEPS[2], // Masukkan
    ALL_STEPS[0], // Siapkan
    ALL_STEPS[4], // Tuangkan
    ALL_STEPS[1], // Potong
    ALL_STEPS[3], // Blender
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  // Move item left/right in array
  const moveItem = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
    setStatus('idle');
  };

  // Tap-to-select and swap
  const handleItemClick = (index: number) => {
    if (status === 'success') return;

    if (selectedId === null) {
      setSelectedId(items[index].id);
    } else if (selectedId === items[index].id) {
      setSelectedId(null);
    } else {
      const prevIndex = items.findIndex((it) => it.id === selectedId);
      if (prevIndex !== -1) {
        const newItems = [...items];
        const temp = newItems[prevIndex];
        newItems[prevIndex] = newItems[index];
        newItems[index] = temp;
        setItems(newItems);
      }
      setSelectedId(null);
      setStatus('idle');
    }
  };

  // HTML5 Drag & Drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (status === 'success') return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    setItems(newItems);
    setDraggedIndex(null);
    setStatus('idle');
  };

  // Check user sequence
  const handleCheckSequence = () => {
    const isCorrect = items.every((item, idx) => item.id === idx + 1);
    if (isCorrect) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  // Reset to initial shuffle
  const handleReset = () => {
    setItems([ALL_STEPS[2], ALL_STEPS[0], ALL_STEPS[4], ALL_STEPS[1], ALL_STEPS[3]]);
    setSelectedId(null);
    setStatus('idle');
  };

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      {/* Section Progress Header */}
      <div>
        <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#718096] mb-2">
          <span>Materi 3 dari 3</span>
          <span className="text-[#4F7DF3]">100% Selesai</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
          <div className="h-full bg-[#4F7DF3] transition-all duration-300 rounded-full w-full" />
        </div>
      </div>

      {/* Main Header Title */}
      <div>
        <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          LEVEL 01 • MATERI 3
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] mt-3 leading-tight tracking-tight">
          Coding Harus <span className="text-[#4F7DF3]">Berurutan</span>
        </h1>
      </div>

      {/* Interactive Concept Activity Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#17233C]">
          Susun langkahnya! 🍹
        </h2>
        <p className="text-sm sm:text-base text-[#718096] font-semibold">
          Urutkan 5 langkah membuat jus apel di bawah ini dari awal sampai jadi!
        </p>
      </div>

      {/* Interactive Re-order Area */}
      <div className="space-y-6">
        {/* Step Cards Grid / Sequence Container */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-3.5">
          {items.map((step, idx) => {
            const isSelected = selectedId === step.id;
            const isWrongPos = status === 'error' && step.id !== idx + 1;
            const isCorrectPos = status === 'success';

            return (
              <div
                key={step.id}
                draggable={status !== 'success'}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onClick={() => handleItemClick(idx)}
                className={`relative rounded-2xl p-4 transition-all duration-200 cursor-pointer select-none flex flex-col items-center justify-between min-h-[190px] border-2 shadow-xs ${
                  isCorrectPos
                    ? 'bg-[#F0FDF4] border-[#42C88A] shadow-sm'
                    : isWrongPos
                    ? 'bg-[#FFF5F5] border-[#FF6B6B] animate-shake'
                    : isSelected
                    ? 'bg-blue-50 border-[#4F7DF3] ring-4 ring-[#4F7DF3]/20 shadow-md scale-102'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-blue-300'
                }`}
              >
                {/* Position Badge Number */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span
                    className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shadow-2xs ${
                      isCorrectPos
                        ? 'bg-[#42C88A] text-white'
                        : isWrongPos
                        ? 'bg-[#FF6B6B] text-white'
                        : 'bg-[#17233C] text-white'
                    }`}
                  >
                    {idx + 1}
                  </span>

                  {/* Move Arrows (Mobile & Desktop Accessibility) */}
                  {status !== 'success' && (
                    <div className="flex items-center gap-1 opacity-70 hover:opacity-100">
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveItem(idx, 'left');
                          }}
                          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-[#4F7DF3] flex items-center justify-center transition-colors"
                          title="Geser Kiri"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      )}
                      {idx < items.length - 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveItem(idx, 'right');
                          }}
                          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-[#4F7DF3] flex items-center justify-center transition-colors"
                          title="Geser Kanan"
                        >
                          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Custom Step Vector Graphic Illustration */}
                <div className="my-2 flex items-center justify-center h-20 w-full">
                  {step.id === 1 && (
                    /* Step 1: Siapkan Buah (Whole Apple) */
                    <div className="relative flex items-center justify-center">
                      <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
                        {/* Apple leaf & stem */}
                        <path d="M52 25 Q58 10 70 12 Q65 24 52 25 Z" fill="#42C88A" />
                        <path d="M48 28 Q50 15 54 10" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
                        {/* Apple body */}
                        <path d="M50 30 C30 25 15 42 20 68 C25 90 45 95 50 88 C55 95 75 90 80 68 C85 42 70 25 50 30 Z" fill="#FF5252" />
                        {/* Apple shine */}
                        <path d="M30 38 Q24 48 26 60" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.6" />
                      </svg>
                    </div>
                  )}

                  {step.id === 2 && (
                    /* Step 2: Potong Buah (Cut Apple + Knife) */
                    <div className="relative flex items-center justify-center">
                      <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
                        {/* Cutting board */}
                        <rect x="10" y="65" width="80" height="15" rx="4" fill="#D97706" fillOpacity="0.8" />
                        {/* Sliced apple half left */}
                        <path d="M22 62 C15 45 30 35 40 40 C43 55 35 65 22 62 Z" fill="#FF5252" />
                        {/* Sliced apple half right */}
                        <path d="M78 62 C85 45 70 35 60 40 C57 55 65 65 78 62 Z" fill="#FF5252" />
                        {/* Knife */}
                        <path d="M30 22 L70 42 L65 48 L25 28 Z" fill="#94A3B8" />
                        <path d="M15 15 L32 24 L27 30 L10 21 Z" fill="#17233C" />
                      </svg>
                    </div>
                  )}

                  {step.id === 3 && (
                    /* Step 3: Masukkan ke Blender (Apple into Blender) */
                    <div className="relative flex items-center justify-center">
                      <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
                        {/* Blender Jug outline */}
                        <path d="M30 35 L35 80 H65 L70 35 H30 Z" fill="#E2E8F0" fillOpacity="0.5" stroke="#475569" strokeWidth="3" />
                        {/* Blender lid */}
                        <rect x="26" y="28" width="48" height="8" rx="2" fill="#17233C" />
                        {/* Dropping apple slice */}
                        <path d="M45 15 C40 8 55 5 55 15 C55 22 45 22 45 15 Z" fill="#FF5252" />
                        {/* Arrow down */}
                        <path d="M50 18 V28 M45 25 L50 30 L55 25" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  {step.id === 4 && (
                    /* Step 4: Blender Buah (Blender Whirling) */
                    <div className="relative flex items-center justify-center">
                      <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
                        {/* Blender Jug */}
                        <path d="M30 30 L35 70 H65 L70 30 H30 Z" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="3" />
                        {/* Liquid whirling inside */}
                        <ellipse cx="50" cy="55" rx="14" ry="8" fill="#FF5252" />
                        {/* Power spin lines */}
                        <path d="M42 45 Q50 40 58 45 M40 58 Q50 63 60 58" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
                        {/* Blender Base */}
                        <rect x="32" y="70" width="36" height="20" rx="4" fill="#17233C" />
                        <circle cx="50" cy="80" r="4" fill="#FFD84D" />
                      </svg>
                    </div>
                  )}

                  {step.id === 5 && (
                    /* Step 5: Tuangkan ke Gelas (Glass of Fresh Juice) */
                    <div className="relative flex items-center justify-center">
                      <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
                        {/* Glass */}
                        <path d="M32 25 L38 82 H62 L68 25 H32 Z" fill="#E2E8F0" fillOpacity="0.4" stroke="#64748B" strokeWidth="3" />
                        {/* Red Apple Juice liquid */}
                        <path d="M34 38 L38 80 H62 L66 38 Z" fill="#FF5252" />
                        {/* Straw */}
                        <path d="M42 90 L58 10 H64" stroke="#FFD84D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Sparkles */}
                        <circle cx="45" cy="50" r="2" fill="white" />
                        <circle cx="54" cy="62" r="2.5" fill="white" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Short Step Label */}
                <div className="text-center w-full pt-1">
                  <span className="block text-xs font-black text-[#17233C] leading-snug">
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls & Feedback Area */}
        <div className="pt-4 flex flex-col items-center justify-center space-y-4">
          {status === 'idle' && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleCheckSequence}
                className="px-8 py-3.5 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-base transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Periksa Urutan</span>
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#17233C] font-extrabold text-sm transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Acak Ulang</span>
              </button>
            </div>
          )}

          {/* Incorrect Sequence Feedback State */}
          {status === 'error' && (
            <div className="w-full bg-[#FFF5F5] border-2 border-[#FF6B6B] rounded-2xl p-4 text-center animate-in fade-in space-y-3">
              <div className="flex items-center justify-center gap-2 text-[#FF6B6B]">
                <XCircle className="w-6 h-6 stroke-[3]" />
                <span className="text-lg font-black">Urutannya belum tepat.</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#17233C]">
                Coba geser atau tekan item yang belum pas untuk memperbaiki urutannya!
              </p>
              <button
                type="button"
                onClick={handleCheckSequence}
                className="px-6 py-2.5 rounded-full bg-[#FF6B6B] hover:bg-red-600 text-white font-black text-sm transition-all shadow-xs active:scale-95 inline-flex items-center gap-2"
              >
                <span>Coba Periksa Lagi</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Correct Sequence Success State & Algorithm Concept Transformation */}
          {status === 'success' && (
            <div className="w-full bg-[#F0FDF4] border-2 border-[#42C88A] rounded-3xl p-6 text-center animate-in fade-in space-y-6 shadow-xs">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-full bg-[#42C88A] text-white flex items-center justify-center text-3xl shadow-md">
                  ✓
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#17233C]">
                  Hebat!
                </h3>
                <p className="text-sm sm:text-base font-bold text-[#16A34A]">
                  Kamu berhasil menyusun langkah membuat jus dengan urutan yang benar!
                </p>
              </div>

              {/* Visual Transformation Flow Animation: BUAH -> POTONG -> MASUKKAN -> BLENDER -> JUS */}
              <div className="bg-white/90 border border-green-200/80 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-blue-50 border border-blue-200 text-[#4F7DF3] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                    ALGORITMA
                  </span>
                </div>

                {/* Flow Diagram (Horizontal on Desktop, Vertical on Mobile) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-black text-[#17233C]">
                  <div className="bg-[#FF5252] text-white px-3 py-1.5 rounded-xl shadow-2xs">
                    🍎 BUAH
                  </div>
                  <span className="text-[#42C88A] font-extrabold sm:rotate-0 rotate-90">➔</span>
                  <div className="bg-[#FFC107] text-[#17233C] px-3 py-1.5 rounded-xl shadow-2xs">
                    🔪 POTONG
                  </div>
                  <span className="text-[#42C88A] font-extrabold sm:rotate-0 rotate-90">➔</span>
                  <div className="bg-[#3B82F6] text-white px-3 py-1.5 rounded-xl shadow-2xs">
                    📥 MASUKKAN
                  </div>
                  <span className="text-[#42C88A] font-extrabold sm:rotate-0 rotate-90">➔</span>
                  <div className="bg-[#8B5CF6] text-white px-3 py-1.5 rounded-xl shadow-2xs">
                    ⚙️ BLENDER
                  </div>
                  <span className="text-[#42C88A] font-extrabold sm:rotate-0 rotate-90">➔</span>
                  <div className="bg-[#10B981] text-white px-3 py-1.5 rounded-xl shadow-2xs">
                    🥤 JUS
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#718096] font-extrabold">
                  Langkah + Urutan Yang Tepat = Proses Yang Benar
                </p>
              </div>

              {/* Direct CTA to Level 1 Quiz */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onStartQuiz}
                  className="px-8 sm:px-10 py-4 rounded-full bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] font-black text-lg transition-all shadow-md hover:shadow-lg transform active:scale-95 inline-flex items-center gap-2 border-2 border-amber-300/60"
                >
                  <span>Mulai Quiz</span>
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
