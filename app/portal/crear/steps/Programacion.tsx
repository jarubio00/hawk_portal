'use client';

import { useCallback, useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import getServerDate from "@/app/actions/getServerDate";
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

interface ProgramacionStepProps {
  title?: string;
  currentUser?: SafeUser;
}

//se quito w-full , se agregp px-2
const ProgramacionStep: React.FC<ProgramacionStepProps> = ({ 
  title, 
  currentUser,
}) => {

const {updateActiveStep , savePaquete, paqueteSelected, updatePaqueteSelected, pedido, useDrawer} = useContext(PedidoContext) as PedidoContextType;
const router = useRouter();
const loader = useLoader();


const serverDate = useCallback(async () => {
  const date = await getServerDate();

  console.log(date);

}, [])

useEffect(() => {
 serverDate();
},[serverDate])

const [saved,setSaved] = useState(false);
const [paquete,setPaquete] = useState({});
const [datetime,setDatetime] = useState(0);


const handleBack = () => {
  updateActiveStep(2)
}

const handleNext = () => {
  updateActiveStep(4);

  
}

const handleServerDate = async () => {
  const serverdate = await getServerDate();
  return serverdate;
}







  return ( 
    <div className="px-2">
        <StepHeading title="Programación" subtitle="Selecciona las fechas y horarios de recolección y entrega" />
       
     <div className="my-4">
      
      </div>
      <div className="my-4 flex flex-row items-center gap-4"> 
              <Button 
                  outline
                  label='Atras'
                  onClick={handleBack}
              />
              <Button 
                  label='Siguiente'
                  onClick={handleNext}
              />
            </div>
   
    </div>
   );
}
 
export default ProgramacionStep;