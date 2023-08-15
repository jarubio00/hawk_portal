'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OtpInput from 'react-otp-input';
import "@/app/components/auth/register/OtpInput.css"
import {BsCheckCircle} from "react-icons/bs"
import {MdErrorOutline} from "react-icons/md";
import OtpTimer from '@/app/components/auth/register/OtpTimer';
import { timeClockClasses } from "@mui/x-date-pickers";
import {registerOtp, registerOtpResend, checkOtp} from '@/app/actions/otp';
import { PulseLoader } from "react-spinners";

interface ConfirmationStepProps {
 data?: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
 data
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [validating, setValidating] = useState(false);
    const [otp, setOtp] = useState('');
    const [code,setCode] = useState(0);
    const onChange = (value: string) => console.log(value);
    const [codeValidation, setCodeValidation] = useState('pendiente');
    const [otpEnabled, setOtpEnabled] = useState(true);
    const [errorMessage,setErrorMessage] = useState('');
    const [sendErrorMessage,setSendErrorMessage] = useState('');

    const [resendTimer, setResendTimer] = useState<Date>();
    


    const {
        saveConfirmation, 
        saveNewUser,
        updateActiveStep, 
        activeStep,
        registration,
    } = useContext(RegisterContext) as RegisterContextType;

    

    useEffect(() => {
      startTimer();
    },[])


    const startTimer = () => {
      const timeToClose = new Date();
      timeToClose.setSeconds(timeToClose.getSeconds() +3);
      setResendTimer(timeToClose);
    }


    const handleBack = () => {
        updateActiveStep(0)
      }
      
      const handleNext = () => {
        updateActiveStep(2);
      }

    const handleOtp = async (val: string) => {
        
        setErrorMessage('');
        setOtp(val);

        if (val.length === 4 ) {
          setIsValidating(true);
          let result;

          if (registration?.newUser?.uuid) {
            result = await checkOtp({
              uuid: registration?.newUser?.uuid,
              code: val,
            })
          }

            console.log(result)

            setOtpEnabled(false);
            if (result && result?.status === 1) {
              setCodeValidation('correcto');
              setIsValidating(false);
            } else {
              setIsValidating(false);
              setCodeValidation('incorrecto')
              setErrorMessage(result?.statusMessage || 'Código incorrecto o expirado');
              setOtp('');
              const timer = setTimeout(() => {
                setOtpEnabled(true);
               
                }, 500);
            }
          
        }
    }



    const handleResendCode = async (type: string) => {
      setOtp('');
      setErrorMessage('');
      setSendErrorMessage('');
      setOtpEnabled(false);
      let result;
      if (registration?.newUser?.email && registration?.newUser?.celular && registration.newUser.uuid) {
        result = await  registerOtpResend({
          email: registration?.newUser?.email,
          phone: registration?.newUser?.celular,
          uuid: registration.newUser.uuid,
          type: type    
        })
      }

      console.log(result);

      if (result && result.status == 1) {
        setIsLoading(false);
      } else {
        setSendErrorMessage('Error al enviar el código de verificación. Intenta de nuevo o selecciona otro método de envío.')
        setIsLoading(false);
      }

      const timer = setTimeout(() => {
        setOtpEnabled(true);

        }, 1000);
    }

 return (
  <div className='m-0'>
     {codeValidation != 'correcto' ? <div className=" text-neutral-400 my-4 text-center text-sm">
        Ingresa el código que hemos enviado a tu celular
      </div>
    :
    <div className=" text-neutral-400 my-4 text-center text-sm">
        Código confirmado
      </div>

    }
    <div className="my-8 w-full flex flex-col justify-center items-center mx-auto gap-2">
      
        {codeValidation != 'correcto' ? <OtpInput
          shouldAutoFocus={otpEnabled}
          value={otp}
          onChange={(val) => handleOtp(val)}
          numInputs={4}
          renderSeparator={<span className="mx-1">-</span>}
          renderInput={(props) => <input {...props}
            autoComplete="one-time-code"
            disabled={!otpEnabled || isLoading}
            className="!w-12 h-12 md:!w-16 md:h-16 text-2xl text-black border border-input 
            disabled:bg-neutral-200 disabled:text-neutral-400 rounded-md" />}
          inputStyle="inputStyle"
          inputType="tel"
        /> : 
        <div className="flex flex-col animate-fadeIn animate-scaleIn mx-auto my-auto">
          <BsCheckCircle
            size={40}
            className={`${codeValidation == 'correcto' ? 'text-green-500' : 'text-neutral-200'}`} />
        </div>
        }
        
        {isValidating && <PulseLoader
                      size={6}
                      color="#FF6B00"
                      />}
      <p className="mt-2 text-xs text-red-500 text-left">{errorMessage}</p>
    <div  className="my-4 w-full">
      <div className="flex flex-row items-center justify-between">
        <p></p>
        {resendTimer && codeValidation != 'correcto' && <OtpTimer 
          expiryTimestamp={resendTimer} 
          onResendCode={handleResendCode}
          celular={registration?.newUser?.celular}
          />}
      </div>
      
    </div>

    </div>
   
    <p className="mt-2 text-xs text-red-500 text-left">{sendErrorMessage}</p>
    
            <div className="flex flex-row gap-6 items-center justify-between">
                 {codeValidation != 'correcto' && <Button
                  className="w-full mt-4 gap-3 py-5 "
                    variant= 'outline'
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    Atrás
                  </Button>}
                <Button
                className="w-full mt-4 gap-3 py-5 bg-rose-500 hover:bg-rose-500/80"
                    onClick={handleNext}
                    disabled={codeValidation != 'correcto'}
                 
                >
                  Crear cuenta
                </Button>
            </div>
  </div>
 );
}

export default ConfirmationStep;