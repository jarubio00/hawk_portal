import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ServerDate } from "@/app/types";
import { getServerDate } from "@/app/api/utils/validatorUtils";
import { parseYMDLocal } from "@/app/utils/dateUtils";

// Opción 1: Forzar que este endpoint sea dinámico (sin cache en build)
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const sd: ServerDate = await getServerDate();

    // Opción 2: Headers para evitar cache en cliente/CDN
    return new Response(JSON.stringify(sd), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
