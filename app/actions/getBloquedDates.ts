"use server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { getServerDate } from "@/app/api/utils/validatorUtils";
import { ServerDate } from "@/app/types";
import { format, subHours, addHours, subDays } from "date-fns";

export default async function getBloquedDays() {
  try {
    //const currentUser = await getCurrentUser();
    //console.log(currentUser);
    const hoyUTC = new Date();
    const ayerUTC = subDays(hoyUTC, 1);
    const localDate = subHours(hoyUTC, 6);
    const sd: ServerDate = await getServerDate();

    const data = await prisma.fechasBloqueadas.findMany({
      where: {
        AND: [
          {
            bloque: "DIA",
          },
          {
            fecha: { gte: ayerUTC },
          },
        ],
      },
    });

    let bloquedRec: any[] = [];
    let bloquedEnt: any[] = [];

    let nowMinutes = hoyUTC.getHours() * 60 + hoyUTC.getMinutes();
    let bloque1LimitTotal = 9 * 60 + 30;

    data.map((date) => {
      if (date.tipo == "AMBOS") {
        bloquedEnt.push(date.fecha);
        bloquedRec.push(date.fecha);
      } else if (date.tipo == "REC") {
        bloquedRec.push(date.fecha);
      } else if (date.tipo == "ENT") {
        bloquedEnt.push(date.fecha);
      }
    });
    bloquedEnt.push(localDate);

    if (nowMinutes > bloque1LimitTotal) {
      bloquedRec.push(localDate);
    }

    const result = { bloquedRec: bloquedRec, bloquedEnt: bloquedEnt };

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
