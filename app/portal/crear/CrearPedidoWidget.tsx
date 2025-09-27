"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import RecoleccionStep from "./steps/Recoleccion";
import CrearNavbar from "./components/CrearNavbar";
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType, IDrawer } from "@/app/types/pedido";
import ConfirmarStep from "./steps/Confirmar";
import UtilDrawer from "./components/UtilDrawer";
import { SafeUser } from "@/app/types";
import DireccionDrawer from "./components/DireccionDrawer";
import DestinoStep from "./steps/Destino";
import DestinoDrawer from "./components/DestinoDrawer";
import PaqueteStep from "./steps/Paquete";
import PaqueteDrawer from "./components/PaqueteDrawer";
import CreandoPedidoModal from "@/app/portal/crear/components/CreandoPedidoModal";
import {
  bloqueToString,
  namedDateString,
} from "@/app/components/utils/helpers";
import ProgramacionV2Step from "./steps/ProgramacionV2";
import AvisosProgramacion from "./steps/components/AvisosProgramacion";
import PagoStep from "./steps/Pago";
import { useProgramaStore } from "./store/crear-store";
import TimeoutDialog from "@/app/components/modals/TimeoutDialog";

interface CrearPedidoWidgetProps {
  title?: string;
  data?: any;
  sm?: boolean;
  currentUser?: SafeUser;
  append?: boolean;
  recoleccion?: any;
}

const CrearPedidoWidget: React.FC<CrearPedidoWidgetProps> = ({
  title,
  data,
  sm,
  currentUser,
  append = false,
  recoleccion,
}) => {
  //('isSm:', data.direcciones);
  const router = useRouter();
  const loader = useLoader();
  const {
    activeStep,
    drawer,
    timer,
    useTimer,
    saveRecoleccionState,
    saveEntregaState,
    savePrograma,
    updateActiveStep,
    saveAppend,
    saveRecoleccion,
    pedido,
    savePedidoInitial,
    tipoPrograma,
  } = useContext(PedidoContext) as PedidoContextType;

  const [confirmSalirOpen, setConfirmSalirOpen] = useState(false);
  const [timerConfirmOpen, setTimerConfirmOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState();

  const pv2 = useProgramaStore();

  //(append);
  //(recoleccion);
  useEffect(() => {
    loader.isOpen && loader.onClose();
    pv2.updateProgramaClear();
    pv2.updateTimeoutMpClear();
  }, []);

  const dialogContent = {
    title: "¿Salir sin guardar?",
    notes: "Si sales ahora, perderás la información capturada en este envío.",
    tipo: "salir",
  };

  const handleConfirmSalir = async (props: any) => {
    if (props.confirm) {
      loader.onOpen();
      setConfirmSalirOpen(false);
      router.push("/portal/adm/mispedidos");
      //loader.onClose();
    } else {
      setConfirmSalirOpen(false);
    }
  };

  useEffect(() => {
    if (append && recoleccion) {
      const appendInital = { enabled: true, recoleccion: recoleccion };
      const programaInitial = {
        fechaRecoleccion: recoleccion.fecha,
        bloqueRecoleccion: recoleccion.bloque,
        fechaEntrega: null,
        bloqueEntrega: 3,
      };
      const recoleccionInitial = recoleccion;

      savePedidoInitial(appendInital, programaInitial, recoleccionInitial);

      saveRecoleccionState({
        am: true,
        pm: true,
        show: true,
        enabled: true,
      });

      updateActiveStep(1);
    }
  }, [append]);

  const handleDrawerComponent = (tipo: string | undefined) => {
    if (tipo == "addDireccion") {
      return <DireccionDrawer currentUser={currentUser} />;
    }
    if (tipo == "destinos") {
      return (
        <DestinoDrawer currentUser={currentUser} destinos={data.destinos} />
      );
    }
    if (tipo == "paquetes") {
      return (
        <PaqueteDrawer currentUser={currentUser} paquetesList={data.paquetes} />
      );
    }
  };

  const timeToClose = new Date();
  timeToClose.setSeconds(timeToClose.getSeconds() + 10); // 10 minutes timer

  const handleOnTimeout = () => {
    pv2.updateTimeoutDialogOpen(false);
    pv2.updateRecSelectedDate(undefined);
    pv2.updateEntSelectedDate(undefined);
    pv2.updateTimeoutMpClear();
    updateActiveStep(3);
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmSalirOpen}
        onClose={handleConfirmSalir}
        dialogContent={dialogContent}
      />
      <UtilDrawer
        props={drawer}
        onClose={() => setOpenDrawer(false)}
        size={sm ? 700 : 1050}
        content={handleDrawerComponent(drawer?.tipo)}
      />
      <TimeoutDialog isOpen={pv2.timeoutDialogOpen} onClose={handleOnTimeout} />
      <CreandoPedidoModal />
      <CrearNavbar onClose={() => setConfirmSalirOpen(true)} />
      {append && (
        <div className=" pt-16 bg-neutral-800 w-full">
          <div className="w-full md:w-3/4 py-2 px-1 md:px-8 mx-auto">
            <p className="text-sm text-white ">
              Agregando pedido a recolección en {recoleccion.calle}{" "}
              {recoleccion.numero}
            </p>
            <p className="text-xs text-white">
              {namedDateString(recoleccion.fecha)} (
              {bloqueToString(recoleccion.bloque)})
            </p>
          </div>
        </div>
      )}
      <div className="">
        <div className={`${append ? "pt-0" : "pt-16"}`}>
          {activeStep === 0 && (
            <div className="w-full md:w-3/4 py-4 px-1 md:px-8 mx-auto">
              <RecoleccionStep
                direcciones={data.direcciones}
                append={append}
                recoleccion={recoleccion}
              />
            </div>
          )}
          {activeStep === 1 && (
            <div className="w-full md:w-3/4 py-4 px-1 md:px-8 mx-auto">
              <DestinoStep municipios={data.municipios} />
            </div>
          )}
          {activeStep === 2 && (
            <div className="w-full md:w-3/4 py-4 px-1 md:px-8 mx-auto">
              <PaqueteStep currentUser={currentUser} />
            </div>
          )}
          {activeStep === 3 && (
            <div className="w-full md:w-3/4 py-0 px-0 md:px-0 mx-auto">
              <AvisosProgramacion>
                <ProgramacionV2Step />
              </AvisosProgramacion>
            </div>
          )}
          {activeStep === 4 && (
            <div className="w-full md:w-3/4 py-4 px-1 md:px-8 mx-auto">
              <ConfirmarStep append={append} recoleccion={recoleccion} />
            </div>
          )}
          {activeStep === 5 && (
            <div className="w-full md:w-3/4 py-0 md:py-4 px-1 md:px-8 mx-auto">
              <PagoStep />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CrearPedidoWidget;
