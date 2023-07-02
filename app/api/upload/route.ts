import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";
import { ApiResponse } from "@/app/types";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.formData()
  
  /* const { 
    data
   } = body; */

 /*  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  }); */

  //console.log(body);

  /* const result = await axios.post(`https://hawkapi.lamensajeria.mx/api/v1/portal/uploadfile/3535`, )
      .then((response) => {
        const responseData:ApiResponse = {status:1,statusMessage: 'OK', response: {data: response.data} }
        return responseData;
      })
      .catch((error) => {
        const response:ApiResponse = {status:2,statusMessage: 'Error de API', response: {data: {}, error: error} }
        return response;
      }) */
  
      const result = await axios({
        method: "post",
        url: "https://hawkapi.lamensajeria.mx/api/v1/portal/uploadfile/3535",
        data: body,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const responseData:ApiResponse = {status:1,statusMessage: 'OK', response: {data: response.data} }
        return responseData;
      })
      .catch(function (error) {
        const response:ApiResponse = {status:2,statusMessage: 'Error de API', response: {data: {}, error: error} }
        return response;
   });

  console.log(result);



  

  

  return NextResponse.json('OK');
}