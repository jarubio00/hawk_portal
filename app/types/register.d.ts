import { ConfirmationType, CodeStatus } from "./constants";

export interface NewUser {
    email?: string;
    nombre?: string;
    password?: string;
    countryCode?: string;
    celular?: string;
    type?: ConfirmationType;
    status?: CodeStatus;
    code?: number;
}


export interface PhoneConfirmation {
    type?: ConfirmationType;
    status?: CodeStatus;
    code?: number;
}

export interface Register{
    newUser?: NewUser;
    confirmation?: PhoneConfirmation;
}

export type RegisterContextType = {
    registration?: Register;
    saveNewUser: (user: NewUser) => void;
    newUser?: NewUser;
    saveConfirmation: (confirmation: PhoneConfirmation) => void;
    confirmation?: PhoneConfirmation;
    updateActiveStep: (step: number) => void;
    activeStep: number;
    resetContext: () => void;
}