import { create } from 'zustand';

interface PortalDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePortalDrawer = create<PortalDrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePortalDrawer;