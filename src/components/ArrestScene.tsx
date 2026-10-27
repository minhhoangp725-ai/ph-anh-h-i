import React, { useState } from 'react';
import { sounds } from '../audio/soundManager';
import { ShieldAlert, Award, Star, CheckCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArrestSceneProps {
  onRestartGame: () => void;
}

export const ArrestScene: React.FC<ArrestSceneProps> = ({ onRestartGame }) => {
  const [step, setStep] = useState<number>(0);
  const [badgeRevealed, setBadgeRevealed] = useState<boolean>(false);

  const dialogueSteps = [
    {
      speaker: 'Hải',
      role: 'Chủ tiệm phở',
      text: 'Bác Hiệu ơi, hôm nay cháu chính thức đóng cửa quán, không bán phở nữa đâu ạ.'
    },
    {
      speaker: 'Trưởng làng Hiệu',
      role: 'Trưởng làng (Đồng phạm)',
      text: 'Ôi chao! Thật tiếc quá, phở của cậu ngon nức tiếng cả vùng như vậy mà giờ lại phải bỏ...'
    },
    {
      speaker: 'Hải',
      role: 'Hải (Mỉm cười bí ẩn)',
      text: 'Bác không phải tiếc đâu... Chúng ta sẽ sớm gặp lại nhau thôi!'
    },
    {
      speaker: 'Trưởng làng Hiệu',
      role: 'Ngơ ngác hoang mang',
      text: 'Hả?! Cậu nói thế là có ý gì? Tại sao lại sớm gặp... Ủa cái gì lạnh buốt ở cổ tay tôi thế này?!',
      action: () => {
        sounds.playHandcuffs();
      }
    },
    {
      speaker: 'Hệ Thống Phá Án',
      role: 'CẠCH! Còng Số 8 Đã Khóa Chặt',
      text: 'Trưởng làng Hiệu bàng hoàng nhìn xuống hai cổ tay... Chiếc còng số 8 bằng thép đặc chủng đã bập chặt vào tay từ lúc nào!'
    },
    {
      speaker: 'Khoa (Grab) & Khánh (Xe Lăn)',
      role: 'Lực Lượng Hỗ Trợ Ập Tới',
      text: 'Đồng chí Hải, toàn bộ hồ sơ sổ sách ăn chia hối lộ giữa Trưởng làng và hang ổ Thiên Đường đã bị chúng tôi thu giữ trọn vẹn!'
    }
  ];

  const handleNextStep = () => {
    if (step < dialogueSteps.length - 1) {
      const next = step + 1;
      setStep(next);
      if (dialogueSteps[next].action) {
        dialogueSteps[next].action();
      } else {
        sounds.playDialogueBleep();
      }
    } else if (!badgeRevealed) {
      // Magic flourish revealing police badge
      sounds.playBadgeReveal();
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
      setBadgeRevealed(true);
    }
  };

  return (
    <div className="relative w-full bg-black/65 backdrop-blur-lg border border-amber-500/50 rounded-3xl p-5 shadow-2xl text-neutral-100 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-lg">
          <ShieldAlert className="w-6 h-6 text-rose-500 animate-pulse" />
          <span>NGÀY 4: ĐẠI ÁN TRIỆT PHÁ HANG Ổ THIÊN ĐƯỜNG</span>
        </div>
      </div>

      {!badgeRevealed ? (
        <div className="flex flex-col gap-5">
          {/* Step Dialogue Card */}
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                {dialogueSteps[step].role}
              </span>
              <span className="font-extrabold text-base text-neutral-100">
                {dialogueSteps[step].speaker}
              </span>
            </div>
            <p className="text-base leading-relaxed text-amber-100 mt-2 font-medium">
              "{dialogueSteps[step].text}"
            </p>
          </div>

          <button
            onClick={handleNextStep}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-rose-600 to-red-600 hover:scale-[1.01] text-white font-bold text-base rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {step === dialogueSteps.length - 1
              ? '✨ Dơ 2 Tay - Làm Ảo Thuật Xuất Hiện THẺ CÔNG AN!'
              : 'Tiếp Tục →'}
          </button>
        </div>
      ) : (
        /* Badge Reveal & Final Declaration */
        <div className="flex flex-col items-center text-center gap-5 py-2">
          {/* Police Badge 3D-Style Card */}
          <div className="relative w-72 p-5 rounded-2xl bg-gradient-to-br from-red-700 via-rose-800 to-red-950 border-4 border-yellow-400 shadow-2xl flex flex-col items-center gap-2 transform hover:scale-105 transition-transform">
            <div className="w-14 h-14 rounded-full bg-yellow-400/20 border-2 border-yellow-300 flex items-center justify-center shadow-inner">
              <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
            </div>
            <span className="text-[11px] font-bold tracking-widest text-yellow-300 uppercase">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </span>
            <span className="text-xl font-black text-white tracking-wider">
              CÔNG AN NHÂN DÂN
            </span>
            <div className="w-full h-px bg-yellow-400/40 my-1" />
            <div className="text-left w-full text-xs text-yellow-100 flex flex-col gap-1">
              <div><strong>Họ và tên:</strong> NGUYỄN VĂN HẢI</div>
              <div><strong>Cấp bậc:</strong> Đại úy Đặc nhiệm Hình sự</div>
              <div><strong>Nhiệm vụ:</strong> Chuyên án bí số TD-2026</div>
            </div>
          </div>

          {/* Hải's Final Quote */}
          <div className="p-4 bg-neutral-950/90 rounded-2xl border border-amber-500/50 text-neutral-100 text-sm leading-relaxed max-w-lg">
            <span className="text-amber-400 font-extrabold text-base block mb-1">
              Đại úy Hải dõng dạc tuyên bố:
            </span>
            "Ngoài mặt ông giả làm trưởng làng tốt bụng, nhưng sau lưng lại là đồng phạm bảo kê cùng với hang ổ Thiên Đường... <strong>Mời ông lên phường!</strong>"
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 max-w-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Chuyên án kết thúc toàn thắng! Cậu Vàng được thưởng tô phở ngập thịt bò, Hải - Khoa - Khánh hoàn thành xuất sắc nhiệm vụ bảo vệ bình yên cho nhân dân!
            </span>
          </div>

          <button
            onClick={onRestartGame}
            className="mt-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-extrabold rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            🎉 Hoàn Thành Game: Trở Về Trang Game Ngày 1 (Chơi Lại Từ Đầu)
          </button>
        </div>
      )}
    </div>
  );
};
