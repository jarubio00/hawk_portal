'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

//se quito w-full , se agregp px-2
const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  icon: Icon,
}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        px-3
        justify-center 
        shadow-lg
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-2'}
        ${small ? 'py-1' : 'px-3'}
        ${small ? 'font-light' : 'font-normal'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      <div className="flex flex-row gap-3 items-center justify-center text-sm">
        {Icon && (
          <Icon
            size={14}
          />
        )}
        {label}
      </div>
      
    </button>
   );
}
 
export default Button;