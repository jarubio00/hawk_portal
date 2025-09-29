import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userActivityRegister } from "@/app/api/utils/activity";
import axios from "axios";
import { NacionalShipment } from "@/app/types";
import { confirmNacionalShipment } from "../../utils/nacionalUtils";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body: NacionalShipment = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Error de validación" },
        { status: 403 }
      );
    }

    const response = await axios.post(
      "http://localhost:3080/api/v1/shipment",
      body
    );

    //console.log(response.data);

    const confirmShipment = await confirmNacionalShipment(response.data);

    //console.log(confirmShipment);

    const data: any[] = [];

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
