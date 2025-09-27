export function parseYMDLocal(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d); // mes - 1 porque Date usa meses base 0
}

export function formatLongEs(date: Date, locale = "es-MX") {
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

export function formatShortEs(date: Date, locale = "es-MX") {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date); // 27/08/2025
}

export function padGlobal2(n: string) {
  return String(n).padStart(2, "0");
}
