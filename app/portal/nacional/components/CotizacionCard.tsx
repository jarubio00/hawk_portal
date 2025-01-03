"use client";

import {
  dateString,
  namedDateString,
  namedDateStringFull,
  namedDateStringMid,
} from "@/app/components/utils/helpers";
import { Tarifa } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface CotizacionCardProps {
  data: Tarifa;
}

const CotizacionCard: React.FC<CotizacionCardProps> = ({ data }) => {
  const { cotizacionSelected, updateCotizacionSelected } =
    useNacionalCrearStore();
  return (
    <div
      className={`flex flex-col mx-2 border rounded-md shadow-lg justify-center px-2 py-4 my-4 hover:bg-neutral-100 ${
        data?.code === cotizacionSelected?.code && "border-rose-500 border-2"
      }`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="text-md uppercase">{data?.name}</p>
          <div className="p-1 w-16 bg-yellow-700">
            {" "}
            <img src="/images/nacional/dhl-logo.svg" className="w-16" />
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-xl font-bold">
            MXN ${data?.totalPrice.toFixed(2)}
          </p>
          {data?.shipmentProtectionPrice &&
          data?.shipmentProtectionPrice != 0 ? (
            <p className="text-[11px]">
              + MXN {data?.shipmentProtectionPrice} seguro
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex flex-row gap-2">
          <p className="text-[11px] uppercase text-gray-400">
            Entrega estimada:
          </p>
          <p className="text-[11px] text-blue-500 uppercase">
            {namedDateStringMid(data?.estimatedDeliveryDateAndTime)}
          </p>
        </div>
        {/* <Button
          size={"sm"}
          onClick={() => updateCotizacionSelected(data)}
          disabled={cotizacionSelected?.code == data.code}
        >
          <p className="text-xs">
            {cotizacionSelected?.code != data.code
              ? "Seleccionar"
              : "Seleccionado"}
          </p>
        </Button> */}
      </div>
    </div>
  );
};

export default CotizacionCard;
