'use client';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SafeRecoleccion } from "@/app/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area";
import RecoleccionCard from "./RecoleccionCard";
import LoaderSingle from "@/app/components/LoaderSingle";


const recoleccionesQuery = async () => {
    const response = await axios.get("/api/recolecciones");
    return response?.data;
  };

interface RecoleccionesSectionProps {
 
}

const RecoleccionesSection: React.FC<RecoleccionesSectionProps> = ({

}) => {
const {
    data,
    error,
    isLoading,
    isSuccess,
    } = useQuery({
    queryFn: () =>
        recoleccionesQuery(),
    queryKey: ["recolecciones", ],

    });

useEffect(() => {
    console.log(data);
},[data])

 return (
  <div className='my-0   w-full xl:w-4/6'>
        <p className="text-xs font-bold mb-2 text-foreground">Recolecciones activas</p>
        <hr className="my-2 mb-4"></hr>
        {isSuccess && data.data?.length >=1 ?
            <>
            <div>
                    {data.data.map((rec: SafeRecoleccion, index: number ) => {
                        return (
                            <div key={rec.id}>
                                <RecoleccionCard recoleccion={rec} /> 
                            </div>
                        )
                    })}
            </div>
            </>
            :
            <>
                { !isLoading && 
                    <div className="felx flex-col gap-2 text-xs p-4">
                    <p>No se encontraron recolecciones activas</p>
                    
                    </div>}
            </>    
    
        }
         {(isLoading ) && <p className="m-3"><LoaderSingle /></p>}

  </div>
 );
}

export default RecoleccionesSection;