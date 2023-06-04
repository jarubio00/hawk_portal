'use client';

import { FaEdit, FaStar} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import ToolTip from "./ToolTip";

interface ButtonProps {
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMark: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteDisabled?: boolean;
  editDisabled?: boolean;
  defaultDisabled?: boolean;
  defaultDir?: boolean;
  tipo: string; 
}

const Button: React.FC<ButtonProps> = ({ 
  onDelete,
  onEdit,
  onMark,
  deleteDisabled,
  editDisabled,
  defaultDisabled,
  defaultDir,
  tipo
}) => {


  return ( 
    
    <div className="flex flex-row gap-0 items-center">
        {tipo == 'direccion' && <button
          disabled={defaultDir}
          onClick={onMark}
          className={`
            disabled:cursor-not-allowed
            rounded-md
            transition
            text-sm
            p-1
            py-1
            
            ${defaultDir ? 'text-orange-500' : 'text-neutral-400'}
            ${defaultDir ? 'hover:text-orange-500' : 'hover:text-orange-500'}
            
          `}
        >
            <FaStar
              className="h-4 w-4 md:h-5 md:w-5"
            />
        </button>}
      <button
        disabled={deleteDisabled}
        onClick={onEdit}
        className={`
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-md
          transition
          text-sm
          p-1
          py-1
          text-neutral-400
          hover:text-blue-500
          
        `}
      >
          <MdEdit
            className="h-4 w-4 md:h-5 md:w-5"
          />
      </button>
      <button
        disabled={deleteDisabled}
        onClick={onDelete}
        className={`
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-md
          transition
          text-sm
          p-1
          py-1
          text-neutral-400
          hover:text-rose-500
        `}
      >
          <MdDelete
            className="h-4 w-4 md:h-5 md:w-5"
          />
      </button>
     
    </div>
   );
}
 
export default Button;