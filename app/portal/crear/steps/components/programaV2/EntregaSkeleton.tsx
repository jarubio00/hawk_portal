"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function EntregaSkeleton({ className }: { className?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3 w-[80px] border rounded-sm mb-2" />
      <Skeleton className="h-14 w-[350px] border rounded-sm mb-2" />
      <Skeleton className="h-14 w-[350px] border rounded-sm" />
      <Skeleton className="h-3 w-[180px] border rounded-sm" />
    </div>
  );
}
