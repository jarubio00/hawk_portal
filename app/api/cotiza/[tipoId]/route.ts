import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getMismoDiaCotizaItem } from "@/app/api/utils/mismoDiaUtils";

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

  let result = [];

  let coberturaId = 1;

  if (municipioRecoleccionId == 10 || municipioEntregaId == 10) {
    coberturaId = 3;
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

  result.push(cotiza[0]);

  if (mismoDia) {
    // Cobra promo_md cuando está vigente y es más barato que servicio_md,
    // conservando la descripción de servicio_md en el renglón
    const itemMd = await getMismoDiaCotizaItem();

    if (itemMd) {
      result.push(itemMd);
    }
  }

  //console.log(cotiza);
  return NextResponse.json(result);
}
