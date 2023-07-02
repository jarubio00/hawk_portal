import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  
  const { 
    tipoProductoId,
    municipioRecoleccionId,
    municipioEntregaId,
    paqPesoVol
   } = body;

   

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  let coberturaId = 1;

  if (municipioRecoleccionId == 10 || municipioEntregaId == 10) {
    coberturaId = 3
  }

  const cotiza = await prisma.catalogoProductos.findMany({
    where: {
        AND:[
                {
                    tipo_paquete_id: tipoProductoId
                },
                {
                    cobertura_id: coberturaId
                }
        ]
    }
  });


  return NextResponse.json(cotiza[0]);
}