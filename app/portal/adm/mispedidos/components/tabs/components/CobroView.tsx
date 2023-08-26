'use client';

import { bloqueToString, namedDateString, statusCobroIdToString, statusIdToString } from "@/app/components/utils/helpers";
import { SafeCobro, SafePedido } from "@/app/types";
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
import CobroInfo from "./CobroInfo";


interface CobroViewProps {
 data: SafeCobro;
}

const CobroView: React.FC<CobroViewProps> = ({
 data
}) => {
 return (
    
    <div className='flex flex-col items-center mt-2 w-full overflow-y-scroll '>
        
    <div className=" w-full md:w-3/5 md:border md:border-neutral-300 md:rounded-md md:p-4">
        <div className="flex flex-row items-center justify-between px-2 py-2 ml-10">
            <div className="flex flex-col">
            <p className="text-xs text-neutral-400 truncate mt-1">ID:{data.id}</p>
              
            </div>
            <div className="flex ">
                {statusCobroIdToString(data.estatusCobroId)}
            </div>
        </div>
        <hr className="my-0 mt-2"></hr>
        <div>
        <CobroInfo data={data} />
        </div>
        
        
        
        
        
    </div>
    
    </div>
 
 );
}

export default CobroView;