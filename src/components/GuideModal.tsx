import React, { useState } from 'react';
import { BookOpen, Utensils, Atom, Users, X } from 'lucide-react';
import { CHARACTERS } from '../data/characters';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'pho' | 'chemistry' | 'characters'>('pho');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-3xl p-6 shadow-2xl text-neutral-100 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-100">
              Sổ Tay Nghiên Cứu: Bí Quyết Phở & Hóa Học Kết Nối Tri Thức
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 my-3 border-b border-neutral-800 pb-2">
          <button
            onClick={() => setActiveTab('pho')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pho'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" /> Công Thức Nấu Phở
          </button>
          <button
            onClick={() => setActiveTab('chemistry')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'chemistry'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Atom className="w-3.5 h-3.5" /> Hóa Học KNTT Giữa Kì 1
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'characters'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Nhân Vật & Chuyên Án
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto pr-1 flex flex-col gap-4 text-sm leading-relaxed">
          {activeTab === 'pho' && (
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-bold text-amber-400 block mb-1">1. Phở Bò Tái:</span>
                Bánh phở trần + Thịt bò tươi tái mềm ngọt + Rắc nhiều hành hoa + Chan nước dùng sôi sùng sục.
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-bold text-amber-400 block mb-1">2. Phở Bò Chín:</span>
                Bánh phở trần + Thịt bò nạm chín thái lát mỏng + Hành lá + Chan nước dùng đậm đà hương quế hồi.
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-bold text-amber-400 block mb-1">3. Phở Không Hành:</span>
                Yêu cầu đặc biệt của khách dị ứng hành! Tuyệt đối <strong>KHÔNG CHO HÀNH LÁ</strong>, chỉ có bánh phở + thịt + nước dùng.
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-bold text-amber-400 block mb-1">4. Phở Không Người Lái:</span>
                Món phở truyền thống bình dân! <strong>KHÔNG CÓ THỊT</strong>, thưởng thức trọn vẹn vị thanh ngọt tinh túy của bánh phở tươi và nước hầm xương.
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-bold text-amber-400 block mb-1">Món ăn kèm:</span>
                🥖 Quẩy giòn vàng rụm nhúng vào nước phở & 🍚 Bát cơm trắng ấm bụng.
              </div>
            </div>
          )}

          {activeTab === 'chemistry' && (
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-neutral-950 rounded-xl border border-indigo-500/30">
                <span className="font-bold text-indigo-300 block mb-1">
                  1. Công Thức Tính Số Mol (n):
                </span>
                <p className="font-mono text-emerald-400 bg-neutral-900 p-2 rounded text-center text-base my-1">
                  n = m / M
                </p>
                <div className="text-xs text-neutral-400">
                  Trong đó: m là khối lượng chất (gam), M là khối lượng mol nguyên tử/phân tử (g/mol).
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-indigo-500/30">
                <span className="font-bold text-indigo-300 block mb-1">
                  2. Thể Tích Chất Khí Ở Điều Kiện Chuẩn (đkc - 25°C, 1 bar):
                </span>
                <p className="font-mono text-cyan-400 bg-neutral-900 p-2 rounded text-center text-base my-1">
                  V = n × 24,79 (lít)
                </p>
                <div className="text-xs text-neutral-400">
                  *Lưu ý cải cách SGK Kết Nối Tri Thức mới: Sử dụng hằng số <strong>24,79</strong> thay vì 22,4 như chương trình cũ!*
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-indigo-500/30">
                <span className="font-bold text-indigo-300 block mb-1">
                  3. Tỉ Khối Của Chất Khí (d):
                </span>
                <p className="font-mono text-amber-400 bg-neutral-900 p-2 rounded text-center text-base my-1">
                  d(A/B) = M_A / M_B &nbsp;&nbsp;|&nbsp;&nbsp; d(A/kk) = M_A / 29
                </p>
                <div className="text-xs text-neutral-400">
                  Nếu d &gt; 1: Khí A nặng hơn; nếu d &lt; 1: Khí A nhẹ hơn.
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-emerald-500/30">
                <span className="font-bold text-emerald-300 block mb-1">
                  4. Độ Tan Của Một Chất Trong Nước (S):
                </span>
                <p className="font-mono text-emerald-400 bg-neutral-900 p-2 rounded text-center text-base my-1">
                  S = (m_ct / m_H2O) × 100 (gam/100g H2O)
                </p>
                <div className="text-xs text-neutral-400">
                  Độ tan (S) là số gam chất đó tan tối đa trong 100 gam nước ở nhiệt độ, áp suất xác định để tạo thành dung dịch bão hòa.
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-cyan-500/30">
                <span className="font-bold text-cyan-300 block mb-1">
                  5. Nồng Độ Phần Trăm (C%):
                </span>
                <p className="font-mono text-cyan-400 bg-neutral-900 p-2 rounded text-center text-base my-1">
                  C% = (m_ct / m_dd) × 100%
                </p>
                <div className="text-xs text-neutral-400">
                  Trong đó: m_ct là khối lượng chất tan (g), m_dd = m_ct + m_dm (khối lượng dung dịch = khối lượng chất tan + dung môi).
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-rose-500/30">
                <span className="font-bold text-rose-300 block mb-1">
                  6. Nồng Độ Mol Của Dung Dịch (C_M):
                </span>
                <p className="font-mono text-rose-400 bg-neutral-900 p-2 rounded text-center text-base my-1">
                  C_M = n / V (mol/lít hoặc M)
                </p>
                <div className="text-xs text-neutral-400">
                  Trong đó: n là số mol chất tan (mol), V là thể tích dung dịch (lít). Mối liên hệ: C% = [S / (S + 100)] × 100%.
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-amber-500/30">
                <span className="font-bold text-amber-300 block mb-1">
                  7. Hiệp Đồng Vị Ngọt Umami & Thảo Mộc Nước Phở:
                </span>
                <p className="font-mono text-amber-400 bg-neutral-900 p-2 rounded text-center text-xs my-1">
                  Glutamate (C5H8NO4⁻) + Inosinate IMP (C10H11N4O8P²⁻) → x8 Vị Ngọt Thịt
                </p>
                <div className="text-xs text-neutral-400">
                  Collagen + H2O → Gelatin (C102H151N31O39); Tinh dầu: Quế (C9H8O), Hồi (C10H12O), Đinh hương (C10H12O2), Tiêu (C17H19NO3); Maillard nướng hành gừng → Pyrazine & Furan.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.values(CHARACTERS).map((c) => (
                <div key={c.id} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-3 h-3 rounded-full ${c.avatarColor}`} />
                    <span className="font-bold text-neutral-200 text-xs">{c.name}</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium">{c.role}</div>
                  <p className="text-xs text-neutral-400 mt-1">{c.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
