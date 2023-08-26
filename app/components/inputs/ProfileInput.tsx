'use client';

import { FieldErrors, UseFormRegister } from "react-hook-form";
import {RegisterFormType} from '@/app/types'
import { ChangeEventHandler } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfileInputProps {
    id: any;
    label: string;
    value?: string | undefined;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    errors?: string;
    width?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: () => void;
    onBlur?: (event: any) => void;
    maxlength?: number;
    notes?: string;
    ref?: any;
  }

const ProfileInput: React.FC<ProfileInputProps> = ({
    id,
    label,
    type = "text", 
    placeholder,
    disabled, 
    formatPrice,
    required,
    errors,
    width,
    onChange,
    maxlength,
    value,
    onFocus,
    onBlur,
    notes,
    ref
}) => {
 return (
  <div className='flex flex-col gap-1 relative'>
      <Label htmlFor={id} className="text-xs text-neutral-400 w-full">{label}</Label>
      <Input 
        value={value}
        disabled={disabled}
        type={type} 
        id={id} 
        placeholder={placeholder} 
        className={`py-1 
          ${errors && 'border-red-500 border-2'} 
          text-base
          disabled:bg-white
          disabled:border-0
          disabled:text-primary 
          disabled:font-semibold
          disabled:opacity-100

          `}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        />
        <p className="text-[11px] text-blue-500">{notes}</p>
        <p className="text-[11px] text-red-500">{errors}</p>
       
    
  </div>
 );
}

export default ProfileInput;