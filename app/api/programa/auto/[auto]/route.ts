import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { format, subHours, addHours, addDays } from "date-fns";
import {
  checkIfBlockedRec,
  checkIfBlockedEnt,
  checkRecolecciones,
} from "./utils";

interface IParams {
  auto?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  const { auto } = params;

  if (!currentUser || !auto) {
    return NextResponse.error();
  }

  const bloque1Limit = 10;
  const bloque2Limit = 15;
  let recDate;
  let recBloque;
  let entDate;
  let entBloque;

  //const hoyUTC = new Date('2023-08-19T15:42:09.864Z');
  const hoyUTC = new Date();
  const hoy = subHours(hoyUTC, 6);
  const hoySoloFecha = format(hoy, `yyyy-MM-dd`);
  const hoySearch = new Date(hoySoloFecha);
  let hoyHora = hoyUTC.getHours();
  const blockedLimit = addDays(hoyUTC, 6);

  //console.log("auto date utc: ", hoyUTC);
  //console.log("auto date: ", hoy);
  //console.log("solo fecha: ", hoySoloFecha);
  //console.log("hora: ", hoyHora);
  //console.log("hoy search: ", hoySearch);
  //console.log("hoy day", hoyUTC.getDay());

  const blocked = await prisma.fechasBloqueadas.findMany({
    where: {
      fecha: { lte: blockedLimit, gte: hoySearch },
    },
  });

  console.log("recs: ", blocked);

  let newDate = hoy;
  let newBloque = 1;

  //if (newDate.getDay() == 0) {hoyHora = 9};

  if (hoyHora >= bloque1Limit && hoyHora < bloque2Limit) {
    newDate = hoy;
    newBloque = 2;
  } else if (hoyHora >= bloque2Limit) {
    console.log("bloque 2 limit reached");
    newDate = addDays(hoy, 1);
    newBloque = 1;
  }

  //&& hoy.getDay() != 0
  //console.log("date to check: ", newDate);
  //console.log("bloque to check: ", newBloque);

  const check = await checkIfBlockedRec(hoy, newBloque, blocked, hoyHora);

  if (!check) {
    recDate = newDate;
    recBloque = newBloque;
  } else {
    let free = false;
    while (!free) {
      if (newBloque == 1) {
        newBloque = hoyUTC.getDay() == 0 ? 1 : 2;
      } else if (newBloque == 2) {
        newDate = addDays(newDate, 1);
        newBloque = 1;
      }
      //console.log("cheking: ", newDate);
      //console.log("cheking bloque: ", newBloque);
      const recheck = await checkIfBlockedRec(
        newDate,
        newBloque,
        blocked,
        hoyHora
      );
      free = !recheck ? true : false;
    } //while
    recDate = newDate;
    recBloque = newBloque;
  }

  //console.log("final rec date: ", recDate);
  //console.log("final rec bloque: ", recBloque);

  const recCheck = await checkRecolecciones(
    currentUser.id,
    recDate,
    recBloque,
    parseInt(auto)
  );
  //console.log("recs: ", recCheck.length);
  //console.log("dir id:", auto);
  ///ENTREGA
  let entNewDate = newDate;
  let entNewBloque = 1;

  if (recBloque == 1) {
    entNewDate = newDate;
    entNewBloque = 2;
  } else if (newBloque == 2) {
    entNewDate = addDays(newDate, 1);
    entNewBloque = 1;
  }

  const checkEnt = await checkIfBlockedEnt(entNewDate, entNewBloque, blocked);
  //console.log(checkEnt);

  if (!checkEnt) {
    entDate = entNewDate;
    entBloque = entNewBloque;
  } else {
    let counter = 0;
    let free = false;
    while (!free) {
      if (entNewBloque == 1) {
        entNewBloque = 2;
      } else if (entNewBloque == 2) {
        entNewDate = addDays(entNewDate, 1);
        entNewBloque = 1;
      }
      const recheck = await checkIfBlockedEnt(
        entNewDate,
        entNewBloque,
        blocked
      );
      free = !recheck ? true : false;
      counter++;
      if (counter == 10) {
        free = true;
      }
    } //while
    entDate = entNewDate;
    entBloque = entNewBloque;
  }

  //console.log("final ent date: ", entDate);
  //console.log("final ent bloque: ", entBloque);

  const response = {
    recDate: recDate,
    recBloque: recBloque,
    entDate: entDate,
    entBloque: entBloque,
    recs: recCheck.length >= 1,
    recsData: recCheck,
  };

  return NextResponse.json(response);
}
