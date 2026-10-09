'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CodeEditor from './CodeEditor';
import LivePreview from './LivePreview';
import ChallengeBox, { ChallengeData } from './ChallengeBox';
import { Play, ArrowRight, CheckCircle2 } from 'lucide-react';

import CourseCertificateClaim from '@/components/certificate/CourseCertificateClaim';
import { getCertificateProgress } from '@/lib/storage';

export const LEVEL_3_CHALLENGES: ChallengeData[] = [
  {
    id: 1,
    title: 'Challenge 1 — Buat Judul',
    instruction: 'Buat judul utama untuk halaman web kamu menggunakan tag <h1> dan diakhiri tag penutup </h1>.',
    hint: '<h1>Judul Halaman Saya</h1>',
    successMessage: 'Hebat! Kamu berhasil membuat judul dengan tag <h1>.',
  },
  {
    id: 2,
    title: 'Challenge 2 — Tambahkan Paragraf',
    instruction: 'Tetap simpan judul <h1> yang sudah kamu buat, lalu tambahkan paragraf di bawahnya menggunakan tag <p> dan </p>.',
    hint: '<p>Ini adalah kalimat paragraf saya.</p>',
    successMessage: 'Bagus! Sekarang halamanmu memiliki judul <h1> dan paragraf <p>.',
  },
  {
    id: 3,
    title: 'Challenge 3 — Tambahkan Tombol',
    instruction: 'Di baris paling bawah, tambahkan sebuah tombol aksi menggunakan tag <button> dan </button>.',
    hint: '<button>Klik Di Sini</button>',
    successMessage: 'Luar biasa! Kamu berhasil membuat halaman web HTML pertamamu!',
  },
];

interface CodePlaygroundProps {
  onComplete: () => void;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const validateChallengeDetailed = (code: string, step: number): ValidationResult => {
  const trimmed = code.trim();

  // 1. Check if empty
  if (!trimmed) {
    return {
      isValid: false,
      errorMessage: 'Kotak editor masih kosong! Ketik kode HTML di kotak editor sesuai petunjuk (misal: <h1>Judul Saya</h1>) lalu tekan Jalankan Kode.',
    };
  }

  // 2. Check if code has ANY html tags at all (e.g. user typed random text without <...>)
  const hasAnyTag = /<[a-z1-6]+[^>]*>/i.test(trimmed);
  if (!hasAnyTag) {
    return {
      isValid: false,
      errorMessage: 'Teks yang kamu tulis belum dibungkus tag HTML! Tambahkan tag <h1> di depan teks dan </h1> di belakang teks (contoh: <h1>Judul Saya</h1>).',
    };
  }

  // Step 0: Check H1
  const hasH1Open = /<h1[^>]*>/i.test(trimmed);
  const hasH1Close = /<\/h1>/i.test(trimmed);
  const hasH1Full = /<h1[^>]*>[\s\S]*?<\/h1>/i.test(trimmed);

  if (step === 0) {
    if (!hasH1Open) {
      return {
        isValid: false,
        errorMessage: 'Tag <h1> belum ditemukan! Untuk Tantangan 1, buatlah judul dengan tag <h1>...</h1> (contoh: <h1>Judul Halaman</h1>).',
      };
    }
    if (hasH1Open && !hasH1Close) {
      return {
        isValid: false,
        errorMessage: 'Kamu sudah membuat tag pembuka <h1>, tetapi belum menutupnya! Tambahkan tag penutup </h1> di akhir teks judulmu.',
      };
    }
    if (hasH1Full) {
      const match = trimmed.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const innerText = match ? match[1].trim() : '';
      if (!innerText) {
        return {
          isValid: false,
          errorMessage: 'Tag <h1> kamu belum berisi teks! Tuliskan judul di antara <h1> dan </h1> (contoh: <h1>Judul Saya</h1>).',
        };
      }
      return { isValid: true };
    }
    return {
      isValid: false,
      errorMessage: 'Format penulisan tag <h1> belum tepat. Pastikan diawali <h1> dan diakhiri </h1> (contoh: <h1>Judul Saya</h1>).',
    };
  }

  // Step 1: Check H1 & P
  const hasPOpen = /<p[^>]*>/i.test(trimmed);
  const hasPClose = /<\/p>/i.test(trimmed);
  const hasPFull = /<p[^>]*>[\s\S]*?<\/p>/i.test(trimmed);

  if (step === 1) {
    if (!hasH1Full) {
      return {
        isValid: false,
        errorMessage: 'Judul <h1> milikmu hilang atau belum lengkap! Tetap simpan <h1>Judul</h1>, lalu tambahkan <p>Paragraf</p> di bawahnya.',
      };
    }
    if (!hasPOpen) {
      return {
        isValid: false,
        errorMessage: 'Tag paragraf <p> belum ditemukan. Tambahkan <p>Tulis paragrafmu di sini</p> di bawah judul <h1>.',
      };
    }
    if (hasPOpen && !hasPClose) {
      return {
        isValid: false,
        errorMessage: 'Kamu membuat tag pembuka <p>, tetapi belum menutupnya! Tambahkan tag penutup </p> di akhir paragrafmu.',
      };
    }
    if (hasPFull) {
      const match = trimmed.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const innerText = match ? match[1].trim() : '';
      if (!innerText) {
        return {
          isValid: false,
          errorMessage: 'Tag <p> kamu belum berisi teks. Tulis kalimat di antara <p> dan </p> (contoh: <p>Ini paragraf saya.</p>).',
        };
      }
      return { isValid: true };
    }
    return {
      isValid: false,
      errorMessage: 'Format penulisan tag <p> belum tepat. Pastikan diawali <p> dan diakhiri </p> (contoh: <p>Kalimat saya</p>).',
    };
  }

  // Step 2: Check H1, P, & Button
  const hasButtonOpen = /<button[^>]*>/i.test(trimmed);
  const hasButtonClose = /<\/button>/i.test(trimmed);
  const hasButtonFull = /<button[^>]*>[\s\S]*?<\/button>/i.test(trimmed);

  if (step === 2) {
    if (!hasH1Full || !hasPFull) {
      return {
        isValid: false,
        errorMessage: 'Kode <h1> atau <p> sebelumnya terhapus! Pastikan kamu tetap menyimpan <h1> dan <p>, lalu tambahkan <button>...',
      };
    }
    if (!hasButtonOpen) {
      return {
        isValid: false,
        errorMessage: 'Tag tombol <button> belum ditemukan. Tambahkan <button>Klik Di Sini</button> di baris paling bawah.',
      };
    }
    if (hasButtonOpen && !hasButtonClose) {
      return {
        isValid: false,
        errorMessage: 'Kamu membuat tag pembuka <button>, tetapi belum menutupnya! Tambahkan tag penutup </button> di akhir teks tombol.',
      };
    }
    if (hasButtonFull) {
      const match = trimmed.match(/<button[^>]*>([\s\S]*?)<\/button>/i);
      const innerText = match ? match[1].trim() : '';
      if (!innerText) {
        return {
          isValid: false,
          errorMessage: 'Tag <button> kamu belum berisi teks label. Tuliskan teks di antara <button> dan </button> (contoh: <button>Klik Saya</button>).',
        };
      }
      return { isValid: true };
    }
    return {
      isValid: false,
      errorMessage: 'Format penulisan tag <button> belum tepat. Pastikan diawali <button> dan diakhiri </button> (contoh: <button>Klik Di Sini</button>).',
    };
  }

  return { isValid: false, errorMessage: 'Periksa kembali kode HTML yang kamu tulis.' };
};

export default function CodePlayground({ onComplete }: CodePlaygroundProps) {
  const [userCode, setUserCode] = useState<string>('');
  const [renderedCode, setRenderedCode] = useState<string>('');
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFinishedAll, setIsFinishedAll] = useState<boolean>(false);

  React.useEffect(() => {
    const existing = getCertificateProgress('level-3');
    if (existing?.certificateClaimed) {
      setIsFinishedAll(true);
    }
  }, []);

  const currentChallenge = LEVEL_3_CHALLENGES[challengeIndex];

  const handleRunCode = () => {
    setHasRun(true);
    setRenderedCode(userCode);

    const result = validateChallengeDetailed(userCode, challengeIndex);

    if (result.isValid) {
      setValidationStatus('success');
      setErrorMessage('');

      // If last challenge completed
      if (challengeIndex === LEVEL_3_CHALLENGES.length - 1) {
        setIsFinishedAll(true);
        onComplete();
      } else {
        // Advance to next challenge after a short delay
        setTimeout(() => {
          setChallengeIndex((prev) => prev + 1);
          setValidationStatus('idle');
          setHasRun(false);
          setRenderedCode('');
        }, 1600);
      }
    } else {
      setValidationStatus('error');
      setErrorMessage(result.errorMessage || 'Tulis kode sesuai petunjuk lalu jalankan lagi.');
    }
  };

  return (
    <div className="space-y-8 py-2">
      {/* Title & Subheading */}
      <div className="space-y-2">
        <span className="text-xs font-black text-[#4F7DF3] uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block">
          CODING PRACTICE • LEVEL 03
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] tracking-tight">
          Yuk, Buat Halaman Pertamamu!
        </h1>
        <p className="text-base sm:text-lg text-[#718096] font-semibold">
          Sekarang waktunya mencoba HTML sendiri. Tulis kode HTML-mu dan lihat hasilnya secara langsung.
        </p>
      </div>

      {/* Active Challenge Box */}
      {!isFinishedAll && (
        <ChallengeBox
          challenge={currentChallenge}
          currentChallengeIndex={challengeIndex}
          totalChallenges={LEVEL_3_CHALLENGES.length}
          validationStatus={validationStatus}
          errorMessage={errorMessage}
        />
      )}

      {/* Editor & Live Preview 2-Column Desktop / Stack Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Code Editor */}
        <div className="space-y-4">
          <CodeEditor
            value={userCode}
            onChange={(val) => {
              setUserCode(val);
              setHasRun(false);
              setRenderedCode('');
              if (validationStatus === 'error') {
                setValidationStatus('idle');
              }
            }}
            placeholder="Tulis kode HTML-mu di sini..."
          />

          {/* Action Button: Jalankan Kode */}
          <div className="flex items-center justify-center sm:justify-start">
            <button
              type="button"
              onClick={handleRunCode}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-base transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Jalankan Kode</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Preview */}
        <div>
          <LivePreview
            html={renderedCode}
            hasRun={hasRun}
            validationStatus={validationStatus}
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
              Semua Tantangan HTML Selesai!
            </h3>
            <p className="text-sm sm:text-base font-bold text-[#4F7DF3]">
              Luar biasa! Kamu berhasil menyelesaikan seluruh materi dan tantangan di Level 3.
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
    </div>
  );
}
