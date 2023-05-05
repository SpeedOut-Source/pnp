import { create } from "zustand";

interface SearchOpenModel {
  isOpen: boolean;
  setIsOpen: (mode: boolean) => void;
}

export const useSearchModeStore = create<SearchOpenModel>((set) => ({
  isOpen: false,
  setIsOpen: (mode: boolean) => set({ isOpen: mode }),
}));
