"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import EnviosCard from "./EnviosCard";
import { SafeRecoleccion, SafePedido, SafeCobro } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Drawer from "react-modern-drawer";

import LoaderSingle from "@/app/components/LoaderSingle";
import { BiSort } from "react-icons/bi";
import EnvioView from "./EnvioView";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CobrosCards from "./CobrosCard";
import CobroView from "./CobroView";

type UserQueryParams = {
  take?: number;
  lastCursor?: string;
  order: string;
  filter?: string;
  search?: string;
};

const cobrosQuery = async ({
  take,
  lastCursor,
  order,
  filter,
  search,
}: UserQueryParams) => {
  const response = await axios.get("/api/cobros", {
    params: { take, lastCursor, order, filter, search },
  });
  return response?.data;
};

interface CobrosDisplayProps {
  filter?: string;
  search?: string;
  onView: (open: boolean, c: SafeCobro) => void;
}

const CobrosDisplay: React.FC<CobrosDisplayProps> = ({
  filter = "1",
  search,
  onView,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView, entry) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(false);
  const [order, setOrder] = useState("desc");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [cobroSelected, setCobroSelected] = useState<SafeCobro>();

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
      cobrosQuery({
        take: 10,
        lastCursor: pageParam,
        order: order,
        filter: filter,
      }),
    queryKey: ["cobros", order, filter],

    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  if (error as any)
    return (
      <div className="mt-10">
        {"An error has occurred: " + (error as any).message}
      </div>
    );

  const handleOrder = (order: any) => {
    setOrder(order);
  };

  const handleCobroClick = (cobro: SafeCobro) => {
    //setPedidoSelected(pedido);
    //setSheetOpen(true);
    onView(true, cobro);
  };

  return (
    <div className="w-full xl:w-4/6 flex flex-col">
      {isSuccess && data.pages[0].data.length >= 1 && (
        <div className="flex flex-row justify-end items-center mb-4">
          <div className="flex flex-row items-center gap-1">
            <BiSort size={16} />
            <Select
              defaultValue={"desc"}
              onValueChange={(val: any) => handleOrder(val)}
              disabled={
                isLoading ||
                isFetchingNextPage ||
                data.pages[0].data.length <= 1
              }
            >
              <SelectTrigger className="w-[140px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc" className="text-xs">
                  Más reciente
                </SelectItem>
                <SelectItem value="asc" className="text-xs">
                  Más antiguo
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {isSuccess && data.pages[0].data.length >= 1 ? (
        data?.pages.map((page, pageIndex) =>
          page.data.map((cobro: SafeCobro, index: number) => {
            if (page.data.length === index + 1) {
              return (
                <div
                  ref={ref}
                  key={cobro.id}
                  onClick={() => handleCobroClick(cobro)}
                >
                  <CobrosCards data={cobro} />
                </div>
              );
            } else {
              return (
                <div key={cobro.id} onClick={() => handleCobroClick(cobro)}>
                  <CobrosCards data={cobro} />
                </div>
              );
            }
          })
        )
      ) : (
        <>
          {!isLoading && (
            <div className="felx flex-col gap-2 text-xs p-4">
              <p>No se encontraron cobros</p>
            </div>
          )}
        </>
      )}
      {isLoading && (
        <p className="m-3">
          <LoaderSingle />
        </p>
      )}
      {isFetchingNextPage && (
        <p className="mb-2 mt-1 mx-3">
          <LoaderSingle />
        </p>
      )}

      <Drawer
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        direction="bottom"
        style={{ height: "90%", zIndex: 9999 }}
      >
        <ScrollArea>
          <div className="flex flex-col py-2">
            {cobroSelected && <CobroView data={cobroSelected} />}
          </div>
        </ScrollArea>
      </Drawer>
    </div>
  );
};

export default CobrosDisplay;
