"use client";

import * as React from "react";
import { ZoomIn, ZoomOut, Maximize2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

type PdfPagesViewerProps = {
  file: File;
  className?: string;
  padding?: number;
  /** Zoom inicial (1 = 100%, solo UI) */
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  /** "fit-width" ajusta al ancho; "actual-size" respeta 100% */
  initialFitMode?: "fit-width" | "actual-size";
  /** Páginas extra arriba/abajo para prerender (px) */
  rootMargin?: string; // e.g. "1200px 0px"
  /** Límite duro de pixeles del canvas (ancho*alto) para evitar OOM */
  maxCanvasPixels?: number; // e.g. 12e6
  /** Límite de lado mayor del canvas (px físicos) */
  maxCanvasSide?: number; // e.g. 4096
};

export default function PdfPagesViewer({
  file,
  className = "",
  padding = 24,
  initialZoom = 1,
  minZoom = 0.5,
  maxZoom = 4,
  zoomStep = 0.2,
  initialFitMode = "fit-width",
  rootMargin = "1200px 0px",
  maxCanvasPixels = 12_000_000,
  maxCanvasSide = 4096,
}: PdfPagesViewerProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [numPages, setNumPages] = React.useState<number>(0);
  const pdfRef = React.useRef<any>(null); // PDFDocumentProxy

  // refs por página
  const canvasRefs = React.useRef<HTMLCanvasElement[]>([]);
  const wrapperRefs = React.useRef<HTMLDivElement[]>([]);
  const renderTasksRef = React.useRef<(any | null)[]>([]);

  // virtualización
  const [visibleSet, setVisibleSet] = React.useState<Set<number>>(new Set());

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // modo/zoom UI (inmediato) y zoom renderizado (debounced)
  const [fitMode, setFitMode] = React.useState<"fit-width" | "actual-size">(
    initialFitMode
  );
  const [zoomUI, setZoomUI] = React.useState<number>(initialZoom);
  const [zoom, setZoom] = React.useState<number>(initialZoom);

  // token para invalidar ciclos
  const renderTokenRef = React.useRef<string>("");

  // Debounce de zoom (reduce renders durante spam de + / rueda)
  React.useEffect(() => {
    const id = setTimeout(() => setZoom(zoomUI), 150);
    return () => clearTimeout(id);
  }, [zoomUI]);

  // Ancho del contenedor para fit-width
  React.useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      setContainerWidth(el.clientWidth - padding * 2);
    });
    ro.observe(el);
    setContainerWidth(el.clientWidth - padding * 2);
    return () => ro.disconnect();
  }, [padding]);

  // Carga el PDF
  React.useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        setLoading(true);
        setError(null);

        const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
        GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

        const data = await file.arrayBuffer();
        const loadingTask = getDocument({ data });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
      } catch (e: any) {
        console.error(e);
        setError("No se pudo cargar el PDF.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (file && file.type === "application/pdf") loadPdf();

    return () => {
      cancelled = true;
      // Cancela renders pendientes
      renderTasksRef.current.forEach((t) => {
        try {
          t?.cancel();
        } catch {}
      });
      renderTasksRef.current = [];
      pdfRef.current = null;
      setNumPages(0);
      setVisibleSet(new Set());
    };
  }, [file]);

  // IntersectionObserver para virtualizar (solo páginas visibles)
  React.useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            const idx = Number((e.target as HTMLElement).dataset.pageIndex);
            if (Number.isFinite(idx)) {
              if (e.isIntersecting) next.add(idx);
              else next.delete(idx);
            }
          }
          return next;
        });
      },
      { root, rootMargin, threshold: 0.01 }
    );

    wrapperRefs.current.forEach((el, i) => {
      if (el) {
        el.dataset.pageIndex = String(i + 1);
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [numPages, rootMargin]);

  // Utilidad: limita tamaño del canvas para evitar OOM
  function clampScaleForLimits(
    width: number,
    height: number,
    scale: number
  ): number {
    const targetW = width * scale;
    const targetH = height * scale;

    let factor = 1;

    // límite por lado
    if (targetW > maxCanvasSide)
      factor = Math.min(factor, maxCanvasSide / targetW);
    if (targetH > maxCanvasSide)
      factor = Math.min(factor, maxCanvasSide / targetH);

    // límite por píxeles totales
    const pixels = targetW * targetH;
    if (pixels > maxCanvasPixels) {
      factor = Math.min(factor, Math.sqrt(maxCanvasPixels / pixels));
    }

    return scale * factor;
  }

  // Render SOLO de páginas visibles (con cancelación por página)
  React.useEffect(() => {
    let cancelled = false;

    // Cancela todos los renders en curso al iniciar ciclo
    renderTasksRef.current.forEach((t) => {
      try {
        t?.cancel();
      } catch {}
    });
    renderTasksRef.current = [];

    const token = Math.random().toString(36).slice(2);
    renderTokenRef.current = token;

    async function renderVisible() {
      const pdf = pdfRef.current;
      if (!pdf) return;

      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      // Renderiza páginas visibles en orden
      const visiblePages = Array.from(visibleSet).sort((a, b) => a - b);

      for (const pageNum of visiblePages) {
        if (cancelled) break;
        if (renderTokenRef.current !== token) break;

        const page = await pdf.getPage(pageNum);
        const vp1 = page.getViewport({ scale: 1 });

        const baseScale =
          fitMode === "fit-width"
            ? (containerWidth * dpr) / vp1.width
            : 1 * dpr;

        // Aplica zoom (debounced) y clamp de memoria
        let scale = baseScale * zoom;
        scale = clampScaleForLimits(vp1.width, vp1.height, scale);

        const viewport = page.getViewport({ scale });

        const wrapper = wrapperRefs.current[pageNum - 1];
        const canvas = canvasRefs.current[pageNum - 1];
        if (!wrapper || !canvas) continue;

        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        // Ajusta tamaño físico del canvas
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        // Tamaño visual CSS (px lógicos)
        canvas.style.width = `${Math.floor(viewport.width / dpr)}px`;
        canvas.style.height = `${Math.floor(viewport.height / dpr)}px`;

        // Cancela posible render previo de ESTA página
        try {
          renderTasksRef.current[pageNum - 1]?.cancel();
        } catch {}

        // Render
        const task = page.render({ canvasContext: ctx, viewport });
        renderTasksRef.current[pageNum - 1] = task;

        try {
          await task.promise;
        } catch (err: any) {
          if (err?.name !== "RenderingCancelledException") {
            console.error(`Error renderizando página ${pageNum}:`, err);
          }
        } finally {
          renderTasksRef.current[pageNum - 1] = null;
        }

        // cede al event loop
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    renderVisible();
    return () => {
      cancelled = true;
      renderTasksRef.current.forEach((t) => {
        try {
          t?.cancel();
        } catch {}
      });
      renderTasksRef.current = [];
    };
  }, [visibleSet, containerWidth, zoom, fitMode]);

  // Zoom con rueda (Ctrl/⌘ + wheel) — solo cambia zoomUI; render se hace por debounce
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setZoomUI((z) => {
          const delta = e.deltaY < 0 ? +zoomStep : -zoomStep;
          const next = Math.min(
            maxZoom,
            Math.max(minZoom, +(z + delta).toFixed(3))
          );
          return next;
        });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [minZoom, maxZoom, zoomStep]);

  // Atajos de teclado (también a zoomUI)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      // Evita repetir en exceso con autorepeat usando debounce downstream
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoomUI((z) => Math.min(maxZoom, +(z + zoomStep).toFixed(3)));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoomUI((z) => Math.max(minZoom, +(z - zoomStep).toFixed(3)));
      } else if (e.key === "0") {
        e.preventDefault();
        setFitMode("actual-size");
        setZoomUI(1);
      } else if (e.key === "9") {
        e.preventDefault();
        setFitMode("fit-width");
        setZoomUI(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [minZoom, maxZoom, zoomStep]);

  // Botonera (opera sobre zoomUI)
  const Toolbar = () => (
    <div className="sticky top-0 z-10 flex items-center gap-2 px-3 py-2 border-b bg-background/90 backdrop-blur">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setZoomUI((z) => Math.max(minZoom, +(z - zoomStep).toFixed(3)))
        }
        aria-label="Alejar"
        title="Alejar (Ctrl/⌘ -)"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setZoomUI((z) => Math.min(maxZoom, +(z + zoomStep).toFixed(3)))
        }
        aria-label="Acercar"
        title="Acercar (Ctrl/⌘ +)"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <div className="mx-2 text-xs tabular-nums w-16 text-center">
        {(zoom * 100).toFixed(0)}%
      </div>

      <Button
        variant={fitMode === "actual-size" ? "default" : "outline"}
        size="sm"
        onClick={() => {
          setFitMode("actual-size");
          setZoomUI(1);
        }}
        aria-label="100%"
        title="Tamaño real (Ctrl/⌘ 0)"
      >
        <Square className="h-4 w-4 mr-1" />
        100%
      </Button>

      <Button
        variant={fitMode === "fit-width" ? "default" : "outline"}
        size="sm"
        onClick={() => {
          setFitMode("fit-width");
          setZoomUI(1);
        }}
        aria-label="Ajustar ancho"
        title="Ajustar ancho (Ctrl/⌘ 9)"
      >
        <Maximize2 className="h-4 w-4 mr-1" />
        Ajustar ancho
      </Button>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ padding }}
    >
      <div
        ref={scrollRef}
        className="w-full h-full overflow-auto bg-neutral-50 rounded-md"
      >
        <Toolbar />

        {loading && (
          <div className="p-4 text-sm text-muted-foreground">Cargando PDF…</div>
        )}
        {error && <div className="p-4 text-sm text-red-600">{error}</div>}

        <div className="mx-auto flex flex-col items-center gap-6 py-4">
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) wrapperRefs.current[i] = el;
              }}
              className="shadow-sm bg-white"
            >
              <canvas
                ref={(el) => {
                  if (el) canvasRefs.current[i] = el;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
