"use client";

import useLoader from "@/app/hooks/useLoader";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import {
  BsCalendar2CheckFill,
  BsCalendar2DateFill,
  BsCalendar2Event,
  BsCalendar2EventFill,
  BsCalendar2Fill,
  BsClock,
  BsClockFill,
  BsFillBoxSeamFill,
} from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import AutocompleteWidget from "../AutocompleteWidget";
import CotizacionesView from "../components/CotizacionesView";
import CotizarDatePickup from "../components/CotizarDatePickup";
import CotizarDialog from "../components/CotizarDialog";
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
    direccionesLoading,
    updateCotizacionLoading,
    direccionValue,
    cotizaciones,
    updateActiveStep,
    cpValue,
    municipioValue,
    largoValue,
    anchoValue,
    altoValue,
    pesoValue,
    dateSelected,
  } = useNacionalCrearStore();
  const loader = useLoader();

  useEffect(() => {
    loader.onClose();
  }, [cotizaciones]);
  return (
    <div className="w-full flex flex-col gap-0 items-center">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row gap-2 items-center">
            <FaHome size={20} className={`${"text-rose-500"} `} />
            <p className="text-gray-500 mt-[2px]">
              Selecciona la dirección de recolección
            </p>
          </div>
          <CotizarDirecciones />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <MdLocationOn
              size={22}
              className={`${
                !direccionValue ? "text-neutral-400" : "text-rose-500"
              } `}
            />
            <p className="text-gray-500 mt-[0px]">Ingresa el destino</p>
          </div>
          <AutocompleteWidget
            disabled={!direccionValue || direccionesLoading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <BsFillBoxSeamFill
              size={18}
              className={`${
                !direccionValue ? "text-neutral-400" : "text-rose-500"
              } `}
            />
            <p className="text-gray-500 mb-[1px]">
              Ingresa las medidas y peso de tu paquete
            </p>
          </div>
          <CotizarPaquete
            disabled={
              !direccionValue ||
              direccionesLoading ||
              !cpValue ||
              !municipioValue
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <BsCalendar2EventFill
              size={18}
              className={`${
                !direccionValue ? "text-neutral-400" : "text-rose-500"
              } `}
            />
            <p className="text-gray-500 mb-[1px]">
              Selecciona la fecha de envío
            </p>
          </div>
          <CotizarDatePickup
            disabled={
              !direccionValue ||
              direccionesLoading ||
              !largoValue ||
              !anchoValue ||
              !altoValue ||
              !pesoValue
            }
          />
        </div>

        <div>
          <CotizarSeguro disabled={!direccionValue || direccionesLoading} />
        </div>
        <CotizarDialog />
      </div>
    </div>
  );
};

export default NacionalCotizarStep;
