"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import AutocompleteWidget from "./AutocompleteWidget";
import NacionalHeader from "./components/NacionalHeader";
import { useNacionalCrearStore } from "../store/nacional/nacionalCrear/nacional-crear";
import NacionalCotizarStep from "./steps/NacionalCotizarStep";
import CotizarPaquete from "./components/CotizarPaquete";
import NacionalStepper from "./components/NacionalStepper";
import NacionalDestinoStep from "./steps/NacionalDestinoStep";
import NacionalConfirmarStep from "./steps/NacionalConfirmarStep";

const NacionalClient = (props: any) => {
  const router = useRouter();
  const loader = useLoader();
  const [isLoading, setIsLoading] = useState(false);
  const { direcciones, getDirecciones, activeStep, updateCurrentUser } =
    useNacionalCrearStore();

  useEffect(() => {
    getDirecciones();
    updateCurrentUser(props.currentUser);
    console.log(props.currentUser);
  }, []);

  useEffect(() => {
    console.log(direcciones);
  }, [direcciones]);

  return (
    <div className="flex flex-col  ">
      <NacionalHeader />
      <div className="h-full flex flex-col mt-4">
        <NacionalStepper />

        {activeStep === 0 && <NacionalCotizarStep />}
        {activeStep === 1 && <NacionalDestinoStep />}
        {activeStep === 2 && <NacionalConfirmarStep />}
      </div>
    </div>
  );
};

export default NacionalClient;
