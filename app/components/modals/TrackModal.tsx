'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
//import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";


import useTrackModal from "@/app/hooks/useTrackModal";

import ModalTrack from "./ModalTrack";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const TrackModal= () => {
  const TrackModal = useTrackModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
      toast.success('Registered!');
      TrackModal.onClose();
    })
    .catch((error) => {
        //console.log('error',error);
      toast.error(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const onToggle = useCallback(() => {
    TrackModal.onClose();

  }, [TrackModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      
      <Input
        id="track"
        label="Número de guía"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex w-full  justify-center">
        <ol className="relative text-gray-500 border-l border-rose-500 dark:border-gray-700 dark:text-gray-400">                  
          <li className="mb-10 ml-6">            
              <span className="absolute flex items-center justify-center w-7 h-7 bg-rose-500 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                  <svg aria-hidden="true" className="w-5 h-5 text-white dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              </span>
              <h3 className="font-bold leading-tight">Guía programada</h3>
              <p className="text-sm">Step details here</p>
          </li>
          <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-7 h-7 bg-rose-500 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-400 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </span>
              <h3 className="font-bold leading-tight">Recolectado</h3>
              <p className="text-sm">Step details here</p>
          </li>
          <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
              </span>
              <h3 className="font-bold leading-tight">Central</h3>
              <p className="text-sm">Step details here</p>
          </li>
          <li className="ml-6">
              <span className="absolute flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              </span>
              <h3 className="font-bold leading-tight">Entregado</h3>
              <p className="text-sm">Step details here</p>
          </li>
        </ol>

      </div>
      <div 
        className="
          text-neutral-500 
          text-center 
          my-4 
          font-bold
        "
      >
        <p>
          <span 
            onClick={onToggle} 
            className="
              text-rose-500
              cursor-pointer 
              hover:underline
            "
            > Ver más...</span>
        </p>
      </div>
    </div>
  )

  return (
    <ModalTrack
      disabled={isLoading}
      isOpen={TrackModal.isOpen}
      title="Rastrea tu paquete"
      actionLabel="Rastrear"
      onClose={TrackModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default TrackModal;