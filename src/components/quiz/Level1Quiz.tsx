'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LEVEL_1_QUIZ, QuizQuestionData } from '@/content/level1Data';
import { saveTopicProgress } from '@/lib/storage';
import CourseCertificateClaim from '@/components/certificate/CourseCertificateClaim';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, BookOpen, LayoutGrid, GraduationCap, Sparkles } from 'lucide-react';

interface Level1QuizProps {
  onReturnToLesson: () => void;
}

export default function Level1Quiz({ onReturnToLesson }: Level1QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion: QuizQuestionData = LEVEL_1_QUIZ[currentIndex];
  const totalQuestions = LEVEL_1_QUIZ.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered) return;

    setSelectedKey(key);
    setIsAnswered(true);

    const isCorrect = key === currentQuestion.correctKey;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (isLastQuestion) {
      // Calculate final score
      const finalScore = score;
      setQuizFinished(true);

      // Save progress to localStorage
      saveTopicProgress('level-1', {
        status: 'completed',
        quizScore: finalScore,
        quizCompleted: true,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedKey(null);
      setIsAnswered(false);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedKey(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers({});
    setQuizFinished(false);
  };

  // =========================================================
  // QUIZ RESULT / CERTIFICATE CLAIM SCREEN
  // =========================================================
  if (quizFinished) {
    return (
      <CourseCertificateClaim
        courseId="level-1"
        courseName="Apa Itu Coding?"
      />
    );
  }

  // =========================================================
  // ACTIVE QUESTION SCREEN
  // =========================================================
  const isCurrentCorrect = selectedKey === currentQuestion.correctKey;

  return (
    <div className="w-full max-w-2xl mx-auto my-4 sm:my-6 py-2">
      {/* Header & Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#718096] mb-2">
          <span>Soal {currentIndex + 1} dari {totalQuestions}</span>
          <span className="text-[#4F7DF3]">Level 01</span>
        </div>
        {/* Progress Line */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4F7DF3] transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-lg sm:text-xl font-extrabold text-[#17233C] mb-6 leading-snug">
        {currentQuestion.question}
      </h3>

      {/* 4 Interactive Option Cards */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((opt) => {
          const isSelected = selectedKey === opt.key;
          const isCorrect = opt.key === currentQuestion.correctKey;

          let btnStyles = 'border-2 border-slate-200 bg-white text-[#17233C] hover:border-[#4F7DF3] hover:bg-[#F6F8FC]';

          if (isAnswered) {
            if (isCorrect) {
              btnStyles = 'border-2 border-[#42C88A] bg-[#E8F8F0] text-[#17233C] font-extrabold';
            } else if (isSelected && !isCorrect) {
              btnStyles = 'border-2 border-[#FF6B6B] bg-[#FEEFEF] text-[#17233C] font-extrabold';
            } else {
              btnStyles = 'border-2 border-slate-100 bg-slate-50 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={opt.key}
              onClick={() => handleSelectOption(opt.key)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-2xl text-left transition-all duration-200 min-h-[54px] flex items-center justify-between gap-3 text-sm sm:text-base font-bold active:scale-[0.99] ${btnStyles}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center shrink-0 ${
                  isSelected
                    ? isCorrect
                      ? 'bg-[#42C88A] text-white'
                      : 'bg-[#FF6B6B] text-white'
                    : isAnswered && isCorrect
                    ? 'bg-[#42C88A] text-white'
                    : 'bg-slate-100 text-[#4F7DF3]'
                }`}>
                  {opt.key}
                </span>
                <span>{opt.text}</span>
              </div>

              {/* Icon Status */}
              {isAnswered && (
                <div>
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-[#42C88A] shrink-0" />}
                  {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-[#FF6B6B] shrink-0" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Instant Feedback Banner & Next Button */}
      {isAnswered && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          {/* Feedback Card */}
          <div
            className={`p-4 rounded-2xl border-2 flex items-start gap-3 text-sm font-bold leading-relaxed ${
              isCurrentCorrect
                ? 'bg-[#E8F8F0] border-[#42C88A]/40 text-[#15803D]'
                : 'bg-[#FEEFEF] border-[#FF6B6B]/40 text-[#B91C1C]'
            }`}
          >
            {isCurrentCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-[#42C88A] shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-[#FF6B6B] shrink-0 mt-0.5" />
            )}
            <div>
              <p>
                {isCurrentCorrect
                  ? currentQuestion.explanation.correct
                  : currentQuestion.explanation.incorrect}
              </p>
            </div>
          </div>

          {/* Next Question / View Result Button */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#4F7DF3] hover:bg-[#3B68E0] text-white font-extrabold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{isLastQuestion ? 'Lihat Hasil' : 'Soal Berikutnya'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
