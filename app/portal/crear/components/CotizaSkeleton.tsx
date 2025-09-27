"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useProgramaStore } from "../store/crear-store";

export function CotizaSkeleton({ className }: { className?: string }) {
  const pv2 = useProgramaStore();
  return (
    <div className={cn("inline-block rounded-md  p-0  w-full", className)}>
      <div className="flex flex-col gap-1 w-full  lg:w-2/4  ">
        <div className="m-3">
          <div className="flex w-full flex-row justify-between items-center ">
            <Skeleton className="h-4 w-12 rounded-sm" />
            <Skeleton className="h-4 w-8 rounded-sm" />
          </div>
          <div className="flex w-full flex-row justify-between items-center mt-2">
            <Skeleton className="h-4 w-48 rounded-sm" />
            <Skeleton className="h-4 w-8 rounded-sm" />
          </div>
          {pv2.mismoDiaSelected && (
            <div className="flex w-full flex-row justify-between items-center mt-1">
              <Skeleton className="h-4 w-48 rounded-sm" />
              <Skeleton className="h-4 w-8 rounded-sm" />
            </div>
          )}
        </div>
        <Skeleton className="h-[2px] w-full " />
        <div className="m-3">
          <div className="flex w-full flex-row justify-between items-center ">
            <div></div>
            <div className="flex flex-row gap-3">
              <Skeleton className="h-5 w-14 rounded-sm" />
              <Skeleton className="h-5 w-12 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
