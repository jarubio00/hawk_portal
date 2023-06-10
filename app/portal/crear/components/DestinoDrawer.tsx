'use client';

import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";


import Button from "@/app/components/Button";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { SafeDireccion, SafeUser } from "@/app/types";
import { addDireccion } from "@/app/actions/apiQuerys";
import toast from "react-hot-toast";
import ListSearch from "@/app/components/ListSearch";
import DireccionesCard from "@/app/components/portal/DireccionesCard";
import DireccionesCardDrawer from "@/app/components/portal/DireccionesCardDrawer";

interface DestinoDrawerProps {
  title?: string;
  currentUser?: SafeUser;
  destinos?: any;
}

//se quito w-full , se agregp px-2
const DestinoDrawer: React.FC<DestinoDrawerProps> = ({ 
  title, 
  currentUser,
  destinos
}) => {

const {useDrawer,updateDestinoSelected, saveDestino} = useContext(PedidoContext) as PedidoContextType;
const router = useRouter();
const loader = useLoader();

const [isLoading,setIsLoading] = useState(false);
const [subtitle, setSubtitle] = useState('Administra tus direcciones de recolección')

const [direcciones,setDirecciones] = useState(destinos);

const onAddClose  = async (props: any) => {

  useDrawer({open: false});
  toast.success('Dirección creada!');
  router.refresh();
  loader.onClose();
   
} 

const handleSearch = (data: any) => {
  if (data) {
   setDirecciones(data);
  } 
}

const handleOnSelect = (direccion: any) => {

  //console.log('selected: ', direccion);

  saveDestino(direccion);
  updateDestinoSelected(direccion.id);
  useDrawer({open: false});

}



  return ( 
    <div className="">
       <div className=" mx-0 lg:mx-4 px-4">
          <>
            {destinos && destinos.length >=3 && <div className="flex mb-6 mt-2 mx-0 w-full sm:w-2/4 md:w-3/4  xl:w-2/4 ">
              <ListSearch 
                placeholder="Buscar destino"
                inputArray={destinos}
                keys={['contactoNombre', 'calle', 'colonia']}
                filteredData={handleSearch}
                onReset={() => setDirecciones(destinos)}
                minLength={2}
              />
            </div>}

            { direcciones && direcciones.length >= 1 ? direcciones?.map((direccion: SafeDireccion, i: number) => {
              return (
                
              <div key={i}>
                <DireccionesCardDrawer 
                  tipo='destino' 
                  direccion={direccion} 
                  onSelect={handleOnSelect}
                  />
              </div>
              )
            })
          
            :

            <div className="flex py-8 px-4 text-md text-neutral-700 ">
                No se encontraron direcciones
            </div>
          }
            
          </>
      </div>
    </div>
   );
}
 
export default DestinoDrawer;