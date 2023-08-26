'use client';

import { IconType } from "react-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import Button from "@/app/components/Button";
import StepHeading from "../components/StepHeading";
import ResumenCard from "../components/ResumenCard";
import CotizaCard from "../components/CotizaCard";
import MetodoPagoCard from "../components/MetodoPagoCard";
import {ICotizaParams, ICotizaItem} from "@/app/types/pedido";
import { cotizaPaqueteById, crearPedido } from "@/app/actions/apiQuerys";
import { PulseLoader } from "react-spinners";
import useCreandoPedidoModal from "@/app/hooks/useCreandoPedidoModal";
import BolsasDialog from "../components/BolsasDialog";





interface ConfirmarStepProps {
  title?: string;
  append?: boolean;
  recoleccion?: any;
}

//se quito w-full , se agregp px-2
const ConfirmarStep: React.FC<ConfirmarStepProps> = ({ 
  title, 
  append,
  recoleccion
}) => {
  const creandoModal = useCreandoPedidoModal();

  const {updateActiveStep , pedido, saveCotizacion, saveMetodoPago, updateTipoPago, tipoPago, saveAppend} = useContext(PedidoContext) as PedidoContextType;
  const [isLoading,setIsLoading] = useState(false);
  const [cotiza,setCotiza] = useState<ICotizaItem>({})
  const [error,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [bolsaDialogOpen, setBolsaDialogOpen] = useState(true);
  const [bolsaSelected, setBolsaSelected] = useState({});

  const getCotizaServer = useCallback(async (props: ICotizaParams) => {

    const params:ICotizaParams = {
      tipoProductoId: props.tipoProductoId,
      municipioRecoleccionId: props.municipioRecoleccionId,
      municipioEntregaId: props.municipioEntregaId
    }
    const cotizacion = await cotizaPaqueteById(params);
    
    const c = cotizacion?.response?.data;
    console.log(cotizacion.status);
    if (cotizacion.status == 1) {
      saveCotizacion({
        descripcion: c.descripcion,
        sku: c.nombre,
        precio: c.precio,
        cantidad: 1
      });
      setIsLoading(false);
    } else {
      setError(true);
      setErrorMessage(cotizacion.statusMessage);
      setIsLoading(false);
    }

  }, [])

  useEffect(() => {
    setIsLoading(true);
   
    
    if (pedido?.recoleccion && pedido.destino && pedido.paquete) {
      console.log('cotizando');
       getCotizaServer({
        tipoProductoId: pedido.paquete.paqTipoId,
        municipioRecoleccionId: pedido.recoleccion.municipioId,
        municipioEntregaId: pedido.destino.municipioId
      });
    } else {
      setError(true);
      setErrorMessage('Error de validación');
      setIsLoading(false);
    }
   
  },[])

  useEffect(()=>{
    if (pedido?.cotizacion && tipoPago == 'efectivo') {

        saveMetodoPago({
          formaPagoId: 1,
          passed: true,
          comprobante: false,
          })
      
    }
  },[pedido?.cotizacion])


const handleBack = () => {
  updateActiveStep(3)
}

const handleNext = async () => {
  if (!pedido?.metodoPago?.passed) {
    saveMetodoPago({
      ...pedido?.metodoPago,
      comprobanteError: true,
      comprobanteErrorMessage: 'Es necesario cargar tu comprobante de pago.'
      })
      return 
  }

  creandoModal.onOpen();
  /* if (pedido) {
    const pedidoResult = await crearPedido(pedido);
    console.log(pedidoResult);
  } */
   
}

const handleBolsaDialogClose = (val: any) => {
  setBolsaDialogOpen(false);
}
  return ( 
    <div className="px-2">
      <StepHeading title="Confirmar" subtitle="Confirma tu envío" />

        {pedido && <ResumenCard  data={pedido}/>}
        <div className="my-2 ">
          {isLoading ? 
           <div>
              <p className="text-sm mb-2">Cotizando...</p>
              <PulseLoader
              //@ts-ignore
              size={10}
              color="#FF6B00"
              className="ml-4 mt-2"
              />  
            </div>
            :
            <div>
              {!error ? <div className="flex flex-col">
              {pedido?.cotizacion && <div className="flex flex-col gap-4">
                <CotizaCard data={pedido?.cotizacion}/>
                <BolsasDialog open={bolsaDialogOpen} onClose={handleBolsaDialogClose}/>
              </div>}
              </div> :
              <div className="flex flex-col">
                <p className="text-xs text-red-500">Algo salió mal</p>
                <p className="text-xs text-red-500">{errorMessage}</p>
              </div>
              }
            </div>       
          }
        </div>
        <div className="my-0">
          {!isLoading && !error &&  <MetodoPagoCard />}
        </div>
       {/*  <div className="mt-10">
          <span className="text-md font-bold">Pedido data:</span>
          <pre className="text-xs">
              {JSON.stringify(pedido,null,2)}
          </pre>
        </div> */}
        <div className=" my-4 ml-4 flex flex-row gap-6">
          <Button outline label="Anterior" onClick={handleBack} disabled={isLoading} />
          <Button label="Terminar" onClick={handleNext}  disabled={isLoading} />
        </div>
    </div>
   );
}
 
export default ConfirmarStep;