"use client";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { IconType } from "react-icons";
import DireccionSlideCard from "../components/DireccionSlideCard";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

import DireccionCard from "../components/DireccionCard";
import { PedidoContext } from "../context/PedidoContext";
import { PedidoContextType, IRecoleccion } from "@/app/types/pedido";
import { FaPlus } from "react-icons/fa";
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
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import AddColoniaFixDialog from "../components/AddColoniaFixDialog";
import AvisoEnRecoleccionDialog from "./dialogs/AvisoEnRecoleccionDialog";
import CrearNextButton from "../components/CrearNextButton";

interface RecoleccionStepProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  direcciones: any;
  append?: boolean;
  recoleccion?: any;
}

const RecoleccionStep: React.FC<RecoleccionStepProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  direcciones,
  append = false,
  recoleccion,
}) => {
  const {
    updateActiveStep,
    saveRecoleccion,
    pedido,
    updateDireccionSelected,
    useDrawer,
    direccionSelected,
  } = useContext(PedidoContext) as PedidoContextType;

  append;

  const [direccion, setDireccion] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openColoniaDialog, setOpenColoniaDialog] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [avisoDialog, setAvisoDialog] = useState(false);

  const onSelectDireccion = (direccion: any) => {
    setErrorMessage("");
    updateDireccionSelected(direccion.id);
    //setDireccion(direccion);
    saveRecoleccion(direccion);
  };

  useEffect(() => {
    direcciones.map((val: any) => {
      val;
      const timer = setTimeout(() => {
        if (val.default) {
          updateDireccionSelected(val.id);
          saveRecoleccion(val);
        }
      }, 500);
    });
  }, []);

  const handleNext = () => {
    //if (!pedido?.recoleccion?.colonia) {
    if (1 > 2) {
      setOpenColoniaDialog(true);
    } else {
      if (pedido?.recoleccion?.direccionId) {
        updateActiveStep(1);
      } else {
        setErrorMessage("Selecciona una dirección de recolección");
      }
    }
  };

  const closeColoniaDialog = () => {
    setOpenColoniaDialog(false);
  };

  return (
    <div className="px-2">
      <AvisoEnRecoleccionDialog
        openDialog={avisoDialog}
        disabled={false}
        onNext={() => setAvisoDialog(false)}
      />
      <AddColoniaFixDialog
        open={openColoniaDialog}
        onClose={closeColoniaDialog}
      />
      {/* <StepHeading
        title="Recolección"
        subtitle={
          !append
            ? "Selecciona la dirección de recolección"
            : "No se puede modificar la dirección de recolección"
        }
      /> */}
      <div className="flex mt-2">
        {!append && (
          <div
            className="
          
          text-white flex-wrap
          font-semibold
          text-xs
          mb-4
          flex
          flex-row
          gap-1
          items-center
          cursor-pointer
          bg-blue-500
          hover:bg-blue-300
          rounded-md
          px-2
          py-1
          "
            onClick={() =>
              useDrawer({
                open: true,
                title: "Agregar dirección de recolección",
                tipo: "addDireccion",
              })
            }
          >
            <FaPlus size={12} />
            <span>Agregar nueva dirección de recolección</span>
          </div>
        )}
      </div>
      {!append && (
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            768: {
              slidesPerView: 3.5,
            },
            1200: {
              slidesPerView: 4.5,
            },
          }}
        >
          {direcciones.map((dir: any, i: number) => {
            //(dir)
            return (
              <SwiperSlide key={i}>
                <DireccionSlideCard
                  data={dir}
                  onClick={onSelectDireccion}
                  selected={direccionSelected === dir.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {pedido?.recoleccion && (
        <div className="my-0 ">
          <DireccionCard data={pedido?.recoleccion} append={append} />
        </div>
      )}
      <div className="my-2">
        <p className="text-xs text-red-500">{errorMessage}</p>
      </div>

      <div>
        {pedido?.recoleccion?.municipioId !== 10 ? (
          <div className="flex w-full md:w-1/4 mt-6 mb-2">
            <CrearNextButton
              onClick={handleNext}
              disabled={!pedido?.recoleccion?.direccionId}
            />
          </div>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex w-full md:w-1/4 mt-6 mb-2">
                <CrearNextButton onClick={() => {}} disabled={false} />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className=" ">
              <AlertDialogHeader>
                <AlertDialogTitle>RUTA CADEREYTA</AlertDialogTitle>
                <AlertDialogDescription className="text-black">
                  Te recordamos que nuestra ruta de recolecciones en el
                  municipio de Cadereyta es únicamente los días sábados en el
                  bloque 1 (entre 10:00 y 15:00 hrs).
                  <p className="mt-4 text-xs font-bold">
                    Puedes generar el envío en cualquier momento y será
                    recolectado el siguiente día sábado hábil.
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-8 gap-2 md:gap-0">
                    <div className="flex flex-row gap-1 items-center">
                      <MdPhone className="text-white p-1 h-6 w-6 bg-deep-orange-400 rounded-full" />
                      <p className="text-grey-800 font-bold text-xs">
                        81 4738 09 49
                      </p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <FaWhatsapp className="text-white p-1 h-6 w-6 bg-green-500 rounded-full" />
                      <p className="text-grey-800 font-bold text-xs">
                        81 1553 83 33
                      </p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <MdEmail className="text-white p-1 h-6 w-6 bg-amber-700 rounded-full" />
                      <p className="text-grey-800 font-bold text-xs">
                        contacto@lamensajeria.mx
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-rose-500 text-xs">
                    Horario de atención Lunes a viernes de 9 am a 6 pm / sábado
                    de 9 am a 1 pm
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="px-4 mx-4">
                  Regresar
                </AlertDialogCancel>
                <AlertDialogAction className="px-4 mx-4" onClick={handleNext}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default RecoleccionStep;
