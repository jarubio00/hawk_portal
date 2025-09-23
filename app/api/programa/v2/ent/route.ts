import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { parseYMDLocal } from "@/app/utils/dateUtils";
import { ServerDate } from "@/app/types";
import { getServerDate } from "@/app/api/utils/validatorUtils";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body = await req.json();
    const { fechaString, municipioEntId } = body as {
      fechaString: string; // "YYYY-MM-DD" (recolección)
      municipioEntId: number;
    };

    // Fecha base (recolección) en local, 00:00
    const pickupDate = parseYMDLocal(fechaString);

    // Trae bloqueos de BD a partir de la fecha de recolección
    const blockedData: any[] = await prisma.$queryRaw`
      SELECT *, DATE_FORMAT(fecha,'%Y-%m-%d') as fechaString
      FROM hawk_prisma.BloqueoServicios
      WHERE fecha >= ${fechaString} AND (servicio = "ENT" OR servicio = "TODO")
    `;

    const mismoDiaBlocked: any[] = await prisma.$queryRaw`
      SELECT *, DATE_FORMAT(fecha,'%Y-%m-%d') as fechaString
      FROM hawk_prisma.BloqueoServicios
      WHERE fecha = ${fechaString} AND (servicio = "MD" OR servicio = "TODO" ) ORDER BY id DESC
      `;

    // (opcional) si siempre bloqueas la fecha de recolección para entrega:
    blockedData.push(createBlockedObject(fechaString, "ENT", "regla_base"));

    // Reglas especiales: municipio 10 => solo sábados futuros dentro de 30 días
    if (municipioEntId === 10) {
      const horizonDays = 30; // hoy..+30 (31 días en total en el calendario)
      const extraBlocks = saturdayOnlyBlocksForDelivery(
        pickupDate,
        horizonDays
      );
      blockedData.push(...extraBlocks);
    }

    const fechaRecDate = parseYMDLocal(fechaString);

    let mismoDiaEnabled = true;
    if (mismoDiaBlocked.length) {
      mismoDiaEnabled = false;
    }

    if (fechaRecDate.getDay() == 6) {
      mismoDiaEnabled = false;
    }

    const result: any = {
      mismoDia: {
        enabled: mismoDiaEnabled,
        customMessage: mismoDiaBlocked[0]?.customMessage
          ? mismoDiaBlocked[0].customMessage
          : "",
      },
      blockedData: blockedData,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}

/** Crea un registro sintético de bloqueo compatible con tu shape */
function createBlockedObject(
  fechaString: string,
  servicio: "REC" | "ENT" | "TODO" = "ENT",
  tipo: string = "normal"
) {
  return {
    id: Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`),
    fecha: parseYMDLocal(fechaString),
    servicio,
    tipo,
    customMessage: null,
    createdAt: null,
    createdBy: 2,
    fechaString,
  };
}

/** Helpers de fecha */
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function formatYMD(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function addDaysLocal(d: Date, days: number) {
  const base = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  base.setDate(base.getDate() + days);
  return base;
}

/**
 * Genera bloqueos para que SOLO queden habilitados sábados FUTUROS
 * dentro del rango [pickup .. pickup+30]:
 * - Bloquea todo lo que NO sea sábado.
 * - Si el día 0 (pickup) es sábado, también se bloquea (no permite mismo sábado).
 * Resultado: quedarán seleccionables únicamente los sábados con i > 0.
 */
function saturdayOnlyBlocksForDelivery(pickupLocal: Date, horizonDays: number) {
  const blocks: any[] = [];
  for (let i = 0; i <= horizonDays; i++) {
    const d = addDaysLocal(pickupLocal, i);
    const isSaturday = d.getDay() === 6; // 0=Dom .. 6=Sáb
    const isSameDay = i === 0;

    // Bloquea si:
    // - NO es sábado, o
    // - ES sábado pero es el mismo día de recolección (i === 0)
    if (!isSaturday || isSameDay) {
      blocks.push(
        createBlockedObject(formatYMD(d), "ENT", "regla_municipio_10")
      );
    }
  }
  return blocks;
}
