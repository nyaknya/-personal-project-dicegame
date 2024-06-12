export enum Status {
  Weakness = "weakness",
  Infection = "infection",
}

export interface Character {
  name: string;
  hp: number;
  mental: number;
  aggressive: number;
  creativity: number;
  kindness: number;
  status: Status | null;
  equipment: string | null;
}
