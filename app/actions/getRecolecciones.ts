import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getRecolecciones() {
    try {
        const currentUser = await getCurrentUser();
        //console.log(currentUser);

        const recolecciones = await prisma.recoleccion.findMany({
            where: {
                clienteId: currentUser?.id,
                estatusRecoleccionId: 1
            },
            include: {
              pedidos: {
                select: {
                  id: true,
                },
                orderBy: {
                  createdAt: 'desc'
                },
              },
              municipio: {
                select: {
                  municipio: true,
                },
              },
              estatus: {
                select: {
                  estatus: true,
                },
              }
            },
          orderBy: {
            createdAt: 'desc'
          }
        });
    
        
    
        return recolecciones;
      } catch (error: any) {
        throw new Error(error);
      }
}