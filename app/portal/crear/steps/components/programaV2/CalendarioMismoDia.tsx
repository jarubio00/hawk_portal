"use client";

import { FaCheckSquare } from "react-icons/fa";
import { useProgramaStore } from "../../../store/crear-store";
import OptionContainer from "./OptionContainer";
import { FechaTexto } from "./utils/FechaTexto";
import {
  formatPrecioMd,
  isPromoMismoDiaVisible,
} from "@/app/portal/crear/utils/mismoDiaPromo";

interface CalendarioMismoDiaProps {
  data?: string;
}

/** Solo se renderiza cuando pv2.mismoDiaEnabled es true */
const CalendarioMismoDia: React.FC<CalendarioMismoDiaProps> = ({ data }) => {
  const pv2 = useProgramaStore();
  const enPromo = isPromoMismoDiaVisible(
    pv2.mismoDiaPrecio,
    pv2.mismoDiaPrecioRegular,
    pv2.mismoDiaPromoEtiqueta
  );
  return (
    <div className="flex flex-col w-full gap-1">
      <OptionContainer selected={Boolean(pv2.mismoDiaSelected)}>
        <div
          className="flex flex-row justify-between items-center w-full cursor-pointer "
          onClick={() => {
            //pv2.getRecDates();
            pv2.updateEntSelectedDate(undefined);
            pv2.updateEntCalOpen(false);
            pv2.updateMismoDiaSelected(!pv2.mismoDiaSelected);
          }}
        >
          <div className="flex flex-col w-full">
            <p className="text-xs font-bold">Entrega el mismo día*</p>
            <FechaTexto date={pv2.recSelectedDate} type={"mismoDia"} />
            {enPromo ? (
              <div className="flex flex-col mt-[2px] gap-[2px]">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrecioMd(pv2.mismoDiaPrecioRegular)}
                  </p>
                  <p className="text-xs font-bold text-green-600">
                    +{formatPrecioMd(pv2.mismoDiaPrecio)}
                  </p>
                </div>
                <span className="self-start rounded-full bg-green-600 px-2 py-[1px] text-[10px] font-bold uppercase text-white">
                  {pv2.mismoDiaPromoEtiqueta}
                </span>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground mt-[2px]">
                +{formatPrecioMd(pv2.mismoDiaPrecio)}
              </p>
            )}
          </div>
          <div className="flex flex-col w-2/6 items-end justify-center  ">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white">
              <p className="text-xl font-bold">MD</p>
            </div>
          </div>
        </div>
      </OptionContainer>
      <p className="text-[11px] text-bold italic">
        * No aplica en evíos agregados
      </p>
    </div>
  );
};

export default CalendarioMismoDia;
