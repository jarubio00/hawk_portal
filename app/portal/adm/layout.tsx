
import ClientOnly from '@/app/components/ClientOnly';
import GlobalLoader from '@/app/components/GlobalLoader';
import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";


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
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-0 pt-0">
          {children}
        </div>
    </>
  )
}
