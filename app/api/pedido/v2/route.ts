// app/api/tu-endpoint/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userActivityRegister } from "@/app/api/utils/activity";
import {
  getMismoDiaPrecio,
  validarMismoDia,
  validarCupoMismoDia,
  cerrarMismoDiaSiSeLlenó,
} from "@/app/api/utils/mismoDiaUtils";
import { validarComprobantePago } from "@/app/utils/comprobante";

/**
 * Convierte "YYYY-MM-DD HH:mm:ss" (sin tz) a Date usando Date.UTC,
 * para que Prisma/MySQL (DATETIME) graben exactamente esos números,
 * sin aplicar ningún offset horario del runtime.
 */
function naiveStrToUTCDate(str: string): Date {
  if (!str || typeof str !== "string") {
    throw new Error("Fecha inválida (string vacío o no-string)");
  }
  const clean = str.trim().replace(/[^\d\s:-]/g, ""); // por si trae ")"
  const [datePart, timePart = "00:00:00"] = clean.split(" ");
  const [y, m, d] = (datePart ?? "").split("-").map(Number);
  const [hh, mm, ss] = (timePart ?? "").split(":").map(Number);

  if (!y || !m || !d) throw new Error(`Fecha inválida: "${str}"`);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, ss ?? 0));
}

/**
 * A partir de "YYYY-MM-DD HH:mm:ss" arma el rango del día:
 * startUtc = 00:00:00  y  endUtc = 23:59:59 (inclusive)
 */
function dayRangeFromNaive(str: string): { startUtc: Date; endUtc: Date } {
  const clean = str.trim().replace(/[^\d\s:-]/g, "");
  const [datePart] = clean.split(" ");
  const [y, m, d] = (datePart ?? "").split("-").map(Number);
  const startUtc = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0));
  const endUtc = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 23, 59, 59));
  return { startUtc, endUtc };
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const p = await request.json();

    // --- Validaciones mínimas (ajusta a tus necesidades) ---
    if (!p?.programa?.fechaRecString || !p?.programa?.fechaEntString) {
      return NextResponse.json(
        { error: "Faltan fechas de entrega/recolección" },
        { status: 400 }
      );
    }

    // Igual que con mismoDia: lo que manda el cliente sobre el comprobante no es
    // confiable. Si el upload falla, el wizard manda comprobante:true con la URL
    // vacía. Se revalida aquí y sin comprobante válido no se crea el envío.
    const pago = validarComprobantePago({
      formaPagoId: p?.metodoPago?.formaPagoId,
      comprobanteUrl: p?.metodoPago?.comprobanteUrl,
    });

    if (!pago.ok) {
      return NextResponse.json({ error: pago.error }, { status: 400 });
    }

    // El flag de mismo día viene del cliente y pudo quedar desactualizado
    // (p.ej. si se cambió el destino después de programar): se revalida aquí.
    if (p?.programa?.mismoDia) {
      const mismoDia = await validarMismoDia({
        recoleccion: {
          cpId: p.recoleccion?.cpId,
          colonia: p.recoleccion?.colonia,
          otraColonia: p.recoleccion?.otraColonia,
        },
        entrega: {
          cpId: p.destino?.cpId,
          colonia: p.destino?.colonia,
          otraColonia: p.destino?.otraColonia,
        },
      });

      if (!mismoDia.enabled) {
        return NextResponse.json(
          { error: mismoDia.customMessage },
          { status: 400 }
        );
      }

      // Cupo del día: bloqueo vigente o límite alcanzado. Hasta ahora el
      // bloqueo solo lo miraba el calendario, así que el cierre de las 8:00 no
      // impedía crear el envío desde una pestaña ya abierta.
      const cupo = await validarCupoMismoDia(p?.programa?.fechaRecString);

      if (!cupo.enabled) {
        return NextResponse.json(
          { error: cupo.customMessage },
          { status: 400 }
        );
      }
    }

    // Parte del total que corresponde al mismo día. Se toma de la cotización
    // que generó ese total (no se relee el catálogo) para que las partes
    // cuadren con lo cobrado aunque la promoción cambie a media captura.
    // 0 cuando el envío no es de mismo día.
    const mismoDiaPrecioVenta = p?.programa?.mismoDia
      ? p?.cotizacion?.mismoDiaPrecio ?? (await getMismoDiaPrecio()).precio
      : 0;

    // Convertimos los strings a Date (UTC) con helper
    const fechaEntregaUtc = naiveStrToUTCDate(p.programa.fechaEntString); // "YYYY-MM-DD HH:mm:ss"
    const fechaRecoUtc = naiveStrToUTCDate(p.programa.fechaRecString);

    // Prepara el payload de Pedido para reusarlo (bajo recolección existente o nueva)
    const pedidoCrearData = {
      clienteId: currentUser.id,
      fechaEntrega: fechaEntregaUtc,
      bloqueEntrega: 1, // ajusta si lo tomas del wizard

      entregaContactoNombre: p.destino?.contactoNombre,
      entregaContactoTel: p.destino?.contactoTel,
      entregaCpId: parseInt(p.destino?.cpId),
      entregaCalle: p.destino?.calle,
      entregaNumero: p.destino?.numero,
      entregaNumeroInt: p.destino?.numeroInt,
      entregaColonia: p.destino?.colonia,
      entregaOtraColonia: p.destino?.otraColonia,
      entregaMunicipioId: p.destino?.municipioId,
      entregaEmpresa: p.destino?.empresa,
      entregaReferencias: p.destino?.referencias,

      paqTipoId: parseInt(p.paquete?.paqTipoId),
      paqAncho: parseFloat(p.paquete?.paqAncho),
      paqLargo: parseFloat(p.paquete?.paqLargo),
      paqAlto: parseFloat(p.paquete?.paqAlto),
      paqPeso: parseFloat(p.paquete?.paqPeso),
      paqContenido: p.paquete?.paqContenido,
      paqPesoVol: parseFloat(p.paquete?.paqPesoVol),

      precioVenta: parseFloat(p.cotizacion?.precio),

      // Valores ya validados arriba; no se leen del payload del cliente.
      formaPagoId: pago.formaPagoId,
      comprobante: pago.comprobante,
      comprobanteUrl: pago.comprobanteUrl,

      cobroDestino: p.cobro || false,
      cobroDestinoCantidad: p.cobroCantidad ? parseFloat(p.cobroCantidad) : 0,

      mismoDia: p.programa?.mismoDia,
      mismoDiaPrecioVenta,

      operaciones: {
        create: { punteoRecoleccion: false },
      },
    };

    // --- Transacción: TODO o NADA ---
    const result = await prisma.$transaction(async (tx) => {
      const direccionId: number | null = p.recoleccion?.direccionId ?? null;

      // Rango del día de recolección: 00:00:00 a 23:59:59
      const { startUtc, endUtc } = dayRangeFromNaive(p.programa.fechaRecString);

      // Intentar REUSAR recolección del mismo cliente/dirección y MISMO DÍA (ignora la hora)
      let recoleccionId: number | null = null;

      if (direccionId) {
        const existente = await tx.recoleccion.findFirst({
          where: {
            clienteId: currentUser.id,
            direccionId: direccionId,
            fecha: {
              gte: startUtc,
              lte: endUtc, // rango inclusivo hasta 23:59:59
            },
          },
          select: { id: true },
        });

        if (existente) recoleccionId = existente.id;
      }

      let pedidoId = 0;
      let recoleccionCreadaId = 0;

      if (recoleccionId) {
        // Reusar recolección existente → crear Pedido con FK a esa recolección
        const pedido = await tx.pedido.create({
          data: {
            ...pedidoCrearData,
            recoleccionId,
          },
          select: { id: true },
        });
        pedidoId = pedido.id;
      } else {
        // No existe recolección ese día → crear Recolección con Pedido anidado
        const recoleccion = await tx.recoleccion.create({
          data: {
            clienteId: currentUser.id,
            fecha: fechaRecoUtc, // Date (UTC) representando tu "naive"
            bloque: 1, // ajusta si lo tomas del wizard

            contactoNombre: p.recoleccion?.contactoNombre,
            contactoTel: p.recoleccion?.contactoTel,
            cpId: parseInt(p.recoleccion?.cpId),
            calle: p.recoleccion?.calle,
            numero: p.recoleccion?.numero,
            numeroInt: p.recoleccion?.numeroInt || "",
            colonia: p.recoleccion?.colonia,
            otraColonia: p.recoleccion?.otraColonia,
            municipioId: parseInt(p.recoleccion?.municipioId),
            empresa: p.recoleccion?.empresa || "",
            referencias: p.recoleccion?.referencias || "",
            direccionId: p.recoleccion?.direccionId,
            direccionIcon: p.recoleccion?.direccionIcon,
            direccionColor: p.recoleccion?.direccionColor,

            pedidos: {
              create: pedidoCrearData,
            },
          },
          include: {
            pedidos: {
              select: { id: true },
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        });

        recoleccionCreadaId = recoleccion.id;
        pedidoId = recoleccion.pedidos[0].id;
        recoleccionId = recoleccionCreadaId;
      }

      // Opcionales en la MISMA transacción
      let cobroAddId = 0;
      let destinoSaveId = 0;
      let paqueteSaveId = 0;

      if (p.cobro) {
        const cobroAdd = await tx.cobrosDestino.create({
          data: {
            clienteId: currentUser.id,
            pedidoId,
            cantidad: parseFloat(p.cobroCantidad),
          },
        });
        cobroAddId = cobroAdd.id;
        //COD2 Cobro
        const charge = await tx.cod2Charge.create({
          data: {
            pedidoId: Number(pedidoId),
            clienteId: Number(currentUser.id),
            amountRequested: Number(p.cobroCantidad) * 100,
          },
        });

        // Abrir ancla de ventana si no existe
        const settings = await tx.cod2ClientSettings.findUnique({
          where: { clienteId: Number(currentUser.id) },
        });
        if (!settings) {
          await tx.cod2ClientSettings.create({
            data: {
              clienteId: Number(currentUser.id),
              defaultPayoutMethod: "RECOGER_EN_OFICINA",
              activeAnchorAt: new Date(),
            },
          });
        } else if (!settings.activeAnchorAt) {
          await tx.cod2ClientSettings.update({
            where: { clienteId: Number(currentUser.id) },
            data: { activeAnchorAt: new Date() },
          });
        }
      }

      if (p.destino?.save) {
        const destinoSave = await tx.destino.create({
          data: {
            clienteId: currentUser.id,
            contactoNombre: p.destino?.contactoNombre,
            contactoTel: p.destino?.contactoTel,
            cpId: parseInt(p.destino?.cpId),
            calle: p.destino?.calle,
            numero: p.destino?.numero,
            numeroInt: p.destino?.numeroInt,
            colonia: p.destino?.colonia,
            municipioId: p.destino?.municipioId,
            empresa: p.destino?.empresa,
            referencias: p.destino?.referencias,
            otraColonia: p.destino?.otraColonia,
          },
        });
        destinoSaveId = destinoSave.id;
      }

      if (p.paquete?.save) {
        const paqueteSave = await tx.paquete.create({
          data: {
            clienteId: currentUser.id,
            paqAncho: parseFloat(p.paquete?.paqAncho),
            paqAlto: parseFloat(p.paquete?.paqAlto),
            paqLargo: parseFloat(p.paquete?.paqLargo),
            paqPeso: parseFloat(p.paquete?.paqPeso),
            paqContenido: p.paquete?.paqContenido,
            paqTipoId: p.paquete?.paqTipoId,
            paqPesoVol: parseFloat(p.paquete?.paqPesoVol),
            nombrePaquete: p.paquete?.nombrePaquete,
          },
        });
        paqueteSaveId = paqueteSave.id;
      }

      await userActivityRegister(currentUser.id, 15);

      console.log(
        `${pedidoId} | ${currentUser.email} -- ${
          p?.programa?.fechaRecString
        }/${fechaRecoUtc.toISOString()} ->  ${
          p?.programa?.fechaEntString
        }/${fechaEntregaUtc.toISOString()}`
      );

      return {
        recoleccionId, // reusada o creada
        pedidoId,
        cobroAddId,
        destinoSaveId,
        paqueteSaveId,
      };
    });

    // Después de la transacción, para que el conteo incluya el envío recién
    // creado. Va con su propio try/catch adentro: el pedido ya existe y nada de
    // esto puede convertirlo en un error para el cliente.
    if (p?.programa?.mismoDia) {
      await cerrarMismoDiaSiSeLlenó(p?.programa?.fechaRecString);
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Error creando envío:", err);
    return NextResponse.json(
      {
        error: "No se pudo crear el envío",
        detail: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}
