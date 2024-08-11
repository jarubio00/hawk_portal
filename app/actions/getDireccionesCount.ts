"use server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getDirecciones() {
  try {
    const currentUser = await getCurrentUser();
    //console.log(currentUser);

    const count: number = await prisma.direccion.count({
      where: {
        clienteId: currentUser?.id,
      },
    });

    return count;
  } catch (error: any) {
    throw new Error(error);
  }
}
