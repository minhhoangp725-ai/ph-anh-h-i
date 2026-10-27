import React, { useState, useEffect } from 'react';
import { sounds } from '../audio/soundManager';
import { Shield, Zap, Flame, Compass, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ActionFightGameProps {
  phase: 'fight_long' | 'bridge_chase' | 'stall_burned';
  onPhaseComplete: (nextPhase: string) => void;
  onUpdateSpinProgress: (progress: number) => void;
}

export const ActionFightGame: React.FC<ActionFightGameProps> = ({
  phase,
  onPhaseComplete,
  onUpdateSpinProgress
}) => {
  // Fight state (vs Anh Long)
  const [longHp, setLongHp] = useState(100);
  const [haiHp, setHaiHp] = useState(100);
  const [fightLog, setFightLog] = useState<string>('Anh Long giang hồ hung hăng lao vào!');
  const [isPunching, setIsPunching] = useState(false);

  // Bridge chase state
  const [spinProgress, setSpinProgress] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [enemiesDefeated, setEnemiesDefeated] = useState(false);

  // Burned stall state
  const [dogFound, setDogFound] = useState(false);

  // Fight Handlers
  const handlePoliceMartialStrike = () => {
    if (isPunching || longHp <= 0) return;
    setIsPunching(true);
    sounds.playPunch();

    const damage = 35;
    const newHp = Math.max(0, longHp - damage);
    setLongHp(newHp);

    if (newHp <= 0) {
      setFightLog('💥 Hải tung đòn thế đặc nhiệm quật ngã Anh Long bất tỉnh nhân sự!');
      sounds.playCorrect();
      setTimeout(() => {
        onPhaseComplete('bridge_chase');
      }, 1500);
    } else {
      setFightLog(`⚡ Hải tung đòn khóa tay trúng đích! Anh Long mất ${damage}% máu!`);
      // Counter-attack
      setTimeout(() => {
        if (newHp > 0) {
          sounds.playPunch();
          setHaiHp((prev) => Math.max(20, prev - 10));
          setFightLog('Anh Long chống cự nhưng bị Hải khống chế hoàn toàn!');
        }
        setIsPunching(false);
      }, 500);
    }
  };

  const handleDodge = () => {
    sounds.playWhoosh();
    setFightLog('💨 Hải nhanh nhẹn né đòn hiểm của Anh Long!');
  };

  // Bridge Stunt Handler (Thả 2 tay xoay 360 độ)
  const handleExecute360Spin = () => {
    if (isSpinning || enemiesDefeated) return;
    setIsSpinning(true);
    sounds.playWhoosh();

    let p = 0;
    const interval = setInterval(() => {
      p += 0.05;
      if (p >= 1) {
        p = 1;
        clearInterval(interval);
        sounds.playPunch();
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        setEnemiesDefeated(true);
        setIsSpinning(false);
        onUpdateSpinProgress(1);
      } else {
        setSpinProgress(p);
        onUpdateSpinProgress(p);
      }
    }, 40);
  };

  const handleFinishBridge = () => {
    onPhaseComplete('stall_burned');
  };

  const handleFindDog = () => {
    sounds.playBark();
    setDogFound(true);
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
  };

  const handleFinishDay3 = () => {
    onPhaseComplete('day4_start');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-3xl p-5 shadow-2xl text-neutral-100 flex flex-col gap-4">
      {/* PHASE 1: FIGHT ANH LONG AT THIÊN ĐÀNG */}
      {phase === 'fight_long' && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Giao Đấu: Hải vs Anh Long Bảo Kê</span>
            </div>
            <span className="text-xs px-2.5 py-1 bg-purple-900/40 text-purple-300 rounded border border-purple-500/30">
              ⚡ Tại Thiên Đàng (Động Thiên Đường)
            </span>
          </div>

          {/* Quick Floating Formula Reference */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono py-0.5 text-neutral-300 scrollbar-none">
            <span className="font-sans text-amber-300 font-bold">Bí Kíp Hóa Học:</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10">S=(m_ct/m_H2O)×100</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10">C%=(m_ct/m_dd)×100%</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10">CM=n/V</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10">V=n×24,79</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10">Umami: C5H8NO4⁻</span>
          </div>

          {/* Health Bars */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span className="font-bold text-emerald-400">Hải (Công An)</span>
                <span>{haiHp}%</span>
              </div>
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${haiHp}%` }}
                />
              </div>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span className="font-bold text-rose-400">Anh Long (Giang Hồ)</span>
                <span>{longHp}%</span>
              </div>
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-600 transition-all duration-300"
                  style={{ width: `${longHp}%` }}
                />
              </div>
            </div>
          </div>

          {/* Combat Log */}
          <div className="p-3.5 bg-neutral-950/90 rounded-xl border border-neutral-800 text-center text-sm font-semibold text-amber-200 min-h-[50px] flex items-center justify-center">
            {fightLog}
          </div>

          {/* Combat Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handlePoliceMartialStrike}
              disabled={isPunching || longHp <= 0}
              className="py-3 px-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4" /> Tuyệt Kỹ Võ Công Công An
            </button>
            <button
              onClick={handleDodge}
              disabled={isPunching || longHp <= 0}
              className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-xl border border-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Shield className="w-4 h-4" /> Luồn Người Né Đòn
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: BRIDGE MOTORBIKE CHASE */}
      {phase === 'bridge_chase' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Rượt Đuổi Trên Cầu: Hải Bị 2 Tên Sát Thủ Ép Xe!</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 text-sm leading-relaxed text-neutral-200">
            {enemiesDefeated ? (
              <span className="text-emerald-300 font-bold">
                🎯 TUYỆT ĐỈNH! Hải vừa thả 2 tay xoay vòng cơ thể 360 độ trên yên xe, tung 2 cú đá song phi quét ngã cả 2 tên giang hồ văng ra khỏi cầu! Đã thoát khỏi vòng vây an toàn!
              </span>
            ) : (
              <span>
                Phú Bà lệnh cho 2 tên đàn em chạy xe máy tốc độ cao ép sát Hải hai bên hòng tông xe ngã xuống sông! Hải cần vận dụng tuyệt kỹ biểu diễn võ thuật lái xe!
              </span>
            )}
          </div>

          {!enemiesDefeated ? (
            <div className="flex flex-col items-center gap-4 py-2">
              <button
                onClick={handleExecute360Spin}
                disabled={isSpinning}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:scale-[1.02] text-white font-extrabold text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ring-4 ring-amber-500/30"
              >
                <Zap className="w-6 h-6 animate-bounce" />
                {isSpinning
                  ? 'ĐANG THẢ TAY XOAY VÒNG 360 ĐỘ...'
                  : '🔥 THẢ 2 TAY - XOAY VÒNG CƠ THỂ 360° ĐÁ VĂNG 2 KẺ ĐỊCH!'}
              </button>
              <span className="text-xs text-neutral-400 italic">
                *Tuyệt kỹ chỉ dành cho chiến sĩ đặc nhiệm được đào tạo chuyên nghiệp!*
              </span>
            </div>
          ) : (
            <button
              onClick={handleFinishBridge}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Phóng Xe Về Quán Phở Cấp Tốc →
            </button>
          )}
        </div>
      )}

      {/* PHASE 3: STALL ON FIRE & REUNION WITH CẬU VÀNG */}
      {phase === 'stall_burned' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Flame className="w-5 h-5 text-rose-500" />
              <span>Hiện Trường Quán Phở Bị Thiêu Rụi</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 text-sm leading-relaxed text-neutral-200">
            {!dogFound ? (
              <p>
                Trở về quán, Hải bàng hoàng thấy quán phở tâm huyết ngập trong biển lửa! Hải tháo chiếc mặt nạ ngụy trang, quỳ gối xót xa... ngỡ rằng người bạn đồng hành <strong>Cậu Vàng</strong> đã hy sinh trong biển lửa...
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-amber-300 font-bold text-base">
                  🐾 "GÂU GÂU!" Tiếng sủa quen thuộc reo vang!
                </p>
                <p className="text-neutral-200">
                  Thì ra chú chó <strong>Cậu Vàng</strong> thông minh đã đánh hơi thấy nguy hiểm và chạy thoát ra ngoài bờ ruộng trước khi lửa bùng lên! Cậu Vàng lao tới sà vào vòng tay Hải, vẫy tít đuôi mừng rỡ!
                </p>
              </div>
            )}
          </div>

          {!dogFound ? (
            <button
              onClick={handleFindDog}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
            >
              <Heart className="w-5 h-5 text-rose-300 fill-rose-300" /> Nghe Ngóng Tiếng Động Quanh Bụi Cây...
            </button>
          ) : (
            <button
              onClick={handleFinishDay3}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5" /> Bước Sang Ngày 4: Chuyên Án Phán Quyết →
            </button>
          )}
        </div>
      )}
    </div>
  );
};
