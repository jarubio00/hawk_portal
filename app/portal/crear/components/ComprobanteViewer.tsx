"use client";

import * as React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type FileLightboxContentProps = {
  file: File | null | undefined;
  title?: string;
};

function useWindowSizeKey() {
  const [key, setKey] = React.useState<string>("");
  React.useEffect(() => {
    const update = () => setKey(`${window.innerWidth}x${window.innerHeight}`);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return key;
}

export default function FileLightboxContent({
  file,
  title,
}: FileLightboxContentProps) {
  const [url, setUrl] = React.useState<string | null>(null);
  const [isPdf, setIsPdf] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  // host medido para evitar altura 0 en primer paint (modo móvil)
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const [hostReady, setHostReady] = React.useState(false);
  const [mountTick, setMountTick] = React.useState(0); // forza remount del iframe

  const winKey = useWindowSizeKey(); // remount en cambios de viewport

  // Observa el tamaño real del host; cuando tenga >0, remonta el iframe
  React.useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr && cr.width > 0 && cr.height > 0) {
        setHostReady(true);
        // doble RAF para asegurar layout estable antes de montar el iframe
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setMountTick((t) => t + 1));
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Genera blob URL (sirve para imagen y PDF)
  React.useEffect(() => {
    setLoaded(false);
    setUrl(null);
    setIsPdf(false);

    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    setIsPdf(file.type === "application/pdf");

    return () => {
      URL.revokeObjectURL(u);
    };
  }, [file]);

  return (
    <DialogContent
      className={[
        "fixed inset-0 left-0 top-0 translate-x-0 translate-y-0",
        "max-w-none rounded-none p-0 gap-0 border-none",
        "flex flex-col min-h-0",
      ].join(" ")}
    >
      {/* Header */}
      <DialogHeader className="shrink-0 sticky top-0 z-10 flex flex-row items-center justify-between px-4 h-14 border-b bg-background/90 backdrop-blur">
        <DialogTitle className="truncate text-base">
          {title ?? file?.name ?? "Documento"}
        </DialogTitle>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </Button>
        </DialogClose>
      </DialogHeader>

      {/* Body */}
      <div
        ref={hostRef}
        className="relative flex-1 min-h-0 w-full bg-neutral-50"
      >
        {!file || !url ? (
          <div className="p-6 text-sm text-muted-foreground">
            No hay archivo para mostrar.
          </div>
        ) : isPdf ? (
          hostReady ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                  Preparando visor…
                </div>
              )}
              <iframe
                // remounts cuando: cambia archivo (url), viewport (winKey) o tras primer tamaño válido (mountTick)
                key={`${url}|${winKey}|${mountTick}`}
                src={url}
                title="PDF"
                className="absolute inset-0 w-full h-full block"
                frameBorder={0}
                onLoad={() => setLoaded(true)}
              />
              {/* Fallback absoluto por si el iframe no carga en 1.5s */}
              {!loaded && (
                <TimeoutFallback ms={1500}>
                  <div className="absolute inset-0 grid place-items-center p-6">
                    <p className="text-sm text-muted-foreground">
                      Si no ves el PDF, ábrelo&nbsp;
                      <a
                        className="underline"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        en una pestaña nueva
                      </a>
                      .
                    </p>
                  </div>
                </TimeoutFallback>
              )}
            </>
          ) : (
            <div className="p-6 text-sm text-muted-foreground">
              Preparando visor…
            </div>
          )
        ) : (
          // Imagen
          <div className="absolute inset-0 grid place-items-center p-4">
            <img
              src={url}
              alt="Imagen completa"
              className="max-w-full max-h-full object-contain bg-white shadow-sm"
              draggable={false}
            />
          </div>
        )}
      </div>
    </DialogContent>
  );
}

function TimeoutFallback({
  ms,
  children,
}: {
  ms: number;
  children: React.ReactNode;
}) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setShow(true), ms);
    return () => clearTimeout(id);
  }, [ms]);
  return show ? <>{children}</> : null;
}
