import prisma from "@/app/libs/prismadb";
import { ServerDate } from "@/app/types";

export async function getServerDate() {
  try {
    const mysqlDate: any =
      await prisma.$queryRaw`SELECT DATE_FORMAT(NOW(),'%Y:%m:%d:%H:%i:%s:%w') as now;`;
    const fd = mysqlDate[0].now;
    const split = fd.split(":");
    const composedStringFullDate = `${split[0]}-${split[1]}-${split[2]}T${split[3]}:${split[4]}:${split[5]}.000Z`;
    const composedStringDate = `${split[0]}-${split[1]}-${split[2]}`;
    const composedFullDate = new Date(composedStringFullDate);
    const composedDate = new Date(composedStringDate);

    const result: ServerDate = {
      year: parseInt(split[0]),
      month: parseInt(split[1]),
      day: parseInt(split[2]),
      hours: parseInt(split[3]),
      minutes: parseInt(split[4]),
      seconds: parseInt(split[5]),
      dayNumber: parseInt(split[6]),
      totalMinutes: parseInt(split[3]) * 60 + parseInt(split[4]),
      composedFullDate: composedFullDate,
      composedDate: composedDate,
    };
    //dayNumber: Domingo: 0, Lunes 1,  ..., Sabado 6
    return result;
  } catch (err) {
    throw new Error("Error al obtener la fecha");
  }
}

export function parseStringDate(date: string) {
  const split = date.split("T");
  const splittedDate = split[0].split("-");
  const splittedTime = split[1].split(":");

  const composedFullDate = new Date(date);
  const composedDate = new Date(split[0]);

  const result: ServerDate = {
    year: parseInt(splittedDate[0]),
    month: parseInt(splittedDate[1]),
    day: parseInt(splittedDate[2]),
    hours: parseInt(splittedTime[0]),
    minutes: parseInt(splittedTime[1]),
    seconds: parseInt(splittedTime[2]),
    dayNumber: composedDate.getUTCDay(),
    totalMinutes: parseInt(splittedTime[0]) * 60 + parseInt(splittedTime[1]),
    composedDate: composedDate,
    composedFullDate: composedFullDate,
  };
  //dayNumber: Domingo: 0, Lunes 1,  ..., Sabado 6
  return result;
}

export function sameDay(d1: ServerDate, d2: ServerDate) {
  let result = false;

  if (d1.year === d2.year) {
    if (d1.month === d2.month) {
      if (d1.day === d2.day) {
        result = true;
      }
    }
  }

  return result;
}

export async function isBlockedDate(dr: ServerDate, type: "REC" | "ENT") {
  let result = false;
  const gteString = `${dr.year}-${dr.month.toString().padStart(2, "0")}-${dr.day
    .toString()
    .padStart(2, "0")}T00:00:00.000Z`;
  //const gteString = "2025-05-14T00:00:00";
  const lte = `${dr.year}-${dr.month.toString().padStart(2, "0")}-${dr.day
    .toString()
    .padStart(2, "0")}T23:23:59.999Z`;
  const gte = new Date(gteString);

  try {
    const blocked = await prisma.fechasBloqueadas.findMany({
      where: {
        AND: [
          {
            tipo: type,
          },
          {
            fecha: { lte: lte, gte: gte },
          },
          {
            NOT: {
              bloque: "MD",
            },
          },
        ],
      },
      orderBy: {
        fecha: "desc",
      },
    });

    if (blocked.length) {
      result = true;
    }

    return result;
  } catch (e) {
    console.log(e);
  }
}
