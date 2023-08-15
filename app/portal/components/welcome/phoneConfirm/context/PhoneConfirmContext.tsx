'use client'

import { PhoneConfirm, PhoneConfirmContextType} from "@/app/types/phoneconfirm.d";
import React, { useState, createContext } from "react";


export const PhoneConfirmContext = createContext<PhoneConfirmContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const PhoneConfirmProvider: React.FC<Props> = ({children}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [phoneConfirm, setPhoneConfirm] = useState<PhoneConfirm>();
  
  const resetContext = () => {
    setPhoneConfirm({});
    setActiveStep(0);
  }

  const savePhoneConfirm = (data: PhoneConfirm) => {
    setPhoneConfirm({...phoneConfirm,
      email: data.email,
      type: data.type,
      status: data.status,
      code: data.code, 
      uuid: data.uuid,
      celular: data.celular
    });
  }

  const updateActiveStep = (step: number) => {
    setActiveStep(step);
  }

  return (
    <PhoneConfirmContext.Provider
      value={{
        phoneConfirm,
        savePhoneConfirm,
        resetContext,
        updateActiveStep,
        activeStep,
      }}
    >
      {children}
    </PhoneConfirmContext.Provider>
  );
}

export default PhoneConfirmProvider;
