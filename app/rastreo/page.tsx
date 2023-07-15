
import Head from 'next/head';
import { Metadata } from 'next'
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Container from "@/app/components/Container";
import Navbar from "../components/navbar/Navbar";
import MainDrawer from '../components/drawer/MainDrawer';


export const metadata: Metadata = {
  title: 'Rastrea tu envío',
  description: 'Rastrea en tiempo real tu envío',
  openGraph: {
    title: 'La Mensajería MX',
    description: 'Aplicación de rastreo de envíos',
    url: 'https://hawkportal.lamensajeria.mx/rastreo',
    siteName: 'Hawk',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/webimages%2FogLm2.jpg?alt=media&token=f9955908-5485-450c-be30-d3fdd1543d73',
        width: 100,
        height: 100,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

interface HomeProps {
  searchParams: any
};

const Home = async ({ searchParams }: HomeProps) => {

  const currentUser = await getCurrentUser();



  return (
    <ClientOnly>
      <MainDrawer />
      <Navbar currentUser={currentUser}/>
      
      <div className="pt-40">
        Rastreo
      </div>
    </ClientOnly>
    
  )
}
export default Home;