
import ClientOnly from '../components/ClientOnly';
import GlobalLoader from '../components/GlobalLoader';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <>
        <ClientOnly>
          <GlobalLoader />
        </ClientOnly>
        <div className="pb-0 pt-0">
          {children}
        </div>
    </>
  )
}
