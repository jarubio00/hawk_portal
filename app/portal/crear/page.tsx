
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from '@/app/actions/getCurrentUser';
import getDirecciones from "@/app/actions/getDirecciones";
import getDestinos from "@/app/actions/getDestinos";
import getPaquetes from "@/app/actions/getPaquetes";
import getMunicipios from "@/app/actions/getMunicipios";
import CrearPedidoClient from "./CrearPedido";
import getBloquedDates from "@/app/actions/getBloquedDates";
import getRecoleccion from "@/app/actions/getRecoleccion";
import ErrorFullScreen from "./components/ErrorFullScreen";


interface CrearPedidoProps {
  searchParams: any
};

const CrearPedido  = async ({ searchParams }: CrearPedidoProps) => {
 
  const {append, rec} = searchParams;
 
  let recoleccion;

  if (append && append==1 && rec) {  
    recoleccion = await getRecoleccion(rec);
  }

  
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
        
        {Object.keys(searchParams).length < 1 ? <CrearPedidoClient  
          data={{
              direcciones: direcciones, 
              destinos: destinos, 
              paquetes: paquetes, 
              municipios: municipios, 
              bloquedDates: bloquedDates}} 
          currentUser={currentUser}
        />
            : 
          <>

            { (append && append == 1 && rec && recoleccion?.status == 1) ? <CrearPedidoClient  
                data={{
                    direcciones: direcciones, 
                    destinos: destinos, 
                    paquetes: paquetes, 
                    municipios: municipios, 
                    bloquedDates: bloquedDates}}
                currentUser={currentUser}
                append={true}
                recoleccion={recoleccion?.data}

              />
              :
              <ErrorFullScreen data={recoleccion?.statusMessage || 'Datos inválidos'} />}
          </>
            
         
        }

      </ClientOnly>
    )
  }

  
export default CrearPedido;