import { getAvisoActivo } from "@/app/actions/apiQuerys";
import { StateCreator } from "zustand";

export interface MetodoPagoSlice {
  metodoPago: number | undefined;
  efectivoOpen: boolean;
  efectivoSelected: boolean;
  transferOpen: boolean;
  transferSelected: boolean;
  comprobanteFile: File | undefined;
  comprobanteUrl: string;
  comprobanteLoading: boolean;
  comprobanteUploaded: boolean;
  updateEfectivoOpen: (open: boolean) => void;
  updateTransferOpen: (open: boolean) => void;
  updateEfectivoSelected: (open: boolean) => void;
  updateTransferSelected: (open: boolean) => void;
  updateMetodoPago: (val: number) => void;
  updateComprobanteFile: (file: File | undefined) => Promise<boolean>;
  updateComprobanteUrl: (url: string) => void;
  updateComprobanteLoading: (val: boolean) => void;
  updateComprobanteUploaded: (val: boolean) => void;
}

const initialState = {
  metodoPago: undefined,
  efectivoOpen: false,
  efectivoSelected: false,
  transferOpen: false,
  transferSelected: false,
  comprobanteFile: undefined,
  comprobanteUrl: "",
  comprobanteLoading: false,
  comprobanteUploaded: false,
};

export const createMetodoPagoSlice: StateCreator<MetodoPagoSlice> = (
  set,
  get
) => ({
  ...initialState,
  updateEfectivoOpen: (val: boolean) => {
    set({ efectivoOpen: val });
  },
  updateTransferOpen: (val: boolean) => {
    set({ transferOpen: val });
  },
  updateEfectivoSelected: (val: boolean) => {
    set({ efectivoSelected: val });
  },
  updateTransferSelected: (val: boolean) => {
    set({ transferSelected: val });
  },
  updateMetodoPago: (val: number | undefined) => {
    set({ metodoPago: val });
  },
  updateComprobanteFile: async (val: File | undefined) => {
    set({ comprobanteFile: val });
    return true;
  },
  updateComprobanteUrl: (val: string | undefined) => {
    set({ comprobanteUrl: val });
  },
  updateComprobanteLoading: (val: boolean) => {
    set({ comprobanteLoading: val });
  },
  updateComprobanteUploaded: (val: boolean) => {
    set({ comprobanteUploaded: val });
  },
});
