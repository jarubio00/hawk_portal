'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useContext } from "react";
import NewUserStep from "./steps/NewUserStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import { Stepper, Step } from "@material-tailwind/react";
import { BiSolidUserDetail } from "react-icons/bi";
import { BsPersonFillCheck, BsCheckCircleFill, BsPersonVcardFill} from "react-icons/bs";
import ConfirmedStep from "./steps/ConfirmedStep";



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

  <div className='m-0 h-full'>
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
                  <NewUserStep/>
              }
            {activeStep === 1 &&
                  <ConfirmationStep />
              }
            {activeStep === 2 &&
                  <ConfirmedStep />
              }
        </div>
         
  </div>
 );
}

export default RegisterClient;