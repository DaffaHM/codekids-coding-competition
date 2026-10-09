'use client';

import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export interface ChallengeData {
  id: number;
  title: string;
  instruction: string;
  hint: string;
  successMessage: string;
}

interface ChallengeBoxProps {
  challenge: ChallengeData;
  currentChallengeIndex: number;
  totalChallenges: number;
  validationStatus: 'idle' | 'success' | 'error';
  errorMessage?: string;
}

export default function ChallengeBox({
  challenge,
  currentChallengeIndex,
  totalChallenges,
  validationStatus,
  errorMessage = 'Tulis kode sesuai petunjuk lalu jalankan lagi.',
}: ChallengeBoxProps) {
  return (
    <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
      {/* Header Badge & Progress */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>{challenge.title}</span>
        </span>
        <span className="text-xs font-black text-[#718096]">
          Tantangan {currentChallengeIndex + 1} dari {totalChallenges}
        </span>
      </div>

      {/* Instruction */}
      <p className="text-base sm:text-lg font-black text-[#17233C] leading-snug">
        {challenge.instruction}
      </p>

      {/* Hint Area */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-[#17233C] space-y-1.5">
        <div className="flex items-center gap-1.5 font-black text-[#4F7DF3]">
          <HelpCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Petunjuk Penulisan:</span>
        </div>
        <p className="text-slate-600 font-bold">
          Gunakan format penulisan berikut sebagai acuan:
        </p>
        <code className="block font-mono bg-white px-3 py-2 rounded-xl border border-blue-200 text-[#4F7DF3] font-bold text-xs sm:text-sm select-all">
          {challenge.hint}
        </code>
      </div>

      {/* Validation Feedback Messages */}
      {validationStatus === 'error' && (
        <div className="bg-[#FFF5F5] border-2 border-[#FF6B6B] rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-[#17233C] animate-in fade-in shadow-xs">
          <AlertCircle className="w-5 h-5 text-[#FF6B6B] shrink-0 stroke-[2.5] mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-black text-[#E53E3E]">
              Ada yang perlu diperbaiki:
            </p>
            <p className="text-xs sm:text-sm font-bold leading-relaxed text-[#2D3748]">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {validationStatus === 'success' && (
        <div className="bg-[#F0FDF4] border-2 border-[#42C88A] rounded-2xl p-4 flex items-center gap-3 text-[#17233C] animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#42C88A] shrink-0 stroke-[2.5]" />
          <p className="text-xs sm:text-sm font-black text-[#16A34A]">
            {challenge.successMessage}
          </p>
        </div>
      )}
    </div>
  );
}
