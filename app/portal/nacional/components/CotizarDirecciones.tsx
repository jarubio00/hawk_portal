"use client";
import { Separator } from "@/components/ui/separator";
import { PulseLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SafeDireccion } from "@/app/types";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface CotizarDireccionesProps {
  data?: string;
}

const CotizarDirecciones: React.FC<CotizarDireccionesProps> = ({ data }) => {
  const {
    direcciones,
    direccionDefault,
    direccionesLoading,
    direccionValue,
    direccionesFetched,
    updateDireccionValue,
  } = useNacionalCrearStore();
  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral-100 rounded-lg">
      <Select
        value={direccionValue}
        onValueChange={(val) => updateDireccionValue(val)}
      >
        <SelectTrigger
          className="w-[480px] h-12 bg-white"
          disabled={direccionesLoading || !direccionesFetched}
        >
          <SelectValue placeholder="Direcciones" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {direcciones.map((d: SafeDireccion, i) => {
              return (
                <div key={d?.id?.toString()} className="flex flex-col">
                  <SelectItem value={d.id.toString()}>
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col justify-start items-start">
                        <span className="text-xs">
                          {d.calle} {d.numero}, {d.colonia}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {d.colonia}, {d?.municipio?.municipio}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  {direcciones.length > 1 && i + 1 != direcciones.length && (
                    <Separator className="w-full" />
                  )}
                </div>
              );
            })}
            {direccionValue == "loading" && (
              <SelectItem value="loading">
                <PulseLoader size={8} color="#FF6B00" className="ml-0 mt-0" />
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CotizarDirecciones;
