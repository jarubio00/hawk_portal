/**
 * Valor por default mientras llega la respuesta del servidor. El precio real y
 * la etiqueta de promocion vienen del catalogo (CatalogoProductos: servicio_md
 * y promo_md), que es la misma fuente que usa el cotizador.
 */
export const MD_PRECIO_FALLBACK = 42;

/** "$42.00 MXN" */
export function formatPrecioMd(precio: number): string {
  return `$${precio.toFixed(2)} MXN`;
}

/**
 * Se pinta como oferta solo si el servidor mando etiqueta y el precio es
 * realmente menor al de lista.
 */
export function isPromoMismoDiaVisible(
  precio: number,
  precioRegular: number,
  etiqueta: string
): boolean {
  return Boolean(etiqueta?.trim()) && precio < precioRegular;
}
