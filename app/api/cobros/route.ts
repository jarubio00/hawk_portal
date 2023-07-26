import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";


export async function GET(req: Request){
 try {
  // get page and lastCursor from query


  let result = await prisma.pedido.findMany({
    where: {
        clienteId: 2,
        //OR : filtros
    }
  }
  );


  return new Response(JSON.stringify(result), { status: 200 });
   } catch (error: any) {
  return new Response(JSON.stringify(JSON.stringify({ error: error.message })), { status: 403 });
   }
}