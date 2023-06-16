'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import {ChangeEventHandler} from 'react';

interface CobroInputProps {
  id: string;
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
  maxlength?: number;
}

const CobroInput: React.FC<CobroInputProps> = ({
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
  onBlur
}) => {
  return (
      <div>
       
        <div className={`
          ${width ? `w-[${width}]` : "w-full"} 
        relative`}>
        
        {formatPrice && (
          <BiDollar
            size={20}
            className="
              text-neutral-700
              absolute
              top-4
              left-2
            "
          />
        )}
        <input
        
          id={id}
          value={value}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={label}
          type={type}
          //@ts-ignore
          //onInput={(event)=>event.target.value=event.target.value.slice(0,event.target.maxLength)}
          maxLength={maxlength}
          className={`
            peer
            w-full
            p-3

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
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          `}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        
            </div>
      </div>
   );
}
 
export default CobroInput;