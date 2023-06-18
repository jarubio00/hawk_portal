'use client';

import { useCallback, useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import getServerDate from "@/app/actions/getServerDate";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import esLocale from 'date-fns/locale/es';
import {TextField} from '@mui/material';
import { getBloques } from "@/app/actions/apiQuerys";
import {format} from 'date-fns';

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

const [programarSection, setProgramarSection] = useState(false);


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
const [fechaRecoleccionSelected,setfechaRecoleccionSelected] = useState(null);
const [fechaEntregaSelected,setfechaEntregaSelected] = useState(null);
const [bloqued, setBloqued] = useState([]);


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

const disableWeekends = (date: any) => {
  let bMatched = false;
   if(date.getDay() === 0) {
       return true;
   } else {
       bloqued.map((val: any) => {
           
           if (val == date.toISOString().slice(0, 10)) {
              bMatched = true;
           
           }
       });
   }
   return bMatched;
 }

  return ( 
    <div className="px-2">
        <StepHeading title="Programación" subtitle="Selecciona las fechas y horarios de recolección y entrega" />
       
      <div className="my-8 flex flex-row items-center gap-4">
        <div className={`w-44 md:w-60 border-2 bg-rose-500 border-rose-500 text-sm md:text-base
                  shadow-md rounded-md py-1 px-2 cursor-pointer
          ${!programarSection ? 
            'bg-rose-500 text-white border-rose-500' 
            : 'bg-white  border-neutral-800'}
             `}
        onClick={() => setProgramarSection(false)}
         >
          <p className=" text-center">Lo antes posible</p>
        </div>
        <div className={`border-2 w-44 md:w-60  text-sm md:text-base
          shadow-md rounded-md py-1 px-2 cursor-pointer
          ${programarSection ? 
            'bg-rose-500 text-white border-rose-500' 
            : 'bg-white  border-neutral-800'}
    `}
        onClick={() => setProgramarSection(true)}
        >
          <p className=" text-center">Seleccionar fechas</p>
        </div>
      </div>
      {!programarSection ? <div className="my-4" onClick={handleDialogRec}>
       Recoleccion
      </div> : 

      <div className="grid mx-10 md:mx-2 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
        <ProgramarRecoleccion />
        <ProgramarEntrega />
       
      </div>
      
      }

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

   function ProgramarRecoleccion() {
    const [dpOpen, setDpOpen] = useState(false);

    const handleDateChange = (e: any) => {
      const fechaString = format(e, `yyyy-MM-dd`);
      const res = getBloques(fechaString);
};

    return (

      <div className="my-4 border border-neutral-300 shadow-md rounded-lg p-4 px-6">
        <div className="flex flex-col">
        <p className="text-lg font-bold">Recolección</p>
        <p className="text-sm text-neutral-500">Selecciona la fecha de recolección</p>
        <div className="mt-2">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <DesktopDatePicker
            //@ts-ignore
                inputFormat="dd/MM/yyyy"
                open={dpOpen}
                onOpen={() => setDpOpen(true)}
                onClose={() => setDpOpen(false)}
                disablePast
                slotProps={{textField: {variant: 'outlined'}}}
                inputProps={{placeholder :'Selecciona la fecha', readOnly: true}}
                value={fechaRecoleccionSelected}
                closeOnSelect
                onChange={(newValue) => {handleDateChange(newValue)}}
                shouldDisableDate={disableWeekends}
            />
        </LocalizationProvider>
        </div>


        </div>
        
        
      </div>
    );
   }

   function ProgramarEntrega() {
    const [dpOpen, setDpOpen] = useState(false);
  
    const handleDateChange = (e: any) => {
  ;
  };
  
    return (
  
      <div className="my-4 border border-neutral-300 shadow-md rounded-lg p-4 px-6">
        <div className="flex flex-col">
        <p className="text-lg font-bold">Entrega</p>
        <p className="text-sm text-neutral-500">Selecciona la fecha de entrega</p>
        <div className="mt-2">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <DesktopDatePicker
            //@ts-ignore
                inputFormat="dd/MM/yyyy"
                open={dpOpen}
                onOpen={() => setDpOpen(true)}
                onClose={() => setDpOpen(false)}
                disablePast
                renderInput={(props: any) => <TextField  fullWidth {...props} onClick={(e) => setDpOpen(true)} />}
                inputProps={{placeholder :'Selecciona la fecha', readOnly: true}}
                value={fechaEntregaSelected}
                closeOnSelect
                onChange={(newValue) => {handleDateChange(newValue)}}
                shouldDisableDate={disableWeekends}
            />
        </LocalizationProvider>
        </div>
  
  
        </div>
        
        
      </div>
    );
   }


}



 
export default ProgramacionStep;