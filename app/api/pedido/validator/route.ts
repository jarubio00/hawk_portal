import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SafeRastreo, ServerDate } from "@/app/types";
import {
  getServerDate,
  isBlockedDate,
  parseStringDate,
  sameDay,
} from "../../utils/validatorUtils";
import { IValidatorResponse, ValidatorStatus } from "@/app/types/pedido";

interface IParams {
  pedidoId?: string;
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const { fechaRecoleccion, fechaEntrega } = body;
    let isValid = true;
    let issues: ValidatorStatus[] = [];

    //dayNumber: Domingo: 0, Lunes 1,  ..., Sabado 6
    const sd: ServerDate = await getServerDate();
    const dr: ServerDate = parseStringDate(fechaRecoleccion);
    const de: ServerDate = parseStringDate(fechaEntrega);

    /*  console.log(sd);
    console.log(sd.composedDate);
    console.log(dr.composedDate);
    console.log(fechaRecoleccion);
    console.log(fechaEntrega);
    console.log(sameDay(sd, dr)); */

    const isBlockedRec = await isBlockedDate(dr, "REC");
    const isBlockedEnt = await isBlockedDate(de, "ENT");

    //if (sameDay(sd, dr) && sd.totalMinutes > 9 * 60 + 30) {
    if (sameDay(sd, dr) && sd.totalMinutes > 9 * 60 + 40) {
      isValid = false;
      issues.push({
        issueCode: 1,
        issueMessage:
          "Limite de horario sobrepasado (MTY 09:30 AM), porfavor selecciona otra fecha de recolección.",
      });
    }

    if (dr.dayNumber === 0) {
      isValid = false;
      issues.push({
        issueCode: 2,
        issueMessage:
          "Fecha de recolección inválida (Domingo), porfavor selecciona otra fecha de recolección.",
      });
    }

    if (de.dayNumber === 0) {
      isValid = false;
      issues.push({
        issueCode: 3,
        issueMessage:
          "Fecha de entrega inválida (Domingo), porfavor selecciona otra fecha de entrega.",
      });
    }

    if (isBlockedRec) {
      isValid = false;
      issues.push({
        issueCode: 4,
        issueMessage:
          "Fecha bloqueada, porfavor selecciona otra fecha de recolección.",
      });
    }

    if (isBlockedEnt) {
      isValid = false;
      issues.push({
        issueCode: 4,
        issueMessage:
          "Fecha bloqueada, porfavor selecciona otra fecha de entrega.",
      });
    }

    const result = { valid: isValid, issues: issues };

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
