import { create } from 'zustand';

const useChatListStore = create((set) => ({
  chatList: [],
  setChatList: (newChatList) => set({ chatList: newChatList }),
  renderChatList: false,
  setRenderChatList: (isRender) => set({ renderChatList: isRender }),
}));

export default useChatListStore;