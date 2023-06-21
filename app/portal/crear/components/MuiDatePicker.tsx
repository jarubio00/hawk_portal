
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import esLocale from 'date-fns/locale/es';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import {DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models';
import ButtonMui from '@mui/material/Button';
import {IoMdCalendar} from "react-icons/io";
import { BsMenuButton } from "react-icons/bs";
import { useState } from 'react';
import {format, isDate} from 'date-fns';





interface MuiDatePickerProps {
    dpOpen: boolean;
    setDpOpen: (value: boolean) => void;
    onChange: (value: any) => void;
    value: any;
    bloqued: any;
    datetime: any;
  }
  

  const MuiDatePicker: React.FC<MuiDatePickerProps> = ({ 
    dpOpen,
    setDpOpen,
    onChange,
    value,
    bloqued,
    datetime
  }) => {

    interface ButtonFieldProps
  extends UseDateFieldProps<dateFns>,
    BaseSingleInputFieldProps<
      dateFns | null,
      dateFns,
      FieldSection,
      DateValidationError
    > {
}

function ButtonField(props: ButtonFieldProps) {
  const {

    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <button
    className="p-2 border-2 border-black shadow-md rounded-md"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      //@ts-ignore
      onClick={() => setDpOpen?.((prev) => !prev)}
    >
      <div className="w-44 flex flex-row justify-between items-center">
        <p className="text-sm mr-4">{label}</p> 
        <IoMdCalendar />
        </div>
    </button>
  );
}

function ButtonDatePicker(
    props: Omit<DatePickerProps<dateFns>, 'open' | 'onOpen' | 'onClose'>,
  ) {
  
    return (
      <DatePicker
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setDpOpen } as any }}
        {...props}
        open={dpOpen}
        onClose={() => setDpOpen(false)}
        onOpen={() => setDpOpen(true)}
      />
    );
  }



  const disableWeekends = (date: any) => {
    //console.log(date.toISOString().slice(0, 10))
      let bMatched = false;
       if(date.getDay() === 0) {
           return true;
       } else {
           bloqued.map((val: any) => { 
               if (val == date.toISOString().slice(0, 10)) {
                  bMatched = true;
               }
           });
          if (isDate(datetime) && format(datetime,`yyyy-MM-dd`) == date.toISOString().slice(0, 10)) {
            if (datetime.getHours() >= 15 ) {
              return true;
            } 
          }
       }  
       return bMatched;
     }
  
    return ( 
        <ButtonDatePicker
            label={` ${
            //@ts-ignore
                value == null ? 'Selecciona...' : value.toISOString().slice(0, 10)
            }`}
            value={value}
            disablePast
            closeOnSelect
            onChange={onChange}
            shouldDisableDate={disableWeekends}
        />
     );
  }
   
  export default MuiDatePicker;