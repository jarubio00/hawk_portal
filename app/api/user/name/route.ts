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
  const { name } = body;

  console.log("ch body", body);

  if (!name) {
    return NextResponse.json({ error: "Error de validación", status: 500 });
  }

  let result;

  const pass = await prisma.user.update({
    where: {
      email: currentUser.email || undefined,
    },
    data: {
      nombre: name,
    },
  });

  if (pass) {
    result = { status: 1, statusMessage: "Nombre actualizado" };
    //const activity = await userActivityRegister(currentUser.id, 16);
  } else {
    result = { status: 2, statusMessage: "Error al actualizar" };
  }

  return NextResponse.json(result);
}
