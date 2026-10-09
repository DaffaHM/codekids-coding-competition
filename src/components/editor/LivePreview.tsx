'use client';

import React from 'react';
import { generateSandboxSrcDoc } from '@/lib/sandbox';
import { Monitor } from 'lucide-react';

interface LivePreviewProps {
  html: string;
  css?: string;
  js?: string;
  label?: string;
  hasRun?: boolean;
  validationStatus?: 'idle' | 'success' | 'error';
  alwaysShowPreview?: boolean;
}

export default function LivePreview({
  html,
  css = '',
  js = '',
  label = 'LIVE PREVIEW',
  hasRun = false,
  validationStatus = 'idle',
  alwaysShowPreview = false,
}: LivePreviewProps) {
  const srcDoc = generateSandboxSrcDoc({ html, css, js });
  const isOutputEmpty = !alwaysShowPreview && (!hasRun || !html.trim());
  const showErrorOverlay = !alwaysShowPreview && validationStatus === 'error';

  return (
    <div className="w-full flex flex-col rounded-3xl bg-white border-2 border-slate-200/80 overflow-hidden shadow-xs">
      {/* Browser Bar Mock Header */}
      <div className="bg-slate-100 px-4 py-3 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
            <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
            <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
          </div>
          <span className="ml-2 text-xs font-mono font-bold text-[#718096] uppercase tracking-wider">
            {label}
          </span>
        </div>

        {/* Address Bar Mock */}
        <div className="hidden xs:flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-0.5 rounded-full text-[11px] font-mono text-slate-400">
          <Monitor className="w-3 h-3 text-slate-400" />
          <span>https://halaman-saya.com</span>
        </div>
      </div>

      {/* Preview Content Frame / Empty & Error State */}
      <div className="w-full h-full min-h-[220px] sm:min-h-[280px] bg-white relative">
        {showErrorOverlay ? (
          <div className="w-full h-full min-h-[220px] sm:min-h-[280px] flex flex-col items-center justify-center p-6 text-center space-y-2.5 bg-amber-50/40">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
              ⚠️
            </div>
            <p className="text-base font-black text-[#17233C]">
              Hasil Belum Tampil
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#718096] max-w-xs leading-relaxed">
              Kode masih ada kesalahan. Perbaiki petunjuk di atas lalu tekan <span className="text-[#4F7DF3] font-black">Jalankan Kode</span>.
            </p>
          </div>
        ) : isOutputEmpty ? (
          <div className="w-full h-full min-h-[220px] sm:min-h-[280px] flex flex-col items-center justify-center p-6 text-center space-y-2 text-slate-400">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <Monitor className="w-6 h-6" />
            </div>
            <p className="text-base font-black text-[#17233C]">
              Belum ada hasil.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#718096] max-w-xs">
              Tulis kode HTML-mu lalu tekan <span className="text-[#4F7DF3] font-bold">Jalankan Kode</span>.
            </p>
          </div>
        ) : (
          <iframe
            srcDoc={srcDoc}
            title="Live Preview Output"
            sandbox="allow-scripts"
            className="w-full h-full min-h-[220px] sm:min-h-[280px] border-0 bg-white"
          />
        )}
      </div>
    </div>
  );
}
