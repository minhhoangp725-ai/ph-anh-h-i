import React, { useState, useRef, useEffect } from 'react';
import { ChemistryQuestion } from '../types/game';
import { sounds } from '../audio/soundManager';
import { Atom, CheckCircle, XCircle, Lightbulb, Award, ArrowDownCircle, BookOpen } from 'lucide-react';

interface ChemistryModalProps {
  question: ChemistryQuestion;
  onAnswerComplete: (isCorrect: boolean, reward: number) => void;
}

export const ChemistryModal: React.FC<ChemistryModalProps> = ({
  question,
  onAnswerComplete
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    sounds.playDialogueBleep();
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null || isSubmitted) return;
    setIsSubmitted(true);

    const chosen = question.options[selectedIdx];
    if (chosen.isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playPunch();
    }

    // Smoothly scroll down to the explanation section so player sees the answer
    setTimeout(() => {
      if (explanationRef.current) {
        explanationRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
  };

  const handleContinue = () => {
    if (selectedIdx === null) return;
    const isCorrect = question.options[selectedIdx].isCorrect;
    onAnswerComplete(isCorrect, isCorrect ? question.rewardCash : 0);
  };

  const correctOption = question.options.find((o) => o.isCorrect);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full max-w-xl mx-auto bg-neutral-900/95 border-2 border-indigo-500/50 rounded-3xl p-6 shadow-2xl backdrop-blur-md text-neutral-100 flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 sticky top-0 bg-neutral-900/95 z-10">
        <div className="flex items-center gap-2">
          <Atom className="w-5 h-5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <h2 className="text-base font-bold text-indigo-200">
            Hóa Học Kết Nối Tri Thức (Giữa Kì 1)
          </h2>
        </div>
        <span className="text-xs px-2.5 py-1 bg-indigo-500/20 text-indigo-300 font-semibold rounded-md border border-indigo-500/30">
          +{question.rewardCash.toLocaleString()} đ thưởng
        </span>
      </div>

      {/* Question Text */}
      <div className="bg-neutral-950/90 p-4 rounded-2xl border border-neutral-800 text-sm leading-relaxed text-neutral-200 font-medium">
        {question.question}
      </div>

      {/* Formula Hint */}
      {question.formulaHint && (
        <div className="flex items-start gap-2 p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Gợi ý công thức SGK:</strong> {question.formulaHint}
          </div>
        </div>
      )}

      {/* Bộ Công Thức KNTT: S, C%, CM, n, V */}
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-mono">
        <span className="text-emerald-300 font-semibold">S = (m_ct/m_H2O)×100</span>
        <span className="text-cyan-300 font-semibold">C% = (m_ct/m_dd)×100%</span>
        <span className="text-rose-300 font-semibold">C_M = n/V</span>
        <span className="text-amber-300 font-semibold">V = n×24,79</span>
      </div>

      {/* Options list */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Chọn 1 phương án đúng:
        </span>
        {question.options.map((opt, idx) => {
          let btnStyle = 'bg-neutral-800/80 hover:bg-neutral-700/80 border-neutral-700 text-neutral-200';
          if (selectedIdx === idx) {
            btnStyle = 'bg-indigo-600/40 border-indigo-400 text-white ring-2 ring-indigo-500/50';
          }
          if (isSubmitted) {
            if (opt.isCorrect) {
              btnStyle = 'bg-emerald-700/50 border-emerald-400 text-emerald-200';
            } else if (selectedIdx === idx && !opt.isCorrect) {
              btnStyle = 'bg-rose-800/50 border-rose-500 text-rose-200';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {opt.label}
                </span>
                <span>{opt.text}</span>
              </div>
              {isSubmitted && opt.isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
              {isSubmitted && selectedIdx === idx && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Submit button when not yet submitted */}
      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={selectedIdx === null}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Kiểm Tra & Xem Lời Giải Đáp Án</span>
          <ArrowDownCircle className="w-4 h-4" />
        </button>
      )}

      {/* DETAILED ANSWER & EXPLANATION (SCROLL DOWN TO VIEW) */}
      {isSubmitted && selectedIdx !== null && (
        <div
          ref={explanationRef}
          className="flex flex-col gap-4 pt-2 border-t border-neutral-800 animate-fadeIn"
        >
          {/* Scroll down notice indicator */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 py-1.5 px-3 rounded-lg">
            <ArrowDownCircle className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Đã tính xong! Kéo xuống dưới để xem chi tiết đáp án & lời giải từng bước</span>
          </div>

          {/* Result card */}
          <div
            className={`p-4 rounded-2xl border text-sm leading-relaxed ${
              question.options[selectedIdx].isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between font-extrabold text-base mb-2">
              <span>
                {question.options[selectedIdx].isCorrect
                  ? '🎉 Bạn Đã Trả Lời Chính Xác!'
                  : '❌ Chưa Đúng! Hãy Xem Đáp Án Chuẩn Dưới Đây:'}
              </span>
              <span className="px-2 py-0.5 rounded text-xs bg-black/40 border border-white/20">
                Đáp án đúng: <strong>{correctOption?.label} ({correctOption?.text})</strong>
              </span>
            </div>

            <div className="mt-2 text-neutral-200 text-xs">
              <strong>Giải thích của đáp án bạn chọn:</strong> {question.options[selectedIdx].explanation}
            </div>

            {/* Detailed calculation box */}
            <div className="mt-3 p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex flex-col gap-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Lời giải chi tiết SGK Kết Nối Tri Thức:
              </div>
              <div className="text-amber-200 font-mono bg-neutral-900 p-2 rounded border border-neutral-800">
                {correctOption?.explanation}
              </div>
              {question.formulaHint && (
                <div className="text-neutral-400 text-[11px] mt-1">
                  💡 <strong>Ghi nhớ:</strong> {question.formulaHint}
                </div>
              )}
            </div>

            {question.clueUnlock && question.options[selectedIdx].isCorrect && (
              <div className="mt-3 pt-2.5 border-t border-emerald-500/30 flex items-center gap-2 text-amber-300 font-semibold text-xs">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{question.clueUnlock}</span>
              </div>
            )}
          </div>

          {/* Action button to continue */}
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Đã Hiểu Đáp Án! Tiếp Tục Chuyên Án →
          </button>
        </div>
      )}
    </div>
  );
};
