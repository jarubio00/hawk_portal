"use server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getDirecciones() {
  try {
    const currentUser = await getCurrentUser();
    //console.log(currentUser);

    const counts = await prisma.$queryRaw`
           SELECT 
            SUM(IF(estatusPedidoId = 1 OR estatusPedidoId = 2, 1,0)) AS activos,
            SUM(IF(estatusPedidoId = 4, 1,0)) AS entregados,
            SUM(IF(estatusPedidoId = 5, 1,0)) AS cancelados,
            SUM(IF(estatusPedidoId = 8, 1,0)) AS incidencias
          FROM Pedidos 
          WHERE clienteId = ${currentUser?.id};
         `;

    return counts;
  } catch (error: any) {
    throw new Error(error);
  }
}
