import { NextResponse } from "next/server";
import qs from 'qs';
import axios from "axios";


export async function POST(
  request: Request, 
) {
  //const currentUser = await getCurrentUser();

  const body = await request.json();

  const {code, celular} = body;
  console.log(code);
  console.log(celular);
  var data = qs.stringify({
        "token": "nn07ocxik12qzh9n",
        "to": celular,
        "body": `Tú código de verificación de LaMensajeria.Mx es: ${code}`
    });

  var config = {
      method: 'post',
      url: 'https://api.ultramsg.com/instance56455/messages/chat',
      headers: {  
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    const result = await axios(config);

    console.log(result.data);
  

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
      response = {data: 'OK'} 
    } else {
      NextResponse.error();
    }
    
    //const response:ApiResponse = {status:,statusMessage: 'Error de API', response: {data: {}, error: error} }

  return NextResponse.json(response);
}