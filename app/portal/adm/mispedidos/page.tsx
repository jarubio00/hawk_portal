
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from '@/app/actions/getCurrentUser';
import getPedidos from '@/app/actions/getPedidos';

import PedidosClient from "./Pedidos";


const Pedidos  = async () => {


  const pedidos = await getPedidos();
  const currentUser = await getCurrentUser();



    return (
      <ClientOnly>
        <PedidosClient  data={pedidos} currentUser={currentUser}/>
      </ClientOnly>
    )
  }

  
export default Pedidos;