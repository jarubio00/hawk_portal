"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import {
  IValidatorParams,
  IValidatorResponse,
  PedidoContextType,
} from "@/app/types/pedido";
import Button from "@/app/components/Button";
import ResumenCard from "../components/ResumenCard";
import CotizaCard from "../components/CotizaCard";
import { ICotizaParams, ICotizaItem } from "@/app/types/pedido";
import { cotizaPaqueteById, pedidoValidator } from "@/app/actions/apiQuerys";
import { PulseLoader } from "react-spinners";
import useCreandoPedidoModal from "@/app/hooks/useCreandoPedidoModal";
import { useProgramaStore } from "../store/crear-store";
import { CotizaSkeleton } from "../components/CotizaSkeleton";
import ResumenCobroCard from "../components/ResumenCobroCard";
import CrearNextButton from "../components/CrearNextButton";

interface ConfirmarStepProps {
  title?: string;
  append?: boolean;
  recoleccion?: any;
}

//se quito w-full , se agregp px-2
const ConfirmarStep: React.FC<ConfirmarStepProps> = ({
  title,
  append,
  recoleccion,
}) => {
  const creandoModal = useCreandoPedidoModal();

  const {
    updateActiveStep,
    pedido,
    saveCotizacion,
    saveMetodoPago,
    tipoPago,
    resetPrograma,
  } = useContext(PedidoContext) as PedidoContextType;
  const [isLoading, setIsLoading] = useState(false);
  const [isValidateLoading, setIsValidateLoading] = useState(false);
  const [isValidatePassed, setIsValidatePassed] = useState(false);
  const [cotiza, setCotiza] = useState<ICotizaItem>({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bolsaDialogOpen, setBolsaDialogOpen] = useState(false);
  const [bolsaSelected, setBolsaSelected] = useState({});
  const [cotizacion, setCotizacion] = useState<ICotizaItem[]>([]);
  const [validator, setValidator] = useState<IValidatorResponse>();

  const pv2 = useProgramaStore();

  const getCotizaServer = useCallback(async (props: ICotizaParams) => {
    const params: ICotizaParams = {
      tipoProductoId: props.tipoProductoId,
      municipioRecoleccionId: props.municipioRecoleccionId,
      municipioEntregaId: props.municipioEntregaId,
      mismoDia: pv2.mismoDiaSelected,
    };
    const cot = await cotizaPaqueteById(params);

    const c = cot?.response?.data;
    setCotizacion(c);
    c;
    cot.status;
    if (cot.status == 1) {
      saveCotizacion({
        descripcion: c[0].descripcion,
        sku: c[0].nombre,
        precio: pv2.mismoDiaSelected
          ? c.reduce((acc: any, item: any) => acc + item.precio, 0)
          : c[0].precio,
        cantidad: 1,
      });
      setIsLoading(false);
    } else {
      setError(true);
      setErrorMessage(cot.statusMessage);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    pedido?.programa;
    setIsLoading(true);

    if (pedido?.recoleccion && pedido.destino && pedido.paquete) {
      ("cotizando");
      getCotizaServer({
        tipoProductoId: pedido.paquete.paqTipoId,
        municipioRecoleccionId: pedido.recoleccion.municipioId,
        municipioEntregaId: pedido.destino.municipioId,
        mismoDia: pedido.programa?.mismoDia,
      });
    } else {
      setError(true);
      setErrorMessage("Error de validación");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pedido?.cotizacion && tipoPago == "efectivo") {
      saveMetodoPago({
        formaPagoId: 1,
        passed: true,
        comprobante: false,
      });
    }
  }, [pedido?.cotizacion]);

  const handleBack = () => {
    updateActiveStep(3);
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

  const handleNext = async () => {
    updateActiveStep(5);
  };

  const handleBolsaDialogClose = (val: any) => {
    setBolsaDialogOpen(false);
  };
  return (
    <div className="px-2">
      {pedido && <ResumenCard data={pedido} />}
      {pedido?.cobro && <ResumenCobroCard data={pedido} />}
      <div className="my-3 ">
        {isLoading ? (
          <div>
            <CotizaSkeleton />
            {/* <p className="text-sm mb-2">Cotizando...</p>
            <PulseLoader
              //@ts-ignore
              size={10}
              color="#FF6B00"
              className="ml-4 mt-2"
            /> */}
          </div>
        ) : (
          <div>
            {!error ? (
              <div className="flex flex-col gap-4">
                {cotizacion && (
                  <div className="flex flex-col gap-4">
                    <CotizaCard data={cotizacion} />
                    {/* <BolsasDialog open={bolsaDialogOpen} onClose={handleBolsaDialogClose}/> */}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-xs text-red-500">Algo salió mal</p>
                <p className="text-xs text-red-500">{errorMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex w-full md:w-1/4 mt-6 mb-2">
        <CrearNextButton onClick={handleNext} disabled={isLoading} />
      </div>

      <div className="flex flex-col ml-4 mt-4 gap-4">
        {isValidateLoading ? (
          <div>
            <PulseLoader
              //@ts-ignore
              size={10}
              color="#FF6B00"
              className="mt-0"
            />
            <p className="text-xs mb-1">Validando envío...</p>
          </div>
        ) : (
          <div>
            {validator && !validator.valid ? (
              <div className="flex flex-col text-red-500 text-xs">
                <p className="font-bold">Error en la validación del envío</p>
                <div className="flex flex-col ml-4">
                  {validator &&
                    validator.issues?.length &&
                    validator.issues.map((issue, i) => {
                      return (
                        <div key={i}>
                          <p>{issue.issueMessage}</p>
                        </div>
                      );
                    })}
                </div>
                <Button outline label="Cambiar" onClick={resetPrograma} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmarStep;
