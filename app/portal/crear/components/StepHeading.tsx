'use client';

import { useContext } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";

interface StepHeadingProps {
  title: string;
  subtitle: string;
}

//se quito w-full , se agregp px-2
const StepHeading: React.FC<StepHeadingProps> = ({ 
  title, 
  subtitle
}) => {

const {updateActiveStep , saveRecoleccion, pedido} = useContext(PedidoContext) as PedidoContextType;


  return ( 
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <span className="text-xl font-bold ">{title}</span>
        <span className="text-sm text-bold text-neutral-400">{subtitle}</span>
      </div>

      <div></div>
      </div>
      
   );
}
 
export default StepHeading;