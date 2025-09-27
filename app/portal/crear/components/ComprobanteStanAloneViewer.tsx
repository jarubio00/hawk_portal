"use client";
import * as React from "react";

type Props = {
  file: File | null | undefined;
  height?: string; // Ej: "70vh" o "100%"
  className?: string;
  preferDataUrlForPdf?: boolean; // Si tu CSP bloquea blob: en frames
};

export default function FileViewerStandalone({
  file,
  height = "100%", // ← cuando lo uses en el dialog, lo controla el padre
  className = "",
  preferDataUrlForPdf = false,
}: Props) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = React.useState<string | null>(null);
  const [isPdf, setIsPdf] = React.useState(false);
  const [hostReady, setHostReady] = React.useState(false);
  const [mountKey, setMountKey] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  // Detecta tamaño válido del contenedor y remonta el iframe
  React.useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let ready = false;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r && r.width > 0 && r.height > 0 && !ready) {
        ready = true;
        setHostReady(true);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setMountKey((k) => k + 1))
        );
      }
    });
    ro.observe(el);
    const t = setTimeout(() => {
      if (!ready && el.clientWidth > 0 && el.clientHeight > 0) {
        ready = true;
        setHostReady(true);
        setMountKey((k) => k + 1);
      }
    }, 120);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, []);

  // Fuente (blob para imagen, blob o dataURL para PDF)
  React.useEffect(() => {
    setLoaded(false);
    setSrc(null);
    setIsPdf(false);
    if (!file) return;

    if (file.type === "application/pdf") {
      setIsPdf(true);
      if (preferDataUrlForPdf) {
        const r = new FileReader();
        r.onload = () => setSrc(typeof r.result === "string" ? r.result : null);
        r.onerror = () => setSrc(null);
        r.readAsDataURL(file);
        return () => r.abort();
      } else {
        const u = URL.createObjectURL(file);
        setSrc(u);
        return () => URL.revokeObjectURL(u);
      }
    } else {
      const u = URL.createObjectURL(file);
      setSrc(u);
      return () => URL.revokeObjectURL(u);
    }
  }, [file, preferDataUrlForPdf]);

  React.useEffect(() => {
    setMountKey((k) => k + 1);
  }, [src]);
  React.useEffect(() => {
    const onResize = () => setMountKey((k) => k + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      ref={hostRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height, minHeight: 1 }}
    >
      {!file || !src ? (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
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
              key={`${mountKey}|${src?.length ?? 0}`}
              src={src}
              title="PDF"
              className="absolute inset-0 w-full h-full block bg-neutral-50"
              frameBorder={0}
              onLoad={() => setLoaded(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
            Preparando visor…
          </div>
        )
      ) : (
        // 🔧 Imagen full-area sin grid ni padding
        <div className="absolute inset-0">
          <img
            src={src}
            alt="Imagen"
            className="w-full h-full object-contain block bg-white"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
