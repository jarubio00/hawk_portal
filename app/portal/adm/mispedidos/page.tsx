
import ClientOnly from "@/app/components/ClientOnly";

import getDirecciones from "@/app/actions/getDirecciones";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPaquetes from '@/app/actions/getPaquetes';

import PedidosClient from "./Pedidos";


const Pedidos  = async () => {


  const direcciones = await getDirecciones();
  const currentUser = await getCurrentUser();
  const paquetes = await getPaquetes();


    return (
      <ClientOnly>
        <PedidosClient  data={paquetes} currentUser={currentUser}/>

      </ClientOnly>
    )
  }

  
export default Pedidos;