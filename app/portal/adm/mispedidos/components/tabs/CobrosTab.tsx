"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { namedDate, namedDateString } from "@/app/components/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { MdAccessTimeFilled, MdCancel } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import Activas from "./components/Activas";
import Completadas from "./components/Completadas";
import Canceladas from "./components/Canceladas";
import EnviosDisplay from "./components/EnviosDisplay";
import { SafeCobro, SafePedido } from "@/app/types";
import CobrosDisplay from "./components/CobrosDisplay";
import CobrosDash from "./components/CobrosDash";

const pedidosQuery = async () => {
  const response = await axios.get("/api/cobros/counts");
  console.log(response.data);
  return response?.data;
};

interface CobrosTabProps {
  onView: (open: boolean, c: SafeCobro) => void;
}

const CobrosTab: React.FC<CobrosTabProps> = ({ onView }) => {
  const [filter, setFilter] = useState("1");
  const [completadasOrder, setCompletadasOrder] = useState("desc");

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  const handleCompletadasOrder = (order: string) => {
    setCompletadasOrder(order);
  };

  const { data, error, isLoading, isSuccess } = useQuery({
    queryFn: () => pedidosQuery(),
    queryKey: ["cobrosCounts"],
  });

  return (
    <div className=" w-full py-2 flex flex-col gap-2">
      {/* <CobrosDash data={data} /> */}
      <div className="my-4 flex flex-row items-center gap-4 overflow-x-auto touch-auto no-scrollbar">
        <Badge
          variant={filter == "1" ? "default" : "secondary"}
          className="cursor-pointer  pr-2 pl-2 py-1"
          onClick={() => changeFilter("1")}
        >
          <div className="flex flex-row items-center gap-1">
            <MdAccessTimeFilled />
            <p className="text-[11px]">Por cobrar</p>
            <p className="text-[11px]">
              ({data && data.activos ? data.activos : 0})
            </p>
          </div>
        </Badge>
        <Badge
          variant={filter == "5" ? "default" : "secondary"}
          className="cursor-pointer  pr-2 pl-2 py-1"
          onClick={() => changeFilter("5")}
        >
          <div className="flex flex-row items-center gap-1">
            <HiCheckCircle />
            <p className="text-[11px]">Cobrados corte</p>
            <p className="text-[11px]">
              ({data && data.entregados ? data.entregados : 0})
            </p>
          </div>
        </Badge>
        <Badge
          variant={filter == "4" ? "default" : "secondary"}
          className="cursor-pointer  pr-2 pl-2 py-1"
          onClick={() => changeFilter("4")}
        >
          <div className="flex flex-row items-center gap-1">
            <MdCancel />
            <p className="text-[11px]">Cobrados todos</p>
            <p className="text-[11px]">
              ({data && data.cancelados ? data.cancelados : 0})
            </p>
          </div>
        </Badge>
        <Badge
          variant={filter == "4" ? "default" : "secondary"}
          className="cursor-pointer  pr-2 pl-2 py-1"
          onClick={() => changeFilter("4")}
        >
          <div className="flex flex-row items-center gap-1">
            <MdCancel />
            <p className="text-[11px]">Cancelados</p>
            <p className="text-[11px]">
              ({data && data.cancelados ? data.cancelados : 0})
            </p>
          </div>
        </Badge>
      </div>
      <CobrosDisplay filter={filter} onView={onView} />
    </div>
  );
};

export default CobrosTab;
