'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import OtpInput from 'react-otp-input';
import "@/app/components/auth/register/OtpInput.css"
import {BsCheckCircle} from "react-icons/bs"
import {MdErrorOutline} from "react-icons/md";
import OtpTimer from '@/app/components/auth/register/OtpTimer';
import { timeClockClasses } from "@mui/x-date-pickers";
import {sendOtpSms, sendOtpWhatsapp} from '@/app/actions/apiQuerys';

interface ConfirmationStepProps {
 data?: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
 data
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [validating, setValidating] = useState(false);
    const [otp, setOtp] = useState('');
    const [code,setCode] = useState(0);
    const onChange = (value: string) => console.log(value);
    const [codeValidation, setCodeValidation] = useState('pendiente');
    const [otpEnabled, setOtpEnabled] = useState(true);
    const [errorMessage,setErrorMessage] = useState('');
    const [resendTimer, setResendTimer] = useState<Date>();
    


    const {
        saveConfirmation, 
        saveNewUser,
        updateActiveStep, 
        activeStep,
        registration,
    } = useContext(RegisterContext) as RegisterContextType;

    

    useEffect(() => {
      const number = generateCode();
      setCode(number);
      if (registration?.newUser?.type) {
        handleSendOtp(registration?.newUser?.type, number);
      }
      
      startTimer();
    },[])

    const handleSendOtp = useCallback(async (type: string ,otpCode: number) => {
      setIsLoading(true);
      setErrorMessage('');
      let result;
      switch(type) {
        case 'whatsapp':
          result = await  sendOtpWhatsapp({code: otpCode, celular: registration?.newUser?.celular});
          //result = {status: 1}
          break;
        case 'sms':
          result = await  sendOtpSms({code: otpCode, celular: registration?.newUser?.celular});
          //result = {status: 1}
        default: 
        return
      }
      
     console.log(result);
     if (result.status == 1) {
      setIsLoading(false);
     } else {
      setErrorMessage('Error al enviar el código por mensaje SMS');
     }
     
    }, [])

    const generateCode = () => {
      var code = Math.floor(1000 + Math.random() * 9000);
      return code;
    }

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

    const handleOtp = (val: string) => {
        setErrorMessage('');
        setOtp(val);

        if (val.length === 4 && code.toString().length === 4) {
            setOtpEnabled(false);
            if (parseInt(val) === code) {
              setCodeValidation('correcto');
            } else {
              setCodeValidation('incorrecto')
              setErrorMessage('Código incorrecto');
              const timer = setTimeout(() => {
                setOtp('');
                setOtpEnabled(true);
                }, 1000);
            }
          
        }
    }



    const handleResendCode = (type: string) => {
      const number = generateCode();
      setCode(number);
      handleSendOtp(type,number);
    }

 return (
  <div className='m-0'>
     <div className=" text-neutral-400 my-4 text-center text-sm">
        Ingresa el código que hemos enviado a tu celular
    </div>
    <div className="my-8 w-full flex flex-col justify-center items-center mx-auto">
      
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
        <BsCheckCircle 
          size={40} 
          className={`${codeValidation == 'correcto' ? 'text-green-500' : 'text-neutral-200'}`} />
        }
        
  
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
      {/* <p>{codeValidation}</p>
      <pre className="w-48 text-xs">
          {JSON.stringify(registration,null,2)}
      </pre> */}
      <p>Code: {code}</p>

    </div>
    </div>
      
    
            <Button 
                  outline
                  label='Atras'
                  onClick={handleBack}
                  disabled={isLoading}
              />
              <Button 
                  label='Siguiente'
                  onClick={handleNext}
                  disabled={codeValidation != 'correcto'}
                  /* disabled={
                    isAutoLoading || 
                    isRecLoading || 
                    isEntLoading || 
                    !pedido?.programa?.fechaRecoleccion || 
                    pedido?.programa?.bloqueRecoleccion == 3 ||
                    !pedido?.programa?.fechaEntrega || 
                    pedido?.programa?.bloqueEntrega == 3
                  } */
              />
  </div>
 );
}

export default ConfirmationStep;