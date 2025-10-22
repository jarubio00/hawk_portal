"use client";

import { Dialog, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomDialogContent } from "./CustomDialogContent";
import { useCodTutorialStore } from "../store/useCodTutorialStore";
import { TutorialStep } from "./TutorialStep";
import { StepIndicator } from "./StepIndicator";
import { X, CheckCircle, Loader2 } from "lucide-react";

export function CodTutorialModal() {
  const {
    isModalOpen,
    closeModal,
    currentStep,
    previousStep,
    nextStep,
    termsAccepted,
    enableService,
    isLoading,
    showSuccess,
  } = useCodTutorialStore();

  const handleEnableService = () => {
    if (termsAccepted) {
      // Aquí se hará la llamada a la API después
      enableService();
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => !open && closeModal()}
      modal
    >
      <CustomDialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {isLoading || showSuccess ? (
          // Pantalla de carga y éxito
          <div className="flex flex-col items-center justify-center py-12 px-6">
            {isLoading ? (
              <>
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-4" />
                <h3 className="text-xl font-semibold mb-2">Habilitando servicio...</h3>
                <p className="text-gray-600 text-center">
                  Por favor espera mientras configuramos tu servicio de cobro a destinatario
                </p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-green-100 p-4 mb-4">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  ¡Servicio habilitado!
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  Ya puedes agregar cobros a destinatario en tus envíos
                </p>
                <Card className="w-full max-w-md p-4 bg-blue-50 border-blue-200 mb-6">
                  <p className="text-sm text-blue-800 text-center">
                    Esta ventana se cerrará automáticamente en un momento...
                  </p>
                </Card>
                <Button onClick={closeModal} className="w-full max-w-md">
                  Cerrar
                </Button>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Botón de cerrar personalizado */}
            <DialogClose
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 z-10"
            >
              <X className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Cerrar</span>
            </DialogClose>

            <DialogHeader>
              <img src="/images/cod/cobros_avatar.png" className="h-16 w-16" />
              <StepIndicator currentStep={currentStep} totalSteps={5} />
            </DialogHeader>

            <TutorialStep step={currentStep} />

            {/* Botones de navegación */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={currentStep === 1}
                className="px-6"
              >
                Anterior
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={nextStep}
                  className="px-6 bg-blue-600 hover:bg-blue-700"
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={handleEnableService}
                  disabled={!termsAccepted}
                  className="px-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                >
                  Habilitar Servicio
                </Button>
              )}
            </div>
          </>
        )}
      </CustomDialogContent>
    </Dialog>
  );
}
