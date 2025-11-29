import { create } from 'zustand';

interface CodTutorialStore {
  // Tutorial modal
  isModalOpen: boolean;
  currentStep: number;
  termsAccepted: boolean;
  showSuccess: boolean;

  // Service state
  serviceEnabled: boolean;

  // Login dialog state
  showLoginDialog: boolean;
  loginDialogShown: boolean;

  // Banner state
  showBanner: boolean;
  bannerDismissed: boolean;

  // Loading state
  isLoading: boolean;

  // Checklist loaded flag - para evitar recargar y mostrar dialogs en cada navegación
  checklistLoaded: boolean;

  // Tutorial modal actions
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;
  setTermsAccepted: (accepted: boolean) => void;

  // Service actions
  enableService: () => Promise<void>;
  resetTutorial: () => void;

  // Login dialog actions
  showLoginDialogOnce: () => void;
  deferLoginDialog: () => Promise<void>;

  // Banner actions
  dismissBanner: () => Promise<void>;

  // Data actions
  loadChecklist: () => Promise<void>;
}

export const useCodTutorialStore = create<CodTutorialStore>((set, get) => ({
  // Tutorial modal
  isModalOpen: false,
  currentStep: 1,
  termsAccepted: false,
  showSuccess: false,

  // Service state
  serviceEnabled: false,

  // Login dialog state
  showLoginDialog: false,
  loginDialogShown: false,

  // Banner state
  showBanner: false,
  bannerDismissed: false,

  // Loading state
  isLoading: false,

  // Checklist loaded flag
  checklistLoaded: false,

  // Tutorial modal actions
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, currentStep: 1, termsAccepted: false, showSuccess: false }),

  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 5)
  })),

  previousStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 1)
  })),

  setStep: (step: number) => set({ currentStep: step }),

  setTermsAccepted: (accepted: boolean) => set({ termsAccepted: accepted }),

  // Service actions
  enableService: async () => {
    try {
      set({ isLoading: true });

      const response = await fetch('/api/cod/checklist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cobrosEnabled: true }),
      });

      if (!response.ok) throw new Error('Error al habilitar el servicio');

      // Mostrar éxito primero
      set({
        serviceEnabled: true,
        showBanner: false,
        showLoginDialog: false,
        isLoading: false,
        showSuccess: true,
      });

      // Cerrar el modal después de 2 segundos
      setTimeout(() => {
        set({ isModalOpen: false, showSuccess: false, currentStep: 1, termsAccepted: false });
      }, 2500);
    } catch (error) {
      console.error('Error enabling service:', error);
      set({ isLoading: false });
    }
  },

  resetTutorial: () => set({
    currentStep: 1,
    termsAccepted: false,
    isModalOpen: false
  }),

  // Login dialog actions
  showLoginDialogOnce: () => set((state) => {
    if (!state.loginDialogShown && !state.serviceEnabled && state.showLoginDialog) {
      return { loginDialogShown: true };
    }
    return {};
  }),

  deferLoginDialog: async () => {
    try {
      await fetch('/api/cod/checklist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayCobrosDialog: false }),
      });

      set({ showLoginDialog: false });
    } catch (error) {
      console.error('Error deferring dialog:', error);
      set({ showLoginDialog: false });
    }
  },

  // Banner actions
  dismissBanner: async () => {
    try {
      await fetch('/api/cod/checklist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayCobrosBanner: false }),
      });

      set({ showBanner: false, bannerDismissed: true });
    } catch (error) {
      console.error('Error dismissing banner:', error);
      set({ showBanner: false, bannerDismissed: true });
    }
  },

  // Data actions
  loadChecklist: async () => {
    // Si ya se cargó el checklist en esta sesión, solo actualizar serviceEnabled
    // pero no mostrar dialogs nuevamente
    const { checklistLoaded } = get();

    try {
      set({ isLoading: true });

      const response = await fetch('/api/cod/checklist');
      if (!response.ok) throw new Error('Error al cargar checklist');

      const data = await response.json();

      if (checklistLoaded) {
        // Ya se cargó antes, solo actualizar serviceEnabled sin mostrar dialogs
        set({
          serviceEnabled: data.cobrosEnabled,
          isLoading: false,
        });
      } else {
        // Primera carga, mostrar dialogs si corresponde
        set({
          serviceEnabled: data.cobrosEnabled,
          showLoginDialog: data.displayCobrosDialog,
          showBanner: data.displayCobrosBanner,
          isLoading: false,
          checklistLoaded: true,
        });
      }
    } catch (error) {
      console.error('Error loading checklist:', error);
      set({ isLoading: false });
    }
  },
}));
