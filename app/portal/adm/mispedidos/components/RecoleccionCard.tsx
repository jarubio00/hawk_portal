'use client';

import { bloqueToString, namedDateString } from "@/app/components/utils/helpers";
import { SafeRecoleccion } from "@/app/types";
import { Button } from "@/components/ui/button";
import { BsPlus } from "react-icons/bs";
import {useRouter} from "next/navigation";
import useLoader from "@/app/hooks/useLoader";

interface RecoleccionCardProps {
 recoleccion: SafeRecoleccion;
}

const RecoleccionCard: React.FC<RecoleccionCardProps> = ({
 recoleccion
}) => {

    const router = useRouter();
    const loader = useLoader();
 return (
   <div className="flex flex-row justify-between items-center border border-neutral-300 bg-white shadow-lg rounded-lg  cursor-pointer my-2 p-2">
    <div className="flex flex-col gap-1">
        <p className="text-xs truncate leading-none font-semibold text-foreground ">{namedDateString(recoleccion.fecha)}</p>
        <p className="text-[11px] text-neutral-400 truncate leading-none">{recoleccion.colonia}, {bloqueToString(recoleccion.bloque)}</p>
        <p className="text-[11px] font-semibold leading-none">Envíos: {recoleccion.pedidos.length }</p>
    </div>
    <Button 
     variant="link" 
     className="text-xs px-2 py-0" 
     onClick={() => {
        loader.onOpen();
        router.push(`/portal/crear?append=1&rec=${recoleccion.id}`)}
        }
     >
        <BsPlus size={18} />
        Agregar envío
        </Button>
  </div>
 );
}

export default RecoleccionCard;