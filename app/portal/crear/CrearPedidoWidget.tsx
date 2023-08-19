'use client';

import { IconType } from "react-icons";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt,FaClock } from 'react-icons/fa'
import { MdNightlightRound, MdLocationOn, MdViewInAr } from 'react-icons/md'
import {BsFillBoxSeamFill} from 'react-icons/bs'
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import RecoleccionStep from "./steps/Recoleccion";
import CrearNavbar from "./components/CrearNavbar";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";
import {PedidoContext,} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType, IDrawer} from "@/app/types/pedido"
import ConfirmarStep from "./steps/Confirmar";
import UtilDrawer from "./components/UtilDrawer"
import { SafeUser } from "@/app/types";
import DireccionDrawer from "./components/DireccionDrawer";
import DestinoStep from "./steps/Destino";
import DestinoDrawer from "./components/DestinoDrawer";
import PaqueteStep from "./steps/Paquete";
import PaqueteDrawer from "./components/PaqueteDrawer";
import ProgramacionStep from "./steps/Programacion";
import ProgramaTimer from "./components/ProgramaTimer";
import TimerDialog from "@/app/components/modals/TimerDialog";
import CreandoPedidoModal from "@/app/portal/crear/components/CreandoPedidoModal";
import { bloqueToString, namedDateString } from "@/app/components/utils/helpers";
import { calcularTipoPaquete } from "@/app/actions/utils";


interface CrearPedidoWidgetProps {
  title?: string;
  data?: any
  sm?: boolean;
  currentUser?: SafeUser;
  append?: boolean;
  recoleccion?: any;
}

const CrearPedidoWidget: React.FC<CrearPedidoWidgetProps> = ({ 
 title,
 data,
 sm,
 currentUser,
 append = false,
 recoleccion
}) => {

    //console.log('isSm:', data.direcciones);
    const router = useRouter();
    const loader = useLoader();
    const {activeStep, 
      drawer, 
      timer, 
      useTimer, 
      saveRecoleccionState, 
      saveEntregaState, 
      savePrograma, 
      updateActiveStep, 
      saveAppend,
      saveRecoleccion,
      pedido,
      savePedidoInitial,
      tipoPrograma
      } = useContext(PedidoContext) as PedidoContextType;

    const [confirmSalirOpen, setConfirmSalirOpen] = useState(false);
    const [timerConfirmOpen, setTimerConfirmOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerContent, setDrawerContent] = useState();

    //console.log(append);
    //console.log(recoleccion);
    useEffect(() => {
      loader.isOpen && loader.onClose();
      }, []) 


    const dialogContent ={
      title: "Estas seguro de salir?",
      notes: "Los avances no se guardarán",
      tipo: 'salir'
    }

    const handleConfirmSalir = async (props: any) => {
   
      if(props.confirm ) {
        loader.onOpen();
        setConfirmSalirOpen(false);
        router.push('/portal/adm/mispedidos')
        //loader.onClose();
      } else {
        setConfirmSalirOpen(false);
      }
    }

    useEffect(() => {
      if(append && recoleccion) {

        const appendInital = {enabled: true,recoleccion: recoleccion}
        const programaInitial = {fechaRecoleccion: recoleccion.fecha,bloqueRecoleccion: recoleccion.bloque,fechaEntrega: null,bloqueEntrega: 3 }
        const recoleccionInitial = recoleccion

        savePedidoInitial(
          appendInital,
          programaInitial,
          recoleccionInitial
        );

        saveRecoleccionState({
          am: true, 
          pm: true,
          show: true, enabled: true
        })

        updateActiveStep(1);
      }
    },[append])

    const handleDrawerComponent = (tipo: string | undefined) => {

        if(tipo == 'addDireccion') {
          return (
            <DireccionDrawer currentUser={currentUser}/>
          )
        } 
        if(tipo == 'destinos') {
          return (
            <DestinoDrawer currentUser={currentUser} destinos={data.destinos}/>
          )
        } 
        if(tipo == 'paquetes') {
          return (
            <PaqueteDrawer currentUser={currentUser} paquetesList={data.paquetes}/>
          )
        } 
    }
    
    const timeToClose = new Date();
    timeToClose.setSeconds(timeToClose.getSeconds() + 10); // 10 minutes timer


    const handleOnExpireTimer = () => {
      console.log('expired......................')
      useTimer({isOpen: false, time: null})
      setTimerConfirmOpen(true);
    };

    const handleOnCloseTimerConfirm = () => {
      setTimerConfirmOpen(false);
      updateActiveStep(3);
      saveRecoleccionState({})
      saveEntregaState({});
      savePrograma({})
    }


  return ( 
    <>
      <ConfirmDialog isOpen={confirmSalirOpen} onClose={handleConfirmSalir} dialogContent={dialogContent}/>
      <TimerDialog isOpen={timerConfirmOpen} onClose={handleOnCloseTimerConfirm} />
      <UtilDrawer props={drawer} onClose={() => setOpenDrawer(false)} size={sm ? 700 : 1050}  content={handleDrawerComponent(drawer?.tipo)}/>
      <CreandoPedidoModal />
      {timer?.time && <ProgramaTimer expiryTimestamp={timer?.time} onExpire={handleOnExpireTimer} isOpen={timer?.isOpen}/>}
      <CrearNavbar  onClose={() => setConfirmSalirOpen(true)} />
        {append && <div className=" pt-16 bg-neutral-800 w-full">
          <div className="w-full md:w-3/4 py-2 px-1 md:px-8 mx-auto">
              <p className="text-sm text-white ">Agregando pedido a recolección en {recoleccion.calle} {recoleccion.numero}</p>
              <p className="text-xs text-white">{namedDateString(recoleccion.fecha)} ({bloqueToString(recoleccion.bloque)})</p>
          </div>
        </div>}
      <div className="w-full md:w-3/4 py-4 px-1 md:px-8 mx-auto">
      
        <div className={`${append ? 'pt-0' : 'pt-16'}`}>
       
          {activeStep === 0 && 
              <RecoleccionStep direcciones={data.direcciones} append={append} recoleccion={recoleccion}/>
          }
          {activeStep === 1 && 
              <DestinoStep municipios={data.municipios}/>
          }
          {activeStep === 2 && 
              <PaqueteStep />
          }
           {activeStep === 3 && 
              <ProgramacionStep data={data.bloquedDates} append={append} recoleccion={recoleccion}/>
          }
          {activeStep === 4 && 
              <ConfirmarStep append={append} recoleccion={recoleccion}/>
          }
        </div>
          <div className="my-4 w-full block md:hidden">
            <Button 
              onClick={() => setConfirmSalirOpen(true)} 
              className="mt-4 gap-3 py-1 px-4 bg-red-500 hover:bg-red-500/80 w-full ">
              Cancelar envío
            </Button>
          </div>
      </div>
    </>
   );
}
 
export default CrearPedidoWidget;