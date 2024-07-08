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
  initializeCharacterStates: (characterStates: CharacterState[]) => void;
  updateCharacterState: (index: number, updatedState: CharacterState) => void;
  selectedCharacters: Set<string>;
  addSelectedCharacter: (name: string) => void;
  removeSelectedCharacter: (name: string) => void;
  totalStats: Stats;
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
      const totalStats = newStates.reduce(
        (totals, state) => {
          if (state.character) {
            totals.aggressive += state.stats.aggressive;
            totals.creativity += state.stats.creativity;
            totals.kindness += state.stats.kindness;
          }
          return totals;
        },
        { aggressive: 0, creativity: 0, kindness: 0 }
      );
      return { characterStates: newStates, totalStats };
    });
  },
  selectedCharacters: new Set(),
  addSelectedCharacter: (name) =>
    set((state) => {
      const newSelectedCharacters = new Set(state.selectedCharacters);
      newSelectedCharacters.add(name);
      return { selectedCharacters: newSelectedCharacters };
    }),
  removeSelectedCharacter: (name) =>
    set((state) => {
      const newSelectedCharacters = new Set(state.selectedCharacters);
      newSelectedCharacters.delete(name);
      return { selectedCharacters: newSelectedCharacters };
    }),
  totalStats: { aggressive: 0, creativity: 0, kindness: 0 },
}));
