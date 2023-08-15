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
import { FaHome, FaHistory, FaTicketAlt, } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';



import {RiMoneyDollarBoxFill} from 'react-icons/ri';
import {
  BsFillBoxSeamFill
  } from 'react-icons/bs'
import CobrosTab from "./tabs/CobrosTab";
import { SafeCobro, SafePedido } from "@/app/types";


interface TabSectionProps {
data?: any
onView: (open: boolean, p: SafePedido) => void;
onCobroView: (open: boolean, c: SafeCobro) => void;
}

const TabSection: React.FC<TabSectionProps> = ({
 data,
 onView,
 onCobroView
}) => {
  return ( 
    <div>
      <Tabs value="envios" className="w-full z-40">
        <TabsHeader 
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 text-xs"
          indicatorProps={{
            className: "bg-transparent text-xs border-b-2 border-black shadow-none rounded-none",
          }}
          >
           
            <Tab  value={'envios'} className="w-36 text-sm font-semibold py-1 pb-2">
              <div className="flex items-center gap-2">
                {React.createElement(BsFillBoxSeamFill, { className: "w-4 h-4" })}
                Envíos
              </div>
            </Tab>
            <Tab  value={'cobros'} className="w-36 text-sm font-semibold py-1 pb-2">
              <div className="flex items-center gap-2">
                {React.createElement(FaCircleDollarToSlot, { className: "w-4 h-4" })}
                Cobros
              </div>
            </Tab>
            <Tab  value={'tickets'} className="w-36 text-sm font-semibold py-1 pb-2">
              <div className="flex items-center gap-2">
                {React.createElement(FaTicketAlt, { className: "w-4 h-4" })}
                Tickets
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody className="m-0 p-0">
           
            <TabPanel value={"envios"} className="m-0 p-0">
              <EnviosTab onView={onView}/>
            </TabPanel>
            <TabPanel value="cobros" className="m-0 p-0">
              <CobrosTab onView={onCobroView}/>
            </TabPanel>
            <TabPanel value={"tickets"} className="m-0 p-0">
              <HistorialTab />
            </TabPanel>
          </TabsBody>
      </Tabs>
    </div>
   );
}
 
export default TabSection;