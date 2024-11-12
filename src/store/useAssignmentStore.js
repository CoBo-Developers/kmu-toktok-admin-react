import { create } from 'zustand';

const useAssignmentStore = create((set) => ({
  assignmentData: {
    id: null,
    title: '',
    description: '',
    constraints: '',
    score: '',
    startDate: {year: null, month: null, day: null},
    endDate: {year: null, month: null, day: null},
  },
  setAssignmentData: (newData) => set((state) => ({
    assignmentData: { ...state.assignmentData, ...newData }
  }))
}));

export default useAssignmentStore;
