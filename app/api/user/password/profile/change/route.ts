import { NextResponse } from "next/server";
import { OtpApplication } from "@prisma/client";
import bcrypt from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";
import md5 from "md5";
import { userActivityRegister } from "@/app/actions/utils";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { oldPassword, newPassword } = body;

  //console.log('ch body',body);

  if (!oldPassword || !newPassword) {
    return NextResponse.error();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: currentUser.email || undefined,
    },
  });

  if (!user) {
    return NextResponse.error();
  }

  let passToCompare = oldPassword;
  let isCorrectPassword;

  if (user.passwordType === "md5") {
    passToCompare = md5(oldPassword);
    isCorrectPassword = user.md5Pass === passToCompare;
  } else {
    isCorrectPassword = await bcrypt.compare(
      passToCompare,
      user.hashedPassword || ""
    );
  }

  let result;

  if (!isCorrectPassword) {
    result = { status: 2, statusMessage: "Contraseña actual incorrecta" };
  } else {
    if (user.passwordType === "md5") {
      const md5NewPass = md5(newPassword);
      const pass = await prisma.user.update({
        where: {
          email: currentUser.email || undefined,
        },
        data: {
          hashedPassword: md5NewPass,
          md5Pass: md5NewPass,
        },
      });

      if (pass) {
        result = { status: 1, statusMessage: "Contraseña actualizada" };
        const activity = await userActivityRegister(pass.id, 4);
      }
    } else {
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      const pass = await prisma.user.update({
        where: {
          email: currentUser.email || undefined,
        },
        data: {
          hashedPassword: hashedNewPassword,
        },
      });

      if (pass) {
        result = { status: 1, statusMessage: "Contraseña actualizada" };
        const activity = await userActivityRegister(pass.id, 4);
      }
    }
  }

  return NextResponse.json(result);
}
