'use client';

import { useCallback, useEffect, useState, Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { Dialog, Transition } from '@headlessui/react'
import BuscarCodigo from "../portal/BuscarCodigo";

import Button from "../Button";

interface BuscarCodigoDialogProps {
  isOpen?: boolean;
  onClose: () => void;
  useCp: (cp: any) => void;
}

const BuscarCodigoDialog: React.FC<BuscarCodigoDialogProps> = ({ 
  isOpen, 
  onClose, 
  useCp,
}) => {
 

  const handleClose = useCallback(() => {
   onClose()
  }, [onClose]);

  
  if (!isOpen) {
    return null;
  }

  return (
    <>

<Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[9997]" onClose={onClose}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative md:absolute right-0 md:right-72 w-full max-w-md  transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="div"
                    className="flex flex-row justify-between items-center"
                  >
                    <p className="text-lg font-medium leading-6 text-gray-900">Buscar código postal</p>
                    <button className="p-2 border-0 hover:opacity-70 transition" onClick={onClose}>
                        <IoMdClose size={28} />
                    </button>
                  </Dialog.Title>
                  <div > 
                    <BuscarCodigo useCp={useCp} onClose={onClose}/>
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

export default BuscarCodigoDialog;