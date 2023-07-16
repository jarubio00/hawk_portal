
import ClientOnly from '../components/ClientOnly';
import GlobalLoader from '../components/GlobalLoader';
import PortalDrawer from './components/drawer/PortalDrawer';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <>
        <ClientOnly>
          <GlobalLoader />
          <PortalDrawer />
        </ClientOnly>
        <div className="pb-0 pt-0">
          {children}
        </div>
    </>
  )
}
