
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getDirecciones from "@/app/actions/getDirecciones";
import CrearPedidoClient from "./CrearPedido";


const CrearPedido  = async () => {



  const currentUser = await getCurrentUser();
  const direcciones = await getDirecciones();
  



    return (
      <ClientOnly>
        
        <CrearPedidoClient  data={{direcciones: direcciones}} currentUser={currentUser}/>

      </ClientOnly>
    )
  }

  
export default CrearPedido;