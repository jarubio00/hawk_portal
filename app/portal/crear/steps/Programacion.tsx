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
import { getBloquesRecoleccion } from "@/app/actions/apiQuerys";
import {format, isDate} from 'date-fns';
import { Radio } from "@material-tailwind/react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import Button from "@/app/components/Button";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import StepHeading from "../components/StepHeading";
import { serverDate } from "@/app/actions/apiQuerys";
import AgregarDestinoCrear from "../components/AgregarDestinoCrear";
import { ApiResponse, SafeUser } from "@/app/types";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import AgregarDestinoSinCp from "../components/AgregarDestinoSinCp";
import { TiArrowBack } from "react-icons/ti";
import AgregarPaqueteCrear from "../components/AgregarPaqueteCrear";
import Datepicker from "../components/Datepicker";
import ProgramaDialog from "../components/dialogs/ProgramaDialog";
import MuiDatePicker from "../components/MuiDatePicker";








interface ProgramacionStepProps {
  title?: string;
  currentUser?: SafeUser;
}

//se quito w-full , se agregp px-2
const ProgramacionStep: React.FC<ProgramacionStepProps> = ({ 
  title, 
  currentUser,
}) => {

const {updateActiveStep , saveProgramaKey, updateTipoPrograma, tipoPrograma, pedido} = useContext(PedidoContext) as PedidoContextType;
const router = useRouter();
const loader = useLoader();

const clientDate = new Date();

const [programarSection, setProgramarSection] = useState(false);


const serverDateFunction = useCallback(async () => {
  const res = await serverDate('now');

  //@ts-ignore
  const dateString = res.response?.data;

  if (dateString) {
    console.log(dateString);
    const date= new Date(dateString);
    console.log(date.getHours());
    console.log(format(date,`yyyy-MM-dd`))
    setDatetime(date);
  }
  

}, [])

useEffect(() => {
 serverDateFunction();
},[serverDateFunction])

const [saved,setSaved] = useState(false);
const [programaDialogOpen,setProgramaDialogOpen] = useState(false);
const [dialogState, setDialogState] = useState({tipo: '', title:'', subtitle: ''});
const [paquete,setPaquete] = useState({});
const [datetime,setDatetime] = useState(new Date());
const [clienttime,setClienttime] = useState(new Date().toString());
const [fechaRecoleccionSelected,setfechaRecoleccionSelected] = useState(null);
const [fechaEntregaSelected,setfechaEntregaSelected] = useState(null);
const [bloqued, setBloqued] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [dpOpen, setDpOpen] = useState(false);
const [bloquesDisponibles, setBloquesDisponibles] = useState({am: false, pm: false});


const handleBack = () => {
  updateActiveStep(2)
}

const handleNext = () => {
  updateActiveStep(4);

  
}

const handleDialogRec = () => {
  setDialogState({
    tipo: 'rec',
    title: 'Recolección',
    subtitle: 'Selecciona la fecha de recolección'
  })
  setProgramaDialogOpen(true);
}


const handleProgramaSection = (tipo: string) => {
  updateTipoPrograma(tipo);
  
}

const disableWeekends = (date: any) => {
console.log(date.toISOString().slice(0, 10))
  let bMatched = false;
   if(date.getDay() === 0) {
       return true;
   } else {
       bloqued.map((val: any) => { 
           if (val == date.toISOString().slice(0, 10)) {
              bMatched = true;
           }
       });
      if (isDate(datetime) && format(datetime,`yyyy-MM-dd`) == date.toISOString().slice(0, 10)) {
        if (datetime.getHours() >= 15 ) {
          return true;
        } 
      }
   }  
   return bMatched;
 }

  return ( 
    <div className="px-2">
        <StepHeading title="Programación" subtitle="Selecciona las fechas y horarios de recolección y entrega" />
       
      <div className="my-8 flex flex-row items-center gap-4">
        <div className={`w-44 md:w-60 border-2 bg-rose-500 border-rose-500 text-sm md:text-base
                  shadow-md rounded-md py-1 px-2 cursor-pointer
          ${tipoPrograma == 'auto' ? 
            'bg-rose-500 text-white border-rose-500' 
            : 'bg-white  border-neutral-800'}
             `}
        onClick={() => handleProgramaSection('auto')}
         >
          <p className=" text-center">Lo antes posible</p>
        </div>
        <div className={`border-2 w-44 md:w-60  text-sm md:text-base
          shadow-md rounded-md py-1 px-2 cursor-pointer
          ${tipoPrograma == 'custom' ? 
            'bg-rose-500 text-white border-rose-500' 
            : 'bg-white  border-neutral-800'}
    `}
        onClick={() => handleProgramaSection('custom')}
        >
          <p className=" text-center">Seleccionar fechas</p>
        </div>
      </div>
      {tipoPrograma == 'auto' ? <div className="my-4" onClick={handleDialogRec}>
       Recoleccion
      </div> : 

      <div className="grid mx-4 md:mx-2 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
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

    
    
    const handleDateChange = async  (e: any) => {
      saveProgramaKey('bloqueRecoleccion', 3);
      
      setIsLoading(true);
      setfechaRecoleccionSelected(e);
     
      const timer = setTimeout(() => {
        saveProgramaKey('fechaRecoleccion', e);
      }, 500);
      
      
      
      const fechaString = format(e, `yyyy-MM-dd`);
      const res:ApiResponse = await getBloquesRecoleccion(fechaString);
      
      if (res.status == 1) {
          if(res.response?.data) {
            setBloquesDisponibles(res.response.data);
            const timer = setTimeout(() => {
              setIsLoading(false);
            }, 500);
      } else {
        toast.error(res.response?.error);
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }

      }
    };
    
    const handleBloqueChange = async  (b: number) => {
      saveProgramaKey('bloqueRecoleccion', b);
    }

    return (

      <div className="my-4 border border-neutral-300 shadow-md rounded-lg p-2 px-2 md:px-6">
        <div className="flex flex-col">
          <p className="text-md font-bold">Recolección</p>
          <p className="text-xs text-neutral-500">Selecciona la fecha de recolección</p>
          <div className="mt-2 md:mt-4">
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
             {/*  <DesktopDatePicker
              //@ts-ignore
                  inputFormat="dd/MM/yyyy"
                  open={dpOpen}
                  onOpen={() => setDpOpen(true)}
                  onClose={() => setDpOpen(false)}
                  disablePast
                  slots={{ field: ButtonField, ...props.slots }}
                  slotProps={{ field: { setOpen } as any }}
                  inputProps={{placeholder :'Selecciona la fecha', readOnly: true}}
                  value={fechaRecoleccionSelected}
                  closeOnSelect
                  onChange={(newValue) => {handleDateChange(newValue)}}
                  shouldDisableDate={disableWeekends}
              /> */}

              <MuiDatePicker 
                dpOpen={dpOpen}
                setDpOpen={(val) => setDpOpen(val)}
                value={pedido?.programa?.fechaRecoleccion}
                onChange={(newValue) => handleDateChange(newValue)}
                bloqued={bloqued}
                datetime={datetime}
              />
                
          </LocalizationProvider>
          </div>
          {pedido?.programa?.bloqueRecoleccion}
          {isLoading ? <div className="mt-2 mx-4">
            <PulseLoader
              //@ts-ignore
              size={10}
              color="#F43F5E"
              />
          </div>
          :
          <div className="mt-2 p-3 flex flex-col">
            {(bloquesDisponibles.am || pedido?.programa?.bloqueRecoleccion == 1) && <Radio 
              id="am" 
              value={1} 
              name="type" 
              label={<p className="text-sm font-semibold">10:00am - 3:00pm</p>}
              onChange={(event) => handleBloqueChange(parseInt(event.target.value))}
              defaultChecked={pedido?.programa?.bloqueRecoleccion == 1}
            />}
           { (bloquesDisponibles.pm || pedido?.programa?.bloqueRecoleccion == 2) && <Radio 
              id="pm" 
              value={2} 
              name="type" 
              label={<p className="text-sm font-semibold">3:30pm  - 7:00pm</p>}
              onChange={(event) => handleBloqueChange(parseInt(event.target.value))}
              defaultChecked={pedido?.programa?.bloqueRecoleccion == 2}
            />}

             { (!bloquesDisponibles.am && !bloquesDisponibles.pm && pedido?.programa?.bloqueRecoleccion == 3 ) && <div className="text-sm">
                No hay horarios disponibles
              </div>}

          </div>}


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