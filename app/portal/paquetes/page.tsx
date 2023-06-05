
import ClientOnly from "@/app/components/ClientOnly";

import getDirecciones from "@/app/actions/getDirecciones";
import getCurrentUser from '@/app/actions/getCurrentUser';

import PaquetesClient from "./Paquetes";


const Misdirecciones  = async () => {


  const direcciones = await getDirecciones();
  const currentUser = await getCurrentUser();
  
  



    return (
      <ClientOnly>
        <PaquetesClient  data={direcciones} currentUser={currentUser}/>

      </ClientOnly>
    )
  }

  
export default Misdirecciones;