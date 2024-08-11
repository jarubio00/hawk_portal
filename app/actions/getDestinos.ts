"use server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getDirecciones() {
  try {
    const currentUser = await getCurrentUser();
    //console.log(currentUser);

    const listings = await prisma.destino.findMany({
      where: {
        clienteId: currentUser?.id,
      },
      include: {
        //@ts-ignore
        municipio: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      default: listing.id == currentUser?.direccionDefaultId ? true : false,
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
