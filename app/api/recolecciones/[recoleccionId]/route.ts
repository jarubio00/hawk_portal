import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { format, subHours, addHours, addDays } from "date-fns";

interface IParams {
  recoleccionId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  //console.log('api params: ', params);

  return NextResponse.json("OK");
}
