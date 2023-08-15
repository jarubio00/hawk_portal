'use client'

import { Forgot, ForgotContextType} from "@/app/types/forgot.d";
import React, { useState, createContext } from "react";


export const ForgotContext = createContext<ForgotContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const ForgotProvider: React.FC<Props> = ({children}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [forgot, setForgot] = useState<Forgot>();
  
  const resetContext = () => {
    setForgot({});
    setActiveStep(0);
  }

  const saveForgot = (data: Forgot) => {
    setForgot({...forgot,
      email: data.email,
      type: data.type,
      status: data.status,
      code: data.code, 
      uuid: data.uuid,
      newPassword: data.newPassword,
    });
  }

  const updateActiveStep = (step: number) => {
    setActiveStep(step);
  }

  return (
    <ForgotContext.Provider
      value={{
        forgot,
        saveForgot,
        resetContext,
        updateActiveStep,
        activeStep,
      }}
    >
      {children}
    </ForgotContext.Provider>
  );
}

export default ForgotProvider;
