'use client';
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import RecoleccionesTab from "./tabs/RecoleccionesTab";
import EnviosTab from "./tabs/EnviosTab";
import HistorialTab from "./tabs/HistorialTab";
import { FaHome, FaHistory } from 'react-icons/fa';
import {
  BsFillBoxSeamFill
  } from 'react-icons/bs'


interface TabSectionProps {
data?: any
}

const TabSection: React.FC<TabSectionProps> = ({
 data
}) => {
  return ( 
    <div>
      <Tabs value="recolecciones" className="w-full">
        <TabsHeader 
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 text-xs"
          indicatorProps={{
            className: "bg-transparent text-xs border-b-2 border-black shadow-none rounded-none",
          }}
          >
            <Tab  value={'recolecciones'} className="w-36 text-sm font-semibold py-1 pb-2">
              <div className="flex items-center gap-2">
                {React.createElement(FaHome, { className: "w-4 h-4" })}
                Recolecciones
              </div>
            </Tab>
            <Tab  value={'envios'} className="w-36 text-sm font-semibold py-1 pb-2">
              <div className="flex items-center gap-2">
                {React.createElement(BsFillBoxSeamFill, { className: "w-4 h-4" })}
                Envíos
              </div>
            </Tab>
            <Tab  value={'historial'} className="w-36 text-sm font-semibold py-1 pb-2">
              <div className="flex items-center gap-2">
                {React.createElement(FaHistory, { className: "w-4 h-4" })}
                Historial
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody className="m-0 p-0">
            <TabPanel value="recolecciones" className="m-0 p-0">
              <RecoleccionesTab />
            </TabPanel>
            <TabPanel value={"envios"} className="m-0 p-0">
              <EnviosTab />
            </TabPanel>
            <TabPanel value={"historial"} className="m-0 p-0">
              <HistorialTab />
            </TabPanel>
          </TabsBody>
      </Tabs>
    </div>
   );
}
 
export default TabSection;