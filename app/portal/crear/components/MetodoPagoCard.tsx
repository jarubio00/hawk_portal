"use client";

import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType, ICotizaItem, IPedido } from "@/app/types/pedido";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import { MdNightlightRound, MdLocationOn, MdViewInAr } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { namedDate, namedDateString } from "@/app/components/utils/helpers";
import ComprobanteInput from "./ComprobanteInput";
import {
  initMercadoPago,
  createCardToken,
  CardNumber,
  SecurityCode,
  ExpirationDate,
} from "@mercadopago/sdk-react";
initMercadoPago("TEST-b4a90a16-87a2-444f-badd-0b43730d3b5e");

interface MetodoPagoCardProps {
  data?: any;
}

//se quito w-full , se agregp px-2
const MetodoPagoCard: React.FC<MetodoPagoCardProps> = ({ data }) => {
  const { updateTipoPago, saveMetodoPago, metodoPago, tipoPago, pedido } =
    useContext(PedidoContext) as PedidoContextType;

  const handleTipoPago = (tipo: string) => {
    saveMetodoPago({});
    updateTipoPago(tipo);

    if (tipo == "efectivo") {
      saveMetodoPago({
        ...pedido?.metodoPago,
        formaPagoId: 1,
        passed: true,
        comprobante: false,
        comprobanteUrl: "",
        comprobanteFileType: "",
        comprobanteString: "",
        comprobanteSelected: false,
      });
    } else if (tipo == "transfer") {
      saveMetodoPago({
        ...pedido?.metodoPago,
        formaPagoId: 2,
        passed: false,
        comprobante: false,
        comprobanteUrl: "",
        comprobanteFileType: "",
        comprobanteString: "",
        comprobanteSelected: false,
      });
    }
  };
  const handleInputFile = (props: any) => {
    console.log(props);
  };

  const cardToken = async () => {
    const response = await createCardToken({
      cardholderName: "<CARD_HOLDER_NAME>",
      identificationType: "<BUYER_IDENTIFICATION_TYPE>",
      identificationNumber: "<BUYER_IDENTIFICATION_NUMBER>",
    });
    console.log("Card Token Response = ", response);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-1 w-full  lg:w-2/4 ">
        <p className="text-xs md:text-sm text-neutral-500">
          Selecciona tu método de pago
        </p>
        <div className="flex flex-row items-center gap-3 my-2">
          <div className="flex flex-row items-center gap-4">
            <div
              className={` border-2 bg-rose-500  text-xs 
                            shadow-md rounded-md py-1 px-2 cursor-pointer
                        ${
                          tipoPago == "efectivo"
                            ? "bg-rose-500 text-white border-rose-500"
                            : "bg-white  border-neutral-800"
                        }
                            `}
              onClick={() => handleTipoPago("efectivo")}
            >
              <p className=" text-center text-xs">Efectivo al recolectar</p>
            </div>
            <div
              className={`border-2  text-xs
                        shadow-md rounded-md py-1 px-2 cursor-pointer
                        ${
                          tipoPago == "transfer"
                            ? "bg-rose-500 text-white border-rose-500"
                            : "bg-white  border-neutral-800"
                        }
                        `}
              onClick={() => handleTipoPago("transfer")}
            >
              <p className=" text-center">Transferencia o depósito</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-1">
        {tipoPago == "efectivo" && (
          <div className="p-3">
            <p className="text-xs text-neutral-500">
              Se cobrará el monto en efectivo en la visita de recolección, favor
              de tener el monto exacto.
            </p>
            {/* <CardNumber placeholder="Card Number" />
            <SecurityCode placeholder="Security Code" />
            <ExpirationDate placeholder="Expiration Date" mode="short" />
            <button onClick={() => cardToken()}>Pay</button> */}
          </div>
        )}
        {tipoPago == "transfer" && (
          <div className="p-2">
            <ComprobanteInput onChange={handleInputFile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetodoPagoCard;
