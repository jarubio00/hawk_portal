import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
//import { userActivityRegister } from "@/app/api/utils/activity";

interface IParams {
  destinoId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { destinoId } = params;

  if (!destinoId || typeof destinoId !== "string") {
    throw new Error("Invalid ID");
  }

  const destino = await prisma.destino.deleteMany({
    where: {
      id: parseInt(destinoId),
      clienteId: currentUser.id,
    },
  });

  //const activity = await userActivityRegister(currentUser.id, 11);

  return NextResponse.json(destino);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { destinoId } = params;

  if (!destinoId || typeof destinoId !== "string") {
    throw new Error("Invalid ID");
  }

  if (!body) {
    throw new Error("No Changes!");
  }

  const destino = await prisma.destino.update({
    where: {
      id: parseInt(destinoId),
    },
    data: body,
  });

  //const activity = await userActivityRegister(currentUser.id, 10);

  return NextResponse.json(destino);
}
