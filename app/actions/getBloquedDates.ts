import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import {format, subHours, addHours, subDays} from "date-fns"


export default async function getBloquedDays() {
    try {
        //const currentUser = await getCurrentUser();
        //console.log(currentUser);
        const hoyUTC = new Date();
        const ayerUTC = subDays(hoyUTC,1);


        const data = await prisma.fechasBloqueadas.findMany({
          where: {
            AND: [
              {
                bloque: 'DIA'
              },
              {
                fecha: {gte: ayerUTC}
              }
                ]
            }
        });

        let bloquedRec:any[] = [];
        let bloquedEnt:any[] = [];

        data.map((date) => {
          if(date.tipo == 'AMBOS') {
            bloquedEnt.push(date.fecha);
            bloquedRec.push(date.fecha);
          } else if ( date.tipo == 'REC') {
            bloquedRec.push(date.fecha);
          } 
          else if ( date.tipo == 'ENT') {
            bloquedEnt.push(date.fecha);
          } 

        });

        const result = {bloquedRec: bloquedRec, bloquedEnt: bloquedEnt}
       
        return result;

      } catch (error: any) {
        throw new Error(error);
      }
}