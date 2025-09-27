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
      <div className="flex flex-col gap-1 w-full  lg:w-2/4 border border-neutral-300  rounded-sm ">
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-row items-center gap-1">
            <FaHome className="text-rose-500 " size={16} />
            <p className="text-xs md:text-sm mt-[3px]">Recolección</p>
          </div>
          <div className="flex flex-row items-center gap-3  justify-between ">
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 truncate text-ellipsis">
                {pv2.recoleccionDate?.formatLong}
              </p>
              <p className="text-xs text-gray-500 truncate text-ellipsis">
                {data.recoleccion?.contactoNombre}
              </p>
            </div>
            <div className="flex flex-col items-end">
              {/* <p className="text-xs text-blue-500">{namedDateString(data.programa?.fechaRecoleccion)}</p> */}
              <p className="text-xs truncate text-ellipsis ">
                {data.recoleccion?.colonia}{" "}
              </p>
              <p className="text-xs text-gray-500 truncate text-ellipsis">
                {data.recoleccion?.municipio?.municipio}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-0"></hr>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-row items-center gap-1">
            <MdLocationOn className="text-rose-500" size={16} />
            <p className="text-xs md:text-sm ">Destino</p>
          </div>
          <div className="flex flex-row items-center gap-3  justify-between ">
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 truncate text-ellipsis">
                {pv2.entregaDate?.formatLong}
              </p>
              <p className="text-xs text-gray-500 truncate text-ellipsis">
                {data.destino?.contactoNombre}
              </p>
            </div>
            <div className="flex flex-col items-end w-3/5 lg:w-full text-right">
              {/* <p className="text-xs text-blue-500">{namedDateString(data.programa?.fechaEntrega)}</p> */}
              <p className="text-xs truncate text-ellipsis">
                {data.destino?.colonia}
              </p>
              <p className="text-xs text-gray-500 truncate text-ellipsis ">
                {data.destino?.municipio?.municipio}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-0"></hr>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex flex-row items-center gap-1">
            <MdViewInAr className="text-rose-500" size={16} />
            <p className="text-xs md:text-sm ">Paquete</p>
          </div>
          <div className="flex flex-row  gap-3  justify-between ">
            <p className="text-xs text-gray-500 uppercase">
              {data.paquete?.tipo?.tipo}
            </p>

            <div className="flex flex-col items-end w-3/5 lg:w-full text-right">
              <p className="text-xs  ">
                {data.paquete?.paqAlto}cm X {data.paquete?.paqAncho}cm X{" "}
                {data.paquete?.paqLargo}cm
              </p>
              <p className="text-xs text-gray-500 ">
                {data.paquete?.paqPeso} Kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenCard;
