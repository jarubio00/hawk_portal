'use client';

import { SafeDireccion,SafeDestino} from "@/app/types";
import ActionButtons from "../ActionButtons";
import { direccionBadge } from "../utils/helpers";


interface DireccionesCardProps {
  tipo: string; //direccion,destino
  direccion: SafeDireccion;
  destino?: SafeDestino;
  onDelete: (props: any) => void;
  onEdit: (props: any) => void;
  onMark: (props: any) => void;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
}

const DireccionesCard: React.FC<DireccionesCardProps> = ({ 
    tipo, 
  direccion,
  destino, 
  onDelete,
  onEdit,
  onMark,
  onSelect
}) => {

  
  
  return ( 
    
      <div className={'flex flex-col border border-neutral-300 bg-white shadow-lg rounded-lg  my-2 py-1 w-full  lg:w-3/4 xl:w-3/5'}>
          <div className="flex flex-row items-center justify-between px-2 py-1">
             { <>
              { tipo == 'direccion' ? 
                direccionBadge(direccion) 
              : 
              <p className="font-semibold text-foreground text-sm capitalize"> {direccion.contactoNombre}</p> }
             
             
             </>}
          </div>
          <hr className="my-1"></hr>
        
        <div className="flex flex-row justify-between px-2 py-1">
          <div >
            
            <div className="flex flex-row items-center text-xs">
              <div className="text-primary font-semibold">
                {tipo == 'direccion' ? direccion.contactoNombre : direccion.contactoTel}
              </div>
              <div className="font-light text-white text-xs bg-gray-500 rounded-sm hover:bg-blue-400 px-1 py-0 ml-2">
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
            <ActionButtons 
                tipo={tipo}
                onDelete={() => onDelete({data: direccion, tipo: 'delete'})}
                deleteDisabled={false}
                onEdit={() => onEdit(direccion)}
                editDisabled={false}
                onMark={() => onMark({data: direccion, tipo: 'mark'})}
                defaultDisabled={false}
                //@ts-ignore
                defaultDir={direccion.default}
            />
        </div>
      </div>
    </div>
   );
}
 
export default DireccionesCard;