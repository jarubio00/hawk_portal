"use client";

import { MdViewInAr } from "react-icons/md";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { ReactNode } from "react";

type Step = {
  title: string;
  description: ReactNode;
  icon: ReactNode;
};

const iconColor = "#eb7711"; // mismo color que el botón

const steps: Step[] = [
  {
    title: "Programación",
    description: (
      <p>
        Programa tu envío normalmente y en el paso de paquete agrega el cobro a
        destinatario, ingresando el monto total que será cobrado a quien reciba
        el paquete.
      </p>
    ),
    icon: <MdViewInAr className="w-6 h-6" style={{ color: iconColor }} />,
  },
  {
    title: "Cobro",
    description: (
      <p>
        El operador recibirá el cobro, lo aplicará en el sistema y lo entregará
        en oficinas, donde será resguardado hasta el cierre del corte semanal.
      </p>
    ),
    icon: <GiReceiveMoney className="w-6 h-6" style={{ color: iconColor }} />,
  },
  {
    title: "Corte semanal",
    description: (
      <p>
        Cuando hagas tu primer envío con cobro, se generará un corte semanal,
        puedes seguir programando cobros durante ese corte y se irán acumulando
        hasta el fin del corte.
      </p>
    ),
    icon: <TbReportMoney className="w-6 h-6" style={{ color: iconColor }} />,
  },
  {
    title: "Retorno",
    description: (
      <div>
        <p>
          Al finalizar el corte semanal, se entregará el dinero acumulado menos
          la comisión del cobro y las comisiones o costos del depósito, las
          opciones de retorno son:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Depósito en banco</li>
          <li>
            Depósito en tienda de conveniencia (aplica cargo de la tienda)
          </li>
          <li>Recoger efectivo en oficinas</li>
        </ul>
      </div>
    ),
    icon: <GiPayMoney className="w-6 h-6" style={{ color: iconColor }} />,
  },
];

export function Info() {
  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
          {/* Círculo con ícono */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            {step.icon}
          </div>
          <div>
            <h3 className="font-semibold">{step.title}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
