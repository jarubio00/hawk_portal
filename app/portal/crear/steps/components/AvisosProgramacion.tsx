"use client";

import React, { useEffect, useState, useContext } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { useProgramaStore } from "../../store/crear-store";
import Button from "@/app/components/Button";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import CrearNextButton from "../../components/CrearNextButton";

/** Hook: detecta si la pantalla está en viewport mobile */
function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in e ? e.matches : (e as MediaQueryList).matches);

    // estado inicial
    setIsMobile(mql.matches);
    // suscripción a cambios de tamaño
    mql.addEventListener
      ? mql.addEventListener("change", onChange)
      : mql.addListener(onChange as any);
    return () => {
      mql.removeEventListener
        ? mql.removeEventListener("change", onChange)
        : mql.removeListener(onChange as any);
    };
  }, [query]);

  return isMobile;
}

const AvisosProgramacion: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { updateActiveStep, savePrograma } = useContext(
    PedidoContext
  ) as PedidoContextType;
  const [verMas, setVerMas] = useState(false);

  // ⬅️ Agregamos mobileBackgroundImage desde el store
  const {
    avisoActivo,
    backgroundColor,
    backgroundImage,
    mobileBackgroundImage, // <- NUEVO en el store
    text1,
  } = useProgramaStore();
  const pv2 = useProgramaStore();

  const isMobile = useIsMobile();

  const bgColor = backgroundColor ?? "";
  // Si es mobile y hay imagen móvil, úsala; de lo contrario usa la de desktop
  const bgUrl = isMobile ? mobileBackgroundImage : backgroundImage ?? "";
  const handleBack = () => {
    updateActiveStep(2);
  };

  const handleNext = async () => {
    await pv2.updateFinalDates();
    await savePrograma({
      fechaEntString: pv2.entregaDate?.datetimeString,
      fechaRecString: pv2.recoleccionDate?.datetimeString,
      mismoDia: pv2.mismoDiaSelected,
    });
    updateActiveStep(4);
  };

  const dateToString = (d: Date | undefined) => {
    if (d) {
      const iso = d.toLocaleDateString();
      const ds = iso.split("/");
      const dateString = `${ds[2]}-${pad2(ds[1])}-${pad2(ds[0])}`;
      const datetimeString = dateString + " 10:00:00";
      return datetimeString;
    }
    return "";
  };

  function pad2(n: string) {
    return String(n).padStart(2, "0");
  }

  return (
    <div>
      {avisoActivo ? (
        <div
          className="w-full min-h-3/4 md:min-h-screen overflow-visible text-black"
          style={{
            // degradado radial
            background: `radial-gradient(
              circle at center,
              ${bgColor} 20%,
              rgba(224, 242, 255, 0.7) 60%,
              rgba(224, 242, 255, 0.3) 80%,
              transparent 100%
            )`,
            //backgroundRepeat: "no-repeat",
            // Nota: backgroundPosition:"absolute" no es válido; lo dejo tal cual si así lo necesitas para no romper estilos.
            // Una alternativa correcta sería backgroundPosition:"center".
            //backgroundPosition: "top",
            //backgroundSize: "contain",
            inset: 0,
            overflow: "visible",
            zIndex: 0,
          }}
        >
          <div
            className="w-full"
            style={{
              backgroundImage: `url('${bgUrl}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 p-2 ">
              {children}
              <div
                className="flex flex-col bg-black rounded-md w-full md:w-1/2 text-white items-center p-4"
                onClick={() => mobileBackgroundImage}
              >
                <p className="text-xl font-bold">AVISO IMPORTANTE</p>
                <p className="text-xs text-center">{text1}</p>

                {verMas && (
                  <div>
                    <p className="text-xs text-center">
                      Recordamos que nuestros bloques pueden llenarse con
                      anticipación en la página, el sistema en automático
                      muestra los horarios disponibles.
                    </p>
                    <p className="text-xs text-center">
                      Considerar que los AGREGADOS no tienen prioridad sobre los
                      envíos programados en tiempo.
                    </p>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div className="flex flex-row gap-1 items-center">
                        <MdPhone className="text-white p-1 h-6 w-6 bg-deep-orange-400 rounded-full" />
                        <p className="text-grey-800 font-bold text-xs">
                          81 4738 09 49
                        </p>
                      </div>
                      <div className="flex flex-row gap-1 items-center">
                        <FaWhatsapp className="text-white p-1 h-6 w-6 bg-green-500 rounded-full" />
                        <p className="text-grey-800 font-bold text-xs">
                          81 1533 83 33
                        </p>
                      </div>
                      <div className="col-span-2 md:col-span-1 flex flex-row gap-1 items-center">
                        <MdEmail className="text-white p-1 h-6 w-6 bg-amber-700 rounded-full" />
                        <p className="text-grey-800 font-bold text-xs">
                          contacto@lamensajeria.mx
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="w-full flex flex-row justify-between"
                  onClick={() => setVerMas(!verMas)}
                >
                  <p></p>
                  <p className="text-xs text-right text-blue-300 underline">
                    Ver {verMas ? "menos" : "más"}
                  </p>
                </div>
              </div>
              <div className="flex  md:w-1/4 mt-6 mb-2 mx-2 ">
                <CrearNextButton
                  onClick={handleNext}
                  disabled={
                    !pv2.recSelectedDate ||
                    (!pv2.entSelectedDate && !pv2.mismoDiaSelected)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full min-h-screen overflow-visible text-black">
          <div className="flex flex-col  items-center md:items-start py-4 px-1 md:px-8  min-h-full gap-6 p-2">
            {children}
            <div className="flex w-full md:w-1/4 mt-6 mb-2 md:mx-2 ">
              <CrearNextButton
                onClick={handleNext}
                disabled={
                  !pv2.recSelectedDate ||
                  (!pv2.entSelectedDate && !pv2.mismoDiaSelected)
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvisosProgramacion;
