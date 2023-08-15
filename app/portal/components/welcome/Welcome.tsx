'use client';
import { addDireccion } from "@/app/actions/apiQuerys";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useLoader from "@/app/hooks/useLoader";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';


interface WelcomeProps {
 currentUser: any;
 page: string;
}

const Welcome: React.FC<WelcomeProps> = ({
 currentUser,
 page
}) => {
     const router = useRouter();
     const loader = useLoader();
     const [add,setAdd] = useState(false);

     const handleAdd = () => {
          setAdd(!add);
     }

     const onAddClose  = async (props: any) => {
          const res = await addDireccion(props.apiData);
            if(res.status == 1) {
              toast.success('Dirección creada!');
            } else {
              toast.error(res.statusMessage);
            }
            setAdd(false);
            router.refresh();
            const timer = setTimeout(() => {
              loader.onClose();
            }, 1000);
    } 
    
 return (
  <div className='min-h-[80vh] w-full'>
       <div className="flex flex-col p-4 pt-8">
            <p className="text-xl font-bold">Benvenido {currentUser?.nombre.split(" ")[0] || ' '}. </p>
            <p className="text-sm text-neutral-400">Casi todo está listo para que comiences a utilizar la plataforma de La Mensajeria.MX</p>
            <p className='mt-10'>Se requiere al menos una dirección de recolección. </p>
            <div className="mt-2">
                 {!add ? <div className="mt-0">
                 <Button 
                    onClick={handleAdd} 
                    className="mt-4 gap-3 px-2 py-5 bg-rose-500 hover:bg-rose-500/80">
                    Agregar dirección
               </Button>
                 </div>
                    :
                    <div className="flex flex-col gap-2">
                         <div>
                              <Button
                                   variant='ghost'
                                   onClick={handleAdd}
                                   className="mt-4 gap-3 px-2 py-5 text-red-500 font-bold">
                                   Cancelar
                              </Button>
                         </div>
                         <div className="px-2"  >
                              <AgregarDireccion 
                                   title="Agrega una dirección de recolección" 
                                   currentUser={currentUser} 
                                   onClose={onAddClose}
                                   tipo='direccion'
                                   from='menu'/>
                              </div>

                    </div>  
                           }
            </div>
            
       </div>
       
  </div>
 );
}

export default Welcome;