'use client';
import { PhoneConfirmContext } from "./context/PhoneConfirmContext";
import { PhoneConfirmContextType} from "@/app/types/phoneconfirm";
import { useContext, useEffect } from "react";
import PhoneStep from "./steps/PhoneStep";
import ConfirmationStep from "./steps/PhoneConfirmationStep";
import { Stepper, Step } from "@material-tailwind/react";
import { BiSolidUserDetail } from "react-icons/bi";
import { BsPersonFillCheck, BsCheckCircleFill, BsPersonVcardFill} from "react-icons/bs";
import ChangeStep from "./steps/ChangeStep";



interface PhoneConfirmProps {
 currentUser?: any;
}

const PhoneConfirm: React.FC<PhoneConfirmProps> = ({
 currentUser
}) => {
    const {
        savePhoneConfirm, 
        phoneConfirm,
        updateActiveStep, 
        activeStep
    } = useContext(PhoneConfirmContext) as PhoneConfirmContextType;

   /*  useEffect(() => {
        console.log(currentUser);
        if (currentUser && currentUser.email){
            savePhoneConfirm({...phoneConfirm,email: currentUser.email});
        }
    },[currentUser.email]) */

 return (

  <div className='m-0 h-full w-full px-6 '>
    <p className="text-xl font-bold text-center mb-4">Verifica tú celular</p>
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
                  <PhoneStep currentUser={currentUser}/>
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

export default PhoneConfirm;