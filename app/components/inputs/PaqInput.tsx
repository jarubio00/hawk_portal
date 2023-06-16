'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import {ChangeEventHandler} from 'react';

interface PaqInputProps {
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

const PaqInput: React.FC<PaqInputProps> = ({
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
    <div className={`flex flex-row items-center gap-2`}>
      <label 
        htmlFor={id}
        className={`
          w-20
          cursor-text
          text-xs
          text-neutral-400
          transition
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
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
          text-md
          font-medium
          bg-white 
          disabled:bg-neutral-200
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-2'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      
    </div>
   );
}
 
export default PaqInput;