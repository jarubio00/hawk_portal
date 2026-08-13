import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IPedido } from "@/app/types/pedido";
import { Pedido } from "@prisma/client";
import PedidoProvider, {
  PedidoContext,
} from "@/app/portal/crear/context/PedidoContext";
import { format, subHours } from "date-fns";
import { generateLabels } from "@/app/actions/utils";
import { userActivityRegister } from "@/app/api/utils/activity";
import {
  getMismoDiaPrecio,
  validarMismoDia,
} from "@/app/api/utils/mismoDiaUtils";
import { validarComprobantePago } from "@/app/utils/comprobante";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const serverDateUTC = new Date();
  const serverDate = subHours(serverDateUTC, 6);

  //console.log('utc: '+serverDateUTC)
  //console.log('-6: '+serverDate);

  const body = await request.json();
  const { p, r } = body;

  let pedido;
  let pedidoId = 0;
  let destinoSaveId = 0;
  let cobroAddId = 0;
  let paqueteSaveId = 0;

  if (p) {
    // Misma validación de comprobante que en /api/pedido/v2: sin comprobante
    // válido no se crea el envío de transferencia.
    const pago = validarComprobantePago({
      formaPagoId: p?.metodoPago?.formaPagoId,
      comprobanteUrl: p?.metodoPago?.comprobanteUrl,
    });

    if (!pago.ok) {
      return NextResponse.json({ error: pago.error }, { status: 400 });
    }

    // Misma revalidación de catálogo que en la creación normal
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
    }

    // Parte del total que corresponde al mismo día (ver /api/pedido/v2)
    const mismoDiaPrecioVenta = p?.programa?.mismoDia
      ? p?.cotizacion?.mismoDiaPrecio ?? (await getMismoDiaPrecio()).precio
      : 0;

    const pedidoCrear = {
      clienteId: currentUser.id,
      recoleccionId: r,
      fechaEntrega: p.programa.fechaEntrega,
      bloqueEntrega: parseInt(p.programa?.bloqueEntrega),
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
      cobroDestino: p.cobro,
      mismoDia: p.programa.mismoDia,
      mismoDiaPrecioVenta,
      operaciones: {
        create: {
          punteoRecoleccion: false,
        },
      },
    };

    //console.log(p.programa.fechaRecoleccion);
    pedido = await prisma.pedido.create({
      data: pedidoCrear,
    });

    pedidoId = pedido.id;

    if (p.cobro) {
      const cobroAdd = await prisma.cobrosDestino.create({
        data: {
          clienteId: currentUser.id,
          pedidoId: pedidoId,
          cantidad: parseFloat(p.cobroCantidad),
        },
      });
      cobroAddId = cobroAdd ? cobroAdd.id : cobroAddId;
    }

    if (p.destino.save) {
      const destinoSave = await prisma.destino.create({
        //@ts-ignore
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
      destinoSaveId = destinoSave ? destinoSave.id : destinoSaveId;
    }

    if (p.paquete.save) {
      const paqueteSave = await prisma.paquete.create({
        //@ts-ignore
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
      paqueteSaveId = paqueteSave ? paqueteSave.id : paqueteSaveId;
    }
  }

  const activity = await userActivityRegister(currentUser.id, 15);

  /*  const labels = await generateLabels({p: p, pedidoId: pedidoId});

  if (labels && labels.image && labels.pdf) {
    const updatePedido = await prisma.pedido.update({
      where: {
        id: pedidoId,
      },
      data: {
        labelImageUrl: labels.image,
        labelPdfUrl: labels.pdf
      }
    });
  } */

  const response = {
    pedidoId: pedidoId,
    cobroAddId: cobroAddId,
    destinoSaveId: destinoSaveId,
    paqueteSaveId: paqueteSaveId,
  };

  //console.log(response);

  //console.log('Agregado! ->', recoleccion);

  return NextResponse.json(response);
}
