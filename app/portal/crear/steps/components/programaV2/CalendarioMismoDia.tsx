"use client";

import { FaCheckSquare } from "react-icons/fa";
import { useProgramaStore } from "../../../store/crear-store";
import OptionContainer from "./OptionContainer";
import { FechaTexto } from "./utils/FechaTexto";

interface CalendarioMismoDiaProps {
  data?: string;
}

const CalendarioMismoDia: React.FC<CalendarioMismoDiaProps> = ({ data }) => {
  const pv2 = useProgramaStore();
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
            <p
              className={`text-xs font-bold ${
                !pv2.mismoDiaEnabled && "text-neutral-400 italic"
              }`}
            >
              Entrega el mismo día*
            </p>
            <FechaTexto
              date={pv2.recSelectedDate}
              type={"mismoDia"}
              className={`${!pv2.mismoDiaEnabled && "text-neutral-400 italic"}`}
            />
            <p
              className={`text-xs text-muted-foreground mt-[2px] ${
                !pv2.mismoDiaEnabled && "text-neutral-400 italic"
              }`}
            >
              +$42.00 MXN
            </p>
          </div>
          <div className="flex flex-col w-2/6 items-end justify-center  ">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full bg-black text-white ${
                !pv2.mismoDiaEnabled && "bg-neutral-400"
              }`}
            >
              <p className="text-xl font-bold">MD</p>
            </div>
          </div>
        </div>
      </OptionContainer>
      <p
        className={`text-[11px] text-bold italic ${
          !pv2.mismoDiaEnabled && "text-neutral-400"
        }`}
      >
        * No aplica en evíos agregados
      </p>
    </div>
  );
};

export default CalendarioMismoDia;
