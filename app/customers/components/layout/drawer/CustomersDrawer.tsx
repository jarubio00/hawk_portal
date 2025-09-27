"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer-sidebar";
import useCustomerDrawer from "@/app/customers/store/customer-drawer";
import { SlClose } from "react-icons/sl";
import { X } from "lucide-react";
import Logo from "@/app/components/navbarPortal/Logo";
import { Menu } from "lucide-react";
interface CustomersDrawerProps {
  content?: React.ReactNode;
}

const CustomersDrawer: React.FC<CustomersDrawerProps> = ({ content }) => {
  const customerDraer = useCustomerDrawer();

  return (
    <Drawer direction="left" handleOnly>
      <DrawerTrigger asChild>
        <Menu className="w-6 h-6 text-gray-800" />
      </DrawerTrigger>
      <DrawerContent className="h-full p-4">
        <div className="flex flex-row items-center justify-between">
          <img
            className="h-[52px] md:block cursor-pointer"
            src="/images/lmmx-light.png"
          />
          <DrawerClose asChild>
            <button
              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
              aria-label="Cerrar sidebar"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
          </DrawerClose>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Sidebar</DrawerTitle>
            <DrawerDescription>Descripcion del sidebar</DrawerDescription>
          </DrawerHeader>
          <p>Contenido</p>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomersDrawer;
