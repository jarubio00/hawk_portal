
import ClientOnly from "@/app/components/ClientOnly";
import MisPedidosProvider  from "./context/MisPedidosContext";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPedidos from '@/app/actions/getPedidos';
import getRecolecciones from "@/app/actions/getRecolecciones";

import PedidosClient from "./Pedidos";
import QueryWrapper from "@/app/wrapper/query-wrapper";


const Pedidos  = async () => {
 

  //const pedidos = await getPedidos();
  const currentUser = await getCurrentUser();
  //const recolecciones = await getRecolecciones();
  //const data = {recolecciones: recolecciones, pedidos: pedidos}

  

    return (
      <ClientOnly>
        <QueryWrapper>
          <PedidosClient  currentUser={currentUser}/>
        </QueryWrapper>
      </ClientOnly>
    )
  }

  
export default Pedidos;