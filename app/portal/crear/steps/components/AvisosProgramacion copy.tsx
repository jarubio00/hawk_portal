"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { useProgramaStore } from "../../store/crear-store";

const AvisosProgramacion: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [verMas, setVerMas] = useState(false);
  const { avisoActivo, backgroundColor, backgroundImage, text1 } =
    useProgramaStore();
  const bgColor = backgroundColor ? backgroundColor : "";
  const bgUrl = backgroundImage ? backgroundImage : "";
  return (
    <div>
      {avisoActivo ? (
        <div
          className=" w-full min-h-screen overflow-hidden text-black"
          style={{
            background: `radial-gradient(
              circle at center,
              ${bgColor} 20%,
              rgba(224, 242, 255, 0.7) 60%,
              rgba(224, 242, 255, 0.3) 80%,
              transparent 100%
            )`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "absolute",
            backgroundSize: "cover",
            inset: 0,
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <div
            className={``}
            style={{
              background: `url('${bgUrl}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 p-2">
              <div className="flex flex-col bg-black rounded-md w-full text-white items-center p-4">
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
                {/* <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
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
                </div> */}
              </div>
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full h-screen overflow-hidden text-black">
          <div className="flex flex-col items-center py-4 px-1 md:px-8 mx-auto h-full gap-6 p-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvisosProgramacion;
