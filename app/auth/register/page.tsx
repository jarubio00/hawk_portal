

import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import Container from "@/app/components/Container";
import LoginForm from "@/app/components/auth/login/LoginForm";
import Logo from "@/app/components/navbar/Logo";
import RegisterClient from "./RegisterClient";
import RegisterProvider from "@/app/components/auth/register/context/RegisterContext";

interface HomeProps {
  searchParams: any
};

const Home = async ({ searchParams }: HomeProps) => {

  const currentUser = await getCurrentUser();


  //className="flex flex-col min-h-screen w-full bg-gradient-to-b from-neutral-100 via-neutral-100 to-neutral-50 justify-center items-center gap-16">

  return (
    <ClientOnly>
      <div className="flex flex-col min-h-screen w-full  justify-center items-center gap-16">
            
            <div className=" bg-white rounded-2xl border border-neutral-200 shadow-lg p-6 w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 flex flex-col items-center gap-8">
              <Logo />
              <div className="mb-6 w-full">
                <RegisterProvider>
                  <RegisterClient />
                </RegisterProvider>
                
              </div>
              <div className="flex flex-row justify-between items-center">
                <p></p>
                <img
                  className="block w-16 md:w-24  cursor-pointer" 
                  src="/images/plat-hawk3.png" 
                  />
              </div>
            </div>
      </div>
    </ClientOnly>
    
  )
}
export default Home;