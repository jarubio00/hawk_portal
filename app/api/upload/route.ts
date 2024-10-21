import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";
import { ApiResponse } from "@/app/types";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.formData();

  const pedidoId = body.get("pedido")?.toString() || "";

  const result = await axios({
    method: "post",
    url: "https://hawkapi.lamensajeria.mx/api/v1/portal/uploadfile/3535",
    data: body,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  let response;

  if (result.status == 1 && result.downloadUrl.length > 10) {
    const updatePedido = await prisma.pedido.update({
      where: {
        id: parseInt(pedidoId),
      },
      data: {
        comprobanteUrl: result.downloadUrl,
      },
    });

    response = { status: 1, statusMessage: "OK" };
  } else {
    response = { status: 2, statusMessage: "No se pudo cargar el comprobante" };
  }

  return NextResponse.json(response);
}
