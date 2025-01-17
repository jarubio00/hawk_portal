"use client";

import {
  dateString,
  dateStringRastreo,
  namedDateString,
  namedDateStringFull,
  namedDateStringFullRastreo,
} from "@/app/components/utils/helpers";
import GuiaShare from "@/app/portal/crear/components/GuiaShare";
import { SafePedido, SafeRastreo } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdHome, MdCheck } from "react-icons/md";
import { rastreoSanitizer } from "@/app/components/utils/rastreoHelper";
import PulseLoader from "react-spinners/PulseLoader";
import { IoIosWarning } from "react-icons/io";
import { FaMotorcycle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const pedidoQuery = async ({ pedidoId }: { pedidoId: number }) => {
  const response = await axios.get("/api/rastreo", { params: { pedidoId } });
  return response?.data;
};

interface EnvioRastreoProps {
  id: number;
}

const EnvioRastreo: React.FC<EnvioRastreoProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rastreo, setRastreo] = useState<SafeRastreo>({});
  const [data, setData] = useState<SafePedido>();

  const getData = async () => {
    const result = await pedidoQuery({ pedidoId: id });
    if (!result) {
      //console.log("no se encontro la guia");
      setIsLoading(false);
    } else {
      setData(result);
      //console.log("Rastreo tapped");
      //console.log({ result });
      const rastreoData = rastreoSanitizer(result);
      console.log({ rastreoData });
      setRastreo(rastreoData);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  /* useEffect(() => {
    console.log(rastreoData);
  }, [rastreoData]);
 */
  return (
    <div className="w-full m-6 flex flex-col gap-4">
      {!isLoading ? (
        data ? (
          <div>
            <Timeline>
              <TimelineItem>
                <TimelineConnector className="text-rose-500 border-rose-500" />
                <TimelineHeader>
                  <TimelineIcon className="p-2 bg-rose-500 ">
                    <MdCheck className="h-4 w-4" />
                  </TimelineIcon>
                  <p className="text-sm font-bold ">Envío programado</p>
                </TimelineHeader>
                <TimelineBody className="pb-4">
                  <p className="text-xs text-neutral-400">
                    {namedDateStringFullRastreo(data?.createdAt)}
                  </p>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon
                    className={`p-2 ${
                      rastreo.enRutaRec ? "bg-rose-500" : "bg-neutral-300"
                    }`}
                  >
                    <FaMotorcycle className={`h-4 w-4 `} />
                  </TimelineIcon>
                  <p
                    className={`text-sm font-bold ${
                      rastreo.enRutaRec ? "text-black" : "text-neutral-300"
                    }`}
                  >
                    En ruta de recolección
                  </p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                  {rastreo.incidenciaRec ? (
                    <div className="flex flex-row items-center gap-2">
                      <IoIosWarning size={18} className="text-amber-700" />
                      <div className="flex flex-col ">
                        <p className={`text-xs  `}>
                          {rastreo.leyendaInciRec} (
                          {dateString(rastreo.timeStampUltimaInciRec)})
                        </p>
                        <p className={`text-[11px] text-blue-500`}>
                          {rastreo.motivoUltimaInciRec}
                        </p>
                        <p className={`text-[11px] text-neutral-400`}>
                          Intentaremos nuevamente en el siguiente bloque
                          disponible
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400"></p>
                  )}
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon
                    className={`p-2 ${
                      rastreo.recolectado ? "bg-rose-500" : "bg-neutral-300"
                    }`}
                  >
                    <MdHome className="h-4 w-4" />
                  </TimelineIcon>
                  <p
                    className={`text-sm font-bold ${
                      rastreo.recolectado ? "text-black" : "text-neutral-300"
                    }`}
                  >
                    Recolectado
                  </p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                  <p className="text-xs text-neutral-400"></p>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon
                    className={`p-2 ${
                      rastreo.enRutaEnt ? "bg-rose-500" : "bg-neutral-300"
                    }`}
                  >
                    <FaMotorcycle className="h-4 w-4" />
                  </TimelineIcon>
                  <p
                    className={`text-sm font-bold ${
                      rastreo.enRutaEnt ? "text-black" : "text-neutral-300"
                    }`}
                  >
                    En ruta de entrega
                  </p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                  <p className="text-xs text-neutral-400"></p>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon
                    className={`p-2 ${
                      rastreo.entregado ? "bg-rose-500" : "bg-neutral-300"
                    }`}
                  >
                    <FaLocationDot className="h-4 w-4" />
                  </TimelineIcon>
                  <p
                    className={`text-sm font-bold ${
                      rastreo.entregado ? "text-black" : "text-neutral-300"
                    }`}
                  >
                    Entregado
                  </p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                  {rastreo.incidenciaEnt ? (
                    <div className="flex flex-row items-center gap-2">
                      <IoIosWarning size={18} className="text-amber-700" />
                      <div className="flex flex-col ">
                        <p className={`text-xs  `}>
                          {rastreo.leyendaInciEnt} (
                          {dateStringRastreo(rastreo.timeStampUltimaInciEnt)})
                        </p>
                        <p className={`text-[11px] text-blue-500`}>
                          {rastreo.motivoUltimaInciEnt}
                        </p>
                        <p className={`text-[11px] text-neutral-400`}>
                          Intentaremos nuevamente en el siguiente bloque
                          disponible
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400"></p>
                  )}
                </TimelineBody>
              </TimelineItem>
            </Timeline>
            <div>
              <GuiaShare guia={data?.id ?? 12345678} />
            </div>
          </div>
        ) : (
          <div>No se encontro la guía</div>
        )
      ) : (
        <div className="m-2">
          <PulseLoader size={12} color="#FF6B00" />
        </div>
      )}
    </div>
  );
};

export default EnvioRastreo;
