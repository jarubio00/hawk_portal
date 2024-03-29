'use client';

import { SafePaquete} from "@/app/types";
import ActionButtons from "../ActionButtons";


interface DireccionesCardProps {

  paquete: SafePaquete;

  onDelete: (props: any) => void;
  onEdit: (props: any) => void;
  onMark: (props: any) => void;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
}

const DireccionesCard: React.FC<DireccionesCardProps> = ({ 
  paquete,
  onDelete,
  onEdit,
  onMark,
  onSelect
}) => {
  
  return ( 
    
      <div className={'flex flex-col border border-neutral-300 bg-white shadow-lg rounded-lg  my-2 py-1 w-full  lg:w-3/4 xl:w-3/5'}>
        <div className="flex flex-row items-center justify-between px-2 py-1">
          <p className="font-semibold text-foreground text-sm capitalize"> {paquete.nombrePaquete}</p> 
        </div>
        <hr className="my-1"></hr>
        <div className="flex flex-row justify-between px-2 py-1">
          <div >
           
            <div className="flex flex-row items-center text-xs">
              
              <div className="font-light text-white text-xs bg-gray-500 rounded-sm hover:bg-blue-400 px-1 py-0  uppercase">
                {paquete.tipo?.tipo}
              </div>
            </div>
            <div className="text-xs uppercase mt-1">
                ancho: {paquete.paqAncho}cm, alto: {paquete.paqAlto}cm, largo: {paquete.paqLargo}cm - peso: {paquete.paqPeso}Kg 
              </div>
            <div className="text-xs">
              {paquete.paqContenido}
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div></div>
            <ActionButtons 
                tipo={'destino'} // es para no mostrar mark, cambiar
                onDelete={() => onDelete({data: paquete, tipo: 'delete'})}
                deleteDisabled={false}
                onEdit={() => onEdit(paquete)}
                editDisabled={false}
                onMark={() => onMark({data: paquete, tipo: 'mark'})}
                defaultDisabled={false}
                //@ts-ignore
                defaultDir={paquete.default}
            />
        </div>
      </div>
    </div>
   );
}
 
export default DireccionesCard;