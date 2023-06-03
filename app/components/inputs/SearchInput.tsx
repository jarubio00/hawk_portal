'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {ChangeEventHandler} from 'react';

interface SearchInputProps {
  id: string;
  label: string;
  value?: string | undefined;
  type?: string;
  disabled?: boolean;
  width?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  maxlength?: number;
  onClear?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  width,
  onChange,
  maxlength,
  value,
  onClear
}) => {
  return (
    <div className={`
     ${width ? `w-[${width}]` : "w-full"} 
    relative`}>
        <FaSearch
          size={20}  
          className="
            text-rose-500
            absolute
            top-4
            left-4
          "
        />
        <div className="h-8 w-6 absolute top-3 right-4 cursor-pointer" onClick={onClear}>
          <IoMdClose
            size={24}
            className="
              text-neutral-400
              
            "
            
          />
        </div>
      <input
      
        id={id}
        value={value}
        disabled={disabled}
        placeholder={label}
        type={type}
        //@ts-ignore
        //onInput={(event)=>event.target.value=event.target.value.slice(0,event.target.maxLength)} 
        maxLength={maxlength}
        className={`
          peer
          w-full
          py-3
          font-medium 
          bg-white 
          text-neutral-700
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          focus:border-black
          pl-12
          pr-12
        `}
        onChange={onChange}
      />
    </div>
   );
}
 
export default SearchInput;