"use client";
import {
  Package,
  LifeBuoy,
  ChevronRight,
  HandCoins,
  Wallet,
} from "lucide-react";
import SettingCard from "../../ui/SettingCard";

interface SectionActionsProps {
  data?: string;
}

const SectionActions: React.FC<SectionActionsProps> = ({ data }) => {
  return (
    <div className="bg-white divide-y divide-gray-100">
      <SettingCard
        icon={<Wallet className="w-6 h-6" />}
        title="Billetera"
        subtitle="💰 Recarga tu saldo"
      />
      <SettingCard
        icon={<Package className="w-6 h-6" />}
        title="Envíos"
        subtitle="Activos"
        badge={4}
      />
      <SettingCard
        icon={<HandCoins className="w-6 h-6" />}
        title="Cobros a destinatario"
        subtitle="Activos"
        badge={1}
      />
    </div>
  );
};

export default SectionActions;
