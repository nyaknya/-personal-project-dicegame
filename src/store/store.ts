import create from "zustand";

interface State {
  number: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<State>((set) => ({
  number: 0,
  increment: () => set((state) => ({ number: state.number + 1 })),
  decrement: () => set((state) => ({ number: state.number - 1 })),
}));

export default useStore;
