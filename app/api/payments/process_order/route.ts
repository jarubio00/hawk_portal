import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/mercado_pago/getAccessToken";
import axios from "axios";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const accessToken = await getAccessToken();
    const idempotencyKey = randomUUID();

    console.log("📦 Body recibido:", body);
    console.log("🔐 Access Token:", accessToken.slice(0, 15) + "...");

    const response = await axios.post(
      "https://api.mercadopago.com/v1/orders",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": idempotencyKey,
        },
      }
    );

    console.log("✅ Respuesta de Mercado Pago:", response.data);
    console.log("✅ Respuesta de Mercado Pago:", response.data.transactions);

    return NextResponse.json({
      status: "success",
      payment: response.data,
    });
  } catch (error: any) {
    console.error(
      "❌ Error al procesar pago:",
      error?.response?.data || error.message
    );

    console.error("❌ Detalles:", error?.response?.data.errors[0]);

    return NextResponse.json(
      {
        status: "error",
        message: error?.response?.data?.message || "Error al procesar el pago",
        details: error?.response?.data,
      },
      { status: 500 }
    );
  }
}
