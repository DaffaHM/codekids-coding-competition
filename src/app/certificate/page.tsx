import type { Metadata } from 'next';
import CertificateGallery from '@/components/certificate/CertificateGallery';

export const metadata: Metadata = {
  title: 'Sertifikatku — Galeri Sertifikat Kelulusan | CodeKids',
  description:
    'Lihat dan unduh kembali kumpulan sertifikat resmi yang berhasil kamu dapatkan setelah menyelesaikan course coding di CodeKids.',
  keywords: [
    'Sertifikat CodeKids',
    'Sertifikat Coding Anak',
    'Sertifikat Kelulusan Course',
    'Download Sertifikat',
    'CodeKids',
  ],
};

export default function CertificatePage() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <CertificateGallery />
    </main>
  );
}
