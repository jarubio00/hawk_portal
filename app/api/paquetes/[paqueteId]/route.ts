import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { userActivityRegister } from "@/app/api/utils/activity";

interface IParams {
  paqueteId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { paqueteId } = params;

  if (!paqueteId || typeof paqueteId !== "string") {
    throw new Error("Invalid ID");
  }

  const paquete = await prisma.paquete.deleteMany({
    where: {
      id: parseInt(paqueteId),
      clienteId: currentUser.id,
    },
  });

  const activity = await userActivityRegister(currentUser.id, 14);

  return NextResponse.json(paquete);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { paqueteId } = params;

  if (!paqueteId || typeof paqueteId !== "string") {
    throw new Error("Invalid ID");
  }

  if (!body) {
    throw new Error("No Changes!");
  }

  /* Object.keys(body).map((key,index) => {
   console.log(key);
}); */

  const paquete = await prisma.paquete.update({
    where: {
      id: parseInt(paqueteId),
    },
    data: body,
  });

  const activity = await userActivityRegister(currentUser.id, 13);

  return NextResponse.json(paquete);
}
