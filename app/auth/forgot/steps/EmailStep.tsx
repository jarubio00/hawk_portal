'use client';
import { ForgotContext } from "@/app/components/auth/forgot/context/ForgotContext";
import { ForgotContextType } from "@/app/types/forgot";
import { useContext, useState } from "react";
import { 
    FieldValues, 
    SubmitHandler,
    useForm
  } from "react-hook-form";
  import Input from "@/app/components/inputs/Input";
import { useRouter } from "next/navigation";
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {ForgotFormType} from '@/app/types'
import FormInput from "@/app/components/inputs/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PulseLoader from "react-spinners/PulseLoader";
import { registerOtp } from "@/app/actions/otp";
import { correoCheck } from "@/app/actions/apiQuerys";

interface NewUserStepProps {
 data?: string;
}

const NewUserStep: React.FC<NewUserStepProps> = ({
 data
}) => {

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('El correo es requerido')
      .email('El correo es inválido'),
  });

  const {
    saveForgot, 
    updateActiveStep, 
    forgot,
    activeStep
} = useContext(ForgotContext) as ForgotContextType;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');

    const { 
      register, 
      handleSubmit,
      setValue,
        watch,
        setError,
      formState: {
        errors,
      },
    } = useForm<ForgotFormType>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        email: 'jarubio@xinet.com.mx'
      },
    });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<ForgotFormType> = async (data: ForgotFormType) => {


    if (data.email === forgot?.email) {
      updateActiveStep(1)
    } else {
      setIsLoading(true);
      setErrorMessage('');
      
      const check = await  correoCheck({email: data.email});
      if (check.status === 2) {
        setError('email', {type: 'custom', message: 'El correo no se encuentra registrado'});
        setIsLoading(false);
        return null
      }


      const uuid = uuidv4();
      if (data) {
        saveForgot({...data,uuid: uuid});
      }          
  
      let result;
      if (data.email) {
        result = await  registerOtp({
          email: data.email,
          phone: 'NA',
          uuid: uuid,
          type: 'email'    
        })
      }
  
      if (result && result.status == 1) {
        setIsLoading(false);
        updateActiveStep(1)
      } else {

        setErrorMessage('Error al enviar el código de verificación. Intenta de nuevo o selecciona otro método de envío.')
        setIsLoading(false);
      }
    }
    

    
    //updateActiveStep(1)
  }

  const handleCorreoCheck = async (event: any) => {
      const check = await  correoCheck({email: event.target.value});
      
      if (check.status === 1) {
        setError('email', {type: 'custom', message: 'El correo ya está registrado'});
      }
      
    
  }




 return (
  <div className='flex flex-col gap-2'>
    
    <div className=" text-neutral-400  text-center text-sm">
        Ingresa tu correo electrónico registrado
    </div>
    <FormInput
        id="email"
        label="Correo"
        disabled={isLoading}
        register={register}
        errors={errors.email?.message}
        placeholder="Ingresa tu correo registrado"
        required
        onChange={(event: any) => {
          setCustomValue('email', event.target.value);
        }}
        onBlur={(event) => {
          handleCorreoCheck(event);
        }}
      />
       
        <Button 
          onClick={handleSubmit(onSubmit)} 
          className="mt-4 gap-3 py-5 bg-rose-500 hover:bg-rose-500/80">
            {isLoading && <PulseLoader
                            size={6}
                            color="#FFFFFF"
                            />}
          Siguiente
        </Button>
        <p className="mt-2 text-xs text-red-500 text-left">{errorMessage}</p>
     
  </div>
 );
}

export default NewUserStep;