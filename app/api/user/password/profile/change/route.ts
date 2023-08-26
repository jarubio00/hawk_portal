import { NextResponse } from "next/server";
import { OtpApplication } from "@prisma/client";
import bcrypt from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    oldPassword,
    newPassword
   } = body;

   //console.log('ch body',body);

   if (!oldPassword|| !newPassword) {
    return NextResponse.error();
  }

   const dbPassword = await prisma.user.findUnique({
      where: {
        email: currentUser.email || undefined
      },
      select: {
        hashedPassword: true
      }
   }) 

   if (!dbPassword?.hashedPassword) {
    return NextResponse.error();
   }
   const isCorrectPassword = await bcrypt.compare(
    oldPassword,
    dbPassword.hashedPassword
  );

  let result;

  if (!isCorrectPassword) {
    result = {status: 2, statusMessage: 'Contraseña actual incorrecta'}
  } else {

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    
    const pass = await prisma.user.update({
        where: {
          email: currentUser.email || undefined,
        },
        data: {
          hashedPassword: hashedNewPassword
        }
    });

    if (pass) {
      result = {status: 1, statusMessage: 'Contraseña actualizada'}
    }
    
   
  }

  return NextResponse.json(result);
}
