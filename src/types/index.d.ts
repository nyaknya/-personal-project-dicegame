export type Status = "normal" | "weakness" | "infection" | null;

export interface Stats {
  aggressive: number;
  creativity: number;
  kindness: number;
}

export interface Character {
  name: string;
  max_hp: number;
  current_hp: number;
  max_mental: number;
  current_mental: number;
  aggressive: number;
  creativity: number;
  kindness: number;
  status: Status;
  equipment: string | null;
}

export interface CharacterState {
  character: Character | null;
  isWeakness: boolean;
  isInfection: boolean;
  stats: Stats;
  originalStats: Stats;
  isSelected: boolean;
}
