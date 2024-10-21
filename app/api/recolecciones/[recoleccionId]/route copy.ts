import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  recoleccionId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { recoleccionId } = params;
  //console.log("api id: ", recoleccionId);

  if (!recoleccionId || typeof recoleccionId !== "string") {
    throw new Error("Invalid ID");
  }

  /* const recoleccion = await prisma.recoleccion.findUnique({
    where: {
      id: parseInt(recoleccionId),
    }
  }); */

  return NextResponse.json("OK");
}
