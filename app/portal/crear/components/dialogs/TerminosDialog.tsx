"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/app/components/Button";
import CobroInput from "@/app/components/inputs/CobroInput";
import { Checkbox } from "@material-tailwind/react";
import CheckboxInput from "@/app/components/inputs/CheckboxInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminosDialogProps {
  isOpen?: boolean;
  onClose: () => void;
}

const TerminosDialog: React.FC<TerminosDialogProps> = ({ isOpen, onClose }) => {
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

  const monto = watch("montoCobro");

  if (!isOpen) {
    return null;
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  function currencyFormat(num: number) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleCancel = () => {
    //reset();
    onClose();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl  m-4 md:m-0 transform  rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="div"
                    className="flex flex-row justify-between items-center mt-1 mb-3"
                  >
                    <p className="text-lg font-bold leading-6 uppercase ">
                      Terminos y condiciones
                    </p>
                    <div></div>
                  </Dialog.Title>
                  <hr></hr>
                  <Dialog.Description
                    as="div"
                    className="flex flex-row  items-center text-md text-neutral-500 "
                  ></Dialog.Description>

                  <ScrollArea className="h-[400px]">
                    <ul className="list-disc text-xs p-8">
                      <li>
                        Llenado correcto de datos en guía, descripción exacta
                        del producto que contiene el paquete, monto a cobrar
                        neto.
                      </li>
                      <li>
                        Marcado sin excepción del paquete. (Número de guía y
                        nombre de destinatario).
                      </li>
                      <li>
                        Pago del envío es independiente a la cobranza del
                        producto; si seleccionas pago de tu envío en efectivo
                        deberás pagar al operador que realiza la recolección en
                        domicilio origen, si seleccionas pago del envío vía
                        transferencia, deberás subir el comprobante de pago a la
                        página antes de confirmar la guía. El pago del envío no
                        se recibe en el domicilio de entrega.
                      </li>
                      <li>
                        Se cobrará 4.5% por concepto de comisión sobre el valor
                        declarado a cobrar.
                      </li>
                      <li>No manejamos seguro de la mercancía.</li>
                      <li>
                        No realizamos reembolso de mercancía dañada durante el
                        trayecto.
                      </li>
                      <li>
                        El empaque del producto debe ser el adecuado y a medida
                        para proteger el producto.
                      </li>
                      <li>
                        El retorno del efectivo cobrado se realizará una vez por
                        semana sin opción a resguardarlo, administrarlo o
                        dejarlo como saldo a favor para pago de envios.
                      </li>
                      <li>
                        El retorno del efectivo cobrado podrá realizarse via
                        depósito en banco o tienda de conveniencia. En caso de
                        que se aplique comisión por parte del banco o tienda de
                        conveniencia, dicho monto será descontado del efectivo a
                        retornar. En esta opción se aplica un costo de $68 pesos
                        por concepto del viaje a depositar.
                      </li>
                      <li>
                        Puedes pasar a recoger el efectivo cobrado directamente
                        a nuestras oficinas, en este caso no aplica cargo por
                        viaje, solo la comisión sobre lo cobrado. De igual forma
                        debe ser 1 vez por semana.
                      </li>
                    </ul>
                  </ScrollArea>

                  <div className="flex flex-row  items-center justify-end mt-6 mb-2">
                    <div className="w-24 ml-2">
                      <Button outline label="Regresar" onClick={handleCancel} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TerminosDialog;
