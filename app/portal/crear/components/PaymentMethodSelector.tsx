"use client";

import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useProgramaStore } from "../store/crear-store";
import "./collapsibleStyles.css";
import { FaCheck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import ComprobanteInput from "./ComprobanteInput";

interface PaymentMethod {
  value: string;
  label: string;
  description?: string;
  iconSrc: string;
}

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (method: string) => void;
}

const methods: PaymentMethod[] = [
  {
    value: "cash",
    label: "Efectivo",
    description: "Santander, HSBC y otros",
    iconSrc: "/icons/method-card.PNG",
  },
  {
    value: "transfer",
    label: "Transferencia electrónica",
    description: "Tus medios de pago favoritos",
    iconSrc: "/icons/method-card.PNG",
  },
  /* {
    value: "credit_card",
    label: "Tarjeta de crédito o débito",
    description: "Cuotas sin interés",
    iconSrc: "/icons/method-card.PNG",
  },
  {
    value: "mp_card",
    label: "Mi cuenta de mercado pago",
    iconSrc: "/icons/method-mp.PNG",
  }, */
];

export default function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  const pv2 = useProgramaStore();
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full rounded-md border border-gray-200 divide-y divide-gray-400 overflow-hidden">
        <div className="bg-white">
          <Collapsible
            open={pv2.efectivoOpen}
            className={`relative w-full  rounded-t-md ${
              pv2.efectivoSelected && ""
            }`}
          >
            <div
              className="flex flex-row gap-4 items-center w-full cursor-pointer my-4 px-4"
              onClick={async () => {
                pv2.updateTransferOpen(false);
                pv2.updateTransferSelected(false);
                pv2.updateMetodoPago(1);
                pv2.updateEfectivoOpen(true);
                pv2.updateEfectivoSelected(true);
              }}
            >
              <Image
                src={"/icons/efectivo2.png"}
                alt={"Efectivo"}
                width={36}
                height={28}
                className="rounded-full object-contain"
              />

              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-gray-900">
                  Efectivo
                </span>

                <span className="text-xs text-gray-500">
                  Descripción efectivo
                </span>
              </div>
            </div>
            <CollapsibleContent className="CollapsibleContent">
              <div className="flex  flex-col w-full p-3">
                <div>
                  <p className="text-xs">
                    Te recordamos que los operadores no cuentan con caja chica
                    por lo que es importante que el importe sea exacto.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
            {pv2.efectivoSelected && (
              <div className="absolute -top-[10px] right-[6px] flex items-center justify-center ">
                <FaCircleCheck className="text-green-500 w-[15px] h-[15px]" />
              </div>
            )}
          </Collapsible>
          <Collapsible
            open={pv2.transferOpen}
            className={`relative w-full border rounded-b-md ${
              pv2.transferSelected && ""
            }`}
          >
            <div
              className="flex flex-row gap-4 items-center w-full cursor-pointer my-4 px-4"
              onClick={() => {
                pv2.updateEfectivoOpen(false);
                pv2.updateEfectivoSelected(false);
                pv2.updateMetodoPago(2);
                pv2.updateTransferOpen(true);
              }}
            >
              <Image
                src={"/icons/transfer2.png"}
                alt={"Transferencia"}
                width={32}
                height={26}
                className="rounded-full object-contain"
              />

              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-gray-900">
                  Transferencia
                </span>

                <span className="text-xs text-gray-500">
                  Descripción transferencia
                </span>
              </div>
            </div>
            {pv2.transferOpen && (
              <div className="absolute top-[6px] right-[6px] flex items-center justify-center ">
                <FaCircleCheck
                  className={`w-[15px] h-[15px] ${
                    pv2.transferSelected ? "text-green-500" : "text-neutral-300"
                  } `}
                />
              </div>
            )}
            <CollapsibleContent className="CollapsibleContent">
              <div className="flex  flex-col w-full px-3">
                <ComprobanteInput onChange={() => {}} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <p className="text-xs">
        En caso de realizar un{" "}
        <span className="text-rose-500">cambio en el método de pago </span>
        después de generado el envío, este puede ser desfasado en tiempo de
        entrega debido a la revisión del pago.
      </p>
      {pv2.metodoPago == 1 ? "Efectivo" : "Transferencia"}
    </div>
  );
}
