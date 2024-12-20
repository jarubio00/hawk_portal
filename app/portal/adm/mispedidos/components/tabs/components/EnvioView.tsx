"use client";

import {
  bloqueToString,
  namedDateString,
  statusIdToString,
} from "@/app/components/utils/helpers";
import { SafePedido } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { HiCheckCircle, HiOutlineRefresh } from "react-icons/hi";
import { MdRefresh, MdViewInAr } from "react-icons/md";

import Link from "next/link";
import ComprobanteDialog from "./ComprobanteDialog";
import EnvioViewGuia from "./EnvioViewGuia";
import EnvioRastreo from "./EnvioRastreo";
import EnvioInfo from "./EnvioInfo";
import EnvioTickets from "./EnvioTickets";
import { useRouter } from "next/navigation";
import GuiaPrintView from "./GuiaPrintView";

interface EnvioViewProps {
  data: SafePedido;
  onRastreoRefresh?: () => void;
}

const EnvioView: React.FC<EnvioViewProps> = ({ data, onRastreoRefresh }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-2 w-full overflow-y-scroll ">
      <div className=" w-full md:w-3/5 md:border md:border-neutral-300 md:rounded-md md:p-4">
        <div className="flex flex-row items-center justify-between px-2 py-2">
          <p className="font-semibold text-foreground text-lg ml-10">
            {data.id}
          </p>
          <div className="flex ">{statusIdToString(data.estatusPedidoId)}</div>
        </div>
        <hr className="my-2 mb-2"></hr>
        <Tabs defaultValue="info" className="mt-2 p-2 w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="rastreo">Rastreo</TabsTrigger>
            <TabsTrigger value="guia">Guía</TabsTrigger>
            {/* <TabsTrigger value="tickets">Tickets</TabsTrigger> */}
          </TabsList>
          <TabsContent value="info">
            <EnvioInfo data={data} />
          </TabsContent>
          <TabsContent value={"rastreo"} className="m-0 p-0">
            <EnvioRastreo id={data.id} />
          </TabsContent>
          <TabsContent value={"guia"} className="m-0 p-0">
            <GuiaPrintView data={data} />
          </TabsContent>
          {/* <TabsContent value={"tickets"} className="m-0 p-0">
            <EnvioTickets data={data} />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default EnvioView;
