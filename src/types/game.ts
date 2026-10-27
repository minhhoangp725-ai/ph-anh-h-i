export type DayId = 1 | 2 | 3 | 4;

export type MeatType = 'tai' | 'chin' | 'none';
export type ScallionOption = 'yes' | 'no';
export type SideOption = 'quay' | 'com' | 'none';

export interface PhoOrder {
  id: string;
  customerName: string;
  meat: MeatType;
  scallion: ScallionOption;
  sides: SideOption[];
  note: string;
  totalPrice: number; // in VND
  givenCash: number; // in VND
  expectedChange: number; // in VND
}

export interface CharacterInfo {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  description: string;
}

export interface ChemistryQuestion {
  id: string;
  question: string;
  formulaHint?: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  rewardCash: number;
  clueUnlock?: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  avatar?: string;
  mood?: 'normal' | 'happy' | 'angry' | 'shocked' | 'suspicious' | 'heroic';
  sfx?: string;
  chemistryQuestionId?: string;
  choices?: {
    text: string;
    nextStepId: string;
    effect?: () => void;
  }[];
}

export type SceneMode = 
  | 'stall'         // Inside/in front of Pho stall
  | 'cooking'       // 3D cooking close-up table
  | 'cashier'       // Counting change
  | 'nightclub'     // Nightclub "Thiên Đường"
  | 'fight_long'    // Martial arts fight vs Anh Long
  | 'bridge_chase'  // Motorbike 360 spin stunt on the bridge
  | 'stall_burned'  // Burned stall & reunion with Cậu Vàng
  | 'arrest'        // Handcuffing Trưởng làng Hiệu & revealing Police Badge
  | 'victory';      // Final summary / awards
