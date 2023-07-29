'use client'

import { CodeStatus, ConfirmationType, NewUser, PhoneConfirmation, Register, RegisterContextType} from "@/app/types/register.d";
import React, { useState, createContext } from "react";


export const RegisterContext = createContext<RegisterContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const RegisterProvider: React.FC<Props> = ({children}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [register, setRegister] = useState<Register>();
  const [newUser, setNewUser] = useState<NewUser>();
  const [confirmation, setConfirmation] = useState<PhoneConfirmation>();






  
  const resetContext = () => {
    setRegister({});
    setActiveStep(0);
    setConfirmation({});
    setNewUser({});
  }

  const saveNewUser = (user: NewUser) => {
    setRegister({...register,newUser: {
      correo: user.correo,
      nombre: user.nombre,
      password: user.password,
      countryCode: user.countryCode,
      celular: user.celular
    }});
  }

  const saveConfirmation = (confirmation: PhoneConfirmation) => {
    setRegister({...register,confirmation: {
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
        register,
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
