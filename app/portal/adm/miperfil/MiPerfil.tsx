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
import toast from "react-hot-toast";
import EditarDireccion from "@/app/components/portal/EditarDireccion";
import ListSearch from "@/app/components/ListSearch";
import ProfileInput from "@/app/components/inputs/ProfileInput";
import { MdCancel, MdModeEditOutline, MdSave } from "react-icons/md";
import { Button } from "@/components/ui/button";
import PhoneChangeModal from "../../components/welcome/PhoneChangeModal";
import PasswordChangeModal from "../../components/miperfil/PasswordChangeModal";
import { IoMdClose } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import { Label } from "@/components/ui/label";


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
  const [passwordEdit,setPasswordEdit] = useState(false);
  const [confirmDialogOpen,setConfirmDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [editing,setEditing] = useState(false);
  const [editData,setEditData] = useState({});



  useEffect(() => {
   
   console.log(currentUser);
    }, [currentUser]) 

 

  const toggleNombreEdit = (action: string) => {
    if(action == 'edit') {
      setNombreEdit(!nombreEdit);
      //nombreInputRef?.current?.focus();
    } 

    if(action == 'save') {
      setNombreEdit(false);
    }
  }

  const handleChangeCelular = () => {
    setCelularEdit(true);
  }

  const handleChangePassword = () => {
    setPasswordEdit(true);
  }

  const handleCloseChangeCelular = () => {
    setCelularEdit(false);
  }

  const handleCloseChangePassword = () => {
    setPasswordEdit(false);
  }


  const handleChangeName = (data: any) => {
    if (data) {
     
    } 
  }
  


    return (
      <ClientOnly>
        <PhoneChangeModal currentUser={currentUser} open={celularEdit} onClose={handleCloseChangeCelular}/>
        <PasswordChangeModal currentUser={currentUser} open={passwordEdit} onClose={handleCloseChangePassword}/>
    
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
                   <div className="  rounded-md mt-3 cursor-pointer " 
                        onClick={
                          !nombreEdit ? () => toggleNombreEdit('edit') : () => toggleNombreEdit('save')}>

                        { !nombreEdit ? <MdModeEditOutline className="text-rose-500" size={20}/> 
                          :
                          <MdSave  className="text-rose-500" size={20}/> 
                      }
                    </div>
                    {nombreEdit && <div className=" rounded-md mt-3 cursor-pointer " 
                        onClick={() => toggleNombreEdit('edit')}>
                          <IoMdClose className="text-primary" size={20}/> 
                    </div>}
                </div>
                <div className=" flex flex-row items-center gap-2">
                  <div className="m-0 w-72 gap-2">
                  <Label htmlFor={'celular'} className="text-xs text-neutral-400 w-full mb-1">Celular / Whatsapp</Label>
                  <PhoneInput
                    inputClass={`!py-4 !w-full !pl-20 !border-input !text-sm !disabled:border-0}`}
                    disabled={true}
                    buttonClass={`"!w-16 !p-2 !py-4   !border-input  !disabled:border-0}"`}
                    country={'mx'}
                    preferredCountries={['mx','us']}
                    value={`${currentUser.countryCode}${currentUser.celular}`}
                    countryCodeEditable={false}
                  />
                    </div>
                   <div className=" rounded-md mt-4 cursor-pointer" 
                        onClick={() => handleChangeCelular()}>

                        <MdModeEditOutline className="text-rose-500" size={20}/> 
                    </div>
                </div>

                
                <div className="my-4">
                  <Button variant={'outline'} className="px-2" onClick={() => handleChangePassword()}>
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