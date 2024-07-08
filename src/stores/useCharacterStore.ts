import create from "zustand";
import { Character } from "../types";

interface Stats {
  aggressive: number;
  creativity: number;
  kindness: number;
}

interface CharacterState {
  character: Character | null;
  isWeakness: boolean;
  isInfection: boolean;
  stats: Stats;
}

interface CharacterStore {
  characterStates: CharacterState[];
  setCharacterStates: (characterStates: CharacterState[]) => void;
  updateCharacterState: (index: number, updatedState: CharacterState) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  characterStates: [],
  setCharacterStates: (characterStates) => set({ characterStates }),
  updateCharacterState: (index, updatedState) =>
    set((state) => {
      const newCharacterStates = [...state.characterStates];
      newCharacterStates[index] = updatedState;
      return { characterStates: newCharacterStates };
    }),
}));
