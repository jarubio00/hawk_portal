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
import { et } from "date-fns/locale";



interface NewUserStepProps {
 data?: string;
}

const NewUserStep: React.FC<NewUserStepProps> = ({
 data
}) => {

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
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      celular: ''
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

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
      <Input
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
        id="celular"
        label="Celular"
        type='number'
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('celular', event.target.value);
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
        placeholder='Celular / whatsapp'
        onChange={() => {}}
      />
       <div className="my-4"> 
        <Button 
          label='Siguiente'
          onClick={() => updateActiveStep(1)}
        />
     </div>
  </div>
 );
}

export default NewUserStep;