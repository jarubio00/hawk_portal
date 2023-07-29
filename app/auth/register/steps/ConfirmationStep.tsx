'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

interface ConfirmationStepProps {
 data?: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
 data
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        saveConfirmation, 
        saveNewUser,
        updateActiveStep, 
        activeStep,
    } = useContext(RegisterContext) as RegisterContextType;


    const handleBack = () => {
        updateActiveStep(0)
      }
      
      const handleNext = () => {
        updateActiveStep(2);
      }

 return (
  <div className='m-0'>
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