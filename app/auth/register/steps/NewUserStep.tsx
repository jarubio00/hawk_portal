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



interface NewUserStepProps {
 data?: string;
}

const NewUserStep: React.FC<NewUserStepProps> = ({
 data
}) => {

    const {
        saveConfirmation, 
        saveNewUser,
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