"use client";

import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { IPedido } from "@/app/types/pedido";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import { MdNightlightRound, MdLocationOn, MdViewInAr } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { namedDate, namedDateString } from "@/app/components/utils/helpers";
import { useProgramaStore } from "../store/crear-store";

interface ResumenCardProps {
  data: IPedido;
}

//se quito w-full , se agregp px-2
const ResumenCard: React.FC<ResumenCardProps> = ({ data }) => {
  const pv2 = useProgramaStore();

  return (
    <div className="">
      <div className="flex flex-col gap-1 w-full  lg:w-2/4 border border-neutral-300 rounded-lg mt-3">
        <div className="flex flex-row items-center gap-3  justify-between p-3">
          <div className="flex flex-row items-center gap-2">
            <FaHome className="text-rose-500" size={16} />
            <p className="text-xs md:text-sm ">Recolección</p>
          </div>
          <div className="flex flex-col items-end">
            {/* <p className="text-xs text-blue-500">{namedDateString(data.programa?.fechaRecoleccion)}</p> */}
            <p className="text-xs text-blue-500">fecha rec</p>
            <p className="text-xs ">{data.recoleccion?.contactoNombre}</p>
            <p className="text-xs text-neutral-500 ">
              {data.recoleccion?.colonia},{" "}
              {data.recoleccion?.municipio?.municipio}
            </p>
          </div>
        </div>
        <hr className="my-0"></hr>
        <div className="flex flex-row items-center gap-3  justify-between p-3">
          <div className="flex flex-row items-center gap-2">
            <MdLocationOn className="text-rose-500" size={16} />
            <p className="text-xs md:text-sm ">Destino</p>
          </div>
          <div className="flex flex-col items-end w-3/5 lg:w-full text-right">
            {/* <p className="text-xs text-blue-500">{namedDateString(data.programa?.fechaEntrega)}</p> */}
            <p className="text-xs text-blue-500">fecha ent</p>
            <p className="text-xs ">{data.destino?.contactoNombre}</p>
            <p className="text-xs text-neutral-500 ">
              {data.destino?.colonia}, {data.destino?.municipio?.municipio}
            </p>
          </div>
        </div>
        <hr className="my-0"></hr>
        <div className="flex flex-row items-center gap-3  justify-between p-3">
          <div className="flex flex-row items-center gap-2">
            <MdViewInAr className="text-rose-500" size={16} />
            <p className="text-xs md:text-sm ">Paquete</p>
          </div>
          <div className="flex flex-col items-end w-3/5 lg:w-full text-right">
            <p className="text-xs   uppercase">{data.paquete?.tipo?.tipo}</p>
            <p className="text-xs text-neutral-500 ">
              {data.paquete?.paqAlto}cm X {data.paquete?.paqAncho}cm X{" "}
              {data.paquete?.paqLargo}cm - ({data.paquete?.paqPeso} Kg)
            </p>
            {data.cobro && (
              <p className="text-xs text-blue-500 ">
                Se cobrarán ${data.cobroCantidad}.00 al destinatario
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenCard;
