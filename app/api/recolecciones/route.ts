import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
//import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    // get page and lastCursor from query
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let result = await prisma.recoleccion.findMany({
      where: {
        clienteId: currentUser.id,
        estatusRecoleccionId: 1,
      },
      include: {
        pedidos: {
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        municipio: {
          select: {
            municipio: true,
          },
        },
        estatus: {
          select: {
            estatus: true,
          },
        },
      },
    });

    if (result.length == 0) {
      return new Response(
        JSON.stringify({
          data: [],
        }),
        { status: 200 }
      );
    }

    let data1: any = [];
    let data2: any = [];
    let isMoreData = false;

    /*  if (result.length >3) {
    isMoreData = true;
    data1 = result.slice(0,3);
    data2 = result.slice(3);
  } else {
    data1 = result;
  } */

    const data = {
      data: result,
      //moreData: data2,
      //isMoreData: isMoreData
    };

    return new Response(JSON.stringify(data), { status: 200 });
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
