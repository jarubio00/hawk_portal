'use client';

import { IconType } from "react-icons";
import { useContext, useEffect, useState } from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Button from "@/app/components/Button";
import { IoMdClose } from "react-icons/io";
import usePortalDrawer from "@/app/hooks/usePortalDrawer";
import SideBar from "@/app/components/portal/Sidebar";

interface PortalDrawerProps {
 
  onClose?: () => void;
  size?: number;
  content?: React.ReactNode;
}

//se quito w-full , se agregp px-2
const PortalDrawer: React.FC<PortalDrawerProps> = ({ 
  onClose,
  size,
  content
}) => {

  const drawer = usePortalDrawer();

  
  const [level2Open, setLevel2Open] = useState(false);

  const menus = [
    {id: 1, title: 'Menu 1 Level 1', subMenus:[{title: 'Sub Menu level 1.1'}, {title: 'Sub Menu level 1.2'}, {title: 'Sub Menu level 1.3'}]},
    {id: 2, title: 'Menu 2 Level 1', subMenus:[{title: 'Sub Menu level 2.1'}, {title: 'Sub Menu level 2.2'}, {title: 'Sub Menu level 2.3'}]},
    {id: 3, title: 'Menu 3 Level 1', subMenus:[{title: 'Sub Menu level 3.1'}, {title: 'Sub Menu level 3.2'}, {title: 'Sub Menu level 3.3'}]},
    {id: 4, title: 'Menu 4 Level 1', subMenus:[{title: 'Sub Menu level 4.1'}, {title: 'Sub Menu level 4.2'}, {title: 'Sub Menu level 4.3'}]},
  ]

  return ( 
    <div className="relative">
      <Drawer
        open={drawer.isOpen}
        onClose={drawer.onClose}
        direction='left'
        style={{width: '80%'}}
      
        >
        <div className="m-4" >
          <SideBar />
        </div>
        
      </Drawer>
    </div>
   );
}
 
export default PortalDrawer;