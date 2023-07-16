
import ClientOnly from '@/app/components/ClientOnly';
import GlobalLoader from '@/app/components/GlobalLoader';
import getCurrentUser from "@/app/actions/getCurrentUser";
import NavbarPortal from "@/app/components/navbarPortal/NavbarPortal";
import SideBar from '@/app/components/portal/Sidebar';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <>
        <ClientOnly>
          <GlobalLoader />
          <NavbarPortal currentUser={currentUser}/>
        </ClientOnly>
        <div className="flex flex-row ">
          <div className='hidden md:block h-full w-64'>
            <SideBar />
          </div>
          <div className='w-full bg-neutral-100 p-2'>
            <div className='w-full bg-white rounded-lg p-2'>
              {children}
            </div>
           
          </div>
        </div>
    </>
  )
}
