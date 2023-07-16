'use client';

import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import ClientOnly from "@/app/components/ClientOnly";
import PageHeader from "@/app/components/portal/PageHeader";

import {
    BsFillBoxSeamFill
    } from 'react-icons/bs'
import { FaPlus, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SafeDireccion,SafeDestino, SafeUser, SafePaquete} from "@/app/types";
import DireccionesCard from "@/app/components/portal/DireccionesCard";
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";
import toast from "react-hot-toast";
import DashSection from './components/DashSection';
import TabSection from './components/TabSection';


const PedidosClient  = (props:any) => {
  const router = useRouter();
  const loader = useLoader();
  

  const [isLoading,setIsLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [subtitle, setSubtitle] = useState('Consulta tus envios realizados')
  const [confirmDialogOpen,setConfirmDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [editing,setEditing] = useState(false);
  const [editData,setEditData] = useState({});
  const [paquetes,setPaquetes] = useState(props?.data);


  useEffect(() => {
    console.log(props.data)
    setPaquetes(props.data);
    }, [props]) 

  useEffect(() => {
    loader.isOpen && loader.onClose;
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

 
  return (
    <ClientOnly>
      <div className='flex flex-col gap-4'>
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
        />
        <DashSection />
        <TabSection />
      </div>
          
    </ClientOnly>
  )
  }


  
export default PedidosClient;