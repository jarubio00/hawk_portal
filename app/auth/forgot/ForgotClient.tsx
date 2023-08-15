'use client';
import { ForgotContext } from "@/app/components/auth/forgot/context/ForgotContext";
import { ForgotContextType } from "@/app/types/forgot";
import { useContext } from "react";
import EmailStep from "./steps/EmailStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import { Stepper, Step } from "@material-tailwind/react";
import { BiSolidUserDetail } from "react-icons/bi";
import { BsPersonFillCheck, BsCheckCircleFill, BsPersonVcardFill} from "react-icons/bs";
import ChangeStep from "./steps/ChangeStep";



interface ForgotClientProps {
 data?: string;
}

const ForgotClient: React.FC<ForgotClientProps> = ({
 data
}) => {
    const {
        saveForgot, 
        updateActiveStep, 
        activeStep
    } = useContext(ForgotContext) as ForgotContextType;

 return (

  <div className='m-0 h-full'>
    <p className="text-xl font-bold text-center mb-4">Reestablecer contraseña</p>
    <Stepper
        activeStep={activeStep}
        activeLineClassName="bg-rose-500"
    >
        <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
            <BsPersonVcardFill className="h-4 w-4" />
        </Step>
        <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
            <BsPersonFillCheck className="h-5 w-5" />
        </Step>
        <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
            <BsCheckCircleFill className="h-5 w-5" />
        </Step>
                
    </Stepper>
        <div className="my-2 flex flex-col ">
            
            {activeStep === 0 &&
                  <EmailStep/>
              }
            {activeStep === 1 &&
                  <ConfirmationStep />
              }
            {activeStep === 2 &&
                  <ChangeStep />
              }
        </div>
         
  </div>
 );
}

export default ForgotClient;