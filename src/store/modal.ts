import { create } from "zustand";

interface IModalStore {
  modalName: string;
  isModalOpen: boolean;
  modalContent: object;
  openModal: (modalName: string, modalContent: object) => void;
  closeModal: () => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  modalName: "",
  isModalOpen: false,
  modalContent: {},
  openModal: (modalName: string, modalContent: object) => {
    set({
      modalName: modalName,
      modalContent: modalContent,
      isModalOpen: true,
    });
  },
  closeModal: () => {
    set({ isModalOpen: false, modalName: "", modalContent: {} });
  },
}));
