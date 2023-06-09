'use client';

import { IconType } from "react-icons";
import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import Button from "@/app/components/Button";


interface ConfirmarStepProps {
  title?: string;
}

//se quito w-full , se agregp px-2
const ConfirmarStep: React.FC<ConfirmarStepProps> = ({ 
  title, 
}) => {

const {updateActiveStep , pedido} = useContext(PedidoContext) as PedidoContextType;
  return ( 
    <div className="p-8 flex flex-col">
        <span className="text-lg font-bold">Pedido data:</span> 
        <p className="text-xs">
            {JSON.stringify(pedido,null,2)}
        </p>
        <div className=" my-4 ml-4 flex flex-row gap-6">
          <Button label="Anterior" onClick={() => updateActiveStep(0)}  />
          <Button label="Terminar" onClick={() => updateActiveStep(4)}  />
        </div>
    </div>
   );
}
 
export default ConfirmarStep;