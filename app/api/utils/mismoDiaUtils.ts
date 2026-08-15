import prisma from "@/app/libs/prismadb";
import { enviarAvisoWhatsapp } from "@/app/api/utils/whatsapp";

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

export const MENSAJE_SIN_CUPO =
  "El servicio de entrega el mismo día ya no está disponible para esta fecha.";

/** estatusPedidoId de un pedido cancelado; no ocupa cupo. */
export const ESTATUS_PEDIDO_CANCELADO = 5;

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

// --- Cupo diario -----------------------------------------------------------

/**
 * Normaliza una fecha a "YYYY-MM-DD".
 *
 * Acepta lo que traen los dos llamadores: el calendario manda ya un string y el
 * pedido manda "YYYY-MM-DD HH:mm:ss". Se corta en seco en vez de construir un
 * Date porque el runtime corre en UTC y las fechas de operación son locales:
 * pasar por Date desplazaría el día.
 */
export function normalizaFecha(fecha: unknown): string | null {
  if (fecha instanceof Date) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  if (typeof fecha !== "string") return null;

  const match = fecha.trim().match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

/**
 * Límite vigente para una fecha, o null si no hay ninguno.
 *
 * Lo normal es que la tabla esté vacía, así que esta consulta sale sin
 * resultados y nos ahorramos el conteo, que es lo caro. Si dos rangos activos
 * cubren la misma fecha gana el más restrictivo.
 */
export async function getLimiteMismoDia(fecha: string): Promise<number | null> {
  const filas: any[] = await prisma.$queryRaw`
    SELECT MIN(limite) AS limite
    FROM hawk_prisma.LimitesServicio
    WHERE activo = 1
      AND servicio = 'MD'
      AND ${fecha} BETWEEN fechaInicio AND fechaFin
  `;

  const limite = filas?.[0]?.limite;
  return limite == null ? null : Number(limite);
}

/** Envíos de mismo día ya comprometidos para una fecha de recolección. */
export async function contarMismoDia(fecha: string): Promise<number> {
  const filas: any[] = await prisma.$queryRaw`
    SELECT COUNT(*) AS total
    FROM hawk_prisma.Pedidos p
    INNER JOIN hawk_prisma.Recolecciones r ON p.recoleccionId = r.id
    WHERE p.mismoDia = 1
      AND p.estatusPedidoId <> ${ESTATUS_PEDIDO_CANCELADO}
      AND DATE(r.fecha) = ${fecha}
  `;

  return Number(filas?.[0]?.total ?? 0);
}

/** ¿Ya hay un bloqueo registrado para esa fecha? */
export async function estaBloqueadoMismoDia(fecha: string): Promise<boolean> {
  const filas: any[] = await prisma.$queryRaw`
    SELECT 1
    FROM hawk_prisma.BloqueoServicios
    WHERE fecha = ${fecha} AND servicio IN ('MD', 'TODO')
    LIMIT 1
  `;

  return filas.length > 0;
}

export interface CupoMismoDia extends MismoDiaResult {
  /** null cuando no hay límite configurado para esa fecha */
  limite: number | null;
  usados: number;
}

/**
 * Disponibilidad de mismo día para una fecha, por bloqueo o por cupo.
 *
 * La usan el calendario y la creación del pedido, para que las dos apliquen el
 * mismo criterio. Antes el bloqueo solo lo consultaba el calendario, así que el
 * cierre de las 8:00 no impedía crear el envío.
 *
 * Ante un error de base se deja habilitado: el cupo es una restricción
 * comercial, no de integridad, y prefiero vender de más a caerme.
 */
export async function validarCupoMismoDia(
  fechaRecoleccion: unknown
): Promise<CupoMismoDia> {
  const disponible: CupoMismoDia = {
    enabled: true,
    customMessage: "",
    limite: null,
    usados: 0,
  };

  const fecha = normalizaFecha(fechaRecoleccion);
  if (!fecha) return disponible;

  try {
    if (await estaBloqueadoMismoDia(fecha)) {
      return { ...disponible, enabled: false, customMessage: MENSAJE_SIN_CUPO };
    }

    const limite = await getLimiteMismoDia(fecha);
    if (limite == null) return disponible;

    const usados = await contarMismoDia(fecha);

    return {
      enabled: usados < limite,
      customMessage: usados < limite ? "" : MENSAJE_SIN_CUPO,
      limite,
      usados,
    };
  } catch (error: any) {
    console.error("validarCupoMismoDia:", error?.message);
    return disponible;
  }
}

/**
 * Cierra mismo día para una fecha cuando el pedido recién creado alcanzó el
 * límite, y avisa por WhatsApp.
 *
 * El bloqueo se materializa en BloqueoServicios en lugar de recalcularse en
 * cada carga del calendario: esa tabla ya la consulta el calendario, así que la
 * fecha desaparece sola y la fila sirve además de bandera para que el aviso
 * salga una sola vez.
 *
 * Se llama después de crear el pedido y nunca lanza: el envío ya existe y es
 * válido. Si esto falla, se pierde el aviso, no la venta.
 */
export async function cerrarMismoDiaSiSeLlenó(
  fechaRecoleccion: unknown
): Promise<void> {
  try {
    const fecha = normalizaFecha(fechaRecoleccion);
    if (!fecha) return;

    const limite = await getLimiteMismoDia(fecha);
    if (limite == null) return;

    const usados = await contarMismoDia(fecha);
    if (usados < limite) return;

    // Sin índice único en BloqueoServicios (hay duplicados históricos
    // legítimos), así que la carrera entre dos pedidos simultáneos podría
    // duplicar el aviso. El costo es un mensaje repetido, no un dato malo.
    if (await estaBloqueadoMismoDia(fecha)) return;

    await prisma.$executeRaw`
      INSERT INTO hawk_prisma.BloqueoServicios (fecha, servicio, tipo, createdBy)
      VALUES (${fecha}, 'MD', 'limite', 1)
    `;

    // Sin await: el bloqueo ya quedó escrito y el calendario ya es consistente.
    // Colgar la respuesta del cliente de una llamada HTTP externa sería pagar
    // hasta 8 segundos de espera por un mensaje interno.
    void enviarAvisoWhatsapp(
      `*Mensaje de Hawk IA Agent*\n \n El número de entregas mismo dia para el *${fecha}* es de *${usados}*. Se llegó al limite establecido (${limite}).`
    );
  } catch (error: any) {
    console.error("cerrarMismoDiaSiSeLlenó:", error?.message);
  }
}
