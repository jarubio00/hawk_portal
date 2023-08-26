

import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import Container from "@/app/components/Container";
import LoginForm from "@/app/components/auth/login/LoginForm";
import Logo from "@/app/components/navbar/Logo";
import ForgotClient from "./ForgotClient";
import ForgotProvider from "@/app/components/auth/forgot/context/ForgotContext";

interface ForgotPageProps {
  currentUser?: any;
  type?: string;
  onClose?: () => void;
  onForgot?: () => void;
  toggleCloseButton?: () => void;
};

const ForgotPage =  ({ 
  currentUser,
  type,
  onClose,
    onForgot,
    toggleCloseButton
}: ForgotPageProps) => {




  //className="flex flex-col min-h-screen w-full bg-gradient-to-b from-neutral-100 via-neutral-100 to-neutral-50 justify-center items-center gap-16">

  return (
    <ClientOnly>
      <div className="flex flex-col">
            
            <div className=" my-1">
              <div className="mb-6 w-full">
                <ForgotProvider>
                  <ForgotClient 
                    currentUser={currentUser} 
                    type={type}
                    onClose={onClose}
                    onForgot={onForgot}
                    toggleCloseButton={toggleCloseButton}
                    />
                </ForgotProvider>
                
              </div>
              
            </div>
      </div>
    </ClientOnly>
    
  )
}
export default ForgotPage;