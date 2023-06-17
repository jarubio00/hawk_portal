import { NextResponse } from "next/server";
import {format, subHours} from "date-fns"



export async function GET(
  request: Request, 
) {

  console.log('api fecha')
  //const serverDate = format(new Date(), 'MM/dd/yyyy HH:mm:ss');
  const serverDate = subHours(new Date(), 6);

  console.log(serverDate);

  return NextResponse.json(serverDate);
}