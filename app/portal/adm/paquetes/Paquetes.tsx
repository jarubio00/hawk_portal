"use client";

import PortalLayout from "@/app/components/portal/PortalLayout";

import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import ClientOnly from "@/app/components/ClientOnly";
import PageHeader from "@/app/components/portal/PageHeader";

import { MdViewInAr } from "react-icons/md";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import AgregarPaquete from "@/app/components/portal/AgregarPaquete";
import { SafeDireccion, SafeDestino, SafeUser, SafePaquete } from "@/app/types";
import DireccionesCard from "@/app/components/portal/DireccionesCard";
import {
  deleteDireccion,
  deletePaquete,
  markDireccion,
  updateDireccion,
  updatePaquete,
} from "@/app/actions/apiQuerys";
import PedidoConfirmDialog from "@/app/components/modals/PedidoConfirmDialog";
import toast from "react-hot-toast";
import EditarDireccion from "@/app/components/portal/EditarDireccion";
import ListSearch from "@/app/components/ListSearch";
import PaquetesCard from "@/app/components/portal/PaquetesCard";
import EditarPaquete from "@/app/components/portal/EditarPaquete";

const PaquetesClient = (props: any) => {
  const router = useRouter();
  const loader = useLoader();

  const [isLoading, setIsLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [subtitle, setSubtitle] = useState("Administra tus paquetes favoritos");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [paquetes, setPaquetes] = useState(props?.data);

  useEffect(() => {
    setPaquetes(props.data);
  }, [props]);

  const onButtonClick = () => {
    if (!adding) {
      setAdding(true);
      setSubtitle("Agrega un paquete");
    } else {
      setAdding(false);
      setSubtitle("Administra tus paquetes favoritos");
    }
  };

  const toggleAdding = (action: string) => {
    if (action == "open") {
      setAdding(true);
    } else {
      setAdding(false);
    }
  };

  const handleConfirmDialog = async (props: any) => {
    if (props.tipo == "delete") {
      setDialogContent({
        title: "Borrar paquete",
        notes:
          "Los datos del paquete no se borraran de tus guías activas o completadas.",
        action: "Estas seguro de borrar este paquete",
        object: props.data.nombreDireccion,
        data: props.data,
        tipo: "delete",
      });
      setConfirmDialogOpen(true);
    } else if (props.tipo == "mark") {
      setDialogContent({
        title: "Marcar predeterminada",
        notes: "Esta dirección aparecerá como predeterminada al agregar envíos",
        action: "Estas seguro de marcar como predeterminada",
        object: props.data.nombreDireccion,
        data: props.data,
        tipo: "mark",
      });
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirm = async (props: any) => {
    if (props.confirm) {
      if (props.tipo == "delete") {
        setConfirmDialogOpen(false);
        loader.onOpen();
        const res = await deletePaquete({ id: props.data.id });
        toast.success("Paquete borrado!");
      } else if (props.tipo == "mark") {
        setConfirmDialogOpen(false);
        loader.onOpen();
        const res = await markDireccion({ id: props.data.id });
        toast.success("Dirección marcada!");
      }

      router.refresh();

      const timer = setTimeout(() => {
        loader.onClose();
      }, 2000);
    } else {
      setConfirmDialogOpen(false);
    }
  };

  const onEditPaquete = async (paquete: any) => {
    setEditData(paquete);
    setEditing(true);
  };

  const onEditClose = async (props: any) => {
    if (props.action == "save") {
      const res = await updatePaquete({ id: props.id, data: props.data });

      if (res.status == 1) {
        toast.success("Paquete editado");
      } else {
        toast.error(res.statusMessage);
      }

      setEditing(false);
      router.refresh();
      const timer = setTimeout(() => {
        loader.onClose();
      }, 1000);
    } else if (props.action == "cancel") {
      setEditing(false);
    }
  };

  const handleSearch = (data: any) => {
    if (data) {
      setPaquetes(data);
    }
  };

  return (
    <ClientOnly>
      <PedidoConfirmDialog
        isOpen={confirmDialogOpen}
        onClose={handleConfirm}
        dialogContent={dialogContent}
      />
      <PageHeader
        title="Paquetes favoritos"
        subtitle={subtitle}
        icon={MdViewInAr}
        buttonIcon={FaPlus}
        buttonAction={onButtonClick}
        cancelIcon={FaTimes}
        cancelAction={onButtonClick}
        adding={adding}
        disabled={false}
      />

      {editing ? (
        <EditarPaquete
          paquete={editData}
          title="Editar paquete"
          currentUser={props.currentUser}
          onClose={onEditClose}
          from="menu"
        />
      ) : (
        <>
          {adding ? (
            <div className="m-4 flex flex-col bg-white rounded-md">
              <div className="p-2">
                <AgregarPaquete
                  title="Agrega una dirección de recolección"
                  currentUser={props.currentUser}
                  onClose={toggleAdding}
                  tipo="direccion"
                  from="menu"
                />
              </div>
            </div>
          ) : (
            <div className="my-2 md:my-4 mx-0 lg:mx-4 p-4">
              <>
                {props.data.length > 3 && (
                  <div className="flex my-6 mx-0 w-full md:w-3/4  xl:w-1/4 ">
                    <ListSearch
                      placeholder="Buscar paquete"
                      inputArray={paquetes}
                      keys={["nombrePaquete"]}
                      filteredData={handleSearch}
                      onReset={() => setPaquetes(props.data)}
                      minLength={2}
                    />
                  </div>
                )}

                {paquetes.length >= 1 ? (
                  paquetes?.map((paquete: SafePaquete, i: number) => {
                    return (
                      <div key={i}>
                        <PaquetesCard
                          paquete={paquete}
                          onDelete={handleConfirmDialog}
                          onEdit={onEditPaquete}
                          onMark={handleConfirmDialog}
                          onSelect={() => {}}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="flex py-8 px-4 text-md text-neutral-700 ">
                    No se encontraron direcciones
                  </div>
                )}
              </>
            </div>
          )}
        </>
      )}
    </ClientOnly>
  );
};

export default PaquetesClient;
