'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useContext, useState } from "react";
import axios from "axios";
import { 
    FieldValues, 
    SubmitHandler,
    useForm
  } from "react-hook-form";
  import Input from "@/app/components/inputs/Input";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {RegisterFormType} from '@/app/types'
import FormInput from "@/app/components/inputs/FormInput";


interface NewUserStepProps {
 data?: string;
}

const NewUserStep: React.FC<NewUserStepProps> = ({
 data
}) => {

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('El correo es requerido')
      .email('El correo es inválido'),
    nombre: Yup.string().required('El nombre completo es requerido'),
    password: Yup.string().required('La contrseña no puede estar vacía')
      .min(8, "La contraseña debe contener mínimo 8 caractéres")
      .matches(/[a-z]+/, "Debe contener al menos una letra minúscula")
      .matches(/[A-Z]+/, "Debe contener al menos una letra mayúscula")
      .matches(/\d+/, "Debe contener al menos un número"),
    confirmPassword: Yup.string()
      .required('Confirmar la contraseña es requerido')
      .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden'),
      celular: Yup.string().required('El número de celular es requerido'),
  });

    const {
        saveConfirmation, 
        saveNewUser,
        registration,
        updateActiveStep, 
        activeStep,
    } = useContext(RegisterContext) as RegisterContextType;

    const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    setValue,
      watch,
    formState: {
      errors,
    },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      celular: ''
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<RegisterFormType> = (data: RegisterFormType) => {
    //setIsLoading(true);
    console.log('submit')
    console.log(data);
    //updateActiveStep(1)
  }


 return (
  <div className='flex flex-col gap-4'>
    <div className=" text-neutral-400 mt-2 text-center">
        Ingresa tus datos para el registro de tu cuenta
      </div>
    <Input
        id="email"
        label="Correo"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('email', event.target.value);
        }}
      />
      <FormInput
        id="nombre"
        label="Nombre"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('nombre', event.target.value);
        }}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('password', event.target.value);
        }}
      />
       <Input
        id="confirmPassword"
        label="Confirmar contraseña"
        type='password'
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('confirmPassword', event.target.value);
        }}
      />

      <PhoneInput
       
        inputClass="!py-7 !w-full !pl-20 !border-2"
        buttonClass="!w-16  !p-2 !border-2"
        country={'mx'}
        preferredCountries={['mx','us']}
        value={registration?.newUser?.celular}
        onBlur={(e) => {
          
          console.log(e.target.value);

        }}
        enableAreaCodeStretch
        areaCodes={{mx: ['81', '55']}}
        countryCodeEditable={false}
        placeholder='Celular / whatsapp'
        onChange={(value) => {
          setValue('celular',value);
        }}
      />
       <div className="my-4"> 
        <Button 
          label='Siguiente'
          onClick={handleSubmit(onSubmit)}
        />
     </div>
  </div>
 );
}

export default NewUserStep;