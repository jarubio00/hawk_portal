import { NextResponse } from "next/server";
import { ServerDate } from "@/app/actions/date";

import { OtpApplication } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import axios from "axios";
import { userActivityRegister } from "@/app/actions/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { uuid, code, email, phone, countryCode } = body;

  console.log("ch body", body);

  const date = ServerDate(new Date());

  console.log("raw date: ", date);

  if (!uuid || !code || !email || !phone) {
    return NextResponse.json({ error: "Error de validación", status: 500 });
  }

  const dbOtp: any = await prisma.$queryRaw`
    SELECT *,TIMESTAMPDIFF(SECOND,now(),expireAt) AS diff FROM OtpCodes WHERE uuid=${body.uuid}
   `;

  let result;
  const otp = dbOtp[0];

  if (parseInt(otp.diff) < 1) {
    result = { status: 2, statusMessage: "Tiempo expirado" };
    return NextResponse.json(result);
  }

  if (otp.code.toString() !== code.toString()) {
    result = { status: 2, statusMessage: "No autorizado" };
  } else {
    const pass = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        celular: phone,
        countryCode: countryCode,
        checklist: {
          update: {
            where: { clienteEmail: email },
            data: {
              celularVerificado: true,
              celularVerificadoAt: date,
            },
          },
        },
      },
      include: {
        checklist: true,
      },
    });

    if (pass) {
      result = { status: 1, statusMessage: "Celular verificado" };
      const activity = await userActivityRegister(pass.id, 5);
    }
  }

  return NextResponse.json(result);
}
