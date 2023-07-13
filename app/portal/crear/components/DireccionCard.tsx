'use client';

import Input from "@/app/components/inputs/Input";
import InputSingle from "@/app/components/inputs/InputSingle";
import { IconType } from "react-icons";

interface DireccionCardProps {
  data: any;
}

//se quito w-full , se agregp px-2
const DireccionCard: React.FC<DireccionCardProps> = ({ 
  data, 

}) => {

  console.log(data);

  return ( 
    <div className={`mx-0 my-0 p-4 px-2  border-neutral-200 border rounded-lg shadow-md `} >
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm font-bold">
               {data?.cpId}
            </span>
            <span className="text-sm text-neutral-400 font-bold uppercase">
               {data?.nombreDireccion}
            </span>
          </div>
          <span className="text-xs ">
              {data?.calle} {data?.numero} {data?.numeroInt}
          </span>
          <span className="text-xs">
              Col. {data?.colonia} , {data?.municipio.municipio}
          </span>
          {data.empresa && <div className="">
            <span className=" flex-wrap text-white text-xs bg-neutral-700 rounded-sm hover:bg-blue-300 px-2">{data.empresa}</span>
          </div>}
          {data.referencias && <div className="flex flex-col mt-1">
            <span className="text-xs font-semibold">Referencias:</span>
            <span className="text-xs">{data.referencias}</span>
          </div>}
          <span className="text-xs font-semibold mt-4 ">Datos de contacto</span>
          <span className="text-xs text-neutral-500 font-base  mb-2">Puedes cambiarlos para esta recolección</span>
          <div className="  grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-4">
            <div className="my-0">
              <InputSingle
                id='nombre'
                label="Nombre"
                value={data?.contactoNombre}
                onChange={() => {}}
                errors={{}}
              />
            </div>
            <div className="my-0">
              <InputSingle
                id='telefono'
                label="Telefono"
                value={data?.contactoTel}
                onChange={() => {}}
                errors={{}}
              />
            </div>
          </div>
        </div>
    </div>
   );
}
 
export default DireccionCard;