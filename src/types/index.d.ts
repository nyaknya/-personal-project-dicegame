export enum Status {
  Weakness = "weakness",
  Infection = "infection",
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
  status: Status | null;
  equipment: string | null;
}
