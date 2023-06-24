'use client';

import { useCallback, useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'
import esLocale from 'date-fns/locale/es';
import { getBloquesRecoleccion, getBloquesEntrega, autoPrograma } from "@/app/actions/apiQuerys";
import {addDays, format} from 'date-fns';
import { Radio } from "@material-tailwind/react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import Button from "@/app/components/Button";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import StepHeading from "../components/StepHeading";
import { serverDate } from "@/app/actions/apiQuerys";
import { ApiResponse, SafeUser } from "@/app/types";
import MuiDatePicker from "../components/MuiDatePicker";
import ProgramaTimer from '../components/ProgramaTimer';


interface ProgramacionStepProps {
  data?: any;
  currentUser?: SafeUser;
}

//se quito w-full , se agregp px-2
const ProgramacionStep: React.FC<ProgramacionStepProps> = ({ 
  data, 
  currentUser,
}) => {

const {updateActiveStep, 
        saveProgramaKey, 
        savePrograma, 
        saveRecoleccionState, 
        saveEntregaState, 
        recoleccionState, 
        entregaState,
        updateTipoPrograma, 
        tipoPrograma, 
        useTimer,
        pedido} = useContext(PedidoContext) as PedidoContextType;

useEffect(() => {
  if (tipoPrograma == 'auto') {
    console.log('auto selected');
    const autoDates = autoPrograma();
  }

},[tipoPrograma])


const router = useRouter();
const loader = useLoader();

const clientDate = new Date();

const [programarSection, setProgramarSection] = useState(false);


const serverDateFunction = useCallback(async () => {
  const res = await serverDate('now');

  //@ts-ignore
  const dateString = res.response?.data;

  if (dateString) {
    const date= new Date(dateString);
    setDatetime(date);
  }
  
}, [])

useEffect(() => {
 serverDateFunction();
},[serverDateFunction])


const [datetime,setDatetime] = useState(new Date());
const [bloqued, setBloqued] = useState([]);
const [isRecLoading, setIsRecLoading] = useState(false);
const [dpRecOpen, setDpRecOpen] = useState(false);
const [isEntLoading, setIsEntLoading] = useState(false);
const [dpEntOpen, setDpEntOpen] = useState(false);


const handleBack = () => {
  updateActiveStep(2)
}

const handleNext = () => {
  updateActiveStep(4);

  
}




const handleProgramaSection = (tipo: string) => {
  updateTipoPrograma(tipo);
  
}

const handleTimerOn = () => {
  const timeToClose = new Date();
  timeToClose.setSeconds(timeToClose.getSeconds() +15); // 10 minutes timer
  useTimer({isOpen: true, time: timeToClose})
}

const handleTimerOff = () => {
  useTimer({isOpen: false, time: null})
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

      {tipoPrograma == 'auto' ? 
      <div className="flex flex-row gap-8">
        <div className="my-4 cursor-pointer" onClick={handleTimerOn} >
         Timer On
        </div>
        <div className="my-4 cursor-pointer" onClick={handleTimerOff} >
         Timer Off
        </div>
      </div>
      
      : 

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
 
      setIsRecLoading(true);

      saveRecoleccionState({...recoleccionState,am: false, pm: false})
      saveEntregaState({...entregaState, am: false, pm: false , show: false, enabled: false})
      savePrograma({...pedido?.programa, fechaEntrega: null, bloqueEntrega: 3,bloqueRecoleccion: 3, fechaRecoleccion: e});
     
      const fechaString = format(e, `yyyy-MM-dd`);
      const res:ApiResponse = await getBloquesRecoleccion(fechaString);
      
      if (res.status == 1) {
          if(res.response?.data) {
            saveRecoleccionState({...recoleccionState, ...res.response.data})
            const timer = setTimeout(() => {
              setIsRecLoading(false);
            }, 500);
      } else {
        toast.error(res.response?.error);
        const timer = setTimeout(() => {
          setIsRecLoading(false);
        }, 500);
      }

      }
    };
    
    const handleBloqueChange = async  (b: number) => {
     savePrograma({...pedido?.programa, fechaEntrega: null, bloqueEntrega: 3, bloqueRecoleccion: b});
     handleTimerOn();

        if (b == 2 ){
          const entStartDate = addDays(pedido?.programa?.fechaRecoleccion,1);
          saveEntregaState({...entregaState, am: false, pm: false, show: false, enabled: true, startDate: entStartDate})
        } else {
          saveEntregaState({...entregaState, am: false, pm: false, show: false, enabled: true, startDate: pedido?.programa?.fechaRecoleccion})
        }
    }

    return (

      <div className="my-4 border border-neutral-300 shadow-md rounded-lg p-2 px-2 md:px-6">
        <div className="flex flex-col">
          <p className="text-md font-bold">Recolección</p>
          <p className="text-xs text-neutral-500">Selecciona la fecha y horario de recolección</p>
          <div className="mt-2 md:mt-4">
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
              <MuiDatePicker 
                dpOpen={dpRecOpen}
                setDpOpen={(val) => setDpRecOpen(val)}
                value={pedido?.programa?.fechaRecoleccion}
                onChange={(newValue) => handleDateChange(newValue)}
                bloqued={data.bloquedRec}
                datetime={datetime}
                
              />
          </LocalizationProvider>
          </div>
          {isRecLoading ? <div className="mt-2 mx-4">
            <PulseLoader
              //@ts-ignore
              size={10}
              color="#F43F5E"
              />
          </div>
          :
          <div className="mt-2 p-3 flex flex-col">
            {(recoleccionState?.am || pedido?.programa?.bloqueRecoleccion == 1) && <Radio 
              id="RecAm" 
              value={1} 
              name="recoleccion" 
              label={<p className="text-sm font-semibold">10:00am - 3:00pm</p>}
              onChange={(event) => handleBloqueChange(parseInt(event.target.value))}
              defaultChecked={pedido?.programa?.bloqueRecoleccion == 1}
            />}
           { (recoleccionState?.pm || pedido?.programa?.bloqueRecoleccion == 2) && <Radio 
              id="RecPm" 
              value={2} 
              name="recoleccion" 
              label={<p className="text-sm font-semibold">3:30pm  - 7:00pm</p>}
              onChange={(event) => handleBloqueChange(parseInt(event.target.value))}
              defaultChecked={pedido?.programa?.bloqueRecoleccion == 2}
            />}

             { (!recoleccionState?.am && !recoleccionState?.pm && pedido?.programa?.bloqueRecoleccion == 3 ) && <div className="text-sm">
                No hay horarios disponibles
              </div>}

          </div>}


        </div>
        
        
      </div>
    );
   }

   function ProgramarEntrega() {
    
    const handleDateChange = async  (e: any) => {
      //setBloquesEntShow(true);

      console.log('fecha rec: ', pedido?.programa?.fechaRecoleccion.toISOString().slice(0, 10));
      console.log('fehcaServer: ', e.toISOString().slice(0, 10));
      if (pedido?.programa?.fechaRecoleccion.toISOString().slice(0, 10) == e.toISOString().slice(0, 10)) {console.log('match')}

      saveEntregaState({...entregaState, show: true})
      setIsEntLoading(true);
      savePrograma({...pedido?.programa,bloqueEntrega: 3, fechaEntrega: e});
     
      const fechaString = format(e, `yyyy-MM-dd`);
      const res:ApiResponse = await getBloquesEntrega(fechaString);
      
      if (res.status == 1) {
          if(res.response?.data) {
            let bloques = res.response.data;
            const fechaRec = pedido?.programa?.fechaRecoleccion.toISOString().slice(0, 10);
            const fechaSel = e.toISOString().slice(0, 10);
            const bloqueRec = pedido?.programa?.bloqueRecoleccion;

            if (fechaRec == fechaSel && bloqueRec == 1) {
              bloques = {...bloques, am: false}
            } else if ( fechaRec == fechaSel && bloqueRec == 2) {
              bloques = {...bloques, am: false, pm: false}
              
            }



            saveEntregaState({...entregaState, ...bloques})
            
            const timer = setTimeout(() => {
              setIsEntLoading(false);
            }, 500);
      } else {
        toast.error(res.response?.error);
        const timer = setTimeout(() => {
          setIsEntLoading(false);
        }, 500);
      }

      }
    };
    
    const handleBloqueChange = async  (b: number) => {
      saveProgramaKey('bloqueEntrega', b);
    }

    return (

      <div className="my-4 border border-neutral-300 shadow-md rounded-lg p-2 px-2 md:px-6">
        <div className="flex flex-col">
          <p className="text-md font-bold">Entrega</p>
          <p className="text-xs text-neutral-500">Selecciona la fecha y horario de entrega</p>
          <div className="mt-2 md:mt-4">
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
              <MuiDatePicker 
                dpOpen={dpEntOpen}
                setDpOpen={(val) => setDpEntOpen(val)}
                value={pedido?.programa?.fechaEntrega}
                onChange={(newValue) => handleDateChange(newValue)}
                bloqued={data.bloquedEnt}
                datetime={datetime}
                startDate={entregaState?.startDate}
                disabled={!entregaState?.enabled}
              />
          </LocalizationProvider>
          </div>
          {isEntLoading ? <div className="mt-2 mx-4">
            <PulseLoader
              //@ts-ignore
              size={10}
              color="#F43F5E"
              />
          </div>
          :
          <div className="mt-2 p-3 flex flex-col">
            {(entregaState?.am || pedido?.programa?.bloqueEntrega == 1) && <Radio 
              id="EntAm" 
              value={1} 
              name="entrega" 
              label={<p className="text-sm font-semibold">10:00am - 3:00pm</p>}
              onChange={(event) => handleBloqueChange(parseInt(event.target.value))}
              defaultChecked={pedido?.programa?.bloqueEntrega == 1}
            />}
           { (entregaState?.pm || pedido?.programa?.bloqueEntrega == 2) && <Radio 
              id="EntPm" 
              value={2} 
              name="entrega" 
              label={<p className="text-sm font-semibold">3:30pm  - 7:00pm</p>}
              onChange={(event) => handleBloqueChange(parseInt(event.target.value))}
              defaultChecked={pedido?.programa?.bloqueEntrega == 2}
            />}
            {!entregaState?.show ? 

              <div></div> :

              (!entregaState?.am && !entregaState?.pm && pedido?.programa?.bloqueEntrega == 3 ) && <div className="text-sm">
                No hay horarios disponibles
              </div>

              }  
            

          </div>}


        </div>
        
        
      </div>
    );
   }


}



 
export default ProgramacionStep;