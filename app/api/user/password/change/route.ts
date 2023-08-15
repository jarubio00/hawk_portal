import { NextResponse } from "next/server";
import { OtpApplication } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const {
    uuid,
    code,
    newPassword
   } = body;

   console.log('ch body',body);

   if (!uuid || !code || !newPassword) {
    return NextResponse.error();
  }


   const dbOtp:any = await prisma.$queryRaw`
    SELECT *,TIMESTAMPDIFF(SECOND,now(),expireAt) AS diff FROM OtpCodes WHERE uuid=${body.uuid}
   `;

  let result;
   const otp = dbOtp[0];

   console.log('dif: ', parseInt(otp.diff))

  if (parseInt(otp.diff) < 1) {
    result = {status: 2, statusMessage: 'Tiempo expirado'}
    return NextResponse.json(result);
  }

  if (otp.code.toString() !== code.toString()) {
    result = {status: 2, statusMessage: 'No autorizado'}
  } else {

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    const pass = await prisma.user.update({
        where: {
          email: otp.email,
        },
        data: {
          hashedPassword: hashedPassword
        }
    });

    if (pass) {
      result = {status: 1, statusMessage: 'Contraseña actualizada'}
    }

   
  }
   


  return NextResponse.json(result);
}