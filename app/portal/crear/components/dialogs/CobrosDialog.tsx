"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface CobrosDialogProps {
  isOpen?: boolean;
  onClose: (props: any) => void;
  edit?: boolean;
  resetCobro?: boolean;
  editCobro?: boolean;
  onOpenTerminos?: () => void;
  currentAmount?: number;
}

const CobrosDialog: React.FC<CobrosDialogProps> = ({
  isOpen,
  onClose,
  edit = false,
  resetCobro,
  editCobro,
  onOpenTerminos,
  currentAmount,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      montoCobro: "",
    },
  });

  const [confirmarMonto, setConfirmarMonto] = useState(false);
  const [montoFormato, setMontoFormato] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Función para formatear moneda con separador de miles
  function currencyFormat(num: number) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  // Función para formatear input con separador de miles mientras se escribe
  function formatInputValue(value: string) {
    // Remover todo excepto números y punto
    const cleanValue = value.replace(/[^\d.]/g, "");

    // Si está vacío, retornar vacío
    if (!cleanValue) return "";

    // Dividir en parte entera y decimal
    const parts = cleanValue.split(".");

    // Formatear parte entera con comas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Limitar decimales a 2
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
    }

    // Retornar formateado
    return parts.join(".");
  }

  // Función para obtener valor sin formato
  function getUnformattedValue(value: string) {
    return value.replace(/,/g, "");
  }

  const monto = watch("montoCobro");
  const montoSinFormato = monto ? getUnformattedValue(monto) : "";
  const comisionNum = montoSinFormato ? parseFloat(montoSinFormato) * 0.045 : 0;
  const totalNum = montoSinFormato
    ? parseFloat(montoSinFormato) - comisionNum
    : 0;

  const comision = currencyFormat(comisionNum);
  const total = currencyFormat(totalNum);

  useEffect(() => {
    if (resetCobro) {
      reset();
      setConfirmarMonto(false);
      setTermsAccepted(false);
    }
  }, [resetCobro, reset]);

  useEffect(() => {
    if (editCobro && currentAmount) {
      setConfirmarMonto(false);
      // Formatear el monto actual con separador de miles
      const formattedAmount = formatInputValue(currentAmount.toString());
      setValue("montoCobro", formattedAmount);
      // Si está editando, los términos ya fueron aceptados
      setTermsAccepted(true);
    }
  }, [editCobro, currentAmount, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const cleanValue = getUnformattedValue(data.montoCobro);
    setConfirmarMonto(true);
    setMontoFormato(currencyFormat(parseFloat(cleanValue)));
  };

  const handleClose = useCallback(() => {
    onClose(true);
  }, [onClose]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleCancel = () => {
    // Resetear todo el estado
    reset();
    setConfirmarMonto(false);
    setTermsAccepted(false);
    setMontoFormato("");
    onClose({ confirm: false });
  };

  // Resetear al paso 1 cuando se cierra el dialog
  useEffect(() => {
    if (!isOpen) {
      setConfirmarMonto(false);
    }
  }, [isOpen]);

  const handleSiguiente = () => {
    if (!confirmarMonto) {
      handleSubmit(onSubmit)();
    } else {
      // Resetear estado antes de cerrar
      reset();
      setConfirmarMonto(false);
      setTermsAccepted(false);
      setMontoFormato("");
      onClose({ confirm: true, data: { cantidad: montoSinFormato } });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => onClose(false)}>
        <DialogContent
          className="sm:max-w-[550px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <div className="flex items-center sm:items-start gap-3">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                <img
                  src="/images/cod/cobros_avatar.png"
                  alt="Cobros avatar"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex-1 text-left">
                <DialogTitle className="text-lg sm:text-xl">
                  Cobro a destinatario
                </DialogTitle>
                <DialogDescription className="mt-1 text-xs sm:text-sm">
                  Cobraremos al destinatario el monto que indiques al momento de
                  entregar el paquete
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {!confirmarMonto ? (
            <div className="space-y-6">
              {/* Input de monto */}
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="montoCobro"
                  className="text-sm sm:text-base font-semibold block"
                >
                  Monto a cobrar
                </Label>
                <div className="relative ">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-lg font-medium pointer-events-none ">
                    $
                  </span>
                  <Input
                    id="montoCobro"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    className="w-full pl-8 sm:pl-9 text-base sm:text-lg h-11 sm:h-12"
                    disabled={confirmarMonto}
                    {...register("montoCobro", {
                      required: true,
                      validate: (value) => {
                        const cleanValue = getUnformattedValue(value);
                        const num = parseFloat(cleanValue);
                        if (isNaN(num) || num <= 0) {
                          return "Ingrese un monto válido";
                        }
                        if (num > 5000) {
                          return "El monto máximo es de $5,000";
                        }
                        return true;
                      },
                    })}
                    onChange={(event: any) => {
                      const value = event.target.value;
                      const formatted = formatInputValue(value);
                      setCustomValue("montoCobro", formatted);
                    }}
                  />
                </div>
                {errors.montoCobro && (
                  <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="break-words">
                      {(errors.montoCobro.message as string) ||
                        "El monto es requerido"}
                    </span>
                  </p>
                )}
              </div>

              {/* Resumen de comisión */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-xs sm:text-sm font-medium">
                    Resumen del cobro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm gap-2">
                    <span className="text-gray-600">Monto a cobrar:</span>
                    <span className="font-semibold">
                      $
                      {montoSinFormato
                        ? currencyFormat(parseFloat(montoSinFormato))
                        : "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm gap-2">
                    <span className="text-gray-600">Comisión (4.5%):</span>
                    <span className="font-semibold text-orange-600">
                      -${comision}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-semibold text-xs sm:text-sm">
                        Recibirás por este cobro:
                      </span>
                      <span className="font-bold text-green-600 text-base sm:text-lg">
                        ${total}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Confirmar cobro de destinatario
                    </p>
                    <p className="text-3xl font-bold text-green-700">
                      ${montoFormato}
                    </p>
                    <div className="text-sm text-gray-600 mt-4 space-y-1">
                      <p>Comisión: ${comision}</p>
                      <p className="font-semibold text-green-600">
                        Recibirás: ${total}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Términos y condiciones */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked as boolean)
                  }
                  className="mt-0.5 flex-shrink-0"
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm leading-normal cursor-pointer flex-1"
                >
                  Acepto los{" "}
                  <button
                    type="button"
                    onClick={() => onOpenTerminos?.()}
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    términos y condiciones
                  </button>{" "}
                  del servicio de cobro a destinatario
                </label>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            {!confirmarMonto ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleSiguiente}
                  disabled={!monto || parseFloat(montoSinFormato) <= 0}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Siguiente
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setConfirmarMonto(false)}
                >
                  Cambiar monto
                </Button>
                <Button
                  onClick={handleSiguiente}
                  disabled={!termsAccepted}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirmar cobro
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CobrosDialog;
