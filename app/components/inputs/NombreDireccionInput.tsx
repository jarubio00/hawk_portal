'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { IconType } from "react-icons";
import { BiDollar } from "react-icons/bi";
import {ChangeEventHandler, useEffect, useState} from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {FaHome,FaStore,FaBuilding,FaWarehouse} from "react-icons/fa"

type RegisterForm = {
  email: string;
  nombre: string;
  password: string;
  confirmPassword: string;
  celular: string;
}

interface InputProps {
  id: any;
  label: string;
  value?: string | undefined;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors;
  width?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  onColor: (val: string) => void;
  onIcon: (val: string) => void;
  maxlength?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
  width,
  onChange,
  maxlength,
  value,
  onFocus,
  onBlur,
  onColor,
  onIcon
}) => {

  const [icon,setIcon] = useState('home');
  const [color,setColor] = useState('#0ea5e9');
  const [colorBg,setColorBg] = useState('bg-[#FFFFFF]');

  useEffect(() => {
    //handleColorBg('#dc2626');
  },[])

  const handleColor = (val: string) => {
    setColor(val);
    onColor(val);
  }

  const handleIcon = (val: string) => {
    setIcon(val);
    onIcon(val);
  }


  return (
    <div className={`
     ${width ? `w-[${width}]` : "w-full"} 
    relative`}>
      <div className="flex flex-row gap-2 absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="z-40">
              { icon == 'home' && <FaHome size={30} className="w-8 h-8 text-neutral-700 p-1 border border-neutral-200 rounded-sm"/>}
              { icon == 'tienda' && <FaStore size={30} className="w-8 h-8 text-neutral-700 p-1 border border-neutral-200 rounded-sm"/>}
              { icon == 'oficina' && <FaBuilding size={30} className="w-8 h-8 text-neutral-700 p-1 border border-neutral-200 rounded-sm"/>}
              { icon == 'bodega' && <FaWarehouse size={30} className="w-8 h-8 text-neutral-700 p-1 border border-neutral-200 rounded-sm"/>}
          </DropdownMenuTrigger>
            <DropdownMenuContent className="m-0 w-48">
              <div className="flex flex-row justify-center">
              <DropdownMenuItem>
                <FaHome size={30} className={`w-8 h-8 text-neutral-700 p-1 ${icon == 'home' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                  rounded-sm cursor-pointer`} onClick={() => handleIcon('home')}/>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <FaStore size={30} className={`w-8 h-8 text-neutral-700 p-1 ${icon == 'tienda' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                rounded-sm cursor-pointer`} onClick={() => handleIcon('tienda')}/>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaBuilding size={30} className={`w-8 h-8 text-neutral-700 p-1 ${icon == 'oficina' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                  rounded-sm cursor-pointer`} onClick={() => handleIcon('oficina')}/>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaWarehouse size={30} className={`w-8 h-8 first-line:text-neutral-700 p-1 ${icon == 'bodega' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                  rounded-sm cursor-pointer`} onClick={() => handleIcon('bodega')}/>
              </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>


          <DropdownMenu>
          <DropdownMenuTrigger className="z-40">
              
              { color == '#0ea5e9' && <div className={`w-8 h-8 bg-[#0ea5e9] border border-neutral-200 rounded-sm`}></div>}
              { color == '#db2777' && <div className={`w-8 h-8 bg-[#db2777] border border-neutral-200 rounded-sm`}></div>}
              { color == '#f59e0b' && <div className={`w-8 h-8 bg-[#f59e0b] border border-neutral-200 rounded-sm`}></div>}
              { color == '#10b981' && <div className={`w-8 h-8 bg-[#10b981] border border-neutral-200 rounded-sm`}></div>}
          </DropdownMenuTrigger>
            <DropdownMenuContent className="m-0 w-48">
              <div className="flex flex-row justify-center">
              <DropdownMenuItem>
              <div className={`w-8 h-8 bg-[#0ea5e9] cursor-pointer
                ${color === '#0ea5e9' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                rounded-sm`} onClick={() => handleColor('#0ea5e9')}></div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className={`w-8 h-8 bg-[#db2777] cursor-pointer
                  ${color === '#db2777' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                  rounded-sm`} onClick={() => handleColor('#db2777')}></div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className={`w-8 h-8 bg-[#f59e0b] cursor-pointer
                  ${color === '#f59e0b' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                  rounded-sm`} onClick={() => handleColor('#f59e0b')}></div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className={`w-8 h-8 bg-[#10b981] cursor-pointer
                  ${color === '#10b981' ? 'border-rose-500 border-2' : 'border-neutral-200 border'} 
                  rounded-sm`} onClick={() => handleColor('#10b981')}></div>
              </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
            
      </div>
      <input
      
        id={id}
        value={value}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        //@ts-ignore
        //onInput={(event)=>event.target.value=event.target.value.slice(0,event.target.maxLength)} 
        maxLength={maxlength}
        className={`
          peer
          w-full
          p-2
          pt-6
          font-medium 
          bg-white 
          disabled:bg-neutral-200
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-red-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-red-500' : 'focus:border-black'}
        `}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label 
        htmlFor={id}
        className={`
          cursor-text
          absolute 
          text-sm
          text-neutral-400
          duration-150 
          transform 
          -translate-y-3 
          top-4 
          w-full
          origin-[0] 
          ${formatPrice ? 'left-9 text-md' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
export default Input;