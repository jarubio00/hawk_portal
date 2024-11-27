"use client";
import { SafeDireccion } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBuilding, FaHome, FaStore, FaWarehouse } from "react-icons/fa";

interface DireccionAvatarProps {
  data: SafeDireccion;
}

const DireccionAvatar: React.FC<DireccionAvatarProps> = ({ data }) => {
  return (
    <div
      className={`h-9 w-9 rounded-full border flex items-center justify-center bg-[${data.color}]`}
    >
      {data.icon == "home" && <FaHome size={20} className={`text-white`} />}
      {data.icon == "tienda" && <FaStore size={20} className={`text-white`} />}
      {data.icon == "oficina" && (
        <FaBuilding size={20} className={`text-white`} />
      )}
      {data.icon == "bodega" && (
        <FaWarehouse size={20} className={`text-white`} />
      )}
    </div>
  );
};

export default DireccionAvatar;
