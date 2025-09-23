import getCurrentUser from "@/app/actions/getCurrentUser";
import { subHours } from "date-fns";

export async function cl(type: string, log: any) {
  const currentUser = await getCurrentUser();
  const fecha = new Date();
  const hoy = subHours(fecha, 6);
  console.log(
    `${fecha.toISOString()} | ${hoy.toISOString()} |${
      currentUser?.id ?? "noid"
    } | ${currentUser?.email ?? "noemail"} | ${type} |-> ${log}`
  );
}

// "2025-09-20 11:00:00"  ->  Date construido con Date.UTC (naive -> UTC)
export function naiveStrToUTCDate(str: string): Date {
  const clean = str.trim().replace(/[^\d\s:-]/g, ""); // por si trae ")" u otro ruido
  const [datePart, timePart = "00:00:00"] = clean.split(" ");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm, ss] = timePart.split(":").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, ss ?? 0));
}

// Date (guardado en DB) -> "YYYY-MM-DD HH:mm:ss" usando getters UTC para evitar tz
export function utcDateToNaiveStr(dt: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = dt.getUTCFullYear();
  const m = dt.getUTCMonth() + 1;
  const d = dt.getUTCDate();
  const hh = dt.getUTCHours();
  const mm = dt.getUTCMinutes();
  const ss = dt.getUTCSeconds();
  return `${y}-${pad(m)}-${pad(d)} ${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}
