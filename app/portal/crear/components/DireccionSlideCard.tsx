'use client';

import {FaStar} from "react-icons/fa";

interface DireccionSlideCardProps {
  data: any;
  onClick: (direccion: any) => void;
  selected?: Boolean;
}

//se quito w-full , se agregp px-2
const DireccionSlideCard: React.FC<DireccionSlideCardProps> = ({ 
  data, 
  onClick,
  selected
}) => {
  return ( 
    <div className={`mx-0 my-4 pt-2 pb-3 px-2 h-auto md:h-28 rounded-lg cursor-pointer shadow-sm md:shadow-md 
            ${selected ? 'border-black border-2 ' : 'border-neutral-200 border hover:shadow-xl hover:border-neutral-400'}`} 
          onClick={() => onClick(data)}>
            
        <div className="flex flex-col ">
        <div className="flex flex-row items-center justify-between ">
          <span className="text-sm text-neutral-400 font-bold uppercase">
              {data.nombreDireccion}
          </span>
          {data.default && <FaStar size={18} className="text-orange-500"/>}
        </div>
        <span className="text-xs truncate ">
            {data.contactoNombre} {JSON.stringify(data.default,null,2)}
        </span>
      
        <span className="text-xs truncate">
            {data.calle} {data.numero} {data.colonia}
        </span>
        <span className="text-xs font-bold truncate hidden md:block">
            {data.municipio.municipio}
        </span>
    </div>
</div>
   );
}
 
export default DireccionSlideCard;