import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import {
  format,
  subHours,
  addHours,
  addDays,
  getDay,
  getHours,
} from "date-fns";
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

  //console.log("fecha query: ", fechaUTC);
  //console.log("fecha server: ", hoyUTC);
  //console.log("hoydate: ", hoy);
  //console.log("fechaDate: ", fecha);

  let bloquesDisponibles = 0;
  let resDisponibles = 0;

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

  //("match AM: ", matchAm);
  //console.log("march PM: ", matchPm);
  //const date = format(addHours(val.fecha,6), `yyyy-MM-dd`);
  //console.log(format(blocked[0].fecha,`yyyy-MM-dd`));

  if (fechaQuery) {
    const hoyDate = format(hoy, `yyyy-MM-dd`);
    const fechaDate = format(fecha, `yyyy-MM-dd`);

    //console.log("fecha comp hoy: ", hoyDate);
    //console.log("fecha comp query: ", fechaDate);

    const bloque1Limit = 10;
    const bloque2Limit = 15;

    //Bloques ids
    // 1 = bloque 1 disponible
    // 2 = bloque 2 disponible
    // 12 = bloques 1 y 2 disponibles
    // 0 = ningun bloque disponible

    //console.log('hoy: ', hoy);
    //console.log("hora:", hoyUTC.getHours());

    if (hoyDate == fechaDate) {
      if (fecha.getDay() == 6) {
        if (hoy.getHours() < bloque1Limit) {
          bloquesDisponibles = 1;
        } else {
          bloquesDisponibles = 0;
        }
      } else {
        if (hoy.getHours() < bloque1Limit) {
          bloquesDisponibles = 12;
        } else {
          bloquesDisponibles = 2;
        }
      }
    } else {
      if (fecha.getDay() == 6) {
        bloquesDisponibles = 1;
      } else {
        bloquesDisponibles = 12;
      }
    }
  }

  return NextResponse.json(bloquesDisponibles);
}
