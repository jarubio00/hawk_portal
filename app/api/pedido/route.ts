import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IPedido } from "@/app/types/pedido";
import { Pedido } from "@prisma/client";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const p = await request.json();
  let recoleccion;
  if (p) {
    const pedidoCrear = {
      clienteId: 1,
      fechaEntrega: p.programa.fechaEntrega,
      bloqueEntrega: p.programa?.bloqueEntrega,
      entregaContactoNombre: p.destino?.contactoNombre,
      entregaContactoTel: p.destino?.contactoTel,
      entregaCpId: p.destino?.cpId,
      entregaCalle: p.destino?.calle,
      entregaNumero: p.destino?.numero,
      entregaNumeroInt: p.destino?.numeroInt,
      entregaColonia: p.destino?.colonia,
      entregaOtraColonia: p.destino?.otraColonia,
      entregaMunicipioId: p.destino?.municipioId,
      entregaEmpresa: p.destino?.empresa,
      entregaReferencias: p.destino?.referencias,
      paqTipoId: p.paquete?.paqTipoId,
      paqAncho: p.paquete?.paqAncho,
      paqLargo: p.paquete?.paqLargo,
      paqAlto: p.paquete?.paqAlto,
      paqPeso: p.paquete?.paqPeso,
      paqContenido: p.paquete?.paqContenido,
      paqPesoVol: p.paquete?.paqPesoVol,
      precioVenta: p.cotizacion?.precio,
      formaPagoId: p.metodoPago?.formaPagoId,
      comprobante: p.metodoPago?.comprobante,
      cobroDestino: p.cobro,
    }

    console.log(p.programa.fechaRecoleccion);
     recoleccion = await prisma.recoleccion.create({
      data: {
          clienteId: 1, 
          fecha: p.programa?.fechaRecoleccion,
          bloque: p.programa?.bloqueRecoleccion,
          contactoNombre: p.recoleccion?.contactoNombre,
          contactoTel: p.recoleccion?.contactoTel,
          cpId: p.recoleccion?.cpId,
          calle: p.recoleccion?.calle,
          numero: p.recoleccion?.numero,
          numeroInt: p.recoleccion?.numeroInt || '',
          colonia: p.recoleccion?.colonia,
          otraColonia: p.recoleccion?.otraColonia,
          municipioId: p.recoleccion?.municipioId,
          empresa: p.recoleccion?.empresa || '',
          referencias: p.recoleccion?.referencias || '',
          pedidos: {
            //@ts-ignore
            create: pedidoCrear,
          }
      }, 
      include: {
        pedidos: {
          select: {
            id: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1,
        }
      }
    });
  }
  

 
 console.log('Agregado! ->', recoleccion);


  return NextResponse.json(recoleccion);
}