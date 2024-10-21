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

    const counts: any = await prisma.$queryRaw`
    SELECT 
      SUM(IF(estatusPedidoId = 1 OR estatusPedidoId = 2, 1,0)) AS activos,
      SUM(IF(estatusPedidoId = 4, 1,0)) AS entregados,
      SUM(IF(estatusPedidoId = 5, 1,0)) AS cancelados,
      SUM(IF(estatusPedidoId = 8, 1,0)) AS incidencias
    FROM Pedidos 
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
