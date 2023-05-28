'use client';

import Button from "@/app/components/Button";
import PortalLayout from "@/app/components/portal/PortalLayout";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import PageHeader from "@/app/components/portal/PageHeader";

import { BiSearch } from "react-icons/bi";
import { FaPlus, FaTimes } from "react-icons/fa";
import Input from "@/app/components/inputs/Input";
import { useState } from "react";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";


const MisdireccionesClient  = (data: any) => {
  const router = useRouter();
  const loader = useLoader()

  const [isLoading,setIsLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [subtitle, setSubtitle] = useState('Administra tus direcciones de recolección')


  console.log(data);

  const onSubmit = (direccion: any) => { 
   
    loader.onOpen();

    axios.post('/api/direcciones', direccion)
    .then(() => {
      toast.success('Dirección creada!');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error.message);
    })
    .finally(() => {
      loader.onClose();
    })
  }

  const onButtonClick = () => {
   

    if (!adding) {
      setAdding(true);
      setSubtitle('Agrega una dirección de recolección');
    } else {
      setAdding(false);
      setSubtitle('Administra tus direcciones de recolección');
    }
  }


    return (
      <ClientOnly>
        <PortalLayout>
            <PageHeader 
              title="Mis direcciones"
              subtitle={subtitle}
              icon={BiSearch}
              buttonIcon={FaPlus}
              buttonAction={onButtonClick}
              cancelIcon={FaTimes}
              cancelAction={onButtonClick}
              adding={adding}
              disabled = {false}
            />
            {/* <Button 
                    outline
                    small
                    label="Crear dire"
                    onClick={() => onSubmit(direccion)}
                    /> */}
            {adding && <div className="m-4 flex flex-col bg-gray-200 ">
              <div className="p-2"  >
                <AgregarDireccion title="Agrega una dirección de recolección" />
              </div>
            </div>}

            
        
        </PortalLayout>
      </ClientOnly>
    )
  }

  const direccion = {
    clienteId : 1, 
    nombreDireccion: "Casa 2", 
    contactoNombre: "Catalinas Rubio", 
    contactoTel: "81159951945", 
    cpId: 64851, 
    calle: "Vascongadas", 
    numero: "3505", 
    numeroInt: "", 
    colonia: "Torremolinos", 
    municipioId: 1, 
    empresa: "Xinet Solutions", 
    referencias: "Entre revolición y parsimonios"  
  }
  
export default MisdireccionesClient;