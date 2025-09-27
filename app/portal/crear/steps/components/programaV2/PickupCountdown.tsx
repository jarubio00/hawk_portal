"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import { useProgramaStore } from "../../../store/crear-store";

type PickupCountdownProps = {
  recSelectedDate?: Date | null;
  onTimeout: () => void;
  durationMs?: number;
  persistKey?: string;
  className?: string;
};

export const PickupCountdown: React.FC<PickupCountdownProps> = ({
  recSelectedDate,
  onTimeout,
  durationMs = 5 * 60 * 1000,
  persistKey,
  className,
}) => {
  const [remainingMs, setRemainingMs] = useState<number>(0);

  const timerIdRef = useRef<number | null>(null);
  const endAtRef = useRef<number | null>(null);
  const startKeyRef = useRef<number | null>(null);
  const lockedRef = useRef<boolean>(false); // <- bloquea reinicios tras timeout hasta limpiar la fecha

  const pv2 = useProgramaStore();
  const startKey = recSelectedDate ? new Date(recSelectedDate).getTime() : null;

  const ensureTicking = () => {
    if (timerIdRef.current != null || lockedRef.current) return; // no arrancar si está bloqueado
    timerIdRef.current = window.setInterval(() => {
      if (!endAtRef.current) return;
      const left = endAtRef.current - Date.now();
      if (left <= 0) {
        // Termina: bloquear, mantener 00:00 visible, abrir diálogo y NO reiniciar
        if (timerIdRef.current != null) {
          window.clearInterval(timerIdRef.current);
          timerIdRef.current = null;
        }
        endAtRef.current = null;
        // Mantén el startKey para detectar si el usuario cambia la fecha (desbloquear)
        lockedRef.current = true;

        if (persistKey) {
          sessionStorage.removeItem(`${persistKey}:endAt`);
          sessionStorage.removeItem(`${persistKey}:startKey`);
        }

        setRemainingMs(0);
        pv2.updateTimeoutDialogOpen(true);
        onTimeout();
      } else {
        setRemainingMs(left);
      }
    }, 250) as unknown as number;
  };

  const cleanupTimer = () => {
    if (timerIdRef.current != null) {
      window.clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  // Restaurar si se pidió persistencia
  useEffect(() => {
    if (!persistKey) return;
    const savedEndAt = sessionStorage.getItem(`${persistKey}:endAt`);
    const savedStartKey = sessionStorage.getItem(`${persistKey}:startKey`);
    if (
      savedEndAt &&
      savedStartKey &&
      !endAtRef.current &&
      startKeyRef.current == null
    ) {
      endAtRef.current = Number(savedEndAt);
      startKeyRef.current = Number(savedStartKey);
      const left = Math.max(0, endAtRef.current - Date.now());
      setRemainingMs(left);
      if (left > 0) ensureTicking();
    }
  }, [persistKey]);

  // Arranque / rearmado controlado
  useEffect(() => {
    // Si no hay fecha -> limpiar todo y desbloquear
    if (startKey == null) {
      cleanupTimer();
      endAtRef.current = null;
      startKeyRef.current = null;
      lockedRef.current = false; // <- se desbloquea al limpiar fecha
      if (persistKey) {
        sessionStorage.removeItem(`${persistKey}:endAt`);
        sessionStorage.removeItem(`${persistKey}:startKey`);
      }
      setRemainingMs(0);
      return;
    }

    // Si la fecha cambió respecto a la que estaba bloqueada, desbloquear
    if (startKeyRef.current !== startKey) {
      lockedRef.current = false;
    }

    // Si estamos bloqueados (timeout) y la fecha no cambió, mantener 00:00 sin reiniciar
    if (lockedRef.current && startKeyRef.current === startKey) {
      setRemainingMs(0);
      cleanupTimer();
      return;
    }

    // Si es la misma fecha y aún hay endAt, solo asegura ticking
    if (startKeyRef.current === startKey && endAtRef.current) {
      ensureTicking();
      return;
    }

    // Nuevo inicio o reinicio válido
    startKeyRef.current = startKey;
    endAtRef.current = Date.now() + durationMs;

    if (persistKey) {
      sessionStorage.setItem(`${persistKey}:endAt`, String(endAtRef.current));
      sessionStorage.setItem(`${persistKey}:startKey`, String(startKey));
    }

    setRemainingMs(durationMs);
    cleanupTimer();
    ensureTicking();
  }, [startKey, durationMs, persistKey]);

  // Limpieza al desmontar
  useEffect(() => () => cleanupTimer(), []);

  // Visibilidad: mientras haya fecha seleccionada, mostrar (aunque esté en 00:00 bloqueado)
  const isVisible = startKey != null;

  const label = useMemo(() => {
    if (remainingMs <= 0) return "00:00";
    const totalSec = Math.ceil(remainingMs / 1000);
    const mm = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, "0");
    const ss = (totalSec % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  }, [remainingMs]);

  if (!isVisible) return null;

  // Negro normal; rojo con pulso fuerte en el último minuto o tras timeout bloqueado
  const danger = remainingMs <= 60_000 || lockedRef.current;
  const bgClass = danger ? "bg-red-500 pulse-strong" : "bg-neutral-900";

  return (
    <div
      className={
        className ??
        `flex items-center justify-center gap-1.5 w-24 rounded-sm ${bgClass} text-white px-[6px] py-[4px] font-mono text-sm`
      }
      role="status"
      aria-live="polite"
    >
      <RxLapTimer className="text-white w-5 h-5 shrink-0" />
      <span className="tabular-nums inline-block w-[5ch] text-center leading-none">
        {label}
      </span>
    </div>
  );
};
