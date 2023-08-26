'use client';


import PortalLayout from "@/app/components/portal/PortalLayout";

import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import ClientOnly from "@/app/components/ClientOnly";
import PageHeader from "@/app/components/portal/PageHeader";
import { FaPlus, FaTimes, FaHome, FaUser, FaLock } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { SafeDireccion,SafeDestino, SafeUser} from "@/app/types";
import DireccionesCard from "@/app/components/portal/DireccionesCard";
import { addDestino, addDireccion, deleteDireccion, markDireccion, updateDireccion } from "@/app/actions/apiQuerys";
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";
import toast from "react-hot-toast";
import EditarDireccion from "@/app/components/portal/EditarDireccion";
import ListSearch from "@/app/components/ListSearch";
import ProfileInput from "@/app/components/inputs/ProfileInput";
import { MdModeEditOutline, MdSave } from "react-icons/md";
import { Button } from "@/components/ui/button";
import PhoneChangeModal from "../../components/welcome/PhoneChangeModal";


interface MiPerfilProps {
  currentUser: SafeUser;
 }

 const MiPerfilClient: React.FC<MiPerfilProps> = ({
  currentUser
 }) => {
  const router = useRouter();
  const loader = useLoader();
  const nombreInputRef = useRef(null);
  

  const [isLoading,setIsLoading] = useState(false);
  const [adding,setAdding] = useState(false);
  const [nombreEdit, setNombreEdit] = useState(false);
  const [celularEdit,setCelularEdit] = useState(false);
  const [confirmDialogOpen,setConfirmDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [editing,setEditing] = useState(false);
  const [editData,setEditData] = useState({});



  useEffect(() => {
   
   console.log(currentUser);
    }, [currentUser]) 

 

  const toggleNombreEdit = (action: string) => {
    if(action == 'edit') {
      setNombreEdit(true);
      //nombreInputRef?.current?.focus();
    } 

    if(action == 'save') {
      setNombreEdit(false);
    }
  }

  const handleChangeCelular = () => {
    setCelularEdit(true);
  }

  const handleCloseChangeCelular = () => {
    setCelularEdit(false);
  }

  const handleConfirmDialog = async (props: any) => {
    if (props.tipo == 'delete') {
      setDialogContent({
        title: "Borrar dirección",
        notes: "La dirección no se borrara de tus guías activas o completadas.",
        action: "Estas seguro de borrar",
        object: props.data.nombreDireccion,
        data: props.data,
        tipo: 'delete'
      })
      setConfirmDialogOpen(true);

    } else if (props.tipo == 'mark') {
      setDialogContent({
        title: "Marcar predeterminada",
        notes: "Esta dirección aparecerá como predeterminada al agregar envíos",
        action: "Estas seguro de marcar como predeterminada",
        object: props.data.nombreDireccion,
        data: props.data,
        tipo: 'mark'
      })
      setConfirmDialogOpen(true);
    }
    
  }

  const handleConfirm = async (props: any) => {
   
    if(props.confirm ) {

      if (props.tipo == 'delete') {
        setConfirmDialogOpen(false);
        loader.onOpen();
        const res = await deleteDireccion({id: props.data.id});
        toast.success('Dirección borrada!');
      } else if (props.tipo == 'mark') {
        setConfirmDialogOpen(false);
        loader.onOpen();
        const res = await markDireccion({id: props.data.id});
        toast.success('Dirección marcada!');
      }

      router.refresh();

      const timer = setTimeout(() => {
        loader.onClose();
        }, 2000);
      
     

    } else {
      setConfirmDialogOpen(false);
    }
  }
  

  const onAddDireccion = async (props: any) => {
    loader.onOpen();
    setConfirmDialogOpen(true);

    //deleteDireccion({id: id});

    const timer = setTimeout(() => {
      loader.onClose();
      }, 3000);
  } 

  const onEditDireccion = async (direccion: any) => {
    setEditData(direccion);
    setEditing(true);
  } 

  const onEditClose  = async (props: any) => {

    if(props.action == 'save') {
      const res = await updateDireccion({id: props.id, data: props.data});
      toast.success('Direccion editada!');
      setEditing(false);
      router.refresh();
      const timer = setTimeout(() => {
        loader.onClose();
        }, 1000);
      
    } else if ( props.action == 'cancel') {
      setEditing(false);
    }
  } 

  const onAddClose  = async (props: any) => {
          console.log(props);
        const res = await addDireccion(props.apiData);
          if(res.status == 1) {
            toast.success('Dirección creada!');
          } else {
            toast.error(res.statusMessage);
          }
          setAdding(false);
          router.refresh();
          const timer = setTimeout(() => {
            loader.onClose();
          }, 1000);
  } 

  const handleSearch = (data: any) => {
    if (data) {
     
    } 
  }
  


    return (
      <ClientOnly>
        <PhoneChangeModal currentUser={currentUser} open={celularEdit} onClose={handleCloseChangeCelular}/>
        <ConfirmDialog isOpen={confirmDialogOpen} onClose={handleConfirm} dialogContent={dialogContent}/>
            <PageHeader 
              title="Mi perfil"
              subtitle='Administra la información de tu perfil de usuario'
              icon={FaUser}
              buttonIcon={FaPlus}
              buttonAction={() => {}}
              cancelIcon={FaTimes}
              cancelAction={() => {}}
              adding={adding}
              disabled = {false}
              noButton
            />
            <div className="my-4 flex flex-col gap-4 p-4">
             
                <div className="flex flex-row items-center gap-4">
                  <div className="m-0 w-9 h-9 flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                    {currentUser?.nombre?.charAt(0)}
                  </div>
                  <p className="text-xs font-bold text-primary">{currentUser?.email}</p>
                </div>
                <hr className="my-1"></hr>
                <div className=" flex flex-row items-center gap-2">
                  <div className="m-0 w-72 ">
                    <ProfileInput
                      id="nombre"
                      label="Nombre completo"
                      ref={nombreInputRef}
                      placeholder=""
                      disabled={!nombreEdit}
                      value={currentUser?.nombre || ''}
                      errors={''}
                      required
                      onChange={(event: any) => {
                  
                      }}
                  
                    />
                    </div>
                   <div className=" p-1.5 bg-rose-500 rounded-md mt-3 cursor-pointer hover:bg-rose-500/80" 
                        onClick={
                          !nombreEdit ? () => toggleNombreEdit('edit') : () => toggleNombreEdit('save')}>

                        { !nombreEdit ? <MdModeEditOutline className="text-white" size={20}/> 
                          :
                          <MdSave  className="text-white" size={20}/> 
                      }
                    </div>
                </div>
                <div className=" flex flex-row items-center gap-2">
                  <div className="m-0 w-72 ">
                    <ProfileInput
                      id="celular"
                      label="Celular / Whatsapp"
                      placeholder=""
                      disabled={true}
                      value={currentUser?.celular || ''}
                      errors={''}
                      required
                      onChange={(event: any) => {
                  
                      }}
                  
                    />
                    </div>
                   <div className=" p-1.5 bg-rose-500 rounded-md mt-3 cursor-pointer hover:bg-rose-500/80" 
                        onClick={() => handleChangeCelular()}>

                        <MdModeEditOutline className="text-white" size={20}/> 
                    </div>
                </div>
                <div>
                  <Button variant={'outline'} className="px-2">
                      <div className="flex flex-row items-center gap-2">
                        <FaLock />
                        <p>Cambiar contraseña</p>
                      </div>
                  </Button>
                </div>

            
                

            </div>
        
      </ClientOnly>
    )
  }


  
export default MiPerfilClient;