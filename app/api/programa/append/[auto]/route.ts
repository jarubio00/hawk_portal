import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { addDays, format } from "date-fns";
import {checkIfBlockedRec, checkIfBlockedEnt} from "./utils";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  
  const { 
    fecha,
    bloque
   } = body;

   console.log('fecha post:', fecha);
   console.log('bloque post: ', bloque);

   

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  
  const fechaDate = new Date(fecha);
  const fechaSoloFecha =  format(fechaDate,`yyyy-MM-dd`);
  const hoySearch = new Date(fechaSoloFecha);
  const blockedLimit = addDays(fechaDate,6)
  console.log('date format fecha: ', fechaDate);
  console.log(hoySearch);
  console.log(blockedLimit);

  const blocked = await prisma.fechasBloqueadas.findMany({
    where: {
      fecha: {lte: blockedLimit, gte: hoySearch}
      }
    });

    let recDate = fechaDate;
    let recBloque = bloque;
  
    console.log('final rec date: ',recDate);
    console.log('final rec bloque: ',recBloque);

    const bloque1Limit = 10;
    const bloque2Limit = 15;

    let entDate;
    let entBloque;
    let newDate = recDate;
    let newBloque = recBloque;

   ///ENTREGA
    let entNewDate = newDate;
    let entNewBloque = 1; 

   if (recBloque == 1) {
      entNewDate = newDate;
      entNewBloque = 2;
   } else if (newBloque == 2) {
      entNewDate = addDays(newDate,1);
      entNewBloque = 1;
   }

   const checkEnt = await checkIfBlockedEnt(entNewDate,entNewBloque,blocked);
   console.log(checkEnt);

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
          entNewDate = addDays(entNewDate,1)
          entNewBloque = 1;
        }
        const recheck = await checkIfBlockedEnt(entNewDate,entNewBloque,blocked);
        free = !recheck ? true : false;
        counter++;
        if (counter == 10) {
          free = true;
        }
      } //while
      entDate = entNewDate;
      entBloque = entNewBloque;
    }
  
    console.log('final ent date: ',entDate);
    console.log('final ent bloque: ',entBloque);

    const response = {recDate: recDate, recBloque: recBloque, entDate: entDate, entBloque: entBloque}


  return NextResponse.json(response);
}