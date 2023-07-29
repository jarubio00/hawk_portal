'use client';
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import LoaderSingle from "@/app/components/LoaderSingle";

import Input from "../../inputs/Input";
import Heading from "../../Heading";
import { Button } from "@/components/ui/button";
import PulseLoader from "react-spinners/PulseLoader";



interface LoginFormProps {
 data?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
 data
}) => {
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
    } = useForm<FieldValues>({
      defaultValues: {
        email: '',
        password: ''
      },
    });

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
      }
      const onSubmit: SubmitHandler<FieldValues> = 
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
      <div className=" text-neutral-400 mt-2 text-center">
        Entra a tu panel con tu correo y contraseña
      </div>
      <Input
        id="email"
        label="correo"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('email', event.target.value);
          setError('');
        }}
      />
      <Input
        id="password"
        label="contraseña"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('password', event.target.value);
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
            Entrar
        </Button>
     
      
    </div>

    <div className="flex flex-col gap-2 mt-3">
      <hr />
      <Button variant={'ghost'} className="px-2 font-bold ">Olvidé mi contraseña</Button>
      <div className="
      text-neutral-400 text-center mt-0">
        <p>No tienes cuenta?
          <span 
            onClick={onToggle} 
            className="
              text-blue-500
              cursor-pointer 
              hover:underline
            "
            > Registrate</span>
        </p>
      </div>
    </div>
  </div>
 );
}

export default LoginForm;