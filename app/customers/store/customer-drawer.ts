import { create } from "zustand";

interface CustomerDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCustomerDrawer = create<CustomerDrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCustomerDrawer;
