import { NextResponse } from "next/server";
import qs from "qs";
import axios from "axios";

export async function POST(request: Request) {
  //const currentUser = await getCurrentUser();

  const body = await request.json();

  const { code, celular } = body;
  //console.log(code);
  //console.log(celular);
  var data = {
    credentials: { apiKey: "Lxak42z6d2", apiSecret: "a7fcdrqbme" },
    destination: [`${celular.substring(1)}`],
    message: {
      msg: `Tú código de verificación de LaMensajeria.Mx es: ${code}`,
    },
    senderId: "remitente",
    encoding: "unicode",
  };

  //console.log(data);

  /* var data = {
      "token": "nn07ocxik12qzh9n",
      "to": celular,
      "body": `Tú código de verificación de LaMensajeria.Mx es: ${code}`
  }; */

  var config = {
    method: "post",
    url: "https://www.altiria.net:8443/apirest/ws/sendSms",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const result = await axios(config);

  //console.log(result.data);

  /* const result = await axios({
        method: "post",
        url: "https://hawkapi.lamensajeria.mx/api/v1/portal/uploadfile/3535",
        data: body,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        
        return response.data;
      })
      .catch(function (error) {
        const response:ApiResponse = {status:2,statusMessage: 'Error de API', response: {data: {}, error: error} }
        return response;
   });

   let response;

    if (result.status == 1 && result.downloadUrl.length >10) {

        const updatePedido = await prisma.pedido.update({
          where: {
            id: parseInt(pedidoId),
          },
          data: {
            comprobanteUrl: result.downloadUrl
          }
        });

        response = {status: 1, statusMessage: 'OK'}

    } else {
      response = {status: 2, statusMessage: 'No se pudo cargar el comprobante'}
    } */

  //const response = {status: 1,data: 'OK'}
  let response;
  const val = 1;
  if (val === 1) {
    response = { data: "OK" };
  } else {
    NextResponse.json(
      { error: "Error de validación de datos" },
      { status: 403 }
    );
  }

  //const response:ApiResponse = {status:,statusMessage: 'Error de API', response: {data: {}, error: error} }

  return NextResponse.json(response);
}
