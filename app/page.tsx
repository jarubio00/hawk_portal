import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "@/app/components/Container";
import Navbar from "./components/navbar/Navbar";
import MainDrawer from "./components/drawer/MainDrawer";
import SectionBanner from "./components/homePage/SectionBanner";
import SectionCTA from "./components/homePage/SectionCTA";
import SectionCotizar from "./components/homePage/SectionCotizar";
import SectionBlankRedirect from "./components/homePage/SectionBlankRedirect";

interface HomeProps {
  searchParams: any;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <SectionBlankRedirect />
      {/* <MainDrawer />
      <Navbar currentUser={currentUser}/>
      <div className="pt-40">
        <SectionBanner />
        <SectionCTA />
        <SectionCotizar />
      </div> */}
    </ClientOnly>
  );
};
export default Home;
