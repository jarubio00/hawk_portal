import { create } from 'zustand';

interface SidebarModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSidebarModal = create<SidebarModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSidebarModal;