import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
//import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    // get page and lastCursor from query

    /* const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  } */

    /*  const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    } */

    const url = new URL(req.url);

    const pedidoId = url.searchParams.get("pedidoId");

    let result = await prisma.pedido.findUnique({
      where: {
        id: parseInt(pedidoId || "0"),
      },
      include: {
        recoleccion: {
          include: {
            municipio: true,
          },
        },
        municipio: true,
        formaPago: true,
        tipoPaquete: true,
        estatusPedido: true,
        operaciones: true,
        incidencias: {
          include: {
            fotos: true,
          },
          orderBy: {
            createdAt: Prisma.SortOrder.desc,
          },
        },
      },
    });

    const data = {
      data: result,
    };

    return new Response(JSON.stringify(result), { status: 200 });
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
