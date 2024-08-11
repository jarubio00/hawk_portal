import ClientOnly from "@/app/components/ClientOnly";

import getDirecciones from "@/app/actions/getDirecciones";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getPaquetes from "@/app/actions/getPaquetes";

import PaquetesClient from "./Paquetes";

const Paquetes = async () => {
  const currentUser = await getCurrentUser();
  //const paquetes = await getPaquetes();

  return (
    <ClientOnly>
      <PaquetesClient data={[]} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Paquetes;
