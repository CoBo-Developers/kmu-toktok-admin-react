import { create } from 'zustand';

const useUserStore = create((set) => ({
  studentId: '',
  setStudentId: (studentId) => set({ studentId: studentId }),
}));

const useUserListStore = create((set) => ({
  userList: [],
  setUserList: (newUserList) => set({ userList: newUserList })
}))

export { useUserStore, useUserListStore };