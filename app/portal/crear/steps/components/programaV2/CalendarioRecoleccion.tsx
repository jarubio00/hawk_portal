"use client";
import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import "./collapsibleStyles.css";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { useProgramaStore } from "../../../store/crear-store";
import { CalendarSkeleton } from "./CalendarSkeleton";
import { FechaTexto } from "./utils/FechaTexto";
import { IoMdCalendar } from "react-icons/io";
import { sleep } from "@/app/utils/sleep";
import { TfiReload } from "react-icons/tfi";
import { LuMousePointerClick } from "react-icons/lu";
import { GiClick } from "react-icons/gi";
import { FaCheck, FaCheckSquare } from "react-icons/fa";
import OptionContainer from "./OptionContainer";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";

interface CalendarioRecoleccionProps {
  data?: string;
}

const CalendarioRecoleccion: React.FC<CalendarioRecoleccionProps> = ({
  data,
}) => {
  const { pedido } = React.useContext(PedidoContext) as PedidoContextType;

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const pv2 = useProgramaStore();

  const handleOnClick = () => {
    pv2.getRecDates(pedido?.recoleccion?.municipioId ?? 1);
    pv2.updateRecSelectedDate(undefined);
    pv2.updateEntSelectedDate(undefined);
    pv2.updateEntCalOpen(false);
    pv2.updateMismoDiaSelected(false);
    pv2.updateRecCalOpen(!pv2.recCalOpen);
  };

  function formatYMD(d: Date | undefined): string {
    if (!d) return "";
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }
  function pad2(n: number) {
    return String(n).padStart(2, "0");
  }
  return (
    <div className="flex flex-col gap-4">
      <OptionContainer selected={Boolean(pv2.recSelectedDate)}>
        <Collapsible open={pv2.recCalOpen} className="w-full ">
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer my-2"
            onClick={handleOnClick}
          >
            <div className="flex flex-col ">
              <div
                className="ml-1"
                onClick={() => pv2.updateRecSelectedDate(undefined)}
              >
                <FechaTexto date={pv2.recSelectedDate} type={"Recolección"} />
              </div>
            </div>
            <div className="flex flex-col w-2/6  items-end justify-center ">
              {/*  <IoMdCalendar size={38} /> */}
              <img src="/icons/cal1.png" width={30} height={30} />
              {pv2.recSelectedDate ? (
                <div>
                  <div className="w-24 flex flex-row gap-1 items-center justify-center">
                    {/* <TfiReload className="text-blue-500" size={10} />
                      <p className="text-[11px] text-blue-500">Cambiar</p> */}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-24 flex flex-row gap-1 items-center justify-center ">
                    {/* <GiClick className="text-blue-500" size={10} />
                      <p className="text-[11px] text-blue-500">Seleccionar</p> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <CollapsibleContent className="CollapsibleContent">
            <div className="flex flex-row gap-8 my-6 items-center justify-center ">
              {pv2.recCalLoading ? (
                <CalendarSkeleton />
              ) : (
                <Calendar
                  mode="single"
                  required
                  selected={pv2.recSelectedDate}
                  onSelect={(d) => {
                    pv2.updateRecSelectedDate(d);
                    pv2.getEntregaDates({
                      fechaString: formatYMD(d),
                      municipioEntId: pedido?.destino?.municipioId ?? 1,
                    });
                  }}
                  className="rounded-md border shadow-sm w-full bg-transparent"
                  classNames={{
                    day_selected: `bg-neutral-900 text-white`,
                    day: `h-[42px] w-[42px]`,
                    head_cell: `text-muted-foreground flex-1 select-none rounded-md text-[1rem] font-normal`,
                  }}
                  locale={es}
                  onDayClick={async () => {
                    await sleep(100);
                    pv2.updateRecCalOpen(false);
                    await sleep(100);
                  }}
                  disabled={[
                    { dayOfWeek: [0] },
                    { before: new Date() },
                    {
                      after: pv2.today
                        ? new Date(
                            pv2.today?.year,
                            pv2.today?.month - 1,
                            pv2.today?.day + 30
                          )
                        : new Date(2050, 12, 30),
                    },
                    ...pv2.recBlockedDates,
                  ]}
                />
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </OptionContainer>

      {/* <div
        className="mt-2"
        onClick={() => {
          pv2.updateRecSelectedDate(undefined);
          pv2.updateRecCalOpen(false);
        }}
      >
        Clear
      </div> */}
    </div>
  );
};

export default CalendarioRecoleccion;
