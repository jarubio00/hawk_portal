// app/api/tu-endpoint/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userActivityRegister } from "@/app/api/utils/activity";

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

    // Convertimos los strings a Date (UTC) con helper
    const fechaEntregaUtc = naiveStrToUTCDate(p.programa.fechaEntString); // "YYYY-MM-DD HH:mm:ss"
    const fechaRecoUtc = naiveStrToUTCDate(p.programa.fechaRecString);

    console.log("------------");
    console.log(p?.programa?.fechaRecString);
    console.log(p?.programa?.fechaEntString);
    console.log("------------");
    console.log(currentUser.email);
    console.log(fechaEntregaUtc);
    console.log(fechaRecoUtc);

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

      formaPagoId: parseInt(p.metodoPago?.formaPagoId),
      comprobante: p.metodoPago?.comprobante,
      comprobanteUrl: p.metodoPago?.comprobanteUrl,

      cobroDestino: p.cobro || false,
      cobroDestinoCantidad: p.cobroCantidad ? parseFloat(p.cobroCantidad) : 0,

      mismoDia: p.programa?.mismoDia,
      mismoDiaPrecioVenta: 42, // ajusta si lo tienes dinámico

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
      console.log(pedidoId);
      console.log("||||||||||||||||||||||||||");

      return {
        recoleccionId, // reusada o creada
        pedidoId,
        cobroAddId,
        destinoSaveId,
        paqueteSaveId,
      };
    });

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
