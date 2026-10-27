import React, { useState } from 'react';
import { sounds } from '../audio/soundManager';
import { ShieldAlert, Flame, RotateCcw, Cloud, Sparkles } from 'lucide-react';
import { HeavenScene } from './HeavenScene';

interface NightLongModalProps {
  onChoiceMade: (choice: 1 | 2) => void;
  onGameOverRestart: () => void;
}

export const NightLongModal: React.FC<NightLongModalProps> = ({
  onChoiceMade,
  onGameOverRestart
}) => {
  const [subStep, setSubStep] = useState<'initial' | 'option1_dialogue' | 'option2_dialogue' | 'heaven'>('initial');
  const [option1Step, setOption1Step] = useState<number>(0);

  const handleSelectChoice1 = () => {
    sounds.playDialogueBleep();
    setSubStep('option1_dialogue');
    setOption1Step(0);
  };

  const handleSelectChoice2 = () => {
    sounds.playDialogueBleep();
    setSubStep('option2_dialogue');
  };

  const handleNextOpt1 = () => {
    sounds.playDialogueBleep();
    if (option1Step === 0) {
      setOption1Step(1);
    } else if (option1Step === 1) {
      sounds.playPunch(); // Door slam sound
      setOption1Step(2);
    } else if (option1Step === 2) {
      sounds.playPunch();
      setOption1Step(3); // Stall is burned
    } else {
      // Vô từ từ khi tới Thiên Đàng: chuyển sang cõi Thiên Đàng (cái bảng mất, chỉ có chữ và toàn bộ công thức hóa học)
      setSubStep('heaven');
    }
  };

  // If in Heaven: render HeavenScene directly (vô từ từ, cái bảng mất chỉ có chữ, đầy đủ công thức hóa học)
  if (subStep === 'heaven') {
    return <HeavenScene onRestartGame={onGameOverRestart} reason="burned_by_long" />;
  }

  return (
    <div className="relative w-full max-w-xl mx-auto bg-black/65 backdrop-blur-lg border border-orange-500/40 rounded-3xl p-5 shadow-2xl text-neutral-100 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2.5">
        <div className="flex items-center gap-2 text-orange-400 font-extrabold text-sm">
          <ShieldAlert className="w-4 h-4 text-orange-400" />
          <span>TỐI NGÀY 1: ANH LONG TỚI ĐÒI TIỀN BẢO KÊ!</span>
        </div>
      </div>

      {subStep === 'initial' && (
        <div className="flex flex-col gap-3.5">
          <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 text-sm leading-relaxed text-neutral-200">
            <p className="font-semibold text-orange-300 mb-1">Anh Long (Chống nạnh, mặt hầm hố):</p>
            "Ê thằng bán phở kia! Nghe đồn hôm nay ngày đầu khai trương mày kiếm được tận <strong>1 TRIỆU ĐỒNG</strong> thơm bơ lắm đúng không?! Ở cái làng này, muốn mở quán yên ổn thì nộp 500k tiền bảo kê đây, không tao san bằng quán!"
          </div>

          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Bạn sẽ xử trí thế nào?
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={handleSelectChoice1}
              className="p-3.5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-left transition-all hover:scale-[1.01] cursor-pointer"
            >
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
                <span>LỰA CHỌN 1: KHÔNG ĐƯA TIỀN & CÀ KHỊA</span>
              </div>
              <p className="text-xs text-neutral-300">
                Nói: "Em có mẹo kiếm tiền nè" rồi đóng sầm cửa lại!
              </p>
            </button>

            <button
              onClick={handleSelectChoice2}
              className="p-3.5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-left transition-all hover:scale-[1.01] cursor-pointer"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                <span>LỰA CHỌN 2: ĐƯA TIỀN BẢO KÊ</span>
              </div>
              <p className="text-xs text-neutral-300">
                Đưa tiền cho Anh Long để yên ổn kinh doanh tiếp sang Ngày 2.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Choice 1 Branch: Cà khịa mẹo mày bé -> Cay đốt nhà -> Không bán nữa -> Lên Thiên Đàng */}
      {subStep === 'option1_dialogue' && (
        <div className="flex flex-col gap-3.5">
          {option1Step === 0 && (
            <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 text-sm leading-relaxed">
              <p className="font-bold text-emerald-400 mb-1">Hải (Mỉm cười tỉnh queo):</p>
              "Anh Long ơi, anh cần tiền làm gì vất vả thế? Em có một <strong>mẹo kiếm tiền</strong> siêu đỉnh nè anh!"
              <div className="mt-2.5 pt-2.5 border-t border-white/10 text-orange-300">
                <strong>Anh Long (Tò mò hớn hở):</strong> "Ủa mẹo gì? Mẹo gì mày nói tao nghe thử xem?!"
              </div>
            </div>
          )}

          {option1Step === 1 && (
            <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 text-sm leading-relaxed">
              <p className="font-bold text-emerald-400 mb-1">Hải (Nhìn thẳng vào mặt Long):</p>
              <span className="text-xl font-extrabold text-amber-300">"MẸO MÀY BÉ!"</span>
              <p className="text-xs text-neutral-400 mt-2 italic">
                *RẦM!* Hải lập tức đóng sập cánh cửa gỗ lại ngay trước mũi Anh Long!
              </p>
            </div>
          )}

          {option1Step === 2 && (
            <div className="p-3.5 bg-rose-950/60 rounded-2xl border border-rose-500/50 text-sm leading-relaxed text-rose-200">
              <div className="flex items-center gap-2 font-bold text-rose-400 mb-2">
                <Flame className="w-5 h-5 text-rose-500" />
                <span>Anh Long Cay Đỏ Mặt Bốc Hỏa:</span>
              </div>
              "THẰNG RANH CON! DÁM NÓI MẸO MÀY BÉ RỒI ĐÓNG CỬA VÀO MẶT TAO À?! CAY QUÁ ĐI MẤT! MÀY ĐỢI ĐẤY, TAO ĐỐT QUÁN MÀY NGAY BÂY GIỜ CHO HẾT BÁN!"
            </div>
          )}

          {option1Step === 3 && (
            <div className="p-4 bg-rose-950/80 rounded-2xl border-2 border-rose-500 text-sm leading-relaxed text-rose-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-black text-rose-400 text-base">
                <Flame className="w-6 h-6 text-rose-500 animate-pulse" />
                <span>KẾT CỤC: QUÁN PHỞ BỊ THIÊU RỤI HOÀN TOÀN!</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed">
                Anh Long nổi cơn điên châm lửa thiêu rụi quán phở trong đêm! Quán phở cháy rụi, <strong>Hải không thể bán phở được nữa</strong>. Linh hồn Hải cùng Cậu Vàng chuẩn bị thăng hoa bay về cõi Thiên Đàng bồng lai...
              </p>
            </div>
          )}

          <button
            onClick={handleNextOpt1}
            className={`w-full py-3.5 text-white font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
              option1Step === 3
                ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 text-black font-extrabold animate-pulse'
                : 'bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500'
            }`}
          >
            {option1Step === 3 ? (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>Vô Từ Từ Cõi Thiên Đàng (Xem Lại Tất Cả Công Thức) →</span>
              </>
            ) : (
              'Tiếp Theo →'
            )}
          </button>
        </div>
      )}

      {/* Choice 2 Branch: Đưa tiền -> Long bảo kê -> Tiếp tục ngày 2 */}
      {subStep === 'option2_dialogue' && (
        <div className="flex flex-col gap-3.5">
          <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 text-sm leading-relaxed">
            <p className="font-bold text-emerald-400 mb-1">Hải (Lấy tiền ra đưa):</p>
            "Dạ vâng, em mới mở quán còn bỡ ngỡ, gửi anh 500k uống cà phê bảo kê giùm em ạ."
            <div className="mt-2.5 pt-2.5 border-t border-white/10 text-emerald-300 font-medium">
              <strong>Anh Long (Cầm tiền đắc ý cười ha hả):</strong>
              <br />
              "Hahaha! <strong>Biết điều đấy! Đưa tiền thì anh bảo kê cho thằng em!</strong> Cứ yên tâm buôn bán, có anh Long đây thì không thằng nào dám quậy quán mày!"
            </div>
          </div>

          <button
            onClick={() => onChoiceMade(2)}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold rounded-xl transition-all cursor-pointer"
          >
            Đóng Cửa Nghỉ Ngơi Sang Ngày 2 →
          </button>
        </div>
      )}
    </div>
  );
};
