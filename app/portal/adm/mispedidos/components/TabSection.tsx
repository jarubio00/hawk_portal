'use client';
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
const data = [
  {
    label: "HTML",
    value: "html",
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people 
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: "React",
    value: "react",
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Vue",
    value: "vue",
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
  {
    label: "Angular",
    value: "angular",
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Svelte",
    value: "svelte",
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },
];

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
            <Tab  value={'recolecciones'} className="w-32 text-sm p-2">
              Recolecciones
            </Tab>
            <Tab  value={'envios'} className="w-32 text-sm p-2">
              Envíos
            </Tab>
            <Tab  value={'historial'} className="w-32 text-sm p-2">
              Historial
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="recolecciones">
              <RecoleccionesTab />
            </TabPanel>
            <TabPanel value={"envios"}>
              <EnviosTab />
            </TabPanel>
            <TabPanel value={"historial"}>
              <HistorialTab />
            </TabPanel>
          </TabsBody>
      </Tabs>
    </div>
   );
}
 
export default TabSection;