import { create } from 'zustand';

interface BuscarCodigoModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBuscarCodigoModal = create<BuscarCodigoModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useBuscarCodigoModal;