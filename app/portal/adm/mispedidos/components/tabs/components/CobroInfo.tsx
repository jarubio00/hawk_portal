'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import { bloqueToString, namedDateString } from "@/app/components/utils/helpers";
import { SafeCobro, SafePedido } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { MdCancel, MdViewInAr } from "react-icons/md";
import ComprobanteDialog from "./ComprobanteDialog";
import { HiCheckCircle } from "react-icons/hi";

interface CobroInfoProps {
 data: SafeCobro;
}

const CobroInfo: React.FC<CobroInfoProps> = ({
 data
}) => {

    function currencyFormat(num: any) {
        return  Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    console.log(data);
 return (
  <div className='mx-4 mt-2 flex flex-col gap-2'>
    <div className="flex flex-col grow-0 text-left text-xs">
        <p className="text-2xl font-bold">${currencyFormat(data.cantidad)}</p>
        <p className="text-[11px] text-neutral-400 leading-none">Comisión: ${(data.cantidad * .035).toFixed(2)}</p>
    </div>
    <p className="text-sm font-semibold mt-2">Guía</p>
    <hr className="my-0"></hr>
    <p className="text-xs text-neutral-400 font-bold leading-none">{data.pedido.id}</p>
    <p className="text-sm font-semibold mt-2">Destinatario a cobrar</p>
    <hr className="my-0"></hr>
    <p className="text-xs text-neutral-400 leading-none ">{data.pedido.entregaContactoNombre} - {data.pedido.entregaContactoTel}</p>
    <p className="text-xs text-neutral-400 leading-none">{data.pedido.entregaCalle} {data.pedido.entregaNumero} {data.pedido.entregaNumeroInt} </p>
    <p className="text-xs text-neutral-400 leading-none">{data.pedido.entregaColonia}, {data.pedido?.municipio?.municipio }</p>

            
    <p className="text-sm font-semibold mt-2">Estatus</p>
    <hr className="my-0"></hr>
    <div className='flex flex-col gap-1  mt-2 mx-4 w-40'>
        <div className="my-1 flex flex-col">
            <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                <div className='flex flex-row items-center gap-1'>
                    <HiCheckCircle size={14} className={`text-green-500`} />
                    <p className="text-[11px] font-normal">Programado</p>
                </div>
                
            </Badge>
            <p className="text-[10px] font-normal text-neutral-300">{data.createdAt.toString()}</p>
        </div>
        {data.estatusCobroId != 4 ? <div>
            <div className="my-1 flex flex-col">
                <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                    <div className='flex flex-row items-center gap-1'>
                        <HiCheckCircle size={14} className={`
                            ${data.estatusCobroId == 2 || 
                                data.estatusCobroId == 3 ? 'text-green-500' : 'text-neutral-300'}`} 
                            />
                        <p className={`text-[11px] font-normal 
                        ${data.estatusCobroId == 2 || 
                            data.estatusCobroId == 3 ? 'text-foreground' : 'text-neutral-300'}`} 
                        >Cobrado</p>
                    </div>
                </Badge>
                <p className="text-[10px] font-normal text-neutral-300">{data?.cobradoAt?.toString() || ''}</p>
            </div>
            <div className="my-1 flex flex-col">
                <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                    <div className='flex flex-row items-center gap-1'>
                        <HiCheckCircle size={14} className={`
                            ${data.estatusCobroId == 3 ? 'text-green-500' : 'text-neutral-300'}`} 
                            />
                        <p className={`text-[11px] font-normal 
                        ${data.estatusCobroId == 3 ? 'text-foreground' : 'text-neutral-300'}`} 
                        >Confirmado</p>
                    </div>
                </Badge>
                <p className="text-[10px] font-normal text-neutral-300">{data?.confirmadoAt?.toString() || ''}</p>
            </div>
            <div className="my-1 flex flex-col">
                <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                    <div className='flex flex-row items-center gap-1'>
                        <HiCheckCircle size={14} className={`
                            ${data.estatusPagoCobroId == 2 ? 'text-green-500' : 'text-neutral-300'}`} 
                            />
                        <p className={`text-[11px] font-normal 
                        ${data.estatusPagoCobroId == 2 ? 'text-foreground' : 'text-neutral-300'}`} 
                        >Retornado</p>
                    </div>
                </Badge>
                <p className="text-[10px] font-normal text-neutral-300">{data?.retornoAt?.toString() || ''}</p>
                {data.estatusPagoCobroId == 2 && data.retornoComprobanteUrl &&
                    <ComprobanteDialog pedidoId={data.id} url={data.retornoComprobanteUrl} />
                }
            </div>
        </div> : 
        <div className="my-1 flex flex-col">
            <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                <div className='flex flex-row items-center gap-1'>
                    <MdCancel size={14} className={`text-red-500`} />
                    <p className={`text-[11px] font-normal text-foreground`} 
                    >Cancelado</p>
                </div>
            </Badge>
        <p className="text-[10px] font-normal text-neutral-300">{data?.canceladoAt?.toString() || ''}</p>
    </div>
        }



       
        

        {/* <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
            <div className='flex flex-row items-center'>
            <p className="ml-1">Efectivo</p>
            </div>
        </Badge>
        <Badge variant='secondary' className={`${(data.estatusCobroId == 2 || data.estatusPagoId == 2 || data.estatusPagoId == 3) &&  'bg-green-500'} py-0`}>
            <p className={`text-[11px] font-normal ${(data.formaPagoId == 2 || data.estatusPagoId == 2 || data.estatusPagoId == 3) &&  'text-white'}`}>
               { data.formaPagoId == 2 || data.estatusPagoId == 2 ? 'Pagado' : 'Pendiente'}
            </p>
        </Badge>
        <Badge variant='secondary' className={`${data.estatusPagoId == 3 &&  'bg-green-500'} py-0`}>
            <p className={`text-[11px] font-normal ${ data.estatusPagoId == 3 &&  'text-white'}`}>
                {data.estatusPagoId == 3 ? 'Confirmado' : 'No confirmado'}
                </p>
        </Badge> */}
    </div>
   {/*  {data.comprobante && data.comprobanteUrl &&
        <ComprobanteDialog pedidoId={data.id} url={data.comprobanteUrl} />
    } */}
  

   
  </div>
 );
}

export default CobroInfo;