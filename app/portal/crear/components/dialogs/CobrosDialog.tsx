'use client';

import { useCallback, useEffect, useState, Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import {FaInfoCircle } from "react-icons/fa";
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


interface CobrosDialogProps {
  isOpen?: boolean;
  onClose: (props: any) => void;
  edit?: boolean;
  resetCobro?: boolean;
  editCobro?: boolean;
}

const CobrosDialog: React.FC<CobrosDialogProps> = ({ 
  isOpen, 
  onClose, 
  edit = false,
  resetCobro,
  editCobro
}) => {

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      montoCobro: ''
    },
  });

  const [confirmarMonto, setConfirmarMonto] = useState(false);
  const [montoFormato, setMontoFormato] = useState('');

  const monto = watch('montoCobro');

  useEffect(() => {
    if(resetCobro) {
      reset();
      setConfirmarMonto(false)
    }
  },[resetCobro])

  useEffect(() => {
    console.log('editcobro')
    if(editCobro) {
      setConfirmarMonto(false)
    }
  },[editCobro])

  const onSubmit:  SubmitHandler<FieldValues> = 
    async (data) => {
      //loader.onOpen();
      
      console.log(data);
      console.log(currencyFormat(parseFloat(data.montoCobro)));

      setConfirmarMonto(true);
      setMontoFormato(currencyFormat(parseFloat(data.montoCobro)));
    
     
    }
 

  const handleClose = useCallback(() => {
   onClose(true);
  }, [onClose]);

  
  if (!isOpen) {
    return null;
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  function currencyFormat(num: number) {
    return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 const handleCancel = () => {
  //reset();
  onClose({confirm: false})

 }

 const handleSiguiente = () => {

  if (!confirmarMonto) {
    handleSubmit(onSubmit)();
  } else {
    setConfirmarMonto(false);
    onClose({confirm: true, data: {cantidad: monto}});
  }
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
                <Dialog.Panel className="w-full max-w-xl  m-4 md:m-0 transform  rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="div"
                    className="flex flex-row justify-between items-center mt-1 mb-3"
                  >
                    <p className="text-lg font-bold leading-6 uppercase ">Cobro a destinatario</p>
                    <div></div>
                  </Dialog.Title>
                  <hr></hr>
                  <Dialog.Description
                   as="div"
                   className="flex flex-row  items-center text-md text-neutral-500 my-4"
                  >
                    <span className="ml-2">Cobraremos al destinatario el monto que nos indiques al momento de entregar el paquete</span>
                  </Dialog.Description>
                 { !confirmarMonto && <div>
                    <div className="my-4 w-56 mx-auto flex flex-col">
                      <CobroInput
                            id="montoCobro"
                            type="number"
                            label="Monto"
                            disabled={confirmarMonto}
                            register={register}
                            errors={errors}
                            formatPrice
                            required
                            onChange={(event: any) => {
                              setCustomValue('montoCobro', event.target.value);
                            }}
                            />
                        <div className="text-xs text-neutral-500  mt-1">Comisión: ${(monto*.035).toFixed(2)}</div>
                    </div>
                    <div className="my-6 mx-4 flex flex-row items-center  gap-0">
                          <CheckboxInput
                            id='terms'
                            disabled={confirmarMonto}
                            required
                            register={register}
                            errors={errors}
                            onChange={(event: any) => {
                              setCustomValue('terms', event.target.checked);
                              console.log(event.target.checked);
                            }}
                    
                          />
                          <div className="mb-0 ">
                            <span className="text-sm">Acepto los {' '}
                              <span className="text-sm text-blue-500  underline cursor-pointer">términos y condiciones</span>
                            </span>
                          </div>
                    </div>
                  </div>}
                  
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
                        label="Siguiente"
                        //onClick={() =>onClose({confirm: true})}
                        onClick={handleSiguiente}

                      />
                    </div>
                  </div>}

                  {confirmarMonto && <div className="flex flex-row w-full items-center justify-end mt-6 mb-2"> 
                    <div className="w-24 ml-2">
                      <Button
                          outline
                          label="Cambiar"
                          onClick={() => setConfirmarMonto(false)}
                        />
                    </div>
                    <div className="ml-2 w-56">
                      <Button
                        label={`Confirmar cobro de $${montoFormato}`}
                        //onClick={() =>onClose({confirm: true})}
                        onClick={handleSiguiente}

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

export default CobrosDialog;