import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  direccionId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { direccionId } = params;

  if (!direccionId || typeof direccionId !== 'string') {
    throw new Error('Invalid ID');
  }

  const direccion = await prisma.direccion.deleteMany({
    where: {
      id: parseInt(direccionId),
      clienteId: currentUser.id
    }
  });

  return NextResponse.json(direccion);
}

export async function PATCH(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { direccionId } = params;

  if (!direccionId || typeof direccionId !== 'string') {
    throw new Error('Invalid ID');
  }

  if (!body) {
    throw new Error('No Changes!');
  }

  const direccion = await prisma.direccion.update({
    where: {
      id: parseInt(direccionId),
    }, 
    data: body
  });

  return NextResponse.json(direccion);
}