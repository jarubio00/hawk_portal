import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";


export async function GET(req: Request){
 try {
  // get page and lastCursor from query

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  

  let result = await prisma.pedido.findMany({
    where: {
        clienteId: currentUser.id,
        //OR : filtros
    },
    include: {
      recoleccion : {
        include: {
          municipio: true
        }
      },
      municipio : true,
      formaPago: true,
      tipoPaquete: true,
      estatusPedido: true
    },
    take: 10,
    orderBy: {
        createdAt: Prisma.SortOrder.desc 
    }
  }
  );


  return new Response(JSON.stringify(result), { status: 200 });
   } catch (error: any) {
  return new Response(JSON.stringify(JSON.stringify({ error: error.message })), { status: 403 });
   }
}