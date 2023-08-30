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
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

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
      celular: Yup.string().required('El número de celular es requerido')
      .min(10,"EL número debe ser de 10 dígitos")
      .max(10,"El número debe ser de 10 dígitos"),
    countryCode: Yup.string().required('EL código de país es requerido')
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
    } = useForm<RegisterFormType>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
        celular: '',
        countryCode: '',
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

  const onSubmit: SubmitHandler<RegisterFormType> = async (data: RegisterFormType) => {


    if (data.celular === registration?.newUser?.celular) {
      updateActiveStep(1)
    } else {
      setIsLoading(true);
      setErrorMessage('');
      
      const check = await  correoCheck({email: data.email});
      if (check.status === 1) {
        setError('email', {type: 'custom', message: 'El correo ya está registrado'});
        setIsLoading(false);
        return null
      }


      const uuid = uuidv4();
      if (data) {
        saveNewUser({...data,uuid: uuid});
      }          
  
      let result;
      if (data.email && data.celular && data.type) {
        result = await  registerOtp({
          email: data.email,
          phone: data.celular,
          countryCode: data.countryCode,
          uuid: uuid,
          type: data.type      
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
        placeholder="Ingresa tu nombre completo"
        
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
        notes='Min. 8 caracteres, Min. 1 Mayúscula,  Min. 1 Número'
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
        placeholder="Confirma tu contraseña"
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
          inputClass={`!py-4 !w-full !pl-20 !h-11 !border-input !text-xs ${errors.celular && '!border-red-500'}`}
          disabled={isLoading}
          buttonClass={`!w-16 !p-2 !py-4  !h-11 !border-input ${errors.celular && '!border-red-500'}`}
          country={'mx'}
          preferredCountries={['mx','us']}
          value={`${registration?.newUser?.countryCode}${registration?.newUser?.celular}`}
          onBlur={(e) => {
            console.log(e.target.value);
          }}
          countryCodeEditable={false}
          placeholder='No. de celular / whatsapp'
          onChange={(value, country) => {
            //@ts-ignore
            const sub = country.dialCode.length;
            const num = value.substring(sub);
            setCustomValue('celular',num);
            //@ts-ignore
            setCustomValue('countryCode', country.dialCode);
          }}
          
        />
        <p className="my-2 text-[11px] text-red-500">{errors.celular?.message}</p>
    </div>
      <div className="w-full flex flex-col gap-4 my-2">
        <p className="text-xs text-neutral-400">Enviar código de confirmación por: </p>
        <RadioGroup 
          defaultValue="whatsapp" 
          className="gap-3" id="type" 
          {...register('type')} 
          onValueChange={(e) => {
            setValue('type', e);
            setErrorMessage('');
          }}
          
          >


          <div className="flex items-center space-x-2 mb-1">
            <RadioGroupItem value="whatsapp"/>
            <Label htmlFor="whatsapp" className="text-xs w-full">Mensaje de Whatsapp</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms"/>
            <Label htmlFor="sms" className="text-xs w-full">Mensaje de texto (SMS)</Label>
          </div>
        </RadioGroup>
      </div>
        
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