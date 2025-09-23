import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function getAccessToken(): Promise<string> {
  const env = process.env.MP_ENVIRONMENT;

  if (env === "production") {
    const prodToken = process.env.MP_PROD_ACCESS_TOKEN;
    if (!prodToken) throw new Error("MP_PROD_ACCESS_TOKEN no definido");
    return prodToken;
  }

  // Sandbox: renovación vía OAuth
  const tokenRecord = await prisma.mercadoPagoOAuth.findFirst();
  if (!tokenRecord)
    throw new Error("No hay token OAuth almacenado en la base de datos");

  const [{ now }] = await prisma.$queryRawUnsafe<{ now: Date }[]>(
    `SELECT NOW() as now`
  );
  if (now < tokenRecord.expiresAt) return tokenRecord.accessToken;

  // Token expirado → renovar
  try {
    const response = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      null,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params: {
          grant_type: "client_credentials",
          client_id: process.env.MP_CLIENT_ID!,
          client_secret: process.env.MP_CLIENT_SECRET!,
        },
      }
    );

    const { access_token, expires_in } = response.data;
    const newExpiresAt = new Date(now.getTime() + expires_in * 1000);

    await prisma.mercadoPagoOAuth.update({
      where: { id: tokenRecord.id },
      data: {
        accessToken: access_token,
        expiresAt: newExpiresAt,
      },
    });

    return access_token;
  } catch (error: any) {
    console.error(
      "❌ Error al renovar token sandbox:",
      error?.response?.data || error.message
    );
    throw new Error("No se pudo renovar el token de Mercado Pago en sandbox");
  }
}
