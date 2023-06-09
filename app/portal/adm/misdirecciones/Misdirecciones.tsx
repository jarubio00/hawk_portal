'use client';


import PortalLayout from "@/app/components/portal/PortalLayout";

import { useRouter } from 'next/navigation';
import useLoader from "@/app/hooks/useLoader";
import ClientOnly from "@/app/components/ClientOnly";
import PageHeader from "@/app/components/portal/PageHeader";

import { BiSearch } from "react-icons/bi";
import { FaPlus, FaTimes, FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { SafeDireccion,SafeDestino, SafeUser} from "@/app/types";
import DireccionesCard from "@/app/components/portal/DireccionesCard";
import { addDestino, addDireccion, deleteDireccion, markDireccion, updateDireccion } from "@/app/actions/apiQuerys";
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";
import toast from "react-hot-toast";
import EditarDireccion from "@/app/components/portal/EditarDireccion";
import ListSearch from "@/app/components/ListSearch";


const MisdireccionesClient  = (props:any) => {
  const router = useRouter();
  const loader = useLoader();
  

  const [isLoading,setIsLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [subtitle, setSubtitle] = useState('Administra tus direcciones de recolección')
  const [confirmDialogOpen,setConfirmDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [editing,setEditing] = useState(false);
  const [editData,setEditData] = useState({});
  const [direcciones,setDirecciones] = useState(props?.data);


  useEffect(() => {
    setDirecciones(props.data);
    console.log(props.data);
    }, [props]) 

  const onButtonClick = () => {
   
    if (!adding) {
      setAdding(true);
      setSubtitle('Agrega una dirección de recolección');
    } else {
      setAdding(false);
      setSubtitle('Administra tus direcciones de recolección');
    }
  }

  const toggleAdding = (action: string) => {
    if(action == 'open') {
      setAdding(true);
    } else {
      setAdding(false);
    }

  }

  const handleConfirmDialog = async (props: any) => {
    if (props.tipo == 'delete') {
      setDialogContent({
        title: "Borrar dirección",
        notes: "La dirección no se borrara de tus guías activas o completadas.",
        action: "Estas seguro de borrar",
        object: props.data.nombreDireccion,
        data: props.data,
        tipo: 'delete'
      })
      setConfirmDialogOpen(true);

    } else if (props.tipo == 'mark') {
      setDialogContent({
        title: "Marcar predeterminada",
        notes: "Esta dirección aparecerá como predeterminada al agregar envíos",
        action: "Estas seguro de marcar como predeterminada",
        object: props.data.nombreDireccion,
        data: props.data,
        tipo: 'mark'
      })
      setConfirmDialogOpen(true);
    }
    
  }

  const handleConfirm = async (props: any) => {
   
    if(props.confirm ) {

      if (props.tipo == 'delete') {
        setConfirmDialogOpen(false);
        loader.onOpen();
        const res = await deleteDireccion({id: props.data.id});
        toast.success('Dirección borrada!');
      } else if (props.tipo == 'mark') {
        setConfirmDialogOpen(false);
        loader.onOpen();
        const res = await markDireccion({id: props.data.id});
        toast.success('Dirección marcada!');
      }

      router.refresh();

      const timer = setTimeout(() => {
        loader.onClose();
        }, 2000);
      
     

    } else {
      setConfirmDialogOpen(false);
    }
  }
  

  const onAddDireccion = async (props: any) => {
    loader.onOpen();
    setConfirmDialogOpen(true);

    //deleteDireccion({id: id});

    const timer = setTimeout(() => {
      loader.onClose();
      }, 3000);
  } 

  const onEditDireccion = async (direccion: any) => {
    setEditData(direccion);
    setEditing(true);
  } 

  const onEditClose  = async (props: any) => {

    if(props.action == 'save') {
      const res = await updateDireccion({id: props.id, data: props.data});
      toast.success('Direccion editada!');
      setEditing(false);
      router.refresh();
      const timer = setTimeout(() => {
        loader.onClose();
        }, 1000);
      
    } else if ( props.action == 'cancel') {
      setEditing(false);
    }
  } 

  const onAddClose  = async (props: any) => {
        const res = await addDireccion(props.apiData);
          if(res.status == 1) {
            toast.success('Dirección creada!');
          } else {
            toast.error(res.statusMessage);
          }
          setAdding(false);
          router.refresh();
          const timer = setTimeout(() => {
            loader.onClose();
          }, 1000);
  } 

  const handleSearch = (data: any) => {
    if (data) {
     setDirecciones(data);
    } 
  }
  


    return (
      <ClientOnly>
        <ConfirmDialog isOpen={confirmDialogOpen} onClose={handleConfirm} dialogContent={dialogContent}/>
        <PortalLayout>
            <PageHeader 
              title="Mis direcciones"
              subtitle={subtitle}
              icon={FaHome}
              buttonIcon={FaPlus}
              buttonAction={onButtonClick}
              cancelIcon={FaTimes}
              cancelAction={onButtonClick}
              adding={adding}
              disabled = {false}
            />
         
           { editing ? 
           
           <EditarDireccion tipo='direccion' direccion={editData} title="Editar direccion" currentUser={props.currentUser} onClose={onEditClose}/>
           :
              <>
              {adding ? 
                  <div className="m-4 flex flex-col bg-white rounded-md">
                    <div className="p-2"  >
                      <AgregarDireccion 
                        title="Agrega una dirección de recolección" 
                        currentUser={props.currentUser} 
                        onClose={onAddClose}
                        tipo='direccion'
                        from='menu'/>
                    </div>
                  </div>
                :
                  <div className="my-2 md:my-4 mx-0 lg:mx-4 p-4">
                    <>
                      {props.data.length >3 && <div className="flex my-6 mx-0 w-full md:w-3/4  xl:w-1/4 ">
                        <ListSearch 
                          placeholder="Buscar direccion"
                          inputArray={direcciones}
                          keys={['contactoNombre', 'calle', 'colonia', 'nombreDireccion']}
                          filteredData={handleSearch}
                          onReset={() => setDirecciones(props.data)}
                          minLength={2}
                        />
                      </div>}

                      { direcciones.length >= 1 ? direcciones?.map((direccion: SafeDireccion, i: number) => {
                        return (
                          
                        <div key={i}>
                          <DireccionesCard 
                            tipo='direccion' 
                            direccion={direccion} 
                            onDelete={handleConfirmDialog}
                            onEdit={onEditDireccion}
                            onMark={handleConfirmDialog}
                            onSelect={() => {}}
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
                  }
                </>  
              }
           

            
        
        </PortalLayout>
      </ClientOnly>
    )
  }


  
export default MisdireccionesClient;