export interface NewUser {
    correo?: string;
    nombre?: string;
    password?: string;
    countryCode?: string;
    celular?: string;
}

enum ConfirmationType {
    sms,
    whatsapp,
    email
  }

enum CodeStatus {
    pending,
    sent,
    confirmed
    
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
    saveNewUser?: (user: NewUser) => void;
    newUser?: NewUser;
    saveConfirmation?: (confirmation: PhoneConfirmation) => void;
    confirmation?: PhoneConfirmation;
    updateActiveStep: (step: number) => void;
    activeStep: number;
    resetContext: () => void;
}