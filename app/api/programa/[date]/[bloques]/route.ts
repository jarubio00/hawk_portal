import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import {format, subHours, getDay, getHours} from "date-fns"

interface IParams {
  bloques?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { bloques } = params;
  const fechaQuery = bloques;

  if (!fechaQuery || typeof fechaQuery !== 'string') {
    throw new Error('Dato inválido');
  }

  const fecha = new Date(fechaQuery);
  const hoyUTC = new Date();
  const hoy = subHours(hoyUTC, 6);


  const blocked = await prisma.fechasBloqueadas.findMany({
    where: {
      AND: [
        {
          tipo: 'REC'
        },
        {
          fecha: {gte: hoy}
        }
      ]
       
        
    },
    orderBy: {
      fecha: 'desc'
    }
});
console.log(blocked);

  if(fechaQuery) {
   
    const hoyDate = format(hoy,`yyyy-MM-dd`);
    const fechaDate = format(fecha,`yyyy-MM-dd`);

    const bloque1Limit = 10;
    const bloque2Limit = 15;
    let bloquesDisponibles;

    //Bloques ids
    // 1 = bloque 1 disponible 
    // 2 = bloque 2 disponible
    // 12 = bloques 1 y 2 disponibles
    // 0 = ningun bloque disponible

    if (hoyDate == fechaDate) {
      if (fecha.getDay() == 6 ) {
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
          if (fecha.getDay() == 5 ) {
              bloquesDisponibles = 1;
          } else {
              bloquesDisponibles = 12;
          }
      }
      console.log(fecha);
      console.log(fecha.getDay());
      console.log(bloquesDisponibles);

  }
  

  

  return NextResponse.json('OK');
}

