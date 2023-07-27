'use client';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import EnviosCard from "./EnviosCard";
import { SafeRecoleccion, SafePedido } from "@/app/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    } from "@/components/ui/sheet"

import LoaderSingle from "@/app/components/LoaderSingle";
import {BiSort} from 'react-icons/bi';
import EnvioView from "./EnvioView";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";

type UserQueryParams = {
    take?: number;
    lastCursor?: string;
    order: string;
    filter?: string;
    search?: string;
  };

  const pedidosQuery = async ({ take, lastCursor, order, filter, search }: UserQueryParams) => {
    console.log('firing pedidosQuery')
    const response = await axios.get("/api/pedidos", {
      params: { take, lastCursor, order, filter, search },
    });
    console.log(response.data);
    return response?.data;
  };

interface EnviosDisplayProps {
filter?: string;
search?: string;
}

const EnviosDisplay: React.FC<EnviosDisplayProps> = ({
   filter = '1',
   search
   
}) => {

const { ref, inView } = useInView(
    {
        threshold: 0,
        onChange: (inView, entry) => {
            if (inView && hasNextPage) {
                fetchNextPage();
              }
        }
    }
);
const [initialLoading,setInitialLoading] = useState(false);
const [order, setOrder] = useState('desc');
const [sheetOpen, setSheetOpen] = useState(false);
const [pedidoSelected, setPedidoSelected] = useState<SafePedido>();

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
      pedidosQuery({ take: 10, lastCursor: pageParam, order: order, filter: filter }),
    queryKey: ["pedidos", order, filter],

    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

   /*  useEffect(() => {
      console.log(data?.pages[0].metaData.isEmpty);
     }, [data]); */
    
  /* useEffect(() => {
 
        if (inView && hasNextPage) {
            fetchNextPage();
          }
     
    
     }, [hasNextPage, inView, fetchNextPage]); */

    if (error as any)
    return (
    <div className="mt-10">
        {"An error has occurred: " + (error as any).message}
    </div>
    );

    const handleOrder = (order: any) => {
        setOrder(order);
    }

    const handlePedidoClick = (pedido: SafePedido) => {
        setPedidoSelected(pedido);
        setSheetOpen(true);

    }

 return (
  <div className="w-full xl:w-4/6 flex flex-col" >
    <div className="flex flex-row justify-end items-center mb-4">
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
   
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
         

     
         {isSuccess && 
            data?.pages.map((page) =>
              page.data.map((pedido: SafePedido, index: number) => {
                //console.log(rec);
               if (page.data.length === index + 1) {
                  return (
                    <div ref={ref} key={pedido.id} onClick={() => handlePedidoClick(pedido)}>
                        <EnviosCard
                            data={pedido}
                        />
                    </div>
                  );
                } else {
                  return (
                    <div key={pedido.id} onClick={() => handlePedidoClick(pedido)}>
                        <EnviosCard
                            data={pedido}
                        />
                    </div>
                  );
                }
              })
            ) 
             
            }
          {(isLoading ) && <p className="m-3"><LoaderSingle /></p>}
          {(isFetchingNextPage) && <p className="mb-2 mt-1 mx-3"><LoaderSingle /></p>}
          <ScrollArea>
          <SheetContent side='bottom' className="h-screen p-0 m-0 md:p-4 overflow-y-scroll">
          
            <div className="flex flex-col py-2">
              {pedidoSelected && <EnvioView data={pedidoSelected} />}
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    Cerrar
                </SheetClose>
            </SheetFooter>
            
        </SheetContent>
        </ScrollArea>
     </Sheet>
      
  </div>
 );
}

export default EnviosDisplay;