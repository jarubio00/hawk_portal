'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import OtpInput from 'react-otp-input';
import "@/app/components/auth/register/OtpInput.css"

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
    },[])

    /* const saveDate = {
      ...data,
      type: ConfirmationType.whatsapp,
      code: code,
      status: CodeStatus.sent
    } */

    const generateCode = () => {
      var code = Math.floor(1000 + Math.random() * 9000);
      return code;
    }


    const handleBack = () => {
        updateActiveStep(0)
      }
      
      const handleNext = () => {
        updateActiveStep(2);
      }

    const handleOtp = (val: string) => {
        console.log(val);
        setOtp(val);

        if (val.length === 4 && code.toString().length === 4) {
            setOtpEnabled(false);
            if (parseInt(val) === code) {
              setCodeValidation('Código correcto!')
            } else {
              setCodeValidation('Código incorrecto!')
            }
          
          //setValidating(true)
          const timer = setTimeout(() => {
            setOtp('');
            //setValidating(true);
            //setValidating(false);
            setOtpEnabled(true);
            }, 5000);
        }
    }

 return (
  <div className='m-0'>
     <div className=" text-neutral-400 my-4 text-center text-sm">
        Ingresa el código que hemos enviado a tu celular
    </div>
    <div className="my-8 w-full flex flex-col justify-center items-center mx-auto">
      {!validating ? <OtpInput
        shouldAutoFocus={otpEnabled} 
        value={otp}
        onChange={(val) => handleOtp(val)}
        numInputs={4}
        renderSeparator={<span className="mx-1">-</span>}
        renderInput={(props) => <input {...props} 
          disabled={!otpEnabled} 
          className="!w-12 h-12 md:!w-16 md:h-16 text-2xl text-black border border-input disabled:bg-neutral-200 disabled:text-neutral-400 rounded-md" />}
        inputStyle="inputStyle"
        inputType="tel"
        
      />
        :
        <p>Validando</p>
    }
    <div  className="my-4">
      <p>{codeValidation}</p>
      <pre className="w-48 text-xs">
          {JSON.stringify(registration,null,2)}
      </pre>
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