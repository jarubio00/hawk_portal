import { SafeUser, ApiResponse } from "@/app/types";
import axios from "axios";


interface RegisterOtpProps {
    uuid: string,
    email: string, 
    phone: string, 
    type: string,
}

interface RegisterCheckOtpProps {
  uuid: string,
  code: string, 
}


export  async function registerOtp(props: RegisterOtpProps) {
    console.log('otp query');
    const result = await axios.post(`/api/register/verify/send`, props)
        .then((response) => {
          
          if (response.data.status == 1) {
            const responseData:ApiResponse = {status:1,statusMessage: 'OK', response: {data: response.data} }
            return responseData;
          } else {
            const responseData:ApiResponse = {status:2,statusMessage: 'No se pudo entregar el mensaje', response: {data: {}, error: response.data} }
            return responseData;
          }
          
        })
        .catch((error) => {
          const response:ApiResponse = {status:2,statusMessage: error.message, response: {data: {}, error: error} }
          return response;
        })
   
        
        return result;
  }

  export  async function registerOtpResend(props: RegisterOtpProps) {
    console.log('otp resend');
    const result = await axios.post(`/api/register/verify/resend`, props)
        .then((response) => {
          
          if (response.data.status == 1) {
            const responseData:ApiResponse = {status:1,statusMessage: 'OK', response: {data: response.data} }
            return responseData;
          } else {
            const responseData:ApiResponse = {status:2,statusMessage: 'No se pudo entregar el mensaje', response: {data: {}, error: response.data} }
            return responseData;
          }
          
        })
        .catch((error) => {
          const response:ApiResponse = {status:2,statusMessage: error.message, response: {data: {}, error: error} }
          return response;
        })
   
        
        return result;
  }

  export  async function checkOtp(props: RegisterCheckOtpProps) {
    console.log('otp check');
    const result = await axios.post(`/api/register/verify/check`, props)
        .then((response) => {
          
          if (response.data.status == 1) {
            const responseData:ApiResponse = {status:1,statusMessage: 'OK', response: {data: response.data} }
            return responseData;
          } else {
            const responseData:ApiResponse = {status:2,statusMessage: response.data.statusMessage, response: {data: {}, error: response.data} }
            return responseData;
          }
          
        })
        .catch((error) => {
          const response:ApiResponse = {status:2,statusMessage: error.message, response: {data: {}, error: error} }
          return response;
        })
   
        
        return result;
  }