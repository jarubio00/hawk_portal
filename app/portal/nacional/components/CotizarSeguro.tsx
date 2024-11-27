"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface CotizarSeguroProps {
  data?: string;
}

const CotizarSeguro: React.FC<CotizarSeguroProps> = ({ data }) => {
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
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Asegurar el envío de mi paquete
        </label>
      </div>
      {seguroSelected && (
        <Input
          value={shipmentValue}
          type="number"
          className="w-[200px]"
          placeholder="Valor del producto"
          onChange={(e) => updateShipmentValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default CotizarSeguro;
