import { NextResponse } from "next/server";
import { format, subHours } from "date-fns";

export async function GET(request: Request) {
  //console.log('api fecha')
  const serverDateUTC = new Date();
  const serverDate = subHours(serverDateUTC, 6);

  //console.log(serverDate);

  return NextResponse.json(serverDate);
}
