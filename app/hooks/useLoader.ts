import { create } from 'zustand';

interface LoaderStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoader = create<LoaderStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useLoader;