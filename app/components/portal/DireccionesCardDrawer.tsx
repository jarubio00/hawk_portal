'use client';

import { SafeDireccion,SafeDestino} from "@/app/types";
import ActionButtons from "../ActionButtons";


interface DireccionesCardDrawerProps {
  tipo: string; //direccion,destino
  direccion: SafeDireccion;
  destino?: SafeDestino;
  onSelect: (e: any) => void;
  
}

const DireccionesCardDrawer: React.FC<DireccionesCardDrawerProps> = ({ 
    tipo, 
  direccion,
  destino, 
  onSelect
}) => {
  
  return ( 
    
      <div className={'text-start my-2 shadow-sm bg-white shadow-neutral-300 rounded-md border-1 p-3 w-full  lg:w-3/4 xl:w-3/5 cursor-pointer'}
            onClick={() => onSelect(direccion)}
        >
        <div className="flex flex-row justify-between ">
          <div >
            {tipo == 'direccion' && <div className="text-md font-bold text-gray-400 uppercase">
              {direccion.nombreDireccion}
            </div>}
            <div className="flex flex-row items-center text-xs">
              <div className="font-bold">
                {direccion.contactoNombre}
              </div>
              <div className="font-light text-white text-xs bg-gray-400 rounded-sm hover:bg-blue-400 px-1 py-0 ml-2">
                {direccion.empresa}
              </div>
            </div>
            <div className="text-xs">
              {direccion.calle} {direccion.numero} {direccion.numeroInt}, {direccion.colonia}
            </div>
            <div className="text-xs">
              {
                //@ts-ignore
              direccion.municipio?.municipio}, <span className="">{direccion.cpId} </span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div></div>
        </div>
      </div>
    </div>
   );
}
 
export default DireccionesCardDrawer;