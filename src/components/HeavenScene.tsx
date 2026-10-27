import React, { useState, useEffect } from 'react';
import { sounds } from '../audio/soundManager';
import { ALL_CHEMICAL_FORMULAS, ChemicalFormulaItem } from '../data/allChemicalFormulas';
import { Sparkles, Cloud, Sun, RotateCcw, Atom, Utensils, Compass } from 'lucide-react';

interface HeavenSceneProps {
  onRestartGame: () => void;
  reason?: 'burned_by_long' | 'ascension';
}

export const HeavenScene: React.FC<HeavenSceneProps> = ({
  onRestartGame,
  reason = 'burned_by_long'
}) => {
  // "vô từ từ" - Slow gradual ethereal entrance state
  const [fadeStage, setFadeStage] = useState<'entering' | 'arrived'>('entering');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'kntt_core' | 'pho_culinary'>('all');
  const [activeFormula, setActiveFormula] = useState<ChemicalFormulaItem | null>(null);

  useEffect(() => {
    // Play ethereal celestial heaven chime
    sounds.playHeavenChime();

    // "Vô từ từ" - gradual dissolve into Heaven over 2.5 seconds (không vừa xong là tới liền)
    const timer = setTimeout(() => {
      setFadeStage('arrived');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const filteredFormulas =
    selectedCategory === 'all'
      ? ALL_CHEMICAL_FORMULAS
      : ALL_CHEMICAL_FORMULAS.filter((f) => f.category === selectedCategory);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 pointer-events-auto select-none overflow-y-auto"
      style={{
        // Ethereal celestial gradient: golden rays, pearlescent white clouds, soft celestial aura
        background:
          'radial-gradient(circle at 50% 25%, rgba(255, 248, 220, 0.98) 0%, rgba(254, 243, 199, 0.88) 35%, rgba(224, 242, 254, 0.92) 75%, rgba(186, 230, 253, 0.98) 100%)'
      }}
    >
      {/* Drifting soft ethereal clouds in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-white/80 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[600px] h-[400px] rounded-full bg-sky-200/60 blur-3xl" />
      </div>

      {/* "VÔ TỪ TỪ" ENTRANCE TRANSITION SCREEN (Khi đang từ từ bước vào Thiên Đàng, không vừa xong là tới liền) */}
      {fadeStage === 'entering' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-100/90 via-sky-100/95 to-amber-200/90 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col items-center max-w-md text-center gap-4 animate-celestial">
            <div className="p-4 rounded-full bg-amber-400/30 border border-amber-500/50 shadow-2xl">
              <Sun className="w-12 h-12 text-amber-700 animate-spin" style={{ animationDuration: '14s' }} />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-black tracking-widest text-amber-800 uppercase">
                ✨ VÔ TỪ TỪ • ĐANG TIẾN VÀO CÕI THIÊN ĐÀNG ✨
              </span>
              <h2 className="text-2xl font-black text-amber-950">
                Thanh Thản Bay Lên Cõi Bồng Lai
              </h2>
              <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                Sau khi đóng cửa quán phở, làn khói sương mờ ảo dịu dàng nâng bước Hải cùng Cậu Vàng bay lên trời cao...
              </p>
            </div>

            {/* Smooth 2.5s progress bar */}
            <div className="w-64 h-2 bg-amber-950/15 rounded-full overflow-hidden p-0.5 border border-amber-800/20 shadow-inner">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full animate-progress-fill" />
            </div>
            <span className="text-[11px] font-mono text-amber-900/70 italic">
              Đang từ từ mở lối cõi tiên (vô từ từ...)...
            </span>
          </div>
        </div>
      )}

      {/* TOP: PURE FLOATING TITLE TEXT (KHÔNG CÓ BẢNG, CHỈ CÓ CHỮ TRÊN CẢNH 3D / THIÊN ĐÀNG) */}
      <header className="relative z-10 flex flex-col items-center text-center mt-3 max-w-3xl">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs tracking-widest uppercase mb-1 drop-shadow-sm">
          <Sun className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '20s' }} />
          <span>CÕI BỒNG LAI THIÊN ĐÀNG • GIẢI THOÁT THANH BÌNH</span>
          <Cloud className="w-4 h-4 text-sky-600" />
        </div>

        {/* Pure floating title (cái bảng mất chỉ có chữ) */}
        <h1 className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight drop-shadow-md">
          {reason === 'burned_by_long'
            ? 'Hải & Cậu Vàng Đã Lên Thiên Đàng'
            : 'Đỉnh Cao Giác Ngộ Thiên Đàng'}
        </h1>

        {/* Pure floating story summary */}
        <p className="mt-2 text-sm sm:text-base text-neutral-800 font-semibold leading-relaxed drop-shadow-sm max-w-2xl">
          {reason === 'burned_by_long' ? (
            <>
              Sau câu nói bất hủ <span className="font-black text-amber-900">"Mẹo mày bé!"</span> đóng sập cửa quán, Anh Long cay cú châm lửa thiêu rụi quán phở. Không còn phải bận tâm chuyện trần thế, Hải cùng chú chó Cậu Vàng trung thành từ từ bay lên cõi Thiên Đàng an nhàn...
            </>
          ) : (
            <>
              Giữa cõi mây trắng ngập tràn ánh hào quang vàng óng, không còn lo toan tiền bảo kê hay kẻ ác...
            </>
          )}
        </p>

        <p className="mt-1 text-xs sm:text-sm text-amber-900 font-bold italic drop-shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Lưu giữ đầy đủ tất cả các công thức hóa học KNTT & tinh hoa nồi phở gia truyền:</span>
        </p>

        {/* Minimalist filter pills (chỉ có chữ & nút bấm nhẹ, không bảng cồng kềnh) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-900 text-white shadow-md scale-105'
                : 'bg-white/60 hover:bg-white text-neutral-800 border border-amber-900/10'
            }`}
          >
            Tất Cả ({ALL_CHEMICAL_FORMULAS.length} Công Thức)
          </button>
          <button
            onClick={() => setSelectedCategory('kntt_core')}
            className={`flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'kntt_core'
                ? 'bg-indigo-900 text-white shadow-md scale-105'
                : 'bg-white/60 hover:bg-white text-neutral-800 border border-indigo-900/10'
            }`}
          >
            <Atom className="w-3.5 h-3.5 text-indigo-500" /> Hóa Học KNTT (S, C%, CM, n, V, d...)
          </button>
          <button
            onClick={() => setSelectedCategory('pho_culinary')}
            className={`flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'pho_culinary'
                ? 'bg-emerald-900 text-white shadow-md scale-105'
                : 'bg-white/60 hover:bg-white text-neutral-800 border border-emerald-900/10'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-emerald-600" /> Hóa Học Nồi Phở (Umami, Gelatin, Maillard...)
          </button>
        </div>
      </header>

      {/* MIDDLE: FLOATING CARDS OF ALL CHEMICAL FORMULAS (TRONG SUỐT, NHẸ NHÀNG, DỄ NHÌN) */}
      <main className="relative z-10 w-full max-w-5xl my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredFormulas.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveFormula(item)}
            className="group relative p-3.5 rounded-2xl bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-mono">
                  {item.symbol}
                </span>
                {item.unit && (
                  <span className="text-[10px] text-neutral-600 font-mono italic">
                    {item.unit}
                  </span>
                )}
              </div>

              <h2 className="text-xs font-extrabold text-neutral-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                {item.name}
              </h2>

              {/* Mathematical Formula High-visibility Box */}
              <div className="my-2 p-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-center font-mono font-black text-sm text-amber-950 tracking-wide shadow-inner">
                {item.formula}
              </div>

              <p className="text-[11px] text-neutral-700 leading-snug line-clamp-2">
                {item.explanation}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-amber-900/10 text-[10px] text-amber-900 font-semibold flex items-center gap-1">
              <span>🍜</span>
              <span className="truncate">{item.culinaryContext}</span>
            </div>
          </div>
        ))}
      </main>

      {/* POPUP DETAIL MODAL IF A FORMULA IS CLICKED */}
      {activeFormula && (
        <div
          onClick={() => setActiveFormula(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md p-6 rounded-3xl bg-white/95 border-2 border-amber-400 shadow-2xl text-neutral-900 flex flex-col gap-3 animate-scaleUp"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 font-mono">
                {activeFormula.symbol}
              </span>
              <button
                onClick={() => setActiveFormula(null)}
                className="text-neutral-500 hover:text-black font-bold text-sm cursor-pointer"
              >
                ✕ Đóng
              </button>
            </div>

            <h3 className="text-base font-black text-amber-950">
              {activeFormula.name}
            </h3>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-center font-mono font-black text-base text-amber-950 shadow-inner">
              {activeFormula.formula}
            </div>

            <div className="text-xs leading-relaxed text-neutral-800">
              <strong>Ý nghĩa khoa học:</strong> {activeFormula.explanation}
            </div>

            <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300/60 text-xs text-amber-950 leading-relaxed">
              <strong>Ứng dụng ẩm thực & điều tra:</strong> {activeFormula.culinaryContext}
            </div>

            <button
              onClick={() => setActiveFormula(null)}
              className="mt-1 w-full py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs cursor-pointer shadow"
            >
              Đã hiểu công thức
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM: Minimalist Floating Return Button (CHỈ CÓ CHỮ VÀ NÚT BẤM, KHÔNG CÓ BẢNG ĐEN) */}
      <footer className="relative z-10 flex flex-col items-center gap-2 mb-2">
        <button
          onClick={onRestartGame}
          className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-all cursor-pointer border border-amber-300/40"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
          <span>🕊️ Thanh Thản Trở Về Menu & Chơi Lại Từ Đầu (Ngày 1)</span>
        </button>

        <span className="text-[11px] text-amber-900/80 font-medium italic drop-shadow-sm">
          *Lần sau nhớ thối đúng tiền, học chắc công thức và chuẩn bị tuyệt kỹ đối phó Anh Long nhé!*
        </span>
      </footer>
    </div>
  );
};
