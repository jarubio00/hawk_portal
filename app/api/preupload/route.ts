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

  let response;

  if (result.status == 1 && result.downloadUrl.length > 10) {
    response = {
      status: 1,
      statusMessage: "OK",
      downloadUrl: result.downloadUrl,
    };
  } else {
    response = { status: 2, statusMessage: "No se pudo cargar el comprobante" };
  }

  function getDateSegment(date: Date) {
    //console.log(date);
    //console.log(date.getDay());
  }

  return NextResponse.json(response);
}
