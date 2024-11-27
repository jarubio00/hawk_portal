import { StateCreator } from "zustand";

export interface StepperSlice {
  activeStep: number;
  updateActiveStep: (step: number) => void;
}

const initialState = {
  activeStep: 1,
};

export const createStepperSlice: StateCreator<StepperSlice> = (set, get) => ({
  ...initialState,
  updateActiveStep: (step: number) => {
    set({ activeStep: step });
  },
});
