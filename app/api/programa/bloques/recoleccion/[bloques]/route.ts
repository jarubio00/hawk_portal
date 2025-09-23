import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { format, subHours, addHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import {
  checkLimitRecolecciones,
  checkRecolecciones,
} from "../../../auto/[auto]/utils";
import { cl } from "@/app/api/utils/utils";
import { getServerDate } from "@/app/api/utils/validatorUtils";
import { ServerDate } from "@/app/types";

interface IParams {
  bloques?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { direccionId } = body;

  if (!currentUser || !direccionId) {
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
  const sd: ServerDate = await getServerDate();

  console.log(fechaQuery);
  console.log(fechaUTC);
  console.log("--------");
  console.log(sd);
  console.log("--------");

  cl("PROGRA", fecha.toISOString());

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
  let matchMD = false;
  let amDisponible = false;
  let pmDisponible = false;

  if (blocked && blocked.length >= 1) {
    blocked.map((val) => {
      if (val.bloque == "AM") {
        matchAm = true;
      } else if (val.bloque == "PM") {
        matchPm = true;
      } else if (val.bloque == "MD") {
        matchMD = true;
      }
    });
  }

  let bloque1LimitTotal = 9 * 60 + 30;
  let bloque2LimitTotal = 14 * 60 + 30;
  let nowMinutes = hoyUTC.getHours() * 60 + hoyUTC.getMinutes();

  /*  if (conf) {
    bloque1LimitTotal = conf.bloque1HoraLimit * 60 + conf.bloque1MinutosLimit;
    bloque2LimitTotal = conf.bloque2HoraLimit * 60 + conf.bloque2MinutosLimit;
  } */

  if (fechaQuery) {
    const hoyDate = format(hoy, `yyyy-MM-dd`);
    const fechaDate = format(fecha, `yyyy-MM-dd`);

    const bloque1Limit = 10;
    const bloque2Limit = 15;

    //console.log(conf);

    //console.log("cambio horario tests.......");
    //console.log(fecha);
    //console.log(hoy);

    //console.log("cambio horario tests<<<<<.......>>>>>");

    if (hoyDate == fechaDate) {
      if (fecha.getDay() == 6) {
        if (nowMinutes < bloque1LimitTotal) {
          amDisponible = true;
        }
      } else {
        if (nowMinutes < bloque1LimitTotal) {
          amDisponible = true;
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
    md: matchMD ? false : true,
    recsB1: recCheck1.length >= 1,
    recsB1Data: recCheck1,
    recsB2: recCheck2.length >= 1,
    recsB2Data: recCheck2,
  };

  //console.log(result);
  return NextResponse.json(result);
}
