import './globals.css'
import NextTopLoader from 'nextjs-toploader';
import { Poppins } from 'next/font/google'
import Navbar from "./components/navbar/Navbar";
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import SidebarModal from './components/modals/SidebarModal';
import TrackModal from './components/modals/TrackModal';

import getCurrentUser from './actions/getCurrentUser';
import GlobalLoader from './components/GlobalLoader';

const font = Poppins({
  weight: ['200','400', '700', '900'],
  subsets: ['latin-ext'],
  display: 'swap',
});

export const metadata = {
  title: 'Hawk - Portal clientes',
  description: 'Portal de clientes La mensajeria MX',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <NextTopLoader
          color="#F43F5E"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
        />
        <ClientOnly>
          <GlobalLoader />
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SidebarModal />
          <TrackModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-0 pt-0">
          {children}
        </div>
      </body>
    </html>
  )
}
