"use client";

import { Tarifa } from "@/app/types";
import { BarLoader } from "react-spinners";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import CotizacionCard from "./CotizacionCard";

interface CotizacionesViewProps {
  data?: string;
}

const CotizacionesView: React.FC<CotizacionesViewProps> = ({ data }) => {
  const { cotizacionLoading, cotizaciones } = useNacionalCrearStore();
  return (
    <div className="w-full border rounded-lg min-h-[40vh] p-0 flex flex-col mt-8">
      <div className="p-2 w-full rounded-t-md bg-neutral-900 text-white h-[80px] flex flex-col mb-1">
        <p className="text-xs">
          Tarifas estimadas por la paquetería en base a la información
          suministrada a partir del día 21 Noviembre 2024.
        </p>
        <p className="text-xs text-blue-400 mt-2">Información importante</p>
      </div>
      {cotizacionLoading ? (
        <BarLoader width={"100%"} color="#f16e10" />
      ) : (
        <div>
          {cotizaciones &&
            cotizaciones?.length >= 1 &&
            cotizaciones.map((cot: Tarifa, i: number) => {
              //console.log(cot);
              return (
                <div key={i}>
                  <CotizacionCard data={cot} />
                </div>
              );
            })}
        </div>
      )}
      <div></div>
    </div>
  );
};

export default CotizacionesView;
