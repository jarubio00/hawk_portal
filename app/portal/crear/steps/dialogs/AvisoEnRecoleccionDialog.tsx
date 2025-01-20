"use client";
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
} from "@/components/ui/alert-dialog";
import Button from "@/app/components/Button";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

interface AvisoEnRecoleccionDialogProps {
  disabled: boolean;
  onNext: () => void;
  openDialog: boolean;
}

const AvisoEnRecoleccionDialog: React.FC<AvisoEnRecoleccionDialogProps> = ({
  disabled = false,
  onNext,
  openDialog = false,
}) => {
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent className="bg-[url('/images/avisos/avisoBloques3.png')] bg-white bg-no-repeat bg-contain md:bg-cover h-[600px] w-full md:w-[550px]">
        <AlertDialogHeader className="h-[450px]"></AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="px-4 mx-4" onClick={onNext}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvisoEnRecoleccionDialog;
