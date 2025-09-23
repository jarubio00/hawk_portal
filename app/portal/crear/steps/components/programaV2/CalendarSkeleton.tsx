"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CalendarSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("inline-block rounded-md border p-3  w-full", className)}
      // ancho real del Calendar
    >
      {/* Header (mes y controles) */}
      <div className="flex justify-between items-center mt-1 mb-6">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-[26px] mx-auto" />
        ))}
      </div>

      {/* Celdas de días */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 42 }).map((_, i) => (
          <Skeleton key={i} className="h-[38px] w-[38px] rounded-md" />
        ))}
      </div>
    </div>
  );
}
