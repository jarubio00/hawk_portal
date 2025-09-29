import {
  getEntDatesV2,
  getRecDatesV2,
  getTodayServerDate,
} from "@/app/actions/apiQuerys";
import { DateV2, ServerDate } from "@/app/types";
import { formatLongEs, parseYMDLocal } from "@/app/utils/dateUtils";
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
  recBlockedDates: [] as Date[],
  entBlockedDates: [] as Date[],
  entregaLoading: false,
  timeoutDialogOpen: false,
};

// ===== Helpers (partes LOCALES, reflejan el día que ve el usuario) =====
const pad2 = (n: number) => String(n).padStart(2, "0");

/** "YYYY-MM-DD" tomando partes LOCALES (no UTC) */
function toYMD_LOCAL(d: Date): string {
  const y = d.getFullYear(); // local
  const m = pad2(d.getMonth() + 1); // local
  const day = pad2(d.getDate()); // local
  return `${y}-${m}-${day}`;
}

/** "YYYY-MM-DD 10:00:00" (hora fija de negocio) desde partes LOCALES */
function toYMD10_LOCAL(d: Date): string {
  return `${toYMD_LOCAL(d)} 10:00:00`;
}

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

    const result = await getRecDatesV2({ municipioRecId });
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

    const result = await getEntDatesV2({ fechaString, municipioEntId });
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
    set({ today: t });
  },

  // ================== BLINDAJE DE FECHAS ==================
  updateFinalDates: async () => {
    const dr = get().recSelectedDate; // Date seleccionado en recolección (medianoche local del día)
    const de = get().entSelectedDate; // Date seleccionado en entrega (medianoche local del día)
    const md = get().mismoDiaSelected;

    // RECOLECCIÓN
    if (dr) {
      const dateString = toYMD_LOCAL(dr); // "YYYY-MM-DD" (local)
      const datetimeString = toYMD10_LOCAL(dr); // "YYYY-MM-DD 10:00:00"

      set({
        recoleccionDate: {
          dateString,
          datetimeString,
          formatLong: formatLongEs(dr), // UI-friendly
          localeDate: dr,
        },
      });
      get().recoleccionDate;
    }

    // ENTREGA
    if (md && dr) {
      // Mismo día -> misma fecha que recolección
      const dateString = toYMD_LOCAL(dr);
      const datetimeString = toYMD10_LOCAL(dr);
      set({
        entregaDate: {
          dateString,
          datetimeString,
          formatLong: formatLongEs(dr),
          localeDate: dr,
        },
      });
    } else if (de) {
      const dateString = toYMD_LOCAL(de);
      const datetimeString = toYMD10_LOCAL(de);
      set({
        entregaDate: {
          dateString,
          datetimeString,
          formatLong: formatLongEs(de),
          localeDate: de,
        },
      });
    }

    // Validación opcional: entrega >= recolección cuando no es mismo día
    const r = get().recoleccionDate?.dateString;
    const e = get().entregaDate?.dateString;
    if (r && e && !md && e < r) return false;

    return true;
  },

  updateTimeoutDialogOpen: (val: boolean) => {
    set({ timeoutDialogOpen: val });
  },

  updateProgramaClear: () => {
    set({ ...initialState });
  },
});
