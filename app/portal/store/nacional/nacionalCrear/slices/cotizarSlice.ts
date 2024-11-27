import React from "react";
import getDirecciones from "@/app/actions/getDirecciones";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NacionalPaquete, SafeDireccion, SafeUser, Tarifa } from "@/app/types";
import { StateCreator } from "zustand";
import { nacionalCotizar } from "@/app/actions/apiQuerys";

export interface CotizarSlice {
  direcciones: SafeDireccion[];
  getDirecciones: () => void;
  direccionesLoading: boolean;
  direccionDefault: string;
  direccionValue: string;
  direccionSelected: SafeDireccion | undefined;
  updateDireccionValue: (value: string) => void;
  cpValue: string;
  updateCpValue: (value: string) => void;
  municipioValue: string;
  updateMunicipioValue: (value: string) => void;
  largoValue: string;
  anchoValue: string;
  altoValue: string;
  pesoValue: string;
  updateLargoValue: (value: string) => void;
  updateAnchoValue: (value: string) => void;
  updateAltoValue: (value: string) => void;
  updatePesoValue: (value: string) => void;
  fetchCotizacion: () => void;
  cotizacionLoading: boolean;
  updateCotizacionLoading: (value: boolean) => void;
  cotizaciones: Tarifa[];
  cotizacionSelected: Tarifa | undefined;
  updateCotizacionSelected: (cot: Tarifa) => void;
  datePickerOpen: boolean;
  dateSelected: Date | undefined;
  datetime: Date;
  updateDatePickerOpen: (val: boolean) => void;
  updateDateSelected: (date: Date) => void;
  seguroSelected: boolean;
  updateSeguroSelected: (val: boolean) => void;
  shipmentValue: string;
  updateShipmentValue: (val: string) => void;
  currentUser: SafeUser | undefined;
  updateCurrentUser: (user: SafeUser) => void;
}

const initialState = {
  direcciones: [],
  direccionesLoading: false,
  direccionDefault: "",
  direccionValue: "",
  direccionSelected: undefined,
  cpValue: "64850",
  municipioValue: "Monterrey",
  largoValue: "2",
  anchoValue: "2",
  altoValue: "2",
  pesoValue: "2",
  cotizaciones: [],
  cotizacionLoading: false,
  cotizacionSelected: undefined,
  datePickerOpen: false,
  dateSelected: undefined,
  datetime: new Date(),
  seguroSelected: false,
  shipmentValue: "0",
  currentUser: undefined,
};

export const createCotizarSlice: StateCreator<CotizarSlice> = (set, get) => ({
  ...initialState,
  getDirecciones: async () => {
    set({ direccionesLoading: true });
    set({ direccionValue: "loading" });
    const result = await getDirecciones();

    set({ direcciones: result });

    const timer = setTimeout(() => {
      const def = result.map((d: SafeDireccion) => {
        if (d.default) {
          set({ direccionDefault: d?.id.toString() });
          set({ direccionValue: d?.id.toString() });
          set({ direccionSelected: d });
        }
      });
      set({ direccionesLoading: false });
    }, 2500);
  },
  updateDireccionValue: (value: string) => {
    set({ direccionValue: value });
  },
  updateCpValue: (value: string) => {
    set({ cpValue: value });
  },
  updateMunicipioValue: (value: string) => {
    set({ municipioValue: value });
  },
  updateLargoValue: (value: string) => {
    set({ largoValue: value });
  },
  updateAnchoValue: (value: string) => {
    set({ anchoValue: value });
  },
  updateAltoValue: (value: string) => {
    set({ altoValue: value });
  },
  updatePesoValue: (value: string) => {
    set({ pesoValue: value });
  },
  fetchCotizacion: async () => {
    set({ cotizacionLoading: true });
    const apiData = {
      originPostalCode: get().direccionSelected?.cpId.toString(),
      originCityName: get().direccionSelected?.municipio.municipio,
      destinationPostalCode: get().cpValue,
      destinationCityName: get().municipioValue,
      weight: parseFloat(get().pesoValue),
      length: parseFloat(get().largoValue),
      width: parseFloat(get().anchoValue),
      height: parseFloat(get().altoValue),
      plannedShippingDate: "2024-11-25",
      shipmentProtection: get().seguroSelected ?? false,
      shipmentValue: parseFloat(get().shipmentValue) ?? 0,
    };
    const result = await nacionalCotizar(apiData);
    set({ cotizaciones: result.data });
    set({ cotizacionLoading: false });
    console.log(result);
  },
  updateCotizacionLoading: (value: boolean) => {
    set({ cotizacionLoading: value });
  },
  updateCotizacionSelected: (cot: Tarifa) => {
    set({ cotizacionSelected: cot });
  },
  updateDatePickerOpen: (value: boolean) => {
    set({ datePickerOpen: value });
  },
  updateDateSelected: (value: Date) => {
    set({ dateSelected: value });
  },
  updateSeguroSelected: (value: boolean) => {
    set({ seguroSelected: value });
  },
  updateShipmentValue: (value: string) => {
    set({ shipmentValue: value });
  },
  updateCurrentUser: (user: SafeUser) => {
    set({ currentUser: user });
  },
});
