'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  RiCloseLine,
  RiSubtractLine,
  RiBrushLine,
  RiSparklingFill,
  RiLightbulbFill,
  RiSendPlane2Fill,
  RiImageAddLine,
  RiCodeSSlashLine,
  RiFlashlightLine,
  RiTerminalBoxLine,
  RiBugLine,
  RiArrowRightSLine,
  RiCheckDoubleLine,
} from 'react-icons/ri';
import { sendMessageToGemini, ChatMessage } from '@/services/aiChatService';
import LaTeXRenderer from '@/components/common/LaTeXRenderer';

const LOTTIE_MASCOT_URL =
  'https://lottie.host/3053d0cc-0a0d-4864-9e9b-2c150121f69c/fOlUck5m6g.json';

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'model',
  content: 'Halo! 👋 Saya **CodeKids AI**, tutor coding interaktifmu.',
  timestamp: new Date(),
};

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  prompt: string;
  icon: React.ElementType;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  arrowBg: string;
  iconColor: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'html-css',
    title: 'HTML & CSS',
    subtitle: 'Membuat & mempercantik tampilan web',
    prompt: 'Bagaimana cara membuat halaman website menarik dengan HTML & CSS?',
    icon: RiCodeSSlashLine,
    bgColor: 'bg-blue-50/80 hover:bg-blue-100/60',
    borderColor: 'border-blue-100',
    iconBg: 'bg-blue-100',
    arrowBg: 'bg-blue-100/80',
    iconColor: 'text-blue-600',
  },
  {
    id: 'js-react',
    title: 'JavaScript & React',
    subtitle: 'Membuat web interaktif',
    prompt: 'Jelaskan konsep dasar JavaScript & React untuk membuat web interaktif',
    icon: RiFlashlightLine,
    bgColor: 'bg-amber-50/80 hover:bg-amber-100/60',
    borderColor: 'border-amber-100',
    iconBg: 'bg-amber-100',
    arrowBg: 'bg-amber-100/80',
    iconColor: 'text-amber-600',
  },
  {
    id: 'python-scratch',
    title: 'Python & Scratch',
    subtitle: 'Logika pemrograman dasar',
    prompt: 'Bagaimana cara belajar logika pemrograman dasar menggunakan Python atau Scratch?',
    icon: RiTerminalBoxLine,
    bgColor: 'bg-emerald-50/80 hover:bg-emerald-100/60',
    borderColor: 'border-emerald-100',
    iconBg: 'bg-emerald-100',
    arrowBg: 'bg-emerald-100/80',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'debug-error',
    title: 'Debug & Perbaikan Error',
    subtitle: 'Mencari dan memperbaiki error kode',
    prompt: 'Bagaimana cara mencari dan memperbaiki (debug) error pada kode pemrograman?',
    icon: RiBugLine,
    bgColor: 'bg-rose-50/80 hover:bg-rose-100/60',
    borderColor: 'border-rose-100',
    iconBg: 'bg-rose-100',
    arrowBg: 'bg-rose-100/80',
    iconColor: 'text-rose-600',
  },
];

const TRY_QUESTIONS = [
  {
    label: 'Apa itu HTML?',
    prompt: 'Jelaskan apa itu HTML dan fungsinya secara sederhana!',
  },
  {
    label: 'Cara membuat tombol di HTML',
    prompt: 'Bagaimana cara membuat tombol interaktif di HTML & CSS?',
  },
  {
    label: 'Jelaskan fungsi JavaScript',
    prompt: 'Apa fungsi utama JavaScript dalam pembuatan website?',
  },
  {
    label: 'Kenapa muncul error ini?',
    prompt: 'Apa saja penyebab umum kenapa kode JavaScript mengalami error?',
  },
];

export default function AIChatWidget() {
  const pathname = usePathname();
  const isLessonPage = pathname ? pathname.startsWith('/learn/') : false;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Handle sending message with real-time streaming
  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputMessage).trim();
    if (!prompt || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    const botMsgId = `bot-${Date.now() + 1}`;
    const initialBotMsg: ChatMessage = {
      id: botMsgId,
      role: 'model',
      content: '',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, initialBotMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const historyForApi = messages.filter((m) => m.id !== 'welcome-msg');
      const responseText = await sendMessageToGemini(historyForApi, prompt, (streamedText) => {
        setIsLoading(false);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, content: streamedText } : msg
          )
        );
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId ? { ...msg, content: responseText } : msg
        )
      );
    } catch (error: any) {
      console.error('CodeKids AI Chat Error:', error);
      const isApiKeyMissing =
        error?.message?.includes('API Key') ||
        error?.message?.includes('unregistered callers') ||
        error?.message?.includes('API_KEY');

      const errorMsg: ChatMessage = {
        id: botMsgId,
        role: 'model',
        content: isApiKeyMissing
          ? '⚠️ **Google Gemini API Key belum terpasang.**\n\nPastikan variabel `NEXT_PUBLIC_GEMINI_API_KEY` sudah diisi di file `.env.local` (untuk lokal) atau di **Settings ➔ Environment Variables** (untuk Vercel).'
          : '⚠️ **Maaf, terjadi kendala saat terhubung ke AI Tutor.**\n\nSilakan periksa koneksi internet kamu atau coba beberapa saat lagi.',
        timestamp: new Date(),
      };
      setMessages((prev) =>
        prev.map((msg) => (msg.id === botMsgId ? errorMsg : msg))
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clear history
  const handleClearHistory = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
  };

  // Handle key press (Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`fixed z-50 font-sans select-none transition-all duration-300 ${
        isOpen
          ? 'bottom-3 right-3 sm:bottom-6 sm:right-6'
          : isLessonPage
          ? 'bottom-20 sm:bottom-24 right-3 sm:right-6'
          : 'bottom-4 sm:bottom-6 right-3 sm:right-6'
      }`}
    >
      {/* ================================================== */}
      {/* FLOATING TRIGGER MASCOT BUTTON                     */}
      {/* ================================================== */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Tanya CodeKids AI Tutor"
          className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer drop-shadow-xl hover:drop-shadow-2xl"
        >
          {/* Lottie 3D Mascot */}
          <div className="w-full h-full relative z-10 pointer-events-none">
            <DotLottieReact src={LOTTIE_MASCOT_URL} loop autoplay />
          </div>

          {/* Hover Tooltip Label */}
          <div className="absolute right-full mr-3 bg-[#17233C] text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none flex items-center gap-2 border border-slate-700/60">
            <RiCodeSSlashLine className="w-4 h-4 text-[#FFD84D]" />
            <span>Tanya Tutor Coding</span>
            <span className="w-2 h-2 rounded-full bg-[#42C88A] animate-pulse" />
          </div>
        </button>
      )}

      {/* ================================================== */}
      {/* CHATBOT WIDGET WINDOW                              */}
      {/* ================================================== */}
      {isOpen && (
        <div className="w-[calc(100vw-1.5rem)] sm:w-[420px] h-[640px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* ------------------------------------------------ */}
          {/* VIBRANT BRAND HEADER                             */}
          {/* ------------------------------------------------ */}
          <div className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] text-white px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between shrink-0 shadow-md relative overflow-hidden">
            {/* Subtle background glow/shapes */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute left-1/3 -top-6 w-20 h-20 bg-white/10 rounded-full blur-lg pointer-events-none" />

            {/* Left: Brand Title & Badges */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 relative z-10">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <DotLottieReact src={LOTTIE_MASCOT_URL} loop autoplay />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm sm:text-base tracking-tight text-white font-[family-name:var(--font-fredoka)] flex items-center gap-1 whitespace-nowrap">
                    <span className="text-white">Code</span>
                    <span className="text-[#FFD84D]">Kids</span>
                    <span className="text-white ml-0.5 font-bold">AI Tutor</span>
                  </h3>
                  <span className="bg-[#BFDBFE] text-[#1E3A8A] text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                    CODING
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/95 font-semibold flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#00E676] inline-block shrink-0 shadow-2xs" />
                  <span>Siap Membantu Belajar Coding</span>
                </p>
              </div>
            </div>

            {/* Right: Window Controls (Clear, Minimize, Close) */}
            <div className="flex items-center gap-1.5 shrink-0 relative z-10">
              <button
                onClick={handleClearHistory}
                title="Bersihkan Percakapan"
                aria-label="Bersihkan Percakapan"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <RiBrushLine className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                aria-label="Minimize Chat"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <RiSubtractLine className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Tutup AI Chat"
                aria-label="Tutup AI Chat"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <RiCloseLine className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* CHAT BODY & WELCOME DASHBOARD                     */}
          {/* ------------------------------------------------ */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F0F4FA]">
            {/* Initial Welcome Dashboard Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-2xs space-y-4">
              {/* Greeting with Mascot Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                  <DotLottieReact src={LOTTIE_MASCOT_URL} loop autoplay />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#17233C] leading-snug">
                    Halo! 👋 Saya <span className="text-[#2563EB]">CodeKids AI</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-snug mt-0.5">
                    Tutor coding interaktifmu. Ada yang ingin kamu tanyakan hari ini?
                  </p>
                </div>
              </div>

              {/* Category Grid ("Kamu bisa bertanya seputar:") */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17233C]">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <RiLightbulbFill className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span>Kamu bisa bertanya seputar:</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {CATEGORY_CARDS.map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSendMessage(cat.prompt)}
                        className={`flex items-start justify-between gap-1 p-3 rounded-2xl ${cat.bgColor} border ${cat.borderColor} transition-all text-left cursor-pointer group shadow-2xs hover:shadow-xs`}
                      >
                        <div className="space-y-1.5 flex-1 pr-1">
                          <div className={`w-8 h-8 rounded-xl ${cat.iconBg} flex items-center justify-center ${cat.iconColor}`}>
                            <CatIcon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-[#17233C] leading-tight">
                              {cat.title}
                            </h5>
                            <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                              {cat.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full ${cat.arrowBg} flex items-center justify-center ${cat.iconColor} shrink-0 group-hover:translate-x-0.5 transition-transform mt-0.5`}>
                          <RiArrowRightSLine className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Try Questions ("Pertanyaan yang bisa kamu coba:") */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17233C]">
                  <RiSparklingFill className="w-4 h-4 text-amber-400" />
                  <span>Pertanyaan yang bisa kamu coba:</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {TRY_QUESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      className="bg-[#F8FAFC] hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 rounded-2xl px-3.5 py-2.5 text-xs text-[#17233C] font-semibold text-left shadow-2xs hover:shadow-xs transition-all cursor-pointer leading-snug"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Conversation History */}
            {messages.slice(1).map((msg) => {
              const isUser = msg.role === 'user';
              if (!isUser && !msg.content.trim()) {
                return null;
              }

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Bot Avatar Icon */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-white border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs mt-0.5">
                      <DotLottieReact src={LOTTIE_MASCOT_URL} loop autoplay />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] text-xs sm:text-sm select-text transition-all ${isUser
                        ? 'bg-[#2563EB] text-white px-4 py-3 rounded-2xl rounded-tr-xs shadow-xs font-medium'
                        : 'bg-white border border-slate-200/90 text-[#17233C] p-4 rounded-2xl rounded-tl-xs shadow-xs'
                      }`}
                  >
                    {!isUser && (
                      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100 text-[11px] font-bold text-[#2563EB]">
                        <span className="flex items-center gap-1.5">
                          <RiSparklingFill className="w-3.5 h-3.5 text-amber-400" />
                          <span>OmniBot Tutor</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    )}

                    {isUser ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    ) : (
                      <LaTeXRenderer content={msg.content} />
                    )}

                    {isUser && (
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-blue-100/80 font-medium">
                        <span>
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <RiCheckDoubleLine className="w-3 h-3 text-blue-200" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                  <DotLottieReact src={LOTTIE_MASCOT_URL} loop autoplay />
                </div>
                <div className="bg-white border border-slate-200/90 px-4 py-3 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2.5">
                  <div className="w-5 h-5 relative shrink-0">
                    <DotLottieReact src={LOTTIE_MASCOT_URL} loop autoplay />
                  </div>
                  <span className="text-xs font-bold text-[#17233C] animate-pulse flex items-center gap-1">
                    <span>Sedang meracik penjelasan coding</span>
                    <span className="inline-block animate-bounce">...</span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ------------------------------------------------ */}
          {/* WIDGET FOOTER - CLEAN INPUT FORM                 */}
          {/* ------------------------------------------------ */}
          <div className="p-3 sm:p-3.5 bg-white border-t border-slate-200/80 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                title="Bantu debug error kode"
                onClick={() => handleSendMessage('Bantu perbaiki dan debug error pada kode saya')}
                className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <RiImageAddLine className="w-5 h-5" />
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya soal HTML, CSS, JS, Python..."
                disabled={isLoading}
                className="flex-1 bg-slate-100/90 border border-transparent focus:border-blue-400 focus:bg-white rounded-full px-4 py-2.5 sm:py-3 text-sm text-[#17233C] placeholder:text-slate-400 font-medium focus:outline-none transition-all disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Kirim Pesan"
                className="w-11 h-11 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white flex items-center justify-center shadow-md shadow-blue-500/25 transition-all duration-200 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer shrink-0"
              >
                <RiSendPlane2Fill className="w-5 h-5 transform rotate-45 -ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
