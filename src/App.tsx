import React, { useState, useEffect } from 'react';
import { DayId, SceneMode, PhoOrder } from './types/game';
import { ThreeScene } from './three/ThreeScene';
import { HUD } from './components/HUD';
import { CustomerDialogue } from './components/CustomerDialogue';
import { CookingStation } from './components/CookingStation';
import { CashierModal } from './components/CashierModal';
import { ChemistryModal } from './components/ChemistryModal';
import { NightLongModal } from './components/NightLongModal';
import { Day3MiddayModal } from './components/Day3MiddayModal';
import { NightclubInfiltrationModal } from './components/NightclubInfiltrationModal';
import { ActionFightGame } from './components/ActionFightGame';
import { ArrestScene } from './components/ArrestScene';
import { GuideModal } from './components/GuideModal';
import { DAY1_CUSTOMERS, DAY2_CUSTOMERS, DayCustomerFlow } from './data/storyDialogue';
import { CHEMISTRY_QUESTIONS } from './data/chemistryQuestions';
import { sounds } from './audio/soundManager';
import { CheckCircle2, UserCheck, Music } from 'lucide-react';

export default function App() {
  // Game progression state
  const [day, setDay] = useState<DayId>(1);
  const [sceneMode, setSceneMode] = useState<SceneMode>('stall');
  const [totalCash, setTotalCash] = useState<number>(0);
  const [cluesCount, setCluesCount] = useState<number>(0);
  const [reputation, setReputation] = useState<number>(100);
  const [hasStartedAudio, setHasStartedAudio] = useState<boolean>(false);

  // Auto-init audio on user gesture
  useEffect(() => {
    const handleGesture = () => {
      sounds.initCtx();
      sounds.startBietEmSeKhongVe();
      setHasStartedAudio(true);
    };

    window.addEventListener('click', handleGesture, { once: true });
    window.addEventListener('keydown', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, []);

  // Day 1 & Day 2 customer index
  const [customerIdx, setCustomerIdx] = useState<number>(0);
  const [isServing, setIsServing] = useState<boolean>(false);
  const [activeChemistryQId, setActiveChemistryQId] = useState<string | null>(null);
  const [answeredChemistryIds, setAnsweredChemistryIds] = useState<string[]>([]);
  const [isWaitingNextCustomer, setIsWaitingNextCustomer] = useState<boolean>(false);

  // Day 1 Night Long choice
  const [showNight1Long, setShowNight1Long] = useState<boolean>(false);

  // Day 3 state
  const [day3Phase, setDay3Phase] = useState<
    'start' | 'midday_warning' | 'nightclub_intro' | 'fight_long' | 'bridge_chase' | 'stall_burned'
  >('start');
  const [spinStuntProgress, setSpinStuntProgress] = useState<number>(0);

  // Guide modal state
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Current customer list based on day
  const currentCustomers: DayCustomerFlow[] = day === 1 ? DAY1_CUSTOMERS : DAY2_CUSTOMERS;
  const currentCustomer: DayCustomerFlow | undefined = currentCustomers[customerIdx];

  // Camera preset handler for Three.js
  const handleSelectCameraPreset = (preset: 'overview' | 'counter' | 'dog') => {
    sounds.playDialogueBleep();
    if (preset === 'overview') setSceneMode('stall');
    else if (preset === 'counter') setSceneMode('cooking');
    else if (preset === 'dog') setSceneMode('stall');
  };

  // COOKING FLOW
  const handleStartCooking = () => {
    setSceneMode('cooking');
    setIsServing(true);
  };

  const handleFinishCooking = (isPerfect: boolean) => {
    if (isPerfect) {
      setSceneMode('cashier');
    }
  };

  const handleCancelCooking = () => {
    setSceneMode('stall');
    setIsServing(false);
  };

  // CASHIER / PAYMENT SUCCESS -> THOÁT RA LIỀN VÀ CHỜ KHÁCH TIẾP THEO!
  const handlePaymentSuccess = (earned: number) => {
    setTotalCash((prev) => prev + earned);
    sounds.playBark(); // Cậu Vàng sủa mừng

    // Thoát ra bàn ngay lập tức (không popup thêm modal nào)
    setSceneMode('stall');
    setIsServing(false);
    setIsWaitingNextCustomer(true);

    // Chuyển sang chờ đón khách tiếp theo sau 2200ms (vô từ từ, không vừa xong là tới liền!)
    setTimeout(() => {
      setIsWaitingNextCustomer(false);
      if (day === 1) {
        if (customerIdx < DAY1_CUSTOMERS.length - 1) {
          setCustomerIdx((prev) => prev + 1);
        } else {
          // Reached 1,000,000 VND target! Anh Long arrives at night
          setShowNight1Long(true);
        }
      } else if (day === 2) {
        if (customerIdx < DAY2_CUSTOMERS.length - 1) {
          setCustomerIdx((prev) => prev + 1);
        } else {
          // Day 2 complete! Advance to Day 3
          setDay(3);
          setDay3Phase('midday_warning');
          setSceneMode('stall');
        }
      }
    }, 2200);
  };

  // CHEMISTRY QUESTION (Triggered from dialogue or guide)
  const handleChemistryComplete = (isCorrect: boolean, reward: number) => {
    if (activeChemistryQId) {
      setAnsweredChemistryIds((prev) => [...prev, activeChemistryQId]);
    }
    if (isCorrect) {
      setTotalCash((prev) => prev + reward);
      setCluesCount((prev) => prev + 1);
    }
    setActiveChemistryQId(null);
  };

  // NIGHT 1 CHOICE HANDLER
  const handleNight1Choice = (choice: 1 | 2) => {
    setShowNight1Long(false);
    // Transition to Day 2
    setDay(2);
    setCustomerIdx(0);
    setSceneMode('stall');
    setIsWaitingNextCustomer(false);
  };

  // DAY 3 INVITATION ACCEPTED
  const handleDay3AcceptInvitation = () => {
    setDay3Phase('nightclub_intro');
    setSceneMode('nightclub');
  };

  // DAY 3 ACTION PHASES
  const handleDay3StartFight = () => {
    setDay3Phase('fight_long');
    setSceneMode('fight_long');
  };

  const handlePhaseComplete = (next: string) => {
    if (next === 'bridge_chase') {
      setDay3Phase('bridge_chase');
      setSceneMode('bridge_chase');
    } else if (next === 'stall_burned') {
      setDay3Phase('stall_burned');
      setSceneMode('stall_burned');
    } else if (next === 'day4_start') {
      setDay(4);
      setSceneMode('arrest');
    }
  };

  // RESTART GAME
  const handleRestartGame = () => {
    setDay(1);
    setSceneMode('stall');
    setTotalCash(0);
    setCluesCount(0);
    setCustomerIdx(0);
    setIsServing(false);
    setShowNight1Long(false);
    setDay3Phase('start');
    setSpinStuntProgress(0);
    setAnsweredChemistryIds([]);
    setIsWaitingNextCustomer(false);
  };

  const isDialogueMode =
    (!isServing && sceneMode === 'stall' && !activeChemistryQId && !isWaitingNextCustomer) ||
    showNight1Long ||
    (day === 3 && (day3Phase === 'midday_warning' || day3Phase === 'nightclub_intro')) ||
    (day === 4 && sceneMode === 'arrest');

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-neutral-950 font-sans select-none">
      {/* 3D WebGL Canvas Layer */}
      <ThreeScene
        sceneMode={sceneMode}
        currentCustomerType={currentCustomer?.characterId || null}
        spinStuntProgress={spinStuntProgress}
        isBurned={sceneMode === 'stall_burned' || (day === 4 && sceneMode === 'arrest')}
      />

      {/* Top HUD and Bottom Dock */}
      <HUD
        day={day}
        totalCash={totalCash}
        reputation={reputation}
        cluesCount={cluesCount}
        sceneMode={sceneMode}
        onSelectCameraPreset={handleSelectCameraPreset}
        onOpenGuide={() => setShowGuide(true)}
      />

      {/* Click-to-start audio banner if browser requires user gesture */}
      {!hasStartedAudio && (
        <div className="absolute top-18 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <button
            onClick={() => {
              sounds.initCtx();
              sounds.startBietEmSeKhongVe();
              sounds.playBark();
              setHasStartedAudio(true);
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white font-bold text-xs shadow-2xl border border-white/30 backdrop-blur-md cursor-pointer animate-pulse hover:scale-105 transition-transform"
          >
            <Music className="w-4 h-4 text-amber-200" />
            <span>Chạm để bật nhạc & tiếng game 🎵 (Biết Em Sẽ Không Về - White Wave)</span>
          </button>
        </div>
      )}

      {/* Main Interactive Modals / Story Overlays */}
      <div
        className={`absolute inset-0 pointer-events-none flex p-4 z-30 transition-all duration-300 ${
          isDialogueMode
            ? 'items-end pb-8 justify-center'
            : 'items-center justify-center'
        }`}
      >
        <div
          className={`pointer-events-auto w-full transition-all duration-300 ${
            day === 3 && day3Phase === 'nightclub_intro'
              ? 'h-full max-w-4xl flex flex-col justify-between'
              : isDialogueMode
              ? 'max-w-3xl'
              : 'max-w-4xl flex items-center justify-center'
          }`}
        >
          {/* Waiting for next customer notification banner (Vô từ từ, không vừa xong là tới liền) */}
          {isWaitingNextCustomer && (
            <div className="flex flex-col gap-2.5 px-6 py-4 rounded-2xl bg-neutral-900/95 border-2 border-emerald-500/60 shadow-2xl backdrop-blur-md text-neutral-100 animate-fadeIn min-w-[320px]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-extrabold text-sm text-emerald-300">
                    ĐÃ THỐI TIỀN XONG! KHÁCH CẢM ƠN RA VỀ.
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    Khách tiếp theo đang từ từ bước vào quán (vô từ từ)...
                  </div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-emerald-400 rounded-full animate-progress-fill-wait" />
              </div>
            </div>
          )}

          {/* DAY 1 & DAY 2: Customer Dialogue Prompt */}
          {(day === 1 || day === 2) &&
            !showNight1Long &&
            !isServing &&
            sceneMode === 'stall' &&
            !activeChemistryQId &&
            !isWaitingNextCustomer &&
            currentCustomer && (
              <CustomerDialogue
                customerFlow={currentCustomer}
                onStartCooking={handleStartCooking}
                onOpenChemistry={(qId) => setActiveChemistryQId(qId)}
                chemistryAnswered={
                  currentCustomer.chemistryQuestionId
                    ? answeredChemistryIds.includes(currentCustomer.chemistryQuestionId)
                    : false
                }
              />
            )}

          {/* Cooking Station Modal */}
          {sceneMode === 'cooking' && currentCustomer && (
            <CookingStation
              order={currentCustomer.order}
              onFinishCook={handleFinishCooking}
              onCancel={handleCancelCooking}
            />
          )}

          {/* Cashier Change Modal */}
          {sceneMode === 'cashier' && currentCustomer && (
            <CashierModal
              order={currentCustomer.order}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {/* Chemistry Question Modal */}
          {activeChemistryQId && CHEMISTRY_QUESTIONS[activeChemistryQId] && (
            <ChemistryModal
              question={CHEMISTRY_QUESTIONS[activeChemistryQId]}
              onAnswerComplete={handleChemistryComplete}
            />
          )}

          {/* Day 1 Night: Anh Long Demanding Protection Money */}
          {showNight1Long && (
            <NightLongModal
              onChoiceMade={handleNight1Choice}
              onGameOverRestart={handleRestartGame}
            />
          )}

          {/* Day 3 Midday: Gia Bảo Warning & Phú Bà Arrival */}
          {day === 3 && day3Phase === 'midday_warning' && (
            <Day3MiddayModal onAcceptInvitation={handleDay3AcceptInvitation} />
          )}

          {/* Day 3 Night: Nightclub Infiltration Dialogue */}
          {day === 3 && day3Phase === 'nightclub_intro' && (
            <NightclubInfiltrationModal onStartFight={handleDay3StartFight} />
          )}

          {/* Day 3: Action Fight vs Anh Long, Bridge 360 Spin Chase, Stall Burned & Cậu Vàng */}
          {day === 3 &&
            ['fight_long', 'bridge_chase', 'stall_burned'].includes(day3Phase) && (
              <ActionFightGame
                phase={day3Phase as 'fight_long' | 'bridge_chase' | 'stall_burned'}
                onPhaseComplete={handlePhaseComplete}
                onUpdateSpinProgress={(p) => setSpinStuntProgress(p)}
              />
            )}

          {/* Day 4: Handcuffing Trưởng Làng Hiệu & Police Badge Magic Reveal */}
          {day === 4 && sceneMode === 'arrest' && (
            <ArrestScene onRestartGame={handleRestartGame} />
          )}
        </div>
      </div>

      {/* Guide & Chemistry Cheat Sheet Modal */}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
    </main>
  );
}
