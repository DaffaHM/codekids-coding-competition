'use client';

import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  label = 'HTML CODE',
  placeholder = 'Tulis kode HTML-mu di sini...',
  readOnly = false,
}: CodeEditorProps) {
  return (
    <div className="w-full flex flex-col rounded-3xl bg-[#17233C] border-2 border-slate-700/80 overflow-hidden shadow-lg">
      {/* Editor Header Bar */}
      <div className="bg-[#0F172A] px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            {label}
          </span>
        </div>
        <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
          index.html
        </span>
      </div>

      {/* Editor Textarea Input */}
      <div className="relative w-full min-h-[220px] sm:min-h-[280px]">
        <label htmlFor="code-input" className="sr-only">
          {label}
        </label>
        <textarea
          id="code-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="w-full h-full min-h-[220px] sm:min-h-[280px] p-4 font-mono text-sm sm:text-base text-emerald-400 bg-[#17233C] placeholder:text-slate-500 resize-y focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] leading-relaxed selection:bg-[#4F7DF3]/30"
        />
      </div>
    </div>
  );
}
