'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Trophy, X, Lightbulb } from 'lucide-react';
import { ChallengeData } from './ChallengeBox';

interface ChallengeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStepNumber: number;
  totalSteps: number;
  currentChallengeTitle: string;
  successMessage: string;
  nextChallenge?: ChallengeData;
  onProceed: () => void;
}

export default function ChallengeSuccessModal({
  isOpen,
  onClose,
  currentStepNumber,
  totalSteps,
  currentChallengeTitle,
  successMessage,
  nextChallenge,
  onProceed,
}: ChallengeSuccessModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isFinalChallenge = !nextChallenge || currentStepNumber >= totalSteps;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17233C]/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 max-w-md w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup popup"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-b from-emerald-50 via-teal-50/40 to-white px-6 pt-7 pb-4 border-b border-emerald-100/60">
          {/* Animated Celebration Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#42C88A] to-emerald-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-200/80 mb-3 text-3xl sm:text-4xl">
            {isFinalChallenge ? '🏆' : '🎉'}
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#16A34A] border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>
              {isFinalChallenge
                ? 'Semua Tantangan Selesai!'
                : `Tantangan ${currentStepNumber} dari ${totalSteps} Selesai!`}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-[#17233C] mt-2">
            {isFinalChallenge ? 'Luar Biasa, Kamu Juara! 🌟' : 'Hore, Berhasil! 🎉'}
          </h3>

          {/* Current Success Message */}
          <div className="bg-[#F0FDF4] border border-[#42C88A]/40 rounded-2xl p-3 sm:p-3.5 mt-3 text-left flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#42C88A] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                {currentChallengeTitle}
              </p>
              <p className="text-xs sm:text-sm font-bold text-emerald-700 leading-snug">
                {successMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body: Next Challenge Info or Final Congratulations */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {!isFinalChallenge && nextChallenge ? (
            <div className="bg-blue-50/60 border-2 border-dashed border-[#4F7DF3]/40 rounded-2xl p-4 sm:p-4.5 text-left space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-blue-200 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#4F7DF3] animate-pulse" />
                  Perintah Selanjutnya
                </span>
                <span className="text-xs font-black text-[#718096]">
                  Tantangan {currentStepNumber + 1} dari {totalSteps}
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-[#17233C]">
                  {nextChallenge.title}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-[#4A5568] mt-1 leading-relaxed">
                  {nextChallenge.instruction}
                </p>
              </div>

              {nextChallenge.hint && (
                <div className="bg-white border border-blue-200/80 rounded-xl p-2.5 text-xs space-y-1">
                  <div className="flex items-center gap-1 font-bold text-[#4F7DF3] text-[11px] uppercase tracking-wider">
                    <Lightbulb className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Petunjuk Penulisan:</span>
                  </div>
                  <code className="block font-mono text-[#17233C] font-bold bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-200 text-xs whitespace-pre-wrap select-all">
                    {nextChallenge.hint}
                  </code>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  🎓 KELULUSAN LEVEL
                </span>
              </div>
              <h4 className="text-base font-black text-[#17233C]">
                Kamu Siap Mengklaim Sertifikat!
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                Seluruh tantangan telah berhasil kamu selesaikan dengan sempurna. Ambil sertifikatmu sekarang sebagai bukti prestasimu!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={onProceed}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-base shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {!isFinalChallenge
                  ? `Lanjut ke Tantangan ${currentStepNumber + 1}`
                  : 'Klaim Sertifikat Sekarang'}
              </span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 text-xs font-bold text-[#718096] hover:text-[#17233C] transition-colors cursor-pointer"
            >
              Lihat Hasil Kode Terlebih Dahulu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
