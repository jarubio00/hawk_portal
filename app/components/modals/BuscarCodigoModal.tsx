'use client';

import axios from "axios";
import { signIn } from 'next-auth/react';

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

import useBuscarCodigoModal from "@/app/hooks/useBuscarCodigoModal";
import { useRouter } from "next/navigation";

import ModalSingle from "./ModalSingle";
import Heading from "../Heading";
import Button from "../Button";
import BuscarCodigo from "../portal/BuscarCodigo";

const BuscarCodigoModal= () => {
  const router = useRouter();
  const buscarCodigoModal = useBuscarCodigoModal();
  const [isLoading, setIsLoading] = useState(false);

  

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Códigos postales"
        subtitle="Busca tu código postal"
      />
     
    </div>
  )


  return (
    <ModalSingle
      isOpen={buscarCodigoModal.isOpen}
      title="Register"
      onClose={buscarCodigoModal.onClose}
      body={bodyContent}
    />
  );
}

export default BuscarCodigoModal;