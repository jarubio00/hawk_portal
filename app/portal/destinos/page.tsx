
import ClientOnly from "@/app/components/ClientOnly";

import getDestinos from "@/app/actions/getDestinos";
import getCurrentUser from '@/app/actions/getCurrentUser';

import DestinosClient from "./Destinos";


const Destinos  = async () => {


  const destinos = await getDestinos();
  const currentUser = await getCurrentUser();
  
  



    return (
      <ClientOnly>
        <DestinosClient  data={destinos} currentUser={currentUser}/>

      </ClientOnly>
    )
  }

  
export default Destinos;