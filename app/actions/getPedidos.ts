import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getDirecciones() {
    try {
        const currentUser = await getCurrentUser();
        //console.log(currentUser);

        const recolecciones = await prisma.recoleccion.findMany({
            where: {
                clienteId: currentUser?.id,
            },
            include: {
              //@ts-ignore
              pedidos: true
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