'use client';

import { FieldErrors, UseFormRegister } from "react-hook-form";
import {RegisterFormType} from '@/app/types'
import { ChangeEventHandler } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps {
    id: any;
    label: string;
    value?: string | undefined;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<RegisterFormType>,
    errors?: string;
    width?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: () => void;
    onBlur?: (event: any) => void;
    maxlength?: number;
    notes?: string;
  }

const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
    type = "text", 
    placeholder,
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
    notes
}) => {
 return (
  <div className='flex flex-col gap-1 relative'>
      <Label htmlFor={id} className="text-xs text-neutral-400 w-full">{label}</Label>
      <Input 
        {...register(id, {required})}
        value={value}
        disabled={disabled}
        type={type} 
        id={id} 
        placeholder={placeholder} 
        className={`${errors && 'border-red-500 border-2'} text-base`}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        />
        <p className="text-[11px] text-blue-500">{notes}</p>
        <p className="text-[11px] text-red-500">{errors}</p>
       
    
  </div>
 );
}

export default FormInput;