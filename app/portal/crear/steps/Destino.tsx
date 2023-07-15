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

interface DestinoStepProps {
  title?: string;
  currentUser?: SafeUser;
  municipios: any;
}

//se quito w-full , se agregp px-2
const DestinoStep: React.FC<DestinoStepProps> = ({ 
  title, 
  currentUser,
  municipios
}) => {

const {updateActiveStep, 
  saveDestino,  
  destinoSelected, 
  updateDestinoSelected, 
  destinoSinCp,
  updateDestinoSinCp,
  pedido, 
  updateDestinoCaptured,
  useDrawer} = useContext(PedidoContext) as PedidoContextType;
const router = useRouter();
const loader = useLoader();

const [saved,setSaved] = useState(false);
const [direccion,setDireccion] = useState({});
const [sinCpSelected, setSinCpSelected] = useState(false);

useEffect(() => {
  console.log('des sel: ', destinoSelected)
  if (destinoSelected && destinoSelected != 0 && pedido?.destino) {
    setSaved(true);
    setDireccion(pedido?.destino);
    console.log('des :', pedido?.destino)
  } 
  //console.log(destinoSelected);
  //console.log(pedido?.destino);
},[destinoSelected])

const onCancelSaved = () => {
  setSaved(false);
  setDireccion({});
  updateDestinoSelected(0);
  saveDestino({})
}

const handleSinCp = (value: boolean) => {
  if(value) {
   //setSinCpSelected(true);
   updateDestinoSinCp(value);
  } else {
   //setSinCpSelected(false);
   console.log('aqui fue')
    updateDestinoSinCp(value);
    
    setDireccion({});
    updateDestinoSelected(0);
    saveDestino({})
    setSaved(false);
    updateDestinoCaptured(false);
  }
}

const handleMoveStep = (destino: any) => {
  if (pedido?.destino) {
   updateDestinoSelected(9999)
   
  }
 
}



  return ( 
    <div className="px-2">
        <StepHeading title="Destino" subtitle="Ingresa la dirección del destino" />
        <div className="flex flex-col gap-2">
          <div className="flex mt-2 ">
            <div className="">
            {!destinoSinCp ? <div className="
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
                  onClick={() => useDrawer({open: true, title: 'Selecciona una dirección de destino', tipo: 'destinos'})}
              >
                <FaPlus size={12} />
                <span>Usar destino guardado</span>
            </div>  :
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
                onClick={() => handleSinCp(false)}
            >
              <TiArrowBack size={16} />
              <span>Volver a usar código postal</span>
          </div>

          }
          </div>
          {saved &&  <div className="flex ">
              <div className=" flex flex-row items-center gap-2 ml-2 text-white text-xs bg-blue-gray-300 rounded-sm px-2">
                <span>{pedido?.destino?.contactoNombre}</span>
                <IoMdClose size={12} onClick={onCancelSaved} className="hover:text-red-600"/>
              </div>
          
          </div>}
        </div>
     </div>
      <div className="my-4">
        {!destinoSinCp ? 
          <AgregarDestinoCrear 
              title="" 
              currentUser={currentUser} 
              onClose={onCancelSaved}
              tipo='destino'
              from='pedido'
              saved={saved}
              direccion={direccion}
              onCp={handleSinCp}
              onMove={handleMoveStep}
              />  :
          <AgregarDestinoSinCp
              title="" 
              currentUser={currentUser} 
              onClose={onCancelSaved}
              tipo='destino'
              from='pedido'
              saved={saved}
              direccion={direccion}
              onCp={handleSinCp}
              municipios={municipios}
              />
              } 
      </div>
      {/* <div className="my-4 flex flex-row items-center gap-4"> 
          <Button 
              outline
              label='Atras'
              onClick={() => updateActiveStep(0)}
          />
          <Button 
              label='Sguiente'
              onClick={() => updateActiveStep(4)}
          />
      </div> */}
    </div>
   );
}
 
export default DestinoStep;