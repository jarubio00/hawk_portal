import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IPedido } from "@/app/types/pedido";
import { Pedido } from "@prisma/client";
import PedidoProvider, {
  PedidoContext,
} from "@/app/portal/crear/context/PedidoContext";
import { format, subHours } from "date-fns";
import { createPdfZpl, createZpl } from "@/app/components/utils/zplUtils";
import { ApiResponse } from "@/app/types";
import { generateLabels } from "@/app/actions/utils";
//import { userActivityRegister } from "@/app/api/utils/activity";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const serverDateUTC = new Date();
  const serverDate = subHours(serverDateUTC, 6);

  //console.log('utc: '+serverDateUTC)
  //console.log('-6: '+serverDate);

  const p = await request.json();
  let recoleccion;
  let pedidoId = 0;
  let destinoSaveId = 0;
  let cobroAddId = 0;
  let paqueteSaveId = 0;
  let labelResult = "";
  let labelPdfResult = "";

  if (p) {
    const pedidoCrear = {
      clienteId: currentUser.id,
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
      formaPagoId: parseInt(p.metodoPago?.formaPagoId),
      comprobante: p.metodoPago?.comprobante,
      comprobanteUrl: p.metodoPago?.comprobanteUrl,
      cobroDestino: p.cobro || false,
      cobroDestinoCantidad: p.cobroCantidad ? parseFloat(p.cobroCantidad) : 0,
      operaciones: {
        create: {
          punteoRecoleccion: false,
        },
      },
    };

    //console.log(p.programa.fechaRecoleccion);
    recoleccion = await prisma.recoleccion.create({
      data: {
        clienteId: currentUser.id,
        fecha: p.programa?.fechaRecoleccion,
        bloque: parseInt(p.programa?.bloqueRecoleccion),
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
        direccionId: p.recoleccion.direccionId,
        direccionIcon: p.recoleccion.direccionIcon,
        direccionColor: p.recoleccion?.direccionColor,
        pedidos: {
          //@ts-ignore
          create: pedidoCrear,
        },
      },
      include: {
        pedidos: {
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    pedidoId = recoleccion.pedidos[0].id;

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

  //const activity = await userActivityRegister(currentUser.id, 15);

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
  //labelUrl:labels.image,
  //labelPdfUrl: labels.pdf

  const response = {
    recoleccionId: recoleccion?.id,
    pedidoId: pedidoId,
    cobroAddId: cobroAddId,
    destinoSaveId: destinoSaveId,
    paqueteSaveId: paqueteSaveId,
  };

  //console.log(response);

  return NextResponse.json(response);
}
