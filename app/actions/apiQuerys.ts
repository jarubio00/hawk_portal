import useLoader from "@/app/hooks/useLoader";
import { SafeUser, ApiResponse } from "@/app/types";
import axios from "axios";
import { ICotizaParams, IPedido } from "@/app/types/pedido";

export async function addDireccion(props: any) {
  console.log("apiquery", props);
  const direccion = {
    clienteId: props.currentUser?.id,
    nombreDireccion: props.data.nombreDireccion,
    contactoNombre: props.data.contactoNombre,
    contactoTel: props.data.contactoTel,
    cpId: parseInt(props.data.cp),
    calle: props.data.calle,
    numero: props.data.numero,
    numeroInt: props.data.interior,
    colonia: props.data.colonia.label,
    municipioId: props.data.municipio.id,
    empresa: props.data.empresa,
    referencias: props.data.referencias,
    isOtraColonia: props.otraColoniaSelected,
    otraColonia: props.data.otraColonia,
    icon: props.data.icon,
    color: props.data.color,
  };

  const result = await axios
    .post("/api/direcciones", direccion)
    .then((res) => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: res.data },
      };
      return response;
      //router.refresh();
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function addDestino(props: any) {
  const direccion = {
    clienteId: props.currentUser?.id,
    contactoNombre: props.data.contactoNombre,
    contactoTel: props.data.contactoTel,
    cpId: parseInt(props.data.cp),
    calle: props.data.calle,
    numero: props.data.numero,
    numeroInt: props.data.interior,
    colonia: props.data.colonia.label,
    municipioId: props.data.municipio.id,
    empresa: props.data.empresa,
    referencias: props.data.referencias,
    isOtraColonia: props.otraColoniaSelected,
    otraColonia: props.data.otraColonia,
  };

  const result = await axios
    .post("/api/destinos", direccion)
    .then(() => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.direccion },
      };
      return response;
      //router.refresh();
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function deleteDireccion(props: any) {
  const result = await axios
    .delete(`/api/direcciones/${props.id}`)
    .then(() => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.id },
      };
      return response;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function deleteDestino(props: any) {
  const result = await axios
    .delete(`/api/destinos/${props.id}`)
    .then(() => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.id },
      };
      return response;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function markDireccion(props: any) {
  const result = await axios
    .post(`/api/direcciones/${props.id}/mark`)
    .then(() => {
      console.log("axios mark");
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.id },
      };
      return response;
      //router.refresh();
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function updateDireccion(props: any) {
  const result = await axios
    .patch(`/api/direcciones/${props.id}`, props.data)
    .then(() => {
      console.log("axios update");
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.id },
      };
      return response;
      //router.refresh();
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function updateDestino(props: any) {
  const result = await axios
    .patch(`/api/destinos/${props.id}`, props.data)
    .then(() => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.id },
      };
      return response;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function addPaquete(props: any) {
  const paquete = { ...props.data, clienteId: props.currentUser?.id };

  const result = await axios
    .post("/api/paquetes", paquete)
    .then(() => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.data },
      };
      return response;
      //router.refresh();
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function deletePaquete(props: any) {
  const result = await axios
    .delete(`/api/paquetes/${props.id}`)
    .then(() => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.id },
      };
      return response;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function updatePaquete(props: any) {
  const result = await axios
    .patch(`/api/paquetes/${props.id}`, props.data)
    .then(() => {
      const response: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: props.id },
      };
      return response;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function serverDate(props: any) {
  const result = await axios
    .get(`/api/programa/date/now`)
    .then((response) => {
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function getBloquesRecoleccion(fecha: string, rec: any) {
  const result = await axios
    .post(`/api/programa/bloques/recoleccion/${fecha}`, {
      direccionId: rec.direccionId,
    })
    .then((response) => {
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function getBloquesEntrega(fecha: string) {
  const result = await axios
    .post(`/api/programa/bloques/entrega/${fecha}`)
    .then((response) => {
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function autoProgramaNuevo(
  municipioRecId: number,
  municipioEntregaId: number
) {
  const result = await axios
    .post(`/api/programa/autodev`, {
      municipioRecId: municipioRecId,
      municipioEntregaId: municipioEntregaId,
    })
    .then((response) => {
      console.log("paso api");
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function autoPrograma(direccionId: number) {
  const result = await axios
    .get(`/api/programa/auto/${direccionId}`)
    .then((response) => {
      console.log("paso api");
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function autoAppend(data: any) {
  const result = await axios
    .post(`/api/programa/append/now`, data)
    .then((response) => {
      console.log("paso api");
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: "Error de API",
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function cotizaPaqueteById(props: ICotizaParams) {
  const result = await axios
    .post(`/api/cotiza/tipoId`, props)
    .then((response) => {
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function uploadFile(props: FormData) {
  const timer = setTimeout(async () => {
    const result = await axios
      .post(`/api/upload`, props)
      .then((response) => {
        const responseData: ApiResponse = {
          status: 1,
          statusMessage: "OK",
          response: { data: response.data },
        };
        return responseData;
      })
      .catch((error) => {
        const response: ApiResponse = {
          status: 2,
          statusMessage: "Error de API",
          response: { data: {}, error: error },
        };
        return response;
      });

    return result;
  }, 3000);
}

export async function crearPedido(pedido: IPedido) {
  const result = await axios
    .post(`/api/pedido`, pedido)
    .then((response) => {
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function appendPedido(pedido: IPedido, recoleccion: number) {
  const result = await axios
    .post(`/api/pedido/append/`, { p: pedido, r: recoleccion })
    .then((response) => {
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function sendOtpSms(props: any) {
  const result = await axios
    .post(`/api/otp/sms`, props)
    .then((response) => {
      const responseData: ApiResponse = {
        status: 1,
        statusMessage: "OK",
        response: { data: response.data },
      };
      return responseData;
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function correoCheck(props: any) {
  const result = await axios
    .post(`/api/register/user/check`, props)
    .then((response) => {
      if (response.data.status == 1) {
        const responseData: ApiResponse = {
          status: 1,
          statusMessage: "El correo ya está registrado",
          response: { data: response.data },
        };
        return responseData;
      } else {
        const responseData: ApiResponse = {
          status: 2,
          statusMessage: "Correo disponible",
          response: { data: {}, error: response.data },
        };
        return responseData;
      }
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function passwordChange(props: any) {
  const result = await axios
    .post(`/api/user/password/change`, props)
    .then((response) => {
      if (response.data.status == 1) {
        const responseData: ApiResponse = {
          status: 1,
          statusMessage: response.data.statusMessage,
          response: { data: response.data },
        };
        return responseData;
      } else {
        const responseData: ApiResponse = {
          status: 2,
          statusMessage: response.data.statusMessage,
          response: { data: {}, error: response.data },
        };
        return responseData;
      }
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function passwordChangeProfile(props: any) {
  const result = await axios
    .post(`/api/user/password/profile/change`, props)
    .then((response) => {
      if (response.data.status == 1) {
        const responseData: ApiResponse = {
          status: 1,
          statusMessage: response.data.statusMessage,
          response: { data: response.data },
        };
        return responseData;
      } else {
        console.log("apiquery error");
        const responseData: ApiResponse = {
          status: 2,
          statusMessage: response.data.statusMessage,
          response: { data: {}, error: response.data },
        };
        return responseData;
      }
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function nameChangeProfile(props: any) {
  const result = await axios
    .post(`/api/user/name`, props)
    .then((response) => {
      if (response.data.status == 1) {
        const responseData: ApiResponse = {
          status: 1,
          statusMessage: response.data.statusMessage,
          response: { data: response.data },
        };
        return responseData;
      } else {
        console.log("apiquery error");
        const responseData: ApiResponse = {
          status: 2,
          statusMessage: response.data.statusMessage,
          response: { data: {}, error: response.data },
        };
        return responseData;
      }
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function nameChangeEmpresa(props: any) {
  const result = await axios
    .post(`/api/user/empresa`, props)
    .then((response) => {
      if (response.data.status == 1) {
        const responseData: ApiResponse = {
          status: 1,
          statusMessage: response.data.statusMessage,
          response: { data: response.data },
        };
        return responseData;
      } else {
        const responseData: ApiResponse = {
          status: 2,
          statusMessage: response.data.statusMessage,
          response: { data: {}, error: response.data },
        };
        return responseData;
      }
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function confirmPhone(props: any) {
  console.log(props);

  const result = await axios
    .post(`/api/user/phone/confirm`, props)
    .then((response) => {
      if (response.data.status == 1) {
        const responseData: ApiResponse = {
          status: 1,
          statusMessage: response.data.statusMessage,
          response: { data: response.data },
        };
        return responseData;
      } else {
        const responseData: ApiResponse = {
          status: 2,
          statusMessage: response.data.statusMessage,
          response: { data: {}, error: response.data },
        };
        return responseData;
      }
    })
    .catch((error) => {
      const response: ApiResponse = {
        status: 2,
        statusMessage: error.message,
        response: { data: {}, error: error },
      };
      return response;
    });

  return result;
}

export async function nacionalCotizar(props: any) {
  const response = await axios.post("/api/nacional/cotiza", props);

  return response.data;
}

export async function nacionalShipmentCreate(props: any) {
  const response = await axios.post("/api/nacional/crear", props);

  return response.data;
}
