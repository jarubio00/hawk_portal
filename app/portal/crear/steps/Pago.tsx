"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import {
  IValidatorParams,
  IValidatorResponse,
  PedidoContextType,
} from "@/app/types/pedido";
import Button from "@/app/components/Button";
import {
  cotizaPaqueteById,
  crearPedido,
  pedidoValidator,
} from "@/app/actions/apiQuerys";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import { useProgramaStore } from "../store/crear-store";
import CrearNextButton from "../components/CrearNextButton";

interface PagoStepProps {
  data?: string;
}

const PagoStep: React.FC<PagoStepProps> = ({ data }) => {
  const {
    updateActiveStep,
    pedido,
    saveCotizacion,
    saveMetodoPago,
    updateTipoPago,
    tipoPago,
    saveAppend,
    resetPrograma,
  } = useContext(PedidoContext) as PedidoContextType;
  const [isLoading, setIsLoading] = useState(false);
  const [validator, setValidator] = useState<IValidatorResponse>();
  const [isValidateLoading, setIsValidateLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("credit_card");

  const pv2 = useProgramaStore();

  useEffect(() => {
    //console.log(pedido);
  }, []);
  const handleBack = () => {
    updateActiveStep(4);
  };

  const handleNext = async () => {
    console.log(pedido);
  };

  const validate = async () => {
    setValidator(undefined);
    setIsValidateLoading(true);
    const props: IValidatorParams = {
      fechaRecoleccion: pedido?.programa?.fechaRecoleccion,
      fechaEntrega: pedido?.programa?.fechaEntrega,
    };
    const res = await pedidoValidator(props);
    //console.log(result?.response?.data);
    const sd: IValidatorResponse = res?.response?.data;
    setValidator(sd);

    console.log(sd);

    const timer = setTimeout(() => {
      setIsValidateLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-1 px-4 py-0 w-full  bg-white">
      <div className="flex flex-row items-center justify-between">
        <p></p>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-bold">${pedido?.cotizacion?.precio}.00</p>
          <p className="text-xs text-gray-500">Total a pagar</p>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-2">
          Método de pago
        </h2>
        <PaymentMethodSelector
          value={selectedMethod}
          onChange={setSelectedMethod}
        />
      </div>
      <div className=" my-4 ml-4 flex flex-row gap-6">
        {/* <Button
          outline
          label="Anterior"
          onClick={handleBack}
          disabled={isLoading}
        />
        <Button
          label="Terminar"
          onClick={handleNext}
          disabled={
            isLoading || (!pv2.transferSelected && !pv2.efectivoSelected)
          }
        />
        <Button outline label="Validar" onClick={validate} /> */}
        <CrearNextButton
          onClick={handleNext}
          disabled={
            isLoading || (!pv2.transferSelected && !pv2.efectivoSelected)
          }
        />
      </div>
    </div>
  );
};

export default PagoStep;
