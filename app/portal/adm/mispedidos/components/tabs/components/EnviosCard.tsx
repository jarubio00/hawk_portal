"use client";
import {
  bloqueEntregaToString,
  bloqueToString,
  dateString,
  namedDateString,
  statusIdToString,
} from "@/app/components/utils/helpers";
import { SafeRecoleccion, SafePedido } from "@/app/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import { MdViewInAr } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { HiCheckCircle } from "react-icons/hi";

interface EnviosCardsProps {
  data: SafePedido;
}

export type Ref = any;

const EnviosCards = forwardRef<Ref, EnviosCardsProps>((props, ref) => {
  const { data } = props;
  const router = useRouter();

  let coloniaEntregaDisplay = data.entregaColonia;
  let coloniaRecoDisplay = data.recoleccion?.colonia;

  if (data.entregaColonia.length > 22) {
    const coloniaEntregaArray = data.entregaColonia.match(/.{1,20}/g) ?? [];
    coloniaEntregaDisplay = coloniaEntregaArray[0] + "...";
  }

  if (data.recoleccion?.colonia.length > 22) {
    const coloniaRecoArray = data.recoleccion?.colonia.match(/.{1,20}/g) ?? [];
    coloniaRecoDisplay = coloniaRecoArray[0] + "...";
  }

  return (
    <div className="flex flex-col border border-neutral-300 bg-white shadow-lg rounded-lg  cursor-pointer my-2 py-1 mx-2 hover:scale-y-[1.04] hover:scale-x-[1.01]">
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <div className="flex flex-row gap-2">
          <p className="font-semibold text-foreground text-sm ">{data.id}</p>
          {data.mismoDia && (
            <p className="py-[2px] px-2 bg-rose-500 rounded-sm text-[10px] text-white">
              MISMO DÍA
            </p>
          )}
        </div>
        <div className="flex ">
          {statusIdToString(data.estatusPedidoId, "small")}
        </div>
      </div>
      <hr className="my-1"></hr>
      <div className="w-full  flex flex-row justify-between gap-2  items-center  px-2 py-1">
        <div className="w-6/12 flex flex-col grow-0 text-left text-xs">
          <p className="text-neutral-700 font-bold">Recoleccion</p>
          <p className="text-[11px] text-neutral-500 truncate ">
            {data.recoleccion.contactoNombre}
          </p>
          <p className="text-[11px] text-neutral-500 truncate ">
            {namedDateString(data.recoleccion.fecha)}
          </p>
          <p className="text-[11px] text-neutral-500">
            {bloqueToString(data.recoleccion.bloque)}
          </p>
          <p className="text-[11px] text-neutral-500 truncate">
            {coloniaRecoDisplay}, {data.recoleccion?.municipio?.abrev}
          </p>
        </div>
        <div className="w-6/12 flex flex-col items-end text-xs">
          <p className="text-neutral-700 font-bold">Entrega</p>
          <p className="text-[11px] text-neutral-500 truncate ">
            {data.entregaContactoNombre}
          </p>
          <p className="text-[11px] text-neutral-500 truncate ">
            {namedDateString(data.fechaEntrega)}
          </p>
          <p className="text-[11px] text-neutral-500">
            {bloqueEntregaToString(data.bloqueEntrega, data.mismoDia)}
          </p>
          <p className="text-[11px] text-neutral-500 truncate">
            {coloniaEntregaDisplay}, {data?.municipio?.abrev}
          </p>
        </div>
      </div>
      <div className="px-2 py-2 flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1 items-center">
            <p className="text-sm text-black font-bold">${data.precioVenta}</p>

            <Badge
              variant="outline"
              className="text-xs font-bold rounded-md px-1"
            >
              <div className="flex flex-row items-center">
                <HiCheckCircle
                  size={14}
                  className={`${
                    data.formaPagoId == 2 ||
                    data.estatusPagoId == 2 ||
                    data.estatusPagoId == 3
                      ? "text-green-500"
                      : "text-neutral-300"
                  }`}
                />
                <HiCheckCircle
                  size={14}
                  className={`${
                    data.estatusPagoId == 3
                      ? "text-green-500"
                      : "text-neutral-300"
                  }`}
                />
                <p className="ml-1">{data.formaPago.tipo}</p>
              </div>
            </Badge>

            {data.cod2Charges && data.cod2Charges.length > 0 && (
              <Badge
                variant="outline"
                className="text-xs font-bold rounded-md px-1"
              >
                <div className="flex flex-row items-center">
                  <p>Cobrar</p>
                  <p className="ml-1">
                    ${(data.cod2Charges[0].amountRequested / 100).toFixed(2)}
                  </p>
                  <HiCheckCircle
                    size={14}
                    className={`ml-1 ${
                      data.cod2Charges[0].status === "COLLECTED" ||
                      data.cod2Charges[0].status === "PARTIALLY_COLLECTED"
                        ? "text-green-500"
                        : "text-neutral-300"
                    }`}
                  />
                  <HiCheckCircle
                    size={14}
                    className={`${
                      data.cod2Charges[0].status === "HANDED_IN"
                        ? "text-green-500"
                        : "text-neutral-300"
                    }`}
                  />
                </div>
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-end items-end ">
          <div className="flex flex-row gap-1 items-center">
            <MdViewInAr size={20} className="text-rose-500" />
            <p className="text-xs font-bold text-black uppercase">
              {data.tipoPaquete.tipo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EnviosCards;
