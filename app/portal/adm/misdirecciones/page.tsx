import ClientOnly from "@/app/components/ClientOnly";

import getDirecciones from "@/app/actions/getDirecciones";
import getCurrentUser from "@/app/actions/getCurrentUser";

import MisdireccionesClient from "./Misdirecciones";

const Misdirecciones = async () => {
  const direcciones = await getDirecciones();
  const currentUser = await getCurrentUser();
  //console.log(currentUser);

  return (
    <ClientOnly>
      <MisdireccionesClient data={direcciones} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Misdirecciones;
