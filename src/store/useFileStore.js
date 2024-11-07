import { create } from 'zustand'

const useCategoryStore = create((set) => ({
    categoryList: [],

    colors: ['#FFD1FA','#E5FFD1','#D1F1FF','#FFFAD1','#EED1FF','#EEEEEE'],

    setCategoryList: (id, categoryName) =>
        set((state) => {
            const colorIndex = state.categoryList.length % state.colors.length;
            const color = state.colors[colorIndex];

            return {
                categoryList: [
                    ...state.categoryList,
                    { id, name: categoryName, color },
                ],
            };
        }),
}));

const useSelectedCategoryIdStore = create((set) => ({
    selectedCategoryId: 0,
    setSelectedCategoryId: (newSelectedCategoryId) => set({ selectedCategoryId: newSelectedCategoryId }),
}))

const useFileStore = create((set) => ({
    selectedCategoryId: null,
    setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),

    selectedFiles: [],
    setSelectedFiles: (files) => set({ selectedFiles: files }),

    addSelectedFile: (file) => set((state) => ({
        selectedFiles: [...state.selectedFiles, file],
    })),

    removeSelectedFile: (fileId) => set((state) => ({
        selectedFiles: state.selectedFiles.filter((file) => file.id !== fileId),
    })),

    clearSelectedFiles: () => set({ selectedFiles: [] }),

    fileUpdateTrigger: false,
    triggerFileUpdate: () => set((state) => ({ fileUpdateTrigger: !state.fileUpdateTrigger })),
}));

export { useSelectedCategoryIdStore, useCategoryStore, useFileStore };