'use client';

import { IconType } from "react-icons";
import { useContext, useEffect, useState } from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Button from "@/app/components/Button";
import { IoMdClose } from "react-icons/io";
import useMainDrawer from "@/app/hooks/useMainDrawer";

interface MainDrawerProps {
 
  onClose?: () => void;
  size?: number;
  content?: React.ReactNode;
}

//se quito w-full , se agregp px-2
const MainDrawer: React.FC<MainDrawerProps> = ({ 
  onClose,
  size,
  content
}) => {

  const drawer = useMainDrawer();

  
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
          {menus.map((menu) => {
            const [level1Open, setLevel1Open] = useState(false);
            return (
              <div key={menu.id} className="m-2" >
                  <div className="m-3 p-2" onClick={() => setLevel1Open(true)}>
                      {menu.title}
                  </div>
                  <div className="w-full">
                    <Drawer
                      open={level1Open}
                      onClose={()=>setLevel1Open(false)}
                      direction='right'
                      enableOverlay={false}
                      style={{width: '100%', position: 'absolute', bottom: 0, left: 0}}
                    
                    >
                      <div onClick={() => setLevel1Open(false)}>
                          Regresar
                      </div>
                      <div className="m-6">
                          {menu.subMenus.map((sub,i) => {
                            return (  
                              <div key={i}>{sub.title}</div>
                            );
                          })}
                      </div>
                    </Drawer>
                  </div>
              </div>

            );

          })}
        </div>
        
      </Drawer>
    </div>
   );
}
 
export default MainDrawer;