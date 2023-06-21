import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";
import {format, subHours} from "date-fns"

interface IParams {
  now?: string;
}

export async function GET(
  request: Request, 
  { params }: { params: IParams }
) {


  const { now } = params;
  
  const serverDateUTC = new Date();
  const serverDate = subHours(serverDateUTC, 6);

  console.log(serverDate);

  return NextResponse.json(serverDateUTC);
}

