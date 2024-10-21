import { NextResponse } from "next/server";
import { OtpApplication } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { uuid, code } = body;

  //console.log(body);

  if (!body.uuid || !body.code) {
    return NextResponse.json(
      { error: "Error de validación de datos" },
      { status: 403 }
    );
  }

  const dbOtp: any = await prisma.$queryRaw`
    SELECT *,TIMESTAMPDIFF(SECOND,now(),expireAt) AS diff FROM OtpCodes WHERE uuid=${body.uuid}
   `;

  let result;
  const otp = dbOtp[0];

  //console.log("dif: ", parseInt(otp.diff));

  if (parseInt(otp.diff) < 1) {
    result = { status: 2, statusMessage: "Código expirado" };
    return NextResponse.json(result);
  }

  if (otp.code.toString() !== code.toString()) {
    result = { status: 2, statusMessage: "Código incorrecto" };
  } else {
    result = { status: 1, statusMessage: "OK" };
  }

  return NextResponse.json(result);
}
