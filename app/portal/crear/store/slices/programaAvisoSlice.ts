import { getAvisoActivo } from "@/app/actions/apiQuerys";
import { StateCreator } from "zustand";

export interface ProgramaAvisoSlice {
  avisoActivo: boolean;
  backgroundColor: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  text1: string;
  updateAviso: ({
    avisoActivo,
    backgroundColor,
    backgroundImage,
    mobileBackgroundImage,
    text1,
  }: {
    avisoActivo: boolean;
    backgroundColor: string;
    backgroundImage: string;
    mobileBackgroundImage: string;
    text1: string;
  }) => void;
  getAvisoActivo: () => void;
}

const initialState = {
  avisoActivo: false,
  backgroundColor: "",
  backgroundImage: "",
  mobileBackgroundImage: "",
  text1: "",
};

export const createProgramaAvisoSlice: StateCreator<ProgramaAvisoSlice> = (
  set,
  get
) => ({
  ...initialState,
  updateAviso: ({
    avisoActivo,
    backgroundColor,
    backgroundImage,
    mobileBackgroundImage,
    text1,
  }: {
    avisoActivo: boolean;
    backgroundColor: string;
    backgroundImage: string;
    mobileBackgroundImage: string;
    text1: string;
  }) => {
    ("slice");
    set({
      backgroundColor,
      backgroundImage,
      mobileBackgroundImage,
      text1,
    });
    //await new Promise((resolve) => setTimeout(resolve, 100));
    mobileBackgroundImage;
    set({ avisoActivo: avisoActivo });
  },
  getAvisoActivo: async () => {
    const a = await getAvisoActivo();
    a;
    if (a.length >= 1) {
      set({
        backgroundColor: a[0]?.backgroundColor ?? "",
        backgroundImage: a[0]?.backgroundImage ?? "",
        mobileBackgroundImage: a[0]?.mobileBackgroundImage ?? "",
        text1: a[0]?.message,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      set({ avisoActivo: true });
    } else {
      set({
        backgroundColor: "",
        backgroundImage: "",
        mobileBackgroundImage: "",
        text1: "",
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
      set({ avisoActivo: false });
    }
    //set({ today: t });
  },
});
