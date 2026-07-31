"use client";

import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { ICotizaItem, IPedido } from "@/app/types/pedido";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import { MdNightlightRound, MdLocationOn, MdViewInAr } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { namedDate, namedDateString } from "@/app/components/utils/helpers";
import { useProgramaStore } from "../store/crear-store";
import { isPromoMismoDiaVisible } from "../utils/mismoDiaPromo";

interface CotizaCardProps {
  data?: ICotizaItem[];
}

//se quito w-full , se agregp px-2
const CotizaCard: React.FC<CotizaCardProps> = ({ data }) => {
  const pv2 = useProgramaStore();
  return (
    <div className="">
      <div className="flex flex-col gap-1 w-full  lg:w-2/4  rounded-sm">
        <div className="flex flex-col gap-2 p-3">
          <div className="flex flex-row items-center justify-between gap-3">
            <p className="text-xs font-bold text-left">DESCRIPCIÓN</p>
            <p className="text-xs font-bold text-right">PRECIO</p>
          </div>
          {data &&
            data.length >= 1 &&
            data.map((d: ICotizaItem, i: number) => {
              const enPromo = isPromoMismoDiaVisible(
                d.precio ?? 0,
                d.precioRegular ?? 0,
                d.promoEtiqueta ?? ""
              );
              return (
                <div
                  key={i}
                  className="flex flex-row items-start justify-between gap-3"
                >
                  <div className="flex flex-col">
                    <p className="text-xs text-left">{d.descripcion}</p>
                    {enPromo && (
                      <span className="self-start mt-[2px] rounded-full bg-green-600 px-2 py-[1px] text-[10px] font-bold uppercase text-white">
                        {d.promoEtiqueta}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-row items-center gap-2 shrink-0">
                    {enPromo && (
                      <p className="text-xs text-right text-muted-foreground line-through">
                        ${d.precioRegular}.00
                      </p>
                    )}
                    <p
                      className={`text-xs text-right ${
                        enPromo ? "font-bold text-green-600" : ""
                      }`}
                    >
                      ${d.precio}.00
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <hr></hr>
        <div className="flex flex-row items-center gap-1 justify-between p-3">
          <div></div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-md font-bold  text-right">TOTAL</p>
            <p className="text-md text-right">
              $
              {data &&
                data.length >= 1 &&
                data.reduce((acc: any, item: any) => acc + item.precio, 0)}
              .00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CotizaCard;
