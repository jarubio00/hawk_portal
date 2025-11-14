"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EnviosTab from "./tabs/EnviosTab";
import { FaHome } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { BsFillBoxSeamFill } from "react-icons/bs";
import CobrosTab from "./tabs/CobrosTab";
import { SafeCobro, SafePedido } from "@/app/types";
import RecoleccionesSection from "./RecoleccionesSection";

interface TabSectionProps {
  data?: any;
  currentUser?: any;
  onView: (open: boolean, p: SafePedido) => void;
  onCobroView: (open: boolean, c: SafeCobro) => void;
}

const TabSection: React.FC<TabSectionProps> = ({
  data,
  currentUser,
  onView,
  onCobroView,
}) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="envios" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="envios"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 group"
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full flex items-center justify-center bg-transparent transition-colors [button[data-state=active]_&]:bg-neutral-200">
                <BsFillBoxSeamFill className="w-4 h-4 text-black transition-colors [button[data-state=active]_&]:text-rose-500" />
              </div>
              <span className="text-sm font-bold text-black">Envíos</span>
            </div>
          </TabsTrigger>
          {/* <TabsTrigger
            value="recolecciones"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 group"
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full flex items-center justify-center bg-transparent transition-colors [button[data-state=active]_&]:bg-neutral-200">
                <FaHome className="w-4 h-4 text-black transition-colors [button[data-state=active]_&]:text-rose-500" />
              </div>
              <span className="text-sm font-bold text-black">
                Recolecciones
              </span>
            </div>
          </TabsTrigger> */}
          {currentUser.cobrosPermitidos && (
            <TabsTrigger
              value="cobros"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 group"
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full flex items-center justify-center bg-transparent transition-colors [button[data-state=active]_&]:bg-neutral-200">
                  <FaCircleDollarToSlot className="w-4 h-4 text-black transition-colors [button[data-state=active]_&]:text-rose-500" />
                </div>
                <span className="text-sm font-bold text-black">Cobros</span>
              </div>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="envios" className="m-0 p-0 mt-4">
          <EnviosTab onView={onView} />
        </TabsContent>

        <TabsContent value="recolecciones" className="m-0 p-0 mt-4">
          <RecoleccionesSection />
        </TabsContent>

        <TabsContent value="cobros" className="m-0 p-0 mt-4">
          <CobrosTab onView={onCobroView} currentUser={currentUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabSection;
