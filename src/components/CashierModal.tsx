import React, { useState } from 'react';
import { PhoOrder } from '../types/game';
import { sounds } from '../audio/soundManager';
import { Banknote, RotateCcw, CheckCircle2, Zap } from 'lucide-react';

interface CashierModalProps {
  order: PhoOrder;
  onPaymentSuccess: (earned: number) => void;
}

export const CashierModal: React.FC<CashierModalProps> = ({
  order,
  onPaymentSuccess
}) => {
  const [selectedChangeTotal, setSelectedChangeTotal] = useState<number>(0);
  const [denominationCounts, setDenominationCounts] = useState<Record<number, number>>({
    5000: 0,
    10000: 0,
    20000: 0,
    50000: 0,
    100000: 0,
    200000: 0,
    500000: 0
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isReturning, setIsReturning] = useState<boolean>(false);

  const expectedChange = order.expectedChange;

  const triggerInstantReturn = () => {
    setIsReturning(true);
    sounds.playCorrect();
    // Instant handover without waiting
    setTimeout(() => {
      onPaymentSuccess(order.totalPrice);
    }, 280);
  };

  const handleAddBill = (amount: number) => {
    if (isReturning) return;
    sounds.playCashRegister();

    const newCounts = {
      ...denominationCounts,
      [amount]: (denominationCounts[amount] || 0) + 1
    };
    setDenominationCounts(newCounts);

    const newTotal = selectedChangeTotal + amount;
    setSelectedChangeTotal(newTotal);

    if (newTotal === expectedChange) {
      setErrorMsg(null);
      triggerInstantReturn();
    } else if (newTotal > expectedChange) {
      setErrorMsg(
        `Đã thối quá ${newTotal - expectedChange}đ rồi! Bấm "Xóa làm lại" hoặc điều chỉnh lại nhé.`
      );
    } else {
      setErrorMsg(null);
    }
  };

  // Instant 1-click correct change return
  const handleQuickExactChange = () => {
    if (isReturning) return;
    setSelectedChangeTotal(expectedChange);
    triggerInstantReturn();
  };

  const handleReset = () => {
    if (isReturning) return;
    setDenominationCounts({
      5000: 0,
      10000: 0,
      20000: 0,
      50000: 0,
      100000: 0,
      200000: 0,
      500000: 0
    });
    setSelectedChangeTotal(0);
    setErrorMsg(null);
  };

  const handleManualConfirm = () => {
    if (isReturning) return;
    if (selectedChangeTotal !== expectedChange) {
      if (selectedChangeTotal < expectedChange) {
        setErrorMsg(
          `Bạn thối thiếu tiền cho khách rồi! (Đang thối: ${selectedChangeTotal.toLocaleString()}đ, cần thối: ${expectedChange.toLocaleString()}đ)`
        );
      } else {
        setErrorMsg(
          `Bạn thối thừa tiền cho khách rồi, lỗ vốn đó đồng chí! (Đang thối: ${selectedChangeTotal.toLocaleString()}đ, cần thối: ${expectedChange.toLocaleString()}đ)`
        );
      }
      return;
    }

    triggerInstantReturn();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-neutral-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-md text-neutral-100 flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 sticky top-0 bg-neutral-900/95 z-10">
        <div className="flex items-center gap-2">
          <Banknote className="w-5 h-5 text-emerald-400" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Người Bán: Hải (Công An Chìm)
            </span>
            <h2 className="text-sm font-bold text-emerald-100">
              Quầy Thu Ngân • Thối Tiền Cho: {order.customerName}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleQuickExactChange}
            disabled={isReturning}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg transition-all shadow cursor-pointer disabled:opacity-50"
            title="Thối đúng số tiền thừa và gửi khách liền"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-200" /> Thối Đúng Tiền Liền
          </button>
        </div>
      </div>

      {/* Bill summary card */}
      <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800 flex flex-col gap-2 text-sm">
        <div className="flex justify-between items-center text-neutral-300">
          <span>Tiền bát phở & món kèm:</span>
          <span className="font-bold text-amber-300">{order.totalPrice.toLocaleString()} đ</span>
        </div>
        <div className="flex justify-between items-center text-neutral-300">
          <span>Tiền khách đưa:</span>
          <span className="font-bold text-cyan-300">{order.givenCash.toLocaleString()} đ</span>
        </div>
        <div className="border-t border-neutral-800 pt-2 flex justify-between items-center text-base">
          <span className="font-semibold text-neutral-200">Tiền cần thối lại khách:</span>
          <span className="font-extrabold text-emerald-400 text-lg">
            {expectedChange.toLocaleString()} đ
          </span>
        </div>
      </div>

      {/* Denominations selector */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Bấm chọn tiền để thối (Đủ tiền là thối liền không chờ):
          </span>
          <button
            onClick={handleReset}
            disabled={isReturning}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Xóa làm lại
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: 5000, label: '5.000 đ', color: 'from-blue-900/80 to-slate-800/80' },
            { value: 10000, label: '10.000 đ', color: 'from-yellow-700/80 to-amber-800/80' },
            { value: 20000, label: '20.000 đ', color: 'from-blue-700/80 to-indigo-800/80' },
            { value: 50000, label: '50.000 đ', color: 'from-pink-700/80 to-rose-800/80' },
            { value: 100000, label: '100.000 đ', color: 'from-emerald-700/80 to-teal-800/80' },
            { value: 200000, label: '200.000 đ', color: 'from-orange-700/80 to-red-800/80' },
            { value: 500000, label: '500.000 đ', color: 'from-teal-700/80 to-cyan-900/80' }
          ].map((bill) => (
            <button
              key={bill.value}
              onClick={() => handleAddBill(bill.value)}
              disabled={isReturning}
              className={`p-3 rounded-xl bg-gradient-to-r ${bill.color} border border-white/20 text-white font-bold text-sm shadow-md hover:scale-[1.03] active:scale-95 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer disabled:opacity-50`}
            >
              <span>{bill.label}</span>
              <span className="text-[10px] font-normal text-white/80">
                Đã chọn: {denominationCounts[bill.value] || 0} tờ
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current selection display */}
      <div className="p-3 bg-neutral-800/60 rounded-xl border border-neutral-700 flex justify-between items-center text-sm">
        <span className="text-neutral-300">Tổng tiền đang thối:</span>
        <span
          className={`font-mono text-base font-bold ${
            selectedChangeTotal === expectedChange
              ? 'text-emerald-400'
              : selectedChangeTotal > expectedChange
              ? 'text-rose-400'
              : 'text-amber-400'
          }`}
        >
          {selectedChangeTotal.toLocaleString()} đ
        </span>
      </div>

      {/* Auto-handover indicator */}
      {isReturning && (
        <div className="flex items-center justify-center gap-2 p-2.5 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Đã thối đủ {expectedChange.toLocaleString()}đ! Đang trao tiền cho khách liền!
        </div>
      )}

      {errorMsg && (
        <div className="p-2.5 bg-rose-950/80 border border-rose-500/50 rounded-lg text-rose-300 text-xs font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Action button */}
      <button
        onClick={handleManualConfirm}
        disabled={isReturning}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <CheckCircle2 className="w-5 h-5" /> Thối Tiền Liền Cho Khách
      </button>
    </div>
  );
};
