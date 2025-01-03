"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface CotizarPaqueteProps {
  data?: string;
  disabled?: boolean;
}

const CotizarPaquete: React.FC<CotizarPaqueteProps> = ({
  data,
  disabled = false,
}) => {
  const {
    largoValue,
    anchoValue,
    altoValue,
    pesoValue,
    updateLargoValue,
    updateAnchoValue,
    updateAltoValue,
    updatePesoValue,
  } = useNacionalCrearStore();
  return (
    <div className="flex flex-row items-center gap-4 p-4 bg-neutral-100 rounded-lg">
      <div className="relative ">
        <Input
          value={largoValue}
          className="w-[100px] h-10 pr-4"
          type="number"
          placeholder="Largo"
          required
          onChange={(e) => {
            updateLargoValue(e.target.value);
          }}
          disabled={disabled}
        />
        <div className="absolute h-6 w-6 top-2 right-2 text-[10px]  rounded-full bg-neutral-400 text-white pl-[4px] py-[4px]">
          cm
        </div>
      </div>
      <div className="relative ">
        <Input
          value={anchoValue}
          className="w-[100px] h-10 pr-4"
          type="number"
          placeholder="Ancho"
          required
          onChange={(e) => {
            updateAnchoValue(e.target.value);
          }}
          disabled={disabled}
        />
        <div className="absolute h-6 w-6 top-2 right-2 text-[10px]  rounded-full bg-neutral-400 text-white pl-[4px] py-[4px]">
          cm
        </div>
      </div>
      <div className="relative ">
        <Input
          value={altoValue}
          className="w-[100px] h-10 pr-4"
          type="number"
          placeholder="Alto"
          required
          onChange={(e) => {
            updateAltoValue(e.target.value);
          }}
          disabled={disabled}
        />
        <div className="absolute h-6 w-6 top-2 right-2 text-[10px]  rounded-full bg-neutral-400 text-white pl-[4px] py-[4px]">
          cm
        </div>
      </div>
      <Separator orientation="vertical" className="h-10" />
      <div className="relative ">
        <Input
          value={pesoValue}
          className="w-[100px] h-10 pr-4"
          type="number"
          placeholder="Peso"
          required
          onChange={(e) => {
            updatePesoValue(e.target.value);
          }}
          disabled={disabled}
        />
        <div className="absolute h-6 w-6 top-2 right-2 text-[10px]  rounded-full bg-neutral-400 text-white pl-[6px] py-[4px]">
          kg
        </div>
      </div>
    </div>
  );
};

export default CotizarPaquete;
