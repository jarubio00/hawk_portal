"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaymentMethodSelector from "../../components/layout/main/wallet/PaymentMethodSelector";
import CurrencyInput from "../../components/layout/ui/CurrencyInput";

const RechargePage = () => {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("credit_card");

  const handleContinue = () => {
    if (amount <= 0) return;

    switch (selectedMethod) {
      case "credit_card":
        router.push("/customers/wallet/recharge/credit-card?amount=" + amount);
        break;
      // Aquí podrías agregar otros casos en el futuro
      default:
        alert("Método de pago aún no implementado.");
        break;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full min-h-screen bg-white">
      <button
        onClick={() => router.back()}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        aria-label="Regresar"
      >
        <ArrowLeft className="w-5 h-5 text-black" />
      </button>

      <h1 className="text-lg font-semibold text-black">Recargar saldo</h1>

      <div>
        <label htmlFor="amount" className="text-sm text-gray-700">
          Monto a recargar
        </label>
        <CurrencyInput
          value={amount}
          onChange={setAmount}
          min={100}
          max={10000}
          disabled={false}
        />
      </div>

      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-2">
          Método de pago
        </h2>
        <PaymentMethodSelector
          value={selectedMethod}
          onChange={setSelectedMethod}
        />
      </div>

      <button
        disabled={amount <= 0}
        onClick={handleContinue}
        className="mt-6 w-full py-3 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
      >
        Continuar con el pago
      </button>
    </div>
  );
};

export default RechargePage;
