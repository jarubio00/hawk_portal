
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getDirecciones from "@/app/actions/getDirecciones";
import getDestinos from "@/app/actions/getDestinos";
import getPaquetes from "@/app/actions/getPaquetes";
import CrearPedidoClient from "./CrearPedido";


const CrearPedido  = async () => {



  const currentUser = await getCurrentUser();
  const direcciones = await getDirecciones();
  const destinos = await getDestinos();
  const paquetes = await getPaquetes();
  



    return (
      <ClientOnly>
        
        <CrearPedidoClient  data={{direcciones: direcciones, destinos: destinos, paquetes: paquetes}} currentUser={currentUser}/>

      </ClientOnly>
    )
  }

  
export default CrearPedido;