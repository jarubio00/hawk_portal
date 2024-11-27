import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userActivityRegister } from "@/app/api/utils/activity";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const body = await req.json();

    if (1 > 2) {
      return NextResponse.json(
        { error: "Error de validación" },
        { status: 403 }
      );
    }

    const response = await axios.post(
      "http://localhost:3080/api/v1/cotiza",
      body
    );

    console.log(response.data);

    const data: any[] = [];

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
