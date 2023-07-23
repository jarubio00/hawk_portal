'use client';
import { useContext } from "react";
import { MisPedidosContext, MisPedidosContextType } from "../../../context/MisPedidosContext";
import RecoleccionesCard from "./RecoleccinesCard";

interface ActivasProps {
 data?: string;
}

const Activas: React.FC<ActivasProps> = ({
 data
}) => {

const {recolecciones} = useContext(MisPedidosContext) as MisPedidosContextType;
console.log(recolecciones);
 return (
  <div>
     {recolecciones.length >= 1 && recolecciones.map((rec: any) => {
          return (
            <RecoleccionesCard key={rec.id} data={rec} onClick={() => {}} />
          )
        })}
  </div>
 );
}

export default Activas;

