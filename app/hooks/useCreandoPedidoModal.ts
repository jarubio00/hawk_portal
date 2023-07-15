import { create } from 'zustand';

interface CreandoPedidoModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreandoPedidoModal = create<CreandoPedidoModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useCreandoPedidoModal;