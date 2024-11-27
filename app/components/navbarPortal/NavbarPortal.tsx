"use client";

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Logo from "./Logo";

import SidebarButton from "./SidebarButton";
import UserMenuPortal from "./UserMenuPortal";
import usePortalDrawer from "@/app/hooks/usePortalDrawer";
import { PackagePlus, Bell } from "lucide-react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import useLoader from "@/app/hooks/useLoader";
import { GiMexico } from "react-icons/gi";

interface NavbarPortalProps {
  currentUser?: SafeUser | null;
}

const NavbarPortal: React.FC<NavbarPortalProps> = ({ currentUser }) => {
  const loader = useLoader();
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
            <div
              className="flex flex-row  items-center md:hidden md:gap-8 "
              onClick={drawer.onOpen}
            >
              <SidebarButton />
              <div className=" ml-3 md:ml-0">
                <Logo />
              </div>
            </div>

            <div className=" hidden md:block  md:ml-0">
              <Logo />
            </div>

            <div className="flex flex-row items-center gap-4 md:gap-8">
              {currentUser?.id == 14359 && (
                <div className="relative">
                  <Button
                    variant={"outline"}
                    className="px-4 gap-2"
                    onClick={() => {
                      loader.onOpen();
                      router.push("/portal/nacional");
                    }}
                  >
                    <GiMexico size={20} className="text-primary" />
                    <p className="hidden md:block">Envios Nacionales</p>
                  </Button>
                  <div className="absolute -top-2 -left-4 w-12 h-4 pl-1 bg-red-500 text-xs text-white rounded-sm">
                    Nuevo
                  </div>
                </div>
              )}
              <Button
                variant={"outline"}
                className="px-4 gap-2"
                onClick={() => {
                  loader.onOpen();
                  router.push("/portal/crear");
                }}
              >
                <PackagePlus size={20} className="text-primary" />
                <p className="hidden md:block">Programar envío</p>
              </Button>

              {/* <Bell size={20} className="text-neutral-700"/> */}
              <div className="flex flex-row items-center">
                <UserMenuPortal currentUser={currentUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPortal;
