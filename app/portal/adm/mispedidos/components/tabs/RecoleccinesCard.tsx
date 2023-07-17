'use client';
import { bloqueToString, namedDateString } from "@/app/components/utils/helpers";
import { Recoleccion } from "@prisma/client";
interface RecoleccionesCardProps {
  onClick: () => void;
  data: Recoleccion;
  key?: any;
}

const RecoleccionesCard: React.FC<RecoleccionesCardProps> = ({
  onClick,
  data,
  key
}) => {
  return ( 
    <div key={key} className="w-full xl:w-5/6 flex flex-row border border-neutral-300 rounded-md px-2 py-1 items-center">
        <div className="w-4/12 flex flex-col text-xs">
            <p className="text-neutral-700 truncate">{namedDateString(data.fecha)}</p>
            <p className="text-[11px]">{bloqueToString(data.bloque)}</p>
            
        </div>
        <div className="w-2/12 ">
            <p className="text-xs truncate">{data.calle} {data.numero}</p>
        </div>
        <div className="w-2/12 text-xs">{data.estatus.estatus}</div>
        <div className="w-2/12 ">d</div>
        <div className="w-1/12 ">
            <p className="text-[10px]"> Envíos: {
                //@ts-ignore
                data.pedidos?.length
                }</p>
        </div>
    </div>
   );
}
 
export default RecoleccionesCard;