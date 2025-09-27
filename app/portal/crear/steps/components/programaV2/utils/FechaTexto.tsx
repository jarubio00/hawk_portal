"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SelectedDateLabelProps = {
  date: Date | undefined;
  type: string;
  className?: string;
  locale?: string; // por si quieres cambiar fácilmente el locale (default es-MX)
};

function formatLongEs(date: Date, locale = "es-MX") {
  const parts = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).formatToParts(date);

  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";

  // "miércoles 27 de agosto" → minúsculas
  return `${get("weekday")} ${get("day")} de ${get("month")}`.toLowerCase();
}

function formatShortEs(date: Date, locale = "es-MX") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date); // 27/08/2025
}

export function FechaTexto({
  date,
  type = "",
  className,
  locale = "es-MX",
}: SelectedDateLabelProps) {
  if (date && type == "mismoDia") {
    return (
      <p className={cn("text-xs font-medium leading-tight", className)}>
        {formatLongEs(date, locale)}
      </p>
    );
  }

  if (!date) {
    return (
      <div className={cn("flex flex-col", className)} aria-live="polite">
        <p className="text-xs italic">Selecciona una fecha de {type}</p>
      </div>
    );
  }

  const longLabel = formatLongEs(date, locale);
  const shortLabel = formatShortEs(date, locale);

  return (
    <div className={cn("flex flex-col", className)} aria-live="polite">
      <p className="text-xs font-medium leading-tight">{longLabel}</p>
      <p className="text-[11px] text-muted-foreground">10:00am - 7:00pm</p>
    </div>
  );
}
