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
import { AiFillDollarCircle } from "react-icons/ai";

interface ResumenCobroCardProps {
  data: IPedido;
}

//se quito w-full , se agregp px-2
const ResumenCobroCard: React.FC<ResumenCobroCardProps> = ({ data }) => {
  const pv2 = useProgramaStore();

  return (
    <div className="">
      <div className="flex flex-col gap-1 w-full  lg:w-2/4 border border-neutral-300  rounded-sm mt-3 ">
        <div className="flex flex-row items-center gap-3  justify-between p-3">
          <div className="flex flex-row items-center gap-2">
            <AiFillDollarCircle className="text-rose-500" size={20} />
            <p className="text-xs md:text-sm ">Cobro </p>
          </div>
          <div className="flex flex-col items-end">
            {/* <p className="text-xs text-blue-500">{namedDateString(data.programa?.fechaRecoleccion)}</p> */}
            {data.cobro && (
              <p className="text-xs text-blue-500 text-right">
                Se cobrarán ${data.cobroCantidad}.00 al destinatario
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenCobroCard;
