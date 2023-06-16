import { NextResponse } from "next/server";



export async function GET(
  request: Request, 
) {

  const serverDate = new Date();

  return NextResponse.json(serverDate);
}