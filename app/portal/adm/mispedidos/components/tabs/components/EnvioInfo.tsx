"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  bloqueToString,
  namedDateString,
} from "@/app/components/utils/helpers";
import { SafePedido } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { MdViewInAr } from "react-icons/md";
import ComprobanteDialog from "./ComprobanteDialog";

interface EnvioInfoProps {
  data: SafePedido;
}

const EnvioInfo: React.FC<EnvioInfoProps> = ({ data }) => {
  return (
    <div className="mx-4 mt-4 flex flex-col gap-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="recoleccion-1">
          <div className="flex flex-col grow-0 text-left text-xs">
            <p className="text-sm font-semibold mt-0">Recolección</p>
            <hr className="my-1"></hr>
            <p className="text-xs text-neutral-500 truncate ">
              {namedDateString(data.recoleccion.fecha)} -{" "}
              {bloqueToString(data.recoleccion.bloque)}
            </p>
            <p className="text-[xs] text-neutral-500 truncate">
              {data.recoleccion.colonia},{" "}
              {data.recoleccion?.municipio?.municipio}
            </p>
            <AccordionTrigger className="py-0 ">
              <p className="text-[11px] text-blue-500">Ver más...</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-neutral-700 truncate ">
                {data.recoleccion.contactoNombre} (
                {data.recoleccion.contactoTel})
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {data.recoleccion.calle}, {data.recoleccion?.numero}{" "}
                {data.recoleccion?.numeroInt}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {data.recoleccion.colonia},{" "}
                {data.recoleccion?.municipio?.municipio}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {data.recoleccion.cpId}
              </p>
              <p className="text-xs text-neutral-700 font-semibold truncate">
                {data.recoleccion.empresa}
              </p>
              <p className="text-xs text-neutral-500 ">
                {data.recoleccion.referencias}
              </p>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="entrega-1">
          <div className="flex flex-col grow-0 text-left text-xs">
            <p className="text-sm font-semibold mt-2">Entrega</p>
            <hr className="my-1"></hr>
            <p className="text-[11px] text-neutral-500 truncate ">
              {namedDateString(data.fechaEntrega)} -{" "}
              {bloqueToString(data.bloqueEntrega)}
            </p>
            <p className="text-[11px] text-neutral-500 truncate">
              {data.entregaColonia}, {data.municipio?.municipio}
            </p>
            <AccordionTrigger className="py-0 ">
              <p className="text-[11px] text-blue-500">Ver más...</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-[11px] text-neutral-700 truncate ">
                {data.entregaContactoNombre} ({data.entregaContactoTel})
              </p>
              <p className="text-[11px] text-neutral-500 truncate">
                {data.entregaCalle}, {data.entregaNumero}{" "}
                {data.entregaNumeroInt}
              </p>
              <p className="text-[11px] text-neutral-500 truncate">
                {data.entregaColonia}, {data.municipio?.municipio}
              </p>
              <p className="text-[11px] text-neutral-500 truncate">
                {data.entregaCpId}
              </p>
              <p className="text-[11px] text-neutral-700 font-semibold truncate">
                {data.entregaEmpresa}
              </p>
              <p className="text-[11px] text-neutral-500 ">
                {data.entregaReferencias}
              </p>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>

      <p className="text-sm font-semibold mt-2">Paquete</p>
      <hr className="my-0"></hr>

      <div className="flex flex-row gap-1 items-center my-2">
        <div className="">
          <MdViewInAr size={40} className="text-rose-500" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs  text-black uppercase">
            {data.tipoPaquete.tipo}
          </p>
          <div className="flex flex-row  gap-2  items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font-bold leading-none">{data.paqLargo}</p>
              <p className="text-[11px] text-neutral-400 leading-none">largo</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font-bold leading-none">{data.paqAlto}</p>
              <p className="text-[11px] text-neutral-400 leading-none">alto</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font-bold leading-none">{data.paqAncho}</p>
              <p className="text-[11px] text-neutral-400 leading-none">ancho</p>
            </div>
            <div className="flex flex-col justify-center items-center w-10 rounded-sm py-1 bg-neutral-700">
              <p className="text-sm  text-white leading-none">{data.paqPeso}</p>
              <p className="text-[11px] text-white leading-none">kg</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold mt-2">Pago</p>
      <hr className="my-0"></hr>
      <div className="flex flex-row gap-1 items-center mt-2">
        <p className="text-sm text-black font-bold">${data.precioVenta}</p>

        <Badge variant="outline" className="text-xs font-bold rounded-md px-1">
          <div className="flex flex-row items-center">
            <p className="ml-1">{data.formaPago.tipo}</p>
          </div>
        </Badge>
        <Badge
          variant="secondary"
          className={`${
            (data.formaPagoId == 2 ||
              data.estatusPagoId == 2 ||
              data.estatusPagoId == 3) &&
            "bg-green-500"
          } py-0`}
        >
          <p
            className={`text-[11px] font-normal ${
              (data.formaPagoId == 2 ||
                data.estatusPagoId == 2 ||
                data.estatusPagoId == 3) &&
              "text-white"
            }`}
          >
            {data.formaPagoId == 2 || data.estatusPagoId == 2
              ? "Pagado"
              : "Pendiente"}
          </p>
        </Badge>
        <Badge
          variant="secondary"
          className={`${data.estatusPagoId == 3 && "bg-green-500"} py-0`}
        >
          <p
            className={`text-[11px] font-normal ${
              data.estatusPagoId == 3 && "text-white"
            }`}
          >
            {data.estatusPagoId == 3 ? "Confirmado" : "No confirmado"}
          </p>
        </Badge>
      </div>
      {data.comprobante && data.comprobanteUrl && (
        <ComprobanteDialog pedidoId={data.id} url={data.comprobanteUrl} />
      )}
      {data.cobroDestino && (
        <>
          <p className="text-sm font-semibold mt-2">Cobro a destinatario</p>
          <hr className="my-0"></hr>
          <div className="flex flex-row gap-1 items-center mt-2">
            <p className="text-sm text-black font-bold">${data.precioVenta}</p>

            <Badge
              variant="outline"
              className="text-xs font-bold rounded-md px-1"
            >
              <div className="flex flex-row items-center">
                <p className="ml-1">Efectivo</p>
              </div>
            </Badge>
            <Badge variant="secondary">
              <p className="text-[11px] font-normal">Pendiente</p>
            </Badge>
            <Badge variant="secondary">
              <p className="text-[11px] font-normal">No confirmado</p>
            </Badge>
          </div>
        </>
      )}
    </div>
  );
};

export default EnvioInfo;
