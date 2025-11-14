"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import CalendarioRecoleccion from "./components/programaV2/CalendarioRecoleccion";
import { useProgramaStore } from "../store/crear-store";
import CalendarioEntrega from "./components/programaV2/CalendarioEntrega";
import CalendarioMismoDia from "./components/programaV2/CalendarioMismoDia";
import { EntregaSkeleton } from "./components/programaV2/EntregaSkeleton";

interface ProgramacionV2StepProps {
  data?: string;
}

const ProgramacionV2Step: React.FC<ProgramacionV2StepProps> = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pv2 = useProgramaStore();

  useEffect(() => {
    pv2.getAvisoActivo();
  }, []);
  return (
    <div className="flex flex-col gap-6 mt-8 ">
      <div className="min-h-fit">
        <div className="flex flex-col gap-1 mb-8">
          <p className="text-xs font-bold uppercase">Recolección</p>
          <div className="ml-0">
            <CalendarioRecoleccion />
          </div>
        </div>
        {pv2.recSelectedDate && !pv2.entregaLoading && (
          <div className="mb-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold uppercase">Entrega</p>
              <CalendarioEntrega />
              <div className="my-1"></div>
              {pv2.mismoDiaEnabled ? (
                <CalendarioMismoDia />
              ) : (
                <div className="flex flex-col  w-[350px] border rounded-lg items-center justify-center p-3 gap-2 bg-neutral-200">
                  <div className=" text-xs h-11 flex flex-row items-center justify-between w-full">
                    <div>
                      {pv2.mismoDiaCustomMessage.length > 10 ? (
                        <p className="text-start text-neutral-400 italic line-clamp-3">
                          {pv2.mismoDiaCustomMessage}
                        </p>
                      ) : (
                        <p className="text-neutral-400 italic line-clamp-3">
                          El servicio de entrega el mismo día alcanzó el límite
                          y ya no está disponible en esta fecha.
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-2/6 items-end justify-center  ">
                      <div
                        className={`flex items-center justify-center h-10 w-10 rounded-full bg-black text-white  ${
                          !pv2.mismoDiaEnabled && "bg-neutral-400"
                        }`}
                      >
                        <p className="text-xl font-bold">MD</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {pv2.entregaLoading && <EntregaSkeleton />}
      </div>

      {/* <AvisosOpciones />
      <div onClick={() => pv2.getAvisoActivo()}>Buscar avisos</div> */}
    </div>
  );
};

export default ProgramacionV2Step;
