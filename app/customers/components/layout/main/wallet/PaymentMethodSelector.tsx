"use client";

import Image from "next/image";

interface PaymentMethod {
  value: string;
  label: string;
  description?: string;
  iconSrc: string;
}

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (method: string) => void;
}

const methods: PaymentMethod[] = [
  {
    value: "credit_card",
    label: "Tarjeta de crédito o débito",
    description: "Cuotas sin interés",
    iconSrc: "/icons/method-card.PNG",
  },
  {
    value: "transfer",
    label: "Transferencia electrónica",
    description: "Tus medios de pago favoritos",
    iconSrc: "/icons/method-card.PNG",
  },
  {
    value: "cash",
    label: "Efectivo",
    description: "Santander, HSBC y otros",
    iconSrc: "/icons/method-card.PNG",
  },
  {
    value: "mp_card",
    label: "Mi cuenta de mercado pago",
    iconSrc: "/icons/method-mp.PNG",
  },
];

export default function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="w-full rounded-xl border border-gray-200 divide-y divide-gray-200 overflow-hidden">
      {methods.map((method, index) => {
        const isSelected = value === method.value;

        const isFirst = index === 0;
        const isLast = index === methods.length - 1;

        const borderRadius = isFirst
          ? "rounded-tr-md"
          : isLast
          ? "rounded-br-md"
          : "";

        return (
          <label
            key={method.value}
            className={`relative flex items-center gap-3 px-4 h-20 transition cursor-pointer bg-white ${
              isSelected ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            {/* Borde azul izquierdo solo si está seleccionado */}
            {isSelected && (
              <div
                className={`absolute left-0 top-0 h-full w-1 bg-blue-500 ${borderRadius}`}
              />
            )}

            <input
              type="radio"
              name="paymentMethod"
              value={method.value}
              checked={isSelected}
              onChange={() => onChange(method.value)}
              className="sr-only"
            />

            <Image
              src={method.iconSrc}
              alt={method.label}
              width={32}
              height={32}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-gray-900">
                {method.label}
              </span>
              {method.description && (
                <span className="text-xs text-gray-500">
                  {method.description}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
