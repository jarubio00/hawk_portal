import {
  getEntDatesV2,
  getRecDatesV2,
  getTodayServerDate,
} from "@/app/actions/apiQuerys";
import { getServerDate } from "@/app/api/utils/validatorUtils";
import { DateV2, ServerDate } from "@/app/types";
import { formatLongEs, padGlobal2, parseYMDLocal } from "@/app/utils/dateUtils";
import { G } from "@react-pdf/renderer";
import { StateCreator } from "zustand";

export interface ProgramaV2Slice {
  //today
  today: ServerDate | undefined;
  getTodayDate: () => void;

  //Recoleccion
  recoleccionDate: DateV2 | undefined;
  recCalOpen: boolean;
  recCalLoading: boolean;
  recSelectedDate: Date | undefined;
  updateRecCalOpen: (open: boolean) => void;
  updateRecCalLoading: (val: boolean) => void;
  updateRecSelectedDate: (date: Date | undefined) => void;

  //Entrega
  entregaDate: DateV2 | undefined;
  entCalOpen: boolean;
  entCalLoading: boolean;
  entSelectedDate: Date | undefined;
  updateEntCalOpen: (open: boolean) => void;
  updateEntCalLoading: (val: boolean) => void;
  updateEntSelectedDate: (date: Date | undefined) => void;

  //Mismo Dia
  mismoDiaSelected: boolean;
  updateMismoDiaSelected: (val: boolean) => void;
  mismoDiaEnabled: boolean;
  mismoDiaCustomMessage: string;
  entregaLoading: boolean;
  updateEntregaLoading: (val: boolean) => void;

  //Validations
  updateFinalDates: () => Promise<boolean>;
  getRecDates: (municipioRecId: number) => void;
  recBlockedDates: Date[];
  entBlockedDates: Date[];
  getEntregaDates: ({
    fechaString,
    municipioEntId,
  }: {
    fechaString: string;
    municipioEntId: number;
  }) => void;

  //Timeout
  timeoutDialogOpen: boolean;
  updateTimeoutDialogOpen: (val: boolean) => void;
  updateProgramaClear: () => void;
}

const initialState = {
  today: undefined,
  recoleccionDate: undefined,
  recCalOpen: false,
  recCalLoading: false,
  recSelectedDate: undefined,
  entregaDate: undefined,
  entCalOpen: false,
  entCalLoading: false,
  entSelectedDate: undefined,
  mismoDiaSelected: false,
  mismoDiaEnabled: false,
  mismoDiaCustomMessage: "",
  recBlockedDates: [],
  entBlockedDates: [],
  entregaLoading: false,
  timeoutDialogOpen: false,
};

export const createProgramaV2Slice: StateCreator<ProgramaV2Slice> = (
  set,
  get
) => ({
  ...initialState,
  updateRecCalOpen: (open: boolean) => {
    set({ recCalOpen: open });
  },
  updateRecCalLoading: (val: boolean) => {
    set({ recCalLoading: val });
  },
  updateRecSelectedDate: (date: Date | undefined) => {
    set({ recSelectedDate: date });
  },
  updateEntCalOpen: (open: boolean) => {
    set({ entCalOpen: open });
  },
  updateEntCalLoading: (val: boolean) => {
    set({ entCalLoading: val });
  },
  updateEntSelectedDate: (date: Date | undefined) => {
    set({ entSelectedDate: date });
  },
  updateMismoDiaSelected: (val: boolean) => {
    set({ mismoDiaSelected: val });
  },
  getRecDates: async (municipioRecId: number) => {
    set({ recCalLoading: true });
    const t: ServerDate = await getTodayServerDate();
    set({ today: t });

    const result = await getRecDatesV2({ municipioRecId: municipioRecId });
    result;
    set({
      recBlockedDates: result.map((d: any) => parseYMDLocal(d.fechaString)),
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    set({ recCalLoading: false });
  },
  getEntregaDates: async ({
    fechaString,
    municipioEntId,
  }: {
    fechaString: string;
    municipioEntId: number;
  }) => {
    set({ entregaLoading: true });
    const result = await getEntDatesV2({
      fechaString: fechaString,
      municipioEntId: municipioEntId,
    });
    result;
    set({ mismoDiaEnabled: result.mismoDia.enabled });
    set({ mismoDiaCustomMessage: result.mismoDia.customMessage });
    set({
      entBlockedDates: result.blockedData.map((d: any) =>
        parseYMDLocal(d.fechaString)
      ),
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    set({ entregaLoading: false });
  },
  updateEntregaLoading: (val: boolean) => {
    set({ entregaLoading: val });
  },
  getTodayDate: async () => {
    const t: ServerDate = await getTodayServerDate();
    t;
    set({ today: t });
  },
  updateFinalDates: async () => {
    const dr = get().recSelectedDate;
    const de = get().entSelectedDate;
    const md = get().mismoDiaSelected;
    if (dr) {
      const iso = dr.toLocaleDateString();
      const ds = iso.split("/");
      const dateString = `${ds[2]}-${padGlobal2(ds[1])}-${padGlobal2(ds[0])}`;
      const datetimeString = dateString + " 10:00:00";
      set({
        recoleccionDate: {
          dateString: dateString,
          datetimeString: datetimeString,
          formatLong: formatLongEs(dr),
          localeDate: dr,
        },
      });
      get().recoleccionDate;
    }

    if (md && dr) {
      const iso = dr.toLocaleDateString();
      const ds = iso.split("/");
      const dateString = `${ds[2]}-${padGlobal2(ds[1])}-${padGlobal2(ds[0])}`;
      const datetimeString = dateString + " 10:00:00";
      set({
        entregaDate: {
          dateString: dateString,
          datetimeString: datetimeString,
          formatLong: formatLongEs(dr),
          localeDate: dr,
        },
      });
    } else if (de) {
      const iso = de.toLocaleDateString();
      const ds = iso.split("/");
      const dateString = `${ds[2]}-${padGlobal2(ds[1])}-${padGlobal2(ds[0])}`;
      const datetimeString = dateString + " 10:00:00";
      set({
        entregaDate: {
          dateString: dateString,
          datetimeString: datetimeString,
          formatLong: formatLongEs(de),
          localeDate: de,
        },
      });
    }

    get().entregaDate;

    return true;
  },
  updateTimeoutDialogOpen: (val: boolean) => {
    set({ timeoutDialogOpen: val });
  },
  updateProgramaClear: () => {
    set({ ...initialState });
  },
});
