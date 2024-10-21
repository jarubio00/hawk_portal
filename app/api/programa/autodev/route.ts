import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { format, subHours, addHours, addDays, startOfDay } from "date-fns";
import {
  checkIfBlockedRec,
  checkIfBlockedEnt,
  checkRecolecciones,
} from "./utils";

interface IParams {
  auto?: string;
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  const body = await request.json();

  const { municipioRecId, municipioEntregaId } = body;

  if (!currentUser || !municipioRecId || !municipioRecId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  //Obteniendo hora del servidor
  const hoyDateUTC = new Date();
  //Restando 6 horas para obtener en tiempo central
  const hoyDate = subHours(hoyDateUTC, 6);

  //console.log(hoyDateUTC);
  //onsole.log(hoyDate);
  //console.log("municipio recoleccion: " + municipioRecId);
  //console.log("municipio entrega: " + municipioEntregaId);

  const hoyB1Limit = new Date("2024-09-17T11:30:00.000Z");
  //console.log(hoyB1Limit.getTime());
  //console.log(hoyDate.getTime());

  const timeDiff = hoyB1Limit.getTime() - hoyDate.getTime();
  const minDiff = timeDiff / 1000 / 60;

  //console.log(minDiff);

  const response = {};

  return NextResponse.json(response);
}
