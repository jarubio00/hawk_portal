import { createPdfZpl, createZpl } from "@/app/components/utils/zplUtils";
import { ApiResponse } from "@/app/types";
import axios from "axios";

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
