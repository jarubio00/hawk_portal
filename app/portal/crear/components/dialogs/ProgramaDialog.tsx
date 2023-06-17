'use client';

import { useCallback, useEffect, useState, Fragment } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import esLocale from 'date-fns/locale/es';
import { Dialog, Transition } from '@headlessui/react'
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";

import Button from "@/app/components/Button";
import CobroInput from "@/app/components/inputs/CobroInput";
import { Checkbox } from "@material-tailwind/react";
import CheckboxInput from "@/app/components/inputs/CheckboxInput";
import {TextField} from '@mui/material';


interface ProgramaDialogProps {
  isOpen?: boolean;
  onClose: (props: any) => void;
  tipo: string;
  title: string;
  subtitle: string;
}

const ProgramaDialog: React.FC<ProgramaDialogProps> = ({ 
  isOpen, 
  onClose, 
  tipo,
  title,
  subtitle
}) => {

  

  const [confirmarMonto, setConfirmarMonto] = useState(false);
  const [montoFormato, setMontoFormato] = useState('');
  const [valueBasic, setValueBasic] = useState(null);
  const [dpOpen, setDpOpen] = useState(false);
  const [fechaState, setFechaState] = useState(null);
  const [bloqueState, setBloqueState] = useState(0);
  const [errorText, setErrorText] = useState('');
  const [dateSelected, setDateSelected] = useState(false);
  const [bloquesDisp, setBloquesDisp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bloqued, setBloqued] = useState([]);

  useEffect(() => {
   
  },[])

 

 
 

  const handleClose = useCallback(() => {
   onClose(true);
  }, [onClose]);

  
  if (!isOpen) {
    return null;
  }



 

 const handleCancel = () => {
  setValueBasic(null);
  onClose({confirm: false})

 }

 const fetchDateValidator = async (date: any) => {
        
  const apiUrl = `/api/v1/pedidos/bloquevalrec`;
  const apiData = {fecha: date};

 
}

const handleDateChange = (e: any) => {
  setBloqueState(0);
  setIsLoading(true);
  console.log(e);
  setValueBasic(e);
  fetchDateValidator(e);
  setFechaState(e);
  setDateSelected(true);
};

const handleBloqueChange = (e: any) => {

 const bloque = e.target.value;
 console.log(bloque);
 setBloqueState(bloque);
 setErrorText('');

};

const disableWeekends = (date: any) => {
 let bMatched = false;
  if(date.getDay() === 0) {
      return true;
  } else {
      bloqued.map((val: any) => {
          
          if (val == date.toISOString().slice(0, 10)) {
             bMatched = true;
          
          }
      });
  }
  return bMatched;
}


  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => onClose(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" m-4 mx-4 md:m-0 min-w-96 transform  rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="div"
                    className="flex flex-col mt-1 mb-3 w-96"
                  >
                    <p className="text-xs font-medium ">Programar</p>
                    <p className="text-lg font-bold  text-rose-500 uppercase ">{title}</p>
                    <p className="text-xs font-medium text-neutral-500">{subtitle}</p>
                    <div></div>
                  </Dialog.Title>
                  <hr></hr>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                    <DesktopDatePicker
                    //@ts-ignore
                        inputFormat="dd/MM/yyyy"
                        open={dpOpen}
                        onOpen={() => setDpOpen(true)}
                        onClose={() => setDpOpen(false)}
                        disablePast
                        renderInput={(props: any) => <TextField  fullWidth {...props} onClick={(e) => setDpOpen(true)} />}
                        inputProps={{placeholder :'Selecciona la fecha', readOnly: true}}
                        value={valueBasic}
                        closeOnSelect
                        onChange={(newValue) => {handleDateChange(newValue)}}
                        shouldDisableDate={disableWeekends}
                    />
                </LocalizationProvider>
                 
                  
                  {!confirmarMonto && <div className="flex flex-row  items-center justify-end mt-6 mb-2"> 
                    <div className="w-24 ml-2">
                      <Button
                          outline
                          label="Cancelar"
                          onClick={handleCancel}
                        />
                    </div>
                    <div className="w-24 ml-2">
                      <Button
                        label="Usar"
                        //onClick={() =>onClose({confirm: true})}
                        onClick={() => {}}

                      />
                    </div>
                  </div>}

                 
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
     
    </>
  );
}

export default ProgramaDialog;