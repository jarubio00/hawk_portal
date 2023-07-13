import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { IPedido } from "@/app/types/pedido";
import { Pedido } from "@prisma/client";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";

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
      entregaCpId: parseInt(p.destino?.cpId),
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
      comprobanteUrl: p.metodoPago?.comprobanteUrl,
      cobroDestino: p.cobro,
    }

    //console.log(p.programa.fechaRecoleccion);
     recoleccion = await prisma.recoleccion.create({
      data: {
          clienteId: 1, 
          fecha: p.programa?.fechaRecoleccion,
          bloque: p.programa?.bloqueRecoleccion,
          contactoNombre: p.recoleccion?.contactoNombre,
          contactoTel: p.recoleccion?.contactoTel,
          cpId: parseInt(p.recoleccion?.cpId),
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

    const pedidoId = recoleccion.pedidos[0].id;
    
    let cobroAdd;
    if (p.cobro) {
      cobroAdd = await prisma.cobrosDestino.create({
        data: {
          clienteId: 1,
          pedidoId: pedidoId,
          cantidad: parseFloat(p.cobroCantidad)
        }
      })
    }

    console.log(pedidoId,cobroAdd);

    let destinoSave;
  if (p.destino.save) {
    destinoSave = await prisma.destino.create({
      //@ts-ignore
      data: {
          clienteId: 1, 
          contactoNombre: p.destino?.contactoNombre, 
          contactoTel: p.destino?.contactoTel, 
          cpId: parseInt(p.destino?.cpId), 
          calle: p.destino?.calle, 
          numero: p.destino?.numero, 
          numeroInt: p.destino?.numeroInt, 
          colonia: p.recoleccion?.colonia,
          municipioId: p.destino?.municipioId, 
          empresa: p.destino?.empresa, 
          referencias: p.destino?.referencias, 
          otraColonia: p.destino?.otraColonia
      }
    });
  }

    let paqueteSave;
    if (p.paquete.save) {
      paqueteSave = await prisma.paquete.create({
        //@ts-ignore
        data: {
          clienteId: 1, 
          paqAncho: parseFloat(p.paquete?.paqAncho),
          paqAlto: parseFloat(p.paquete?.paqAlto),
          paqLargo: parseFloat(p.paquete?.paqLargo),
          paqPeso: parseFloat(p.paquete?.paqPeso),
          paqContenido: p.paquete?.paqContenido,
          paqTipoId: p.paquete?.paqTipoId,
          paqPesoVol: parseFloat(p.paquete?.paqPesoVol),
          nombrePaquete: p.paquete?.nombrePaquete
        }
      });
    }
    console.log(recoleccion?.id,','+pedidoId+','+destinoSave?.id+','+paqueteSave?.id)
  }

  

 

  
 //console.log('Agregado! ->', recoleccion);


  return NextResponse.json(recoleccion);
}