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
    errors: FieldErrors;
    width?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: () => void;
    onBlur?: () => void;
    maxlength?: number;
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
    onBlur
}) => {
 return (
  <div className='flex flex-col gap-1 relative'>
      <Label htmlFor={id}>{label}</Label>
      <Input 
        {...register(id, {required})}
        value={value}
        disabled={disabled}
        type={type} 
        id={id} 
        placeholder={placeholder} 
        className={`${errors && 'border-red-500'}`}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        />
        {Object.keys(errors).map((key: any) => {

            if (key === id) {
                console.log('key match')
                
                return (
                    <p className="text-[11px] text-red">{key.message}</p>
                )
            } else {
                return (
                    <p className="text-[11px] text-red">{' '}</p>
                )
            }
            
        })}
    
  </div>
 );
}

export default FormInput;