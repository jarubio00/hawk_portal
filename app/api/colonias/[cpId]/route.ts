import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  cpId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
 /*  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  } */

  const { cpId } = params;

  if (!cpId || typeof cpId !== 'string') {
    throw new Error('Invalid ID');
  }

  let data = {}
  console.log('colonias api req: ', cpId);
  
  const codigopostal = await prisma.catalogoCodigosPostales.findUnique({
    where: {
        id: parseInt(cpId),
    },
    include: {
        colonias: true,
         //@ts-ignore
        municipio: true,
    }
  }); 

  if (!codigopostal) {
    data = {status: 2, statusMessage: 'No se encontró el código postal'}
    return NextResponse.json(data);
  }

//@ts-ignore
  const formattedColonias = codigopostal?.colonias.map((col) => ({
        value: col.id,
        label: col.colonia,
        cpId: col.cpId,
        municipioId: col.municipio_id,
        tipo: col.tipo
  })); 

  
  formattedColonias?.push({
    value: 9999,
    label: 'OTRA COLONIA',
    //@ts-ignore
    cpId: codigopostal?.colonias[0].cpId,
    //@ts-ignore
    municipioId: codigopostal?.colonias[0].municipio_id,
    tipo: 'Colonia'
  })

   data = {status: 1, statusMessage: 'OK', codigo: codigopostal, colonias: formattedColonias}

 

  return NextResponse.json(data);
}

