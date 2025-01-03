"use client";
import { Tarifa } from "@/app/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarLoader } from "react-spinners";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import CotizacionCard from "./CotizacionCard";

interface CotizarDialogProps {
  data?: string;
}

const CotizarDialog: React.FC<CotizarDialogProps> = ({ data }) => {
  const {
    cotizarDialogOpen,
    updateCotizarDialogOpen,
    fetchCotizacion,
    cotizacionLoading,
    dateSelected,
    cotizaciones,
    updateCotizaciones,
    cotizacionSelected,
    updateCotizacionSelected,
    updateActiveStep,
  } = useNacionalCrearStore();
  return (
    <AlertDialog open={cotizarDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            updateCotizarDialogOpen(true);
            updateCotizaciones([]);
            fetchCotizacion();
          }}
          disabled={cotizacionLoading || !dateSelected}
        >
          Cotizar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Selecciona la opción de envío</AlertDialogTitle>

          {cotizacionLoading ? (
            <div className="flex flex-col gap-2">
              <BarLoader width={"100%"} color="#f16e10" />
              <p className="text-xs text-neutral-400">
                Buscando cotizaciones de tu envío...
              </p>
            </div>
          ) : (
            <div className="h-1"></div>
          )}
        </AlertDialogHeader>
        <ScrollArea className="h-[500px]">
          <div>
            {cotizaciones &&
              cotizaciones?.length >= 1 &&
              cotizaciones.map((cot: Tarifa, i: number) => {
                return (
                  <div
                    key={i}
                    className="cursor-pointer"
                    onClick={() => updateCotizacionSelected(cot)}
                  >
                    <CotizacionCard data={cot} />
                  </div>
                );
              })}
          </div>
        </ScrollArea>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => updateCotizarDialogOpen(false)}
            className="px-4"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              updateCotizarDialogOpen(false);
              updateActiveStep(1);
            }}
            className="px-4"
            disabled={!cotizacionSelected}
          >
            Seleccionar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CotizarDialog;
