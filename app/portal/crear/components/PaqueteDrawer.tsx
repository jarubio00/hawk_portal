"use client";

import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";

import Button from "@/app/components/Button";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { SafeDireccion, SafeUser, SafePaquete } from "@/app/types";
import { addDireccion } from "@/app/actions/apiQuerys";
import toast from "react-hot-toast";
import ListSearch from "@/app/components/ListSearch";
import PaquetesCardDrawer from "@/app/components/portal/PaquetesCardDrawer";

interface PaqueteDrawerProps {
  title?: string;
  currentUser?: SafeUser;
  paquetesList?: any;
}

//se quito w-full , se agregp px-2
const PaqueteDrawer: React.FC<PaqueteDrawerProps> = ({
  title,
  currentUser,
  paquetesList,
}) => {
  const { useDrawer, updatePaqueteSelected, savePaquete } = useContext(
    PedidoContext
  ) as PedidoContextType;
  const router = useRouter();
  const loader = useLoader();

  const [isLoading, setIsLoading] = useState(false);
  const [subtitle, setSubtitle] = useState(
    "Administra tus paquetes de recolección"
  );

  const [paquetes, setPaquetes] = useState(paquetesList);

  const onAddClose = async (props: any) => {
    useDrawer({ open: false });
    toast.success("Dirección creada!");
    router.refresh();
    loader.onClose();
  };

  const handleSearch = (data: any) => {
    if (data) {
      setPaquetes(data);
    }
  };

  const handleOnSelect = (paquete: any) => {
    //('selected: ', direccion);

    savePaquete(paquete);
    updatePaqueteSelected(paquete.id);
    useDrawer({ open: false });
  };

  return (
    <div className="">
      <div className=" mx-0 lg:mx-4 px-4">
        <>
          {paquetesList && paquetesList.length >= 3 && (
            <div className="flex mb-6 mt-2 mx-0 w-full sm:w-2/4 md:w-3/4  xl:w-2/4 ">
              <ListSearch
                placeholder="Buscar paquete"
                inputArray={paquetesList}
                keys={["contactoNombre", "calle", "colonia"]}
                filteredData={handleSearch}
                onReset={() => setPaquetes(paquetesList)}
                minLength={2}
              />
            </div>
          )}

          {paquetes && paquetes.length >= 1 ? (
            paquetes?.map((paquete: SafePaquete, i: number) => {
              return (
                <div key={i}>
                  <PaquetesCardDrawer
                    tipo="destino"
                    paquete={paquete}
                    onSelect={handleOnSelect}
                  />
                </div>
              );
            })
          ) : (
            <div className="flex py-8 px-4 text-md text-neutral-700 ">
              No se encontraron paquetes
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default PaqueteDrawer;
