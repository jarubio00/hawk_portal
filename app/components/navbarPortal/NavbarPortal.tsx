'use client';

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Logo from "./Logo";

import SidebarButton from "./SidebarButton";
import UserMenuPortal from "./UserMenuPortal";
import usePortalDrawer from "@/app/hooks/usePortalDrawer";
import { PackagePlus, Bell } from 'lucide-react';



interface NavbarPortalProps {
  currentUser?: SafeUser | null;
}

const NavbarPortal: React.FC<NavbarPortalProps> = ({
  currentUser,
}) => {
 
  const drawer = usePortalDrawer();
  const router = useRouter();
  return (
    <div className="w-full  bg-white shadow-sm border-b border-neutral-300">
    <div
      className="
        pt-0
        pb-0 
      "
    >

      <div className="flex mx-1 md:mx-4 lg:mx-6 flex-col gap-1 pb-2 ">
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
          <div className="block md:hidden md:gap-8 " onClick={drawer.onOpen}>
            <SidebarButton />
          </div>
          <div className=" ml-7 md:ml-0">
            <Logo />
          </div>
            
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row items-center gap-4">
              <PackagePlus size={20} className="text-neutral-700"/>
              <Bell size={20} className="text-neutral-700"/>
            </div>
            <div className="">
              <UserMenuPortal currentUser={currentUser} />
            </div>
          </div>
        
        </div>
        
      </div>

    
    </div>
 
  </div>
    
  );
}


export default NavbarPortal;