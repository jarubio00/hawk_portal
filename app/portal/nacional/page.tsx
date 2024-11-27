import ClientOnly from "@/app/components/ClientOnly";
import NacionalClient from "./NacionalClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getDirecciones from "@/app/actions/getDirecciones";

interface NacionalProps {
  searchParams: any;
}
/* <NacionalClient /> */ const Nacional = async ({
  searchParams,
}: NacionalProps) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="w-screen h-screen flex flex-col">
      <NacionalClient currentUser={currentUser} />
    </div>
  );
};

export default Nacional;
