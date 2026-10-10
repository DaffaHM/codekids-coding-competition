'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  Download, 
  Eye, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  X, 
  BookOpen, 
  AlertCircle,
  Trophy
} from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { CertificatePDF } from './CertificatePDF';
import { 
  CERTIFICATE_LAYOUT, 
  calculateAdaptiveFontSize, 
  getSanitizedFilename 
} from '@/lib/certificateLayout';
import { 
  getStoredProgress, 
  getCourseCertificateStatus, 
  getCertificateProgress, 
  saveCertificateClaim,
  validateCertificateData
} from '@/lib/storage';
import { CertificateData } from '@/types/progress';

interface OfficialCourse {
  id: string;
  title: string;
  href: string;
  isComingSoon?: boolean;
}

const OFFICIAL_COURSES: OfficialCourse[] = [
  { id: 'level-1', title: 'Apa Itu Coding?', href: '/learn/level-1' },
  { id: 'level-2', title: 'Algorithm', href: '/learn/level-2' },
  { id: 'level-3', title: 'HTML', href: '/learn/level-3' },
  { id: 'level-4', title: 'CSS', href: '/learn/level-4' },
  { id: 'level-5', title: 'JavaScript', href: '/learn/level-5', isComingSoon: true },
  { id: 'level-6', title: 'Final Project', href: '/learn/level-6', isComingSoon: true },
];

export default function CertificateGallery() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [courseStatuses, setCourseStatuses] = useState<
    Record<string, { status: 'earned' | 'claimable' | 'locked'; cert: CertificateData | null }>
  >({});
  
  // Modal states
  const [previewCert, setPreviewCert] = useState<CertificateData | null>(null);
  const [claimCourse, setClaimCourse] = useState<OfficialCourse | null>(null);
  const [claimStudentName, setClaimStudentName] = useState<string>('');
  const [claimError, setClaimError] = useState<string>('');
  
  // Download states
  const [downloadingCourseId, setDownloadingCourseId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Load progress data from localStorage
  const loadCertificates = useCallback(() => {
    const statuses: Record<
      string, 
      { status: 'earned' | 'claimable' | 'locked'; cert: CertificateData | null }
    > = {};

    OFFICIAL_COURSES.forEach((course) => {
      const status = getCourseCertificateStatus(course.id);
      const cert = status === 'earned' ? getCertificateProgress(course.id) : null;
      statuses[course.id] = { status, cert };
    });

    setCourseStatuses(statuses);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    loadCertificates();

    // Listen to storage changes in case claimed in another tab
    const handleStorageChange = () => {
      loadCertificates();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadCertificates]);

  // Handle PDF Download
  const handleDownloadPdf = async (cert: CertificateData) => {
    if (!validateCertificateData(cert)) {
      setDownloadError('Data sertifikat tidak valid.');
      return;
    }

    setDownloadingCourseId(cert.courseId);
    setDownloadError(null);

    try {
      const instance = pdf(
        <CertificatePDF
          studentName={cert.studentName}
          courseName={cert.courseName}
          completionDate={cert.completionDate}
        />
      );
      const blob = await instance.toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = getSanitizedFilename(cert.courseName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download certificate failed:', err);
      setDownloadError('Gagal mengunduh sertifikat. Silakan coba beberapa saat lagi.');
    } finally {
      setDownloadingCourseId(null);
    }
  };

  // Handle Claim submission
  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimCourse) return;

    const trimmed = claimStudentName.trim();
    if (!trimmed || trimmed.length < 2) {
      setClaimError('Masukkan nama lengkapmu (minimal 2 huruf).');
      return;
    }

    const todayIndonesianDate = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    const saved = saveCertificateClaim(claimCourse.id, trimmed, claimCourse.title, todayIndonesianDate);
    
    // Refresh status and open preview
    loadCertificates();
    setClaimCourse(null);
    setClaimStudentName('');
    setClaimError('');
    setPreviewCert(saved);
  };

  const earnedCount = Object.values(courseStatuses).filter((item) => item.status === 'earned').length;

  return (
    <div className="w-full min-h-screen bg-[#F6F8FC] relative overflow-hidden pb-16 sm:pb-24">
      {/* Decorative Sky Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-28 right-0 w-[500px] h-[350px] bg-blue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[300px] bg-white/80 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* HERO SECTION - Generous top padding to clear fixed navbar */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-6 sm:pb-8">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 sm:gap-8">
          
          {/* Left Hero Content */}
          <div className="flex-1 text-center md:text-left flex flex-col justify-center space-y-3.5 sm:space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-3.5">
              {/* Blue Ribbon/Medal Badge */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#4F7DF3] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0 transform hover:rotate-6 transition-transform">
                <Award className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#17233C] tracking-tight">
                Sertifikatku
              </h1>
            </div>

            <p className="text-sm sm:text-base md:text-lg font-bold text-[#17233C]/80 max-w-xl leading-relaxed">
              Kumpulan sertifikat yang berhasil kamu dapatkan setelah menyelesaikan setiap course di CodeKids.
            </p>

            {/* Micro Badge for Learning Motivation */}
            <div className="flex items-center justify-center md:justify-start gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs sm:text-sm font-extrabold text-[#4F7DF3]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD84D] fill-[#FFD84D]" />
                <span>Sertifikat Resmi Berstandar CodeKids</span>
              </span>
            </div>
          </div>

          {/* Right Progress & Achievement Card */}
          <div className="w-full md:w-auto md:min-w-[340px] lg:min-w-[380px] bg-white/90 backdrop-blur-sm rounded-3xl border border-blue-100/90 shadow-md shadow-blue-500/5 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF8E6] border border-[#FFE7A3] text-[#F59E0B] flex items-center justify-center shrink-0 shadow-sm">
                  <Trophy className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-[#17233C]">
                    Progres Koleksi
                  </h2>
                  <p className="text-xs font-bold text-slate-400">
                    Sertifikat Kelulusan
                  </p>
                </div>
              </div>

              {isMounted && (
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#4F7DF3] border border-blue-100 text-xs font-black">
                  {earnedCount} / {OFFICIAL_COURSES.length} Selesai
                </span>
              )}
            </div>

            {/* Dynamic Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                <div
                  className="bg-gradient-to-r from-[#4F7DF3] to-[#42C88A] h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: isMounted
                      ? `${Math.max(6, Math.round((earnedCount / OFFICIAL_COURSES.length) * 100))}%`
                      : '0%',
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>{isMounted ? `${Math.round((earnedCount / OFFICIAL_COURSES.length) * 100)}% Lengkap` : 'Memuat...'}</span>
                <span>{isMounted ? `${OFFICIAL_COURSES.length - earnedCount} Tersisa` : ''}</span>
              </div>
            </div>

            {/* Encouragement message */}
            <p className="text-xs font-bold text-[#17233C]/70 bg-[#F6F8FC] rounded-2xl p-2.5 text-center sm:text-left border border-slate-100">
              {isMounted && earnedCount === OFFICIAL_COURSES.length
                ? '🎉 Luar biasa! Kamu berhasil mengumpulkan seluruh sertifikat!'
                : isMounted && earnedCount > 0
                ? `⭐ Hebat! Selesaikan ${OFFICIAL_COURSES.length - earnedCount} course lagi untuk melengkapi koleksi!`
                : '🚀 Selesaikan course pertamamu untuk membuka sertifikat pertama!'}
            </p>
          </div>

        </div>
      </section>

      {/* MAIN GALLERY CONTAINER */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl sm:rounded-[36px] border border-blue-100/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 md:p-12">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-8 border-b border-slate-100 gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] border border-[#FFE7A3] text-[#F59E0B] flex items-center justify-center shrink-0 shadow-sm">
                <Trophy className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#17233C] tracking-tight">
                  Sertifikat yang Diperoleh
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#17233C]/70 mt-0.5">
                  Berikut adalah sertifikat yang telah kamu selesaikan.
                </p>
              </div>
            </div>

            {/* Quick Filter / Learn Link */}
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#4F7DF3] hover:text-[#3B68E0] transition-colors self-start sm:self-center"
            >
              <span>Belajar Lagi</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Download Error Alert if any */}
          {downloadError && (
            <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-2.5 text-xs sm:text-sm font-bold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{downloadError}</span>
              <button 
                onClick={() => setDownloadError(null)} 
                className="ml-auto text-red-400 hover:text-red-600"
                aria-label="Tutup pesan error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* EMPTY STATE BANNER (When 0 certificates earned) */}
          {isMounted && earnedCount === 0 && (
            <div className="mt-8 mb-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#EBF3FF] via-[#F4F8FF] to-[#FFFBEB] border-2 border-dashed border-blue-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#4F7DF3] text-xs font-black uppercase tracking-wider">
                  Belum Ada Sertifikat
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#17233C]">
                  Selesaikan course pertamamu dan dapatkan sertifikat CodeKids!
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Setiap course yang selesai memberimu sertifikat resmi berstandar kurikulum dengan namamu sendiri.
                </p>
              </div>
              <Link
                href="/learn"
                className="px-6 py-3.5 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 inline-flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Mulai Belajar →</span>
              </Link>
            </div>
          )}

          {/* CERTIFICATE GRID (4 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {OFFICIAL_COURSES.map((course) => {
              const statusInfo = isMounted
                ? courseStatuses[course.id] || { status: 'locked', cert: null }
                : { status: 'locked', cert: null };
              
              const isEarned = statusInfo.status === 'earned' && statusInfo.cert !== null;
              const isClaimable = statusInfo.status === 'claimable';
              const isDownloading = downloadingCourseId === course.id;

              return (
                <div
                  key={course.id}
                  className={`group relative bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isEarned
                      ? 'border-blue-100/80 shadow-md hover:shadow-xl hover:-translate-y-1'
                      : isClaimable
                      ? 'border-emerald-200 bg-emerald-50/20 shadow-md hover:shadow-lg'
                      : 'border-slate-200/70 bg-slate-50/50 opacity-90'
                  }`}
                >
                  {/* Card Content Top */}
                  <div className="p-3.5 sm:p-4 space-y-3.5">
                    
                    {/* THUMBNAIL CONTAINER */}
                    {isEarned && statusInfo.cert ? (
                      /* Live Responsive Certificate Thumbnail */
                      <div
                        onClick={() => setPreviewCert(statusInfo.cert)}
                        className="relative w-full aspect-[1491/1055] rounded-xl sm:rounded-2xl overflow-hidden border border-[#17233C]/10 shadow-sm bg-white [container-type:inline-size] cursor-pointer group-hover:border-[#4F7DF3]/60 transition-colors select-none"
                        role="button"
                        tabIndex={0}
                        aria-label={`Lihat preview sertifikat ${course.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setPreviewCert(statusInfo.cert);
                          }
                        }}
                      >
                        <Image
                          src={CERTIFICATE_LAYOUT.templateUrl}
                          alt={`Sertifikat ${course.title}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover pointer-events-none"
                        />
                        {/* Student Name */}
                        <div
                          className="absolute flex items-center justify-center text-center font-black pointer-events-none font-sans"
                          style={{
                            top: '42.18%',
                            left: '0%',
                            width: '100%',
                            height: '6.635%',
                            color: CERTIFICATE_LAYOUT.name.color,
                            fontSize: `${(calculateAdaptiveFontSize(statusInfo.cert.studentName, CERTIFICATE_LAYOUT.name.defaultFontSize, CERTIFICATE_LAYOUT.name.minFontSize, 18) / 1491) * 100}cqw`,
                            lineHeight: 1.1,
                          }}
                        >
                          <span className="truncate px-2">{statusInfo.cert.studentName}</span>
                        </div>
                        {/* Course Name */}
                        <div
                          className="absolute flex items-center justify-center text-center font-extrabold pointer-events-none font-sans"
                          style={{
                            top: '63.697%',
                            left: '0%',
                            width: '100%',
                            height: '5.213%',
                            color: CERTIFICATE_LAYOUT.course.color,
                            fontSize: `${(calculateAdaptiveFontSize(statusInfo.cert.courseName, CERTIFICATE_LAYOUT.course.defaultFontSize, CERTIFICATE_LAYOUT.course.minFontSize, 25) / 1491) * 100}cqw`,
                            lineHeight: 1.1,
                          }}
                        >
                          <span className="truncate px-2">{statusInfo.cert.courseName}</span>
                        </div>
                        {/* Completion Date (Cleanly positioned below the line) */}
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
                          <span>{statusInfo.cert.completionDate}</span>
                        </div>

                        {/* Hover Overlay Icon */}
                        <div className="absolute inset-0 bg-[#17233C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
                          <div className="p-2 rounded-full bg-white/90 text-[#4F7DF3] shadow-md">
                            <Eye className="w-5 h-5 stroke-[2.5]" />
                          </div>
                        </div>
                      </div>
                    ) : isClaimable ? (
                      /* Claimable Placeholder Thumbnail */
                      <div
                        onClick={() => setClaimCourse(course)}
                        className="relative w-full aspect-[1491/1055] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-dashed border-emerald-300 bg-emerald-50/60 flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-emerald-100/60 transition-colors"
                        role="button"
                        tabIndex={0}
                        aria-label={`Klaim sertifikat ${course.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setClaimCourse(course);
                          }
                        }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#42C88A] text-white flex items-center justify-center shadow-sm mb-1.5 animate-bounce">
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-xs sm:text-sm font-black text-emerald-800">
                          Sertifikat Siap!
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600">
                          Klik untuk klaim
                        </span>
                      </div>
                    ) : (
                      /* Locked Placeholder Thumbnail */
                      <div className="relative w-full aspect-[1491/1055] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 bg-gradient-to-b from-slate-100 to-slate-200/60 flex flex-col items-center justify-center text-center p-4 select-none">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-300/80 text-slate-600 flex items-center justify-center shadow-inner mb-1.5">
                          <Lock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-black text-slate-500 uppercase tracking-wider">
                          {course.isComingSoon ? 'Coming Soon' : 'Terkunci'}
                        </span>
                      </div>
                    )}

                    {/* COURSE TITLE & STATUS INFO */}
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-black text-[#17233C] line-clamp-1">
                        {course.title}
                      </h3>
                      
                      {isEarned && statusInfo.cert ? (
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <span>{statusInfo.cert.completionDate}</span>
                        </p>
                      ) : isClaimable ? (
                        <p className="text-xs font-black text-[#16A34A] flex items-center gap-1">
                          <span>✓ Course Selesai (Siap Diklaim)</span>
                        </p>
                      ) : (
                        <p className="text-xs font-bold text-slate-400">
                          {course.isComingSoon ? 'Segera Hadir' : 'Belum diperoleh'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CARD ACTION BUTTONS */}
                  <div className="p-3.5 sm:p-4 pt-0">
                    {isEarned && statusInfo.cert ? (
                      /* Two Action Buttons: Lihat Sertifikat & Download PDF */
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewCert(statusInfo.cert)}
                          className="py-2.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl bg-[#4F7DF3] hover:bg-[#3B68E0] text-white text-xs font-black transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 min-w-0"
                          aria-label={`Lihat sertifikat ${course.title}`}
                        >
                          <Eye className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                          <span className="truncate">Lihat Sertifikat</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(statusInfo.cert!)}
                          disabled={isDownloading}
                          className="py-2.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl bg-[#EBF3FF] hover:bg-[#DBEAFE] text-[#4F7DF3] border border-blue-200 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95 min-w-0"
                          aria-label={`Download PDF sertifikat ${course.title}`}
                        >
                          {isDownloading ? (
                            <Loader2 className="w-3.5 h-3.5 shrink-0 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                          )}
                          <span className="truncate">{isDownloading ? 'Mengunduh...' : 'Download PDF'}</span>
                        </button>
                      </div>
                    ) : isClaimable ? (
                      /* Claim Button */
                      <button
                        type="button"
                        onClick={() => setClaimCourse(course)}
                        className="w-full py-2.5 px-4 rounded-xl sm:rounded-2xl bg-[#42C88A] hover:bg-[#36B278] text-white text-xs sm:text-sm font-black transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        aria-label={`Klaim sertifikat ${course.title}`}
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Klaim Sertifikat</span>
                      </button>
                    ) : course.isComingSoon ? (
                      /* Coming Soon Button */
                      <button
                        type="button"
                        disabled
                        className="w-full py-2.5 px-4 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-400 border border-slate-200 text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-not-allowed select-none"
                        aria-label={`${course.title} Coming Soon`}
                      >
                        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        <span>Coming Soon</span>
                      </button>
                    ) : (
                      /* Locked Button: Links to Course */
                      <Link
                        href={course.href}
                        className="w-full py-2.5 px-4 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 text-center"
                        aria-label={`Selesaikan course ${course.title}`}
                      >
                        <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        <span>Selesaikan Course</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODAL 1: LIHAT SERTIFIKAT (FULL PREVIEW & DOWNLOAD) */}
      {previewCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17233C]/70 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          onClick={() => setPreviewCert(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-slate-200/80 space-y-5 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase text-[#4F7DF3] tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {previewCert.courseName}
                </span>
                <h3 id="preview-modal-title" className="text-lg sm:text-2xl font-black text-[#17233C]">
                  Sertifikat Kelulusan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup preview sertifikat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Certificate View (Full Container Query Scaled 1491x1055) */}
            <div className="relative w-full aspect-[1491/1055] rounded-2xl overflow-hidden border-2 sm:border-4 border-[#17233C] shadow-lg bg-white [container-type:inline-size] select-none">
              <Image
                src={CERTIFICATE_LAYOUT.templateUrl}
                alt={`Sertifikat ${previewCert.courseName}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover pointer-events-none"
              />
              
              {/* Dynamic Name */}
              <div
                className="absolute flex items-center justify-center text-center font-black pointer-events-none font-sans"
                style={{
                  top: '42.18%',
                  left: '0%',
                  width: '100%',
                  height: '6.635%',
                  color: CERTIFICATE_LAYOUT.name.color,
                  fontSize: `${(calculateAdaptiveFontSize(previewCert.studentName, CERTIFICATE_LAYOUT.name.defaultFontSize, CERTIFICATE_LAYOUT.name.minFontSize, 18) / 1491) * 100}cqw`,
                  lineHeight: 1.1,
                }}
              >
                <span className="truncate px-4">{previewCert.studentName}</span>
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
                  fontSize: `${(calculateAdaptiveFontSize(previewCert.courseName, CERTIFICATE_LAYOUT.course.defaultFontSize, CERTIFICATE_LAYOUT.course.minFontSize, 25) / 1491) * 100}cqw`,
                  lineHeight: 1.1,
                }}
              >
                <span className="truncate px-4">{previewCert.courseName}</span>
              </div>

              {/* Dynamic Date (Cleanly positioned below the line) */}
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
                <span>{previewCert.completionDate}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition-colors cursor-pointer"
              >
                Tutup
              </button>
              
              <button
                type="button"
                onClick={() => handleDownloadPdf(previewCert)}
                disabled={downloadingCourseId === previewCert.courseId}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {downloadingCourseId === previewCert.courseId ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 stroke-[2.5]" />
                )}
                <span>
                  {downloadingCourseId === previewCert.courseId
                    ? 'Mengunduh PDF...'
                    : 'Download PDF Sertifikat'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: KLAIM SERTIFIKAT (ENTER STUDENT NAME) */}
      {claimCourse && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17233C]/70 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="claim-modal-title"
          onClick={() => {
            setClaimCourse(null);
            setClaimError('');
          }}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-slate-200 space-y-6 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-[#4F7DF3] tracking-wider bg-blue-50 px-3 py-0.5 rounded-full border border-blue-100 inline-block">
                  {claimCourse.title}
                </span>
                <h3 id="claim-modal-title" className="text-xl sm:text-2xl font-black text-[#17233C]">
                  Klaim Sertifikat
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  Masukkan namamu untuk dicetak pada sertifikat resmi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setClaimCourse(null);
                  setClaimError('');
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup form klaim"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Claim Form */}
            <form onSubmit={handleClaimSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="claim-student-name"
                  className="block text-sm font-black text-[#17233C]"
                >
                  Nama Lengkap Peserta
                </label>
                <input
                  id="claim-student-name"
                  type="text"
                  value={claimStudentName}
                  onChange={(e) => {
                    setClaimStudentName(e.target.value);
                    if (claimError) setClaimError('');
                  }}
                  placeholder="Contoh: Budi Setiawan"
                  autoFocus
                  className={`w-full px-5 py-3.5 rounded-2xl font-bold text-base text-[#17233C] bg-slate-50 border-2 transition-all focus:outline-none focus:bg-white ${
                    claimError
                      ? 'border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/30'
                      : 'border-slate-200 focus:border-[#4F7DF3] focus:ring-2 focus:ring-[#4F7DF3]/20'
                  }`}
                />
                {claimError && (
                  <div className="flex items-center gap-1.5 text-[#FF6B6B] text-xs font-extrabold pt-1 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    <span>{claimError}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setClaimCourse(null);
                    setClaimError('');
                  }}
                  className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Cetak Sertifikat →</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
