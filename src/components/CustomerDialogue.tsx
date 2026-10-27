import React, { useState } from 'react';
import { DayCustomerFlow } from '../data/storyDialogue';
import { CHARACTERS } from '../data/characters';
import { sounds } from '../audio/soundManager';
import { Utensils, MessageSquare, Atom, ChevronRight } from 'lucide-react';

interface CustomerDialogueProps {
  customerFlow: DayCustomerFlow;
  onStartCooking: () => void;
  onOpenChemistry?: (qId: string) => void;
  chemistryAnswered?: boolean;
}

export const CustomerDialogue: React.FC<CustomerDialogueProps> = ({
  customerFlow,
  onStartCooking,
  onOpenChemistry,
  chemistryAnswered = false
}) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showFormulaHelper, setShowFormulaHelper] = useState(false);

  const character = CHARACTERS[customerFlow.characterId] || {
    name: customerFlow.order.customerName,
    role: 'Khách hàng',
    avatarColor: 'bg-emerald-600'
  };

  const dialogues = customerFlow.beforeDialogue;
  const currentLine = dialogues[dialogueIndex];

  const handleNextDialogue = () => {
    sounds.playDialogueBleep();
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      sounds.playBoil();
      onStartCooking();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center gap-2 select-none pointer-events-auto">
      {/* Discreet floating formula helper if toggled */}
      {showFormulaHelper && (
        <div className="w-full p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-neutral-200 animate-fadeIn font-mono">
          <span className="font-bold text-amber-300 text-[10px] font-sans">Công Thức KNTT:</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            S = (m_ct/m_H2O)×100
          </span>
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            C% = (m_ct/m_dd)×100%
          </span>
          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            C_M = n/V
          </span>
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            n = m/M
          </span>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            V = n×24,79
          </span>
          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Umami: C5H8NO4⁻
          </span>
        </div>
      )}

      {/* MINIMALIST CINEMA SUBTITLE BAR (CHỈ CÓ CHỮ KHI NÓI, KHÔNG CÓ BẢNG CỒNG KỀNH) */}
      <div
        onClick={handleNextDialogue}
        className="w-full bg-black/55 backdrop-blur-md border border-white/15 hover:border-amber-400/40 px-5 py-3.5 rounded-2xl shadow-2xl text-neutral-100 flex flex-col gap-2 transition-all cursor-pointer"
      >
        {/* Speaker Name Pill & Order Summary */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${character.avatarColor}`} />
            <span className="font-extrabold text-amber-300">{currentLine.speaker}</span>
            <span className="text-[10px] text-neutral-400">({character.role})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFormulaHelper(!showFormulaHelper);
              }}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-1 cursor-pointer"
              title="Xem nhanh công thức S, C%, CM"
            >
              <Atom className="w-3 h-3 text-indigo-400" /> S, C%, C_M
            </button>
            <span className="text-[11px] text-emerald-400 font-mono font-semibold">
              {customerFlow.order.totalPrice.toLocaleString()} đ
            </span>
          </div>
        </div>

        {/* Clean floating subtitle text */}
        <p className="text-sm font-medium text-neutral-100 leading-relaxed drop-shadow-md">
          "{currentLine.text}"
        </p>

        {/* Order note preview & Action Button */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-neutral-300 truncate max-w-[65%] text-[11px]">
            🍜 <strong>Món gọi:</strong> {customerFlow.order.note}
          </span>

          <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white font-bold text-xs shadow-md">
            {dialogueIndex < dialogues.length - 1 ? (
              <>Tiếp tục <ChevronRight className="w-3.5 h-3.5" /></>
            ) : (
              <>Hiện Bếp Làm Phở <Utensils className="w-3.5 h-3.5" /></>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
