'use client';

import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType,ICotizaItem, IPedido} from "@/app/types/pedido"


import Button from "@/app/components/Button";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt,FaClock } from 'react-icons/fa'
import { MdNightlightRound, MdLocationOn, MdViewInAr } from 'react-icons/md'
import {BsFillBoxSeamFill} from 'react-icons/bs'
import { IoMdClose } from "react-icons/io";
import {namedDate, namedDateString} from '@/app/components/utils/helpers';
import ComprobanteInput from "./ComprobanteInput";


interface MetodoPagoCardProps {
  data?: any;
}

//se quito w-full , se agregp px-2
const MetodoPagoCard: React.FC<MetodoPagoCardProps> = ({ 
  data, 
}) => {

    const {updateTipoPago, saveMetodoPago,metodoPago,tipoPago, pedido} = useContext(PedidoContext) as PedidoContextType;


    const handleTipoPago = (tipo: string) => {
        saveMetodoPago({});
        updateTipoPago(tipo);

        if (tipo == 'efectivo') {
            saveMetodoPago({
            ...pedido?.metodoPago,
            formaPagoId: 1,
            passed: true,
            comprobante: false,
            comprobanteUrl: '',
            comprobanteFileType: '',
            comprobanteString: ''
            })
        } else if (tipo == 'transfer') {
            saveMetodoPago({
                ...pedido?.metodoPago,
                formaPagoId: 2,
                passed: false,
                comprobante: false,
                comprobanteUrl: '',
                comprobanteFileType: '',
                comprobanteString: ''
                })
        }
      }
    const handleInputFile = (props: any) => {
        console.log(props);
    }

  return ( 
    <div className="">
        <div className="flex flex-col gap-1 w-full  lg:w-2/4 ">
            <p className="text-xs md:text-sm text-neutral-500">Selecciona tu método de pago</p>
            <div className="flex flex-row items-center gap-3 my-2">
                <div className="flex flex-row items-center gap-4">
                    <div className={` border-2 bg-rose-500  text-xs 
                            shadow-md rounded-md py-1 px-2 cursor-pointer
                        ${tipoPago == 'efectivo' ? 
                            'bg-rose-500 text-white border-rose-500' 
                            : 'bg-white  border-neutral-800'}
                            `}
                        onClick={() => handleTipoPago('efectivo')}
                    >
                        <p className=" text-center text-xs">Efectivo al recolectar</p>
                    </div>
                    <div className={`border-2  text-xs
                        shadow-md rounded-md py-1 px-2 cursor-pointer
                        ${tipoPago == 'transfer' ? 
                            'bg-rose-500 text-white border-rose-500' 
                            : 'bg-white  border-neutral-800'}
                        `}
                        onClick={() => handleTipoPago('transfer')}
                    >
                        <p className=" text-center">Transferencia o depósito</p>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div className="my-1">
            {tipoPago == 'efectivo' && <div className="p-3">
                <p className="text-xs text-neutral-500">Se cobrará el monto en efectivo en la visita de recolección, favor de tener el monto exacto.</p>
            </div>}
            {tipoPago == 'transfer' && <div className="p-2">
                <ComprobanteInput onChange={handleInputFile}/>
            </div>}
          
        </div>
    </div>
   );
}
 
export default MetodoPagoCard;