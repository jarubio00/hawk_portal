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
import Button from '@/app/components/Button';
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
import CreandoPedidoModal from "@/app/components/modals/CreandoPedidoModal";


interface CrearPedidoWidgetProps {
  title?: string;
  data?: any
  sm?: boolean;
  currentUser?: SafeUser;
}

const CrearPedidoWidget: React.FC<CrearPedidoWidgetProps> = ({ 
 title,
 data,
 sm,
 currentUser
}) => {

    //console.log('isSm:', sm);
    const router = useRouter();
    const loader = useLoader();
    const {activeStep, drawer, timer, useTimer, saveRecoleccionState, saveEntregaState, savePrograma, updateActiveStep} = useContext(PedidoContext) as PedidoContextType;
    const [confirmSalirOpen, setConfirmSalirOpen] = useState(false);
    const [timerConfirmOpen, setTimerConfirmOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerContent, setDrawerContent] = useState();

    const dialogContent ={
      title: "Estas seguro de salir?",
      notes: "Los avances no se guardarán",
      tipo: 'salir'
    }

    const handleConfirmSalir = async (props: any) => {
   
      if(props.confirm ) {
        //loader.onOpen();
        setConfirmSalirOpen(false);
        router.push('/portal/adm/mispedidos');
        //loader.onClose();
      } else {
        setConfirmSalirOpen(false);
      }
    }

    useEffect(() => {
      if(drawer?.tipo == 'addDireccion') {
       
      }
    },[drawer])

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

    const handleCloseCrear = () => {

    };

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
      <div className="w-full md:w-3/4 py-4 px-1 md:px-8 mx-auto">
        <div className="mt-16 ">
          {activeStep === 0 && 
              <RecoleccionStep direcciones={data.direcciones}/>
          }
          {activeStep === 1 && 
              <DestinoStep municipios={data.municipios}/>
          }
          {activeStep === 2 && 
              <PaqueteStep />
          }
           {activeStep === 3 && 
              <ProgramacionStep data={data.bloquedDates} />
          }
          {activeStep === 4 && 
              <ConfirmarStep />
          }
        </div>
        {/* <Button label="Drawer" outline onClick={() => setOpenDrawer(true)}/> */}
      </div>
    </>
   );
}
 
export default CrearPedidoWidget;