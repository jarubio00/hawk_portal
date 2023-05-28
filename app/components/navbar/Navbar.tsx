'use client';

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import SidebarButton from "./SidebarButton";
import UserMenu from "./UserMenu";


interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
 ;

 console.log('user: ', currentUser);
  const router = useRouter();
  return ( 
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <div className="flex flex-row gap-6 md:gap-14 order-0">
            <SidebarButton />
            <Logo />
          </div>
            <div className=" w-full md:w-1/4 order-1 md:order-1">
              <Search />
            </div>
            
          <div className="order-2 md:order-2">
            <UserMenu currentUser={currentUser} />
          </div>
          
        </div>
      </Container>
    </div>

   {/*  { currentUser && <div className="h-10 bg-rose-500">
        <div className="flex flex-row items-center justify-start gap-3 p-2 md:px-6">
            <span className="font-medium text-white font-sm cursor-pointer"
              onClick={() => router.push('/portal/mispedidos')}
            >
              Mis Pedidos
            </span>
        </div>
    </div>} */}
    {/* <Categories /> */}
  </div>
  );
}


export default Navbar;