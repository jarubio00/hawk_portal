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
  import PhoneConfirm from "./phoneConfirm/PhoneConfirm";


interface PhoneChangeModalProps {
    currentUser: any;
    open: boolean;
    onClose: () => void;
}

const PhoneChangeModal: React.FC<PhoneChangeModalProps> = ({
currentUser,
open, 
onClose
}) => {
    const loader = useLoader();

const handleLogout = () => {
    console.log('cerrar')
    onClose();

}
 return (
    <AlertDialog open={open} >
   
    <AlertDialogContent className="h-screen md:h-auto">
        <PhoneConfirm currentUser={currentUser} type={'profile'} onClose={handleLogout}/>
    </AlertDialogContent>
  </AlertDialog>
 )
}

export default PhoneChangeModal;