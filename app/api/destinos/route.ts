import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userActivityRegister } from "@/app/api/utils/activity";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    clienteId,
    contactoNombre,
    contactoTel,
    cpId,
    calle,
    numero,
    numeroInt,
    colonia,
    municipioId,
    empresa,
    referencias,
    isOtraColonia,
    otraColonia,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const coloniaVal = isOtraColonia ? otraColonia : colonia;

  const direccion = await prisma.destino.create({
    //@ts-ignore
    data: {
      clienteId,
      contactoNombre,
      contactoTel,
      cpId,
      calle,
      numero,
      numeroInt,
      colonia: coloniaVal,
      municipioId,
      empresa,
      referencias,
      otraColonia: isOtraColonia,
    },
  });

  const activity = await userActivityRegister(currentUser.id, 9);

  return NextResponse.json(direccion);
}
