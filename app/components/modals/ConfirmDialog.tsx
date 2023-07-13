'use client';

import { useCallback, useEffect, useState, Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import {FaInfoCircle } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react'


import Button from "../Button";

interface ConfirmDialogProps {
  isOpen?: boolean;
  onClose: (props: any) => void;
  dialogContent: any;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  isOpen, 
  onClose, 
  dialogContent
}) => {
 

  const handleClose = useCallback(() => {
   onClose(true);
  }, [onClose]);

  
  if (!isOpen) {
    return null;
  }

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => onClose(false)}>
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
                    <p className="text-lg font-bold leading-6 uppercase ">{dialogContent.title}</p>
                    <div></div>
                  </Dialog.Title>
                  <hr></hr>
                  <Dialog.Description
                   as="div"
                   className="flex flex-row  items-center text-md text-neutral-500 my-4"
                  >
                    {dialogContent.tipo != 'confirm' &&<FaInfoCircle size={22} className="text-blue-500"/>}
                    <span className="ml-2">{dialogContent.notes}</span>

                  </Dialog.Description>
                  
                  <div className="flex flex-row  items-center justify-end mt-6 mb-2"> 
                    <div className="w-24 ml-2">
                      <Button
                          outline
                          label="Cancelar"
                          onClick={() =>onClose({confirm: false})}
                        />
                    </div>
                    <div className="w-24 ml-2">
                      <Button
                        label="Confirmar"
                        onClick={() =>onClose({confirm: true, data: dialogContent.data, tipo: dialogContent.tipo})}
                      />
                    </div>
                  </div>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
     
    </>
  );
}

export default ConfirmDialog;