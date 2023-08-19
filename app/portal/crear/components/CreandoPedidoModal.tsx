'use client';

import { useCallback, useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {BsCheckCircle} from "react-icons/bs"
import {MdErrorOutline} from "react-icons/md";


import useCreandoPedidoModal from "@/app/hooks/useCreandoPedidoModal";
import useLoader from "@/app/hooks/useLoader";

import { appendPedido, crearPedido } from "@/app/actions/apiQuerys";
import { PulseLoader } from "react-spinners";


import Button from "../../../components/Button";
import ModalCreando from "./ModalCreando";
import GuiaShare from "@/app/portal/crear/components/GuiaShare";
import { uploadFile } from "@/app/actions/apiQuerys";

type UploadFile = {
  file: File;
  fileName: string;
  pedidoId: number;
 
}

const CreandoPedidoModal = () => {
  const router = useRouter();
  const loader = useLoader();
  const CreandoPedidoModal = useCreandoPedidoModal();
  const [isLoading, setIsLoading] = useState(false);
  const [created,setCreated] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [guiaBox, setGuiaBox] = useState(false);
  const [pedidoCreado,setPedidoCreado] = useState<any>({});

  const {updateActiveStep , pedido, saveCotizacion, saveMetodoPago, resetContext} = useContext(PedidoContext) as PedidoContextType;
  
  useEffect(() => {
    if (CreandoPedidoModal.isOpen) {
      setCreated(false);
      setGuiaBox(false);
      setIsLoading(true);
      console.log(pedido);
      if (pedido?.append?.enabled) {
        if (pedido.append.recoleccion) {
          
          //handleAppendPedido(pedido.append.recoleccion.id);
        } else {
          console.log('Error en la recoleccion')
        }
       
      } else  {
        //handleCrearPedido();
      }
      
    } else {
      setCreated(false);
      setGuiaBox(false);
      setIsLoading(true);
    }
   
    
  },[CreandoPedidoModal.isOpen])
  

  const pedidoExitoso = () => {
    resetContext();
    loader.onClose();
    router.replace('/portal/adm/mispedidos')
    router.refresh();
    CreandoPedidoModal.onClose();
  }

  const handleCrearPedido = async () => {
     if (pedido) {
    const pedidoResult = await crearPedido(pedido);
    console.log(pedidoResult);

    if (pedidoResult.status == 1) {
      if (pedido.metodoPago?.formaPagoId == 2) {
        if (pedido?.metodoPago?.comprobanteImageFile && pedidoResult?.response?.data.pedidoId) {
          const file:UploadFile = {
            file: pedido?.metodoPago?.comprobanteImageFile,
            fileName: pedido?.metodoPago?.comprobanteImageFile?.name,
            pedidoId: pedidoResult?.response?.data.pedidoId,
          } 
          const upload = await handleuploadFile(file);
          
        } else {
          console.log('algo salio mal');
        }
      }
      setPedidoCreado(pedidoResult?.response?.data);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setGuiaBox(true);
        setCreated(true);
        }, 1500);
    } else if (pedidoResult.status == 2) {
        setError(true);
        setErrorMessage(pedidoResult.statusMessage)
        setIsLoading(false);
    }
    
  }
  }

  const handleAppendPedido = async (recoleccionId: number) => {
    if (pedido) {
   const pedidoResult = await appendPedido(pedido,recoleccionId);
   console.log(pedidoResult);

   if (pedidoResult.status == 1) {
     if (pedido.metodoPago?.formaPagoId == 2) {
       if (pedido?.metodoPago?.comprobanteImageFile && pedidoResult?.response?.data.pedidoId) {
         const file:UploadFile = {
           file: pedido?.metodoPago?.comprobanteImageFile,
           fileName: pedido?.metodoPago?.comprobanteImageFile?.name,
           pedidoId: pedidoResult?.response?.data.pedidoId,
         } 
         const upload = await handleuploadFile(file);
         
       } else {
         console.log('algo salio mal');
       }
     }
     setPedidoCreado(pedidoResult?.response?.data);
     const timer = setTimeout(() => {
       setIsLoading(false);
       setGuiaBox(true);
       setCreated(true);
       }, 1500);
   } else if (pedidoResult.status == 2) {
       setError(true);
       setErrorMessage(pedidoResult.statusMessage)
       setIsLoading(false);
   }
   
 }
 }

  

  const handleuploadFile = async (file: UploadFile) => {
    
      if (pedido?.metodoPago?.comprobanteImageFile) {
      
       let formData = new FormData();
       formData.append('file',file?.file);
       formData.append('fileName',file?.fileName);
       formData.append('pedido', `${file.pedidoId}`);
    
        const up = await uploadFile(formData);
       
        }
      }

  
  const bodyContent = (
    <div className="flex flex-col h-full gap-2 justify-center items-center">
     <div className="mt-4 mx-auto">
        {isLoading && !pedido?.append?.enabled && <p className="text-lg font-bold">Generando envío...</p>}
        {isLoading && pedido?.append?.enabled && <p className="text-lg font-bold">Agregando envío a recolección {pedido.append.recoleccion?.id}...</p>}
     </div>
     <div className="w-40 h-28 flex items-center justify-center mx-auto">
        {isLoading ? <PulseLoader
          size={30}
          color="#FF6B00"
          className="ml-0 mt-0"
          />  :
          
          <div className="flex flex-col animate-fadeIn animate-scaleIn mx-auto my-auto">
            {!error ? <BsCheckCircle size={100} className="text-green-500 "/>
              :
                <>
                  <MdErrorOutline size={100} className="text-red-500 mx-auto "/>
                  <p className="text-xs text-center">{errorMessage}</p>
                </>
          }
          </div>
          }
     </div>
     <div className="my-2 flex  mx-auto">
        <div className="h-20">
          {guiaBox && <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-center">Tu envío fue generado exitosamente, gracias por tu preferencia.</p>
            <p className="text-md font-bold text-center mb-1">Guía: {pedidoCreado?.pedidoId}</p>
            <GuiaShare guia={pedidoCreado?.pedidoId} />
          
          </div>}
        </div>
      </div>
     
    </div>
  )

  const footerContent = (
    <div className="flex flex-col items-center justify-center gap-4 mt-1 ">
      <hr />
      <div className="m-0 w-36 h-10 mx-auto">
        {!isLoading && <Button
          label="Ir a mi panel"
          onClick={pedidoExitoso}
          full
        />}
      </div>

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