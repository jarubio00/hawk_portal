'use client';

import { SafeDireccion,SafeDestino, SafePaquete} from "@/app/types";
import ActionButtons from "../ActionButtons";


interface PaquetesCardDrawerProps {
  tipo: string; //direccion,destino
  paquete: SafePaquete;
  onSelect: (e: any) => void;
  
}

const PaquetesCardDrawer: React.FC<PaquetesCardDrawerProps> = ({ 
    tipo, 
  paquete, 
  onSelect
}) => {
  
  return ( 
    
      <div className={'text-start my-2 shadow-sm bg-white shadow-neutral-300 rounded-md border-1 p-3 w-full  lg:w-3/4 xl:w-3/5 cursor-pointer'}
            onClick={() => onSelect(paquete)}
        >
       <div >
            
            <div className="flex flex-row items-center gap-1 text-xs">
              <div className="text-xs font-bold  uppercase">
                {paquete.nombrePaquete}
              </div>
              <div className=" text-blue-500 text-xs   uppercase">
                {paquete.tipo?.tipo}
              </div>
            </div>
            <div className="text-xs uppercase mt-1">
                ancho: {paquete.paqAncho}cm, alto: {paquete.paqAlto}cm, largo: {paquete.paqLargo}cm  
            </div>
            <div className="text-xs uppercase mt-1">
              peso: {paquete.paqPeso}Kg 
            </div>
            <div className="text-xs">
              {paquete.paqContenido}
            </div>
          </div>
    </div>
   );
}
 
export default PaquetesCardDrawer;