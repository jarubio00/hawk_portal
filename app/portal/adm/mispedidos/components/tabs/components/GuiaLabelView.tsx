"use client";
import { SafePedido } from "@/app/types";
import { QRCodeSVG } from "qrcode.react";
import JsBarcode from "jsbarcode";

interface GuiaLabelViewProps {
  data?: SafePedido;
}

const GuiaLabelView: React.FC<GuiaLabelViewProps> = ({ data }) => {
  let canvas;
  canvas = document.createElement("canvas");
  JsBarcode(canvas, data?.id.toString() || "", {
    width: 4,
    height: 80,
    displayValue: false,
  });
  const barcode = canvas.toDataURL();

  const qrRecoleccion = `{"id":${data?.id},"pv":${data?.precioVenta},"fp":${
    data?.formaPago?.id
  },"pt":"${data?.tipoPaquete?.tipo}","c":${data?.cobroDestino ? 1 : 0},"cc":${
    data?.cobroDestinoCantidad ? data?.cobroDestinoCantidad : 0
  },"ot":1,"to":1}`;

  const qrEntrega = `{"id":${data?.id},"pv":${data?.precioVenta},"fp":${
    data?.formaPago?.id
  },"pt":"${data?.tipoPaquete?.tipo}","c":${data?.cobroDestino ? 1 : 0},"cc":${
    data?.cobroDestinoCantidad ? data?.cobroDestinoCantidad : 0
  },"ot":1,"to":2}`;

  console.log(qrRecoleccion);
  return (
    <div className="w-72 h-96 border flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <img
            className="w-[65px]  md:block cursor-pointer"
            src="/images/labelLogo.png"
          />
          <div className="ml-1 flex flex-col ">
            <p className="text-[8px]">
              {data?.createdAt
                .toString()
                .slice(0, data?.createdAt.toString().length - 5)}
            </p>
            <p className="text-[8px] font-semibold">
              PAQUETE {data?.tipoPaquete?.tipo}
            </p>
            <p className="text-[8px] font-semibold">
              {data?.paqAncho}X{data?.paqLargo}X{data?.paqAlto}CM -{" "}
              {data?.paqPeso}KG
            </p>
            <p className="w-[120px] text-[8px] line-clamp-3">
              {data?.paqContenido}
            </p>
          </div>
        </div>
        <div className="pr-0">
          <QRCodeSVG value={qrRecoleccion} size={70} />
        </div>
      </div>
      <div className="mt-0 h-1 border-b-2 border-gray-900"></div>
      <div className="flex flex-row justify-between h-[90px]">
        <div className="flex flex-col mt-1 ml-1">
          <p className=" h-4 w-12 bg-gray-900 text-white text-[10px] px-2">
            Origen
          </p>
          <p className="text-[8px] font-semibold leading-[10px]">
            {data?.recoleccion?.contactoNombre}
          </p>
          <p className="text-[8px] leading-[9px]">
            {data?.recoleccion?.calle} {data?.recoleccion?.numero}{" "}
            {data?.recoleccion?.numeroInt}
          </p>
          <p className="text-[8px] leading-[9px]">
            {data?.recoleccion?.colonia}, {data?.recoleccion?.municipio?.abrev}
          </p>
          <p className="text-[8px] leading-[9px]">
            {data?.recoleccion?.cpId}, Tel. {data?.recoleccion?.contactoTel}
          </p>
          <p className="w-[185px] text-[8px] line-clamp-3">
            ** {data?.recoleccion.empresa ? data?.recoleccion.empresa : "na"} **{" "}
            {data?.recoleccion.referencias}
          </p>
        </div>

        <div className="flex flex-col justify-end gap-1">
          <div className="flex flex-row justify-end items-center">
            <p className="text-[8px]">
              {data?.fechaEntrega.toString().slice(0, 10)}
            </p>
            <p className=" h-5 w-5 bg-gray-900 text-white text-[10px] text-center pt-[2px] ml-1">
              AM
            </p>
          </div>
          <p className=" h-12 w-20 bg-gray-900 text-white text-[30px] text-center pt-[2px] ml-1">
            {data?.recoleccion?.municipio?.abrev}
          </p>
        </div>
      </div>
      <div className="mt-0 h-1 border-b-2 border-gray-900"></div>
      <div className="flex flex-row justify-between pt-[2px]">
        <div className="flex flex-col ">
          <p className=" h-5 w-16 bg-gray-900 text-white text-[14px] text-center pt-[0px] px-1 ml-1">
            {data?.id}
          </p>
          <div>
            <img src={barcode} width={100}></img>
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-[18px] uppercase">{data?.tipoPaquete?.tipo}</p>
          <p className=" h-5 w-[124px] bg-gray-900 text-white text-[14px]  pt-[0px] px-1  uppercase">
            {data?.formaPago?.id === 1
              ? `${data?.formaPago.tipo} $${data?.precioVenta.toString()}`
              : "TRANSFERENCIA"}
          </p>
        </div>
      </div>
      <div className="mt-0 h-1 border-b-2 border-gray-900"></div>
      <div className="flex flex-row justify-between h-[90px]">
        <div className="flex flex-col mt-1 ml-1">
          <p className=" h-4 w-14 bg-gray-900 text-white text-[10px] px-2">
            Destino
          </p>
          <p className="text-[8px] font-semibold leading-[10px]">
            {data?.entregaContactoNombre}
          </p>
          <p className="text-[8px] leading-[9px]">
            {data?.entregaCalle} {data?.entregaNumero} {data?.entregaNumeroInt}
          </p>
          <p className="text-[8px] leading-[9px]">
            {data?.entregaColonia}, {data?.municipio?.abrev}
          </p>
          <p className="text-[8px] leading-[9px]">
            {data?.entregaCpId}, Tel. {data?.entregaContactoTel}
          </p>
          <p className="w-[185px] text-[8px] line-clamp-3">
            ** {data?.entregaEmpresa ? data?.entregaEmpresa : "na"} **{" "}
            {data?.entregaReferencias}
          </p>
        </div>
        <div className="mt-4">
          <p className=" h-4 w-12 bg-gray-900 text-white text-[10px] px-2">
            Cliente
          </p>
        </div>
      </div>
      <div className="mt-0 h-1 border-b-2 border-gray-900"></div>
      <div className="flex flex-row justify-between h-[90px]">
        <div className="pr-0 justify-end mt-2">
          <QRCodeSVG value={qrEntrega} size={70} />
        </div>
        <div className="flex flex-col justify-end gap-1">
          <div className="flex flex-row justify-end items-center">
            <p className="text-[8px]">
              {" "}
              {data?.recoleccion?.fecha.toString().slice(0, 10)}
            </p>
            <p className=" h-5 w-5 bg-gray-900 text-white text-[10px] text-center pt-[2px] ml-1">
              PM
            </p>
          </div>
          <p className=" h-12 w-20 bg-gray-900 text-white text-[30px] text-center pt-[2px] ml-1">
            {data?.municipio?.abrev}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuiaLabelView;
