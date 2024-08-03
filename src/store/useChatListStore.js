import { create } from 'zustand';

const useChatListStore = create((set) => ({
  chatList: [],
  setChatList: (newChatList) => set({ chatList: newChatList }),
}));

export default useChatListStore;