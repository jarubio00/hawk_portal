import prisma from "@/app/libs/prismadb";
import { Prisma } from "@prisma/client";
//import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SafeRastreo } from "@/app/types";

interface IParams {
  pedidoId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { pedidoId } = params;

    if (!pedidoId || typeof pedidoId !== "string") {
      throw new Error("Invalid ID");
    }

    const data = await prisma.pedido.findUnique({
      where: {
        id: parseInt(pedidoId),
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
            motivo: true,
          },
          orderBy: {
            createdAt: Prisma.SortOrder.desc,
          },
        },
      },
    });

    let rastreo: SafeRastreo;

    if (data && data.operaciones) {
      const ops = data.operaciones;
      const incis = data.incidencias;
      const incisRecArray = incis.filter((inci) => inci.tipoId === 2);
      const incisEntArray = incis.filter((inci) => inci.tipoId == 3);

      rastreo = {
        programado: true,
        programadoAt: data.createdAt,
        enRutaRec:
          ops.punteoRecoleccion ||
          ops.recolectado ||
          ops.punteoEntrega ||
          ops.entregado
            ? true
            : false,
        enRutaRecAt: ops.punteoRecoleccionAt
          ? ops.punteoRecoleccionAt
          : undefined,
        recolectado:
          ops.recolectado || ops.punteoEntrega || ops.entregado ? true : false,
        recolectadoAt: ops.recolectadoAt ? ops.recolectadoAt : undefined,
        enRutaEnt: ops.punteoEntrega || ops.entregado ? true : false,
        enRutaEntAt: ops.punteoEntregaAt ? ops.punteoEntregaAt : undefined,
        entregado: ops.entregado ? true : false,
        entregadoAt: ops.entregadoAt ? ops.entregadoAt : undefined,
        incidenciaRec: incisRecArray.length ? true : false,

        incidenciaEnt: incisEntArray.length ? true : false,
      };
    } else {
      rastreo = {};
    }

    const result = rastreo;

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
