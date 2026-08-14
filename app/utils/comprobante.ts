/**
 * Reglas de comprobante de pago por transferencia.
 *
 * Vive fuera de /api a propósito: el cliente y el servidor tienen que aplicar
 * exactamente el mismo criterio. Si divergen, vuelve a aparecer el hueco de
 * envíos generados sin comprobante.
 *
 * Nota importante: el flag `comprobante` que manda el wizard no es confiable.
 * Cuando el upload falla, el cliente lo manda igual en `true` con la URL vacía.
 * Por eso el servidor lo deriva de la URL, que es el único dato verificable.
 */

/** Id de forma de pago = transferencia electrónica (CatalogoMetodosPago). */
export const FORMA_PAGO_TRANSFERENCIA = 2;

/**
 * Dominio donde vive un comprobante realmente subido.
 *
 * Se acepta el dominio completo y cualquier subdominio porque la API devuelve
 * la URL en más de una forma según el caso (`storage.`, `firebasestorage.`,
 * `www.` para las URLs de descarga de la JSON API). Verificado contra las
 * ~240,000 filas históricas de Pedidos: todas caen bajo googleapis.com.
 */
const DOMINIO_VALIDO = "googleapis.com";

/**
 * True solo si la URL apunta a un archivo alojado en el storage de comprobantes.
 * No basta con que la cadena no esté vacía: cuando el preupload falla, lo que
 * llega es "" o una respuesta sin `downloadUrl`.
 */
export function esComprobanteUrlValida(url: unknown): url is string {
  if (typeof url !== "string" || url.trim().length === 0) return false;

  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== "https:") return false;

    const host = parsed.hostname.toLowerCase();
    return host === DOMINIO_VALIDO || host.endsWith(`.${DOMINIO_VALIDO}`);
  } catch {
    return false; // URL malformada
  }
}

export type ComprobanteResult =
  | {
      ok: true;
      formaPagoId: number;
      comprobante: boolean;
      comprobanteUrl: string | null;
    }
  | { ok: false; error: string };

/**
 * Normaliza los campos de pago que se van a escribir en Pedido.
 *
 * Transferencia sin comprobante válido => { ok: false } y el caller responde 400.
 * `comprobante` nunca se toma del cliente: se deriva de la URL ya validada.
 */
export function validarComprobantePago(input: {
  formaPagoId: unknown;
  comprobanteUrl: unknown;
}): ComprobanteResult {
  const formaPagoId = parseInt(String(input.formaPagoId));

  if (!Number.isFinite(formaPagoId) || formaPagoId <= 0) {
    return { ok: false, error: "Forma de pago inválida" };
  }

  if (formaPagoId !== FORMA_PAGO_TRANSFERENCIA) {
    // Efectivo y demás métodos nunca llevan comprobante.
    return { ok: true, formaPagoId, comprobante: false, comprobanteUrl: null };
  }

  const url =
    typeof input.comprobanteUrl === "string" ? input.comprobanteUrl.trim() : "";

  if (!esComprobanteUrlValida(url)) {
    return {
      ok: false,
      error:
        "El pago por transferencia requiere un comprobante cargado. Vuelve a cargarlo e intenta de nuevo.",
    };
  }

  return { ok: true, formaPagoId, comprobante: true, comprobanteUrl: url };
}
