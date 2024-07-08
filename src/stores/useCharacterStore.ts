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
  selectedCharacters: Set<string>;
  addSelectedCharacter: (name: string) => void;
  removeSelectedCharacter: (name: string) => void;
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
}));
