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
import { FaCheckSquare } from "react-icons/fa";
import OptionContainer from "./OptionContainer";

interface CalendarioEntregaProps {
  data?: string;
}

const CalendarioEntrega: React.FC<CalendarioEntregaProps> = ({ data }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const pv2 = useProgramaStore();

  return (
    <div className="flex flex-col">
      <OptionContainer
        selected={
          Boolean(pv2.entSelectedDate) && Boolean(!pv2.mismoDiaSelected)
        }
      >
        <Collapsible open={pv2.entCalOpen} className="w-full">
          <div
            className="flex flex-row justify-between items-center w-full cursor-pointer my-2"
            onClick={() => {
              //pv2.getRecDates();
              pv2.updateMismoDiaSelected(false);
              pv2.updateEntCalOpen(!pv2.entCalOpen);
            }}
          >
            <div className="flex flex-col ">
              <div
                className="ml-1"
                onClick={() => pv2.updateEntSelectedDate(undefined)}
              >
                <FechaTexto date={pv2.entSelectedDate} type={"Entrega"} />
              </div>
            </div>
            <div className="flex flex-col w-2/6  items-end justify-center ">
              {/*  <IoMdCalendar size={38} /> */}
              <img src="/icons/cal1.png" width={30} height={30} />
              {pv2.entSelectedDate ? (
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
            <div className="min-h-fit pb-4">
              <div className="flex flex-row gap-8 mt-6 items-center justify-center">
                {pv2.entCalLoading ? (
                  <CalendarSkeleton />
                ) : (
                  <Calendar
                    mode="single"
                    required
                    selected={pv2.entSelectedDate}
                    onSelect={(d) => pv2.updateEntSelectedDate(d)}
                    className="rounded-md border shadow-sm w-full bg-transparent"
                    classNames={{
                      day_selected: `text-white`,
                      day: `h-[42px] w-[42px]`,
                      head_cell: `text-muted-foreground flex-1 select-none rounded-md text-[1rem] font-normal`,
                    }}
                    locale={es}
                    onDayClick={async () => {
                      await sleep(100);
                      pv2.updateEntCalOpen(false);
                    }}
                    disabled={[
                      { dayOfWeek: [0] },
                      { before: pv2.recSelectedDate ?? new Date("2023-08-23") },
                      {
                        after: pv2.today
                          ? new Date(
                              pv2.today?.year,
                              pv2.today?.month - 1,
                              pv2.today?.day + 35
                            )
                          : new Date(2050, 12, 30),
                      },
                      ...pv2.entBlockedDates,
                    ]}
                  />
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </OptionContainer>
    </div>
  );
};

export default CalendarioEntrega;
