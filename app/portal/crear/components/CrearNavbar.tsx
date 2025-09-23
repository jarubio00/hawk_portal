"use client";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Container from "@/app/components/Container";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import { MdNightlightRound, MdLocationOn, MdViewInAr } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useState, useContext } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import { AiFillDollarCircle } from "react-icons/ai";
import { ArrowLeft } from "lucide-react";
import { TiLocation } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { PickupCountdown } from "../steps/components/programaV2/PickupCountdown";
import { useProgramaStore } from "../store/crear-store";

interface CrearNavbarProps {
  currentUser?: SafeUser | null;

  lastStep?: (e: any) => void;
  firstStep?: (e: any) => void;
  onClose?: (e: any) => void;
}

const CrearNavbar: React.FC<CrearNavbarProps> = ({
  currentUser,
  lastStep,
  firstStep,
  onClose,
}) => {
  const { activeStep, updateActiveStep } = useContext(
    PedidoContext
  ) as PedidoContextType;

  const router = useRouter();
  const pv2 = useProgramaStore();
  return (
    <div className="fixed w-full bg-white z-40 shadow-sm">
      <div
        className="
          py-1
          border-b-[1px]
          
        "
      >
        <div className="flex flex-row justify-between items-center py-1 px-3">
          <div className="flex flex-row gap-3 items-center">
            <button
              onClick={
                activeStep == 0
                  ? () => {}
                  : () => updateActiveStep(activeStep - 1)
              }
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="Regresar"
            >
              <ArrowLeft
                className={`w-5 h-5 ${
                  activeStep == 0 ? "text-gray-300" : "text-black"
                }`}
              />
            </button>
            <StepTitle />
          </div>

          <div className="flex flex-row items-center gap-3">
            <PickupCountdown
              recSelectedDate={pv2.recSelectedDate}
              onTimeout={() => {}}
              durationMs={1 * 10 * 1000}
            />
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="Regresar"
            >
              <IoMdClose size={24} className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function StepTitle() {
    switch (activeStep) {
      case 0:
        return (
          <div className="flex flex-row gap-2 items-center">
            <FaHome className="h-4 w-4 text-rose-500" />
            <p className="text-md font-semibold mt-[2px] uppercase">
              Recolección
            </p>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-row gap-1 items-center">
            <FaLocationDot className="h-4 w-4 text-rose-500" />
            <p className="text-sm font-semibold uppercase">Destino</p>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row gap-1 items-center">
            <MdViewInAr className="h-6 w-6 text-rose-500" />
            <p className="text-sm font-semibold uppercase">Paquete</p>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row gap-1 items-center">
            <FaClock className="h-4 w-4 text-rose-500" />
            <p className="text-sm font-semibold uppercase">Programación</p>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-row gap-1 items-center">
            <BsFillBoxSeamFill className="h-4 w-4 text-rose-500" />
            <p className="text-sm font-semibold uppercase">Resumen</p>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-row gap-1 items-center">
            <AiFillDollarCircle className="h-4 w-4 text-rose-500" />
            <p className="text-sm font-semibold uppercase">Pago</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-row gap-1 items-center">
            <FaHome className="h-4 w-4 text-rose-500" />
            <p className="text-sm font-semibold uppercase">Recolección</p>
          </div>
        );
    }
  }
};

export default CrearNavbar;
