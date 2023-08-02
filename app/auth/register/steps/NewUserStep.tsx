'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import {  RegisterContextType,PhoneConfirmation} from "@/app/types/register";
import { CodeStatus, ConfirmationType } from "@/app/types/constants";
import { useContext, useState } from "react";
import axios from "axios";
import { 
    FieldValues, 
    SubmitHandler,
    useForm
  } from "react-hook-form";
  import Input from "@/app/components/inputs/Input";
import { useRouter } from "next/navigation";


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {RegisterFormType} from '@/app/types'
import FormInput from "@/app/components/inputs/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface NewUserStepProps {
 data?: string;
}

const NewUserStep: React.FC<NewUserStepProps> = ({
 data
}) => {

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('El correo es requerido')
      .email('El correo es inválido'),
    nombre: Yup.string().required('El nombre completo es requerido')
      .min(5,"El nombre debe contener a menos 5 caractéres"),
    password: Yup.string().required('La contrseña no puede estar vacía')
      .min(8, "La contraseña debe contener mínimo 8 caractéres")
      .matches(/[a-z]+/, "Debe contener al menos una letra minúscula")
      .matches(/[A-Z]+/, "Debe contener al menos una letra mayúscula")
      .matches(/\d+/, "Debe contener al menos un número"),
    confirmPassword: Yup.string()
      .required('Confirmar la contraseña es requerido')
      .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden'),
      celular: Yup.string().required('El número de celular es requerido'),
      //type: Yup.string().required('El tipo de confirmación es requerido'),
      //status: Yup.string().required(),
      //code: Yup.number().required()
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
      setError,
    formState: {
      errors,
    },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre: 'Usuario relleno ',
      email: 'javier@segpak.com',
      password: 'L1nux2020',
      confirmPassword: 'L1nux2020',
      celular: '+528115995194',
      type: 'whatsapp',
      status: 'pending',
      code: 0

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
    if (data) {
      saveNewUser(data);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    updateActiveStep(1)
  }

  const handleCorreoCheck = (event: any) => {
    console.log(event.target.value);

    if (event && event.target.value === 'javier2@mail.com') {
      setError('email', {type: 'custom', message: 'El correo ya está registrado'});
    }
  }




 return (
  <div className='flex flex-col gap-2'>
    <div className=" text-neutral-400 mt-2 text-center text-sm">
        Ingresa tus datos para el registro de tu cuenta
    </div>
    <FormInput
        id="email"
        label="Correo"
        disabled={isLoading}
        register={register}
        errors={errors.email?.message}
        placeholder="Ingresa tu correo electrónico"
        required
        onChange={(event: any) => {
          setCustomValue('email', event.target.value);
        }}
        onBlur={(event) => {
          handleCorreoCheck(event);
        }}
      />
      <FormInput
        id="nombre"
        label="Nombre"
        
        
        disabled={isLoading}
        register={register}
        errors={errors.nombre?.message}
        required
        onChange={(event: any) => {
          setCustomValue('nombre', event.target.value);
        }}
      />
      <FormInput
        id="password"
        label="Contraseña"
        type="password"
        placeholder="Teclea tu contraseña"
        notes='8 caracteres. 1 Mayúscula. 1 Número'
        disabled={isLoading}
        register={register}
        errors={errors.password?.message}
        required
        onChange={(event: any) => {
          setCustomValue('password', event.target.value);
        }}
      />
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
      
        <Label htmlFor="sms" className="text-xs text-neutral-400">Número de celular</Label>
        <div>
        <PhoneInput
          inputClass="!py-4 !w-full !pl-20 !border-input !text-base"
          buttonClass="!w-16 !p-2 !py-4   !border-input"
          country={'mx'}
          preferredCountries={['mx','us']}
          value={registration?.newUser?.celular ? registration?.newUser?.celular : '528115995194' }
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
      </div>
      <div className="w-full flex flex-col gap-3 mt-2">
        <p className="text-xs text-neutral-400">Enviar código de confirmación por: </p>
        <RadioGroup 
          defaultValue="whatsapp" 
          className="gap-3" id="type" 
          {...register('type')} 
          onValueChange={(e) => {
            setValue('type', e);
          }}
          
          >


          <div className="flex items-center space-x-2">
            <RadioGroupItem value="whatsapp"/>
            <Label htmlFor="whatsapp" className="text-xs w-full">Mensaje de Whatsapp</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms"/>
            <Label htmlFor="sms" className="text-xs w-full">Mensaje de texto (SMS)</Label>
          </div>
        </RadioGroup>
      </div>
        
        <Button onClick={handleSubmit(onSubmit)} className="mt-4 bg-rose-500 hover:bg-rose-500/80">
          Siguiente
        </Button>
     
  </div>
 );
}

export default NewUserStep;