'use client';
import useLoader from "@/app/hooks/useLoader";
import { signOut } from "next-auth/react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import PasswordChange from "./PasswordChange";
import { useState } from "react";
import ForgotPage from "@/app/auth/forgot/ForgotPage";
 


interface PasswordChangeModalProps {
    currentUser: any;
    open: boolean;
    onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
currentUser,
open, 
onClose
}) => {
    const loader = useLoader();

    const [forgot,setForgot] = useState(false);
    const [closeButton,setCloseButton] = useState(true);
  

const handleLogout = () => {
  onClose();
   setForgot(false);
   setCloseButton(true);
   
}

const handleOnForgot = () => {
  setForgot(true);
}

const handleCloseButton = () => {
 setCloseButton((val) => !val);
}

 return (
    <AlertDialog open={open}>
    <AlertDialogContent className="flex flex-col h-[95vh] md:h-auto justify-center">
      {closeButton && <AlertDialogTitle className="text-sm text-right">
        <Button variant='link' onClick={handleLogout}>Salir</Button>
      </AlertDialogTitle>}
        

      {!forgot ? <PasswordChange 
        currentUser={currentUser} 
        onClose={handleLogout} 
        onForgot={handleOnForgot}
        toggleCloseButton={handleCloseButton}
        />
        :
        <ForgotPage 
          currentUser={currentUser} 
          type={'profile'}
          onClose={handleLogout} 
          onForgot={handleOnForgot}
          toggleCloseButton={handleCloseButton}
          
          />
    
    }
    </AlertDialogContent>
  </AlertDialog>
 )
}

export default PasswordChangeModal;