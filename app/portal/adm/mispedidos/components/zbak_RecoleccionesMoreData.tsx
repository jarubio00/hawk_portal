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
  <div className='my-2 p-2  w-full xl:w-4/6'>
        <p className="text-xs font-bold mb-2 text-foreground">Recolecciones activas</p>
        <hr className="my-1"></hr>
        {isSuccess && data.data?.length >=1 && 
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
            {data.isMoreData && <div>
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <p className="mt-2 text-xs text-rose-500 cursor-pointer font-bold">Ver más...</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Recolecciones activas</AlertDialogTitle>
                    <AlertDialogDescription asChild className="p-0">
                            <ScrollArea className="h-[60vh] md:h-[50vh] w-full">
                                {data.moreData.map((rec: SafeRecoleccion, index: number ) => {
                                    return (
                                        <div key={rec.id}  className="flex flex-col">
                                           <RecoleccionCard recoleccion={rec} />
                                           <hr className="my-1"></hr>
                                        </div>
                                    )
                                })}
                            </ScrollArea>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel className="px-2">Salir</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
                
                </div>}
        </>
        }

  </div>
 );
}

export default RecoleccionesSection;