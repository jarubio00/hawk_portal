import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    email,
   } = body;

   const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  let result;

 if (user) {
  result = {status: 1, statusMessage: 'El correo ya está registrado'}
 } else {
  result = {status: 2, statusMessage: 'Correo disponible'}
 }


  return NextResponse.json(result);
}