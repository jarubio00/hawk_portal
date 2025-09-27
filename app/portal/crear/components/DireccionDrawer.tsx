"use client";

import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";

import Button from "@/app/components/Button";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { SafeUser } from "@/app/types";
import { addDireccion } from "@/app/actions/apiQuerys";
import toast from "react-hot-toast";

interface DireccionDrawerProps {
  title?: string;
  currentUser?: SafeUser;
}

//se quito w-full , se agregp px-2
const DireccionDrawer: React.FC<DireccionDrawerProps> = ({
  title,
  currentUser,
}) => {
  const { useDrawer, updateDireccionSelected, saveRecoleccion } = useContext(
    PedidoContext
  ) as PedidoContextType;
  const router = useRouter();
  const loader = useLoader();

  const onAddClose = async (props: any) => {
    const res = await addDireccion(props.apiData);
    if (res.status == 1) {
      toast.success("Dirección creada!");
      //@ts-ignore
      saveRecoleccion(res.response?.data);
      //@ts-ignore
      updateDireccionSelected(res.response?.data.id);

      res;
      useDrawer({ open: false });
    } else {
      toast.error(res.statusMessage);
    }

    router.refresh();
    const timer = setTimeout(() => {
      loader.onClose();
    }, 1000);
  };

  return (
    <div className="">
      <AgregarDireccion
        title="Agrega una dirección de recolección"
        currentUser={currentUser}
        onClose={onAddClose}
        tipo="direccion"
        from="pedido"
      />
    </div>
  );
};

export default DireccionDrawer;
