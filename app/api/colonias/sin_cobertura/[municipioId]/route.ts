import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  municipioId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const { municipioId } = params;

  if (!municipioId || typeof municipioId !== "string") {
    throw new Error("Invalid ID");
  }

  const colonias = await prisma.catalogoColonias.findMany({
    where: {
      custom: true,
      cp: {
        municipioId: parseInt(municipioId),
      },
    },
    orderBy: {
      colonia: "asc",
    },
  });

  if (!colonias || colonias.length === 0) {
    return NextResponse.json({
      status: 1,
      statusMessage: "OK",
      colonias: [],
    });
  }

  const formattedColonias = colonias.map((col) => ({
    value: col.id,
    label: col.colonia,
    cpId: col.cpId,
  }));

  return NextResponse.json({
    status: 1,
    statusMessage: "OK",
    colonias: formattedColonias,
  });
}
