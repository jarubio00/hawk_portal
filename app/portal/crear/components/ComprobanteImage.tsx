"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type FixedSize = { width: number; height: number };

type ReceiptPreviewProps = {
  file: File | null | undefined;
  /** Tamaño fijo para portrait (ej. 240x360) */
  portraitSize?: FixedSize;
  /** Tamaño fijo para landscape (ej. 360x240) */
  landscapeSize?: FixedSize;
  /** Zoom visual aplicado SOLO a PDFs (recorte/close-up) */
  pdfZoom?: number; // e.g. 2.0 - 3.0
  /** Clase extra para el wrapper */
  className?: string;

  /** 💡 Si se define, el preview será clickable y ejecutará esto */
  onOpen?: () => void;
  /** Evitar que el click burbujee hacia padres (true por defecto) */
  stopEventBubbling?: boolean;
  /** aria-label del botón cuando es clickable */
  ariaLabelOpen?: string;
  /** Deshabilitar el click de apertura */
  disabled?: boolean;
};

const DEFAULT_PORTRAIT: FixedSize = { width: 240, height: 360 };
const DEFAULT_LANDSCAPE: FixedSize = { width: 360, height: 240 };

type Orientation = "portrait" | "landscape";

export default function ReceiptPreview({
  file,
  portraitSize = DEFAULT_PORTRAIT,
  landscapeSize = DEFAULT_LANDSCAPE,
  pdfZoom = 1.2,
  className = "",
  onOpen,
  stopEventBubbling = true,
  ariaLabelOpen = "Ver documento completo",
  disabled = false,
}: ReceiptPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  const prevObjectUrl = useRef<string | null>(null);

  const mime = file?.type || "";
  const isImage = useMemo(() => /^image\//.test(mime), [mime]);
  const isPdfFile = useMemo(() => mime === "application/pdf", [mime]);

  // Limpia object URLs al desmontar
  useEffect(() => {
    return () => {
      if (prevObjectUrl.current) {
        URL.revokeObjectURL(prevObjectUrl.current);
        prevObjectUrl.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function getImageDimsFromFile(
      f: File
    ): Promise<{ w: number; h: number; url: string }> {
      const url = URL.createObjectURL(f);
      const img = new Image();
      const dims = await new Promise<{ w: number; h: number }>(
        (resolve, reject) => {
          img.onload = () =>
            resolve({ w: img.naturalWidth, h: img.naturalHeight });
          img.onerror = reject;
          img.src = url;
        }
      );
      return { ...dims, url };
    }

    async function makePdfThumbnail(f: File): Promise<{
      url: string;
      pageW: number;
      pageH: number;
    }> {
      const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
      GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

      const data = await f.arrayBuffer();
      const loadingTask = getDocument({ data });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      // 1) Orientación rápida
      const probe = page.getViewport({ scale: 1 });
      const pageW = probe.width;
      const pageH = probe.height;

      // 2) Render HD (nitidez + zoom visual)
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const baseScale = 3 * dpr;
      const viewport = page.getViewport({ scale: baseScale });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No se pudo obtener el contexto 2D del canvas");

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      await page.render({ canvasContext: ctx, viewport }).promise;
      return { url: canvas.toDataURL("image/png"), pageW, pageH };
    }

    async function process() {
      // Limpieza previa
      if (prevObjectUrl.current) {
        URL.revokeObjectURL(prevObjectUrl.current);
        prevObjectUrl.current = null;
      }
      setPreviewUrl(null);
      setIsPdf(false);
      setOrientation(null);

      if (!file) return;

      if (isImage) {
        try {
          const { w, h, url } = await getImageDimsFromFile(file);
          if (cancelled) return;
          prevObjectUrl.current = url;
          setPreviewUrl(url);
          setIsPdf(false);
          setOrientation(w >= h ? "landscape" : "portrait");
        } catch (e) {
          console.error("Error leyendo imagen:", e);
        }
      } else if (isPdfFile) {
        try {
          const { url, pageW, pageH } = await makePdfThumbnail(file);
          if (cancelled) return;
          setPreviewUrl(url);
          setIsPdf(true);
          setOrientation(pageW >= pageH ? "landscape" : "portrait");
        } catch (err) {
          console.error("Error generando miniatura de PDF:", err);
          if (!cancelled) setPreviewUrl(null);
        }
      } else {
        setPreviewUrl(null);
      }
    }

    process();
    return () => {
      cancelled = true;
    };
  }, [file, isImage, isPdfFile]);

  // Estados vacíos o no soportados
  if (!file) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        No hay archivo seleccionado.
      </div>
    );
  }
  if (!isImage && !isPdfFile) {
    return (
      <div className={`text-sm text-red-600 ${className}`}>
        Tipo de archivo no soportado: {mime || "desconocido"}.
      </div>
    );
  }

  // PDFs SIEMPRE usan caja landscape
  const chosenSize: FixedSize | null = isPdf
    ? landscapeSize
    : orientation === "landscape"
    ? landscapeSize
    : orientation === "portrait"
    ? portraitSize
    : null;

  const label = isPdf
    ? "Vista Landscape (PDF)"
    : orientation === "landscape"
    ? "Vista Landscape (auto)"
    : orientation === "portrait"
    ? "Vista Portrait (auto)"
    : "Vista";

  // Caja fija con overflow hidden para recorte
  const Box: React.FC<
    { size: FixedSize; label: string } & React.PropsWithChildren
  > = ({ size, label, children }) => (
    <div className="flex flex-col items-start gap-2">
      <div
        className="relative overflow-hidden rounded-xl border bg-white"
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      >
        {children}
      </div>
    </div>
  );

  const content = (
    <div className={`flex flex-wrap gap-6 ${className}`}>
      {previewUrl && chosenSize ? (
        <Box size={chosenSize} label={label}>
          <img
            src={previewUrl}
            alt={isPdf ? "Miniatura PDF (página 1)" : "Vista previa imagen"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: isPdf ? "left top" : "center",
              display: "block",
              transform: isPdf ? `scale(${pdfZoom})` : undefined,
              transformOrigin: isPdf ? ("top left" as const) : undefined,
            }}
            draggable={false}
          />
        </Box>
      ) : (
        <div className="text-xs text-muted-foreground">
          Generando vista previa…
        </div>
      )}
    </div>
  );

  // Si no hay onOpen, render normal (no clickable)
  if (!onOpen) return content;

  // Si hay onOpen, renderiza como botón accesible
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (stopEventBubbling) e.stopPropagation();
    if (!disabled) onOpen();
  };
  const handlePointerDownCapture: React.PointerEventHandler<
    HTMLButtonElement
  > = (e) => {
    if (stopEventBubbling) e.stopPropagation();
  };

  const isReady = Boolean(previewUrl && chosenSize);

  return (
    <button
      type="button"
      aria-label={ariaLabelOpen}
      onClick={handleClick}
      onPointerDownCapture={handlePointerDownCapture}
      disabled={!isReady || disabled}
      className={[
        "appearance-none bg-transparent border-0 p-0 m-0 text-left",
        isReady && !disabled
          ? "cursor-zoom-in"
          : "cursor-not-allowed opacity-60",
        // enfoque accesible
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      ].join(" ")}
    >
      {content}
    </button>
  );
}

function Fallback({ type }: { type: "image" | "pdf" }) {
  return (
    <div className="absolute inset-0 grid place-content-center">
      {type === "pdf" ? (
        <span className="text-xs text-muted-foreground">
          PDF sin vista previa
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">
          Imagen sin vista previa
        </span>
      )}
    </div>
  );
}
