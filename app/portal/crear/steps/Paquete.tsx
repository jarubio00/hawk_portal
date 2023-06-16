'use client';

import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import Button from "@/app/components/Button";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import StepHeading from "../components/StepHeading";
import AgregarDestinoCrear from "../components/AgregarDestinoCrear";
import { SafeUser } from "@/app/types";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import AgregarDestinoSinCp from "../components/AgregarDestinoSinCp";
import { TiArrowBack } from "react-icons/ti";
import AgregarPaqueteCrear from "../components/AgregarPaqueteCrear";

interface PaqueteStepProps {
  title?: string;
  currentUser?: SafeUser;
}

//se quito w-full , se agregp px-2
const PaqueteStep: React.FC<PaqueteStepProps> = ({ 
  title, 
  currentUser,
}) => {

const {updateActiveStep , savePaquete, paqueteSelected, updatePaqueteSelected, pedido, useDrawer} = useContext(PedidoContext) as PedidoContextType;
const router = useRouter();
const loader = useLoader();

const [saved,setSaved] = useState(false);
const [paquete,setPaquete] = useState({});
const [sinCpSelected, setSinCpSelected] = useState(false);

useEffect(() => {

  if (paqueteSelected && paqueteSelected != 0 && pedido?.paquete) {
    setSaved(true);
    setPaquete(pedido.paquete);
  } 
  //console.log(destinoSelected);
  //console.log(pedido?.destino);
},[paqueteSelected])

const onCancelSaved = () => {
  setSaved(false);
  setPaquete({});
  updatePaqueteSelected(0);
  savePaquete({})
}




  return ( 
    <div className="px-2">
        <StepHeading title="Paquete" subtitle="Selecciona o ingresa los datos de tu paquete" />
        <div className="flex flex-col gap-2">
          <div className="flex mt-2 ">
            <div className="">
            <div className="
                text-white flex-wrap
                font-semibold
                text-xs
                mb-0
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
                  onClick={() => useDrawer({open: true, title: 'Selecciona un paquete guardado', tipo: 'paquetes'})}
              >
                <FaPlus size={12} />
                <span>Usar paquete guardado</span>
            </div>  

          </div>
          {saved &&  <div className="flex ">
              <div className=" flex flex-row items-center gap-2 ml-2 text-white text-xs bg-blue-gray-300 rounded-sm px-2">
                <span>{pedido?.paquete?.nombrePaquete}</span>
                <IoMdClose size={12} onClick={onCancelSaved} className="hover:text-red-600"/>
              </div>
          
          </div>}
        </div>
     </div>
     <div className="my-4">
      <AgregarPaqueteCrear 
        title="Agrega una dirección de recolección" 
        currentUser={currentUser} 
        onClose={() => {}}
        tipo='direccion'
        from='pedido'
        saved={saved}
        paquete={paquete}
      /> 
    </div>
     
   
    </div>
   );
}
 
export default PaqueteStep;