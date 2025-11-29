"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  // Flags principales
  serviceEnabled: boolean; // ¿El cliente ya habilitó el servicio?
  showBanner: boolean; // ¿Mostrar el banner persistente en el dashboard?
  showLoginDialog: boolean; // ¿Mostrar el diálogo inmediatamente tras login?

  // Auditoría/auxiliares
  termsVersionAccepted?: string | null;
  termsAcceptedAt?: string | null; // ISO string
  lastLoginDialogShownAt?: string | null;

  // Simulación de “evento login”
  justLoggedIn: boolean; // Se setea a true justo después del login

  // Actions
  onLogin: () => void; // Reglas al entrar al dashboard tras login
  enableService: (opts?: { termsVersion?: string }) => void; // Habilitar servicio tras onboarding
  deferDialog: () => void; // Cierra diálogo y muestra banner
  resetMock: () => void; // Dev util (resetear todo)
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      serviceEnabled: false,
      showBanner: true,
      showLoginDialog: false,

      termsVersionAccepted: null,
      termsAcceptedAt: null,
      lastLoginDialogShownAt: null,

      justLoggedIn: false,

      onLogin: () => {
        const s = get();
        // Se muestra el dialog solo si: no está habilitado, justo tras login, y no existe kill-switch aquí (mock simple)
        if (!s.serviceEnabled && s.justLoggedIn) {
          set({
            showLoginDialog: true,
            lastLoginDialogShownAt: new Date().toISOString(),
            justLoggedIn: false,
          });
        } else {
          // Asegurar que no quede encendido
          set({ showLoginDialog: false, justLoggedIn: false });
        }
      },

      enableService: (opts) => {
        const now = new Date().toISOString();
        set({
          serviceEnabled: true,
          showBanner: false,
          showLoginDialog: false,
          termsVersionAccepted: opts?.termsVersion ?? "v1",
          termsAcceptedAt: now,
        });
      },

      deferDialog: () => {
        set({ showLoginDialog: false, showBanner: true });
      },

      resetMock: () => {
        set({
          serviceEnabled: false,
          showBanner: true,
          showLoginDialog: false,
          termsVersionAccepted: null,
          termsAcceptedAt: null,
          lastLoginDialogShownAt: null,
          justLoggedIn: false,
        });
      },
    }),
    { name: "onboarding-cobro-destinatario" }
  )
);
