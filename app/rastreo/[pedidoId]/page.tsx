import { Metadata } from "next";
import ClientOnly from "../../components/ClientOnly";
import Navbar from "../../components/navbar/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RastreoClient from "../RastreoClient";

export const metadata: Metadata = {
  title: "Rastrea tu envío",
  description: "Rastrea en tiempo real tu envío",
  openGraph: {
    title: "La Mensajería MX",
    description: "Aplicación de rastreo de envíos",
    url: "https://hawkportal.lamensajeria.mx/rastreo",
    siteName: "Hawk",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/webimages%2FogLm2.jpg?alt=media&token=f9955908-5485-450c-be30-d3fdd1543d73",
        width: 100,
        height: 100,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function Page({
  params,
}: {
  params: { pedidoId: string };
}) {
  const currentUser = await getCurrentUser();
  //slug={params.pedidoId}

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
      <div className="pt-40">
        <RastreoClient data={parseInt(params.pedidoId)} />
      </div>
    </ClientOnly>
  );
}
