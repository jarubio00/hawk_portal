import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getDirecciones() {
    try {
        const currentUser = await getCurrentUser();
        //console.log(currentUser);

        const listings = await prisma.direccion.findMany({
            where: {
                clienteId: currentUser?.id,
            },
          orderBy: {
            createdAt: 'desc'
          }
        });
    
        const safeListings = listings.map((listing) => ({
          ...listing,
          createdAt: listing.createdAt.toISOString(),
        }));
    
        return safeListings;
      } catch (error: any) {
        throw new Error(error);
      }
}