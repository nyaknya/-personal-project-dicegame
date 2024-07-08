import create from "zustand";
import { CharacterState, Stats } from "../types";

interface CharacterStore {
  characterStates: CharacterState[];
  totalStats: Stats;
  initializeCharacterStates: (states: CharacterState[]) => void;
  updateCharacterState: (index: number, state: CharacterState) => void;
}

const useCharacterStore = create<CharacterStore>((set) => ({
  characterStates: [],
  totalStats: { aggressive: 0, creativity: 0, kindness: 0 },
  initializeCharacterStates: (states) => set({ characterStates: states }),
  updateCharacterState: (index, updatedState) =>
    set((state) => {
      const updatedStates = [...state.characterStates];
      updatedStates[index] = updatedState;
      const totalStats = updatedStates.reduce(
        (acc, curr) => ({
          aggressive: acc.aggressive + curr.stats.aggressive,
          creativity: acc.creativity + curr.stats.creativity,
          kindness: acc.kindness + curr.stats.kindness,
        }),
        { aggressive: 0, creativity: 0, kindness: 0 }
      );
      return { characterStates: updatedStates, totalStats };
    }),
}));

export { useCharacterStore };
