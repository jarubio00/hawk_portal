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


interface PhoneConfirmModalProps {
    currentUser: any;
    open: boolean;
}

const PhoneConfirmModal: React.FC<PhoneConfirmModalProps> = ({
currentUser,
open
}) => {
    const loader = useLoader();

const handleLogout = () => {
    loader.onOpen();
      signOut({callbackUrl: "/"})

}
 return (
    <AlertDialog open={open}>
    <AlertDialogTrigger asChild>
      <Button variant="outline"></Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogTitle className="text-sm text-right">
            <Button variant='link' onClick={handleLogout}>Salir</Button>
        </AlertDialogTitle>

            <div className="flex flex-col text-xs text-center text-neutral-400">
                <span className="font-semibold text-black text-sm">Bienvenido a la nueva plataforma de La Mensajeria.MX.</span>
                <span className="mt-2">Por la seguridad de tu cuenta requerimos verificar tú número de celular,
                 además, cuando tú lo decidas podrás recibir notificaciones de tús envíos de manera instantanea.</span>
            </div>

        <PhoneConfirm currentUser={currentUser}/>
    </AlertDialogContent>
  </AlertDialog>
 )
}

export default PhoneConfirmModal;