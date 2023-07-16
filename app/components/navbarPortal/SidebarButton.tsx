'use client';

import useSidebar from "@/app/hooks/useSidebar";
import { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const SidebarButton = () => {

    const sidebar = useSidebar();
    
    const sidebarToggle = useCallback(() => {
        if (sidebar.isOpen) {
          sidebar.onClose();
        } else {
          sidebar.onOpen();
        }
    }, [sidebar.isOpen]);


  return (
    <div 
        onClick={sidebarToggle}
        className="
          flex 
          flex-row 
          items-center 
          gap-2 
          cursor-pointer 
          transition
          "
        >
            <AiOutlineMenu 
                className="h-6 w-6 text-gray-700 cursor-pointer"
            />
        </div>
  )
}

export default SidebarButton