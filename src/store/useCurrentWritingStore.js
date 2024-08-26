import { create } from "zustand";

const useCurrentWritingStore = create((set) => ({
  currentWritingId: null,
  setCurrentWritingId: (newId) => set({ currentWritingId: newId })
}));

export { useCurrentWritingStore };