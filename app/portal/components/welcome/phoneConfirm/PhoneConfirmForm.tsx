'use client';
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import LoaderSingle from "@/app/components/LoaderSingle";

import FormInput from "../../inputs/FormInput";
import Heading from "../../Heading";
import { Button } from "@/components/ui/button";
import PulseLoader from "react-spinners/PulseLoader";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { LoginFormType } from "@/app/types";



interface ForgotFormProps {
 data?: string;
}

const ForgotForm: React.FC<ForgotFormProps> = ({
 data
}) => {

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('El correo es requerido')
      .email('El correo es inválido'),
    password: Yup.string().required('La contrseña no puede estar vacía'),
  });


    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error,setError] = useState('');
  
    const { 
      register, 
      handleSubmit,
      setValue,
        watch,
      formState: {
        errors,
      },
    } = useForm<LoginFormType>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        email: '',
        password: ''
      },
    });

    const setCustomValue = (id: any, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
      }
      const onSubmit: SubmitHandler<LoginFormType> = 
      (data) => {
        setIsLoading(true);
    
        const timer = setTimeout(() => {
          signIn('credentials', { 
            ...data, 
            redirect: false,
            //callbackUrl: '/portal/adm/mispedidos'
          })
          .then((callback) => {
            console.log(callback);
            
      
            if (callback?.ok) {
              setLoginSuccess(true);
              //router.refresh();
              router.push("/portal/adm/mispedidos");
              
              
            }
            
            if (callback?.error) {
              console.log('error', callback.error);
              setError(callback.error);
              setIsLoading(false);
            }
          }).finally(() => {
            //setIsLoading(false);
            
          });
          }, 1000);
       
      }

      const onToggle = useCallback(() => {
        router.push("/auth/register");
      }, [])

      const loadingTest = 
      () => {
        setIsLoading(true);
    
        const timer = setTimeout(() => {
            setIsLoading(false)
          }, 3000);
       
      }

      //handleSubmit(onSubmit)

 return (
  <div className='w-full'>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold text-center">Reestablecer contraseña</p>
      <div className=" text-neutral-400 mt-2 text-center">
        Ingresa tu correo electrónico registrado
      </div>
      <FormInput
        id="email"
        label="correo"
        placeholder="Ingresa tu correo registrado"
        disabled={isLoading}
        register={register}  
        errors={errors.email?.message as string}
        required
        onChange={(event: any) => {
          setCustomValue('email', event.target.value);
          setError('');
        }}
      />
      
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs text-red-500">{error}</p>
      </div>
      
        <Button onClick={handleSubmit(onSubmit)} className="gap-3 py-5 bg-rose-500 hover:bg-rose-500/80">
            {isLoading && <PulseLoader
                size={6}
                color="#FFFFFF"
                />}
            Enviar
        </Button>
     
      
    </div>

    
  </div>
 );
}

export default ForgotForm;