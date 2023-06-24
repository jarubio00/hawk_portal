
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getDirecciones from "@/app/actions/getDirecciones";
import getDestinos from "@/app/actions/getDestinos";
import getPaquetes from "@/app/actions/getPaquetes";
import getMunicipios from "@/app/actions/getMunicipios";
import CrearPedidoClient from "./CrearPedido";
import getBloquedDates from "@/app/actions/getBloquedDates";


const CrearPedido  = async () => {



  const currentUser = await getCurrentUser();
  const direcciones = await getDirecciones();
  const destinos = await getDestinos();
  const paquetes = await getPaquetes();
  const municipiosRaw = await getMunicipios();
  const bloquedDates = await getBloquedDates();
  
  const municipios = municipiosRaw.map((val) => ({...val,label: val.municipio, value: val.id}));
  const genericoIndex = municipios.map(e => e.label).indexOf('Generico');

  if(genericoIndex > -1) {
    municipios.splice(genericoIndex,1)
  }



    return (
      <ClientOnly>
        
        <CrearPedidoClient  
          data={{
              direcciones: direcciones, 
              destinos: destinos, 
              paquetes: paquetes, 
              municipios: municipios, 
              bloquedDates: bloquedDates}} 
          currentUser={currentUser}
        />

      </ClientOnly>
    )
  }

  
export default CrearPedido;