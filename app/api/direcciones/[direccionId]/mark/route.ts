import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  direccionId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { direccionId } = params;

  if (!direccionId || typeof direccionId !== "string") {
    throw new Error("Invalid ID");
  }

  const mark = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      direccionDefaultId: parseInt(direccionId),
    },
  });

  return NextResponse.json(mark);
}
