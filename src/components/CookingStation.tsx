import React, { useState, useEffect } from 'react';
import { PhoOrder, MeatType, ScallionOption, SideOption } from '../types/game';
import { sounds } from '../audio/soundManager';
import { RotateCcw, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

interface CookingStationProps {
  order: PhoOrder;
  onFinishCook: (isPerfect: boolean) => void;
  onCancel: () => void;
}

export const CookingStation: React.FC<CookingStationProps> = ({
  order,
  onFinishCook,
  onCancel
}) => {
  const [hasNoodles, setHasNoodles] = useState(false);
  const [selectedMeat, setSelectedMeat] = useState<MeatType | null>(null);
  const [selectedScallion, setSelectedScallion] = useState<ScallionOption | null>(null);
  const [hasBroth, setHasBroth] = useState(false);
  const [selectedSides, setSelectedSides] = useState<SideOption[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPickingUp, setIsPickingUp] = useState(false);

  // Helper to verify if the bowl is currently complete and correct
  const checkCompletion = (
    noodles: boolean,
    meat: MeatType | null,
    scallion: ScallionOption | null,
    broth: boolean,
    sides: SideOption[]
  ) => {
    if (!noodles || meat === null || scallion === null || !broth) return false;
    const meatMatches = meat === order.meat;
    const scallionMatches = scallion === order.scallion;
    const requiredSides = order.sides.filter((s) => s !== 'none');
    const sideMatches =
      requiredSides.length === sides.length &&
      requiredSides.every((s) => sides.includes(s));
    return meatMatches && scallionMatches && sideMatches;
  };

  const triggerInstantPickup = () => {
    setIsPickingUp(true);
    sounds.playCorrect();
    // Immediate pickup without waiting/timer
    setTimeout(() => {
      onFinishCook(true);
    }, 280);
  };

  const handleAddNoodles = () => {
    sounds.playBoil();
    setHasNoodles(true);
    setErrorMessage(null);
    if (checkCompletion(true, selectedMeat, selectedScallion, hasBroth, selectedSides)) {
      triggerInstantPickup();
    }
  };

  const handleSelectMeat = (type: MeatType) => {
    sounds.playBoil();
    setSelectedMeat(type);
    setErrorMessage(null);
    if (checkCompletion(hasNoodles, type, selectedScallion, hasBroth, selectedSides)) {
      triggerInstantPickup();
    }
  };

  const handleSelectScallion = (opt: ScallionOption) => {
    sounds.playLadle();
    setSelectedScallion(opt);
    setErrorMessage(null);
    if (checkCompletion(hasNoodles, selectedMeat, opt, hasBroth, selectedSides)) {
      triggerInstantPickup();
    }
  };

  const handleAddBroth = () => {
    sounds.playLadle();
    setHasBroth(true);
    setErrorMessage(null);
    if (checkCompletion(hasNoodles, selectedMeat, selectedScallion, true, selectedSides)) {
      triggerInstantPickup();
    }
  };

  const handleToggleSide = (side: SideOption) => {
    sounds.playLadle();
    const nextSides = selectedSides.includes(side)
      ? selectedSides.filter((s) => s !== side)
      : [...selectedSides, side];
    setSelectedSides(nextSides);
    if (checkCompletion(hasNoodles, selectedMeat, selectedScallion, hasBroth, nextSides)) {
      triggerInstantPickup();
    }
  };

  // Instant Quick-Cook: Complete accurately and pick up immediately!
  const handleQuickCookAndPickup = () => {
    sounds.playBoil();
    sounds.playLadle();
    setHasNoodles(true);
    setSelectedMeat(order.meat);
    setSelectedScallion(order.scallion);
    setHasBroth(true);
    setSelectedSides(order.sides.filter((s) => s !== 'none'));
    triggerInstantPickup();
  };

  const handleReset = () => {
    setHasNoodles(false);
    setSelectedMeat(null);
    setSelectedScallion(null);
    setHasBroth(false);
    setSelectedSides([]);
    setErrorMessage(null);
    setIsPickingUp(false);
  };

  const handleServeManual = () => {
    if (!hasNoodles) {
      setErrorMessage('Chưa trần bánh phở vào bát kìa đồng chí ơi!');
      return;
    }
    if (selectedMeat === null) {
      setErrorMessage('Vui lòng chọn loại thịt (hoặc chọn "Không thịt" cho phở không người lái)!');
      return;
    }
    if (selectedScallion === null) {
      setErrorMessage('Khách có dặn bỏ hành hay không hành? Hãy chọn hành lá!');
      return;
    }
    if (!hasBroth) {
      setErrorMessage('Phở mà không chan nước dùng sôi sùng sục thì ăn làm sao được!');
      return;
    }

    const meatMatches = selectedMeat === order.meat;
    const scallionMatches = selectedScallion === order.scallion;
    const requiredSides = order.sides.filter((s) => s !== 'none');
    const sideMatches =
      requiredSides.length === selectedSides.length &&
      requiredSides.every((s) => selectedSides.includes(s));

    if (!meatMatches || !scallionMatches || !sideMatches) {
      const mistakes: string[] = [];
      if (!meatMatches) {
        mistakes.push(`Thịt chưa đúng (Khách muốn: ${order.meat === 'tai' ? 'Phở Tái' : order.meat === 'chin' ? 'Phở Chín' : 'Phở Không Thịt'})`);
      }
      if (!scallionMatches) {
        mistakes.push(`Hành chưa đúng (Khách yêu cầu: ${order.scallion === 'no' ? 'KHÔNG HÀNH' : 'Có hành'})`);
      }
      if (!sideMatches) {
        mistakes.push(`Món kèm chưa chuẩn (Khách muốn: ${order.sides.join(', ') || 'Không lấy món kèm'})`);
      }
      setErrorMessage(`Bát phở chưa đúng vị! ${mistakes.join(' | ')}. Hãy chỉnh sửa lại!`);
      return;
    }

    triggerInstantPickup();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-neutral-900/95 border border-amber-600/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-neutral-100 flex flex-col gap-6">
      {/* Header and customer order note */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-4 gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-md border border-amber-500/30">
              Người Bán: Hải (Công An Chìm)
            </span>
            <span className="text-xs text-neutral-400">
              đang nấu phục vụ:
            </span>
          </div>
          <h2 className="text-xl font-bold text-amber-100 mt-1">
            Khách Hàng: <span className="text-amber-400">{order.customerName}</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            Yêu cầu món: <span className="text-amber-200 font-medium">{order.note}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick-cook & instant pick up button */}
          <button
            onClick={handleQuickCookAndPickup}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs rounded-lg transition-all shadow-md cursor-pointer"
            title="Làm bát phở chuẩn vị và cầm lên bưng ra ngay lập tức"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-200" /> Làm Chuẩn & Cầm Lên Liền
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition-colors border border-neutral-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Làm lại
          </button>
        </div>
      </div>

      {/* Main Assembly Area: Bowl Preview + Ingredient Shelves */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Visual Bowl Rendering */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-neutral-950/80 rounded-2xl border border-neutral-800 relative min-h-[260px]">
          <div
            className={`relative w-48 h-48 rounded-full border-4 ${
              isPickingUp
                ? 'border-emerald-400 scale-105 shadow-[0_0_25px_rgba(52,211,153,0.5)]'
                : 'border-cyan-800/60'
            } bg-gradient-to-b from-stone-900 to-stone-950 shadow-inner flex items-center justify-center overflow-hidden transition-all duration-300`}
          >
            {/* Broth */}
            {hasBroth && (
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-600/80 via-amber-700/80 to-yellow-800/90 animate-pulse" />
            )}

            {/* Noodles */}
            {hasNoodles ? (
              <div className="absolute inset-4 rounded-full flex flex-wrap items-center justify-center gap-1 p-2">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-amber-50 rounded-full"
                    style={{
                      width: `${20 + (i * 7) % 30}px`,
                      transform: `rotate(${(i * 35) % 180}deg)`
                    }}
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs text-neutral-600 italic">Bát trống chưa có bánh phở</span>
            )}

            {/* Meat */}
            {selectedMeat === 'tai' && (
              <div className="absolute top-8 left-10 flex gap-1 z-10">
                <div className="px-2.5 py-1 bg-rose-600/90 text-[10px] text-white rounded font-bold shadow-md transform -rotate-6">
                  Thịt Bò Tái
                </div>
                <div className="px-2 py-0.5 bg-rose-500/90 text-[9px] text-white rounded font-semibold transform rotate-12">
                  Tái Hồng
                </div>
              </div>
            )}
            {selectedMeat === 'chin' && (
              <div className="absolute top-8 left-10 flex gap-1 z-10">
                <div className="px-2.5 py-1 bg-amber-900/90 text-[10px] text-amber-200 rounded font-bold shadow-md transform -rotate-3 border border-amber-800">
                  Thịt Bò Chín Nạm
                </div>
              </div>
            )}

            {/* Scallions */}
            {selectedScallion === 'yes' && (
              <div className="absolute bottom-8 right-8 flex flex-wrap gap-1 max-w-[70px] z-10">
                {[...Array(6)].map((_, idx) => (
                  <span
                    key={idx}
                    className="w-2 h-2 rounded-full bg-emerald-500 border border-emerald-300"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Instant feedback when bowl is complete */}
          {isPickingUp && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-bounce">
              <CheckCircle2 className="w-4 h-4" /> Bát phở đã xong! Đang cầm lên bưng ra cho khách liền!
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {selectedSides.includes('quay') && (
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs rounded border border-amber-500/40 font-medium">
                🥖 Dĩa quẩy giòn
              </span>
            )}
            {selectedSides.includes('com') && (
              <span className="px-2.5 py-1 bg-neutral-200/20 text-neutral-100 text-xs rounded border border-neutral-400/40 font-medium">
                🍚 Bát cơm trắng
              </span>
            )}
          </div>
        </div>

        {/* Step-by-Step Ingredient Controls */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Step 1: Noodles */}
          <div className="bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-700/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-400 font-bold block">BƯỚC 1: BÁNH PHỞ</span>
              <span className="text-sm font-medium text-neutral-200">Trần bánh phở tươi qua nước sôi</span>
            </div>
            <button
              onClick={handleAddNoodles}
              disabled={hasNoodles}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                hasNoodles
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow'
              }`}
            >
              {hasNoodles ? '✓ Đã Cho Bánh Phở' : '+ Cho Bánh Phở'}
            </button>
          </div>

          {/* Step 2: Meat Type */}
          <div className="bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-700/60">
            <span className="text-xs text-amber-400 font-bold block mb-2">BƯỚC 2: CHỌN THỊT BÒ</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSelectMeat('tai')}
                className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer ${
                  selectedMeat === 'tai'
                    ? 'bg-rose-700 text-white border-rose-500 ring-2 ring-rose-400'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                }`}
              >
                🥩 Bò Tái
              </button>
              <button
                onClick={() => handleSelectMeat('chin')}
                className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer ${
                  selectedMeat === 'chin'
                    ? 'bg-amber-800 text-white border-amber-600 ring-2 ring-amber-400'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                }`}
              >
                🍖 Bò Chín Nạm
              </button>
              <button
                onClick={() => handleSelectMeat('none')}
                className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer ${
                  selectedMeat === 'none'
                    ? 'bg-cyan-800 text-white border-cyan-600 ring-2 ring-cyan-400'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                }`}
              >
                🚫 Không Thịt
              </button>
            </div>
          </div>

          {/* Step 3: Scallions */}
          <div className="bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-700/60">
            <span className="text-xs text-amber-400 font-bold block mb-2">BƯỚC 3: HÀNH HOA / KHÔNG HÀNH</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectScallion('yes')}
                className={`py-2 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer ${
                  selectedScallion === 'yes'
                    ? 'bg-emerald-700 text-white border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                }`}
              >
                🌿 Cho Hành Hoa
              </button>
              <button
                onClick={() => handleSelectScallion('no')}
                className={`py-2 text-xs rounded-lg font-medium border text-center transition-all cursor-pointer ${
                  selectedScallion === 'no'
                    ? 'bg-neutral-700 text-amber-300 border-amber-500 ring-2 ring-amber-400'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                }`}
              >
                ❌ KHÔNG BỎ HÀNH
              </button>
            </div>
          </div>

          {/* Step 4: Broth & Sides */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-700/60 flex flex-col justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold block">BƯỚC 4: NƯỚC DÙNG</span>
                <span className="text-xs text-neutral-400">Ninh xương quế hồi thơm nồng</span>
              </div>
              <button
                onClick={handleAddBroth}
                disabled={hasBroth}
                className={`mt-2 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  hasBroth
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 cursor-default'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                {hasBroth ? '✓ Đã Chan Nước Dùng' : '🍲 Chan Nước Dùng'}
              </button>
            </div>

            <div className="bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-700/60">
              <span className="text-xs text-amber-400 font-bold block mb-1.5">MÓN KÈM (NẾU CÓ)</span>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => handleToggleSide('quay')}
                  className={`py-1 text-xs rounded font-medium border text-center transition-all cursor-pointer ${
                    selectedSides.includes('quay')
                      ? 'bg-amber-600 text-white border-amber-400'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                  }`}
                >
                  🥖 Dĩa Quẩy (+10k)
                </button>
                <button
                  onClick={() => handleToggleSide('com')}
                  className={`py-1 text-xs rounded font-medium border text-center transition-all cursor-pointer ${
                    selectedSides.includes('com')
                      ? 'bg-stone-600 text-white border-stone-400'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                  }`}
                >
                  🍚 Bát Cơm Trắng (+10k)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error alert if wrong */}
      {errorMessage && (
        <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-300 text-xs font-medium">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 text-xs rounded-xl font-medium transition-colors cursor-pointer"
        >
          Quay lại bàn
        </button>

        <button
          onClick={handleServeManual}
          disabled={isPickingUp}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" /> Cầm Bát Phở Lên Liền (Bưng Cho Khách)
        </button>
      </div>
    </div>
  );
};
