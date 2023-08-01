'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useContext, useState } from "react";
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
     const onChange = (value: string) => console.log(value);
     const [codeValidation, setCodeValidation] = useState('pendiente')
    
    const {
        saveConfirmation, 
        saveNewUser,
        updateActiveStep, 
        activeStep,
        registration,
    } = useContext(RegisterContext) as RegisterContextType;


    const handleBack = () => {
        updateActiveStep(0)
      }
      
      const handleNext = () => {
        updateActiveStep(2);
      }

    const handleOtp = (val: string) => {
        console.log(val);
        setOtp(val);

        if (val.length === 4) {
          if (registration?.newUser?.code) {
            if (parseInt(val) === registration.newUser.code) {
              setCodeValidation('Código correcto!')
            } else {
              setCodeValidation('Código incorrecto!')
            }
          }
          setValidating(true)
          const timer = setTimeout(() => {
            setOtp('');
            setValidating(false);
            }, 5000);
        }
    }

 return (
  <div className='m-0'>
     <div className=" text-neutral-400 my-4 text-center text-sm">
        Ingresa el código que hemos enviado a tu celular
    </div>
    <div className="my-4 w-full">
      {!validating ? <OtpInput
        shouldAutoFocus
        value={otp}
        onChange={(val) => handleOtp(val)}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="inputStyle"
      />
        :
        <p>Validando</p>
    }
    <div  className="my-4">
      <p>{codeValidation}</p>
      <pre>
          {JSON.stringify(registration)}
      </pre>
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