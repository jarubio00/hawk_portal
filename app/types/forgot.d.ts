

export interface Forgot {
    email?: string;
    type?: string;
    status?: string;
    code?: number;
    uuid?: string;
    newPassword?: string;
}


export type ForgotContextType = {
    forgot?: Forgot;
    saveForgot: (forgot: Forgot) => void;
    updateActiveStep: (step: number) => void;
    activeStep: number;
    resetContext: () => void;
}