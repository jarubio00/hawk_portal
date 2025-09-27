import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ServerDate } from "@/app/types";
import { getServerDate } from "@/app/api/utils/validatorUtils";
import { parseYMDLocal } from "@/app/utils/dateUtils";

export async function GET(req: Request) {
  try {
    const sd: ServerDate = await getServerDate();

    return new Response(JSON.stringify(sd), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
