'use client';

import { useCallback, useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import getServerDate from "@/app/actions/getServerDate";
import Button from "@/app/components/Button";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import StepHeading from "../components/StepHeading";
import { serverDate } from "@/app/actions/apiQuerys";
import AgregarDestinoCrear from "../components/AgregarDestinoCrear";
import { SafeUser } from "@/app/types";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import AgregarDestinoSinCp from "../components/AgregarDestinoSinCp";
import { TiArrowBack } from "react-icons/ti";
import AgregarPaqueteCrear from "../components/AgregarPaqueteCrear";
import Datepicker from "../components/Datepicker";
import ProgramaDialog from "../components/dialogs/ProgramaDialog";

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

const clientDate = new Date();


const serverDateFunction = useCallback(async () => {
  const res = await serverDate('now');

  //@ts-ignore
  const date = res.response.data;

  console.log(date);
  setDatetime(date);

}, [])

useEffect(() => {
 serverDateFunction();
},[serverDateFunction])

const [saved,setSaved] = useState(false);
const [programaDialogOpen,setProgramaDialogOpen] = useState(false);
const [dialogState, setDialogState] = useState({tipo: '', title:'', subtitle: ''});
const [paquete,setPaquete] = useState({});
const [datetime,setDatetime] = useState('');
const [clienttime,setClienttime] = useState(new Date().toString());



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

const handleDialogRec = () => {
  setDialogState({
    tipo: 'rec',
    title: 'Recolección',
    subtitle: 'Selecciona la fecha de recolección'
  })
  setProgramaDialogOpen(true);
}


const handleDialogClose = (props: any) => {
  if(props.confirm) {
    
    setProgramaDialogOpen(false)
  } else {
    //saveCobro(0);
    //setResetCobro(true);
    setProgramaDialogOpen(false)
  }
  
}







  return ( 
    <div className="px-2">
      <ProgramaDialog 
        isOpen={programaDialogOpen} 
        onClose={handleDialogClose} 
        tipo={dialogState.tipo}
        title={dialogState.title}
        subtitle={dialogState.subtitle}
        />
        <StepHeading title="Programación" subtitle="Selecciona las fechas y horarios de recolección y entrega" />
       
     <div className="my-4">
      Server: {datetime}
      </div>
      <div className="my-4">
      Client: {clienttime}
      </div>
      <div className="my-4" onClick={handleDialogRec}>
       Recoleccion
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