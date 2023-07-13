'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import {ChangeEventHandler, useEffect} from 'react';

interface CheckboxInputProps {
  id: string;
  value?: string | undefined;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onBlur?: () => void;

}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  type = "checkbox", 
  disabled, 
  register,
  required,
  errors,
  onChange,
  value,
  onFocus,
  onBlur,

}) => {


  

  return (
    <div className="">
     
      <input
        id={id}
        value={value}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          w-4 h-4 p-1  m-2 text-blue-500 bg-gray-100 rounded cursor-pointer 
          ${errors[id] ? 'ring-2 ring-red-500 ring-offset-2' : 'ring-0'}
          ${errors[id] ? 'focus:ring-red-500' : 'focus:ring-0'}
        `}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
   );
}
 
export default CheckboxInput;