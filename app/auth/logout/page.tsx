

import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../../components/ClientOnly";
import Container from "@/app/components/Container";
import LoginForm from "@/app/components/auth/login/LoginForm";

interface HomeProps {
  searchParams: any
};

const Home = async ({ searchParams }: HomeProps) => {

  const currentUser = await getCurrentUser();



  return (
    <ClientOnly>
      <div className="flex h-screen min-h-screen, w-full bg-gradient-to-b from-neutral-200 via-neutral-200 to-neutral-100 justify-center items-center">
            <div className=" bg-white rounded-2xl shadow-lg p-4 w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6">
              Saliste 
            </div>
      </div>
    </ClientOnly>
    
  )
}
export default Home;