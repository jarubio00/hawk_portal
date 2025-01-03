import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

interface IParams {
  cpId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { cpId } = params;

  if (!cpId || typeof cpId !== "string") {
    throw new Error("Invalid ID");
  }

  const response = await axios.get(
    `http://localhost:3080/api/v1/cotiza/cp/${cpId}`
  );

  return NextResponse.json(response.data);
}
