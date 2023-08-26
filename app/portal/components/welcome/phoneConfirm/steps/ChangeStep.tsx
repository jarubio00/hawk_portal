'use client';
import { ForgotContext } from "@/app/components/auth/forgot/context/ForgotContext";
import { ForgotContextType } from "@/app/types/forgot";
import { useState, useContext, useCallback, useEffect } from "react";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import {ForgotChangeFormType} from '@/app/types'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


import { Button } from "@/components/ui/button";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import FormInput from "@/app/components/inputs/FormInput";
import { passwordChange } from "@/app/actions/apiQuerys";
import { BsCheckCircle } from "react-icons/bs";






interface ConfirmedStepProps {
 onClose?: () => void;
}

const ConfirmedStep: React.FC<ConfirmedStepProps> = ({
 onClose
}) => {
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required('La contrseña no puede estar vacía')
      .min(8, "La contraseña debe contener mínimo 8 caractéres")
      .matches(/[a-z]+/, "Debe contener al menos una letra minúscula")
      .matches(/[A-Z]+/, "Debe contener al menos una letra mayúscula")
      .matches(/\d+/, "Debe contener al menos un número"),
    confirmPassword: Yup.string()
      .required('Confirmar la contraseña es requerido')
      .oneOf([Yup.ref('newPassword'), ''], 'Las contraseñas no coinciden'),
  });

  const {
    saveForgot, 
    updateActiveStep, 
    forgot,
    activeStep
} = useContext(ForgotContext) as ForgotContextType;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Creando cuenta...');
  const [changeError, setChangeError] = useState(false);
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
  } = useForm<ForgotChangeFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      newPassword: 'L1nux2020',
      confirmPassword: 'L1nux2020'
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }
 

  useEffect(() => {
  
  },[])


const onSubmit: SubmitHandler<ForgotChangeFormType> = async (data: ForgotChangeFormType) => {
  setIsLoading(true);

  let result;

  if (data.newPassword === data.confirmPassword) {
    result = await passwordChange({
      uuid: forgot?.uuid,
      code: forgot?.code,
      newPassword: data.newPassword
    });
  }

  if (result && result?.status === 1) {
    setChanged(true);
  } else {
    setErrorMessage(`Error al cambiar la contraseña. ${result?.statusMessage}`);
    setChangeError(true);
  }
  

  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 500);

}

const handleFinish = () => {
  setIsLoading(true);
  router.replace('/auth/login');
}

const handleRestart = () => {
    setIsLoading(true);
    window.location.reload();
}

  
 return (
    <div className='flex flex-col min-h-[50vh] justify-center items-center gap-4 '>

      {!changed ? <div>
        <div className="w-full">
          <FormInput
            id="newPassword"
            label="Contraseña"
            type="password"
            placeholder="Teclea tu contraseña"
            notes='Min. 8 caracteres, Min. 1 Mayúscula,  Min. 1 Número'
            disabled={isLoading}
            register={register}
            errors={errors.newPassword?.message}
            required
            onChange={(event: any) => {
              setCustomValue('newPassword', event.target.value);
            }}
          />
        </div>
         <div className="w-full">
           <FormInput
            id="confirmPassword"
            label="Confirmar contraseña"
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors.confirmPassword?.message}
            required
            onChange={(event: any) => {
              setCustomValue('confirmPassword', event.target.value);
            }}
                 />
         </div>
      </div> 
      :
      <div className="flex flex-col animate-fadeIn animate-scaleIn w-full items-center justify-center gap-4">
          <BsCheckCircle
            size={50}
            className='text-green-500' />
            <p className="text-xs text-neutral-400">Contraseña actualizada</p>
        </div>
    }

       
          {!changed ? <Button
            onClick={!changeError ? handleSubmit(onSubmit) : handleRestart}
            className="mt-4 w-full gap-3 py-5 bg-rose-500 hover:bg-rose-500/80">
              {isLoading && <PulseLoader
                              size={6}
                              color="#FFFFFF"
                              />}
            {!changeError ? 'Cambiar contraseña' : 'Reiniciar'}
          </Button> 
          :
          <Button
            onClick={handleFinish}
            variant='outline'
            className="mt-4 w-full gap-3 py-5 text-white  bg-rose-500 hover:bg-rose-500/80">
              {isLoading && <PulseLoader
                              size={6}
                              color="#FFFFFF"
                              />}
            Acceder a mi cuenta
          </Button> 
        }
       
        <p className="mt-2 text-xs text-red-500 text-left">{errorMessage}</p>
       
      
    
    </div>
 );
}

export default ConfirmedStep;