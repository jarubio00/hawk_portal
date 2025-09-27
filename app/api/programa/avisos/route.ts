import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { parseYMDLocal } from "@/app/utils/dateUtils";
import { ServerDate } from "@/app/types";
import { getServerDate } from "@/app/api/utils/validatorUtils";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const sd: ServerDate = await getServerDate();
    const hoyString = `${sd.year}-${pad2(sd.month)}-${pad2(sd.day)}`;

    // Fechas bloqueadas desde BD (a partir de hoy)
    const aviso: any[] = await prisma.$queryRaw`
      SELECT p.*, a.backgroundColor, a.backgroundImage, a.mobileBackgroundImage, a.message
      FROM hawk_prisma.AvisosProgramacion p
        INNER JOIN hawk_prisma.AvisoProgramacionContenido a ON p.avisoId = a.id
      WHERE inicio <= ${hoyString} AND fin >= ${hoyString} AND (activo = 1 AND pausa = 0) ORDER BY id DESC
    `;

    let result: any[] = [];

    if (aviso.length >= 1) {
      result = [{ ...aviso[0] }];
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}

/** Helpers de fecha */
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
