'use client'

import { NewUser, PhoneConfirmation, Register, RegisterContextType} from "@/app/types/register.d";
import React, { useState, createContext } from "react";


export const RegisterContext = createContext<RegisterContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const RegisterProvider: React.FC<Props> = ({children}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [registration, setRegistration] = useState<Register>();
  const [newUser, setNewUser] = useState<NewUser>();
  const [confirmation, setConfirmation] = useState<PhoneConfirmation>();






  
  const resetContext = () => {
    setRegistration({});
    setActiveStep(0);
    setConfirmation({});
    setNewUser({});
  }

  const saveNewUser = (user: NewUser) => {
    setRegistration({...registration,newUser: {
      email: user.email,
      nombre: user.nombre,
      password: user.password,
      countryCode: user.countryCode,
      celular: user.celular,
      type: user.type,
      status: user.status,
      code: user.code, 
      uuid: user.uuid
    }});
  }

  const saveConfirmation = (confirmation: PhoneConfirmation) => {
    setRegistration({...registration,confirmation: {
        type: confirmation.type,
        status: confirmation.status,
        code: confirmation.code
    }})
  }

  const updateActiveStep = (step: number) => {
    setActiveStep(step);
  }

  return (
    <RegisterContext.Provider
      value={{
        registration,
        resetContext,
        updateActiveStep,
        activeStep,
        saveConfirmation,
        confirmation,
        saveNewUser,
        newUser
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;
