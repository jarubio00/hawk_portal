"use client";

import { useEffect, useRef, useState } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Landmark } from "lucide-react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface SavedCard {
  id: string;
  issuer: string;
  payment_method: {
    name: string;
    thumbnail: string;
  };
  last_four_digits: string;
}

type CardOption = SavedCard | { id: "new" };

export default function CreditCardPage() {
  const [selectedCardId, setSelectedCardId] = useState("card_1");
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBrickReady, setIsBrickReady] = useState(false);
  const brickController = useRef<any>(null);
  const searchParams = useSearchParams();

  const amount = parseFloat(searchParams?.get("amount") ?? "0");
  const isUsingNewCard = selectedCardId === "new";

  useEffect(() => {
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (!PUBLIC_KEY || !isUsingNewCard) return;

    const initMercadoPago = async () => {
      await loadMercadoPago();

      const mp = new window.MercadoPago(PUBLIC_KEY, { locale: "es-MX" });
      const bricksBuilder = mp.bricks();

      const controller = await bricksBuilder.create(
        "cardPayment",
        "cardPaymentBrick_container",
        {
          initialization: {
            amount: amount,
            payer: { email: "test@testuser.com" },
          },
          customization: {
            visual: {
              hideFormTitle: true,
              hidePaymentButton: true,
            },
          },
          callbacks: {
            onReady: () => {
              console.log("✅ Brick listo");
              setIsBrickReady(true);
            },
            onError: (error: any) => {
              console.error("❌ Error en el Brick:", error);
            },
          },
        }
      );

      brickController.current = controller;
    };

    initMercadoPago();
  }, [isUsingNewCard, amount]);

  const savedCards: SavedCard[] = [
    {
      id: "card_1",
      issuer: "Banregio",
      payment_method: {
        name: "débito",
        thumbnail: "http://img.mlstatic.com/org-img/MP3/API/logos/master.gif",
      },
      last_four_digits: "7374",
    },
    {
      id: "card_2",
      issuer: "BBVA",
      payment_method: {
        name: "crédito",
        thumbnail: "http://img.mlstatic.com/org-img/MP3/API/logos/visa.gif",
      },
      last_four_digits: "1234",
    },
  ];

  const options: CardOption[] = [...savedCards, { id: "new" }];

  const normalizePaymentMethodId = (id: string) => {
    if (id.includes("visa")) return "visa";
    if (id.includes("master")) return "master";
    if (id.includes("amex")) return "amex";
    return id;
  };

  const normalizePaymentType = (type: string) => {
    const allowed = [
      "credit_card",
      "debit_card",
      "ticket",
      "atm",
      "bank_transfer",
      "account_money",
      "prepaid_card",
    ];

    if (allowed.includes(type)) return type;
    if (type.includes("cred")) return "credit_card";
    if (type.includes("deb")) return "debit_card";

    console.warn("⚠️ Tipo de pago desconocido:", type);
    return "credit_card";
  };

  const handlePayment = async () => {
    console.log("🟢 handlePayment ejecutado");

    if (isUsingNewCard) {
      if (!brickController.current) {
        console.warn("⚠️ Brick no inicializado aún.");
        return;
      }

      try {
        const formData = await brickController.current.getFormData();
        console.log("📤 Enviando datos:", formData);

        const payload = {
          type: "online",
          external_reference: "ext_ref_1234",
          total_amount: String(formData.transaction_amount),
          processing_mode: "automatic",
          payer: {
            email: formData.payer.email,
            identification: formData.payer.identification,
          },
          transactions: {
            payments: [
              {
                amount: String(formData.transaction_amount),
                payment_method: {
                  id: formData.payment_method_id,
                  type: normalizePaymentType(formData.payment_method_id),
                  token: formData.token,
                  installments: formData.installments,
                },
              },
            ],
          },
        };

        console.log(payload);

        const res = await fetch("/api/payments/process_order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();
        console.log("✅ Respuesta del servidor:", result);

        if (result.status === "success") {
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 2500);
        } else {
          alert("❌ Error al procesar el pago: " + result.message);
        }
      } catch (error) {
        console.error("❌ Error al enviar pago:", error);
      }
    } else {
      console.log("💳 Pago con tarjeta guardada (simulado)");
      setIsPaying(true);
      setTimeout(() => {
        setIsPaying(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2500);
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-6 bg-white min-h-screen">
      <h1 className="text-lg font-semibold text-black">Tarjetas guardadas</h1>

      <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
        {options.map((card, index) => {
          const isSelected = selectedCardId === card.id;
          const isFirst = index === 0;
          const isLast = index === options.length - 1;
          const isSavedCard = (card as SavedCard).payment_method !== undefined;

          return (
            <div
              key={card.id}
              onClick={() => setSelectedCardId(card.id)}
              className={`relative cursor-pointer ${
                isSelected ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              {isSelected && (
                <div
                  className={`absolute left-0 top-0 h-full w-1 bg-blue-500 z-10 ${
                    isFirst ? "rounded-tr-md" : isLast ? "rounded-br-md" : ""
                  }`}
                />
              )}

              <div className="relative z-20 flex items-center gap-3 p-4 pl-5">
                <div>
                  {isSavedCard ? (
                    <Image
                      src={(card as SavedCard).payment_method.thumbnail}
                      alt="issuer"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <Landmark className="w-6 h-6 text-gray-600" />
                  )}
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-gray-900">
                    {isSavedCard
                      ? `${(card as SavedCard).issuer} ${capitalize(
                          (card as SavedCard).payment_method.name
                        )} **** ${(card as SavedCard).last_four_digits}`
                      : "Usar tarjeta nueva"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isUsingNewCard && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 text-sm text-gray-600">
          <div id="cardPaymentBrick_container" />
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isPaying || isSuccess}
        className={`relative w-full py-3 rounded-md text-white font-semibold transition-all overflow-hidden text-center ${
          isSuccess
            ? "bg-green-600"
            : isPaying
            ? "bg-blue-600/80"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        style={{ height: "52px" }}
      >
        {isPaying && (
          <div className="absolute left-0 top-0 h-full w-full bg-blue-500 animate-pulse-progress" />
        )}

        {isSuccess ? (
          <div className="flex justify-center items-center">
            <svg
              className="w-6 h-6 animate-fade-in"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="white"
                className="animate-scale-in"
              />
              <path
                d="M6 12l4 4L18 8"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-path"
              />
            </svg>
          </div>
        ) : (
          <span className="relative z-10">Pagar</span>
        )}
      </button>
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
