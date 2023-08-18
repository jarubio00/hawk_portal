
import ClientOnly from '@/app/components/ClientOnly';
import GlobalLoader from '@/app/components/GlobalLoader';
import getCurrentUser from "@/app/actions/getCurrentUser";
import getDireccionesCount from "@/app/actions/getDireccionesCount";
import NavbarPortal from "@/app/components/navbarPortal/NavbarPortal";
import SideBar from '@/app/components/portal/Sidebar';
import Welcome from '../components/welcome/Welcome';
import PhoneConfirmModal from '../components/welcome/PhoneConfirmModal';



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  const direcciones = await getDireccionesCount();

  console.log(currentUser)

  const LayOut = () => {
    if (!currentUser?.checklist?.celularVerificado) {
      return (
        <PhoneConfirmModal currentUser={currentUser} open={true}/>
      )
    } else {
      if (direcciones < 1) {
        return (
          <Welcome currentUser={currentUser} page="Sin direcciones de recolección"/>
        )
      } else {
        return (
          <>
            {children}
          </>
        )
      }
      
    }
  } 


  return (
    <>
        <ClientOnly>
          <GlobalLoader />
          <NavbarPortal currentUser={currentUser}/>
        
          <div className="flex flex-row ">
            <div className='hidden md:block h-full w-64'>
              <SideBar />
            </div>
            <div className='w-full bg-neutral-100 p-2'>
              <div className='w-full bg-white rounded-lg p-2 min-h-[85vh]'>
                <LayOut />
              </div>
            
            </div>
          </div>
        </ClientOnly>
    </>
  )
}
