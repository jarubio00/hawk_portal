"use client";

import { useProgramaStore } from "../../../store/crear-store";

interface AvisosOpcionesProps {
  data?: string;
}

const AvisosOpciones: React.FC<AvisosOpcionesProps> = ({ data }) => {
  const { updateAviso } = useProgramaStore();
  return (
    <div className="mt-2 flex flex-row items-center gap-4">
      <div
        className="py-1 px-2 border rounded-sm cursor-pointer text-[10px]"
        onClick={() =>
          updateAviso({
            avisoActivo: false,
            backgroundColor: "",
            backgroundImage: "",
            mobileBackgroundImage: "",
            text1: "",
          })
        }
      >
        Ninguno
      </div>
      <div
        className="py-1 px-2 border rounded-sm cursor-pointer text-[10px]"
        onClick={() =>
          updateAviso({
            avisoActivo: true,
            backgroundColor: "#a4b5ed",
            backgroundImage:
              "https://hawkportal.lamensajeria.mx/images/avisos/rain1.gif",
            mobileBackgroundImage:
              "https://hawkportal.lamensajeria.mx/images/avisos/rain1.gif",
            text1:
              "Debido a las fuertes lluvias que se esperan en Monterrey y zona metropolitana en los próximos días, nuestras operaciones podrían verse afectadas.",
          })
        }
      >
        Lluvia
      </div>
      <div
        className="py-1 px-2 border rounded-sm cursor-pointer text-[10px]"
        onClick={() =>
          updateAviso({
            avisoActivo: true,
            backgroundColor: "#6ad0f5",
            backgroundImage:
              "https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Favisos%2Fnav3.gif?alt=media&token=8fa17728-db9b-4a8a-bd13-f7d9c592b7a7",
            //"https://hawkportal.lamensajeria.mx/images/avisos/nieve.gif",
            mobileBackgroundImage:
              "https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Favisos%2Fnav3.gif?alt=media&token=8fa17728-db9b-4a8a-bd13-f7d9c592b7a7",
            text1:
              " Debido a las bajas temperaturas les informamos que el día martes 21 de enero, nuestras operaciones podrían verse afectadas.",
          })
        }
      >
        Frio
      </div>
      <div
        className="py-1 px-2 border rounded-sm cursor-pointer text-[10px]"
        onClick={() =>
          updateAviso({
            avisoActivo: true,
            backgroundColor: "#fff099",
            backgroundImage:
              "https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Favisos%2Fsol-b.gif?alt=media&token=dd44bc96-3fe8-4e61-a7cf-7afb0a8b1b69",
            mobileBackgroundImage:
              "https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Favisos%2Fsol-d-m.gif?alt=media&token=42750158-cc29-486d-930a-cf7c2061b30a",
            text1:
              " Debido a las bajas temperaturas les informamos que el día martes 21 de enero, nuestras operaciones podrían verse afectadas.",
          })
        }
      >
        Calor
      </div>
    </div>
  );
};

export default AvisosOpciones;
