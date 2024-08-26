import { create } from 'zustand';

const useWritingListStore = create((set) => ({
  writingList: [],
  setWritingList: (newList) => set({ writingList: newList }),
}));

export { useWritingListStore };