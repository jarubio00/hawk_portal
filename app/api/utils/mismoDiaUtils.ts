import prisma from "@/app/libs/prismadb";

/**
 * Cps "comodin" que se guardan cuando un envio se captura SIN codigo postal.
 * 97777 -> default de BD en Destino/Pedido
 * 99989 -> el que asigna la captura manual (AgregarDestinoSinCp)
 */
export const CPS_SIN_CP = [0, 97777, 99989];

export const MENSAJE_SIN_CP =
  "El servicio de entrega el mismo día no está disponible en envíos sin código postal.";

export const MENSAJE_NO_SOPORTADO =
  "El servicio de entrega el mismo día no está disponible en esta zona.";

/** Productos del catalogo que representan el cargo de entrega el mismo dia */
export const MD_PRODUCTO_NOMBRE = "servicio_md";
export const MD_PROMO_NOMBRE = "promo_md";

/** Solo se usa si el catalogo no responde; el precio real vive en la BD */
export const MD_PRECIO_FALLBACK = 42;

export interface MismoDiaPrecio {
  /** Precio que se cobra: el de la promocion si aplica, si no el normal */
  precio: number;
  /** Precio de lista (servicio_md), para pintarlo tachado en la oferta */
  precioRegular: number;
  /** Descripcion de promo_md cuando la promocion aplica; "" si no */
  promoEtiqueta: string;
}

/**
 * Resuelve el cargo de mismo dia contra el catalogo. La promocion es un
 * registro (promo_md) y aplica solo si existe, no esta borrado y su precio es
 * MENOR al de servicio_md. La descripcion de ese registro es el letrero que se
 * muestra, asi que prender, apagar o retextear la promocion es cosa de la BD.
 */
export async function getMismoDiaProductos() {
  const productos = await prisma.catalogoProductos.findMany({
    where: {
      nombre: { in: [MD_PRODUCTO_NOMBRE, MD_PROMO_NOMBRE] },
      isDeleted: false,
    },
  });

  const servicio = productos.find((p) => p.nombre === MD_PRODUCTO_NOMBRE);
  const promo = productos.find((p) => p.nombre === MD_PROMO_NOMBRE);
  const aplicaPromo = Boolean(
    servicio && promo && promo.precio < servicio.precio
  );

  return {
    servicio,
    promo,
    aplicaPromo,
    /** Renglon que debe cotizarse y cobrarse */
    productoCobrar: aplicaPromo ? promo : servicio,
  };
}

/**
 * Renglon que se agrega a la cotizacion. Cuando la promocion aplica se cobra
 * el precio promocional pero se conserva la descripcion del servicio, y la
 * descripcion de promo_md viaja aparte para pintarse como badge junto al
 * precio de lista tachado.
 */
export async function getMismoDiaCotizaItem() {
  const { servicio, promo, aplicaPromo, productoCobrar } =
    await getMismoDiaProductos();

  if (!productoCobrar) return null;

  if (!aplicaPromo) {
    return { ...productoCobrar, descripcion: servicio?.descripcion?.trim() };
  }

  return {
    ...productoCobrar,
    descripcion: servicio?.descripcion?.trim(),
    promoEtiqueta: promo?.descripcion?.trim() ?? "",
    precioRegular: servicio?.precio,
  };
}

/** Version resumida para la UI y para el registro del pedido */
export async function getMismoDiaPrecio(): Promise<MismoDiaPrecio> {
  try {
    const { servicio, aplicaPromo, promo, productoCobrar } =
      await getMismoDiaProductos();

    return {
      precio: productoCobrar?.precio ?? MD_PRECIO_FALLBACK,
      precioRegular: servicio?.precio ?? MD_PRECIO_FALLBACK,
      promoEtiqueta: aplicaPromo ? promo?.descripcion?.trim() ?? "" : "",
    };
  } catch (error: any) {
    console.error("getMismoDiaPrecio:", error?.message);
    return {
      precio: MD_PRECIO_FALLBACK,
      precioRegular: MD_PRECIO_FALLBACK,
      promoEtiqueta: "",
    };
  }
}

export interface MismoDiaDireccion {
  cpId?: any;
  /** Preparado para la validacion por colonia; hoy no se evalua */
  colonia?: string | null;
  /** Preparado para la validacion por colonia; hoy no se evalua */
  otraColonia?: boolean | null;
}

export interface MismoDiaData {
  recoleccion?: MismoDiaDireccion;
  entrega?: MismoDiaDireccion;
}

export interface MismoDiaResult {
  enabled: boolean;
  customMessage: string;
}

/** Normaliza el cp que llega del cliente (puede venir string, null o undefined) */
export function parseCpId(cpId: any): number | undefined {
  const n = Number(cpId);
  if (!Number.isInteger(n) || n <= 0) return undefined;
  return n;
}

/** Un cp sirve para mismo dia solo si existe y no es un comodin de "sin cp" */
export function isCpValidoParaMismoDia(cpId: any): boolean {
  const n = parseCpId(cpId);
  if (!n) return false;
  return !CPS_SIN_CP.includes(n);
}

/**
 * Valida el servicio de entrega el mismo dia contra el catalogo de codigos
 * postales, tanto para la direccion de recoleccion como para la de entrega.
 * Basta con que una de las dos no lo soporte para deshabilitarlo.
 *
 * Reglas activas:
 * - Sin codigo postal (o cp comodin) -> no disponible.
 * - Cp con mdSupported = false -> no disponible.
 *
 * La colonia NO se evalua todavia: si el cp soporta mismo dia, lo permite
 * aunque la colonia se haya capturado a mano ("otra colonia"). El catalogo de
 * colonias ya tiene su columna mdSupported y este helper ya recibe colonia y
 * otraColonia, asi que activarla despues es agregar la consulta aqui.
 */
export async function validarMismoDia(
  data: MismoDiaData
): Promise<MismoDiaResult> {
  const direcciones = [data.recoleccion, data.entrega];

  if (!direcciones.every((d) => isCpValidoParaMismoDia(d?.cpId))) {
    return { enabled: false, customMessage: MENSAJE_SIN_CP };
  }

  const cps = direcciones.map((d) => parseCpId(d?.cpId) as number);

  try {
    const cpsSinMd = await prisma.catalogoCodigosPostales.count({
      where: { id: { in: cps }, mdSupported: false },
    });

    if (cpsSinMd > 0) {
      return { enabled: false, customMessage: MENSAJE_NO_SOPORTADO };
    }
  } catch (error: any) {
    // Si la BD falla (o la migracion sigue pendiente) se deshabilita el mismo
    // dia en lugar de venderlo sin validar.
    console.error("validarMismoDia:", error?.message);
    return { enabled: false, customMessage: MENSAJE_NO_SOPORTADO };
  }

  return { enabled: true, customMessage: "" };
}
