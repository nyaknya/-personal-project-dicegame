import create from "zustand";
import { Character } from "../types";

interface CharacterState {
  character: Character | null;
  isWeakness: boolean;
  isInfection: boolean;
  stats: {
    aggressive: number;
    creativity: number;
    kindness: number;
  };
}

interface CharacterStore {
  characterStates: CharacterState[];
  initializeCharacterStates: (characterStates: CharacterState[]) => void;
  updateCharacterState: (index: number, updatedState: CharacterState) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  characterStates: [],
  initializeCharacterStates: (characterStates) => {
    set({ characterStates });
  },
  updateCharacterState: (index, updatedState) => {
    set((state) => {
      const newStates = [...state.characterStates];
      newStates[index] = updatedState;
      return { characterStates: newStates };
    });
  },
}));
