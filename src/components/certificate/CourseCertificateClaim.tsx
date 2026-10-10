'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Award, Download, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { CertificatePDF } from './CertificatePDF';
import { CERTIFICATE_LAYOUT, calculateAdaptiveFontSize, getSanitizedFilename } from '@/lib/certificateLayout';
import { getCertificateProgress, saveCertificateClaim } from '@/lib/storage';
import { CertificateData } from '@/types/progress';

interface CourseCertificateClaimProps {
  courseId: string;
  courseName: string;
}

export default function CourseCertificateClaim({
  courseId,
  courseName,
}: CourseCertificateClaimProps) {
  const [studentName, setStudentName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if certificate has already been claimed for this course
  useEffect(() => {
    if (!isMounted) return;
    const existingCert = getCertificateProgress(courseId);
    if (existingCert) {
      setCertData(existingCert);
    }
  }, [courseId, isMounted]);

  // Generate native PDF Blob URL when certData is set
  useEffect(() => {
    if (!certData) return;

    let isSubscribed = true;
    setIsGeneratingPdf(true);

    const generatePdfBlob = async () => {
      try {
        const instance = pdf(
          <CertificatePDF
            studentName={certData.studentName}
            courseName={certData.courseName}
            completionDate={certData.completionDate}
          />
        );
        const blob = await instance.toBlob();
        if (isSubscribed) {
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        }
      } catch (err) {
        console.error('Error generating PDF:', err);
      } finally {
        if (isSubscribed) {
          setIsGeneratingPdf(false);
        }
      }
    };

    generatePdfBlob();

    return () => {
      isSubscribed = false;
    };
  }, [certData]);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = studentName.trim();

    if (!trimmed || trimmed.length < 2) {
      setError('Masukkan namamu terlebih dahulu.');
      return;
    }

    setError('');
    const todayIndonesianDate = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    const saved = saveCertificateClaim(courseId, trimmed, courseName, todayIndonesianDate);
    setCertData(saved);
  };

  const handleDownload = async () => {
    if (!certData) return;
    setIsDownloading(true);

    try {
      const instance = pdf(
        <CertificatePDF
          studentName={certData.studentName}
          courseName={certData.courseName}
          completionDate={certData.completionDate}
        />
      );
      const blob = await instance.toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = getSanitizedFilename(certData.courseName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download PDF failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* SCREEN 1: CLAIM CERTIFICATE FORM */}
      {!certData ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#42C88A] text-white flex items-center justify-center mx-auto text-3xl shadow-md">
              <Award className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] tracking-tight">
              Course Selesai! 🎉
            </h1>
            <p className="text-base sm:text-xl font-extrabold text-[#4F7DF3]">
              Hebat! Kamu berhasil menyelesaikan course ini.
            </p>
          </div>

          {/* Claim Form Card */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 max-w-xl mx-auto">
            <div className="space-y-1.5 text-center">
              <span className="text-xs font-black uppercase text-[#4F7DF3] tracking-wider bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block">
                {courseName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#17233C]">
                Claim Certificate-mu
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#718096]">
                Masukkan namamu untuk mendapatkan sertifikat.
              </p>
            </div>

            <form onSubmit={handleClaim} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="student-name"
                  className="block text-sm font-black text-[#17233C]"
                >
                  Nama lengkap
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Masukkan nama kamu"
                  className={`w-full px-5 py-3.5 rounded-2xl font-bold text-base text-[#17233C] bg-slate-50 border-2 transition-all focus:outline-none focus:bg-white ${
                    error
                      ? 'border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/30'
                      : 'border-slate-200 focus:border-[#4F7DF3] focus:ring-2 focus:ring-[#4F7DF3]/20'
                  }`}
                />
                {error && (
                  <div className="flex items-center gap-1.5 text-[#FF6B6B] text-xs sm:text-sm font-extrabold pt-1 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-base sm:text-lg transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Claim Certificate →</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* SCREEN 2: CERTIFICATE READY & DOWNLOAD */
        <div className="space-y-8 animate-in fade-in">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#42C88A] text-white flex items-center justify-center mx-auto text-3xl shadow-md">
              ✓
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17233C] tracking-tight">
              Certificate Berhasil Dibuat! 🎉
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#16A34A]">
              Selamat! Sertifikatmu sudah siap.
            </p>
          </div>

          {/* Responsive Certificate Preview (Pixel-perfect on Mobile & Desktop, No Iframe Zoom Bug) */}
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-[#17233C] shadow-2xl bg-white aspect-[1491/1055] [container-type:inline-size] select-none">
            {/* Background Certificate Template Image */}
            <Image
              src={CERTIFICATE_LAYOUT.templateUrl}
              alt="CodeKids Certificate Template"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover pointer-events-none"
            />

            {/* Dynamic Student Name */}
            <div
              className="absolute flex items-center justify-center text-center font-black pointer-events-none font-sans"
              style={{
                top: '42.18%',
                left: '0%',
                width: '100%',
                height: '6.635%',
                color: CERTIFICATE_LAYOUT.name.color,
                fontSize: `${(calculateAdaptiveFontSize(certData.studentName, CERTIFICATE_LAYOUT.name.defaultFontSize, CERTIFICATE_LAYOUT.name.minFontSize, 18) / 1491) * 100}cqw`,
                lineHeight: 1.1,
              }}
            >
              <span className="truncate px-4">{certData.studentName}</span>
            </div>

            {/* Dynamic Course Name */}
            <div
              className="absolute flex items-center justify-center text-center font-extrabold pointer-events-none font-sans"
              style={{
                top: '63.697%',
                left: '0%',
                width: '100%',
                height: '5.213%',
                color: CERTIFICATE_LAYOUT.course.color,
                fontSize: `${(calculateAdaptiveFontSize(certData.courseName, CERTIFICATE_LAYOUT.course.defaultFontSize, CERTIFICATE_LAYOUT.course.minFontSize, 25) / 1491) * 100}cqw`,
                lineHeight: 1.1,
              }}
            >
              <span className="truncate px-4">{certData.courseName}</span>
            </div>

            {/* Dynamic Completion Date (Cleanly positioned below the line) */}
            <div
              className="absolute flex items-center justify-center text-center font-bold pointer-events-none font-sans"
              style={{
                top: '88.531%',
                left: '31.657%',
                width: '18.578%',
                height: '3.223%',
                color: CERTIFICATE_LAYOUT.date.color,
                fontSize: `${(CERTIFICATE_LAYOUT.date.fontSize / 1491) * 100}cqw`,
                lineHeight: 1.1,
              }}
            >
              <span>{certData.completionDate}</span>
            </div>
          </div>

          {/* Action Button: Download Certificate Only */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading || isGeneratingPdf}
              className="px-10 py-4 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-base sm:text-lg transition-all shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5 stroke-[2.5]" />
              )}
              <span>{isDownloading ? 'Mengunduh PDF...' : 'Download Certificate'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
