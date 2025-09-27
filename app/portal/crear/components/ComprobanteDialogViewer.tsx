"use client";

import * as React from "react";
import * as RD from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import FileViewerStandalone from "./ComprobanteStanAloneViewer";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  file: File | null | undefined;
  title?: string;
  preferDataUrlForPdf?: boolean;
};

export default function PdfImageDialog({
  open,
  onOpenChange,
  file,
  title,
  preferDataUrlForPdf,
}: Props) {
  return (
    <RD.Root open={open} onOpenChange={onOpenChange}>
      <RD.Portal>
        <RD.Overlay
          className="fixed inset-0 bg-black/50"
          style={{ zIndex: 100_000, transform: "none", filter: "none" }}
        />
        <RD.Content
          className="fixed inset-0 m-0 p-0 bg-background"
          style={{ zIndex: 100_001, transform: "none" }}
        >
          <RD.Title> </RD.Title>
          {/* Contenedor full con columnas */}
          <div className="flex flex-col min-h-0 w-full h-[100dvh] overflow-hidden">
            {/* Header fijo de 56px */}
            <div className="shrink-0 h-14 flex items-center justify-between px-4 border-b bg-background">
              <div className="truncate text-base">
                {title ?? file?.name ?? "Documento"}
              </div>
              <RD.Close
                aria-label="Cerrar"
                className="inline-flex items-center justify-center h-9 w-9 rounded hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </RD.Close>
            </div>

            {/* Body con altura EXACTA: 100dvh - 56px */}
            <div className="relative h-[calc(100dvh-56px)] min-h-0 overflow-hidden">
              <FileViewerStandalone
                file={file}
                height="100%" // el padre ya fija la altura
                preferDataUrlForPdf={preferDataUrlForPdf}
              />
            </div>
          </div>
        </RD.Content>
      </RD.Portal>
    </RD.Root>
  );
}
