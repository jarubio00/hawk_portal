import { nacionalShipmentCreate } from "@/app/actions/apiQuerys";
import { NacionalShipment } from "@/app/types";
import { StateCreator } from "zustand";

export interface CartSlice {
  total: number;
  updateCartTotal: (val: number) => void;
  shipments: NacionalShipment[];
  createShipment: (data: NacionalShipment) => void;
  shipmentLoading: boolean;
  updateShipmentLoading: (val: boolean) => void;
  order: any;
}

const initialState = {
  total: 0,
  shipments: [],
  shipmentLoading: false,
  order: undefined,
};

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  ...initialState,
  updateCartTotal: (val: number) => {
    set({ total: val });
  },
  createShipment: async (data: NacionalShipment) => {
    set({ shipmentLoading: true });
    const result = await nacionalShipmentCreate(data);
    set({ order: result });
    set({ shipmentLoading: false });
  },
  updateShipmentLoading: (val: boolean) => {
    set({ shipmentLoading: val });
  },
});
