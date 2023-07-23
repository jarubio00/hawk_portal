'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import RecoleccionesCard from "./RecoleccinesCard";
import { SafeRecoleccion } from "@/app/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import LoaderSingle from "@/app/components/LoaderSingle";
import {BiSort} from 'react-icons/bi';

type UserQueryParams = {
    take?: number;
    lastCursor?: string;
    order: string;
  };

  const recoleccionesCompletadas = async ({ take, lastCursor, order }: UserQueryParams) => {
    const response = await axios.get("/api/recolecciones", {
      params: { take, lastCursor, order },
    });
    return response?.data;
  };

interface CompletadasProps {
    displayOrder: string;
    setOrder: (order: string) => void;
}

const Completadas: React.FC<CompletadasProps> = ({
   
   
}) => {

const { ref, inView } = useInView();
const [initialLoading,setInitialLoading] = useState(false);
const [order, setOrder] = useState('desc');


const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = "" }) =>
      recoleccionesCompletadas({ take: 10, lastCursor: pageParam, order: order }),
    queryKey: ["recolecciones", order],

    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  useEffect(() => {
   
    if (inView && hasNextPage) {
         fetchNextPage();
       }
     }, [hasNextPage, inView, fetchNextPage]);

    if (error as any)
    return (
    <div className="mt-10">
        {"An error has occurred: " + (error as any).message}
    </div>
    );

    const handleOrder = (order: any) => {
        
        setOrder(order);

       
    }

 return (
  <div>
    <div className="w-full xl:w-5/6  flex flex-row justify-end items-center mb-4">
        <div className="flex flex-row items-center gap-1">
            <BiSort size={16} />
            <Select defaultValue={'desc'} onValueChange={(val: any) => handleOrder(val)}  disabled={isLoading || isFetchingNextPage}>
                <SelectTrigger className="w-[140px] text-xs">
                    <SelectValue  />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="desc" className="text-xs">Más reciente</SelectItem>
                    <SelectItem value="asc" className="text-xs">Más antiguo</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
     {isSuccess &&
        data?.pages.map((page) =>
          page.data.map((rec: SafeRecoleccion, index: number) => {
            //console.log(rec);
            if (page.data.length === index + 1) {
              return (
                <div ref={ref} key={rec.id}>
                  <RecoleccionesCard
                    key={rec.id}
                    data={rec}
                    onClick={() => {}}
                  />
                </div>
              );
            } else {
              return (
                <RecoleccionesCard
                key={rec.id}
                data={rec}
                onClick={() => {}}
              />
              );
            }
          })
        )}

      {(isLoading ) && <p className="m-3"><LoaderSingle /></p>}
      {(isFetchingNextPage) && <p className="mb-2 mt-1 mx-3"><LoaderSingle /></p>}
      
  </div>
 );
}

export default Completadas;