'use client';
import { bloqueToString, namedDateString } from "@/app/components/utils/helpers";
import { SafeRecoleccion } from "@/app/types";
interface NodataProps {
  onClick?: () => void;
  data?: SafeRecoleccion;
  key?: any;
  label: string;
}

const Nodata: React.FC<NodataProps> = ({
  onClick,
  data,
  key,
  label
}) => {
  return ( 
    <div key={key} className="p-4 text-xs ">
        {label}
    </div>
   );
}
 
export default Nodata;