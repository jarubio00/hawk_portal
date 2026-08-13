import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";
import { ApiResponse } from "@/app/types";
import prisma from "@/app/libs/prismadb";
import { esComprobanteUrlValida } from "@/app/utils/comprobante";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  //console.log("Preupload route");
  const body = await request.formData();

  const pedidoId = body.get("pedido")?.toString() || "";
  const apiUrl = `https://hawkapi.lamensajeria.mx/api/v1/portal/preupload/${currentUser.email}-${currentUser.id}`;

  const segment = getDateSegment(new Date("2025-07-06T07:00:00"));
  const result = await axios({
    method: "post",
    url: apiUrl,
    data: body,
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      let percentCompleted = 0;
      if (progressEvent.loaded && progressEvent.total) {
        percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        //console.log(`Upload Progress: ${percentCompleted}%`);
      }
    },
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

  function getDateSegment(date: Date) {
    //console.log(date);
    //console.log(date.getDay());
  }

  // Antes esto devolvía 200 con status:2 cuando fallaba, así que axios lo tomaba
  // como éxito y el wizard habilitaba el botón de generar envío sin comprobante.
  // Un fallo tiene que verse como fallo desde el código HTTP.
  if (result?.status != 1 || !esComprobanteUrlValida(result?.downloadUrl)) {
    return NextResponse.json(
      { status: 2, statusMessage: "No se pudo cargar el comprobante" },
      { status: 502 }
    );
  }

  return NextResponse.json({
    status: 1,
    statusMessage: "OK",
    downloadUrl: result.downloadUrl,
  });
}
