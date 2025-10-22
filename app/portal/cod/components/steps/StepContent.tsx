"use client";

import Image from "next/image";

interface StepContentProps {
  step: number;
}

const stepsData = [
  {
    title: "Programa tu envío con cobro al destinatario",
    description:
      "Al programar un envío encontrarás una nueva opción de agregar un cobro, ingresa el monto y se prograra automáticamente para que el operador lo cobre al entregar el paquete.",
    image: "/images/cod/pasos/cod_paso1_c.png",
  },
  {
    title: "Corte semanal",
    description:
      "Tu dinero será resguardado durante una semana, durante esa semana podrás hacer los cobros que necesites, el monto se irá acumulando.",
    image: "/images/cod/pasos/cod_paso2_c.png",
  },
  {
    title: "Retorno del dinero cobrado",
    description:
      "Al terminar la semana desde tu primer cobro, se programará el retorno de tu dinero con el método que prefieras: depósito bancario, depósito en tienda de conveniencia o puedes recoger el efectivo en nuestras oficinas.",
    image: "/images/cod/pasos/cod_paso3_c2.png",
  },
  {
    title: "Costo del servicio y comisiones",
    description:
      "El costo del servicio es el 4.5% del monto cobrado. El depósito bancario o tienda de conveniencia genera una guía con costo de $68 pesos más comisiones por depósito si aplican. Recoger el efectivo en nuestras oficinas solo tiene el costo del servicio.",
    image: "/images/cod/pasos/cod_paso4_c.png",
  },
  {
    title: "Habilitar servicio",
    description: "",
    image: "/images/cod/pasos/cod_paso5_c.png",
  },
];

export function StepContent({ step }: StepContentProps) {
  const currentStep = stepsData[step - 1];

  if (!currentStep) return null;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Imagen del paso */}
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {step ? (
          <img
            src={currentStep.image}
            alt={currentStep.title}
            className="object-contain h-full w-auto"
          />
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-6xl mb-2">📦</div>
            <p className="text-sm">Placeholder - Paso {step}</p>
          </div>
        )}
      </div>

      {/* Contenido del paso */}
      <div
        className={`text-center space-y-3 px-4 flex flex-col justify-start ${
          currentStep.description ? "min-h-[140px]" : "min-h-[50px]"
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-900">
          {currentStep.title}
        </h2>
        {currentStep.description && (
          <p className="text-gray-600 leading-relaxed">
            {currentStep.description}
          </p>
        )}
      </div>
    </div>
  );
}
