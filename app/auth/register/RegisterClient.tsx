'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useContext } from "react";
import NewUserStep from "./steps/NewUserStep";
import ConfirmationStep from "./steps/ConfirmationStep";



interface RegisterClientProps {
 data?: string;
}

const RegisterClient: React.FC<RegisterClientProps> = ({
 data
}) => {
    const {
        saveConfirmation, 
        saveNewUser,
        updateActiveStep, 
        activeStep
    } = useContext(RegisterContext) as RegisterContextType;

 return (

  <div className='m-0'>
        {activeStep === 0 && 
              <NewUserStep/>
          }

        {activeStep === 1 && 
              <ConfirmationStep />
          }
         
  </div>
 );
}

export default RegisterClient;