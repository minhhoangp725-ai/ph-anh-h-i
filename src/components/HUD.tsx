import React, { useState } from 'react';
import { DayId, SceneMode } from '../types/game';
import { sounds } from '../audio/soundManager';
import {
  Volume2,
  VolumeX,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Camera,
  Coins,
  ShieldCheck,
  Sparkles,
  Info,
  Music
} from 'lucide-react';

interface HUDProps {
  day: DayId;
  totalCash: number;
  reputation: number;
  cluesCount: number;
  sceneMode: SceneMode;
  onSelectCameraPreset: (preset: 'overview' | 'counter' | 'dog') => void;
  onOpenGuide: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  day,
  totalCash,
  reputation,
  cluesCount,
  sceneMode,
  onSelectCameraPreset,
  onOpenGuide
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(sounds.isMusicPlaying());

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const getDayTitle = (d: DayId) => {
    switch (d) {
      case 1:
        return 'Ngày 1: Khai Trương Quán Phở';
      case 2:
        return 'Ngày 2: Kinh Doanh & Điều Tra Bí Mật';
      case 3:
        return 'Ngày 3: Đột Nhập Động Thiên Đường';
      case 4:
        return 'Ngày 4: Phán Quyết & Bắt Giữ Trùm Ngầm';
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 select-none">
      {/* Top Bar - Clean minimal status & story info */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-6xl mx-auto">
        {/* Brand & Day Badge */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-neutral-900/90 border border-neutral-700/80 px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="flex flex-col">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
              Người Bán: Hải (Công An Chìm) & Cậu Vàng 🐕
            </span>
            <span className="text-sm font-bold text-neutral-100">{getDayTitle(day)}</span>
          </div>
        </div>

        {/* Cash, Clues & Stats */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Revenue */}
          <div className="flex items-center gap-2 bg-neutral-900/90 border border-emerald-500/40 px-3.5 py-1.5 rounded-2xl shadow-lg backdrop-blur-md">
            <Coins className="w-4 h-4 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Doanh Thu</span>
              <span className="text-xs font-bold text-emerald-300 font-mono">
                {totalCash.toLocaleString()} đ
              </span>
            </div>
          </div>

          {/* Clues */}
          <div className="flex items-center gap-2 bg-neutral-900/90 border border-indigo-500/40 px-3.5 py-1.5 rounded-2xl shadow-lg backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Manh Mối</span>
              <span className="text-xs font-bold text-indigo-300">{cluesCount} / 5</span>
            </div>
          </div>

          {/* Music: Biết Em Sẽ Không Về (White Wave) Toggle & Status */}
          <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-700/80 px-2 py-1.5 rounded-2xl shadow-lg backdrop-blur-md">
            <button
              onClick={() => {
                const playing = sounds.toggleMusicBGM();
                setIsBgmPlaying(playing);
              }}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-xl transition-all cursor-pointer text-xs font-bold ${
                isBgmPlaying && !isMuted
                  ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400'
              }`}
              title="Bật/Tắt nhạc nền: Biết Em Sẽ Không Về (White Wave)"
            >
              {isBgmPlaying && !isMuted ? (
                <span className="flex items-end gap-0.5 h-3.5 w-3.5">
                  <span className="w-1 bg-rose-400 rounded-sm animate-pulse h-2" />
                  <span className="w-1 bg-rose-400 rounded-sm animate-pulse h-3.5 delay-100" />
                  <span className="w-1 bg-rose-400 rounded-sm animate-pulse h-2.5 delay-200" />
                </span>
              ) : (
                <Music className="w-3.5 h-3.5 text-neutral-500" />
              )}
              <span className="hidden sm:inline">
                {isBgmPlaying && !isMuted ? '🎵 Biết Em Sẽ Không Về' : 'Tắt Nhạc BGM'}
              </span>
            </button>

            {/* Volume Toggle / Boost */}
            <button
              onClick={() => {
                const cur = sounds.getVolume();
                const nextVol = cur <= 0.4 ? 0.7 : cur <= 0.75 ? 1.0 : 0.4;
                sounds.setVolume(nextVol);
                if (isMuted) {
                  sounds.toggleMute();
                  setIsMuted(false);
                }
                sounds.playLadle();
              }}
              className="px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono text-amber-300 font-bold cursor-pointer transition-colors"
              title="Chỉnh âm lượng: 40% - 70% - 100%"
            >
              {Math.round(sounds.getVolume() * 100)}%
            </button>

            {/* Master Mute Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Bật tất cả âm thanh' : 'Tắt tiếng (Mute)'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Central 100% Unobstructed 3D Viewport is preserved */}

      {/* Bottom Collapsible Control Dock */}
      <div className="pointer-events-auto flex flex-col items-center mx-auto mb-2 w-full max-w-2xl transition-transform duration-300">
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsDockCollapsed(!isDockCollapsed)}
          className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 text-xs font-medium rounded-t-xl border-t border-x border-neutral-700 shadow-md backdrop-blur-md cursor-pointer transition-colors"
        >
          {isDockCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" /> Hiện Bảng Điều Khiển
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" /> Ẩn Thanh Điều Khiển (Chế độ xem 3D)
            </>
          )}
        </button>

        {/* Dock Container */}
        {!isDockCollapsed && (
          <div className="w-full bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-2">
            {/* Camera presets */}
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-neutral-400 ml-1" />
              <button
                onClick={() => onSelectCameraPreset('overview')}
                className="px-2.5 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 cursor-pointer font-medium transition-all"
              >
                Toàn Cảnh
              </button>
              <button
                onClick={() => onSelectCameraPreset('counter')}
                className="px-2.5 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 cursor-pointer font-medium transition-all"
              >
                Quầy Phở
              </button>
              <button
                onClick={() => onSelectCameraPreset('dog')}
                className="px-2.5 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 cursor-pointer font-medium transition-all"
              >
                Cậu Vàng 🐕
              </button>
            </div>

            {/* Quick Transparent Formula Pills at bottom: S, C%, CM */}
            <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" title="Độ tan S = (m_ct / m_H2O) × 100">
                S = (m_ct/m_H2O)×100
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" title="Nồng độ phần trăm C% = (m_ct / m_dd) × 100%">
                C% = (m_ct/m_dd)×100%
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30" title="Nồng độ mol C_M = n / V">
                C_M = n/V
              </span>
            </div>

            {/* Guide Button */}
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 cursor-pointer font-semibold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sổ Tay Phở & Hóa Học KNTT</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
