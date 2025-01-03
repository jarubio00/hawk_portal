"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import { MontoSeguroInput } from "./MontoSeguroInput";

interface CotizarSeguroProps {
  data?: string;
  disabled?: boolean;
}

const CotizarSeguro: React.FC<CotizarSeguroProps> = ({
  data,
  disabled = false,
}) => {
  const {
    shipmentValue,
    updateShipmentValue,
    seguroSelected,
    updateSeguroSelected,
  } = useNacionalCrearStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          onCheckedChange={(val) => updateSeguroSelected(Boolean(val))}
          disabled={disabled}
        />
        <label
          htmlFor="terms"
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
        >
          Asegurar el envío de mi paquete
        </label>
      </div>
      {seguroSelected && (
        <div className="px-4 py-2 flex flex-col gap-2">
          <p className={`text-xs text-neutral-400 `}>
            Ingresa el monto que quieres asegurar
          </p>
          {/* <Input
            value={shipmentValue}
            type="number"
            className="w-[200px]"
            placeholder="Valor del producto"
            onChange={(e) => updateShipmentValue(e.target.value)}
          /> */}
          <MontoSeguroInput />
        </div>
      )}
    </div>
  );
};

export default CotizarSeguro;
