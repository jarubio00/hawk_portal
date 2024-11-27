import { NacionalDestino } from "@/app/types";
import { StateCreator } from "zustand";

export interface DestinoSlice {
  cpId: string;
  colonia: string;
  municipioId: string;
  calle: string;
  numero: string;
  numeroInt: string;
  empresa: string;
  referencias: string;
  contactoNombre: string;
  contactoTel: string;
  otraColoniaNombre: string;
  countryCode: string;
  save: boolean;
  updateDestino: (destino: NacionalDestino) => void;
  destinoSelected: NacionalDestino | undefined;
}

const initialState = {
  cpId: "",
  colonia: "",
  municipioId: "",
  calle: "",
  numero: "",
  numeroInt: "",
  empresa: "",
  referencias: "",
  contactoNombre: "",
  contactoTel: "",
  otraColoniaNombre: "",
  countryCode: "",
  save: false,
  destinoSelected: undefined,
};

export const createDestinoSlice: StateCreator<DestinoSlice> = (set, get) => ({
  ...initialState,
  updateDestino: (destino: NacionalDestino) => {
    set({ destinoSelected: destino });
  },
});
