'use client';

import { bloqueToString, namedDateString, statusIdToString } from "@/app/components/utils/helpers";
import { SafePedido } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import { HiCheckCircle } from "react-icons/hi";
import { MdViewInAr } from "react-icons/md";

import Link from "next/link";
import ComprobanteDialog from "./ComprobanteDialog";

interface EnvioViewProps {
 data: SafePedido;
}

const EnvioView: React.FC<EnvioViewProps> = ({
 data
}) => {
 return (
  <ScrollArea>
      <div className='flex flex-col items-center mt-2  '>
        <div className=" w-full md:w-3/5 md:border md:border-neutral-300 md:rounded-md md:p-4">
            <div className="flex flex-row items-center justify-between px-2 py-0">
                <p className="font-semibold text-foreground text-lg ml-10">{data.id}</p>
                <div className="flex ">
                    {statusIdToString(data.estatusPedidoId)}
                </div>
            </div>
            <hr className="my-2 mb-2"></hr>
            <Tabs defaultValue="info" className="mt-2 p-2">
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="rastreo">Rastreo</TabsTrigger>
                    <TabsTrigger value="guia">Guía</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                <div
                    className="w-full  flex flex-row justify-between gap-2  items-center  px-2 py-1"
                    >
                    <div className="w-6/12 flex flex-col grow-0 text-left text-xs">
            
                        <p className="text-neutral-700 font-bold">Recoleccion</p>
                        <p className="text-[11px] text-neutral-500 truncate ">{namedDateString(data.recoleccion.fecha)}</p>
                        <p className="text-[11px] text-neutral-500">{bloqueToString(data.recoleccion.bloque)}</p>
                        <p className="text-[11px] text-neutral-700 truncate ">{data.recoleccion.contactoNombre} ({data.recoleccion.contactoTel})</p>
                        <p className="text-[11px] text-neutral-500 truncate">{data.recoleccion.calle}, {data.recoleccion?.numero} {data.recoleccion?.numeroInt}</p>
                        <p className="text-[11px] text-neutral-500 truncate">{data.recoleccion.colonia}, {data.recoleccion?.municipio?.municipio}</p>
                        <p className="text-[11px] text-neutral-500 truncate">{data.recoleccion.cpId}</p>
                        <p className="text-[11px] text-neutral-700 font-semibold truncate">{data.recoleccion.empresa}</p>
                        <p className="text-[11px] text-neutral-500 ">{data.recoleccion.referencias}</p>
            
            
                    </div>
                    <div className="w-6/12 flex flex-col items-end text-xs">
                        <p className="text-neutral-700 font-bold">Entrega</p>
                        <p className="text-[11px] text-neutral-500 truncate ">{namedDateString(data.fechaEntrega)}</p>
                        <p className="text-[11px] text-neutral-500">{bloqueToString(data.bloqueEntrega)}</p>
                        <p className="text-[11px] text-neutral-700 truncate ">{data.entregaContactoNombre} ({data.entregaContactoTel})</p>
                        <p className="text-[11px] text-neutral-500 truncate">{data.entregaCalle}, {data.entregaNumero} {data.entregaNumeroInt}</p>
                        <p className="text-[11px] text-neutral-500 truncate">{data.entregaColonia}, {data.entregaMunicipioId}</p>
                        <p className="text-[11px] text-neutral-500 truncate">{data.entregaCpId}</p>
                        <p className="text-[11px] text-neutral-700 font-semibold truncate">{data.entregaEmpresa}</p>
                        <p className="text-[11px] text-neutral-500 ">{data.entregaReferencias}</p>
                    </div>
            
                </div>
                <p className="text-sm font-semibold mt-2">Paquete</p>
                <hr className="my-1"></hr>
            
                <div className='flex flex-row gap-1 items-center my-4'>
                    <div className=''>
                        <MdViewInAr size={40} className="text-rose-500" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs font-bold text-black">MINI</p>
                        <div className="flex flex-row  gap-2  items-center">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm font-bold leading-none">{data.paqLargo}</p>
                                <p className="text-[11px] text-neutral-400 leading-none">largo</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm font-bold leading-none">{data.paqAlto}</p>
                                <p className="text-[11px] text-neutral-400 leading-none">alto</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm font-bold leading-none">{data.paqAncho}</p>
                                <p className="text-[11px] text-neutral-400 leading-none">ancho</p>
                            </div>
                            <div className="flex flex-col justify-center items-center w-10 rounded-sm py-1 bg-black">
                                <p className="text-sm  text-white leading-none">{data.paqPeso}</p>
                                <p className="text-[11px] text-white leading-none">kg</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-sm font-semibold mt-2">Pago</p>
                <hr className="my-1"></hr>
                <div className='flex flex-row gap-1 items-center mt-2'>
                    <p className="text-sm text-black font-bold">${data.precioVenta}</p>
            
                    <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                        <div className='flex flex-row items-center'>
                        <p className="ml-1">Efectivo</p>
                        </div>
                    </Badge>
                    <Badge variant='secondary'>
                        <p className="text-[11px] font-normal">Pendiente</p>
                    </Badge>
                    <Badge variant='secondary'>
                        <p className="text-[11px] font-normal">No confirmado</p>
                    </Badge>
                </div>
                {data.comprobante && data.comprobanteUrl &&
                    <ComprobanteDialog pedidoId={data.id} url={data.comprobanteUrl} />
                }
                {data.cobroDestino && <><p className="text-md font-semibold mt-2">Cobro a destinatario</p>
                <hr className="my-1"></hr>
                <div className='flex flex-row gap-1 items-center mt-2'>
                    <p className="text-sm text-black font-bold">${data.precioVenta}</p>
            
                    <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                        <div className='flex flex-row items-center'>
                        <p className="ml-1">Efectivo</p>
                        </div>
                    </Badge>
                    <Badge variant='secondary'>
                        <p className="text-[11px] font-normal">Pendiente</p>
                    </Badge>
                    <Badge variant='secondary'>
                        <p className="text-[11px] font-normal">No confirmado</p>
                    </Badge>
                </div></>}

                </TabsContent>
              <TabsContent value={"rastreo"} className="m-0 p-0">
            
              </TabsContent>
              <TabsContent value={"guia"} className="m-0 p-0">
                hola
              </TabsContent>
            </Tabs>
            
            
            
            
        </div>
      </div>
  </ScrollArea>
 );
}

export default EnvioView;