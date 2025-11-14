import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ServerDate } from "@/app/types";
import { getServerDate } from "@/app/api/utils/validatorUtils";
import { parseYMDLocal } from "@/app/utils/dateUtils";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body = await req.json();
    const { municipioRecId } = body;

    const sd: ServerDate = await getServerDate();
    const hoyString = `${sd.year}-${pad2(sd.month)}-${pad2(sd.day)}`;
    const datePrisma = new Date(sd.year, sd.month - 1, sd.day);
    const recLimit = 9 * 60 + 30;

    // Fechas bloqueadas desde BD (a partir de hoy)
    const blockedData: any[] = await prisma.$queryRaw`
      SELECT *, DATE_FORMAT(fecha,'%Y-%m-%d') as fechaString
      FROM hawk_prisma.BloqueoServicios
      WHERE fecha >= ${hoyString} AND (servicio = "REC" OR servicio = "TODO")
    `;

    // Si es después de 09:30, bloquear el mismo día (regla existente)
    if (sd.totalMinutes > recLimit) {
      blockedData.push(createBlockedObject(hoyString, "regla_horaria"));
    }

    // 🔒 Regla municipio 10: permitir SOLO sábados futuros (no hoy)
    if (municipioRecId === 10) {
      const extraBlocks = saturdayOnlyBlocks(datePrisma, 30); // hoy + 30 = 31 días visibles
      blockedData.push(...extraBlocks);
    }
    console.log(blockedData);
    return new Response(JSON.stringify(blockedData), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}

/** Crea un registro de bloqueo coherente con tu shape actual */
function createBlockedObject(fechaString: string, tipo: string = "normal") {
  return {
    id: Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`), // id sintético
    fecha: parseYMDLocal(fechaString),
    servicio: "REC",
    tipo,
    customMessage: null,
    createdAt: null,
    createdBy: 2,
    fechaString,
  };
}

/** YYYY-MM-DD (zero-padded) */
function formatYMD(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function addDaysLocal(d: Date, days: number) {
  const base = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  base.setDate(base.getDate() + days);
  return base;
}

/**
 * Genera bloqueos para "solo sábados":
 * - Bloquea HOY siempre (si hoy es sábado, no se puede elegir hoy).
 * - Bloquea todos los días que NO sean sábado en el rango hoy..hoy+30.
 *   Resultado: el único día habilitado será cada sábado FUTURO (i>0).
 */
function saturdayOnlyBlocks(hoyLocal: Date, horizonDays: number) {
  const out: any[] = [];
  for (let i = 0; i <= horizonDays; i++) {
    const d = addDaysLocal(hoyLocal, i);
    const isSaturday = d.getDay() === 6; // 0=Dom ... 6=Sáb
    const isToday = i === 0;

    // Bloquear si NO es sábado, o si es sábado y es HOY
    if (!isSaturday || isToday) {
      out.push(createBlockedObject(formatYMD(d), "regla_municipio_10"));
    }
  }
  return out;
}
