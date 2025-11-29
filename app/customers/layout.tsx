import GlobalLoader from "../components/GlobalLoader";
import CustomersDrawer from "./components/layout/drawer/CustomersDrawer";
import CustomersToolbar from "./components/layout/toolbar/CustomersToolbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ErrorFullScreen from "../portal/crear/components/ErrorFullScreen";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  //console.log(currentUser);
  return (
    <>
      <div>
        <GlobalLoader />
        <CustomersToolbar />
      </div>

      {currentUser?.id === 14359 ? (
        <div className="pb-0 pt-0">{children}</div>
      ) : (
        <ErrorFullScreen data="Autorización requerida" />
      )}
    </>
  );
}
