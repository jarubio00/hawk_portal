'use client'
import { useContext } from "react";
import { MisPedidosContext, MisPedidosContextType } from "../../context/MisPedidosContext";
import {namedDate, namedDateString} from '@/app/components/utils/helpers';
import RecoleccionesCard from "./RecoleccinesCard";
interface RecoleccionesTabProps {
data?: any;
}

const RecoleccionesTab: React.FC<RecoleccionesTabProps> =  ({
  data
}) => {
  const {recolecciones} = useContext(MisPedidosContext) as MisPedidosContextType;
  console.log(recolecciones);
 
  return ( 
    <div className=" w-full p-4 flex flex-col gap-2">
        {recolecciones.map((rec: any) => {
          return (
            <RecoleccionesCard key={rec.id} data={rec} onClick={() => {}} />
          )
        })}
    </div>
   );
}
 
export default RecoleccionesTab;