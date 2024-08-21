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
    nombreDireccion,
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
    icon,
    color,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const coloniaVal = isOtraColonia ? otraColonia : colonia;

  /* const check = await prisma.direccion.findMany({
    where: {
      clienteId
    }
  });

  console.log(check); */

  const direccion = await prisma.direccion.create({
    data: {
      clienteId,
      nombreDireccion,
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
      icon,
      color,
    },
  });

  const direccionCompleta = await prisma.direccion.findUnique({
    where: {
      id: direccion.id,
    },
    include: {
      municipio: true,
    },
  });

  console.log(currentUser);

  if (!currentUser.direccionDefaultId) {
    const mark = await prisma.user.update({
      where: {
        id: clienteId,
      },
      data: {
        direccionDefaultId: direccion.id,
      },
    });
  }

  const activity = await userActivityRegister(currentUser.id, 6);

  return NextResponse.json(direccionCompleta);
}
