'use client';


import PortalLayout from "@/app/components/portal/PortalLayout";

import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import ClientOnly from "@/app/components/ClientOnly";
import PageHeader from "@/app/components/portal/PageHeader";

import {
    BsFillBoxSeamFill
    } from 'react-icons/bs'
import { FaPlus, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import AgregarPaquete from "@/app/components/portal/AgregarPaquete";
import { SafeDireccion,SafeDestino, SafeUser, SafePaquete} from "@/app/types";
import DireccionesCard from "@/app/components/portal/DireccionesCard";
import { deleteDireccion, deletePaquete, markDireccion, updateDireccion, updatePaquete } from "@/app/actions/apiQuerys";
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";
import toast from "react-hot-toast";
import EditarDireccion from "@/app/components/portal/EditarDireccion";
import ListSearch from "@/app/components/ListSearch";
import PaquetesCard from "@/app/components/portal/PaquetesCard";
import EditarPaquete from "@/app/components/portal/EditarPaquete";


const PedidosClient  = (props:any) => {
  const router = useRouter();
  const loader = useLoader();
  

  const [isLoading,setIsLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [subtitle, setSubtitle] = useState('Administra tus paquetes favoritos')
  const [confirmDialogOpen,setConfirmDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [editing,setEditing] = useState(false);
  const [editData,setEditData] = useState({});
  const [paquetes,setPaquetes] = useState(props?.data);


  useEffect(() => {
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

        <PortalLayout>
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
         
         
           

            
        
        </PortalLayout>
      </ClientOnly>
    )
  }


  
export default PedidosClient;