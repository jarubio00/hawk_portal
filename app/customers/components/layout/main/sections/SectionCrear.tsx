"use client";
import { PackagePlus, Plus } from "lucide-react";
interface SectionCrearProps {
  data?: string;
}

const SectionCrear: React.FC<SectionCrearProps> = ({ data }) => {
  return (
    <div className="w-full">
      <button
        className="w-full p-3 flex flex-row items-center justify-center hover:bg-blue-400 transition-colors rounded-md gap-2  bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]   "
        aria-label="Cerrar sidebar"
      >
        <PackagePlus className="h-5 w-5 text-white" />
        <p className="text-sm text-white">Crear envío</p>
      </button>
    </div>
  );
};

export default SectionCrear;
