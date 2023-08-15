'use client';
import { RegisterContext } from "@/app/components/auth/register/context/RegisterContext";
import { RegisterContextType } from "@/app/types/register";
import { useState, useContext, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

interface ConfirmedStepProps {
 data?: string;
}

const ConfirmedStep: React.FC<ConfirmedStepProps> = ({
 data
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Creando cuenta...');
  const [registerError, setRegisterError] = useState(false);


  const {
    updateActiveStep, 
    activeStep,
    registration,
} = useContext(RegisterContext) as RegisterContextType;

useEffect(() => {
  handleRegister(registration?.newUser)
},[])

const click = () => {
  handleRegister(registration?.newUser)
}

const handleRegister = useCallback(async (data: any) => {
  setRegisterError(false);
  setIsLoading(true);
  axios.post('/api/register', data)
  .then(() => {
    setCreated(true);
    setStatusMessage('Cuenta creada')
    loginAfter(data);
  })
  .catch((error) => {
    setRegisterError(true);
      console.log('error',error);
  })
  .finally(() => {
    //setIsLoading(false);
  });

  const loginAfter = 
    (data: any) => {
      setIsLoading(true);

      signIn('credentials', { 
        ...data, 
        redirect: false,
      })
      .then((callback) => {
        console.log(callback);
        setStatusMessage('Redireccionando al panel...')
        setIsLoading(false);

        if (callback?.ok) {
          router.refresh();
          router.push('/portal/adm/mispedidos')
        }
        
        if (callback?.error) {
          console.log('error', callback.error);
        }
      });
  }
  
  
}, [])






const handleBack = () => {
  updateActiveStep(1)
}
  
 return (
    <div className='flex flex-col min-h-[50vh] justify-center items-center gap-4 '>
        {!registerError ? <div className="flex flex-col justify-center items-center ">
          <PulseLoader
            size={8}
            color="#FF6B00"
            />
         <div className=" text-neutral-400 my-4 text-center text-xs">
              {statusMessage}
          </div>
          
          
        </div> 
        :
        <div className="flex flex-col">
          <div className=" text-red-500 my-4 text-center text-xs">
                Error al crear la cuenta
          </div>
          <Button
            className="w-full mt-2 gap-3 py-5 "
            variant= 'outline'
            onClick={click}
            disabled={false}
            >
            Reintentar
          </Button>

        </div>  
      
      }
        
       {/*  <Button
          className="w-full mt-4 gap-3 py-5 "
            variant= 'outline'
            onClick={click}
            disabled={false}
          >
          Crear
        </Button>
        <Button
          className="w-full mt-4 gap-3 py-5 "
            variant= 'outline'
            onClick={handleBack}
            disabled={false}
          >
          Atrás
        </Button> */}
        <div>
    
        </div>
    
    </div>
 );
}

export default ConfirmedStep;