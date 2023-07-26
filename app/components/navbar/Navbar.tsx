'use client';

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import SidebarButton from "./SidebarButton";
import UserMenu from "./UserMenu";
import useMainDrawer from "@/app/hooks/useMainDrawer";
import { FaWhatsapp, FaTruckMoving, FaPhoneAlt } from "react-icons/fa";
import { FiFacebook} from "react-icons/fi";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
 
  const drawer = useMainDrawer();
  const router = useRouter();
  return (
    <div className="fixed w-full bg-white z-[9998] shadow-sm">
    <div
      className="
        pt-0
        pb-0 
      "
    >

      <div className="flex flex-col gap-1 pb-2">
        <div className="w-full bg-gray-900">
          <div className=" flex flex-row mx-auto justify-between items-center
               text-white text-xs font-normal w-full py-2 gap-3 px-4 md:px-0">
              <div className="p-1 bg-gray-900 rounded-md  w-36 text-xs text-white-500 text-center">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <FaPhoneAlt size={12}/>
                    <p className="font-semibold">(81) 8317 4000</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row items-center gap-1">
                  <FiFacebook size={18}/>
                  Facebook
                </div>
                <div></div>
                <div className="flex flex-row items-center gap-1 text-white">
                  <FaWhatsapp size={18}/>
                  Whatsapp
                </div>
              </div>
              {/* <div className="flex flex-row items-center gap-1">
                <BsBook size={16}/>
                Catálogo
              </div> */}
          
          </div>
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
            w-full
          
            mx-auto
            mt-3
            px-4
          "
        >
          <div className="block md:hidden md:gap-8 order-0" onClick={drawer.onOpen}>
            <SidebarButton />
          </div>
          <div className="order-1 md:order-0 ml-7 md:ml-0">
            <Logo />
          </div>
            <div className=" w-2/4 md:w-2/4 order-1 md:order-1 hidden sm:block">
              <Search />
            </div>
        
          <div className="order-2 md:order-2">
            <UserMenu currentUser={currentUser} />
          </div>
        
        </div>
        <div className="block sm:hidden my-2 px-4">
          <Search />
        </div>
        <div className="mt-4 flex-row mx-auto justify-between items-center
             text-neutral-900 text-md w-full lg:w-4/6 hidden md:flex">
          <div></div>
          <div className="flex flex-row gap-12 items-center text-neutral-800 font-base">
            <div>Servicios</div>
            <div>Empresas</div>
            <div>Flota</div>
            <div>Cotizar</div>
            <div>Contácto</div>
          </div>
         
        </div>
      </div>

    
    </div>
 
  </div>
    
  );
}


export default Navbar;