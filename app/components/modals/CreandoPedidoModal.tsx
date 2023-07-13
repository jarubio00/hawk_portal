'use client';

import { useCallback, useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {BsCheckCircle} from "react-icons/bs"

import useCreandoPedidoModal from "@/app/hooks/useCreandoPedidoModal";
import useLoader from "@/app/hooks/useLoader";

import { crearPedido } from "@/app/actions/apiQuerys";
import { PulseLoader } from "react-spinners";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import Button from "../Button";
import ModalCreando from "./ModalCreando";

const CreandoPedidoModal = () => {
  const router = useRouter();
  const loader = useLoader();
  const CreandoPedidoModal = useCreandoPedidoModal();
  const [isLoading, setIsLoading] = useState(true);

  const {updateActiveStep , pedido, saveCotizacion, saveMetodoPago} = useContext(PedidoContext) as PedidoContextType;
  const shareUrl = 'https://hawkportal.lamensajeria.mx/rastreo';

  const bodyContent = (
    <div className="flex flex-col gap-4">
     <div className="mt-4 mx-auto">
        <p className="text-lg font-bold">Creando envío...</p>
     </div>
     <div className="my-6 w-40 h-40 flex items-center justify-center mx-auto">
        {isLoading ? <PulseLoader
          size={30}
          color="#FF6B00"
          className="ml-0 mt-0"
          />  :
          
          <div className="flex flex-col animate-fadeIn animate-scaleIn mx-auto my-auto">
            <BsCheckCircle size={100} className="text-green-500 "/>
            <div className="my-2 flex flex-col gap-2">
              <p className="text-sm font-bold">No. Guía: 811345</p>
              <div className="flex flex-row items-center gap-3">
              
              <div>
                <WhatsappShareButton
                  url={shareUrl}
                  title="Rastrea tu envío"
                  separator=":: "
                  >
                    <WhatsappIcon size={25} round />
                </WhatsappShareButton>
              </div>

              <FacebookShareButton
                url={shareUrl}
                quote='Rastrea tu envío'
              >
               <FacebookIcon size={25} round />
              </FacebookShareButton>

              

              <EmailShareButton
                url={shareUrl}
                subject='Rastrea tu envío'
                body="Entra al siguiente link:"
              >
                <EmailIcon size={25} round />
              </EmailShareButton>
              </div>
            </div>
          </div>
          
          
          
          }
     </div>
     
     
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continuar con Google"
        icon={FcGoogle}
        onClick={() => loader.onOpen()}
      />

    </div>
  )

  return (
    <ModalCreando
      
      isOpen={CreandoPedidoModal.isOpen}
      title="Entrar"
      actionLabel="Continuar"
      onClose={CreandoPedidoModal.onClose}
      onSubmit={() => {}}
      secondaryAction={() => setIsLoading(!isLoading)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default CreandoPedidoModal;