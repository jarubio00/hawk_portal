import { create } from "zustand";
import { CartSlice, createCartSlice } from "./slices/cart";
import { CotizarSlice, createCotizarSlice } from "./slices/cotizarSlice";
import { createDestinoSlice, DestinoSlice } from "./slices/destinoSlice";
import { createStepperSlice, StepperSlice } from "./slices/stepper";

type StoreState = CotizarSlice & StepperSlice & CartSlice & DestinoSlice;

export const useNacionalCrearStore = create<StoreState>()((...a) => ({
  ...createCotizarSlice(...a),
  ...createStepperSlice(...a),
  ...createCartSlice(...a),
  ...createDestinoSlice(...a),
}));
