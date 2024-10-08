import create from "zustand";
import { CharacterState, Stats } from "../types"; // CharacterState 가져오기

interface CharacterStore {
  characterStates: CharacterState[];
  totalStats: Stats;
  initializeCharacterStates: (states: CharacterState[]) => void;
  updateCharacterState: (index: number, state: CharacterState) => void;
  toggleCharacterSelection: (index: number) => void;
  toggleAllSelections: (isSelected: boolean) => void; // 추가된 액션
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
  toggleCharacterSelection: (index) =>
    set((state) => {
      const updatedStates = [...state.characterStates];
      const currentState = updatedStates[index];
      currentState.isSelected = !currentState.isSelected;
      updatedStates[index] = currentState;
      return { characterStates: updatedStates };
    }),
  toggleAllSelections: (isSelected) =>
    set((state) => {
      const updatedStates = state.characterStates.map((characterState) => ({
        ...characterState,
        isSelected,
      }));
      return { characterStates: updatedStates };
    }),
}));

export { useCharacterStore };
