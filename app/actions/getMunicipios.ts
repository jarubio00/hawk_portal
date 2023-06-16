import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getDirecciones() {
    try {
        //const currentUser = await getCurrentUser();
        //console.log(currentUser);

        const municipios = await prisma.catalogoMunicipios.findMany({
          orderBy: {
            municipio: 'asc'
          }
        });
    
  
    
        return municipios;
      } catch (error: any) {
        throw new Error(error);
      }
}