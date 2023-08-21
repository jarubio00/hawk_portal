'use client';
import { bloqueToString, dateString, namedDateString, statusCobroIdToString, statusIdToString } from "@/app/components/utils/helpers";
import { SafeRecoleccion, SafePedido, SafeCobro } from "@/app/types";
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import {forwardRef} from 'react';
import {MdViewInAr} from 'react-icons/md';
import { Badge } from "@/components/ui/badge";
import {HiCheckCircle} from 'react-icons/hi'

interface CobrosCardsProps {

  data: SafeCobro;
}

export type Ref = any;

const CobrosCards = forwardRef<Ref, CobrosCardsProps>((props, ref)  => {
  const {data} = props;
  const router = useRouter();

  function currencyFormat(num: any) {
    return  Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  return ( 
        <div className="flex flex-col border border-neutral-300 bg-white shadow-lg rounded-lg  cursor-pointer my-2 py-1">
          <div className="flex flex-row items-center justify-between px-2 py-1">
            <div className="flex flex-col">
              <p className="font-semibold text-foreground text-xs ">{data.pedido.entregaContactoNombre}</p>
              <p className="text-neutral-400 text-xs ">{data.pedido?.entregaColonia}, {data.pedido?.municipio?.municipio}</p>
            </div>
            <div className="flex ">
              {statusCobroIdToString(data.estatusCobroId,'small')}
            </div>
          </div>
          <hr className="my-1"></hr>
       
          <div className="px-2 py-1 flex flex-row justify-between items-center">
            

              <div className='flex flex-col'>
                <p className="text-sm text-black font-bold">${currencyFormat(data.cantidad)}</p>
                <p className="text-[11px] text-neutral-400 leading-none">Comisión: ${(data.cantidad * .035).toFixed(2)}</p>
              </div>
              

            <div className='flex flex-col gap-1 justify-end items-end '>
                <Badge variant='outline' className="text-xs font-bold rounded-md px-1">
                    <div className='flex flex-row items-center'>
                      <HiCheckCircle size={14} className={`${data.estatusCobroId == 2 || data.estatusCobroId == 3  ? 'text-green-500':'text-neutral-300'}`} />
                      <HiCheckCircle size={14} className={`${data.estatusCobroId == 3 ? 'text-green-500':'text-neutral-300'}`} />
                      
                    </div>
                  </Badge>
              
            </div>
          </div>
        </div>
   );
})
 
export default CobrosCards;