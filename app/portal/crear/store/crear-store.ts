import { create } from "zustand";
import {
  ProgramaAvisoSlice,
  createProgramaAvisoSlice,
} from "./slices/programaAvisoSlice";
import {
  createProgramaV2Slice,
  ProgramaV2Slice,
} from "./slices/programaV2Slice";

import {
  createMetodoPagoSlice,
  MetodoPagoSlice,
} from "./slices/metodoPagoSlice";

type StoreState = ProgramaAvisoSlice & ProgramaV2Slice & MetodoPagoSlice;

export const useProgramaStore = create<StoreState>()((...a) => ({
  ...createProgramaAvisoSlice(...a),
  ...createProgramaV2Slice(...a),
  ...createMetodoPagoSlice(...a),
}));
