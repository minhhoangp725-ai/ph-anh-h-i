import React, { useState } from 'react';
import { sounds } from '../audio/soundManager';
import { AlertTriangle, Sparkles, Heart } from 'lucide-react';

interface Day3MiddayModalProps {
  onAcceptInvitation: () => void;
}

export const Day3MiddayModal: React.FC<Day3MiddayModalProps> = ({ onAcceptInvitation }) => {
  const [step, setStep] = useState<'giabao_warning' | 'phuba_appears'>('giabao_warning');

  const handleNextToPhuBa = () => {
    sounds.playDialogueBleep();
    setStep('phuba_appears');
  };

  const handleAccept = () => {
    sounds.playBadgeReveal();
    onAcceptInvitation();
  };

  return (
    <div className="relative w-full bg-black/65 backdrop-blur-lg border border-purple-500/40 rounded-3xl p-5 shadow-2xl text-neutral-100 flex flex-col gap-4">
      {step === 'giabao_warning' ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-neutral-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>TRƯA NGÀY 3: LỜI CẢNH BÁO CỦA GIA BẢO</span>
          </div>

          <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 text-sm leading-relaxed">
            <p className="font-bold text-cyan-400 mb-1">Gia Bảo (Thở dốc sau khi chạy bộ ghé quán):</p>
            "Anh Hải ơi! Em vừa nghe được tin động trời từ mấy đứa bạn... Dạo này quanh vùng xuất hiện <strong>một Phú Bà chuyên đi dụ các chàng trai đẹp zzai tới chỗ gọi là Thiên Đường</strong>! Chú em trông vừa đẹp trai lại phong độ nấu phở ngon thế này... khéo bị bà ta nhắm vào đấy, cẩn thận kẻo mất tích nha!"
          </div>

          <button
            onClick={handleNextToPhuBa}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white font-bold rounded-xl transition-all cursor-pointer"
          >
            Gia Bảo Vừa Rời Đi Thì Bất Ngờ... →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-neutral-800 pb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>PHÚ BÀ XUẤT HIỆN TRƯỚC CỬA QUÁN PHỞ!</span>
          </div>

          <div className="p-4 bg-neutral-950 rounded-2xl border border-purple-900/50 text-sm leading-relaxed">
            <p className="font-bold text-purple-300 mb-1">Phú Bà (Đeo kính mát, xách túi da hàng hiệu lộng lẫy):</p>
            "Ôi chao, quả đúng như lời đồn! Chú em bán phở này trông khôi ngô tuấn tú, khí chất bất phàm quá nhỉ~ Nấu phở vất vả thế làm gì cho phí hoài tuổi trẻ? <strong>Tối nay mời chú em tới Thiên Đường cùng chị nhé~</strong> Đảm bảo muốn gì được nấy!"
            <div className="mt-3 pt-3 border-t border-neutral-800 text-emerald-300">
              <strong>Hải suy nghĩ:</strong> <i>(Hang ổ Thiên Đường mà ta cùng đồng đội điều tra bấy lâu nay đã tự tìm đến tận cửa! Đây chính là cơ hội vàng để đột nhập vào bên trong thu thập bằng chứng!)</i>
            </div>
          </div>

          <button
            onClick={handleAccept}
            className="w-full py-3.5 bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 hover:scale-[1.01] text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" /> Chấp Nhận Lời Mời: Tối Nay Đột Nhập Thiên Đường!
          </button>
        </div>
      )}
    </div>
  );
};
