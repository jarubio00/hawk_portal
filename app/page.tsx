

import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "@/app/components/Container";
import Navbar from "./components/navbar/Navbar";

interface HomeProps {
  searchParams: any
};

const Home = async ({ searchParams }: HomeProps) => {

  const currentUser = await getCurrentUser();



  return (
    <ClientOnly>
      <Navbar currentUser={currentUser}/>
    </ClientOnly>
    
  )
}
export default Home;