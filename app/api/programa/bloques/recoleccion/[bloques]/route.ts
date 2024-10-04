import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { format, subHours, addHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import {
  checkLimitRecolecciones,
  checkRecolecciones,
} from "../../../auto/[auto]/utils";

interface IParams {
  bloques?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { direccionId } = body;

  if (!currentUser || !direccionId) {
    return NextResponse.error();
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

  const conf = await prisma.configuracionHorarios.findUnique({
    where: {
      id: 1,
    },
  });

  const blocked = await prisma.fechasBloqueadas.findMany({
    where: {
      AND: [
        {
          tipo: "REC",
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

  let bloque1LimitTotal = 9 * 60 + 30;
  let bloque2LimitTotal = 14 * 60 + 30;
  let nowMinutes = hoyUTC.getHours() * 60 + hoyUTC.getMinutes();

  if (conf) {
    bloque1LimitTotal = conf.bloque1HoraLimit * 60 + conf.bloque1MinutosLimit;
    bloque2LimitTotal = conf.bloque2HoraLimit * 60 + conf.bloque2MinutosLimit;
  }

  if (fechaQuery) {
    const hoyDate = format(hoy, `yyyy-MM-dd`);
    const fechaDate = format(fecha, `yyyy-MM-dd`);

    const bloque1Limit = 10;
    const bloque2Limit = 15;

    console.log(conf);

    console.log("change limit tests.......");
    console.log(fecha);
    console.log(fecha.getDay());
    console.log(nowMinutes);
    console.log(bloque1LimitTotal);
    console.log(bloque2LimitTotal);

    console.log("change limit tests<<<<<.......>>>>>");

    if (hoyDate == fechaDate) {
      if (fecha.getDay() == 6) {
        if (nowMinutes < bloque1LimitTotal) {
          amDisponible = true;
        }
      } else {
        if (nowMinutes < bloque1LimitTotal) {
          amDisponible = true;
          pmDisponible = true;
        } else if (
          nowMinutes >= bloque1LimitTotal &&
          nowMinutes < bloque2LimitTotal
        ) {
          pmDisponible = true;
        } else {
          amDisponible = false;
          pmDisponible = false;
        }
      }
    } else {
      if (fecha.getDay() == 6) {
        amDisponible = true;
      } else {
        amDisponible = true;
        pmDisponible = true;
      }
    }
  }

  //console.log("fecha: ", fecha);
  //console.log("dir id: ", direccionId);

  const recCheck1 = await checkRecolecciones(
    currentUser.id,
    fecha,
    1,
    direccionId
  );
  const recCheck2 = await checkRecolecciones(
    currentUser.id,
    fecha,
    2,
    direccionId
  );

  const result = {
    am: matchAm ? false : amDisponible,
    pm: matchPm ? false : pmDisponible,
    recsB1: recCheck1.length >= 1,
    recsB1Data: recCheck1,
    recsB2: recCheck2.length >= 1,
    recsB2Data: recCheck2,
  };

  //console.log(result);
  return NextResponse.json(result);
}
