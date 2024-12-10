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

interface NavidadDialogProps {
  disabled: boolean;
  onNext: () => void;
}

const NavidadDialog: React.FC<NavidadDialogProps> = ({
  disabled = false,
  onNext,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button label="Siguiente" onClick={() => {}} disabled={disabled} />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[url('/images/avisos/tnav4.gif')] bg-green-100 bg-no-repeat bg-cover">
        <AlertDialogHeader>
          <AlertDialogTitle>AVISO IMPORTANTE</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Debido a el alta demanda por la temporada navideña, nuestras
            operaciones podrían verse afectadas.
            <p className="mt-4 text-xs font-bold">
              Recordamos que nuestros bloques pueden llenarse con anticipación
              en la página, el sistema en automático muestra los horarios
              disponibles para recolección y entrega. Considerar que los
              AGREGADOS no tienen prioridad sobre los envíos programados en
              tiempo.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-8 gap-2 md:gap-0">
              <div className="flex flex-row gap-1 items-center">
                <MdPhone className="text-white p-1 h-6 w-6 bg-deep-orange-400 rounded-full" />
                <p className="text-grey-800 font-bold text-xs">81 4738 09 49</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <FaWhatsapp className="text-white p-1 h-6 w-6 bg-green-500 rounded-full" />
                <p className="text-grey-800 font-bold text-xs">81 1533 83 33</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <MdEmail className="text-white p-1 h-6 w-6 bg-amber-700 rounded-full" />
                <p className="text-grey-800 font-bold text-xs">
                  contacto@lamensajeria.mx
                </p>
              </div>
            </div>
            <p className="mt-3 text-rose-500 text-xs">
              Horario de atención Lunes a viernes de 9 am a 6 pm / sábado de 9
              am a 1 pm
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-4 mx-4">Regresar</AlertDialogCancel>
          <AlertDialogAction className="px-4 mx-4" onClick={onNext}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NavidadDialog;
