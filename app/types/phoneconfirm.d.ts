
export interface PhoneConfirm {
    email?: string;
    celular?: string;
    countryCode?: string;
    type?: string;
    status?: string;
    code?: number;
    uuid?: string;
}


export type PhoneConfirmContextType = {
    phoneConfirm?: PhoneConfirm;
    savePhoneConfirm: (confirm: PhoneConfirm) => void;
    updateActiveStep: (step: number) => void;
    activeStep: number;
    resetContext: () => void;
}