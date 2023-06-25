import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import {format, subHours, addHours, addDays} from "date-fns"
import {checkIfBlockedRec, checkIfBlockedEnt} from "./utils";

interface IParams {
  auto?: string;
}

export async function GET(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { auto } = params;
  const bloque1Limit = 10;
  const bloque2Limit = 15;
  let recDate;
  let recBloque;
  let entDate;
  let entBloque;


  const testDays = 0;
  const hoyUTC = new Date();
  const hoy = addDays(subHours(hoyUTC,6),testDays);
  const hoySoloFecha =  format(hoy,`yyyy-MM-dd`);
  const hoySearch = new Date(hoySoloFecha);
  const hoyHora = hoyUTC.getHours();
  const blockedLimit = addDays(hoyUTC,6)

  console.log('auto date: ',hoy);
  console.log('solo fecha: ',hoySoloFecha);
  console.log('hora: ',hoyHora);
  console.log('hoy search: ', hoySearch);

  const blocked = await prisma.fechasBloqueadas.findMany({
    where: {
      fecha: {lte: blockedLimit, gte: hoySearch}
      }
    });
  //console.log(blocked)
 
  let newDate = hoy;
  let newBloque = 1; 
   if (hoyHora > bloque1Limit && hoyHora < bloque2Limit) {
    newDate = hoy;
    newBloque = 2; 
   } else if ( hoyHora >= bloque2Limit) {
    console.log('bloque 2 limit reached');
    newDate = addDays(hoy,1)
    newBloque = 1; 
   }

   console.log('date to check: ', newDate);

   const check = await checkIfBlockedRec(hoy,newBloque,blocked, hoyHora);

    if (!check) {  
      recDate = hoy;
      recBloque = 1;
    } else {
      let free = false;
      while (!free) {
       
        if (newBloque == 1) {
          newBloque = 2;
        } else if (newBloque == 2) {
          newDate = addDays(newDate,1)
          newBloque = 1;
        }
        const recheck = await checkIfBlockedRec(newDate,newBloque,blocked, hoyHora);
        free = !recheck ? true : false;
      } //while
      recDate = newDate;
      recBloque = newBloque;
    }

    console.log('final rec date: ',recDate);
    console.log('final rec bloque: ',recBloque);
  
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
      let free = false;
      while (!free) {
       
        if (entNewBloque == 1) {
          entNewBloque = 2;
        } else if (newBloque == 2) {
          entNewDate = addDays(entNewDate,1)
          entNewBloque = 1;
        }
        const recheck = await checkIfBlockedEnt(entNewDate,entNewBloque,blocked);
        free = !recheck ? true : false;
      } //while
      entDate = entNewDate;
      entBloque = entNewBloque;
    }
  
    console.log('final ent date: ',entDate);
    console.log('final ent bloque: ',entBloque);

    const response = {recDate: recDate, recBloque: recBloque, entDate: entDate, entBloque: entBloque}


  return NextResponse.json(response);
}

