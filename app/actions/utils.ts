import { createPdfZpl, createZpl } from "@/app/components/utils/zplUtils";
import { ApiResponse } from "@/app/types";
import axios from "axios";
import prisma from "@/app/libs/prismadb";

export function calcularTipoPaquete(props: any) {
  let tipo = {};

  const pesoMax = props.pesoVol > props.pesoPaq ? props.pesoVol : props.pesoPaq;

  switch (true) {
    case pesoMax * 1000 <= 3000:
      tipo = { tipo: "MINI", id: 1, pesoMax: pesoMax };
      break;
    case pesoMax * 1000 > 3000 && pesoMax * 1000 <= 5000:
      tipo = { tipo: "CHICO", id: 2, pesoMax: pesoMax };
      break;
    case pesoMax * 1000 > 5000 && pesoMax * 1000 <= 10000:
      tipo = { tipo: "MEDIANO", id: 3, pesoMax: pesoMax };
      break;
    case pesoMax * 1000 > 10000 && pesoMax * 1000 <= 15000:
      tipo = { tipo: "GRANDE", id: 4, pesoMax: pesoMax };
      break;
    default:
      tipo = { tipo: "INVALIDO", id: 0, pesoMax: pesoMax };
  }

  return tipo;
}

export async function generateLabels(props: any) {
  const { p, pedidoId } = props;
  let labelResult;
  let labelPdfResult;

  const zpl = createZpl(p, pedidoId);

  console.log(zpl);

  let formData = new FormData();
  formData.append("file", zpl);

  labelResult = await axios({
    method: "post",
    url: `https://hawkapi.lamensajeria.mx/api/v1/portal/label/${pedidoId}`,
    data: formData,
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

  const zplPdf = createPdfZpl(p, pedidoId);
  let formDataPdf = new FormData();
  formDataPdf.append("file", zplPdf);

  labelPdfResult = await axios({
    method: "post",
    url: `https://hawkapi.lamensajeria.mx/api/v1/portal/labelpdf/${pedidoId}`,
    data: formDataPdf,
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

  const response = {
    image: labelResult.downloadUrl,
    pdf: labelPdfResult.downloadUrl,
  };

  return response;
}

/* 
1	registro	Resgistro sistema	El cliente se registro en el sistema
2	firstLogin	Inicio sesión inicial	El cliente inicio sesión por primera vez
3	login	Inicio sesión	El cliente inicio sesión en el sistema
4	cambioPass	Cambio contrasaña	El cliente cambio la contraseña
5	cambioCel	Cambio número celular	El cliente cambió y verificó un nuevo celular
6	addDireccion	Agregar dirección	El cliente agregó una nueva dirección de recolección
7	editDireccion	Editar dirección	El cliente edito una dirección de recolección
8	delDireccion	Eliminar dirección	El cliente elimino una dirección de recolección
9	addDestino	Agregar destino	El cliente agregó una nueva dirección de destino
10	editDestino	Editar destino	El cliente edito una dirección de destino
11	delDestino	Eliminar destino	El cliente elimino una dirección de destino
12	addPaquete	Agregar paquete	El cliente agregó un nuevo paquete favorito
13	editPaquete	Editar paquete	El cliente edito un paquete favorito
14	delPaquete	Eliminar paquete	El cliente elimino un paquete favorito
15	addEnvio	Generar envío	El cliente generó un nuevo envío
16	editNombre	Editar nombre	"El cliente editó su nombre 
17	editEmpresa	Editar empresa	El cliente edito su nombre 

*/

export async function userActivityRegister(clienteId: number, tipoId: number) {
  const addActivity = await prisma.actividadPlataformaClientes.create({
    data: {
      clienteId: clienteId,
      tipoId: tipoId,
    },
  });
}
