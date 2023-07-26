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
  


  const url = new URL(req.url);

  const take = url.searchParams.get("take");
  const lastCursor = url.searchParams.get("lastCursor");
  const order = url.searchParams.get("order");
  const filter = url.searchParams.get("filter");
  const search = url.searchParams.get("search");

  let filtros = [];

  if (filter && filter == '1') {
    filtros = [
      {
        estatusPedidoId:  1 
      },
      {
        estatusPedidoId:  2 
      }
    ]
  } else {
    filtros = [
      {
        estatusPedidoId:  parseInt(filter as string)
      },
    ]
  }

  let result = await prisma.pedido.findMany({
    where: {
        clienteId: currentUser.id,
        OR : filtros
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
    take: take ? parseInt(take as string) : 15,
    ...(lastCursor && {
   skip: 1, // Do not include the cursor itself in the query result.
   cursor: {
     id: parseInt(lastCursor as string),
   }
    }),
    orderBy: {
        createdAt: order == 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc,
    }
  }
  );


  if (result.length == 0) {
    return new Response(JSON.stringify({
   data: [],
   metaData: {
     lastCursor: null,
     hasNextPage: false,
   },
    }), { status: 200 });
  }

  const lastPostInResults: any = result[result.length - 1];
  const cursor: any = lastPostInResults.id;

  const nextPage = await prisma.pedido.findMany({
    // Same as before, limit the number of events returned by this query.
    where: {
      clienteId: currentUser.id,
      OR : filtros
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
      take: take ? parseInt(take as string) : 10,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
          id: cursor,
          },
      orderBy: {
          createdAt:order == 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc,
      }
      });

  const data = {
    data: result, metaData: {
    lastCursor: cursor,
    hasNextPage: nextPage.length > 0,
      }
    };

  return new Response(JSON.stringify(data), { status: 200 });
   } catch (error: any) {
  return new Response(JSON.stringify(JSON.stringify({ error: error.message })), { status: 403 });
   }
}