
import ClientOnly from "@/app/components/ClientOnly";
import MisPedidosProvider  from "./context/MisPedidosContext";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPedidos from '@/app/actions/getPedidos';
import getRecolecciones from "@/app/actions/getRecolecciones";

import PedidosClient from "./Pedidos";



const Pedidos  = async () => {
 

  const pedidos = await getPedidos();
  const currentUser = await getCurrentUser();
  const recolecciones = await getRecolecciones();
  const data = {recolecciones: recolecciones, pedidos: pedidos}

  

    return (
      <ClientOnly>
        <MisPedidosProvider>
          <PedidosClient data={data}  currentUser={currentUser}/>
        </MisPedidosProvider>
      </ClientOnly>
    )
  }

  
export default Pedidos;