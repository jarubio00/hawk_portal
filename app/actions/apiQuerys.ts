import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import useLoader from "@/app/hooks/useLoader";
import { SafeUser, ApiResponse } from "@/app/types";
import axios from "axios";

export  async function addDireccion(props: any) {

  const direccion = {
    clienteId : props.currentUser?.id, 
    nombreDireccion: props.data.nombreDireccion, 
    contactoNombre: props.data.nombreContacto, 
    contactoTel: props.data.telContacto, 
    cpId: parseInt(props.data.cp), 
    calle: props.data.calle, 
    numero: props.data.numero, 
    numeroInt: props.data.interior, 
    colonia: props.data.colonia.label, 
    municipioId: props.data.municipio.id, 
    empresa: props.data.empresa, 
    referencias: props.data.referencias,
    isOtraColonia: props.otraColoniaSelected,
    otraColonia: props.data.otraColonia
  }
  
  const result = await axios.post('/api/direcciones', direccion)
          .then(() => {
            const response:ApiResponse = {status:1,statusMessage: 'OK', response: {data: props.direccion} }
            return response;
            //router.refresh();
          })
          .catch((error) => {
           
            const response:ApiResponse = {status:2,statusMessage: 'Error de API', response: {data: {}, error: error} }
            return response;
          });
 
      

      return result;
}


export  async function deleteDireccion(props: any) {
  
    const result = await axios.delete(`/api/direcciones/${props.id}`)
        .then(() => {
          console.log('axios deleted');
          const response:ApiResponse = {status:1,statusMessage: 'OK', response: {data: props.id} }
          return response;
          //router.refresh();
        })
        .catch((error) => {
          const response:ApiResponse = {status:2,statusMessage: 'Error de API', response: {data: {}, error: error} }
          return response;
        })
   
        

        return result;
}

export  async function markDireccion(props: any) {
  
  const result = await axios.post(`/api/direcciones/${props.id}/mark`)
      .then(() => {
        console.log('axios mark');
        const response:ApiResponse = {status:1,statusMessage: 'OK', response: {data: props.id} }
        return response;
        //router.refresh();
      })
      .catch((error) => {
        const response:ApiResponse = {status:2,statusMessage: 'Error de API', response: {data: {}, error: error} }
        return response;
      })
 
      

      return result;
}

export  async function updateDireccion(props: any) {
  
  const result = await axios.patch(`/api/direcciones/${props.id}`, props.data)
      .then(() => {
        console.log('axios update');
        const response:ApiResponse = {status:1,statusMessage: 'OK', response: {data: props.id} }
        return response;
        //router.refresh();
      })
      .catch((error) => {
        const response:ApiResponse = {status:2,statusMessage: 'Error de API', response: {data: {}, error: error} }
        return response;
      })
 
      

      return result;
}