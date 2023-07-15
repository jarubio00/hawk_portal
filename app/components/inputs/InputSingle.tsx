'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import {ChangeEventHandler} from 'react';

interface InputSingleProps {
  id: string;
  label: string;
  value?: string | undefined;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors?: FieldErrors;
  width?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;
  maxlength?: number;
}

const InputSingle: React.FC<InputSingleProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  required,
  errors,
  width,
  onChange,
  maxlength,
  value,
  onFocus,
  onBlur
}) => {
  return (
    <div className={`
     ${width ? `w-[${width}]` : "w-full"} 
    relative`}>
      {formatPrice && (
        <BiDollar
          size={24}  
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
      
        id={id}
        value={value}
        disabled={disabled}
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
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          
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
          
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
export default InputSingle;