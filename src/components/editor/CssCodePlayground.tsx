'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CodeEditor from './CodeEditor';
import LivePreview from './LivePreview';
import ChallengeBox, { ChallengeData } from './ChallengeBox';
import ChallengeSuccessModal from './ChallengeSuccessModal';
import { Play, ArrowRight, Code2 } from 'lucide-react';

import CourseCertificateClaim from '@/components/certificate/CourseCertificateClaim';
import { getCertificateProgress } from '@/lib/storage';

export const LEVEL_4_STARTER_HTML = `<h1>Website Pertamaku</h1>
<p>Aku sedang belajar coding.</p>
<button>Klik Aku</button>`;

export const LEVEL_4_CHALLENGES: ChallengeData[] = [
  {
    id: 1,
    title: 'Challenge 1 — Warnai Judulmu',
    instruction: 'Buat judulmu menjadi berwarna biru.',
    hint: 'h1 {\n  color: blue;\n}',
    successMessage: 'Hebat! Judulmu sekarang sudah berwarna.',
  },
  {
    id: 2,
    title: 'Challenge 2 — Besarkan Judul',
    instruction: 'Buat judulmu menjadi lebih besar.',
    hint: 'h1 {\n  font-size: 40px;\n}',
    successMessage: 'Bagus! Sekarang judulmu terlihat lebih besar.',
  },
  {
    id: 3,
    title: 'Challenge 3 — Percantik Tombol',
    instruction: 'Ubah warna tombol dan warna tulisannya.',
    hint: 'button {\n  background-color: blue;\n  color: white;\n}',
    successMessage: 'Luar biasa! Kamu berhasil mempercantik halaman pertamamu dengan CSS!',
  },
];

interface CssCodePlaygroundProps {
  onComplete: () => void;
  onReset?: () => void;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const validateCssChallengeDetailed = (css: string, step: number): ValidationResult => {
  const trimmed = css.trim();

  // 1. Check if empty
  if (!trimmed) {
    return {
      isValid: false,
      errorMessage: 'Kotak editor masih kosong! Ketik kode CSS di kotak editor lalu tekan Terapkan CSS.',
    };
  }

  // 2. Basic CSS structure check (curly braces)
  const hasBraces = /\{[\s\S]*?\}/.test(trimmed);
  if (!hasBraces) {
    return {
      isValid: false,
      errorMessage: 'Format CSS belum tepat. Tentukan elemen yang ingin dihias lalu bungkus ketentuannya dengan kurung kurawal { }. Contoh: h1 { color: blue; }',
    };
  }

  // Step 0: Challenge 1 (h1 color)
  if (step === 0) {
    const hasH1 = /h1/i.test(trimmed);
    const hasColor = /color\s*:\s*[^;}]+/i.test(trimmed);

    if (!hasH1) {
      return {
        isValid: false,
        errorMessage: 'Target elemen h1 belum ditemukan. Tuliskan h1 { ... } untuk menghias judul.',
      };
    }
    if (!hasColor) {
      return {
        isValid: false,
        errorMessage: 'Property color belum ditemukan! Tambahkan color: blue; di dalam h1 { ... }.',
      };
    }
    return { isValid: true };
  }

  // Step 1: Challenge 2 (h1 font-size)
  if (step === 1) {
    const hasFontSize = /font-size\s*:\s*[^;}]+/i.test(trimmed);
    if (!hasFontSize) {
      return {
        isValid: false,
        errorMessage: 'Property font-size belum ditemukan! Tambahkan font-size: 40px; di dalam h1 { ... }.',
      };
    }
    return { isValid: true };
  }

  // Step 2: Challenge 3 (button background-color AND color)
  if (step === 2) {
    const hasButton = /button/i.test(trimmed);
    const hasBgColor = /background-color\s*:\s*[^;}]+/i.test(trimmed);
    const hasColor = /color\s*:\s*[^;}]+/i.test(trimmed);

    if (!hasButton) {
      return {
        isValid: false,
        errorMessage: 'Target elemen button belum ditemukan. Tuliskan button { ... } untuk menghias tombol.',
      };
    }
    if (!hasBgColor) {
      return {
        isValid: false,
        errorMessage: 'Tombol belum memiliki background-color! Tambahkan background-color: blue; di dalam button { ... }.',
      };
    }
    if (!hasColor) {
      return {
        isValid: false,
        errorMessage: 'Tombol belum memiliki warna tulisan color! Tambahkan color: white; di dalam button { ... }.',
      };
    }
    return { isValid: true };
  }

  return { isValid: false, errorMessage: 'Periksa kembali kode CSS-mu.' };
};

export default function CssCodePlayground({ onComplete, onReset }: CssCodePlaygroundProps) {
  const [userCss, setUserCss] = useState<string>('');
  const [renderedCss, setRenderedCss] = useState<string>('');
  const [hasRun, setHasRun] = useState<boolean>(true);
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFinishedAll, setIsFinishedAll] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  React.useEffect(() => {
    const existing = getCertificateProgress('level-4');
    if (existing?.certificateClaimed) {
      setIsFinishedAll(true);
    }
  }, []);

  const currentChallenge = LEVEL_4_CHALLENGES[challengeIndex];
  const nextChallenge =
    challengeIndex < LEVEL_4_CHALLENGES.length - 1
      ? LEVEL_4_CHALLENGES[challengeIndex + 1]
      : undefined;

  const handleApplyCss = () => {
    setHasRun(true);
    const result = validateCssChallengeDetailed(userCss, challengeIndex);

    if (result.isValid) {
      setRenderedCss(userCss);
      setValidationStatus('success');
      setErrorMessage('');
      // Open celebratory popup so the child knows they succeeded and what the next instruction is
      setShowSuccessModal(true);
    } else {
      setValidationStatus('error');
      setErrorMessage(result.errorMessage || 'Belum sesuai. Coba periksa kembali CSS-mu.');
    }
  };

  const handleProceedNext = () => {
    setShowSuccessModal(false);

    if (challengeIndex < LEVEL_4_CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
      setValidationStatus('idle');
      if (userCss && !userCss.endsWith('\n')) {
        setUserCss((prev) => prev + '\n');
      }
    } else {
      setIsFinishedAll(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-8 py-2">
      {/* Title & Subheading */}
      <div className="space-y-2">
        <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
          CODING PRACTICE • LEVEL 04
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] tracking-tight">
          Yuk, Percantik Halamanmu!
        </h1>
        <p className="text-base sm:text-lg text-[#718096] font-semibold">
          Kamu sudah membuat struktur dengan HTML. Sekarang gunakan CSS untuk mengubah tampilannya.
        </p>
      </div>

      {/* Active Challenge Box */}
      {!isFinishedAll && (
        <ChallengeBox
          challenge={currentChallenge}
          currentChallengeIndex={challengeIndex}
          totalChallenges={LEVEL_4_CHALLENGES.length}
          validationStatus={validationStatus}
          errorMessage={errorMessage}
          onProceedNext={handleProceedNext}
        />
      )}

      {/* Editor & Live Preview 2-Column Desktop / Stack Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: CSS Code Editor */}
        <div className="space-y-4">
          {/* Context HTML Banner */}
          <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-[#17233C] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-black text-[#4F7DF3]">
              <Code2 className="w-4 h-4 stroke-[2.5]" />
              <span>Struktur HTML yang akan dihias:</span>
            </div>
            <pre className="font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold leading-relaxed overflow-x-auto">
              {LEVEL_4_STARTER_HTML}
            </pre>
          </div>

          <CodeEditor
            label="CSS CODE"
            value={userCss}
            onChange={(val) => {
              setUserCss(val);
              if (validationStatus === 'error') {
                setValidationStatus('idle');
              }
            }}
            placeholder="Tulis CSS-mu di sini..."
          />

          {/* Action Buttons: Terapkan CSS & Lanjut Tantangan */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              type="button"
              onClick={handleApplyCss}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-base transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Terapkan CSS</span>
            </button>

            {validationStatus === 'success' && challengeIndex < LEVEL_4_CHALLENGES.length - 1 && (
              <button
                type="button"
                onClick={handleProceedNext}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#42C88A] hover:bg-[#36b278] text-white font-black text-base transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer animate-in fade-in"
              >
                <span>Lanjut Tantangan {challengeIndex + 2}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div>
          <LivePreview
            html={LEVEL_4_STARTER_HTML}
            css={renderedCss}
            label="LIVE PREVIEW"
            hasRun={hasRun}
            validationStatus={validationStatus}
            alwaysShowPreview={true}
          />
        </div>
      </div>

      {/* Completion Section (Appears after Challenge 3 is complete) */}
      {isFinishedAll && (
        <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xs animate-in fade-in slide-in-from-bottom-3 mt-8">
          <div className="w-14 h-14 rounded-full bg-[#42C88A] text-white flex items-center justify-center mx-auto text-2xl shadow-sm">
            🎉
          </div>
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-[#17233C]">
              Semua Tantangan CSS Selesai!
            </h3>
            <p className="text-sm sm:text-base font-bold text-[#4F7DF3]">
              Luar biasa! Kamu berhasil menyelesaikan seluruh materi dan tantangan di Level 4.
            </p>
          </div>
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={onComplete}
              className="px-8 py-3.5 rounded-full bg-[#FFD84D] hover:bg-[#FFE375] text-[#17233C] font-black text-base transition-all shadow-md hover:shadow-lg transform active:scale-95 inline-flex items-center gap-2.5 border-2 border-amber-300/60 cursor-pointer"
            >
              <span>Lanjut ke Pengisian Sertifikat</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* Challenge Success Modal / Pop-up */}
      <ChallengeSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        currentStepNumber={challengeIndex + 1}
        totalSteps={LEVEL_4_CHALLENGES.length}
        currentChallengeTitle={currentChallenge.title}
        successMessage={currentChallenge.successMessage}
        nextChallenge={nextChallenge}
        onProceed={handleProceedNext}
      />
    </div>
  );
}
