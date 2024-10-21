import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
//import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    //caintidad en lugar de 1 dentro del if
    const counts: any = await prisma.$queryRaw`
    SELECT 
      SUM(IF(estatusCobroId = 1 OR estatusCobroId = 2 OR estatusCobroId = 3, 1,0)) AS activos,
      SUM(IF(estatusCobroId = 5, 1,0)) AS entregados,
      SUM(IF(estatusCobroId = 4, 1,0)) AS cancelados,
      SUM(IF(estatusCobroId = 3, cantidad,0)) AS cobrados,
      SUM(IF(estatusCobroId = 1 OR estatusCobroId = 2, cantidad,0)) AS porcobrar
    FROM CobrosDestino 
    WHERE clienteId = ${currentUser?.id};
  `;

    return new Response(JSON.stringify(counts[0]), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
}
