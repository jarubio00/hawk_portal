"use client";

import { Button } from "@/components/ui/button";
import { useCodTutorialStore } from "../store/useCodTutorialStore";
import { StepContent } from "./steps/StepContent";

interface TutorialStepProps {
  step: number;
}

export function TutorialStep({ step }: TutorialStepProps) {
  const {
    previousStep,
    nextStep,
    termsAccepted,
    setTermsAccepted,
    enableService,
  } = useCodTutorialStore();

  const handleEnableService = () => {
    if (termsAccepted) {
      // Aquí se hará la llamada a la API después
      enableService();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <StepContent step={step} />

      {/* Checkbox de términos solo en paso 5 */}
      {step === 5 && (
        <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700">
            Al habilitar el servicio confirmo de enterado del funcionamiento del
            servicio de cobro a destinatario y acepto sus costos, comisiones y
            política de retorno
          </label>
        </div>
      )}

      {/* Línea divisora */}
      <div className="border-t pt-3" />
    </div>
  );
}
