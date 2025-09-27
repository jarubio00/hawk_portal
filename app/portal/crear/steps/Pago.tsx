"use client";
import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import {
  IValidatorParams,
  IValidatorResponse,
  PedidoContextType,
} from "@/app/types/pedido";
import { pedidoValidator } from "@/app/actions/apiQuerys";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import { useProgramaStore } from "../store/crear-store";
import CrearNextButton from "../components/CrearNextButton";
import useCreandoPedidoModal from "@/app/hooks/useCreandoPedidoModal";

interface PagoStepProps {
  data?: string;
}

const PagoStep: React.FC<PagoStepProps> = ({ data }) => {
  const { updateActiveStep, pedido, savePrograma, resetPrograma } = useContext(
    PedidoContext
  ) as PedidoContextType;
  const [isLoading, setIsLoading] = useState(false);
  const [validator, setValidator] = useState<IValidatorResponse>();
  const [isValidateLoading, setIsValidateLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("credit_card");

  const pv2 = useProgramaStore();
  const CreandoPedidoModal = useCreandoPedidoModal();

  useEffect(() => {
    savePrograma({
      fechaEntString: pv2.entregaDate?.datetimeString,
      fechaRecString: pv2.recoleccionDate?.datetimeString,
      mismoDia: pv2.mismoDiaSelected,
    });
  }, []);
  const handleBack = () => {
    updateActiveStep(4);
  };

  const handleNext = async () => {
    pedido;
    CreandoPedidoModal.onOpen();
  };

  const validate = async () => {
    setValidator(undefined);
    setIsValidateLoading(true);
    const props: IValidatorParams = {
      fechaRecoleccion: pedido?.programa?.fechaRecoleccion,
      fechaEntrega: pedido?.programa?.fechaEntrega,
    };
    const res = await pedidoValidator(props);
    //(result?.response?.data);
    const sd: IValidatorResponse = res?.response?.data;
    setValidator(sd);

    sd;

    const timer = setTimeout(() => {
      setIsValidateLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-1 px-4 py-0 w-full lg:w-2/4 bg-white ">
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
      <div className=" my-4  flex flex-row gap-6">
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
          last
        />
      </div>
    </div>
  );
};

export default PagoStep;
