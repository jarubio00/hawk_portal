"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // ajusta el import según tu setup shadcn
import { Button } from "@/components/ui/button";

type BackLeaveGuardProps = {
  /** Activa el guard; ponlo en true mientras el wizard tenga datos sin guardar */
  enabled: boolean;
  /** Texto opcional para el diálogo */
  title?: string;
  description?: string;
};

export function BackLeaveGuard({
  enabled,
  title = "¿Salir sin guardar?",
  description = "Si sales ahora, perderás la información capturada en este envío.",
}: BackLeaveGuardProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const confirmingRef = React.useRef(false);
  const armedRef = React.useRef(false); // indica si ya “armamos” el pushState
  const enabledRef = React.useRef(enabled);

  React.useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Arma/desarma el guard cuando enabled cambia
  React.useEffect(() => {
    if (!enabled) {
      // Limpia si estaba armado
      disarm();
      return;
    }
    arm();

    // beforeunload para refresh/cerrar pestaña
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!enabledRef.current) return;
      e.preventDefault();
      e.returnValue = ""; // requerido por algunos navegadores
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      disarm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Arma: empuja un history state y escucha popstate
  function arm() {
    if (armedRef.current) return;
    try {
      window.history.pushState({ _guard: true }, "");
      armedRef.current = true;
      window.addEventListener("popstate", onPopState, { passive: true });
    } catch {
      // sin-op
    }
  }

  // Desarma: quita listener
  function disarm() {
    if (!armedRef.current) return;
    window.removeEventListener("popstate", onPopState as any);
    armedRef.current = false;
  }

  // Cuando el usuario toca Back
  const onPopState = () => {
    if (!enabledRef.current) {
      // Si ya no está habilitado (p.ej. ya guardaste), deja ir atrás
      return;
    }
    if (confirmingRef.current) {
      // Ya estamos dejando salir
      return;
    }
    // Cancelamos la navegación efectiva “reinyectando” el estado actual,
    // y mostramos el diálogo controlado.
    try {
      window.history.pushState({ _guard: true }, "");
    } catch {}
    setOpen(true);
  };

  // Confirmar salida: deshabilita el guard y navega back real
  const confirmLeave = () => {
    confirmingRef.current = true;
    setOpen(false);
    // Desarma para no reinterceptar
    disarm();
    // Deja ir atrás (a la página anterior real)
    router.back();
  };

  // Cancelar: se queda; el estado ya fue reinyectado
  const cancelLeave = () => {
    confirmingRef.current = false;
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : cancelLeave())}
    >
      <DialogContent className=" ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="secondary" onClick={cancelLeave} className="px-2">
            Quedarme
          </Button>
          <Button
            variant="destructive"
            onClick={confirmLeave}
            className="px-2"
            autoFocus
          >
            Salir y perder datos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
