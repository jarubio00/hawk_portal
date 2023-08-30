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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



interface ForgotClientProps {
    currentUser?: any;
    type?: string;
    onClose?: () => void;
    onForgot?: () => void;
    toggleCloseButton?: () => void;
}

const ForgotClient: React.FC<ForgotClientProps> = ({
    currentUser,
    type,
    onClose,
    onForgot,
    toggleCloseButton
}) => {
    const {
        saveForgot, 
        updateActiveStep, 
        activeStep
    } = useContext(ForgotContext) as ForgotContextType;

    const router = useRouter();

 return (

  <div className='m-0 h-full'>
    <div className="flex flex-row items-center justify-end mb-4">
        <Button variant={'ghost'} className="text-blue-500" onClick={() => router.back()}>Regresar</Button>
    </div>
    <p className="text-xl font-bold text-center mb-8">Reestablecer contraseña</p>
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
        <div className="my-6 flex flex-col ">
            
            {activeStep === 0 &&
                  <EmailStep 
                    currentUser={currentUser} 
                    type={type}
                    onClose={onClose}
                    onForgot={onForgot}
                    toggleCloseButton={toggleCloseButton}
                    />
              }
            {activeStep === 1 &&
                  <ConfirmationStep 
                    onClose={onClose}
                    onForgot={onForgot}
                    toggleCloseButton={toggleCloseButton}
                  
                  />
              }
            {activeStep === 2 &&
                  <ChangeStep 
                    type={type}
                    onClose={onClose}
                    onForgot={onForgot}
                    toggleCloseButton={toggleCloseButton}
                  
                  />
              }
        </div>
         
  </div>
 );
}

export default ForgotClient;