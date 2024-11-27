"use client";

import useLoader from "@/app/hooks/useLoader";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import AutocompleteWidget from "../AutocompleteWidget";
import CotizacionesView from "../components/CotizacionesView";
import CotizarDatePickup from "../components/CotizarDatePickup";
import CotizarDirecciones from "../components/CotizarDirecciones";
import CotizarPaquete from "../components/CotizarPaquete";
import CotizarSeguro from "../components/CotizarSeguro";
import DireccionAvatar from "../components/DireccionAvatar";

interface NacionalCotizarStepProps {
  data?: string;
}

const NacionalCotizarStep: React.FC<NacionalCotizarStepProps> = ({ data }) => {
  const {
    updateDireccionValue,
    fetchCotizacion,
    cotizacionLoading,
    updateCotizacionLoading,
    cotizaciones,
    updateActiveStep,
  } = useNacionalCrearStore();
  const loader = useLoader();

  useEffect(() => {
    loader.onClose();
  }, [cotizaciones]);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-4">
      <div className="col-span-7 my-4">
        <div className="w-3/4 flex flex-col gap-8 justify-start mx-auto">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <FaHome size={20} className="text-rose-500 " />
              <p className="text-gray-500 mt-[2px]">
                Selecciona la dirección de recolección
              </p>
            </div>
            <CotizarDirecciones />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <MdLocationOn size={22} className="text-rose-500 " />
              <p className="text-gray-500 mt-[0px]">
                Ingresa la ciudad destino
              </p>
            </div>
            <AutocompleteWidget />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <BsFillBoxSeamFill size={18} className="text-rose-500 " />
              <p className="text-gray-500 mb-[1px]">
                Ingresa las medidas y peso de tu paquete
              </p>
            </div>
            <CotizarPaquete />
          </div>
          <div>
            <CotizarDatePickup />
          </div>
          <div>
            <CotizarSeguro />
          </div>
          <Button
            onClick={() => {
              fetchCotizacion();
            }}
            disabled={cotizacionLoading}
          >
            Cotizar
          </Button>
        </div>
      </div>
      <div className=" col-span-5 flex flex-col my-4 mx-6  ">
        <div className="flex flex-col gap-6 items-end">
          <CotizacionesView />
          <Button
            className="bg-rose-500 hover:bg-orange-900 w-30 ml-6"
            size={"lg"}
            onClick={() => updateActiveStep(2)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NacionalCotizarStep;
