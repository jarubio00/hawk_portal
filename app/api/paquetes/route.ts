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
    clienteId, 
    paqAncho,
    paqAlto,
    paqLargo,
    paqPeso,
    paqContenido,
    paqTipoId,
    paqEmpaqueId,
    paqPesoVol,
    nombrePaquete
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
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
      nombrePaquete
    }
  });

  return NextResponse.json(direccion);
}