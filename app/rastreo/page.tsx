
import Head from 'next/head';
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import Container from "@/app/components/Container";
import Navbar from "../components/navbar/Navbar";
import MainDrawer from '../components/drawer/MainDrawer';

interface HomeProps {
  searchParams: any
};

const Home = async ({ searchParams }: HomeProps) => {

  const currentUser = await getCurrentUser();



  return (
    <ClientOnly>
      <Head>
        <meta property="og:title" content="Social Title for Cool Page" />
        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/webimages%2FogLm.png?alt=media&token=677649ae-a87f-47b1-abf2-64435b998223"
        />
      </Head>
      <MainDrawer />
      <Navbar currentUser={currentUser}/>
      
      <div className="pt-40">
        Rastreo
      </div>
    </ClientOnly>
    
  )
}
export default Home;