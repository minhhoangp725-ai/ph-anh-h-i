import React, { useState, useEffect } from 'react';
import { sounds } from '../audio/soundManager';
import { ALL_CHEMICAL_FORMULAS, ChemicalFormulaItem } from '../data/allChemicalFormulas';
import { Zap, Atom, ChevronRight, Sparkles, X, Eye, Footprints } from 'lucide-react';

interface NightclubInfiltrationModalProps {
  onStartFight: () => void;
}

export const NightclubInfiltrationModal: React.FC<NightclubInfiltrationModalProps> = ({
  onStartFight
}) => {
  const [step, setStep] = useState<number>(0);
  // "vô từ từ" - Slow gradual entry state (không vừa xong là tới liền)
  const [fadeStage, setFadeStage] = useState<'entering' | 'arrived'>('entering');
  const [showFormulaDrawer, setShowFormulaDrawer] = useState<boolean>(false);
  const [selectedFormula, setSelectedFormula] = useState<ChemicalFormulaItem | null>(null);

  useEffect(() => {
    // Play subtle atmospheric chime
    sounds.playHeavenChime();

    // "Vô từ từ" - gradual entrance transition over 2.6 seconds (không nhảy ngay tức thì)
    const timer = setTimeout(() => {
      setFadeStage('arrived');
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      speaker: 'Hải (Chiến Sĩ Đặc Nhiệm)',
      text: 'Tiếng nhạc dập rung chuyển màn đêm, ánh đèn laser xanh tím quét loang loáng... Sau khi vượt bao dặm đường, cuối cùng ta đã từ từ thâm nhập vào tận sào huyệt Động Thiên Đàng!'
    },
    {
      speaker: 'Phú Bà (Bà Trùm Động Thiên Đàng)',
      text: 'Ha ha ha! Chú em Hải bán phở đẹp zzai đến rồi đấy à~ Vào đây cạn với chị một ly rượu ngoại, rồi đem bí kíp hóa học gia nhập đường dây kiếm tiền tỉ cùng chị!'
    },
    {
      speaker: 'Hải (Ánh Mắt Đanh Thép)',
      text: 'Xin lỗi Phú Bà! Tôi đến Thiên Đàng không phải để thông đồng với tội phạm. Mọi công thức hóa học tôi học được là để phục vụ nhân dân, không phải để làm ăn phi pháp! Bà hãy đầu hàng đi!'
    },
    {
      speaker: 'Phú Bà (Gầm Lên Giận Dữ)',
      text: 'CÁI GÌ?! Rượu mời không uống lại đòi uống rượu phạt à?! Long đâu! Ra tẩn cho thằng bán phở này một trận nhừ tử rồi quẳng xuống sông cho tao!'
    }
  ];

  const handleNext = () => {
    sounds.playDialogueBleep();
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      sounds.playPunch();
      onStartFight();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col justify-between min-h-[500px] pointer-events-auto select-none">
      {/* "VÔ TỪ TỪ" VISIBLE ENTRANCE TRANSITION (Khi đang từ từ bước vào Thiên Đàng, không vừa xong là tới liền) */}
      {fadeStage === 'entering' ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col items-center max-w-md text-center gap-4">
            <div className="p-4 rounded-full bg-purple-500/20 border border-purple-400/40 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              <Footprints className="w-10 h-10 text-purple-300 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-black tracking-widest text-fuchsia-400 uppercase">
                🌙 VÔ TỪ TỪ • ĐANG TIẾN VÀO ĐỘNG THIÊN ĐÀNG... 🌙
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                Bí Mật Thâm Nhập Tụ Điểm Ngầm
              </h2>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                Sau lời mời của Phú Bà, Hải giữ vẻ ngoài điềm tĩnh, từng bước thận trọng thâm nhập vào sào huyệt Thiên Đàng...
              </p>
            </div>

            {/* Smooth 2.6s progress bar */}
            <div className="w-64 h-2 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-purple-500/30 shadow-inner">
              <div className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full animate-progress-fill" />
            </div>
            <span className="text-[11px] font-mono text-purple-300/80 italic">
              Đang vượt qua lớp bảo vệ VIP (vô từ từ...)...
            </span>
          </div>
        </div>
      ) : (
        /* KHI TỚI THIÊN ĐÀNG: CÁI BẢNG MẤT CHỈ CÓ CHỮ & CHO LẠI TẤT CẢ CÔNG THỨC HÓA HỌC TRÊN */
        <div className="w-full flex flex-col justify-between min-h-[500px] animate-fadeIn">
          {/* TOP FLOATING SECTION: TẤT CẢ CÁC CÔNG THỨC HÓA HỌC TRÊN (KHÔNG CÓ BẢNG, CHỈ CÓ CHỮ & NÚT TRONG SUỐT) */}
          <div className="flex flex-col items-center gap-2 pt-2 z-20">
            {/* Floating Header Text */}
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-ping" />
                <span className="text-xs font-black tracking-wider text-fuchsia-300 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  ⚡ ĐÃ TỚI THIÊN ĐÀNG • TỤ ĐIỂM NGẦM ⚡
                </span>
              </div>

              <button
                onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 text-indigo-200 border border-indigo-400/40 backdrop-blur-md text-xs font-bold transition-all cursor-pointer shadow-lg"
              >
                <Atom className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '10s' }} />
                <span>{showFormulaDrawer ? 'Ẩn Công Thức' : 'Tất Cả Công Thức Hóa Học Trên'} ({ALL_CHEMICAL_FORMULAS.length})</span>
              </button>
            </div>

            {/* FLOATING QUICK FORMULAS BAR (S, C%, CM, n=m/M, V=n×24,79, Umami...) - CHỈ CÓ CHỮ VÀ CHIP TRONG SUỐT */}
            <div className="w-full flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {ALL_CHEMICAL_FORMULAS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedFormula(item)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-amber-400/70 text-[11px] font-mono text-neutral-200 transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md shadow-md"
                >
                  <span className="font-black text-amber-300">{item.symbol}:</span>
                  <span className="text-cyan-200 truncate max-w-[140px]">{item.formula}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FULL FORMULA DRAWER EXPANSION IF TOGGLED */}
          {showFormulaDrawer && (
            <div className="z-30 my-2 p-4 rounded-3xl bg-black/85 backdrop-blur-xl border border-purple-500/40 shadow-2xl animate-fadeIn max-h-[280px] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-white/15 mb-3">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Atom className="w-4 h-4 text-cyan-400" />
                  Toàn Bộ 12 Công Thức Hóa Học KNTT & Ẩm Thực Phở
                </span>
                <button
                  onClick={() => setShowFormulaDrawer(false)}
                  className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {ALL_CHEMICAL_FORMULAS.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFormula(f)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all"
                  >
                    <div className="flex justify-between items-center text-amber-300 font-bold mb-1">
                      <span>{f.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 font-mono">{f.symbol}</span>
                    </div>
                    <div className="font-mono text-cyan-300 bg-black/50 p-1 rounded text-center my-1 text-[11px] font-bold">
                      {f.formula}
                    </div>
                    <div className="text-[10px] text-neutral-400 line-clamp-1">{f.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DETAILED FORMULA MODAL IF CLICKED */}
          {selectedFormula && (
            <div
              onClick={() => setSelectedFormula(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md p-5 rounded-2xl bg-neutral-900/95 border border-amber-400/50 shadow-2xl text-neutral-100 flex flex-col gap-3 animate-scaleUp"
              >
                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                  <span className="text-xs font-bold text-amber-300 font-mono px-2 py-0.5 rounded bg-amber-500/20">
                    {selectedFormula.symbol}
                  </span>
                  <button
                    onClick={() => setSelectedFormula(null)}
                    className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                  >
                    ✕ Đóng
                  </button>
                </div>

                <div className="text-sm font-bold text-neutral-100">{selectedFormula.name}</div>
                <div className="p-2.5 rounded-xl bg-black/80 border border-cyan-500/40 font-mono font-bold text-center text-cyan-300 text-sm">
                  {selectedFormula.formula}
                </div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  <strong>Ý nghĩa:</strong> {selectedFormula.explanation}
                </div>
                <div className="text-xs text-amber-200/90 leading-relaxed bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                  <strong>Ứng dụng:</strong> {selectedFormula.culinaryContext}
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM SECTION: "CÁI BẢNG MẤT CHỈ CÓ CHỮ" - PURE FLOATING TYPOGRAPHY (KHÔNG CÓ BẢNG CỒNG KỀNH!) */}
          <div
            onClick={handleNext}
            className="w-full flex flex-col items-center text-center gap-3 pb-6 z-20 cursor-pointer group"
          >
            {/* Floating Speaker Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-black tracking-wide text-amber-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{steps[step].speaker}</span>
            </div>

            {/* Pure Floating Dialogue Text (Chỉ có chữ, nổi bật trên cảnh 3D không bị che bởi bảng đen) */}
            <p className="text-base sm:text-xl font-bold text-white max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-4">
              "{steps[step].text}"
            </p>

            {/* Minimalist Floating Action Button */}
            <div className="mt-1 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-fuchsia-600 to-purple-600 hover:scale-105 transition-all text-white font-extrabold text-xs shadow-2xl border border-white/30 cursor-pointer">
              {step === steps.length - 1 ? (
                <>
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Hải Vào Thế Võ: Hạ Gục Anh Long Tại Thiên Đàng!</span>
                </>
              ) : (
                <>
                  <span>Chạm vào màn hình để tiếp tục</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
