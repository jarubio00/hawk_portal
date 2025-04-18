import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { format, subHours, addHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

interface IParams {
  bloques?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { bloques } = params;
  const fechaQuery = bloques;

  if (!fechaQuery || typeof fechaQuery !== "string") {
    throw new Error("Dato inválido");
  }

  const timezone = "America/Mexico_city";

  const fechaUTC = new Date(fechaQuery);
  const hoyUTC = new Date();
  const fecha = addHours(fechaUTC, 6);
  const hoy = subHours(hoyUTC, 6);

  const blocked = await prisma.fechasBloqueadas.findMany({
    where: {
      AND: [
        {
          tipo: "ENT",
        },
        {
          fecha: { lte: fechaUTC, gte: fechaUTC },
        },
      ],
    },
    orderBy: {
      fecha: "desc",
    },
  });

  let matchAm = false;
  let matchPm = false;

  let amDisponible = false;
  let pmDisponible = false;

  if (blocked && blocked.length >= 1) {
    blocked.map((val) => {
      if (val.bloque == "AM") {
        matchAm = true;
      } else if (val.bloque == "PM") {
        matchPm = true;
      }
    });
  }

  if (fechaQuery) {
    const hoyDate = format(hoy, `yyyy-MM-dd`);
    const fechaDate = format(fecha, `yyyy-MM-dd`);

    const bloque1Limit = 10;
    const bloque2Limit = 15;

    if (hoyDate == fechaDate) {
      if (fecha.getDay() == 6) {
        if (hoyUTC.getHours() < bloque1Limit) {
          amDisponible = true;
        }
      } else {
        if (hoyUTC.getHours() < bloque1Limit) {
          amDisponible = true;
        } else {
          amDisponible = false;
        }
      }
    } else {
      if (fecha.getDay() == 6) {
        amDisponible = true;
      } else {
        amDisponible = true;
      }
    }
  }

  const result = {
    am: matchAm ? false : amDisponible,
    pm: matchPm ? false : pmDisponible,
  };

  //console.log(result);
  return NextResponse.json(result);
}
