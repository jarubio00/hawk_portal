'use client';

import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import ClientOnly from "@/app/components/ClientOnly";
import PageHeader from "@/app/components/portal/PageHeader";
import { MisPedidosContext, MisPedidosContextType } from "./context/MisPedidosContext";
import {
    BsFillBoxSeamFill
    } from 'react-icons/bs'
import { FaPlus, FaTimes } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import DashSection from './components/DashSection';
import TabSection from './components/TabSection';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { SafeCobro, SafePedido } from '@/app/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import EnvioView from './components/tabs/components/EnvioView';
import {GrClose} from 'react-icons/gr';
import RecoleccionesSection from './components/RecoleccionesSection';
import CobroView from './components/tabs/components/CobroView';

const PedidosClient  = (props:any) => {
  const router = useRouter();
  const loader = useLoader();
  //const {saveRecolecciones, savePedidos} = useContext(MisPedidosContext) as MisPedidosContextType;

  const [isLoading,setIsLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [subtitle, setSubtitle] = useState('Consulta tus envios realizados')
  const [drawerPedido, setDrawerPedido] = useState<SafePedido>()
  const [drawerCobro, setDrawerCobro] = useState<SafeCobro>()
  const [sheetOpen, setSheetOpen] = useState(false);
  //saveRecolecciones(props.data.recolecciones);
 
  //savePedidos(props.data.pedidos);

  useEffect(() => {
    loader.isOpen && loader.onClose();
    }, []) 

  const onButtonClick = () => {
   
    if (!adding) {
      setAdding(true);
      setSubtitle('Programa un envío');
    } else {
      setAdding(false);
      setSubtitle('Administra tus envíos');
    }
  }

  const toggleAdding = (action: string) => {
    if(action == 'open') {
      setAdding(true);
    } else {
      setAdding(false);
    }

  }

  const handleDrawerPedido = (open: boolean, p: SafePedido) => {
    setDrawerPedido(p);
    setDrawerCobro(undefined);
    setSheetOpen(true);
  }

  const handleDrawerCobro = (open: boolean, c: SafeCobro) => {
    setDrawerPedido(undefined);
    setDrawerCobro(c);
    setSheetOpen(true);
  }

 
  return (
    <ClientOnly>
        <Drawer
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            direction='bottom'
            style={{height: '90%', width: '100%', overflowY: 'scroll'}}
            lockBackgroundScroll

            >
              <div className='flex w-full '>
                  <div className='flex flex-col w-full relative'>
                    <div className='absolute top-5 left-4 ' onClick={() => setSheetOpen(false)}>
                      <GrClose size={18}/>
                    </div>
                    <div className="flex flex-col w-full">
                
                      {drawerPedido && <EnvioView data={drawerPedido} />}
                      {drawerCobro && <CobroView data={drawerCobro} />}
                    </div>
                  </div>
              </div>
        </Drawer>
        <div className='flex flex-col gap-4 z-40'>
          <PageHeader
            title="Mis envíos"
            subtitle={subtitle}
            icon={BsFillBoxSeamFill}
            buttonIcon={FaPlus}
            buttonAction={onButtonClick}
            cancelIcon={FaTimes}
            cancelAction={onButtonClick}
            adding={adding}
            disabled = {false}
            noButton
          />
          {/* <DashSection /> */}
          {/* <RecoleccionesSection /> */}
          <TabSection onView={handleDrawerPedido} onCobroView={handleDrawerCobro}/>
        </div>
    
          
    </ClientOnly>
  )
  }


  
export default PedidosClient;