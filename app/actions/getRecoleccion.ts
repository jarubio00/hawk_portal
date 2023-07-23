import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getRecoleccion(id: any) {
    try {
        const currentUser = await getCurrentUser();
        //console.log(currentUser);
        let result = {};

        const recoleccion = await prisma.recoleccion.findUnique({
          where: {
            id: parseInt(id)
          }, 
          include: {
            municipio: true
          }
        });

        if(recoleccion) {

          if (recoleccion.clienteId == currentUser?.id) {
            return result = {status: 1, statusMessage: 'OK', data: recoleccion}
          } else {
            return result = {status: 2, statusMessage: 'No autorizado'}
          } 
        } else {
          return result = {status:2, statusMessage: 'No se encontró la recolección'}
        }
    
       
      } catch (error: any) {
        throw new Error(error);
      }
}