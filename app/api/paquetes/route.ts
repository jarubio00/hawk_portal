import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userActivityRegister } from "@/app/api/utils/activity";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const {
    clienteId,
    paqAncho,
    paqAlto,
    paqLargo,
    paqPeso,
    paqContenido,
    paqTipoId,
    paqEmpaqueId,
    paqPesoVol,
    nombrePaquete,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.json(
        { error: "Error de validación de datos" },
        { status: 403 }
      );
    }
  });

  const direccion = await prisma.paquete.create({
    //@ts-ignore
    data: {
      clienteId,
      paqAncho: parseFloat(paqAncho),
      paqAlto: parseFloat(paqAlto),
      paqLargo: parseFloat(paqLargo),
      paqPeso: parseFloat(paqPeso),
      paqContenido,
      paqTipoId: parseInt(paqTipoId),
      paqEmpaqueId: parseInt(paqEmpaqueId),
      paqPesoVol: parseFloat(paqPesoVol),
      nombrePaquete,
    },
  });

  const activity = await userActivityRegister(currentUser.id, 12);
  return NextResponse.json(direccion);
}
