'use client';
import { PhoneConfirmContext } from "../context/PhoneConfirmContext";
import { PhoneConfirmContextType} from "@/app/types/phoneconfirm";
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
import {PhoneConfirmFormType} from '@/app/types'
import FormInput from "@/app/components/inputs/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PulseLoader from "react-spinners/PulseLoader";
import { registerOtp } from "@/app/actions/otp";
import { correoCheck } from "@/app/actions/apiQuerys";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface PhoneStepProps {
 currentUser: any
}

const PhoneStep: React.FC<PhoneStepProps> = ({
 currentUser
}) => {

  const validationSchema = Yup.object().shape({
    celular: Yup.string().required('El número de celular es requerido'),
  });

  const {
    savePhoneConfirm, 
    updateActiveStep, 
    phoneConfirm,
    activeStep
} = useContext(PhoneConfirmContext) as PhoneConfirmContextType;

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
    } = useForm<PhoneConfirmFormType>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        celular: '',
      },
    });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<PhoneConfirmFormType> = async (data: PhoneConfirmFormType) => {

    console.log(data);
    if (data.celular === phoneConfirm?.celular && data.type === phoneConfirm?.type) {
      updateActiveStep(1)
    } else {
      setIsLoading(true);
      setErrorMessage('');
      


      const uuid = uuidv4();
      if (data) {
        savePhoneConfirm({...data,uuid: uuid, email: currentUser.email});
      }          
  
      let result;
      if (data.celular) {
        result = await  registerOtp({
          email: currentUser.email || '',
          phone: data.celular,
          uuid: uuid,
          type: data.type || 'whatsapp'
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
        setError('celular', {type: 'custom', message: 'El correo ya está registrado'});
      }
      
    
  }




 return (
  <div className='flex flex-col gap-2 my-2 '>
    
    <div className=" text-neutral-400  text-center text-sm my-1">
        Ingresa tu número de celular
       
    </div>
   
   
    <div>
      <PhoneInput
        inputClass="!py-4 !w-full !pl-20 !border-input !text-sm"
        disabled={isLoading}
        buttonClass="!w-16 !p-2 !py-4   !border-input"
        country={'mx'}
        preferredCountries={['mx','us']}
        value={phoneConfirm?.celular}
        onBlur={(e) => {
          console.log(e.target.value);
        }}
        enableAreaCodeStretch
        areaCodes={{mx: ['81', '55']}}
        countryCodeEditable={false}
        placeholder='No. de celular / whatsapp'
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
          setErrorMessage('');
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

export default PhoneStep;