'use client'


import ClientOnly from "@/app/components/ClientOnly";

import PhoneConfirmClient from "./PhoneConfirmClient";
import PhoneConfirmProvider from "@/app/portal/components/welcome/phoneConfirm/context/PhoneConfirmContext";


const Home = ({currentUser, type, onClose}:any) => {

   //Ancho si es fuera del dialog p-6 w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 
  return (
    <ClientOnly>
      <div className="flex flex-col mt-6 w-full  justify-center items-center gap-16">
            
        
              <div className="mb-6 w-full">
                <PhoneConfirmProvider>
                  <PhoneConfirmClient currentUser={currentUser} type={type} onClose={onClose}/>
                </PhoneConfirmProvider>
                
              </div>
              

      </div>
    </ClientOnly>
    
  )
}
export default Home;