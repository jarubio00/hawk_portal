'use client';

import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {ICotizaItem, IPedido} from "@/app/types/pedido"
import Button from "@/app/components/Button";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt,FaClock } from 'react-icons/fa'
import { MdNightlightRound, MdLocationOn, MdViewInAr } from 'react-icons/md'
import {BsFillBoxSeamFill} from 'react-icons/bs'
import { IoMdClose } from "react-icons/io";
import {namedDate, namedDateString} from '@/app/components/utils/helpers';


interface CotizaCardProps {
  data?: ICotizaItem;
}

//se quito w-full , se agregp px-2
const CotizaCard: React.FC<CotizaCardProps> = ({ 
  data, 
}) => {

  return ( 
    <div className="">
        <div className="flex flex-col gap-1 w-full  lg:w-2/4 ">
            <div className="flex flex-row items-center gap-3  justify-between p-3">
               <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-col">
                        <p className="text-xs font-bold text-neutral-400 text-center">CANT</p>
                        <p className="text-xs text-center">{data?.cantidad}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs font-bold text-neutral-400 text-left">DESCRIPCIÓN</p>
                        <p className="text-xs text-left">{data?.descripcion}</p>
                    </div>
               </div>
               <div className="flex flex-row items-center">
                    <div className="flex flex-col">
                        <p className="text-xs font-bold text-neutral-400 text-right">PRECIO</p>
                        <p className="text-xs text-right">${data?.precio}.00</p>
                    </div>
               </div>
            </div>
            <hr></hr>
            <div className="flex flex-row items-center gap-1 justify-between p-3">
                <div></div>
                <div className="flex flex-row items-center gap-4">
                    <p className="text-xs font-bold  text-right">TOTAL</p>
                    <p className="text-xs text-right">${data?.precio}.00</p>
                </div>
            </div>
        </div>
        
    </div>
   );
}
 
export default CotizaCard;