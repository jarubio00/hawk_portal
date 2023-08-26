'use client';

import { namedDateString, namedDateStringFull } from "@/app/components/utils/helpers";
import GuiaShare from "@/app/portal/crear/components/GuiaShare";
import { SafePedido } from "@/app/types";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
  } from "@material-tailwind/react";
  import {MdHome, MdCheck} from 'react-icons/md';
  


interface EnvioRastreoProps {
 data: SafePedido
}

const EnvioRastreo: React.FC<EnvioRastreoProps> = ({
 data
}) => {
    console.log('rastreo: ',data);
 return (
  <div className="w-full m-6 flex flex-col gap-4">
    
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
                <TimelineIcon className="p-2 bg-neutral-300">
                <MdHome className="h-4 w-4" />
                </TimelineIcon>
                <p className="text-sm font-bold text-neutral-300">En ruta de recolección</p>
            </TimelineHeader>
            <TimelineBody className="pb-6">
                <p className="text-xs text-neutral-400"></p>
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
                <MdHome className="h-4 w-4" />
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
                <MdHome className="h-4 w-4" />
                </TimelineIcon>
                <p className="text-sm font-bold text-neutral-300">Entregado</p>
            </TimelineHeader>
            <TimelineBody className="pb-6">
                <p className="text-xs text-neutral-400"></p>
            </TimelineBody>
        </TimelineItem>
        
     </Timeline>

     <div>
        <GuiaShare guia={data.id} />
    </div>
  </div>
 );
}

export default EnvioRastreo;