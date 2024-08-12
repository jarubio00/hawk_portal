import { NextResponse } from "next/server";
import { OtpApplication } from "@prisma/client";
import bcrypt from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";
//import { userActivityRegister } from "@/app/api/utils/activity";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "No autorizado", status: 401 });
  }

  const body = await request.json();
  const { empresa } = body;

  if (!empresa) {
    return NextResponse.json({ error: "Error de validación", status: 500 });
  }

  let result;

  const pass = await prisma.user.update({
    where: {
      email: currentUser.email || undefined,
    },
    data: {
      empresa: empresa,
    },
  });

  //const activity = await userActivityRegister(currentUser.id, 17);

  if (pass) {
    result = { status: 1, statusMessage: "Empresa actualizada" };
  } else {
    result = { status: 2, statusMessage: "Error al actualizar" };
  }

  return NextResponse.json(result);
}
