import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const {
    tipoProductoId,
    municipioRecoleccionId,
    municipioEntregaId,
    paqPesoVol,
    mismoDia,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });

  let coberturaId = 1;

  if (municipioRecoleccionId == 10 || municipioEntregaId == 10) {
    coberturaId = 3;
  }

  if (mismoDia) {
    coberturaId = 5;
  }

  const cotiza = await prisma.catalogoProductos.findMany({
    where: {
      AND: [
        {
          tipo_paquete_id: tipoProductoId,
        },
        {
          cobertura_id: coberturaId,
        },
      ],
    },
  });

  //console.log(cotiza);
  return NextResponse.json(cotiza[0]);
}
