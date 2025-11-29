"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface TerminosDialogProps {
  isOpen?: boolean;
  onClose: () => void;
}

const TerminosDialog: React.FC<TerminosDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl sm:text-2xl">
                Términos y Condiciones
              </DialogTitle>
              <DialogDescription className="mt-1">
                Servicio de cobro a destinatario
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] sm:h-[500px] pr-4">
          <div className="space-y-4 text-sm sm:text-base">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                Información importante
              </h3>
              <p className="text-amber-800 text-sm">
                Al utilizar este servicio, aceptas los siguientes términos y condiciones.
                Por favor, léelos cuidadosamente.
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Llenado de datos</h4>
                <p className="text-gray-600">
                  Llenado correcto de datos en guía, descripción exacta del producto que
                  contiene el paquete, monto a cobrar neto.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Marcado del paquete</h4>
                <p className="text-gray-600">
                  Marcado sin excepción del paquete. (Número de guía y nombre de
                  destinatario).
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Pago del envío</h4>
                <p className="text-gray-600">
                  Pago del envío es independiente a la cobranza del producto; si
                  seleccionas pago de tu envío en efectivo deberás pagar al operador que
                  realiza la recolección en domicilio origen, si seleccionas pago del
                  envío vía transferencia, deberás subir el comprobante de pago a la
                  página antes de confirmar la guía. El pago del envío no se recibe en el
                  domicilio de entrega.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Comisión del servicio</h4>
                <p className="text-gray-600">
                  Se cobrará 4.5% por concepto de comisión sobre el valor declarado a
                  cobrar.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Seguro de mercancía</h4>
                <p className="text-gray-600">
                  No manejamos seguro de la mercancía.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Reembolsos</h4>
                <p className="text-gray-600">
                  No realizamos reembolso de mercancía dañada durante el trayecto.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Empaque del producto</h4>
                <p className="text-gray-600">
                  El empaque del producto debe ser el adecuado y a medida para proteger
                  el producto.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Retorno del efectivo</h4>
                <p className="text-gray-600">
                  El retorno del efectivo cobrado se realizará una vez por semana sin
                  opción a resguardarlo, administrarlo o dejarlo como saldo a favor para
                  pago de envíos.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Depósito bancario</h4>
                <p className="text-gray-600">
                  El retorno del efectivo cobrado podrá realizarse vía depósito en banco
                  o tienda de conveniencia. En caso de que se aplique comisión por parte
                  del banco o tienda de conveniencia, dicho monto será descontado del
                  efectivo a retornar. En esta opción se aplica un costo de $68 pesos por
                  concepto del viaje a depositar.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Recolección en oficinas</h4>
                <p className="text-gray-600">
                  Puedes pasar a recoger el efectivo cobrado directamente a nuestras
                  oficinas, en este caso no aplica cargo por viaje, solo la comisión
                  sobre lo cobrado. De igual forma debe ser 1 vez por semana.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto">
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TerminosDialog;
