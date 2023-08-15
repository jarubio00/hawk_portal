import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(
  request: Request, 
) {
  const body = await request.json();
  const { 
    email,
    nombre,
    password,
    celular
   } = body;

   const hashedPassword = await bcrypt.hash(password, 12);

   const user = await prisma.user.create({
    data: {
      email,
      nombre,
      hashedPassword,
      celular,
      checklist: {
        create: {
          clienteV2: true
        }
      }
    }
  });

  if (user) {
    const axiosConfig = {
      method: 'post',
        url: `https://nsgw-api.lamensajeria.mx/ns/email/welcome`,
        data : {email: email, nombre: nombre}
    }
  
    const otpResult = await axios(axiosConfig);
  
    console.log('response: ',otpResult.data);
  }
  



  return NextResponse.json(user);
}