import { NextResponse } from "next/server";



export async function GET(
  request: Request, 
) {

  console.log('api fecha')
  const serverDate = new Date();

  console.log(serverDate);

  return NextResponse.json(serverDate);
}