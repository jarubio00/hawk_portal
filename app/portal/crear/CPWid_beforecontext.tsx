'use client';

import { IconType } from "react-icons";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt,FaClock } from 'react-icons/fa'
import { MdNightlightRound, MdLocationOn, MdViewInAr } from 'react-icons/md'
import {BsFillBoxSeamFill} from 'react-icons/bs'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import RecoleccionStep from "./steps/Recoleccion";
import CrearNavbar from "./components/CrearNavbar";
import Button from '@/app/components/Button';
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";



interface CrearPedidoWidgetProps {
  title?: string;
  data?: any
}

const CrearPedidoWidget: React.FC<CrearPedidoWidgetProps> = ({ 
 title,
 data
}) => {

  
    const router = useRouter();
    const loader = useLoader();

    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [confirmSalirOpen, setConfirmSalirOpen] = useState(false);
    const dialogContent ={
      title: "Salir",
      notes: "Los avances no se guardarán",
      action: "Estas seguro de salir?",
      object: '',
      data: {},
      tipo: 'salir'
    }

    const handleConfirmSalir = async (props: any) => {
   
      if(props.confirm ) {
        loader.onOpen();
        setConfirmSalirOpen(false);
        router.push('/portal/adm/mispedidos');
        //loader.onClose();
      } else {
        setConfirmSalirOpen(false);
      }
    }

    useEffect(() => {
      if (activeStep == 0) {
        setIsFirstStep(true);
      } else {
        setIsFirstStep(false);
      }
      
      if (activeStep == 4) {
        setIsLastStep(true);
      } else {
        setIsLastStep(false);
      }
     
    }, [activeStep]);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const handleCloseCrear = () => {

    };

  return ( 
    <>
      <ConfirmDialog isOpen={confirmSalirOpen} onClose={handleConfirmSalir} dialogContent={dialogContent}/>
      <CrearNavbar  onClose={() => setConfirmSalirOpen(true)} />
      <div className="w-full md:w-3/4 py-4 px-1 md:px-8 mx-auto">
        <div className="mt-16 ">
          {activeStep == 0 && 
              <RecoleccionStep direcciones={data.direcciones}/>
          }
        </div>
        <div className=" my-4 ml-4 flex flex-row gap-6">
          <Button label="Anterior" onClick={handlePrev} disabled={isFirstStep} />
          <Button label="Siguiente" onClick={handleNext} disabled={isLastStep} />
        </div>
      </div>
    </>
   );
}
 
export default CrearPedidoWidget;