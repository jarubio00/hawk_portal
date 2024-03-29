'use client';

import { namedDateString, namedDateStringFull } from "@/app/components/utils/helpers";
import GuiaShare from "@/app/portal/crear/components/GuiaShare";
import { SafePedido, SafeRastreo } from "@/app/types";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
  import {MdHome, MdCheck} from 'react-icons/md';
  import {rastreoSanitizer} from '@/app/components/utils/rastreoHelper';
import PulseLoader from "react-spinners/PulseLoader";
import { IoIosWarning } from "react-icons/io";
import { FaMotorcycle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
  


interface EnvioRastreoProps {
 data: SafePedido
}

const EnvioRastreo: React.FC<EnvioRastreoProps> = ({
 data
}) => {

    const [isLoading,setIsLoading] = useState(false);
    const [rastreo,setRastreo] = useState<SafeRastreo>({})

    useEffect(() => {
        setIsLoading(true);
        const rastreoData = rastreoSanitizer(data);
        setRastreo(rastreoData);
        const timer = setTimeout(() => {
            setIsLoading(false);
          }, 300);
    },[data.id])
   


 return (
  <div className="w-full m-6 flex flex-col gap-4">
    
     {!isLoading ? <div>
         <Timeline>
            <TimelineItem>
                <TimelineConnector className="text-rose-500 border-rose-500"/>
                <TimelineHeader>
                    <TimelineIcon className="p-2 bg-green-500 ">
                        <MdCheck className="h-4 w-4" />
                    </TimelineIcon>
                    <p className="text-sm font-bold ">Envío programado</p>
                </TimelineHeader>
                <TimelineBody className="pb-4">
                    <p className="text-xs text-neutral-400">{namedDateStringFull(data?.createdAt)}</p>
                </TimelineBody>
            </TimelineItem>
            <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                    <TimelineIcon className={`p-2 ${rastreo.enRutaRec ? 'bg-green-500' : 'bg-neutral-300'}`}>
                        <FaMotorcycle className={`h-4 w-4 `} />
                    </TimelineIcon>
                    <p className={`text-sm font-bold ${rastreo.enRutaRec ? 'text-black' : 'text-neutral-300'}`}>En ruta de recolección</p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                    {rastreo.incidenciaRec ? <div className="flex flex-row items-center gap-2">
                        <IoIosWarning size={18} className="text-amber-700"/>
                        <div className="flex flex-col ">
                            <p className={`text-xs  `}>1era visita sin éxito</p>
                            <p className={`text-[11px] text-neutral-400`}>Intentaremos nuevamente mañana por la mañana</p>
                        </div>
                    </div> 
                    
                    :
                    
                    <p className="text-xs text-neutral-400"></p>}
                </TimelineBody>
            </TimelineItem>
            <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                    <TimelineIcon className="p-2 bg-neutral-300">
                    <MdHome className="h-4 w-4" />
                    </TimelineIcon>
                    <p className="text-sm font-bold text-neutral-300">Recolectado</p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                    <p className="text-xs text-neutral-400"></p>
                </TimelineBody>
            </TimelineItem>
            <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                    <TimelineIcon className="p-2 bg-neutral-300">
                    <FaMotorcycle className="h-4 w-4" />
                    </TimelineIcon>
                    <p className="text-sm font-bold text-neutral-300">En ruta de entrega</p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                    <p className="text-xs text-neutral-400"></p>
                </TimelineBody>
            </TimelineItem>
            <TimelineItem>
                <TimelineHeader>
                    <TimelineIcon className="p-2 bg-neutral-300">
                    <FaLocationDot className="h-4 w-4" />
                    </TimelineIcon>
                    <p className="text-sm font-bold text-neutral-300">Entregado</p>
                </TimelineHeader>
                <TimelineBody className="pb-6">
                {rastreo.incidenciaEnt ? <div className="flex flex-row items-center gap-2">
                        <IoIosWarning size={18} className="text-amber-700"/>
                        <div className="flex flex-col ">
                            <p className={`text-xs  `}>1era visita sin éxito</p>
                            <p className={`text-[11px] text-neutral-400`}>Intentaremos nuevamente mañana por la mañana</p>
                        </div>
                    </div> 
                    
                    :
                    
                    <p className="text-xs text-neutral-400"></p>}
                </TimelineBody>
            </TimelineItem>
         
         </Timeline>
         <div>
            <GuiaShare guia={data.id} />
             </div>
     </div> 
     
     
     : 
        <div className="m-2">
            <PulseLoader
                size={12}
                color="#FF6B00"
                />
        </div>
     
     }
  </div>
 );
}

export default EnvioRastreo;