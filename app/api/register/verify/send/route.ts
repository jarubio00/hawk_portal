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
    email,
    phone,
    countryCode,
    type
   } = body;

   var code = Math.floor(1000 + Math.random() * 9000);
   console.log(body);
   console.log('code: ', code);


   const otp = await prisma.otpCodes.create({
    data: {
      uuid,
      email,
      phone,
      code,
      app: OtpApplication.register
    }
  });

  if (!otp) {
    return NextResponse.error();
  }

  const axiosConfig = {
    method: 'post',
      url: `https://nsgw-api.lamensajeria.mx/ns/${type}/otp`,
      data : {...body, code: code}
  }

  const otpResult = await axios(axiosConfig);

  console.log('response: ',otpResult.data);


  return NextResponse.json(otpResult.data);
}