
import ClientOnly from "@/app/components/ClientOnly";

import getDirecciones from "@/app/actions/getDirecciones";
import getCurrentUser from '@/app/actions/getCurrentUser';

import DestinosClient from "./Destinos";


const Destinos  = async () => {


  const direcciones = await getDirecciones();
  const currentUser = await getCurrentUser();
  
  



    return (
      <ClientOnly>
        <DestinosClient  data={direcciones} currentUser={currentUser}/>

      </ClientOnly>
    )
  }

  
export default Destinos;