import create from "zustand";

interface PeopleCounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (count: number) => void;
}

const usePeopleCounterStore = create<PeopleCounterState>((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: Math.min(state.count + 1, 26) })),
  decrement: () => set((state) => ({ count: Math.max(state.count - 1, 1) })),
  setCount: (count: number) => set({ count }),
}));

export default usePeopleCounterStore;
