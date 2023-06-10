'use client';

import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import Button from "@/app/components/Button";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import StepHeading from "../components/StepHeading";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { SafeUser } from "@/app/types";
import { FaPlus } from "react-icons/fa";

interface DestinoStepProps {
  title?: string;
  currentUser?: SafeUser;
}

//se quito w-full , se agregp px-2
const DestinoStep: React.FC<DestinoStepProps> = ({ 
  title, 
  currentUser
}) => {

const {updateActiveStep , saveRecoleccion, pedido, useDrawer} = useContext(PedidoContext) as PedidoContextType;
const router = useRouter();
const loader = useLoader();

const onAddClose = () => {}

  return ( 
    <div className="px-2">
        <StepHeading title="Destino" subtitle="Ingresa la dirección del destino" />
        <div className="flex mt-2">
       <div className="
          text-white flex-wrap
          font-semibold
          text-xs
          mb-4
          flex
          flex-row
          gap-1
          items-center
          cursor-pointer
          bg-blue-500
          hover:bg-blue-300
          rounded-md
          px-2
          py-1
          "
            onClick={() => useDrawer({open: true, title: 'Agregar dirección de recolección', tipo: 'addDireccion'})}
        >
          <FaPlus size={12} />
          <span>Usar destino guardado</span>
       </div>
     </div>
        <div className="my-4">
          <AgregarDireccion 
              title="" 
              currentUser={currentUser} 
              onClose={onAddClose}
              tipo='destino'
              from='pedido'
              saved={false}
              />
        </div>
        <div className="my-4 flex flex-row items-center gap-4"> 
            <Button 
                outline
                label='Atras'
                onClick={() => updateActiveStep(0)}
            />
            <Button 
                label='Sguiente'
                onClick={() => updateActiveStep(4)}
            />
     </div>
    </div>
   );
}
 
export default DestinoStep;