import { create } from 'zustand';

const useSeletectedChatStu = create((set) => ({
    selectedChatStu: {
        studentId: "",
    },
    setSelectedChatStu: (newStudentId) => set(() => ({
        selectedChatStu: {
            studentId: newStudentId,
        },
    })),
}));

export default useSeletectedChatStu;