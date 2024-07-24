import { create } from "zustand";

const useSeletectUserStore = create((set) => ({
  seletedUser: {
    selected: false,
    studentId: "",
    role: ""
  },
  setSelectedUser: (newStudentId, newRole) => set({
    seletedUser: {
      selected: true,
      studentId: newStudentId,
      role: newRole
  }}),
  resetSelectedUser: () => set({
    seletedUser: {
      selected: false,
      studentId: "",
      role: ""
  }})
}))

export default useSeletectUserStore;