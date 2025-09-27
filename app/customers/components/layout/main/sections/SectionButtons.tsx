"use client";
import {
  Box,
  MapPin,
  Navigation,
  LifeBuoy,
  UserRound,
  EllipsisVertical,
} from "lucide-react";
import { ActionButton } from "../../ui/ActionButton";

interface SectionButtonsProps {
  data?: string;
}

const SectionButtons: React.FC<SectionButtonsProps> = ({ data }) => {
  return (
    <div className="bg-white  py-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2 text-center">
        <ActionButton
          icon={<MapPin className="w-5 h-5 text-black" />}
          label="Direcciones"
        />
        <ActionButton
          icon={<Navigation className="w-5 h-5 text-black" />}
          label="Destinos"
        />
        <ActionButton
          icon={<Box className="w-5 h-5 text-black" />}
          label="Paquetes"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <ActionButton
          icon={<LifeBuoy className="w-5 h-5 text-black" />}
          label="Tickets"
          badge={2}
        />
        <ActionButton
          icon={<UserRound className="w-5 h-5 text-black" />}
          label="Mi cuenta"
        />
        <ActionButton
          icon={<EllipsisVertical className="w-5 h-5 text-black" />}
          label="Más"
        />
      </div>
    </div>
  );
};

export default SectionButtons;
