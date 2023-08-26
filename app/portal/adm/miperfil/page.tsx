
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from '@/app/actions/getCurrentUser';
import MiPerfilClient from "./MiPerfil";
import { SafeUser } from "@/app/types";



const Misdirecciones  = async () => {



  const currentUser = await getCurrentUser();


  
  



    return (
      <ClientOnly>
        {currentUser && <MiPerfilClient currentUser={currentUser}/>}
      </ClientOnly>
    )
  }

  
export default Misdirecciones;