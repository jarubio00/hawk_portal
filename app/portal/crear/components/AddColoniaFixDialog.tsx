"use client";
import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "../context/PedidoContext";
import { PedidoContextType, IRecoleccion } from "@/app/types/pedido";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddColoniaFixDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddColoniaFixDialog: React.FC<AddColoniaFixDialogProps> = ({
  open = false,
  onClose,
}) => {
  const { pedido } = useContext(PedidoContext) as PedidoContextType;
  const [colonia, setColonia] = useState("");
  const [error, setError] = useState("");

  const handleSumbit = () => {
    if (!colonia) {
      setError("El nombre de la colonia es requerido");
    }

    console.log(colonia);
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="min-h-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>ACTUALIZACIÓN NECESARIA</AlertDialogTitle>

          <AlertDialogDescription>
            <div className="flex flex-col">
              <p>
                Es necesario ingresar la colonia de la dirección que
                seleccionaste:{" "}
              </p>
              <p className="my-1"></p>
              <p className="text-md font-bold">
                {pedido?.recoleccion?.nombreDireccion}
              </p>
              <p className="text-xs">
                {pedido?.recoleccion?.calle} {pedido?.recoleccion?.numero}{" "}
                {pedido?.recoleccion?.numeroInt}
              </p>
              <p className="text-xs">
                {pedido?.recoleccion?.municipio?.municipio},{" "}
                {pedido?.recoleccion?.cpId}
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex flex-col">
                  <Input
                    value={colonia}
                    placeholder="Ingresa el nombre de la colonia"
                    onChange={(e) => {
                      setColonia(e.target.value);
                      if (e.target.value.length < 1) {
                        setError("El nombre de la colonia es requerido");
                      } else {
                        setError("");
                      }
                    }}
                    className={`${error && "border-red-500 border-2"}`}
                  />
                  {error ? (
                    <p className="text-[11px] text-red-500">{error}</p>
                  ) : (
                    <p className="mt-5"></p>
                  )}
                </div>
                <Button
                  className="w-32 bg-rose-500 hover:bg-rose-500/80"
                  size={"sm"}
                  onClick={handleSumbit}
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-20" onClick={() => onClose()}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="w-28" disabled={Boolean(error)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddColoniaFixDialog;
