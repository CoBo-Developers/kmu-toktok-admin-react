import { create } from "zustand";

const useSeletectUserStore = create((set) => ({
  seletedUser: {
    selected: false,
    studentId: null,
    role: null
  },
  setSelectedUser: (newStudentId, newRole) => set({
    seletedUser: {
    selected: true,
    studentId: newStudentId,
    role: newRole
  }}),
  resetStudentUser: () => set({
    seletedUser: {
    selected: false,
    studentId: null,
    role: null
  }})
}))

export default useSeletectUserStore;